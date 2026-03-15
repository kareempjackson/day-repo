# NumPad

Numeric input for PIN entry and quantity selection.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| mode | 'pin' \| 'quantity' \| 'currency' | 'quantity' | Input behavior |
| value | string | '' | Current value |
| onChange | (value: string) => void | - | Value change handler |
| onSubmit | (value: string) => void | - | Enter/confirm handler |
| maxLength | number | 6 | Maximum digits |
| masked | boolean | false | Show dots for PIN |
| showDecimal | boolean | false | Show decimal point key |

## Layout
```
┌───────────────────────┐
│   [  Display Value  ] │
├───────┬───────┬───────┤
│   1   │   2   │   3   │
├───────┼───────┼───────┤
│   4   │   5   │   6   │
├───────┼───────┼───────┤
│   7   │   8   │   9   │
├───────┼───────┼───────┤
│  CLR  │   0   │   ✓   │
└───────┴───────┴───────┘
```

## Key Sizes
- Each key: 72px × 72px minimum
- Gap: 8px
- Total width: ~240px

## Styles
- Key background: `cream-100`
- Key hover: `cream-200`
- Key active: `cream-300`, scale 0.95
- Confirm key: `forest-500` background, white text
- Font: 24px, semibold

## Modes
- **pin**: Masked display, 4-6 digits, no decimal
- **quantity**: Integer only, 1-999 range
- **currency**: Decimal allowed, formats as $X.XX