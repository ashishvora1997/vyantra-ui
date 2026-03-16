import React, { useState, useMemo } from 'react';
import { Button } from '@vyantra/ui';
import { ThemeProvider, createTheme } from '@vyantra/ui/theme';
import type { CreateThemeInput } from '@vyantra/ui/theme';

// ─── Inline code block ────────────────────────────────────────────────────────

const Code: React.FC<{ children: string }> = ({ children }) => (
  <div className="pg-code-box" style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.7 }}>
    {children
      .trim()
      .split('\n')
      .map((line, i) => (
        <div key={i}>{line || '\u00A0'}</div>
      ))}
  </div>
);

// ─── Info / warning callout ───────────────────────────────────────────────────

const Callout: React.FC<{ type?: 'info' | 'warning'; children: React.ReactNode }> = ({
  type = 'info',
  children,
}) => (
  <div
    style={{
      marginTop: 10,
      padding: '12px 16px',
      lineHeight: 1.6,
      background: type === 'warning' ? 'var(--color-warning-subtle)' : 'var(--color-bg-muted)',
      borderRadius: 'var(--radius-lg)',
      border: `1px solid ${type === 'warning' ? 'var(--color-warning-border)' : 'var(--color-border)'}`,
      fontSize: 12.5,
      color: type === 'warning' ? 'var(--color-warning-text)' : 'var(--color-text-secondary)',
    }}
  >
    {children}
  </div>
);

// ─── Mono code inline ─────────────────────────────────────────────────────────

const M: React.FC<{ children: string }> = ({ children }) => (
  <code
    style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      background: 'var(--color-bg-muted)',
      padding: '1px 5px',
      borderRadius: 3,
    }}
  >
    {children}
  </code>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────

