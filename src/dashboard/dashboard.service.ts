import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DailySalesResponseDto } from './dto/daily-sales-response.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDailySales(date?: string): Promise<DailySalesResponseDto> {
    const targetDate = date ? new Date(date) : new Date();
    
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await this.prisma.order.findMany({
      where: {
        status: 'paid',
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        totalCents: true,
        paymentMethod: true,
      },
    });

    const result: DailySalesResponseDto = {
      total_revenue_cents: 0,
      order_count: orders.length,
      card_total_cents: 0,
      cash_total_cents: 0,
      card_order_count: 0,
      cash_order_count: 0,
    };

    for (const order of orders) {
      result.total_revenue_cents += order.totalCents;

      if (order.paymentMethod === 'card') {
        result.card_total_cents += order.totalCents;
        result.card_order_count += 1;
      } else if (order.paymentMethod === 'cash') {
        result.cash_total_cents += order.totalCents;
        result.cash_order_count += 1;
      }
    }

    return result;
  }
}
