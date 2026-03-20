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

# `@vyantra/ui`

**React component library for the Vyantra design system**

[![npm version](https://img.shields.io/npm/v/@vyantra/ui?color=6366f1&label=npm)](https://www.npmjs.com/package/@vyantra/ui)
[![license](https://img.shields.io/badge/license-MIT-blue)](../../LICENSE)
[![react](https://img.shields.io/badge/react-18%2B-61dafb)](https://react.dev)
[![typescript](https://img.shields.io/badge/typescript-5%2B-3178c6)](https://www.typescriptlang.org)

</div>

---

## What is this?

`@vyantra/ui` is the React component library of the Vyantra design system. It ships fully-typed, accessible, theme-aware UI components built on top of `@vyantra/tokens`.

**Currently available:** `Button`  
**Coming soon:** Input · Checkbox · Select · Badge · Modal · Tooltip · Toast · Tabs · Table

---

## Requirements

| Dependency | Version |
|------------|---------|
| React | `>=18.0.0` |
| react-dom | `>=18.0.0` |
| `@vyantra/tokens` | `>=0.1.0` |

---

## Install

```bash
# npm
npm install @vyantra/ui @vyantra/tokens

# pnpm
pnpm add @vyantra/ui @vyantra/tokens

# yarn
yarn add @vyantra/ui @vyantra/tokens
```

> Both packages are needed. `@vyantra/tokens` provides the CSS variables that power the component styles.

---

## Setup

You need to do **two things** once at the root of your app:

### 1. Import the tokens CSS

```tsx
// main.tsx  (or index.tsx — wherever your app boots)
import '@vyantra/tokens/css';
```

### 2. Import the component styles

```tsx
import '@vyantra/ui/styles';
```

**Full example `main.tsx`:**

```tsx
import '@vyantra/tokens/css';
import '@vyantra/ui/styles';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

That's all the setup you need. Every component in the library is now ready to use.

---

## Components

---

### `<Button />`

The core interactive element. Supports **7 intents × 5 appearances = 35 visual combinations**, plus sizes, shapes, icons, loading, and more.

#### Basic usage

```tsx
import { Button } from '@vyantra/ui';

<Button>Click me</Button>
```

#### With intent and appearance

```tsx
<Button intent="primary"   appearance="solid">Save</Button>
<Button intent="danger"    appearance="outline">Delete</Button>
<Button intent="success"   appearance="soft">Confirm</Button>
<Button intent="secondary" appearance="ghost">Cancel</Button>
<Button intent="neutral"   appearance="link">Learn more</Button>
```

#### Size

7 sizes from micro to display-scale:

```tsx
<Button size="2xs">Tiny</Button>
<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>   {/* default */}
<Button size="lg">Large</Button>
<Button size="xl">X-Large</Button>
<Button size="2xl">Display</Button>
```

#### Radius / Shape

```tsx
<Button radius="none">Sharp</Button>
<Button radius="sm">Slightly rounded</Button>
<Button radius="md">Default</Button>
<Button radius="lg">Rounded</Button>
<Button radius="xl">More rounded</Button>
<Button radius="full">Pill</Button>
```

#### Icons

Pass any React node — works with any icon library:

```tsx
import { PlusIcon, ArrowRightIcon } from 'lucide-react';

// Icon before label
<Button startIcon={<PlusIcon size={16} />}>Add item</Button>

// Icon after label
<Button endIcon={<ArrowRightIcon size={16} />}>Continue</Button>

// Both
<Button startIcon={<SearchIcon size={14} />} endIcon={<ArrowRightIcon size={14} />}>
  Search docs
</Button>
```

#### Icon-only button

Use `iconOnly` + `aria-label` for accessible square / pill icon buttons:

```tsx
// Square icon button
<Button
  iconOnly={<TrashIcon size={16} />}
  intent="danger"
  appearance="soft"
  aria-label="Delete item"
/>

// Pill icon button
<Button
  iconOnly={<PlusIcon size={16} />}
  intent="primary"
  radius="full"
  aria-label="Add new"
/>
```

> `aria-label` is **required** for icon-only buttons. Your TypeScript will warn if you forget it.

#### Loading state

```tsx
// Basic loading — shows spinner, blocks interaction
<Button loading>Saving</Button>

// With custom loading text
<Button loading loadingText="Uploading…" intent="primary">
  Upload file
</Button>

// Spinner at end instead of start
<Button loading loadingSpinnerPosition="end">Processing</Button>
```

#### Disabled

```tsx
<Button disabled>Not available</Button>
<Button disabled intent="danger" appearance="outline">Delete</Button>
```

#### Full width

```tsx
// Fills container width
<Button width="full" intent="primary" radius="full">
  Get started free
</Button>

// Auth / onboarding pattern
<div style={{ maxWidth: 400 }}>
  <Button width="full" radius="full" intent="primary">
    Continue with email
  </Button>
  <Button width="full" radius="full" intent="neutral" appearance="outline"
    startIcon={<GithubIcon size={16} />}>
    Continue with GitHub
  </Button>
</div>
```

#### Elevated (with shadow)

```tsx
<Button elevated intent="primary">Elevated button</Button>
```

#### As a link

When `href` is provided, the component renders as an `<a>` tag — with full button styling:

```tsx
<Button href="https://vyantra-ui.vercel.app" target="_blank">
  Open docs ↗
</Button>
```

#### Polymorphic — as any element

Use the `as` prop to render as a router Link or any other component:

```tsx
import { Link } from 'react-router-dom';

<Button as={Link} to="/dashboard" intent="primary">
  Go to dashboard
</Button>
```

---

#### All Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'primary' \| 'secondary' \| 'neutral' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color and semantic role |
| `appearance` | `'solid' \| 'outline' \| 'ghost' \| 'soft' \| 'link'` | `'solid'` | Visual style variant |
| `size` | `'2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Height, padding, font size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius shape |
| `width` | `'auto' \| 'full' \| 'fit'` | `'auto'` | Width behaviour |
| `startIcon` | `ReactNode` | — | Icon before the label |
| `endIcon` | `ReactNode` | — | Icon after the label |
| `iconOnly` | `ReactNode` | — | Square / circle icon-only button |
| `iconGap` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Gap between icon and label |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `loadingText` | `string` | — | Text to show while loading |
| `loadingSpinnerPosition` | `'start' \| 'end'` | `'start'` | Spinner position |
| `disabled` | `boolean` | `false` | Prevents all interaction |
| `active` | `boolean` | `false` | Active / pressed visual state |
| `selected` | `boolean` | `false` | Selected state (toggle groups) |
| `elevated` | `boolean` | `false` | Adds drop shadow |
| `compact` | `boolean` | `false` | Removes min-width constraint |
| `href` | `string` | — | Renders as `<a>` anchor |
| `target` | `string` | — | Link target (used with `href`) |
| `as` | `ElementType` | `'button'` | Polymorphic root element |
| `aria-label` | `string` | — | **Required** for `iconOnly` buttons |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | — | Additional CSS classes |

Button also accepts all native `HTMLButtonElement` attributes.

---

## TypeScript

All types are exported from `@vyantra/ui`:

```ts
import type {
  ButtonProps,
  ButtonIntent,
  ButtonAppearance,
  ButtonSize,
  ButtonRadius,
  ButtonWidth,
  ButtonIconPosition,
} from '@vyantra/ui';

// Use in your own components
interface MyButtonProps {
  intent?: ButtonIntent;   // 'primary' | 'secondary' | 'neutral' | ...
  size?: ButtonSize;       // '2xs' | 'xs' | 'sm' | 'md' | ...
}
```

---

## Theming

Components automatically respond to `data-theme` from `@vyantra/tokens`.

```html
<!-- All Vyantra components inside go dark -->
<div data-theme="dark">
  <Button intent="primary">Dark mode button</Button>
</div>
```

### Custom brand colors

Override token variables on any selector — no component code changes needed:

```css
[data-theme="brand"] {
  --color-primary:        #e11d48;
  --color-primary-hover:  #be123c;
  --color-primary-subtle: #fff1f2;
  --color-primary-text:   #9f1239;
  --color-on-primary:     #ffffff;
}
```

```tsx
<div data-theme="brand">
  <Button intent="primary">Brand button</Button>   {/* rose-600 */}
</div>
```

---

## Real-world Patterns

### Form submit button

```tsx
function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await sendMessage();
    setLoading(false);
  };

  return (
    <Button
      type="submit"
      intent="primary"
      size="md"
      width="full"
      loading={loading}
      loadingText="Sending…"
      onClick={handleSubmit}
    >
      Send message
    </Button>
  );
}
```

### Destructive action with confirmation

```tsx
<Button
  intent="danger"
  appearance="outline"
  startIcon={<TrashIcon size={15} />}
  onClick={() => confirmDelete(id)}
>
  Delete account
</Button>
```

### Icon toolbar

```tsx
const tools = [
  { icon: <BoldIcon />,   label: 'Bold' },
  { icon: <ItalicIcon />, label: 'Italic' },
  { icon: <LinkIcon />,   label: 'Insert link' },
];

{tools.map(tool => (
  <Button
    key={tool.label}
    iconOnly={tool.icon}
    appearance="ghost"
    intent="neutral"
    size="sm"
    aria-label={tool.label}
  />
))}
```

---

## Package Contents

```
@vyantra/ui
├── dist/
│   ├── index.js       ← ESM components
│   ├── index.cjs      ← CommonJS components
│   ├── index.d.ts     ← TypeScript types
│   └── index.css      ← All component styles (import as @vyantra/ui/styles)
```

---

## Accessibility

All components are built with accessibility in mind:

- Semantic HTML elements (`<button>`, `<a>`)
- `aria-disabled` instead of just `disabled` where appropriate
- `aria-busy` on loading buttons
- `aria-label` enforced for icon-only buttons
- Focus-visible ring using `--color-border-focus`
- No click handler fires when `disabled` or `loading`

---

## Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for release notes.

---

<div align="center">
  Part of the <strong>Vyantra Design System</strong> · <a href="https://github.com/ashishvora1997/vyantra-ui">GitHub</a> · <a href="https://vyantra-ui.vercel.app">Docs</a>
</div>