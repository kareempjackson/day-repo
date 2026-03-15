'use client';

import { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '@/types/menu';
import { MenuItemCard } from './MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
  onItemTap: (item: MenuItem) => void;
}

const categories: MenuCategory[] = ['Drinks', 'Food', 'Other'];

export function MenuGrid({ items, onItemTap }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Drinks');

  const filteredItems = useMemo(
    () => items.filter(item => item.category === activeCategory),
    [items, activeCategory]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-zinc-800">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-1 py-4 text-lg font-medium transition-colors ${
              activeCategory === category
                ? 'bg-amber-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-3">
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onTap={onItemTap}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
