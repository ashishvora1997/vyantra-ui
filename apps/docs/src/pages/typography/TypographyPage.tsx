import React, { useState } from 'react';
import { Text, Title, Label, Code, Highlight, NumberFormatter } from '@vyantra/ui';

// ─── Shared helpers ───────────────────────────────────────────────────────────

const DocCode: React.FC<{ children: string }> = ({ children }) => (
  <div className="pg-code-box" style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.7 }}>
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
    }}
  >
    {children}
  </code>
);

const Section: React.FC<{
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

const PropsTable: React.FC<{
  rows: { prop: string; type: string; def: string; desc: string }[];
}> = ({ rows }) => (
  <div className="props-wrap" style={{ marginTop: 16 }}>
    <table className="props-table">
      <thead>
        <tr>
          {['Prop', 'Type', 'Default', 'Description'].map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.prop}>
            <td className="td-prop">{r.prop}</td>
            <td className="td-type">{r.type}</td>
            <td className="td-def">{r.def}</td>
            <td className="td-desc">{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  TYPOGRAPHY PAGE
// ─────────────────────────────────────────────────────────────────────────────

export const TypographyPage: React.FC = () => {
  const [query, setQuery] = useState('vyantra');

  return (
    <div className="page-content">
      <div className="page-heading">
        <div className="page-heading-eyebrow">level 1 — typography</div>
        <h1>Typography</h1>
        <p>
          Text primitives built on the Vyantra token scale. Every size, weight and color maps to a{' '}
          <M>--vyantra-*</M> CSS variable.
        </p>
        <div className="prop-badges">
          {['Text', 'Title', 'Label', 'Code', 'Highlight', 'NumberFormatter'].map((c) => (
            <span className="prop-badge" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ══ TEXT ══ */}
      <Section num={1} title="Text" desc="paragraph, span — full token scale">
        {/* Size scale */}
        <div className="sub-label">size scale</div>
        <div className="doc-card">
          {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
            <div
              key={size}
              style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}
            >
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ width: 32, flexShrink: 0, fontFamily: 'var(--font-mono)' }}
              >
                {size}
              </Text>
              <Text size={size}>The quick brown fox jumps over the lazy dog</Text>
            </div>
          ))}
        </div>

        {/* Weight */}
        <div className="sub-label" style={{ marginTop: 16 }}>
          weight
        </div>
        <div className="doc-card">
          {(['regular', 'medium', 'semibold', 'bold'] as const).map((w) => (
            <div
              key={w}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}
            >
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ width: 72, flexShrink: 0, fontFamily: 'var(--font-mono)' }}
              >
                {w}
              </Text>
              <Text size="lg" weight={w}>
                Vyantra Design System
              </Text>
            </div>
          ))}
        </div>

        {/* Utilities */}
        <div className="sub-label" style={{ marginTop: 16 }}>
          utilities
        </div>
        <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Text size="sm" dimmed>
            Dimmed text — uses --vyantra-text-secondary
          </Text>
          <Text size="sm" c="var(--color-primary-text)">
            Custom color via c prop
          </Text>
          <Text size="sm" transform="uppercase" weight="semibold" ls={1}>
            Uppercase with letter spacing
          </Text>
          <Text size="sm" decoration="underline">
            Underlined text
          </Text>
          <div style={{ width: 300 }}>
            <Text size="sm" lineClamp={1}>
              Single line truncation — this text is very long and will be clipped with an ellipsis
              at the end of the line
            </Text>
          </div>
          <div style={{ width: 300 }}>
            <Text size="sm" lineClamp={2}>
              Multi-line clamp at 2 lines — this text is intentionally long so you can see how the
              line clamp works when the content exceeds the allowed number of lines
            </Text>
          </div>
          <Text size="sm">
            Inline{' '}
            <Text span weight="bold" c="var(--color-primary-text)">
              bold primary
            </Text>{' '}
            text with{' '}
            <Text span inherit decoration="underline">
              underline
            </Text>{' '}
            using span mode.
          </Text>
        </div>

        <DocCode>{`
import { Text } from '@vyantra/ui';

// Sizes
<Text size="sm">Small text</Text>
<Text size="xl">Extra large text</Text>

// Weight
<Text weight="bold">Bold text</Text>
<Text weight="semibold">Semibold</Text>

// Color
<Text c="var(--vyantra-text-secondary)">Secondary</Text>
<Text dimmed>Dimmed (secondary color)</Text>

// Utilities
<Text transform="uppercase" ls={1}>UPPERCASE</Text>
<Text lineClamp={1}>Truncated single line…</Text>
<Text lineClamp={2}>Clamped at 2 lines…</Text>

// Inline span
<Text>Text with <Text span weight="bold">bold</Text> word</Text>

// Polymorphic
<Text as="span">Renders as span</Text>
<Text as="label" htmlFor="input">Renders as label</Text>
        `}</DocCode>

        <PropsTable
          rows={[
            {
              prop: 'size',
              type: 'TextSize',
              def: '"md"',
              desc: 'Font size from token scale (2xs → 4xl)',
            },
            {
              prop: 'weight',
              type: 'TextWeight',
              def: '"regular"',
              desc: 'Font weight (regular | medium | semibold | bold)',
            },
            {
              prop: 'c',
              type: 'string',
              def: 'inherit',
              desc: 'Text color — CSS value or --vyantra-* token',
            },
            {
              prop: 'dimmed',
              type: 'boolean',
              def: 'false',
              desc: 'Apply --vyantra-text-secondary color',
            },
            {
              prop: 'align',
              type: 'TextAlign',
              def: '—',
              desc: 'Text alignment (left | center | right | justify)',
            },
            {
              prop: 'transform',
              type: 'TextTransform',
              def: '—',
              desc: 'Text transform (uppercase | lowercase | capitalize)',
            },
            {
              prop: 'decoration',
              type: 'TextDecoration',
              def: '—',
              desc: 'underline | line-through',
            },
            { prop: 'lineClamp', type: 'number', def: '—', desc: 'Clamp to N lines with ellipsis' },
            { prop: 'span', type: 'boolean', def: 'false', desc: 'Render as inline <span>' },
            {
              prop: 'inherit',
              type: 'boolean',
              def: 'false',
              desc: 'Inherit font size/weight from parent',
            },
            { prop: 'as', type: 'ElementType', def: '"p"', desc: 'Polymorphic root element' },
          ]}
        />
      </Section>

      <div className="section-divider" />

      {/* ══ TITLE ══ */}
      <Section num={2} title="Title" desc="h1 – h6 with visual size override">
        <div className="doc-card">
          {([1, 2, 3, 4, 5, 6] as const).map((order) => (
            <div
              key={order}
              style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}
            >
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ width: 24, flexShrink: 0, fontFamily: 'var(--font-mono)' }}
              >
                h{order}
              </Text>
              <Title order={order}>Vyantra Design System</Title>
            </div>
          ))}
        </div>

        <div className="sub-label" style={{ marginTop: 16 }}>
          visual size override
        </div>
        <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ width: 130, flexShrink: 0, fontFamily: 'var(--font-mono)' }}
            >
              order=2 size="h4"
            </Text>
            <Title order={2} size="h4">
              Semantic h2, visually h4
            </Title>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ width: 130, flexShrink: 0, fontFamily: 'var(--font-mono)' }}
            >
              c + align
            </Text>
            <Title order={3} c="var(--color-primary-text)" align="center" style={{ flex: 1 }}>
              Centered colored title
            </Title>
          </div>
        </div>

        <DocCode>{`
import { Title } from '@vyantra/ui';

<Title order={1}>Page Title</Title>
<Title order={2}>Section Heading</Title>
<Title order={3}>Subsection</Title>

// Visual size override — semantic h2, looks like h4
<Title order={2} size="h4">Semantic h2, visually h4</Title>

// Custom color + alignment
<Title order={1} c="var(--vyantra-color-primary-text)" align="center">
  Centered
</Title>

// Truncate
<Title order={2} lineClamp={1}>Very long title that gets clipped</Title>
        `}</DocCode>

        <PropsTable
          rows={[
            {
              prop: 'order',
              type: '1|2|3|4|5|6',
              def: '1',
              desc: 'HTML heading level — renders h1–h6',
            },
            {
              prop: 'size',
              type: 'TitleSize',
              def: 'order',
              desc: 'Visual size override — "h1"–"h6"',
            },
            { prop: 'c', type: 'string', def: '--vyantra-text-primary', desc: 'Color override' },
            { prop: 'align', type: 'string', def: '—', desc: 'Text alignment' },
            { prop: 'lineClamp', type: 'number', def: '—', desc: 'Clamp to N lines' },
            { prop: 'fw', type: 'string|number', def: '—', desc: 'Font weight override' },
            { prop: 'ff', type: 'string', def: '—', desc: 'Font family override' },
          ]}
        />
      </Section>

      <div className="section-divider" />

      {/* ══ LABEL ══ */}
      <Section num={3} title="Label" desc="form field label with required, optional, disabled">
        <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Label htmlFor="basic">Basic label</Label>
            <input
              id="basic"
              placeholder="input"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Label htmlFor="req" required>
              Email address
            </Label>
            <input
              id="req"
              type="email"
              placeholder="you@example.com"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Label htmlFor="opt" optional>
              Nickname
            </Label>
            <input
              id="opt"
              placeholder="optional"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Label htmlFor="dis" disabled>
              Disabled field
            </Label>
            <input
              id="dis"
              disabled
              placeholder="disabled"
              style={{
                padding: '6px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                background: 'var(--color-bg-muted)',
                color: 'var(--color-text-disabled)',
                cursor: 'not-allowed',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
              <div key={s}>
                <Label size={s}>Label {s}</Label>
              </div>
            ))}
          </div>
        </div>

        <DocCode>{`
import { Label } from '@vyantra/ui';

// Basic
<Label htmlFor="email">Email</Label>

// Required — shows red asterisk
<Label htmlFor="email" required>Email address</Label>

// Asterisk on the left
<Label htmlFor="email" required asteriskPosition="left">Email</Label>

// Optional text
<Label htmlFor="nick" optional>Nickname</Label>

// Disabled state
<Label htmlFor="field" disabled>Disabled</Label>

// Size
<Label size="xs">Tiny label</Label>
<Label size="lg">Large label</Label>
        `}</DocCode>

        <PropsTable
          rows={[
            { prop: 'size', type: '"xs"|"sm"|"md"|"lg"', def: '"sm"', desc: 'Font size' },
            { prop: 'required', type: 'boolean', def: 'false', desc: 'Shows red asterisk' },
            {
              prop: 'asteriskPosition',
              type: '"left"|"right"',
              def: '"right"',
              desc: 'Position of the asterisk',
            },
            { prop: 'optional', type: 'boolean', def: 'false', desc: 'Shows "(optional)" text' },
            {
              prop: 'disabled',
              type: 'boolean',
              def: 'false',
              desc: 'Dims the label (pair with disabled input)',
            },
            {
              prop: 'htmlFor',
              type: 'string',
              def: '—',
              desc: 'Associates with input (native label prop)',
            },
          ]}
        />
      </Section>

      <div className="section-divider" />

      {/* ══ CODE ══ */}
      <Section num={4} title="Code" desc="inline code and code blocks">
        <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Text size="sm">
            Install with <Code>npm install @vyantra/ui</Code> then import <Code>Button</Code> from
            the package.
          </Text>

          <Code block>{`import { Button, Text } from '@vyantra/ui';
import { createTheme, ThemeProvider } from '@vyantra/ui/theme';

const theme = createTheme({ scheme: 'system' });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button intent="primary">Hello Vyantra</Button>
    </ThemeProvider>
  );
}`}</Code>
        </div>

        <DocCode>{`
import { Code } from '@vyantra/ui';

// Inline (renders as <code>)
<Code>npm install @vyantra/ui</Code>

// Block (renders as <pre><code>)
<Code block>
{\`const x = 1;
console.log(x);\`}
</Code>

// Custom colors
<Code bg="var(--vyantra-surface-bg-muted)" c="var(--vyantra-color-success-text)">
  npm run dev
</Code>
        `}</DocCode>

        <PropsTable
          rows={[
            {
              prop: 'block',
              type: 'boolean',
              def: 'false',
              desc: 'Renders as block <pre><code> instead of inline <code>',
            },
            {
              prop: 'bg',
              type: 'string',
              def: '--vyantra-surface-bg-muted',
              desc: 'Background color override',
            },
            {
              prop: 'c',
              type: 'string',
              def: '--vyantra-color-danger-text',
              desc: 'Text color override',
            },
          ]}
        />
      </Section>

      <div className="section-divider" />

      {/* ══ HIGHLIGHT ══ */}
      <Section num={5} title="Highlight" desc="highlight substrings within text">
        <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
            >
              single query
            </Text>
            <Highlight highlight="vyantra">
              Build beautiful UIs with Vyantra — the lightweight design system.
            </Highlight>
          </div>
          <div>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
            >
              multiple queries
            </Text>
            <Highlight highlight={['lightweight', 'design system', 'beautiful']}>
              Build beautiful UIs with Vyantra — the lightweight design system.
            </Highlight>
          </div>
          <div>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
            >
              custom colors per query
            </Text>
            <Highlight
              highlight={[
                {
                  query: 'primary',
                  color: 'var(--color-primary-subtle)',
                  textColor: 'var(--color-primary-text)',
                },
                {
                  query: 'danger',
                  color: 'var(--color-danger-subtle)',
                  textColor: 'var(--color-danger-text)',
                },
                {
                  query: 'success',
                  color: 'var(--color-success-subtle)',
                  textColor: 'var(--color-success-text)',
                },
              ]}
            >
              Use intent colors: primary for actions, danger for deletes, success for confirms.
            </Highlight>
          </div>
          <div>
            <Text
              size="xs"
              c="var(--color-text-tertiary)"
              style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
            >
              interactive — type to search
            </Text>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search term…"
              style={{
                padding: '4px 10px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Highlight highlight={query} as="p">
              Vyantra is a lightweight, modular React design system with accessible components,
              design tokens, and full theming support. Start building with Vyantra today.
            </Highlight>
          </div>
        </div>

        <DocCode>{`
import { Highlight } from '@vyantra/ui';

// Single query
<Highlight highlight="vyantra">
  Build with Vyantra today.
</Highlight>

// Multiple queries
<Highlight highlight={['lightweight', 'fast', 'accessible']}>
  A lightweight, fast, accessible design system.
</Highlight>

// Per-query colors
<Highlight highlight={[
  { query: 'primary', color: 'var(--vyantra-color-primary-subtle)' },
  { query: 'danger',  color: 'var(--vyantra-color-danger-subtle)'  },
]}>
  Use primary for actions, danger for deletes.
</Highlight>

// Case sensitive
<Highlight highlight="React" caseSensitive>
  Built with React (not react).
</Highlight>
        `}</DocCode>

        <PropsTable
          rows={[
            { prop: 'children', type: 'string', def: '—', desc: 'The full text content' },
            {
              prop: 'highlight',
              type: 'string | string[] | HighlightChunk[]',
              def: '—',
              desc: 'Query string(s) to highlight',
            },
            {
              prop: 'highlightColor',
              type: 'string',
              def: '--vyantra-color-warning-subtle',
              desc: 'Default highlight background',
            },
            {
              prop: 'highlightTextColor',
              type: 'string',
              def: '—',
              desc: 'Default text color on highlights',
            },
            {
              prop: 'caseSensitive',
              type: 'boolean',
              def: 'false',
              desc: 'Case-sensitive matching',
            },
            { prop: 'as', type: 'ElementType', def: '"p"', desc: 'Root element' },
          ]}
        />
      </Section>

      <div className="section-divider" />

      {/* ══ NUMBER FORMATTER ══ */}
      <Section
        num={6}
        title="NumberFormatter"
        desc="locale-aware number, currency, percent formatting"
      >
        <div className="doc-card">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
            {[
              {
                label: 'decimal',
                node: <NumberFormatter value={1234567.89} maximumFractionDigits={2} />,
              },
              {
                label: 'currency USD',
                node: <NumberFormatter value={9999.5} style="currency" currency="USD" />,
              },
              {
                label: 'currency INR',
                node: (
                  <NumberFormatter value={9999.5} style="currency" currency="INR" locale="en-IN" />
                ),
              },
              {
                label: 'percent',
                node: <NumberFormatter value={0.734} style="percent" maximumFractionDigits={1} />,
              },
              {
                label: 'compact',
                node: (
                  <NumberFormatter value={1250000} notation="compact" maximumFractionDigits={1} />
                ),
              },
              {
                label: 'prefix/suffix',
                node: <NumberFormatter value={42} prefix="★ " suffix=" pts" />,
              },
              {
                label: 'custom sep',
                node: (
                  <NumberFormatter
                    value={1234567}
                    thousandSeparator="."
                    decimalSeparator=","
                    maximumFractionDigits={2}
                  />
                ),
              },
              {
                label: 'negative',
                node: <NumberFormatter value={-4850.5} style="currency" currency="USD" />,
              },
            ].map(({ label, node }) => (
              <div
                key={label}
                style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                }}
              >
                <Text
                  size="xs"
                  c="var(--color-text-tertiary)"
                  style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
                >
                  {label}
                </Text>
                <Text size="lg" weight="semibold" c="var(--color-text-primary)">
                  {node}
                </Text>
              </div>
            ))}
          </div>
        </div>

        <DocCode>{`
import { NumberFormatter } from '@vyantra/ui';

// Decimal with grouping
<NumberFormatter value={1234567.89} maximumFractionDigits={2} />
// → 1,234,567.89

// Currency
<NumberFormatter value={9999.5} style="currency" currency="USD" />
// → $9,999.50

// Indian locale
<NumberFormatter value={9999.5} style="currency" currency="INR" locale="en-IN" />
// → ₹9,999.50

// Percent
<NumberFormatter value={0.734} style="percent" maximumFractionDigits={1} />
// → 73.4%

// Compact notation
<NumberFormatter value={1250000} notation="compact" maximumFractionDigits={1} />
// → 1.3M

// Prefix / suffix
<NumberFormatter value={42} prefix="★ " suffix=" pts" />
// → ★ 42 pts

// Custom separators
<NumberFormatter value={1234567} thousandSeparator="." decimalSeparator="," />
// → 1.234.567
        `}</DocCode>

        <PropsTable
          rows={[
            { prop: 'value', type: 'number', def: '—', desc: 'The number to format' },
            {
              prop: 'locale',
              type: 'string',
              def: '"en-US"',
              desc: 'Locale string (e.g. "de-DE", "en-IN")',
            },
            {
              prop: 'style',
              type: '"decimal"|"currency"|"percent"|"unit"',
              def: '"decimal"',
              desc: 'Intl format style',
            },
            {
              prop: 'currency',
              type: 'string',
              def: '—',
              desc: 'Currency code — required when style="currency"',
            },
            {
              prop: 'notation',
              type: '"standard"|"compact"|...',
              def: '"standard"',
              desc: 'Number notation',
            },
            { prop: 'minimumFractionDigits', type: 'number', def: '—', desc: 'Min decimal places' },
            { prop: 'maximumFractionDigits', type: 'number', def: '—', desc: 'Max decimal places' },
            {
              prop: 'prefix',
              type: 'string',
              def: '""',
              desc: 'String prepended to the formatted value',
            },
            {
              prop: 'suffix',
              type: 'string',
              def: '""',
              desc: 'String appended to the formatted value',
            },
            {
              prop: 'thousandSeparator',
              type: 'string',
              def: '—',
              desc: 'Override thousand separator (bypasses Intl)',
            },
            {
              prop: 'decimalSeparator',
              type: 'string',
              def: '—',
              desc: 'Override decimal separator',
            },
            { prop: 'as', type: 'ElementType', def: '"span"', desc: 'Root element' },
          ]}
        />
      </Section>
    </div>
  );
};
