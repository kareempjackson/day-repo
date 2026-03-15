export type MenuCategory = 'Drinks' | 'Food' | 'Other';

export interface ModifierOption {
  name: string;
  priceAdjustment: number;
  isDefault?: boolean;
}

export interface Modifier {
  type: 'size' | 'milk' | string;
  required: boolean;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  basePrice: number;
  modifiers?: Modifier[];
}

export interface MenuItemWithModifiers extends MenuItem {
  modifiers: Modifier[];
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: Record<string, string>;
  price: number;
}
