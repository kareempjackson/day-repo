'use client';

import { memo, useState, useRef } from 'react';
import { OrderItem } from '@/types/menu';

interface OrderItemRowProps {
  item: OrderItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const OrderItemRow = memo(function OrderItemRow({ item, onUpdateQuantity, onRemove }: OrderItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const modifierText = Object.entries(item.selectedModifiers)
    .map(([key, value]) => value)
    .join(', ');

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.touches[0].clientX - touchStart;
    if (diff < 0) {
      setTranslateX(Math.max(diff, -100));
    }
  };

  const handleTouchEnd = () => {
    if (translateX < -50) {
      onRemove(item.id);
    }
    setTranslateX(0);
    setTouchStart(null);
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="absolute inset-y-0 right-0 w-24 bg-red-600 flex items-center justify-center text-white font-medium"
      >
        Remove
      </div>
      <div
        ref={rowRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateX(${translateX}px)` }}
        className="bg-zinc-800 p-3 rounded-lg transition-transform"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0" onClick={() => setIsEditing(!isEditing)}>
            <p className="font-medium text-zinc-100 truncate">{item.menuItem.name}</p>
            {modifierText && (
              <p className="text-sm text-zinc-400 truncate">{modifierText}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold text-amber-500">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-10 h-10 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xl font-bold"
            >
              −
            </button>
            <span className="w-10 text-center text-lg font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-10 h-10 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-xl font-bold"
            >
              +
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="ml-auto px-4 h-10 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-zinc-500">Qty: {item.quantity}</span>
            <span className="text-xs text-zinc-600">Tap to edit</span>
          </div>
        )}
      </div>
    </div>
  );
});
