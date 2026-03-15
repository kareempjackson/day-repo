export interface DailyStats {
  totalRevenue: number;
  orderCount: number;
  cardPayments: number;
  cashPayments: number;
  cardOrderCount: number;
  cashOrderCount: number;
}

export interface Order {
  id: string;
  time: string;
  total: number;
  paymentType: 'card' | 'cash';
  items: string[];
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}
