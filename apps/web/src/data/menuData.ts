import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  // Drinks
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Drinks',
    basePrice: 3.00,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Single', priceAdjustment: 3.00, isDefault: true },
          { name: 'Double', priceAdjustment: 4.00 },
        ]
      }
    ]
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'Drinks',
    basePrice: 3.50,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 3.50, isDefault: true },
          { name: 'Medium', priceAdjustment: 4.25 },
          { name: 'Large', priceAdjustment: 5.00 },
        ]
      }
    ]
  },
  {
    id: 'latte',
    name: 'Latte',
    category: 'Drinks',
    basePrice: 4.50,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 4.50, isDefault: true },
          { name: 'Medium', priceAdjustment: 5.25 },
          { name: 'Large', priceAdjustment: 6.00 },
        ]
      },
      {
        type: 'milk',
        required: true,
        options: [
          { name: 'Whole Milk', priceAdjustment: 0, isDefault: true },
          { name: 'Oat Milk', priceAdjustment: 0.75 },
          { name: 'Almond Milk', priceAdjustment: 0.75 },
          { name: 'Soy Milk', priceAdjustment: 0.50 },
        ]
      }
    ]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Drinks',
    basePrice: 4.50,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 4.50, isDefault: true },
          { name: 'Medium', priceAdjustment: 5.25 },
          { name: 'Large', priceAdjustment: 6.00 },
        ]
      },
      {
        type: 'milk',
        required: true,
        options: [
          { name: 'Whole Milk', priceAdjustment: 0, isDefault: true },
          { name: 'Oat Milk', priceAdjustment: 0.75 },
          { name: 'Almond Milk', priceAdjustment: 0.75 },
        ]
      }
    ]
  },
  {
    id: 'mocha',
    name: 'Mocha',
    category: 'Drinks',
    basePrice: 5.00,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 5.00, isDefault: true },
          { name: 'Medium', priceAdjustment: 5.75 },
          { name: 'Large', priceAdjustment: 6.50 },
        ]
      },
      {
        type: 'milk',
        required: true,
        options: [
          { name: 'Whole Milk', priceAdjustment: 0, isDefault: true },
          { name: 'Oat Milk', priceAdjustment: 0.75 },
        ]
      }
    ]
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    category: 'Drinks',
    basePrice: 4.00,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 4.00, isDefault: true },
          { name: 'Medium', priceAdjustment: 4.75 },
          { name: 'Large', priceAdjustment: 5.50 },
        ]
      }
    ]
  },
  {
    id: 'drip-coffee',
    name: 'Drip Coffee',
    category: 'Drinks',
    basePrice: 2.50,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 2.50, isDefault: true },
          { name: 'Medium', priceAdjustment: 3.00 },
          { name: 'Large', priceAdjustment: 3.50 },
        ]
      }
    ]
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Drinks',
    basePrice: 4.00,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 4.00, isDefault: true },
          { name: 'Medium', priceAdjustment: 4.75 },
          { name: 'Large', priceAdjustment: 5.50 },
        ]
      },
      {
        type: 'milk',
        required: true,
        options: [
          { name: 'Whole Milk', priceAdjustment: 0, isDefault: true },
          { name: 'Oat Milk', priceAdjustment: 0.75 },
        ]
      }
    ]
  },
  {
    id: 'tea',
    name: 'Tea',
    category: 'Drinks',
    basePrice: 3.00,
    modifiers: [
      {
        type: 'size',
        required: true,
        options: [
          { name: 'Small', priceAdjustment: 3.00, isDefault: true },
          { name: 'Medium', priceAdjustment: 3.50 },
          { name: 'Large', priceAdjustment: 4.00 },
        ]
      }
    ]
  },
  // Food
  {
    id: 'croissant',
    name: 'Butter Croissant',
    category: 'Food',
    basePrice: 3.50
  },
  {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    category: 'Food',
    basePrice: 4.50
  },
  {
    id: 'chocolate-croissant',
    name: 'Chocolate Croissant',
    category: 'Food',
    basePrice: 4.00
  },
  {
    id: 'bagel',
    name: 'Bagel',
    category: 'Food',
    basePrice: 2.50
  },
  {
    id: 'bagel-cream-cheese',
    name: 'Bagel w/ Cream Cheese',
    category: 'Food',
    basePrice: 4.00
  },
  {
    id: 'muffin',
    name: 'Blueberry Muffin',
    category: 'Food',
    basePrice: 3.50
  },
  {
    id: 'banana-bread',
    name: 'Banana Bread',
    category: 'Food',
    basePrice: 3.75
  },
  {
    id: 'cookie',
    name: 'Chocolate Chip Cookie',
    category: 'Food',
    basePrice: 2.50
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'Food',
    basePrice: 8.50
  },
  // Other
  {
    id: 'coffee-beans',
    name: 'Coffee Beans (12oz)',
    category: 'Other',
    basePrice: 18.00
  },
  {
    id: 'gift-card-25',
    name: 'Gift Card $25',
    category: 'Other',
    basePrice: 25.00
  },
  {
    id: 'gift-card-50',
    name: 'Gift Card $50',
    category: 'Other',
    basePrice: 50.00
  },
  {
    id: 'tumbler',
    name: 'Tumbler',
    category: 'Other',
    basePrice: 24.00
  },
  {
    id: 'mug',
    name: 'Ceramic Mug',
    category: 'Other',
    basePrice: 15.00
  },
  {
    id: 'water',
    name: 'Bottled Water',
    category: 'Other',
    basePrice: 2.00
  }
];
