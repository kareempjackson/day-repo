'use client';

import { useState, useCallback } from 'react';
import { StickyHeader } from './StickyHeader';
import { MenuGrid } from './MenuGrid';
import { OrderSummary } from './OrderSummary';
import { ModifierModal } from './ModifierModal';
import { MenuItem, OrderItem, MenuItemWithModifiers } from '@/types/menu';
import { menuItems } from '@/data/menuData';

export function RegisterScreen() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isModifierModalOpen, setIsModifierModalOpen] = useState(false);

  const handleMenuItemTap = useCallback((item: MenuItem) => {
    if (item.modifiers && item.modifiers.length > 0) {
      setSelectedMenuItem(item);
      setIsModifierModalOpen(true);
    } else {
      addToOrder(item, {});
    }
  }, []);

  const addToOrder = useCallback((item: MenuItem, selectedModifiers: Record<string, string>) => {
    setOrderItems(prev => {
      const modifierKey = JSON.stringify(selectedModifiers);
      const existingIndex = prev.findIndex(
        o => o.menuItem.id === item.id && JSON.stringify(o.selectedModifiers) === modifierKey
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }

      let price = item.basePrice;
      if (selectedModifiers.size && item.modifiers) {
        const sizeModifier = item.modifiers.find(m => m.type === 'size');
        const selectedOption = sizeModifier?.options.find(o => o.name === selectedModifiers.size);
        if (selectedOption) {
          price = selectedOption.priceAdjustment;
        }
      }

      return [...prev, {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        selectedModifiers,
        price
      }];
    });
  }, []);

  const handleModifierConfirm = useCallback((modifiers: Record<string, string>) => {
    if (selectedMenuItem) {
      addToOrder(selectedMenuItem, modifiers);
    }
    setIsModifierModalOpen(false);
    setSelectedMenuItem(null);
  }, [selectedMenuItem, addToOrder]);

  const handleModifierCancel = useCallback(() => {
    setIsModifierModalOpen(false);
    setSelectedMenuItem(null);
  }, []);

  const updateQuantity = useCallback((orderItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(orderItemId);
      return;
    }
    setOrderItems(prev =>
      prev.map(item =>
        item.id === orderItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((orderItemId: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== orderItemId));
  }, []);

  const handleCharge = useCallback(() => {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Processing payment of $${total.toFixed(2)}`);
    setOrderItems([]);
  }, [orderItems]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <StickyHeader shopName="Bean & Brew" baristaName="Alex" />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/3 border-r border-zinc-800 overflow-hidden">
          <MenuGrid items={menuItems} onItemTap={handleMenuItemTap} />
        </div>
        
        <div className="w-1/3 flex flex-col">
          <OrderSummary
            items={orderItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCharge={handleCharge}
          />
        </div>
      </div>

      {isModifierModalOpen && selectedMenuItem && (
        <ModifierModal
          item={selectedMenuItem}
          onConfirm={handleModifierConfirm}
          onCancel={handleModifierCancel}
        />
      )}
    </div>
  );
}
