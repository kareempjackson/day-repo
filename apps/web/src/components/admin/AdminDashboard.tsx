'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './AdminHeader';
import { StatsOverview } from './StatsOverview';
import { PaymentBreakdown } from './PaymentBreakdown';
import { RecentOrders } from './RecentOrders';
import { DatePicker } from './DatePicker';
import { DailyStats, Order } from '@/types/admin';

function formatDateForAPI(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      
      try {
        const dateParam = formatDateForAPI(selectedDate);
        
        const [statsRes, ordersRes] = await Promise.all([
          fetch(`/api/admin/stats?date=${dateParam}`),
          fetch(`/api/admin/orders?date=${dateParam}&limit=20`),
        ]);

        if (!statsRes.ok || !ordersRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();

        setStats(statsData);
        setOrders(ordersData.orders || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Set mock data for development
        setStats({
          totalRevenue: 1247.50,
          orderCount: 67,
          cardPayments: 892.30,
          cashPayments: 355.20,
          cardOrderCount: 48,
          cashOrderCount: 19,
        });
        setOrders([
          { id: '1', time: '14:32', total: 12.50, paymentType: 'card', items: ['Latte', 'Croissant'] },
          { id: '2', time: '14:28', total: 4.75, paymentType: 'cash', items: ['Espresso'] },
          { id: '3', time: '14:15', total: 18.90, paymentType: 'card', items: ['Cappuccino', 'Sandwich', 'Cookie'] },
          { id: '4', time: '14:02', total: 6.25, paymentType: 'card', items: ['Americano', 'Muffin'] },
          { id: '5', time: '13:55', total: 8.00, paymentType: 'cash', items: ['Mocha', 'Brownie'] },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [selectedDate]);

  const isToday = formatDateForAPI(selectedDate) === formatDateForAPI(new Date());

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">
              {isToday ? "Today's Dashboard" : 'Dashboard'}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {error && (
          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4 text-amber-200 text-sm">
            <p>Using demo data. API connection: {error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-24 mb-4" />
                <div className="h-8 bg-zinc-800 rounded w-32" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <>
            <StatsOverview stats={stats} />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <PaymentBreakdown stats={stats} />
              <RecentOrders orders={orders} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
