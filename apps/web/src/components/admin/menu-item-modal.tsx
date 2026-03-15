'use client';

import { useState, useEffect, FormEvent } from 'react';
import { MenuItem, Modifier, MENU_CATEGORIES } from '@/types/menu';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { ModifierForm } from './modifier-form';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  item?: MenuItem | null;
}

interface FormData {
  name: string;
  price: string;
  category: string;
  available: boolean;
  modifiers: Modifier[];
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
}

export function MenuItemModal({ isOpen, onClose, onSave, item }: MenuItemModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    category: '',
    available: true,
    modifiers: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        price: item.price.toFixed(2),
        category: item.category,
        available: item.available,
        modifiers: [...item.modifiers],
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        available: true,
        modifiers: [],
      });
    }
    setErrors({});
  }, [item, isOpen]);
  
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSave({
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      available: formData.available,
      modifiers: formData.modifiers,
    });
    
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Menu Item' : 'Add Menu Item'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          placeholder="Enter item name"
          required
        />
        
        <div className="relative">
          <Input
            label="Price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            error={errors.price}
            placeholder="0.00"
            className="pl-7"
            required
          />
          <span className="absolute left-3 top-[34px] text-zinc-400">$</span>
        </div>
        
        <Select
          label="Category"
          options={MENU_CATEGORIES}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          error={errors.category}
          placeholder="Select a category"
          required
        />
        
        <div>
          <Toggle
            label="Available"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
          />
        </div>
        
        <div className="border-t border-zinc-800 pt-5">
          <ModifierForm
            modifiers={formData.modifiers}
            onChange={(modifiers) => setFormData({ ...formData, modifiers })}
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {item ? 'Save Changes' : 'Add Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}