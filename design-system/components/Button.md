# Button

Primary interactive element for actions throughout the POS system.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual style |
| size | 'md' \| 'lg' | 'md' | Button size (lg recommended for tablet) |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Shows spinner, disables interaction |
| fullWidth | boolean | false | Spans container width |
| icon | ReactNode | - | Optional icon |
| children | ReactNode | - | Button label |

## Variants

### Primary
- Background: `brown-600`, Hover: `brown-700`
- Text: white
- Use for: Main actions (Add to Order, Checkout, Confirm)

### Secondary
- Background: `cream-200`, Hover: `cream-300`
- Text: `brown-800`
- Use for: Secondary actions (Cancel, Back, Edit)

### Ghost
- Background: transparent, Hover: `cream-100`
- Text: `brown-600`
- Use for: Tertiary actions, toolbar buttons

## Sizes
- **md**: height 44px, padding 16px horizontal, font-size 16px
- **lg**: height 56px, padding 24px horizontal, font-size 18px

## Usage
```jsx
<Button variant="primary" size="lg">Add to Order</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" icon={<TrashIcon />}>Remove</Button>
```