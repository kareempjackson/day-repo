'use client';

import { MenuItem, MENU_CATEGORIES } from '@/types/menu';
import { MenuItemCard } from './menu-item-card';

interface MenuCategorySectionProps {
  category: string;
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onToggleAvailability: (item: MenuItem) => void;
}

export function MenuCategorySection({
  category,
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
}: MenuCategorySectionProps) {
  const categoryLabel = MENU_CATEGORIES.find(c => c.value === category)?.label || category;
  
  if (items.length === 0) return null;
  
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-zinc-100">{categoryLabel}</h2>
        <span className="text-sm text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleAvailability={onToggleAvailability}
          />
        ))}
      </div>
    </section>
  );
}