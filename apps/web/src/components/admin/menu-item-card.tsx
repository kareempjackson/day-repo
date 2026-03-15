'use client';

import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onToggleAvailability: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onEdit, onDelete, onToggleAvailability }: MenuItemCardProps) {
  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-zinc-100 font-medium truncate">{item.name}</h3>
          <p className="text-amber-500 font-semibold mt-1">${item.price.toFixed(2)}</p>
          
          {item.modifiers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {item.modifiers.slice(0, 3).map((mod) => (
                <span
                  key={mod.id}
                  className="text-xs bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded"
                >
                  {mod.name}
                </span>
              ))}
              {item.modifiers.length > 3 && (
                <span className="text-xs text-zinc-500">+{item.modifiers.length - 3} more</span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <Toggle
            checked={item.available}
            onChange={() => onToggleAvailability(item)}
            aria-label={`Toggle ${item.name} availability`}
          />
          <span className={`text-xs ${item.available ? 'text-green-400' : 'text-zinc-500'}`}>
            {item.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-700/50">
        <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="flex-1">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(item)} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </Button>
      </div>
    </div>
  );
}