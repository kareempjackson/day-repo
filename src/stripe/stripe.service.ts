import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService implements OnModuleInit {
  private stripe: Stripe;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      console.warn(
        'STRIPE_SECRET_KEY not configured. Stripe payments will not work.',
      );
      return;
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    metadata?: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    if (!this.stripe) {
      throw new Error('Stripe is not configured');
    }

    return this.stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
      payment_method_types: ['card_present'],
      capture_method: 'automatic',
    });
  }

  async retrievePaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    if (!this.stripe) {
      throw new Error('Stripe is not configured');
    }

    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  async cancelPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    if (!this.stripe) {
      throw new Error('Stripe is not configured');
    }

    return this.stripe.paymentIntents.cancel(paymentIntentId);
  }
}
