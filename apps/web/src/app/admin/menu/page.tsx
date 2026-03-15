'use client';

import { useState, useEffect, useCallback } from 'react';
import { MenuItem, MENU_CATEGORIES } from '@/types/menu';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
} from '@/lib/menu-store';
import { Button } from '@/components/ui/button';
import { MenuItemModal } from '@/components/admin/menu-item-modal';
import { MenuCategorySection } from '@/components/admin/menu-category-section';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);
  
  const loadItems = useCallback(() => {
    setItems(getMenuItems());
  }, []);
  
  useEffect(() => {
    loadItems();
  }, [loadItems]);
  
  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };
  
  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  const handleSaveItem = (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, data);
    } else {
      createMenuItem(data);
    }
    loadItems();
  };
  
  const handleDeleteItem = (item: MenuItem) => {
    setDeletingItem(item);
  };
  
  const confirmDelete = () => {
    if (deletingItem) {
      deleteMenuItem(deletingItem.id);
      loadItems();
      setDeletingItem(null);
    }
  };
  
  const handleToggleAvailability = (item: MenuItem) => {
    toggleItemAvailability(item.id);
    loadItems();
  };
  
  const groupedItems = MENU_CATEGORIES.reduce((acc, category) => {
    acc[category.value] = items.filter(item => item.category === category.value);
    return acc;
  }, {} as Record<string, MenuItem[]>);
  
  const totalItems = items.length;
  const availableItems = items.filter(i => i.available).length;
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-zinc-100">Menu Management</h1>
              <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500">
                <span>{totalItems} total</span>
                <span>•</span>
                <span className="text-green-400">{availableItems} available</span>
              </div>
            </div>
            <Button onClick={handleAddItem}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Item
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {totalItems === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 mb-4">
              <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-100 mb-2">No menu items yet</h2>
            <p className="text-zinc-500 mb-6">Get started by adding your first menu item.</p>
            <Button onClick={handleAddItem}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {MENU_CATEGORIES.map((category) => (
              <MenuCategorySection
                key={category.value}
                category={category.value}
                items={groupedItems[category.value]}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onToggleAvailability={handleToggleAvailability}
              />
            ))}
          </div>
        )}
      </main>
      
      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />
      
      <ConfirmDialog
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={confirmDelete}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${deletingItem?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}