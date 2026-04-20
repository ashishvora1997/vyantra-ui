// =============================================================================
//  ThemingShowcasePage
//  Demonstrates createTheme() with a fully live, interactive custom theme.
//  Each preset wraps its preview in its own <ThemeProvider> so the showcase
//  and the docs app run completely independent themes side-by-side.
// =============================================================================

import React, { useState, useMemo } from 'react';
import { Button, Divider, Text, Title } from '@vyantra/ui';
import { ThemeProvider, createTheme, useTheme, useScheme } from '@vyantra/ui/theme';
import type { CreateThemeInput } from '@vyantra/ui/theme';

// ─── Code block ───────────────────────────────────────────────────────────────

const Code: React.FC<{ children: string }> = ({ children }) => (
  <div className="pg-code-box" style={{ marginTop: 12, fontSize: 12, lineHeight: 1.75 }}>
    {children
      .trim()
      .split('\n')
      .map((line, i) => (
        <div key={i}>{line || '\u00A0'}</div>
      ))}
  </div>
);

const M: React.FC<{ children: string }> = ({ children }) => (
  <code
    style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      background: 'var(--color-bg-muted)',
      padding: '1px 5px',
      borderRadius: 3,
      color: 'var(--color-text-primary)',
    }}
  >
    {children}
  </code>
);

// ─── Theme presets ────────────────────────────────────────────────────────────

interface Preset {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  input: CreateThemeInput;
}

