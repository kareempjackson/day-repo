# OrderSummary

Displays current order with line items and totals.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | OrderItem[] | [] | Order line items |
| subtotal | number | - | Subtotal in cents |
| tax | number | - | Tax amount in cents |
| total | number | - | Total in cents |
| onItemTap | (id: string) => void | - | Item tap handler |
| onItemRemove | (id: string) => void | - | Remove item handler |
| onQuantityChange | (id: string, qty: number) => void | - | Quantity change handler |

## OrderItem Type
```typescript
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  modifiers?: Array<{ name: string; price: number }>;
}
```

## Layout
```
┌─────────────────────────────────┐
│ Current Order                   │
├─────────────────────────────────┤
│ 2x Cappuccino             $9.00 │
│    + Oat Milk             $0.75 │
│ 1x Croissant              $3.50 │
├─────────────────────────────────┤
│ Subtotal                 $13.25 │
│ Tax                       $1.16 │
├─────────────────────────────────┤
│ Total                    $14.41 │
└─────────────────────────────────┘
```

## Styles
- Background: white
- Border-radius: 12px
- Header: `brown-800`, 18px, semibold
- Item name: 16px, medium
- Modifier: 14px, `brown-500`, indented 16px
- Prices: tabular-nums, right-aligned
- Total: 20px, bold, `forest-600`
- Dividers: 1px `cream-300`

## Interactions
- Tap item: Opens modifier/edit modal
- Swipe left: Reveals delete button
- Quantity stepper: +/- buttons (44px touch)