export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'confirmed';
  paymentType?: 'cash' | 'card';
  createdAt: string;
}

export type PaymentType = 'cash' | 'card';

export interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}
