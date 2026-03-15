import { Order, PaymentType, PaymentResult } from '@/types/order';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function payOrder(orderId: string, paymentType: PaymentType): Promise<PaymentResult> {
  const response = await fetch(`${API_BASE}/orders/${orderId}/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: paymentType }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Payment failed' }));
    return { success: false, error: error.message || 'Payment failed' };
  }

  const data = await response.json();
  return { success: true, transactionId: data.transactionId };
}

export async function confirmOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  const response = await fetch(`${API_BASE}/orders/${orderId}/confirm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Confirmation failed' }));
    return { success: false, error: error.message || 'Confirmation failed' };
  }

  return { success: true };
}

export async function createOrder(): Promise<Order> {
  const response = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: [] }),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
}
