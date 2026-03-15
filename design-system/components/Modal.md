# Modal

Overlay dialog for focused interactions.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | false | Controls visibility |
| onClose | () => void | - | Close handler |
| title | string | - | Modal header title |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Modal width |
| closeOnOverlay | boolean | true | Close when clicking backdrop |
| showClose | boolean | true | Show X button |
| children | ReactNode | - | Modal body content |
| footer | ReactNode | - | Footer actions area |

## Sizes
- **sm**: max-width 400px
- **md**: max-width 560px
- **lg**: max-width 720px

## Structure
```
┌─────────────────────────────────┐
│ Title                       [X] │
├─────────────────────────────────┤
│                                 │
│           Content               │
│                                 │
├─────────────────────────────────┤
│              [Cancel] [Confirm] │
└─────────────────────────────────┘
```

## Styles
- Backdrop: `brown-800` at 50% opacity
- Background: white
- Border-radius: 16px
- Shadow: xl
- Header padding: 20px 24px
- Body padding: 24px
- Footer padding: 16px 24px

## Accessibility
- Focus trap enabled
- ESC key closes modal
- aria-modal="true"
- aria-labelledby for title