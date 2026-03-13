<div align="center">

# Vyantra Design System

**A handcrafted React component library with design tokens, full theming, and a live documentation app**

[![license](https://img.shields.io/badge/license-MIT-blue)](#license)
[![pnpm](https://img.shields.io/badge/pnpm-9%2B-orange)](https://pnpm.io)
[![node](https://img.shields.io/badge/node-18%2B-green)](https://nodejs.org)
[![react](https://img.shields.io/badge/react-18%2B-61dafb)](https://react.dev)

</div>

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@vyantra/tokens`](./packages/tokens) | [![npm](https://img.shields.io/npm/v/@vyantra/tokens?color=6366f1)](https://www.npmjs.com/package/@vyantra/tokens) | CSS design tokens — colors, spacing, typography, shadows |
| [`@vyantra/ui`](./packages/ui) | [![npm](https://img.shields.io/npm/v/@vyantra/ui?color=6366f1)](https://www.npmjs.com/package/@vyantra/ui) | React components — Button (more coming) |
| `@vyantra/docs` | private | Live documentation app — component playground + props explorer |

---

## What's inside

```
vyantra/
├── packages/
│   ├── tokens/          ← @vyantra/tokens  (published to npm)
│   │   └── src/
│   │       ├── tokens.css       ← all CSS variables
│   │       ├── colors.ts
│   │       ├── spacing.ts
│   │       ├── typography.ts
│   │       ├── effects.ts
│   │       └── index.ts
│   │
│   └── ui/              ← @vyantra/ui  (published to npm)
│       └── src/
│           ├── components/
│           │   └── Button/
│           │       ├── Button.tsx
│           │       ├── Button.css
│           │       ├── Button.types.ts
│           │       └── index.ts
│           └── index.ts
│
└── apps/
    └── docs/            ← documentation site  (private, not published)
        └── src/
            ├── App.tsx
            ├── main.tsx
            ├── pages/
            │   └── button/ButtonPage.tsx
            ├── components/
            │   ├── Sidebar.tsx
            │   └── SearchModal.tsx
            └── styles/
                └── globals.css
```

---

## Getting Started (local development)

### Prerequisites

- **Node.js** `>=18`
- **pnpm** `>=9` — install with `npm install -g pnpm`

### 1. Clone the repo

```bash
git clone https://github.com/vyantra/ui.git
cd ui
```

### 2. Install all dependencies

```bash
pnpm install
```

> This installs dependencies for all packages and apps in one command — that's the power of pnpm workspaces.

### 3. Build the packages

Tokens and UI must be built before the docs app can start:

```bash
pnpm build
```

Or build individually:

```bash
pnpm --filter @vyantra/tokens build
pnpm --filter @vyantra/ui build
```

### 4. Start the docs app

```bash
pnpm --filter @vyantra/docs dev
# → http://localhost:5173
```

Or start everything in parallel (packages in watch mode + docs app):

```bash
pnpm dev
```

---

## Development Workflow

### Making changes to a package

```bash
# Watch tokens for changes
pnpm --filter @vyantra/tokens dev

# Watch ui components for changes
pnpm --filter @vyantra/ui dev

# Run the docs app
pnpm --filter @vyantra/docs dev
```

Run all three in separate terminal tabs, or use `pnpm dev` to start everything together.

### Adding a new component

1. Create a folder under `packages/ui/src/components/MyComponent/`
2. Add `MyComponent.tsx`, `MyComponent.css`, `MyComponent.types.ts`, `index.ts`
3. Export from `packages/ui/src/index.ts`
4. Create a docs page under `apps/docs/src/pages/my-component/`
5. Register it in `apps/docs/src/App.tsx`

### Modifying design tokens

Edit `packages/tokens/src/tokens.css` — all components pick up the change automatically since they reference CSS variables.

---

## Scripts

Run any script from the repo root:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all packages in watch mode + docs app |
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests across all packages |
| `pnpm typecheck` | TypeScript check across all packages |
| `pnpm lint` | Lint all packages |
| `pnpm clean` | Delete all `dist/` folders and `node_modules` |

Run a script for a single package:

```bash
pnpm --filter @vyantra/ui build
pnpm --filter @vyantra/tokens typecheck
pnpm --filter @vyantra/docs dev
```

---

## Docs App

The `apps/docs` app is a locally-run React application (built with Vite) that documents every component in `@vyantra/ui`. It is **not published to npm** — it's for contributors and internal use.

### Features

- **Live playground** — adjust every prop via interactive controls and see the component update in real time
- **Code output** — the playground shows the exact JSX you'd write, with a one-click copy button
- **Light/Dark/System theme** — toggle at the top right; all components respond instantly
- **Intent × Appearance matrix** — every combination rendered side by side
- **Props table** — full documentation of every prop, type, default, and description
- **Search** — press `⌘K` / `Ctrl+K` to open the command palette

### Running the docs app

```bash
pnpm build                    # build packages first
pnpm --filter @vyantra/docs dev
```

Open `http://localhost:5173`

---

## Using the packages in your project

Install both packages:

```bash
npm install @vyantra/tokens @vyantra/ui
# or
pnpm add @vyantra/tokens @vyantra/ui
```

Set up at the root of your app:

```tsx
// main.tsx
import '@vyantra/tokens/css';   // design tokens (CSS variables)
import '@vyantra/ui/styles';    // component styles

import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

Then use components anywhere:

```tsx
import { Button } from '@vyantra/ui';

export function MyPage() {
  return (
    <Button intent="primary" size="md">
      Hello Vyantra
    </Button>
  );
}
```

---

## Theming

Set `data-theme` on your `<html>` tag or any container:

```html
<!-- Default light -->
<html>

<!-- Dark -->
<html data-theme="dark">
```

### Custom brand colors

Override tokens anywhere without touching the library:

```css
[data-theme="brand"] {
  --color-primary:        #e11d48;
  --color-primary-hover:  #be123c;
  --color-primary-subtle: #fff1f2;
  --color-primary-text:   #9f1239;
  --color-on-primary:     #ffffff;
}
```

---

## Publishing (for maintainers)

Build both packages, then publish tokens first:

```bash
# 1. Build
pnpm --filter @vyantra/tokens build
pnpm --filter @vyantra/ui build

# 2. Publish tokens first (ui depends on it)
cd packages/tokens
npm publish --access public

# 3. Then publish ui
cd ../ui
npm publish --access public
```

### Versioning

This project follows **semantic versioning**:

| Change type | Bump |
|-------------|------|
| Bug fix, style tweak | `patch` → `0.1.0 → 0.1.1` |
| New component, new prop | `minor` → `0.1.0 → 0.2.0` |
| Breaking prop rename / removal | `major` → `0.1.0 → 1.0.0` |

```bash
# Inside the package folder
npm version patch   # or minor / major
npm publish --access public
```

---

## Roadmap

### Components
- [x] Button
- [ ] Input / Textarea
- [ ] Checkbox / Radio / Switch
- [ ] Select / Combobox
- [ ] Badge / Tag / Avatar
- [ ] Card
- [ ] Modal / Dialog
- [ ] Tooltip
- [ ] Toast / Snackbar
- [ ] Dropdown / Menu
- [ ] Tabs
- [ ] Table
- [ ] Spinner / Skeleton

### Docs
- [x] Button playground + props
- [ ] Token explorer page
- [ ] Dark mode toggle
- [ ] Component search

### Infrastructure
- [ ] Unit tests (Vitest + Testing Library)
- [ ] Storybook integration
- [ ] Changesets for automated versioning
- [ ] CI/CD with GitHub Actions

---

## Tech Stack

| Tool | Role |
|------|------|
| React 18 | Component framework |
| TypeScript 5 | Type safety |
| Vite | Build tool (library + docs app) |
| pnpm workspaces | Monorepo management |
| CSS custom properties | Zero-runtime theming |
| Geist / Geist Mono | Typography |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-component`
3. Make your changes
4. Run `pnpm typecheck && pnpm test`
5. Open a pull request

Please keep components token-based (no hardcoded colors), accessible, and tested.

---

## License

MIT © Vyantra — see [LICENSE](./LICENSE) for details.

---

<div align="center">
  <strong>Vyantra</strong> — built with care, designed to last
</div>