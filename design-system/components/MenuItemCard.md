# MenuItemCard

Displays a menu item for selection.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | - | Item name |
| price | number | - | Price in cents |
| image | string | - | Optional image URL |
| category | string | - | Category label |
| available | boolean | true | Availability state |
| onTap | () => void | - | Selection handler |

## Layout
```
┌─────────────────────┐
│     [  Image  ]     │  (optional)
├─────────────────────┤
│ Cappuccino          │
│ $4.50               │
└─────────────────────┘
```

## Dimensions
- Width: flexible (grid-based)
- Min-height: 100px (no image), 160px (with image)
- Touch target: entire card (min 44px)

## Styles
- Background: white
- Border: 1px solid `cream-300`
- Border-radius: 12px
- Padding: 12px
- Name: 16px, semibold, `brown-800`
- Price: 18px, bold, `forest-600`

## States
- **Default**: As described
- **Hover**: shadow-md, border `brown-400`
- **Active**: scale 0.97
- **Unavailable**: opacity 0.5, "Unavailable" badge

## Grid Recommendation
- Tablet: 3-4 columns
- Gap: 12px