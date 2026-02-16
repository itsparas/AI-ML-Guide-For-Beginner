# Styling & Design System

---

## Overview

Styling uses **TailwindCSS 3** with class-based dark mode (`darkMode: "class"`), augmented by custom CSS in `src/index.css` for glassmorphism effects and light-mode overrides.

---

## Custom Color Palette (tailwind.config.js)

### Primary (Indigo)

50 `#eef2ff` → 950 `#1e1b4b` — Used for buttons, links, accent elements

### Accent (Fuchsia/Purple)

50 `#fdf4ff` → 950 `#4a044e` — Used for gradients, highlights

### Surface (Neutral/Slate)

50 `#f8fafc` → 950 `#0a0a0f` — Used for backgrounds, cards, text

**Usage Pattern**: Dark mode uses `surface-900`/`950` backgrounds with `surface-100`/`200` text. Light mode inverts via CSS overrides.

---

## Custom Fonts

| Font               | CSS Class   | Usage                 |
| ------------------ | ----------- | --------------------- |
| **Inter**          | `font-sans` | All UI text (default) |
| **JetBrains Mono** | `font-mono` | Code blocks, badges   |

Loaded via Google Fonts CDN in `index.css`.

---

## Custom CSS Components (index.css)

### Glass Effects

- `.glass` — `bg-white/5 backdrop-blur-xl border-white/10 shadow-xl`
- `.glass-hover` — hover state: `bg-white/10 border-white/20`

### Gradient Utilities

- `.gradient-text` — Animated gradient text (primary → accent → primary, 200% width, 3s infinite)
- `.gradient-border` — Transparent border with gradient background-clip

### Card Effects

- `.card-glow` — Pseudo-element glow on hover (indigo/fuchsia gradient border, fade in on hover)

### Buttons

- `.btn-primary` — Gradient primary → accent with hover states and active scale
- `.btn-secondary` — Glass background with hover transition

### Phase-specific

- `.node-connector` — Vertical gradient line connecting phase cards
- `.phase-badge` — Inline badge for difficulty/status

---

## Light Mode System

The app defaults to dark mode. Light mode is toggled by adding class `"light"` to `<html>`.

**Implementation**: `index.css` contains ~300 lines of `.light` prefix overrides that remap:

- Surface backgrounds (900/800/700) → white/slate tones
- Text colors → dark slate tones
- Glass effects → white backgrounds with subtle borders
- Scrollbar colors → lighter shades
- React Flow nodes/controls → light backgrounds
- Modal overlays → reduced opacity
- Canvas particle background → 60% opacity

---

## Custom Tailwind Keyframes & Animations

| Animation    | Duration | Effect                                          |
| ------------ | -------- | ----------------------------------------------- |
| `gradient`   | 3s       | Background-position shift for gradient-text     |
| `float`      | 6s       | Gentle Y translation (-10px) for floating cards |
| `pulse-glow` | 2s       | Opacity 0.5→1→0.5 for glowing indicators        |
| `slide-up`   | 0.5s     | TranslateY(20px→0) + fade in for appearance     |
| `spin-slow`  | 8s       | Slow rotation for decorative elements           |
| `shimmer`    | 2s       | TranslateX(-100%→100%) for loading skeletons    |

---

## Responsive Breakpoints (Tailwind defaults)

- **Mobile (<768px)**: Single column, hamburger menu, overlay sidebar
- **Tablet (md)**: 2-column grids, collapsible sidebar
- **Desktop (lg+)**: 3-column grids, persistent sidebar (w-72)

---

## React Flow Overrides

Custom CSS removes React Flow attribution badge and styles minimap, controls, edges, and background for both light and dark themes.

---

## Key Design Patterns

1. **Glassmorphism**: Used for sidebar, cards, modals — `backdrop-blur-xl` with very low white opacity
2. **Gradient Borders**: Cards use animated gradient borders on hover via pseudo-elements
3. **Phase Colors**: Each phase has unique brand colors (gradientFrom/gradientTo) used for headers, progress bars, badges
4. **Framer Motion**: Page transitions, modal enter/exit, list stagger animations, button scale effects
5. **Confetti Celebrations**: `canvas-confetti` fires on phase completion