const PRESETS: Preset[] = [
  {
    id: 'default',
    label: 'Default Blue',
    emoji: '💙',
    desc: 'Vyantra default — blue primary, system scheme',
    input: { scheme: 'system' },
  },
  {
    id: 'rose',
    label: 'Rose Brand',
    emoji: '🌹',
    desc: 'Rose primary, pill radius, bold buttons',
    input: {
      scheme: 'system',
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      typography: { fontFamily: '"DM Sans", system-ui, sans-serif' },
      radius: { md: '8px', lg: '16px', xl: '24px', full: '9999px' },
      components: {
        Button: {
          defaultProps: { radius: 'full' },
          vars: (token, scheme) => ({
            '--vyantra-btn-bg':
              scheme === 'dark' ? token.colors.primary![400]! : token.colors.primary![600]!,
            '--vyantra-btn-bg-hover':
              scheme === 'dark' ? token.colors.primary![300]! : token.colors.primary![700]!,
            '--vyantra-btn-font-weight': '700',
          }),
        },
      },
    },
  },
  {
    id: 'violet',
    label: 'Violet Dark',
    emoji: '🔮',
    desc: 'Violet primary, dark scheme, sharp radius',
    input: {
      scheme: 'dark',
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      radius: { md: '2px', lg: '4px', xl: '6px' },
      components: {
        Button: {
          defaultProps: { radius: 'none' },
          vars: (token, scheme) => ({
            '--vyantra-btn-bg':
              scheme === 'dark' ? token.colors.primary![500]! : token.colors.primary![600]!,
            '--vyantra-btn-bg-hover':
              scheme === 'dark' ? token.colors.primary![400]! : token.colors.primary![700]!,
            '--vyantra-btn-letter-spacing': '0.04em',
          }),
        },
      },
    },
  },
  {
    id: 'emerald',
    label: 'Emerald Fresh',
    emoji: '🌿',
    desc: 'Emerald primary, light scheme, rounded',
    input: {
      scheme: 'light',
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      radius: { md: '10px', lg: '14px', xl: '18px', full: '9999px' },
      components: {
        Button: {
          defaultProps: { radius: 'lg' },
          vars: (token, scheme) => ({
            '--vyantra-btn-bg':
              scheme === 'dark' ? token.colors.primary![400]! : token.colors.primary![600]!,
            '--vyantra-btn-bg-hover':
              scheme === 'dark' ? token.colors.primary![300]! : token.colors.primary![700]!,
          }),
        },
      },
    },
  },
  {
    id: 'amber',
    label: 'Amber Warm',
    emoji: '🔶',
    desc: 'Amber/orange primary, warm radius, dark scheme',
    input: {
      scheme: 'dark',
      colors: {
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      radius: { md: '8px', lg: '12px' },
      components: {
        Button: {
          vars: (token, scheme) => ({
            '--vyantra-btn-bg':
              scheme === 'dark' ? token.colors.primary![400]! : token.colors.primary![500]!,
            '--vyantra-btn-bg-hover':
              scheme === 'dark' ? token.colors.primary![300]! : token.colors.primary![600]!,
            // '--vyantra-btn-color': '#1c1008',
            '--vyantra-btn-font-weight': '600',
          }),
        },
      },
    },
  },
];

// ─── Live component preview (inside a ThemeProvider) ─────────────────────────

const LivePreview: React.FC = () => {
  const token = useTheme();
  const { scheme, setScheme, schemePreference } = useScheme();

  return (
    <div
      style={{
        background: 'var(--vyantra-surface-bg)',
        border: '1px solid var(--vyantra-surface-border)',
        borderRadius: 'var(--vyantra-radius-xl, 12px)',
        padding: 24,
        minHeight: 200,
      }}
    >
      {/* Scheme toggle inside the preview */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, gap: 4 }}>
        {(['light', 'dark', 'system'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScheme(s)}
            style={{
              padding: '3px 10px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              borderRadius: 4,
              cursor: 'pointer',
              border: `1px solid ${schemePreference === s ? 'var(--vyantra-color-primary-base)' : 'var(--vyantra-surface-border)'}`,
              background:
                schemePreference === s ? 'var(--vyantra-color-primary-subtle)' : 'transparent',
              color:
                schemePreference === s
                  ? 'var(--vyantra-color-primary-text)'
                  : 'var(--vyantra-text-secondary)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <Title order={3} style={{ color: 'var(--vyantra-text-primary)', marginBottom: 4 }}>
          Vyantra UI
        </Title>
        <Text size="sm" style={{ color: 'var(--vyantra-text-secondary)' }}>
          Current scheme: <strong>{scheme}</strong> · radius.md: {token.radius.md}
        </Text>
      </div>

      <Divider style={{ marginBottom: 16 }} />

      {/* Button row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
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
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        <Button intent="success" appearance="solid">
          Success
        </Button>
        <Button intent="warning" appearance="solid">
          Warning
        </Button>
        <Button intent="danger" appearance="solid">
          Danger
        </Button>
        <Button intent="info" appearance="soft">
          Info
        </Button>
        <Button intent="neutral" appearance="outline">
          Neutral
        </Button>
      </div>

      <Divider label="States" style={{ marginBottom: 12 }} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button intent="primary" appearance="solid" loading>
          Loading
        </Button>
        <Button intent="primary" appearance="solid" disabled>
          Disabled
        </Button>
        <Button intent="primary" appearance="solid" elevated>
          Elevated
        </Button>
        <Button intent="danger" appearance="outline" uppercase>
          Danger
        </Button>
      </div>
    </div>
  );
};

// ─── Preset card ──────────────────────────────────────────────────────────────

const PresetCard: React.FC<{ preset: Preset; active: boolean; onClick: () => void }> = ({
  preset,
  active,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '10px 12px',
      borderRadius: 'var(--radius-lg)',
      border: `1px solid ${active ? 'var(--color-primary-border)' : 'var(--color-border)'}`,
      background: active ? 'var(--color-primary-subtle)' : 'var(--color-bg-subtle)',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 150ms ease',
    }}
  >
    <span style={{ fontSize: 22, flexShrink: 0 }}>{preset.emoji}</span>
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: active ? 'var(--color-primary-text)' : 'var(--color-text-primary)',
          marginBottom: 2,
        }}
      >
        {preset.label}
      </div>
      <div
        style={{
          fontSize: 11.5,
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.4,
        }}
      >
        {preset.desc}
      </div>
    </div>
  </button>
);

// ─── Custom theme builder ─────────────────────────────────────────────────────

const COLOR_ACCENTS = [
  {
    label: 'Blue',
    c600: '#2563eb',
    c700: '#1d4ed8',
    c400: '#60a5fa',
    c300: '#93c5fd',
    c50: '#eff6ff',
    c100: '#dbeafe',
  },
  {
    label: 'Rose',
    c600: '#e11d48',
    c700: '#be123c',
    c400: '#fb7185',
    c300: '#fda4af',
    c50: '#fff1f2',
    c100: '#ffe4e6',
  },
  {
    label: 'Violet',
    c600: '#7c3aed',
    c700: '#6d28d9',
    c400: '#a78bfa',
    c300: '#c4b5fd',
    c50: '#f5f3ff',
    c100: '#ede9fe',
  },
  {
    label: 'Emerald',
    c600: '#059669',
    c700: '#047857',
    c400: '#34d399',
    c300: '#6ee7b7',
    c50: '#ecfdf5',
    c100: '#d1fae5',
  },
  {
    label: 'Amber',
    c600: '#d97706',
    c700: '#b45309',
    c400: '#fbbf24',
    c300: '#fcd34d',
    c50: '#fffbeb',
    c100: '#fef3c7',
  },
  {
    label: 'Cyan',
    c600: '#0891b2',
    c700: '#0e7490',
    c400: '#22d3ee',
    c300: '#67e8f9',
    c50: '#ecfeff',
    c100: '#cffafe',
  },
];

const RADIUS_PRESETS = [
  { label: 'Sharp', md: '2px', full: '4px' },
  { label: 'Soft', md: '6px', full: '9999px' },
  { label: 'Round', md: '10px', full: '9999px' },
  { label: 'Pill', md: '9999px', full: '9999px' },
];

const CustomBuilder: React.FC = () => {
  const [accentIdx, setAccentIdx] = useState(0);
  const [radiusIdx, setRadiusIdx] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const accent = COLOR_ACCENTS[accentIdx]!;
  const rad = RADIUS_PRESETS[radiusIdx]!;

  const themeInput: CreateThemeInput = useMemo(
    () => ({
      scheme: darkMode ? 'dark' : 'light',
      colors: {
        primary: {
          50: accent.c50,
          100: accent.c100,
          200: accent.c100,
          300: accent.c300,
          400: accent.c400,
          500: accent.c600,
          600: accent.c600,
          700: accent.c700,
          800: accent.c700,
          900: accent.c700,
        },
      },
      radius: { md: rad.md, full: rad.full },
    }),
    [accentIdx, radiusIdx, darkMode],
  );

  const customTheme = useMemo(() => createTheme(themeInput), [themeInput]);

  const generatedCode = [
    `createTheme({`,
    `  scheme: '${darkMode ? 'dark' : 'light'}',`,
    `  colors: {`,
    `    primary: {`,
    `      50: '${accent.c50}',`,
    `      600: '${accent.c600}',   // base`,
    `      700: '${accent.c700}',   // hover`,
    `      400: '${accent.c400}',   // dark base`,
    `    },`,
    `  },`,
    `  radius: {`,
    `    md:   '${rad.md}',`,
    `    full: '${rad.full}',`,
    `  },`,
    `})`,
  ].join('\n');

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Controls */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 6,
            }}
          >
            Accent color
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {COLOR_ACCENTS.map((a, i) => (
              <button
                key={a.label}
                type="button"
                title={a.label}
                onClick={() => setAccentIdx(i)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: a.c600,
                  border: 'none',
                  outline: accentIdx === i ? `3px solid ${a.c600}` : 'none',
                  outlineOffset: 2,
                  boxShadow: accentIdx === i ? '0 0 0 2px white' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 6,
            }}
          >
            Radius
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {RADIUS_PRESETS.map((r, i) => (
              <button
                key={r.label}
                type="button"
                onClick={() => setRadiusIdx(i)}
                style={{
                  padding: '3px 10px',
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

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
              marginBottom: 6,
            }}
          >
            Scheme
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['Light', 'Dark'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setDarkMode(s === 'Dark')}
                style={{
                  padding: '3px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  borderRadius: 4,
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  background:
                    (s === 'Dark') === darkMode ? 'var(--color-primary)' : 'var(--color-bg-muted)',
                  color: (s === 'Dark') === darkMode ? '#fff' : 'var(--color-text-secondary)',
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
            padding: '3px 8px',
            background: 'var(--color-bg-muted)',
            borderRadius: 4,
            border: '1px solid var(--color-border)',
          }}
        >
          live ThemeProvider
        </div>
      </div>

      {/* Live preview — isolated ThemeProvider */}
      <ThemeProvider theme={customTheme}>
        <div
          data-theme={darkMode ? 'dark' : 'light'}
          style={{ padding: '24px 20px', background: 'var(--vyantra-surface-bg)' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            <Button intent="primary" appearance="solid">
              Primary
            </Button>
            <Button intent="primary" appearance="outline">
              Outline
            </Button>
            <Button intent="primary" appearance="soft">
              Soft
            </Button>
            <Button intent="secondary" appearance="solid">
              Secondary
            </Button>
            <Button intent="success" appearance="solid">
              Success
            </Button>
            <Button intent="danger" appearance="solid">
              Danger
            </Button>
            <Button intent="primary" appearance="solid" loading>
              Loading
            </Button>
            <Button intent="primary" appearance="solid" disabled>
              Disabled
            </Button>
          </div>
          <Divider style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['none', 'sm', 'md', 'lg', 'xl', 'full'].map((r) => (
              <Button
                key={r}
                intent="primary"
                appearance="solid"
                radius={r as 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'}
                size="sm"
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </ThemeProvider>

      {/* Generated code */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-subtle)',
          padding: '0 18px 16px',
        }}
      >
        <div
          style={{
            fontSize: 10,
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
        <Code>{generatedCode}</Code>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────

export const ThemingShowcasePage: React.FC = () => {
  const [activePreset, setActivePreset] = useState('default');

  const preset = PRESETS.find((p) => p.id === activePreset) ?? PRESETS[0]!;
  const presetTheme = useMemo(() => createTheme(preset.input), [activePreset]);

  const presetCode = [
    `// ${preset.label} — ${preset.desc}`,
    `const theme = createTheme(${JSON.stringify(
      {
        scheme: preset.input.scheme,
        ...(preset.input.colors ? { colors: { primary: '{ … }' } } : {}),
        ...(preset.input.radius ? { radius: preset.input.radius } : {}),
        ...(preset.input.components ? { components: '{ Button: { … } }' } : {}),
      },
      null,
      2,
    )
      .replace('"{ … }"', '{ … }')
      .replace('"{ Button: { … } }"', '{ Button: { … } }')});`,
    ``,
    `<ThemeProvider theme={theme}>`,
    `  <App />`,
    `</ThemeProvider>`,
  ].join('\n');

  return (
    <div className="page-content">
      {/* Heading */}
      <div className="page-heading">
        <div className="page-heading-eyebrow">theming</div>
        <h1>Custom Theming</h1>
        <p>
          Every aspect of Vyantra is driven by <M>createTheme()</M>. Pick a preset to see a full
          isolated <M>ThemeProvider</M> running a completely different theme alongside the docs app.
          Then use the builder to compose your own.
        </p>
        <div className="prop-badges">
          {[
            'createTheme',
            'ThemeProvider',
            'useScheme',
            'colors',
            'radius',
            'components.Button.vars',
          ].map((b) => (
            <span className="prop-badge" key={b}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ── 1. Preset gallery ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">1</div>
          <div className="section-title">Theme presets</div>
          <div className="section-desc">each runs its own isolated ThemeProvider</div>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: 16 }}
        >
          {/* Preset list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {PRESETS.map((p) => (
              <PresetCard
                key={p.id}
                preset={p}
                active={activePreset === p.id}
                onClick={() => setActivePreset(p.id)}
              />
            ))}
          </div>

          {/* Live preview + code */}
          <div>
            <ThemeProvider theme={presetTheme}>
              <div
                data-theme={
                  preset.input.scheme === 'dark'
                    ? 'dark'
                    : preset.input.scheme === 'light'
                      ? 'light'
                      : undefined
                }
              >
                <LivePreview />
              </div>
            </ThemeProvider>
            <Code>{presetCode}</Code>
          </div>
        </div>
      </div>

      {/* ── 2. Builder ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">2</div>
          <div className="section-title">Live theme builder</div>
          <div className="section-desc">compose your own — generates createTheme() code</div>
        </div>
        <CustomBuilder />
      </div>

      {/* ── 3. Multiple providers ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">3</div>
          <div className="section-title">Nested ThemeProviders</div>
          <div className="section-desc">
            different sections of your app can have different themes
          </div>
        </div>
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        >
          <M>ThemeProvider</M> can be nested. Inner providers override outer ones for their subtree.
          Useful for marketing sections, admin panels, or branded embed widgets coexisting on the
          same page.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {PRESETS.slice(1).map((p) => {
            const t = createTheme(p.input);
            return (
              <ThemeProvider key={p.id} theme={t}>
                <div
                  data-theme={
                    p.input.scheme === 'dark'
                      ? 'dark'
                      : p.input.scheme === 'light'
                        ? 'light'
                        : undefined
                  }
                  style={{
                    padding: 16,
                    background: 'var(--vyantra-surface-bg)',
                    border: '1px solid var(--vyantra-surface-border)',
                    borderRadius: 'var(--vyantra-radius-xl, 12px)',
                  }}
                >
                  <Text
                    size="xs"
                    style={{
                      color: 'var(--vyantra-text-tertiary)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: 10,
                    }}
                  >
                    {p.emoji} {p.label}
                  </Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Button intent="primary" appearance="solid" size="sm" style={{ width: '100%' }}>
                      Primary action
                    </Button>
                    <Button
                      intent="primary"
                      appearance="outline"
                      size="sm"
                      style={{ width: '100%' }}
                    >
                      Secondary
                    </Button>
                    <Button intent="danger" appearance="ghost" size="sm" style={{ width: '100%' }}>
                      Delete
                    </Button>
                  </div>
                </div>
              </ThemeProvider>
            );
          })}
        </div>

        <Code>{`
// Four isolated theme contexts on the same page

<ThemeProvider theme={roseTheme}>
  <MarketingSection />     {/* rose + pill */}
</ThemeProvider>

<ThemeProvider theme={violetDarkTheme}>
  <AdminPanel />           {/* violet + sharp + dark */}
</ThemeProvider>

<ThemeProvider theme={emeraldTheme}>
  <CheckoutFlow />         {/* emerald + rounded */}
</ThemeProvider>

// All components inside each provider pick up
// that provider's tokens automatically — no prop drilling.
        `}</Code>
      </div>

      {/* ── 4. Per-component vars ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">4</div>
          <div className="section-title">Per-component CSS vars</div>
          <div className="section-desc">vars() feeds :hover and :active without inline styles</div>
        </div>
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        >
          The <M>vars()</M> function in <M>components.Button</M> writes CSS custom properties
          directly onto the DOM. Button.css reads them via{' '}
          <M>var(--vyantra-btn-bg, var(--btn-color))</M>, so hover, focus, and active states
          automatically pick up your override — no inline styles needed anywhere.
        </p>
        <Code>{`
const theme = createTheme({
  components: {
    Button: {
      // ThemeProvider writes these to the DOM:
      // --vyantra-btn-bg, --vyantra-btn-bg-hover, etc.
      vars: (token, scheme) => ({
        // Different shade for dark vs light
        '--vyantra-btn-bg':          scheme === 'dark'
                                       ? token.colors.primary[400]
                                       : token.colors.primary[600],
        '--vyantra-btn-bg-hover':    scheme === 'dark'
                                       ? token.colors.primary[300]
                                       : token.colors.primary[700],

        // Override the focus ring color
        '--vyantra-btn-focus-ring':  token.colors.primary[400],

        // Typography
        '--vyantra-btn-font-weight': '700',
        '--vyantra-btn-letter-spacing': '0.04em',

        // Shape
        '--vyantra-btn-radius':      token.radius.full,
      }),
    },
  },
});

// Button.css cascade — first defined wins:
// 1. --vyantra-btn-bg          ← your override (from vars() above)
// 2. var(--btn-color)          ← intent fallback (e.g. primary-base)
// 3. hardcoded value           ← works without ThemeProvider at all
        `}</Code>
      </div>
    </div>
  );
};
