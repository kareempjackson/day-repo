'use client';

import { memo } from 'react';
import { MenuItem } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onTap: (item: MenuItem) => void;
}

export const MenuItemCard = memo(function MenuItemCard({ item, onTap }: MenuItemCardProps) {
  const hasModifiers = item.modifiers && item.modifiers.length > 0;
  const displayPrice = hasModifiers ? `From $${item.basePrice.toFixed(2)}` : `$${item.basePrice.toFixed(2)}`;

  return (
    <button
      onClick={() => onTap(item)}
      className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 rounded-lg p-4 text-left transition-colors duration-100 flex flex-col justify-between min-h-[100px] border border-zinc-700 hover:border-amber-600"
    >
      <span className="font-medium text-zinc-100 line-clamp-2">{item.name}</span>
      <div className="flex items-center justify-between mt-2">
        <span className="text-amber-500 font-semibold">{displayPrice}</span>
        {hasModifiers && (
          <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded">+options</span>
        )}
      </div>
    </button>
  );
});
