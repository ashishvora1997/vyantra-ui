</div>

> ⚠️ **Project Status: Early Development**
>
> Vyantra is currently under active development.
> At the moment, only the **Button** component is available.
>
> The API and components may change as the library evolves,
> so we **do not recommend using it in production yet**.
>
> More components and features are coming soon 🚀

---

<div align="center">

# `@vyantra/tokens`

**Design tokens for the Vyantra design system**  
Colors · Typography · Spacing · Shadows · Radius · Motion

[![npm version](https://img.shields.io/npm/v/@vyantra/tokens?color=6366f1&label=npm)](https://www.npmjs.com/package/@vyantra/tokens)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@vyantra/tokens)](https://bundlephobia.com/package/@vyantra/tokens)

</div>

---

## What is this?

`@vyantra/tokens` is the foundation of the Vyantra design system. It ships a single CSS file that defines every design decision as a CSS custom property (variable) — colors, spacing, typography, shadows, radius, and motion.

**Everything in the system uses these tokens. You never hardcode a value.**

```css
/* ✅ Do this */
color: var(--color-text-primary);
padding: var(--spacing-4);

/* ❌ Never this */
color: #111827;
padding: 16px;
```

---

## Install

```bash
# npm
npm install @vyantra/tokens

# pnpm
pnpm add @vyantra/tokens

# yarn
yarn add @vyantra/tokens
```

---

## Quick Start

### In a React / Vite app

Import the CSS **once** at the root of your app — usually `main.tsx` or `index.tsx`.

```tsx
// main.tsx
import '@vyantra/tokens/css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

### In a plain HTML project

```html
<head>
  <link rel="stylesheet" href="node_modules/@vyantra/tokens/dist/tokens.css" />
</head>
```

### In a CSS / SCSS file

```css
@import '@vyantra/tokens/css';
```

After that, every token is available as a CSS variable anywhere in your project.

---

## Token Categories

### 🎨 Colors

Tokens follow a two-layer architecture:

| Layer | Purpose | Example |
|-------|---------|---------|
| **Primitives** | Raw palette values. Never use directly. | `--primitive-blue-600` |
| **Semantics** | Role-based names. Use these in components. | `--color-primary` |

#### Surfaces & Backgrounds

| Token | Light | Dark | Use for |
|-------|-------|------|---------|
| `--color-bg` | `#ffffff` | `#0c0d11` | Page background |
| `--color-bg-subtle` | `#f9fafb` | `#111318` | Sidebar, cards |
| `--color-bg-muted` | `#f3f4f6` | `#181920` | Input backgrounds |
| `--color-bg-emphasis` | `#e5e7eb` | `#1f2029` | Hover states |
| `--color-bg-inverse` | `#111827` | `#f0f1f5` | Tooltips, badges |

#### Borders

| Token | Use for |
|-------|---------|
| `--color-border` | Default borders, dividers |
| `--color-border-strong` | Emphasized borders |
| `--color-border-focus` | Focus rings |

#### Text

| Token | Use for |
|-------|---------|
| `--color-text-primary` | Main body text |
| `--color-text-secondary` | Supporting text, labels |
| `--color-text-tertiary` | Hints, placeholders |
| `--color-text-disabled` | Disabled text |
| `--color-text-inverse` | Text on dark surfaces |
| `--color-text-link` | Hyperlinks |

#### Intent Colors

Each intent (primary, secondary, success, warning, danger, info, neutral) ships a full set of tokens:

```
--color-{intent}           → solid background
--color-{intent}-hover     → hover state
--color-{intent}-active    → pressed state
--color-{intent}-subtle    → very light tint (soft buttons, alerts)
--color-{intent}-muted     → light tint
--color-{intent}-border    → border color
--color-{intent}-text      → text on subtle/muted backgrounds
--color-on-{intent}        → text on solid backgrounds (always readable)
```

**Available intents:** `primary` · `secondary` · `success` · `warning` · `danger` · `info` · `neutral`

Example usage:

```css
.my-badge {
  background: var(--color-success-subtle);
  color: var(--color-success-text);
  border: 1px solid var(--color-success-border);
}

.my-cta-button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.my-cta-button:hover {
  background: var(--color-primary-hover);
}
```

---

### 📐 Spacing

4px base unit. Use for padding, margin, gap, width, height.

| Token | Value | Pixels |
|-------|-------|--------|
| `--spacing-px` | `1px` | 1 |
| `--spacing-0-5` | `2px` | 2 |
| `--spacing-1` | `4px` | 4 |
| `--spacing-1-5` | `6px` | 6 |
| `--spacing-2` | `8px` | 8 |
| `--spacing-2-5` | `10px` | 10 |
| `--spacing-3` | `12px` | 12 |
| `--spacing-3-5` | `14px` | 14 |
| `--spacing-4` | `16px` | 16 |
| `--spacing-5` | `20px` | 20 |
| `--spacing-6` | `24px` | 24 |
| `--spacing-7` | `28px` | 28 |
| `--spacing-8` | `32px` | 32 |
| `--spacing-10` | `40px` | 40 |
| `--spacing-12` | `48px` | 48 |
| `--spacing-16` | `64px` | 64 |
| `--spacing-20` | `80px` | 80 |

---

### 🔤 Typography

| Token | Value | Use for |
|-------|-------|---------|
| `--font-sans` | Geist, system-ui | All body text |
| `--font-mono` | Geist Mono, JetBrains Mono | Code, numbers |
| `--text-2xs` | `0.625rem` (10px) | Micro labels |
| `--text-xs` | `0.75rem` (12px) | Captions, badges |
| `--text-sm` | `0.875rem` (14px) | Body small, buttons |
| `--text-md` | `1rem` (16px) | Body default |
| `--text-lg` | `1.125rem` (18px) | Body large |
| `--text-xl` | `1.25rem` (20px) | Subheadings |
| `--text-2xl` | `1.5rem` (24px) | Section headings |
| `--text-3xl` | `1.875rem` (30px) | Page headings |
| `--text-4xl` | `2.25rem` (36px) | Display |
| `--weight-regular` | `400` | Normal text |
| `--weight-medium` | `500` | UI labels, buttons |
| `--weight-semibold` | `600` | Headings |
| `--weight-bold` | `700` | Strong emphasis |
| `--leading-none` | `1` | Icon buttons |
| `--leading-tight` | `1.25` | Headings |
| `--leading-normal` | `1.5` | Body text |

---

### 🔘 Border Radius

| Token | Value | Use for |
|-------|-------|---------|
| `--radius-none` | `0px` | Sharp corners |
| `--radius-xs` | `2px` | Subtle rounding |
| `--radius-sm` | `4px` | Chips, tags |
| `--radius-md` | `6px` | Buttons, inputs (default) |
| `--radius-lg` | `8px` | Cards |
| `--radius-xl` | `12px` | Large cards, modals |
| `--radius-2xl` | `16px` | Panels |
| `--radius-full` | `9999px` | Pill shapes |

---

### 🌑 Shadows

| Token | Use for |
|-------|---------|
| `--shadow-xs` | Subtle lift (inputs) |
| `--shadow-sm` | Cards, dropdowns |
| `--shadow-md` | Modals, popovers |
| `--shadow-lg` | Dialogs, elevated sheets |

---

### ⚡ Motion / Duration

| Token | Value | Use for |
|-------|-------|---------|
| `--duration-fast` | `100ms` | Hover states |
| `--duration-normal` | `150ms` | Most transitions |
| `--duration-slow` | `200ms` | Panel open/close |
| `--duration-slower` | `300ms` | Page transitions |

---

## Theming

### Light / Dark (built-in)

Both themes are included out of the box. Set `data-theme` on your `<html>` or any container:

```html
<!-- Light (default) -->
<html>

<!-- Dark -->
<html data-theme="dark">

<!-- Dark only inside a specific section -->
<section data-theme="dark">
  ...
</section>
```

> Light theme is the default — no attribute needed. All semantic tokens automatically update when the theme changes.

### Custom Theme

Override any semantic token on your own selector — no need to touch the package:

```css
/* Brand override */
[data-theme="brand"] {
  --color-primary:       #e11d48;   /* rose-600 */
  --color-primary-hover: #be123c;
  --color-primary-subtle: #fff1f2;
  --color-primary-text:   #9f1239;
  --color-on-primary:    #ffffff;
}
```

```html
<div data-theme="brand">
  <!-- All @vyantra/ui components here use your brand colors automatically -->
</div>
```

---

## JavaScript / TypeScript Tokens

If you need token values in JavaScript (for Tailwind config, Storybook, or theming logic), you can import them as typed objects:

```ts
import { allTokens, type TokenName, type TokenValue } from '@vyantra/tokens';

console.log(allTokens['color-primary']); // '#2563eb'

// Fully typed
const token: TokenName = 'spacing-4'; // ✅ autocompletes
```

---

## Using in Tailwind CSS

```js
// tailwind.config.js
import tokens from '@vyantra/tokens';

export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-subtle': 'var(--color-primary-subtle)',
        danger: 'var(--color-danger)',
        // add as many as you need
      },
      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        4: 'var(--spacing-4)',
        // ...
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        full: 'var(--radius-full)',
      },
    },
  },
};
```

---

## Package Contents

```
@vyantra/tokens
├── dist/
│   ├── tokens.css     ← All CSS variables (import this)
│   ├── index.js       ← JS token objects (ESM)
│   ├── index.cjs      ← JS token objects (CJS)
│   └── index.d.ts     ← TypeScript types
```

---

## Peer Dependencies

None. This package has zero runtime dependencies.

---

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for release notes.

---

<div align="center">
  Part of the <strong>Vyantra Design System</strong> · <a href="https://github.com/ashishvora1997/vyantra-ui">GitHub</a> · <a href="https://vyantra.dev">Docs</a>
</div>