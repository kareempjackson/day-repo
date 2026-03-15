import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { PaymentTypeDto } from './dto/pay-order.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderStatus, PaymentType } from '@prisma/client';

const TAX_RATE = 0.0825; // 8.25% tax rate

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    // Collect all menu item IDs and modifier IDs
    const menuItemIds = items.map((item) => item.menu_item_id);
    const allModifierIds = items.flatMap((item) => item.modifier_ids || []);

    // Fetch and validate menu items
    const menuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
      include: { modifiers: true },
    });

    const menuItemMap = new Map(menuItems.map((mi) => [mi.id, mi]));

    // Validate all menu items exist and are available
    for (const item of items) {
      const menuItem = menuItemMap.get(item.menu_item_id);
      if (!menuItem) {
        throw new BadRequestException(
          `Menu item with ID ${item.menu_item_id} not found`,
        );
      }
      if (!menuItem.available) {
        throw new BadRequestException(
          `Menu item "${menuItem.name}" is not available`,
        );
      }
    }

    // Fetch and validate modifiers
    let modifierMap = new Map<string, { id: string; price: Decimal; available: boolean; name: string }>();
    if (allModifierIds.length > 0) {
      const modifiers = await this.prisma.modifier.findMany({
        where: { id: { in: allModifierIds } },
      });
      modifierMap = new Map(modifiers.map((m) => [m.id, m]));

      for (const modifierId of allModifierIds) {
        const modifier = modifierMap.get(modifierId);
        if (!modifier) {
          throw new BadRequestException(
            `Modifier with ID ${modifierId} not found`,
          );
        }
        if (!modifier.available) {
          throw new BadRequestException(
            `Modifier "${modifier.name}" is not available`,
          );
        }
      }
    }

    // Validate modifiers are valid for menu items
    for (const item of items) {
      const menuItem = menuItemMap.get(item.menu_item_id)!;
      const validModifierIds = new Set(
        menuItem.modifiers.map((m) => m.modifierId),
      );

      for (const modifierId of item.modifier_ids || []) {
        if (!validModifierIds.has(modifierId)) {
          throw new BadRequestException(
            `Modifier ${modifierId} is not valid for menu item "${menuItem.name}"`,
          );
        }
      }
    }

    // Calculate totals
    let subtotal = new Decimal(0);
    const orderItemsData: Array<{
      menuItemId: string;
      quantity: number;
      unitPrice: Decimal;
      totalPrice: Decimal;
      modifiers: Array<{ modifierId: string; price: Decimal }>;
    }> = [];

    for (const item of items) {
      const menuItem = menuItemMap.get(item.menu_item_id)!;
      let itemUnitPrice = new Decimal(menuItem.price);

      const modifiersData: Array<{ modifierId: string; price: Decimal }> = [];
      for (const modifierId of item.modifier_ids || []) {
        const modifier = modifierMap.get(modifierId)!;
        itemUnitPrice = itemUnitPrice.plus(modifier.price);
        modifiersData.push({ modifierId, price: new Decimal(modifier.price) });
      }

      const itemTotalPrice = itemUnitPrice.times(item.quantity);
      subtotal = subtotal.plus(itemTotalPrice);

      orderItemsData.push({
        menuItemId: item.menu_item_id,
        quantity: item.quantity,
        unitPrice: itemUnitPrice,
        totalPrice: itemTotalPrice,
        modifiers: modifiersData,
      });
    }

    const tax = subtotal.times(TAX_RATE).toDecimalPlaces(2);
    const total = subtotal.plus(tax);

    // Create order with items and modifiers in a transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          status: OrderStatus.PENDING,
          subtotal,
          tax,
          total,
        },
      });

      for (const itemData of orderItemsData) {
        const orderItem = await tx.orderItem.create({
          data: {
            orderId: createdOrder.id,
            menuItemId: itemData.menuItemId,
            quantity: itemData.quantity,
            unitPrice: itemData.unitPrice,
            totalPrice: itemData.totalPrice,
          },
        });

        if (itemData.modifiers.length > 0) {
          await tx.orderItemModifier.createMany({
            data: itemData.modifiers.map((mod) => ({
              orderItemId: orderItem.id,
              modifierId: mod.modifierId,
              price: mod.price,
            })),
          });
        }
      }

      return createdOrder;
    });

    return this.getOrderById(order.id);
  }

  async getOrderById(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menuItem: true,
            modifiers: {
              include: {
                modifier: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return this.formatOrderResponse(order);
  }

  async initiatePayment(orderId: string, paymentType: PaymentTypeDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new BadRequestException(`Order with ID ${orderId} not found`);
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException(
        `Order is not in pending status. Current status: ${order.status}`,
      );
    }

    const prismaPaymentType =
      paymentType === PaymentTypeDto.CASH ? PaymentType.CASH : PaymentType.CARD;

    if (paymentType === PaymentTypeDto.CARD) {
      // Create Stripe PaymentIntent
      const amountInCents = Math.round(order.total.toNumber() * 100);
      const paymentIntent = await this.stripeService.createPaymentIntent(
        amountInCents,
        'usd',
        { orderId },
      );

      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentType: prismaPaymentType,
          stripePaymentId: paymentIntent.id,
        },
      });

      return {
        order_id: orderId,
        payment_type: paymentType,
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      };
    } else {
      // Cash payment
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentType: prismaPaymentType,
        },
      });

      return {
        order_id: orderId,
        payment_type: paymentType,
        message: 'Cash payment initiated. Call /confirm to complete.',
      };
    }
  }

  async confirmPayment(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new BadRequestException(`Order with ID ${orderId} not found`);
    }

    if (order.status === OrderStatus.PAID) {
      throw new BadRequestException('Order is already paid');
    }

    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Cannot confirm a cancelled order');
    }

    if (!order.paymentType) {
      throw new BadRequestException(
        'Payment has not been initiated. Call /pay first.',
      );
    }

    // For card payments, verify with Stripe that payment succeeded
    if (order.paymentType === PaymentType.CARD && order.stripePaymentId) {
      const paymentIntent = await this.stripeService.retrievePaymentIntent(
        order.stripePaymentId,
      );

      if (paymentIntent.status !== 'succeeded') {
        throw new BadRequestException(
          `Payment not completed. Stripe status: ${paymentIntent.status}`,
        );
      }
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID },
      include: {
        items: {
          include: {
            menuItem: true,
            modifiers: {
              include: {
                modifier: true,
              },
            },
          },
        },
      },
    });

    return this.formatOrderResponse(updatedOrder);
  }

  private formatOrderResponse(order: any) {
    return {
      id: order.id,
      status: order.status,
      payment_type: order.paymentType,
      subtotal: order.subtotal.toNumber(),
      tax: order.tax.toNumber(),
      total: order.total.toNumber(),
      created_at: order.createdAt,
      updated_at: order.updatedAt,
      items: order.items.map((item: any) => ({
        id: item.id,
        menu_item: {
          id: item.menuItem.id,
          name: item.menuItem.name,
          description: item.menuItem.description,
          category: item.menuItem.category,
        },
        quantity: item.quantity,
        unit_price: item.unitPrice.toNumber(),
        total_price: item.totalPrice.toNumber(),
        modifiers: item.modifiers.map((mod: any) => ({
          id: mod.modifier.id,
          name: mod.modifier.name,
          price: mod.price.toNumber(),
        })),
      })),
    };
  }
}
