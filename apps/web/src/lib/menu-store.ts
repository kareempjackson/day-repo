import { MenuItem, Modifier } from '@/types/menu';

// In-memory store for demo purposes - would be replaced with API calls
let menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso',
    price: 3.50,
    category: 'coffee',
    available: true,
    modifiers: [
      { id: 'm1', type: 'size', name: 'Double', priceAdjustment: 1.00 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cappuccino',
    price: 4.50,
    category: 'coffee',
    available: true,
    modifiers: [
      { id: 'm2', type: 'size', name: 'Large', priceAdjustment: 1.50 },
      { id: 'm3', type: 'milk', name: 'Oat Milk', priceAdjustment: 0.75 },
      { id: 'm4', type: 'milk', name: 'Almond Milk', priceAdjustment: 0.75 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Green Tea',
    price: 3.00,
    category: 'tea',
    available: true,
    modifiers: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Croissant',
    price: 3.50,
    category: 'pastry',
    available: false,
    modifiers: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getMenuItems(): MenuItem[] {
  return [...menuItems];
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find(item => item.id === id);
}

export function createMenuItem(data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): MenuItem {
  const newItem: MenuItem = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  menuItems.push(newItem);
  return newItem;
}

export function updateMenuItem(id: string, data: Partial<Omit<MenuItem, 'id' | 'createdAt'>>): MenuItem | null {
  const index = menuItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  menuItems[index] = {
    ...menuItems[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return menuItems[index];
}

export function deleteMenuItem(id: string): boolean {
  const index = menuItems.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  menuItems.splice(index, 1);
  return true;
}

export function toggleItemAvailability(id: string): MenuItem | null {
  const item = menuItems.find(item => item.id === id);
  if (!item) return null;
  
  item.available = !item.available;
  item.updatedAt = new Date().toISOString();
  return item;
}