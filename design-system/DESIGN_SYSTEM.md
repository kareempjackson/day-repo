# Test Day Design System

Design system for a tablet-first coffee shop POS application.

## Design Principles

1. **Touch-First**: All interactive elements minimum 44px, recommended 56px for primary actions
2. **Warm & Inviting**: Coffee-inspired palette creates welcoming atmosphere
3. **Clear Hierarchy**: Strong visual distinction between actions
4. **Fast & Responsive**: Immediate feedback for all interactions

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Brown 600 | #6F4E37 | Primary actions, headings |
| Brown 700 | #5C4033 | Hover states |
| Brown 800 | #3E2723 | Primary text |

### Secondary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Cream 50 | #FFFDF7 | Page background |
| Cream 100 | #FDF8ED | Subtle backgrounds |
| Cream 200 | #F5EBDA | Secondary buttons, cards |
| Cream 300 | #E8D9C0 | Borders, dividers |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Forest 500 | #4A7C59 | Success, prices, accents |
| Forest 600 | #3D6B4A | Accent hover |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Error | #DC4C4C | Error states, destructive |
| Warning | #E6A23C | Warnings, low stock |
| Success | #4A7C59 | Success states |

## Typography

### Font Families
- **Sans**: Inter — UI text, labels, body
- **Display**: Playfair Display — Headings, branding

### Scale
| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 32px | Bold | Page titles |
| Heading | 24px | Semibold | Section headers |
| Title | 20px | Semibold | Card titles |
| Body Large | 18px | Normal | Prices, emphasis |
| Body | 16px | Normal | Default text |
| Caption | 14px | Medium | Labels, secondary |
| Small | 12px | Normal | Timestamps, badges |

## Spacing

Base unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight gaps |
| space-2 | 8px | Related elements |
| space-3 | 12px | Default gaps |
| space-4 | 16px | Component padding |
| space-6 | 24px | Section spacing |
| space-8 | 32px | Large sections |

## Touch Targets

- **Minimum**: 44px × 44px (WCAG AAA)
- **Recommended**: 56px for primary actions
- **Spacing**: 8px minimum between targets

## Components

See individual component specs:
- [Button](./components/Button.md)
- [Card](./components/Card.md)
- [Modal](./components/Modal.md)
- [NumPad](./components/NumPad.md)
- [MenuItemCard](./components/MenuItemCard.md)
- [OrderSummary](./components/OrderSummary.md)
- [Toast](./components/Toast.md)

## Layout Guidelines

### Tablet Layout (Primary)
- Orientation: Landscape preferred
- Grid: 12 columns, 24px gutters
- Typical split: 60% menu / 40% order summary

### Safe Areas
- Top: 16px minimum
- Bottom: 24px (home indicator space)
- Sides: 24px

## Accessibility

- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI)
- Focus indicators: 2px `forest-500` outline
- Motion: Respect reduced-motion preference
- Touch: 44px minimum targets