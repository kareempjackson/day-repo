export interface Modifier {
  id: string;
  type: 'size' | 'milk';
  name: string;
  priceAdjustment: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  modifiers: Modifier[];
  createdAt: string;
  updatedAt: string;
}

export type MenuCategory = 'coffee' | 'tea' | 'pastry' | 'sandwich' | 'beverage';

export const MENU_CATEGORIES: { value: MenuCategory; label: string }[] = [
  { value: 'coffee', label: 'Coffee' },
  { value: 'tea', label: 'Tea' },
  { value: 'pastry', label: 'Pastries' },
  { value: 'sandwich', label: 'Sandwiches' },
  { value: 'beverage', label: 'Other Beverages' },
];

export const MODIFIER_TYPES: { value: 'size' | 'milk'; label: string }[] = [
  { value: 'size', label: 'Size' },
  { value: 'milk', label: 'Milk' },
];