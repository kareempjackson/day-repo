# Card

Container component for grouping related content.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | Internal padding |
| shadow | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | Shadow depth |
| interactive | boolean | false | Adds hover state |
| selected | boolean | false | Selected state styling |
| children | ReactNode | - | Card content |

## Styles
- Background: white
- Border: 1px solid `cream-300`
- Border-radius: 12px
- Padding (md): 16px

## Interactive State
When `interactive={true}`:
- Cursor: pointer
- Hover: shadow-lg, border `brown-400`
- Active: scale 0.98

## Selected State
- Border: 2px solid `forest-500`
- Background: `cream-50`

## Usage
```jsx
<Card padding="lg" shadow="md">
  <h3>Order #42</h3>
  <p>3 items • $12.50</p>
</Card>
```