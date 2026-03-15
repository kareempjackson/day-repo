'use client';

import { useMemo } from 'react';
import { OrderItem } from '@/types/menu';
import { OrderItemRow } from './OrderItemRow';

interface OrderSummaryProps {
  items: OrderItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCharge: () => void;
}

export function OrderSummary({ items, onUpdateQuantity, onRemoveItem, onCharge }: OrderSummaryProps) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <div className="flex flex-col h-full bg-zinc-900">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">Current Order</h2>
        <p className="text-sm text-zinc-500">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.length === 0 ? (
          <div className="text-center text-zinc-500 py-8">
            <p>No items yet</p>
            <p className="text-sm mt-1">Tap menu items to add</p>
          </div>
        ) : (
          items.map(item => (
            <OrderItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-950">
        <div className="flex justify-between items-center mb-4">
          <span className="text-zinc-400">Total</span>
          <span className="text-2xl font-bold text-zinc-100">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCharge}
          disabled={items.length === 0}
          className="w-full py-4 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-xl font-bold rounded-lg transition-colors active:bg-amber-700"
        >
          {items.length > 0 ? `Charge $${total.toFixed(2)}` : 'Add items to order'}
        </button>
      </div>
    </div>
  );
}