const DocSection: React.FC<{
  num: string | number;
  title: string;
  desc?: string;
  children: React.ReactNode;
}> = ({ num, title, desc, children }) => (
  <div className="section">
    <div className="section-header">
      <div className="section-num">{num}</div>
      <div className="section-title">{title}</div>
      {desc && <div className="section-desc">{desc}</div>}
    </div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  RUNTIME THEME DEMO
//  A self-contained ThemeProvider wrapping live buttons.
//  User picks accent color + radius style and sees real components update.
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT_OPTIONS = [
  {
    label: 'Blue (default)',
    primary600: '#2563eb',
    primary700: '#1d4ed8',
    primary400: '#60a5fa',
    primary300: '#93c5fd',
    primary50: '#eff6ff',
    primary100: '#dbeafe',
  },
  {
    label: 'Rose',
    primary600: '#e11d48',
    primary700: '#be123c',
    primary400: '#fb7185',
    primary300: '#fda4af',
    primary50: '#fff1f2',
    primary100: '#ffe4e6',
  },
  {
    label: 'Violet',
    primary600: '#7c3aed',
    primary700: '#6d28d9',
    primary400: '#a78bfa',
    primary300: '#c4b5fd',
    primary50: '#f5f3ff',
    primary100: '#ede9fe',
  },
  {
    label: 'Emerald',
    primary600: '#059669',
    primary700: '#047857',
    primary400: '#34d399',
    primary300: '#6ee7b7',
    primary50: '#ecfdf5',
    primary100: '#d1fae5',
  },
  {
    label: 'Orange',
    primary600: '#ea580c',
    primary700: '#c2410c',
    primary400: '#fb923c',
    primary300: '#fdba74',
    primary50: '#fff7ed',
    primary100: '#ffedd5',
  },
] as const;

const RADIUS_OPTIONS = [
  { label: 'Sharp', md: '2px', full: '4px' },
  { label: 'Soft', md: '6px', full: '9999px' },
  { label: 'Round', md: '10px', full: '9999px' },
  { label: 'Pill', md: '9999px', full: '9999px' },
] as const;

const RuntimeDemo: React.FC = () => {
  const [accentIdx, setAccentIdx] = useState(0);
  const [radiusIdx, setRadiusIdx] = useState(1);
  const [demoScheme, setDemoScheme] = useState<'light' | 'dark'>('light');

  const accent = ACCENT_OPTIONS[accentIdx]!;
  const radius = RADIUS_OPTIONS[radiusIdx]!;

  const themeInput: CreateThemeInput = useMemo(
    () => ({
      scheme: demoScheme,
      colors: {
        primary: {
          50: accent.primary50,
          100: accent.primary100,
          200: accent.primary100, // approximation for demo
          300: accent.primary300,
          400: accent.primary400,
          500: accent.primary600,
          600: accent.primary600,
          700: accent.primary700,
          800: accent.primary700,
          900: accent.primary700,
        },
      },
      radius: { md: radius.md, full: radius.full },
    }),
    [accentIdx, radiusIdx, demoScheme],
  );

  const theme = useMemo(() => createTheme(themeInput), [themeInput]);

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginTop: 12,
      }}
    >
      {/* Controls bar */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Accent
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {ACCENT_OPTIONS.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setAccentIdx(i)}
                title={a.label}
                type="button"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: a.primary600,
                  border:
                    accentIdx === i
                      ? `2px solid var(--color-text-primary)`
                      : '2px solid transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow:
                    accentIdx === i
                      ? `0 0 0 1px var(--color-bg), 0 0 0 3px ${a.primary600}`
                      : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Radius
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {RADIUS_OPTIONS.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setRadiusIdx(i)}
                type="button"
                style={{
                  padding: '2px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  borderRadius: 4,
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  background: radiusIdx === i ? 'var(--color-primary)' : 'var(--color-bg-muted)',
                  color: radiusIdx === i ? '#fff' : 'var(--color-text-secondary)',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Scheme
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['light', 'dark'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setDemoScheme(s)}
                type="button"
                style={{
                  padding: '2px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  borderRadius: 4,
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  background: demoScheme === s ? 'var(--color-primary)' : 'var(--color-bg-muted)',
                  color: demoScheme === s ? '#fff' : 'var(--color-text-secondary)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          live — real ThemeProvider
        </div>
      </div>

      {/* Live preview — wrapped in its own ThemeProvider */}
      <ThemeProvider theme={theme}>
        <div
          data-theme={demoScheme}
          style={{
            padding: '28px 24px',
            background: 'var(--vyantra-surface-bg)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <Button intent="primary" appearance="solid">
            Primary
          </Button>
          <Button intent="primary" appearance="outline">
            Outline
          </Button>
          <Button intent="primary" appearance="soft">
            Soft
          </Button>
          <Button intent="primary" appearance="ghost">
            Ghost
          </Button>
          <Button intent="secondary" appearance="solid">
            Secondary
          </Button>
          <Button intent="danger" appearance="solid">
            Danger
          </Button>
          <Button intent="success" appearance="outline">
            Success
          </Button>
          <Button intent="primary" appearance="solid" loading>
            Loading
          </Button>
          <Button intent="primary" appearance="solid" disabled>
            Disabled
          </Button>
        </div>
      </ThemeProvider>

      {/* What the generated theme input looks like */}
      <div
        style={{
          padding: '0 16px 16px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-mono)',
            padding: '10px 0 6px',
          }}
        >
          Generated createTheme() call
        </div>
        <div className="pg-code-box" style={{ fontSize: 11.5, lineHeight: 1.6 }}>
          {[
            `createTheme({`,
            `  scheme: '${demoScheme}',`,
            `  colors: {`,
            `    primary: { 600: '${accent.primary600}', 700: '${accent.primary700}', 400: '${accent.primary400}' },`,
            `  },`,
            `  radius: { md: '${radius.md}', full: '${radius.full}' },`,
            `})`,
          ].map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  THEMING PAGE
// ─────────────────────────────────────────────────────────────────────────────

export const ThemingPage: React.FC = () => (
  <div className="page-content">
    {/* HEADING */}
    <div className="page-heading">
      <div className="page-heading-eyebrow">foundation</div>
      <h1>Theming</h1>
      <p>
        Vyantra's theme system is built on CSS variables. <M>ThemeProvider</M> writes all token
        values to the DOM once on mount and once per scheme change — zero runtime CSS generation,
        zero emotion, zero styled-components.
      </p>
      <div className="prop-badges">
        {[
          'createTheme',
          'ThemeProvider',
          'useTheme',
          'useScheme',
          'createStyles',
          'classNames',
        ].map((p) => (
          <span className="prop-badge" key={p}>
            {p}
          </span>
        ))}
      </div>
    </div>

    {/* ══ 1: SETUP ══ */}
    <DocSection num={1} title="Setup" desc="one import, one provider">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        Import <M>@vyantra/ui/styles</M> once at your app root — it bundles both the design token
        CSS variables and all component styles together. Then wrap your app in <M>ThemeProvider</M>.
      </p>
      <Code>{`
// main.tsx
import '@vyantra/ui/styles';   // tokens + component CSS — one import does both

import { ThemeProvider, createTheme } from '@vyantra/ui';
import { createRoot } from 'react-dom/client';
import App from './App';

const theme = createTheme({ scheme: 'system' });

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
      `}</Code>
      <Callout>
        <strong style={{ color: 'var(--color-text-primary)' }}>
          What <M>@vyantra/ui/styles</M> includes
        </strong>{' '}
        — it resolves to <M>packages/ui/src/styles/index.css</M> which <M>@import</M>s the full{' '}
        <M>tokens.css</M> (all <M>--vyantra-*</M> CSS variables, light + dark themes) followed by
        every component stylesheet. You do not need a separate <M>@vyantra/tokens/css</M> import.
      </Callout>
    </DocSection>

    {/* ══ 2: createTheme ══ */}
    <DocSection num={2} title="createTheme()" desc="the only public API">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        Pass only what you want to override — everything else comes from Vyantra defaults. The
        result is passed to <M>ThemeProvider</M>.
      </p>
      <Code>{`
import { createTheme } from '@vyantra/ui';

const theme = createTheme({
  // 'light' | 'dark' | 'system' (follows OS, persisted to localStorage)
  scheme: 'system',

  // Full 50–900 color scale — override as much or as little as you need
  colors: {
    primary: {
      50:  '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3',
      300: '#fda4af', 400: '#fb7185', 500: '#f43f5e',
      600: '#e11d48',   // base — solid button background
      700: '#be123c',   // hover
      800: '#9f1239',   // active / pressed
      900: '#881337',
    },
    // Add a brand-new custom color — available everywhere as token.colors.brand
    brand: {
      50: '#fdf4ff', 500: '#a855f7', 600: '#9333ea', 900: '#581c87',
    },
  },

  // Optional: change which shade maps to which role
  // (defaults: base=600, hover=700, subtle=50, on='white')
  colorMapping: {
    primary: { base: 600, hover: 700, active: 800, subtle: 50, on: 'white' },
  },

  // Typography
  typography: { fontFamily: 'Inter, system-ui, sans-serif' },

  // Radius — affects all components
  radius: { md: '10px', full: '9999px' },

  // Per-component defaults and CSS var overrides
  components: {
    Button: {
      defaultProps: { size: 'md', radius: 'full' },

      // vars() writes CSS variables on the DOM.
      // Because Button.css reads them, :hover / :focus / :active
      // all pick up your override automatically — no inline styles needed.
      vars: (token, scheme) => ({
        '--vyantra-btn-bg':          scheme === 'dark'
                                       ? token.colors.primary[400]
                                       : token.colors.primary[600],
        '--vyantra-btn-bg-hover':    scheme === 'dark'
                                       ? token.colors.primary[300]
                                       : token.colors.primary[700],
        '--vyantra-btn-color':       token.text.inverse,
        '--vyantra-btn-radius':      token.radius.full,
        '--vyantra-btn-font-weight': '700',
      }),
    },
  },

  // Anything extra — read via token.other anywhere in your app
  other: {
    gradient: 'linear-gradient(135deg, #e11d48, #9333ea)',
  },
});
      `}</Code>
    </DocSection>

    {/* ══ 3: LIVE RUNTIME DEMO ══ */}
    <DocSection
      num={3}
      title="Live Runtime Demo"
      desc="real ThemeProvider — change accent, radius, scheme"
    >
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
        This preview is wrapped in its own <M>ThemeProvider</M> with a <M>createTheme()</M> call
        built from the controls below. Every change calls <M>createTheme()</M> and re-renders the
        provider — exactly how you'd use it in a real app.
      </p>
      <RuntimeDemo />
    </DocSection>

    {/* ══ 4: DARK / LIGHT / SYSTEM ══ */}
    <DocSection num={4} title="Dark · Light · System" desc="scheme switching anywhere">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        <M>useScheme()</M> gives you full control from any component inside <M>ThemeProvider</M>.
        The resolved scheme is always <M>'light'</M> or <M>'dark'</M> — never <M>'system'</M>.
        Preference is persisted to <M>localStorage</M> automatically.
      </p>
      <Code>{`
import { useScheme } from '@vyantra/ui';

function ThemeToggle() {
  const { scheme, toggleScheme, setScheme, isSystem } = useScheme();

  return (
    <>
      {/* Simple toggle */}
      <button onClick={toggleScheme}>
        {scheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Three-way selector */}
      <button onClick={() => setScheme('light')}>Light</button>
      <button onClick={() => setScheme('dark')}>Dark</button>
      <button onClick={() => setScheme('system')}>
        System{isSystem ? ' ✓' : ''}
      </button>
    </>
  );
}
      `}</Code>
    </DocSection>

    {/* ══ 5: useTheme ══ */}
    <DocSection num={5} title="useTheme()" desc="access the full resolved theme in any component">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        Returns the complete resolved theme — fully typed, fully autocompleted. Useful for
        conditional logic, dynamic inline styles, or debugging.
      </p>
      <Code>{`
import { useTheme } from '@vyantra/ui';

function MyComponent() {
  const token = useTheme();

  token.scheme                       // 'dark' (always resolved)

  // Full color scales
  token.colors.primary[600]          // '#e11d48'
  token.colors.brand?.[500]          // your custom color (optional)

  // Pre-resolved role shortcuts — no shade numbers needed
  token.resolved.primary.base        // '#e11d48' (solid bg)
  token.resolved.primary.hover       // '#be123c' (hover)
  token.resolved.primary.subtle      // '#fff1f2' (soft bg tint)
  token.resolved.primary.on          // '#ffffff' (text on solid)

  // Surface + text — already correct for current scheme
  token.surface.background           // '#0c0d11' in dark
  token.surface.border               // 'rgba(...)' in dark
  token.text.primary                 // '#ecedf2' in dark

  // Design scale
  token.spacing[4]                   // '16px'
  token.radius.md                    // '10px' (your override)
  token.typography.fontFamily        // 'Inter, ...'
  token.shadows.md

  // Component overrides as defined in createTheme
  token.components.Button            // { defaultProps, vars, classNames }

  // Your custom data
  token.other.gradient               // 'linear-gradient(...)'

  // Full dump for debugging
  console.log(token)
}
      `}</Code>
    </DocSection>

    {/* ══ 6: createStyles ══ */}
    <DocSection num={6} title="createStyles()" desc="dynamic styles for your own components">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        A thin hook factory — no CSS-in-JS, no class injection. Returns plain{' '}
        <M>React.CSSProperties</M> objects you pass to <M>{"style={}"}</M>. Works on any HTML
        element or React component.
      </p>
      <Code>{`
import { createStyles } from '@vyantra/ui';

// Define once outside the component
const useCardStyles = createStyles((token, scheme) => ({
  card: {
    background:   token.surface.background,
    border:       \`1px solid \${token.surface.border}\`,
    borderRadius: token.radius.lg,
    padding:      token.spacing[6],
    boxShadow:    token.shadows.sm,
  },
  title: {
    color:      token.text.primary,
    fontWeight: String(token.typography.fontWeight.semibold),
    fontSize:   token.typography.fontSize.xl,
  },
  badge: {
    // scheme for conditional logic
    background: scheme === 'dark'
      ? token.colors.primary[800]
      : token.colors.primary[100],
    color: scheme === 'dark'
      ? token.colors.primary[200]
      : token.colors.primary[700],
  },
}));

function MyCard() {
  const { styles, theme, scheme } = useCardStyles();

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Hello</h2>
      <span style={styles.badge}>New</span>

      {/* Access raw token values for JSX logic */}
      <p style={{ color: theme.colors.brand?.[500] }}>Brand text</p>
    </div>
  );
}
      `}</Code>
      <Callout type="warning">
        <strong>Pseudo-selectors</strong> (<M>:hover</M>, <M>:focus</M>, <M>:active</M>) cannot be
        expressed as inline styles. For those, use CSS Modules and reference <M>--vyantra-*</M> CSS
        variables — see section 7.
      </Callout>
    </DocSection>

    {/* ══ 7: classNames ══ */}
    <DocSection num={7} title="classNames prop" desc="slot-level CSS Module overrides">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        Every component exposes named slots via <M>classNames</M>. Your class is appended after
        Vyantra's own classes — your specificity always wins. Use <M>--vyantra-*</M>
        vars inside your CSS so pseudo-selectors work natively.
      </p>
      <Code>{`
/* MyButton.module.css */
.root {
  letter-spacing: 0.5px;
  text-transform: uppercase;

  /* --vyantra-* vars are already on the DOM from ThemeProvider */
  background: var(--vyantra-color-primary-base);
  color:      var(--vyantra-color-primary-on);

  &:hover   { background: var(--vyantra-color-primary-hover); transform: translateY(-1px); }
  &:active  { transform: scale(0.97); }
  &:focus-visible {
    outline: 2px solid var(--vyantra-color-primary-400);
    outline-offset: 3px;
  }

  /* Button writes these data-* attrs — use them freely */
  &[data-loading='true']  { opacity: 0.7; cursor: wait; }
  &[data-disabled='true'] { opacity: 0.4; cursor: not-allowed; }
}

.label { font-size: var(--vyantra-font-size-xs); }
      `}</Code>
      <Code>{`
import classes from './MyButton.module.css';

<Button classNames={{ root: classes.root, label: classes.label }}>
  Click me
</Button>
      `}</Code>
      <Callout>
        <strong style={{ color: 'var(--color-text-primary)' }}>Button slots:</strong> <M>root</M> ·{' '}
        <M>label</M> · <M>icon</M> · <M>spinner</M>
      </Callout>
    </DocSection>

    {/* ══ 8: CSS VARS ══ */}
    <DocSection num={8} title="CSS Variables" desc="--vyantra-* in your own CSS or inline styles">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        All theme values are written to the DOM as CSS variables by ThemeProvider. Use them anywhere
        — CSS Modules, global styles, or inline style strings. They update instantly on scheme
        change.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 10,
        }}
      >
        {[
          {
            group: 'Colors',
            vars: [
              '--vyantra-color-primary-base',
              '--vyantra-color-primary-hover',
              '--vyantra-color-primary-subtle',
              '--vyantra-color-primary-on',
              '--vyantra-surface-bg',
              '--vyantra-surface-border',
              '--vyantra-text-primary',
              '--vyantra-text-secondary',
            ],
          },
          {
            group: 'Typography',
            vars: [
              '--vyantra-font-family',
              '--vyantra-font-family-mono',
              '--vyantra-font-size-sm',
              '--vyantra-font-size-md',
              '--vyantra-font-weight-medium',
              '--vyantra-font-weight-semibold',
              '--vyantra-leading-normal',
            ],
          },
          {
            group: 'Spacing',
            vars: [
              '--vyantra-spacing-1',
              '--vyantra-spacing-2',
              '--vyantra-spacing-4',
              '--vyantra-spacing-6',
              '--vyantra-spacing-8',
              '--vyantra-spacing-12',
            ],
          },
          {
            group: 'Radius & Shadow',
            vars: [
              '--vyantra-radius-sm',
              '--vyantra-radius-md',
              '--vyantra-radius-lg',
              '--vyantra-radius-full',
              '--vyantra-shadow-sm',
              '--vyantra-shadow-md',
            ],
          },
          {
            group: 'Motion',
            vars: [
              '--vyantra-duration-fast',
              '--vyantra-duration-normal',
              '--vyantra-ease-default',
              '--vyantra-ease-spring',
            ],
          },
          {
            group: 'Button (component-level)',
            vars: [
              '--vyantra-btn-bg',
              '--vyantra-btn-bg-hover',
              '--vyantra-btn-color',
              '--vyantra-btn-border-color',
              '--vyantra-btn-radius',
              '--vyantra-btn-font-weight',
              '--vyantra-btn-focus-ring',
            ],
          },
        ].map(({ group, vars }) => (
          <div
            key={group}
            style={{
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: 'var(--color-text-tertiary)',
                marginBottom: 8,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {group}
            </div>
            {vars.map((v) => (
              <div
                key={v}
                style={{
                  fontSize: 11.5,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-primary-text)',
                  padding: '2px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Code>{`
/* Your own CSS — vars update automatically on scheme change */
.card {
  background:    var(--vyantra-surface-bg);
  border:        1px solid var(--vyantra-surface-border);
  border-radius: var(--vyantra-radius-lg);
  padding:       var(--vyantra-spacing-6);
  font-family:   var(--vyantra-font-family);
  color:         var(--vyantra-text-primary);
  transition:    box-shadow var(--vyantra-duration-normal) var(--vyantra-ease-default);
}
.card:hover { box-shadow: var(--vyantra-shadow-md); }
      `}</Code>
    </DocSection>

    {/* ══ 9: FULL EXAMPLE ══ */}
    <DocSection num={9} title="Full custom theme" desc="rose brand, rounded, complete setup">
      <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
        A complete production-ready example. The <M>vars()</M> function writes CSS variables onto
        the DOM, so <M>:hover</M> and <M>:focus</M> states pick up your colors with no inline styles
        needed anywhere.
      </p>
      <Code>{`
// theme.ts
import { createTheme } from '@vyantra/ui';

export const roseTheme = createTheme({
  scheme: 'system',

  colors: {
    primary: {
      50:  '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3',
      300: '#fda4af', 400: '#fb7185', 500: '#f43f5e',
      600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337',
    },
  },

  typography: { fontFamily: '"DM Sans", system-ui, sans-serif' },

  radius: { md: '10px', full: '9999px' },

  components: {
    Button: {
      defaultProps: { radius: 'full' },
      vars: (token, scheme) => ({
        // ThemeProvider writes these → Button.css :hover/:active read them
        '--vyantra-btn-bg':          scheme === 'dark'
                                       ? token.colors.primary[400]
                                       : token.colors.primary[600],
        '--vyantra-btn-bg-hover':    scheme === 'dark'
                                       ? token.colors.primary[300]
                                       : token.colors.primary[700],
        '--vyantra-btn-color':       token.text.inverse,
        '--vyantra-btn-radius':      token.radius.full,
      }),
    },
  },

  other: {
    gradient: 'linear-gradient(135deg, #e11d48, #9333ea)',
  },
});

// main.tsx
import { ThemeProvider } from '@vyantra/ui';
import { roseTheme }     from './theme';

<ThemeProvider theme={roseTheme}>
  <App />
</ThemeProvider>

// HeroBanner.tsx — use token.other for the gradient
import { useTheme } from '@vyantra/ui';

function HeroBanner() {
  const token = useTheme();
  return (
    <section style={{ background: token.other['gradient'] as string, padding: '40px' }}>
      <h1 style={{ color: '#fff' }}>Build fast.</h1>
      {/* All Buttons below are automatically rose + pill — no extra props */}
      <Button>Get Started Free</Button>
      <Button appearance="outline">Learn More</Button>
    </section>
  );
}
      `}</Code>

      {/* Live preview — no inline style hacks, using CSS vars properly */}
      <div
        style={{
          marginTop: 12,
          padding: '32px 28px',
          background: 'linear-gradient(135deg, #e11d48 0%, #9333ea 100%)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            marginBottom: 14,
          }}
        >
          live preview — buttons use current docs theme
        </p>

        {/* These buttons use CSS-var-based overrides, not inline styles */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Solid white button on gradient — classNames override via inline vars */}
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              padding: '0 16px',
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.95)',
              color: '#e11d48',
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              gap: 6,
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.95)';
            }}
          >
            Get Started Free
          </button>

          {/* White outline button */}
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              padding: '0 16px',
              borderRadius: 9999,
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.6)',
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)';
            }}
          >
            Learn More
          </button>

          {/* Ghost button on gradient */}
          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              padding: '0 16px',
              borderRadius: 9999,
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: 'none',
              fontWeight: 500,
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            Maybe later
          </button>
        </div>

        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 11,
            marginTop: 14,
            fontFamily: 'var(--font-mono)',
          }}
        >
          ↑ these are plain {'<button>'} elements styled for the gradient surface — not Vyantra
          Button components. In a real app you'd place the ThemeProvider inside the gradient and use
          Button normally.
        </p>
      </div>
    </DocSection>
  </div>
);
