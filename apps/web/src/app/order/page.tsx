'use client';

import { useState, useCallback } from 'react';
import { PaymentFlow } from '@/components/payment/PaymentFlow';

// Demo page to showcase the payment flow
export default function OrderPage() {
  const [orderId, setOrderId] = useState(`order_${Date.now()}`);
  const [orderTotal, setOrderTotal] = useState(0);
  const [items, setItems] = useState<Array<{ name: string; price: number }>>([]);

  const addItem = useCallback((name: string, price: number) => {
    setItems((prev) => [...prev, { name, price }]);
    setOrderTotal((prev) => prev + price);
  }, []);

  const clearOrder = useCallback(() => {
    setItems([]);
    setOrderTotal(0);
  }, []);

  const handlePaymentComplete = useCallback(() => {
    console.log('Payment completed for order:', orderId);
  }, [orderId]);

  const handleNewOrder = useCallback(() => {
    setOrderId(`order_${Date.now()}`);
    setItems([]);
    setOrderTotal(0);
  }, []);

  const sampleItems = [
    { name: 'Espresso', price: 350 },
    { name: 'Latte', price: 475 },
    { name: 'Cappuccino', price: 450 },
    { name: 'Americano', price: 375 },
    { name: 'Mocha', price: 525 },
    { name: 'Cold Brew', price: 425 },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Coffee Shop POS</h1>
          <p className="text-zinc-400">Order #{orderId.slice(-8)}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Menu */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <div className="grid grid-cols-2 gap-3">
              {sampleItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => addItem(item.name, item.price)}
                  className="p-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all text-left"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-zinc-400 text-sm">
                    ${(item.price / 100).toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Current Order</h2>
              {items.length > 0 && (
                <button
                  onClick={clearOrder}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-4 min-h-[200px]">
              {items.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">No items added</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-zinc-400">
                        ${(item.price / 100).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-zinc-400">Total</span>
              <span className="text-2xl font-bold">
                ${(orderTotal / 100).toFixed(2)}
              </span>
            </div>

            <PaymentFlow
              orderId={orderId}
              amount={orderTotal}
              onPaymentComplete={handlePaymentComplete}
              onNewOrder={handleNewOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
