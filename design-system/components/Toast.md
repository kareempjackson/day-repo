# Toast

Brief feedback notifications.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | Toast variant |
| message | string | - | Toast message |
| duration | number | 3000 | Auto-dismiss time (ms) |
| action | { label: string; onClick: () => void } | - | Optional action button |
| onDismiss | () => void | - | Dismiss callback |

## Types & Colors
| Type | Background | Icon | Text |
|------|------------|------|------|
| success | `forest-500` | ✓ Checkmark | white |
| error | `error-500` | ✕ X-circle | white |
| warning | `warning-500` | ⚠ Alert | `brown-800` |
| info | `brown-600` | ℹ Info | white |

## Layout
```
┌──────────────────────────────────┐
│ ✓  Item added to order    [Undo]│
└──────────────────────────────────┘
```

## Styles
- Position: bottom center, 24px from edge
- Min-width: 300px
- Max-width: 500px
- Padding: 12px 16px
- Border-radius: 8px
- Shadow: lg
- Font: 14px, medium

## Animation
- Enter: slide up + fade in, 200ms
- Exit: fade out, 150ms

## Stacking
- Max 3 visible toasts
- New toasts push older ones up
- 8px gap between toasts