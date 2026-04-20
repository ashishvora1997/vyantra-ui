import React, { useRef, useState } from 'react';
import { Box } from '@vyantra/ui';
import { Code, M, Callout, Section, PropsTable, Preview, PageHeading } from '../../helper';

// ─── Token shorthand helper ───────────────────────────────────────────────────
const T = (key: string) => `var(--vyantra-${key})`;

// ─────────────────────────────────────────────────────────────────────────────

export const BoxPage: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [highlighted, setHighlighted] = useState(false);

  return (
    <div className="page-content">
      <PageHeading
        title="Box"
        desc="Base layout primitive. Renders any HTML element with shorthand CSS props. Zero class overhead — all styling is applied as inline styles, so it works without ThemeProvider and is fully tree-shakeable."
        badges={[
          'as',
          'p/m',
          'w/h',
          'display',
          'flex',
          'bg',
          'c',
          'radius',
          'border',
          'shadow',
          'fz/fw',
          'ref',
        ]}
        source="Box/"
      />

      {/* ── 1. SPACING ── */}
      <Section num={1} title="Spacing" desc="p, px, py, pt, pr, pb, pl — m, mx, my, mt, mr, mb, ml">
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 12 }}>
            {[
              { label: 'p="8px"', props: { p: '8px' } },
              { label: 'p="16px"', props: { p: '16px' } },
              { label: 'p="24px"', props: { p: '24px' } },
              { label: 'px="24px" py="8px"', props: { px: '24px', py: '8px' } },
              { label: 'pt="20px" pb="4px"', props: { pt: '20px', pb: '4px' } },
            ].map(({ label, props }) => (
              <Box
                key={label}
                {...props}
                bg={T('color-primary-subtle')}
                border={`1px solid ${T('color-primary-border')}`}
                radius={T('radius-md')}
                fz={T('font-size-xs')}
                c={T('color-primary-text')}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </Box>
            ))}
          </div>
        </Preview>

        <Code>{`
// padding
<Box p="16px">All sides</Box>
<Box px="24px" py="8px">Horizontal + vertical</Box>
<Box pt="20px" pb="4px">Top + bottom only</Box>
<Box pl="12px" pr="12px">Left + right only</Box>

// margin
<Box mt="var(--vyantra-spacing-4)" mb="var(--vyantra-spacing-8)">Vertical margin</Box>
<Box mx="auto">Centered (auto margins)</Box>
<Box my="var(--vyantra-spacing-6)">Block margin</Box>

// token shorthand (recommended)
<Box p="var(--vyantra-spacing-4)" m="var(--vyantra-spacing-2)">
  Uses design tokens
</Box>
        `}</Code>
      </Section>

      {/* ── 2. SIZING ── */}
      <Section num={2} title="Sizing" desc="w, h, minW, maxW, minH, maxH">
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 8 }}>
            {[40, 60, 80, 100, 120].map((s) => (
              <Box
                key={s}
                w={s}
                h={s}
                bg={T('color-primary-subtle')}
                border={`1px solid ${T('color-primary-border')}`}
                radius={T('radius-md')}
                display="flex"
                align="center"
                justify="center"
                fz={T('font-size-xs')}
                c={T('color-primary-text')}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s}
              </Box>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Box
              maxW={360}
              w="100%"
              p={T('spacing-3')}
              bg={T('color-success-subtle')}
              border={`1px solid ${T('color-success-border')}`}
              radius={T('radius-md')}
              fz={T('font-size-xs')}
              c={T('color-success-text')}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              maxW=360 w="100%" — grows up to 360px
            </Box>
          </div>
        </Preview>

        <Code>{`
// Fixed size
<Box w={64} h={64} />           // number → px
<Box w="100%" h="auto" />
<Box w="fit-content" />

// Constrained
<Box maxW={680} mx="auto">     // centered article width
  <Article />
</Box>
<Box minH={200}>               // at least 200px tall
  <Content />
</Box>
        `}</Code>
      </Section>

      {/* ── 3. FLEX LAYOUT ── */}
      <Section
        num={3}
        title="Flex layout"
        desc="display=flex + align, justify, direction, wrap, gap"
      >
        <Preview label="row (default direction)">
          <Box
            display="flex"
            align="center"
            justify="space-between"
            gap={T('spacing-3')}
            p={T('spacing-4')}
            bg={T('surface-bg-subtle')}
            border={`1px solid ${T('surface-border')}`}
            radius={T('radius-lg')}
          >
            <Box fw={600} fz={T('font-size-sm')} c={T('text-primary')}>
              Card title
            </Box>
            <Box display="flex" gap={T('spacing-2')}>
              {['Edit', 'Delete'].map((t) => (
                <Box
                  key={t}
                  as="button"
                  type="button"
                  px={T('spacing-3')}
                  py={T('spacing-1')}
                  bg={t === 'Delete' ? T('color-danger-subtle') : T('surface-bg-muted')}
                  c={t === 'Delete' ? T('color-danger-text') : T('text-secondary')}
                  border={`1px solid ${t === 'Delete' ? T('color-danger-border') : T('surface-border')}`}
                  radius={T('radius-sm')}
                  fz={T('font-size-xs')}
                  cursor="pointer"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {t}
                </Box>
              ))}
            </Box>
          </Box>
        </Preview>

        <Preview label="column">
          <Box display="flex" direction="column" gap={T('spacing-2')} maxW={280}>
            {['First', 'Second', 'Third'].map((t) => (
              <Box
                key={t}
                p={T('spacing-3')}
                bg={T('surface-bg')}
                border={`1px solid ${T('surface-border')}`}
                radius={T('radius-md')}
                fz={T('font-size-sm')}
                c={T('text-primary')}
              >
                {t} item
              </Box>
            ))}
          </Box>
        </Preview>

        <Preview label="wrap">
          <Box display="flex" wrap="wrap" gap={T('spacing-2')}>
            {[
              'React',
              'TypeScript',
              'CSS Variables',
              'Design Tokens',
              'Dark Mode',
              'Accessible',
            ].map((t) => (
              <Box
                key={t}
                px={T('spacing-3')}
                py="4px"
                bg={T('color-primary-subtle')}
                c={T('color-primary-text')}
                border={`1px solid ${T('color-primary-border')}`}
                radius={T('radius-full')}
                fz={T('font-size-xs')}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {t}
              </Box>
            ))}
          </Box>
        </Preview>

        <Code>{`
// Row with space-between
<Box display="flex" align="center" justify="space-between" gap="var(--vyantra-spacing-3)">
  <Box fw={600}>Title</Box>
  <Box display="flex" gap="var(--vyantra-spacing-2)">
    <Button size="sm">Edit</Button>
    <Button size="sm" intent="danger">Delete</Button>
  </Box>
</Box>

// Column form layout
<Box display="flex" direction="column" gap="var(--vyantra-spacing-4)">
  <Input label="Name" />
  <Input label="Email" />
  <Button width="full">Submit</Button>
</Box>

// Centered hero
<Box display="flex" direction="column" align="center" justify="center"
  minH="100vh" gap="var(--vyantra-spacing-6)">
  <Title order={1}>Welcome</Title>
  <Button>Get started</Button>
</Box>
        `}</Code>
      </Section>

      {/* ── 4. BACKGROUND, COLOR, BORDER ── */}
      <Section
        num={4}
        title="Visual styling"
        desc="bg, c, opacity, border, borderColor, radius, shadow"
      >
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              {
                label: 'primary',
                bg: T('color-primary-subtle'),
                border: T('color-primary-border'),
                c: T('color-primary-text'),
              },
              {
                label: 'success',
                bg: T('color-success-subtle'),
                border: T('color-success-border'),
                c: T('color-success-text'),
              },
              {
                label: 'warning',
                bg: T('color-warning-subtle'),
                border: T('color-warning-border'),
                c: T('color-warning-text'),
              },
              {
                label: 'danger',
                bg: T('color-danger-subtle'),
                border: T('color-danger-border'),
                c: T('color-danger-text'),
              },
              {
                label: 'secondary',
                bg: T('color-secondary-subtle'),
                border: T('color-secondary-border'),
                c: T('color-secondary-text'),
              },
            ].map(({ label, bg, border, c }) => (
              <Box
                key={label}
                px={T('spacing-4')}
                py={T('spacing-2')}
                bg={bg}
                border={`1px solid ${border}`}
                c={c}
                radius={T('radius-lg')}
                fz={T('font-size-sm')}
                fw={500}
              >
                {label}
              </Box>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((r) => (
              <Box
                key={r}
                p={T('spacing-3')}
                bg={T('surface-bg-subtle')}
                border={`1px solid ${T('surface-border')}`}
                radius={r === 'none' ? '0' : r === 'full' ? '9999px' : `var(--vyantra-radius-${r})`}
                fz={T('font-size-xs')}
                c={T('text-tertiary')}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                radius-{r}
              </Box>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            {['sm', 'md', 'lg'].map((s) => (
              <Box
                key={s}
                p={T('spacing-4')}
                bg={T('surface-bg')}
                shadow={`var(--vyantra-shadow-${s})`}
                radius={T('radius-lg')}
                fz={T('font-size-xs')}
                c={T('text-secondary')}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                shadow-{s}
              </Box>
            ))}
          </div>
        </Preview>

        <Code>{`
// Background + border + radius
<Box
  bg="var(--vyantra-color-primary-subtle)"
  border="1px solid var(--vyantra-color-primary-border)"
  c="var(--vyantra-color-primary-text)"
  radius="var(--vyantra-radius-lg)"
  p="var(--vyantra-spacing-4)"
>
  Styled box
</Box>

// Shadow
<Box shadow="var(--vyantra-shadow-md)" radius="var(--vyantra-radius-xl)" p="var(--vyantra-spacing-6)">
  Card with shadow
</Box>

// Opacity
<Box opacity={0.5} bg="var(--vyantra-color-danger-subtle)">
  Dimmed
</Box>
        `}</Code>
      </Section>

      {/* ── 5. TYPOGRAPHY PROPS ── */}
      <Section num={5} title="Typography" desc="fz, fw, ff, lh, ls, ta">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Box
              fz={T('font-size-xs')}
              c={T('text-tertiary')}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              fz="font-size-xs" — 0.75rem
            </Box>
            <Box fz={T('font-size-xl')} fw={700} c={T('text-primary')}>
              fz="font-size-xl" fw=700
            </Box>
            <Box fz={T('font-size-sm')} ff={T('font-family-mono')} c={T('text-secondary')}>
              ff="font-family-mono" — monospace text
            </Box>
            <Box
              fz={T('font-size-md')}
              ls="0.08em"
              ta="center"
              c={T('text-primary')}
              style={{ textTransform: 'uppercase' }}
            >
              Uppercase with letter spacing
            </Box>
            <Box fz={T('font-size-sm')} lh="2" c={T('text-secondary')} maxW={340}>
              lh=2 — this paragraph has double line-height, making it more readable for longer
              passages of body copy.
            </Box>
          </div>
        </Preview>

        <Code>{`
<Box fz="var(--vyantra-font-size-sm)">Small text</Box>
<Box fw={700} fz="var(--vyantra-font-size-xl)">Bold large</Box>
<Box ff="var(--vyantra-font-family-mono)">Monospace</Box>
<Box ls="0.05em" ta="center">Spaced centered</Box>
<Box lh={1.8} maxW={600}>Readable paragraph</Box>
        `}</Code>
      </Section>

      {/* ── 6. POLYMORPHIC ── */}
      <Section num={6} title="Polymorphic — as any element" desc="renders the correct HTML element">
        <Preview>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <Box
              as="a"
              href="#"
              px={T('spacing-3')}
              py="5px"
              bg={T('color-primary-subtle')}
              c={T('color-primary-text')}
              radius={T('radius-full')}
              fz={T('font-size-xs')}
              fw={500}
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              as="a" — Link
            </Box>
            <Box
              as="button"
              type="button"
              px={T('spacing-4')}
              py={T('spacing-2')}
              bg={T('surface-bg-muted')}
              c={T('text-secondary')}
              border={`1px solid ${T('surface-border')}`}
              radius={T('radius-md')}
              fz={T('font-size-xs')}
              cursor="pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              as="button"
            </Box>
            <Box
              as="span"
              px={T('spacing-2')}
              py="2px"
              bg={T('color-success-subtle')}
              c={T('color-success-text')}
              radius={T('radius-sm')}
              fz={T('font-size-xs')}
              fw={500}
            >
              as="span" badge
            </Box>
            <Box
              as="kbd"
              px={T('spacing-2')}
              py="2px"
              bg={T('surface-bg-muted')}
              c={T('text-secondary')}
              border={`1px solid ${T('surface-border')}`}
              radius={T('radius-sm')}
              fz={T('font-size-xs')}
              shadow="inset 0 -1px 0 rgba(0,0,0,0.1)"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              ⌘K
            </Box>
          </div>
        </Preview>

        <Code>{`
// Link
<Box as="a" href="/docs" c="var(--vyantra-text-link)">Documentation</Box>

// Button (use <Button> component for interactions)
<Box as="button" type="button" onClick={handleClick}>Click</Box>

// Semantic HTML
<Box as="article" maxW={680} mx="auto">Article content</Box>
<Box as="section" py="var(--vyantra-spacing-16)">Section</Box>
<Box as="nav" display="flex" gap="var(--vyantra-spacing-4)">Navigation</Box>

// Keyboard shortcut badge
<Box as="kbd" px="6px" py="2px"
  bg="var(--vyantra-surface-bg-muted)"
  border="1px solid var(--vyantra-surface-border)"
  radius="var(--vyantra-radius-sm)"
  style={{ fontFamily: 'monospace' }}>
  ⌘K
</Box>
        `}</Code>

        <Callout type="tip">
          The <M>as</M> prop doesn't just change the tag — TypeScript narrows the valid HTML
          attributes.
          <M>as="a"</M> allows <M>href</M> and <M>target</M>, <M>as="img"</M> allows <M>src</M> and{' '}
          <M>alt</M>, etc.
        </Callout>
      </Section>

      {/* ── 7. REF FORWARDING ── */}
      <Section num={7} title="Ref forwarding" desc="correct type inferred from as prop">
        <Preview label="ref demo — click to measure">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Box
              ref={boxRef}
              p={T('spacing-4')}
              bg={highlighted ? T('color-primary-subtle') : T('surface-bg-subtle')}
              border={`1px solid ${highlighted ? T('color-primary-border') : T('surface-border')}`}
              radius={T('radius-lg')}
              fz={T('font-size-sm')}
              c={T('text-primary')}
              style={{ transition: 'all 200ms' }}
            >
              I have a ref
            </Box>
            <Box
              as="button"
              type="button"
              cursor="pointer"
              px={T('spacing-3')}
              py={T('spacing-2')}
              bg={T('surface-bg-muted')}
              c={T('text-secondary')}
              border={`1px solid ${T('surface-border')}`}
              radius={T('radius-md')}
              fz={T('font-size-xs')}
              style={{ fontFamily: 'var(--font-sans)' }}
              onClick={() => {
                if (boxRef.current) {
                  const r = boxRef.current.getBoundingClientRect();
                  setHighlighted(true);
                  alert(`Width: ${Math.round(r.width)}px\nHeight: ${Math.round(r.height)}px`);
                  setTimeout(() => setHighlighted(false), 1000);
                }
              }}
            >
              Measure
            </Box>
          </div>
        </Preview>

        <Code>{`
import { useRef } from 'react';
import { Box } from '@vyantra/ui';

// Ref type is automatically HTMLDivElement (default as="div")
const divRef = useRef<HTMLDivElement>(null);
<Box ref={divRef}>Content</Box>

// as="button" → ref type is HTMLButtonElement
const btnRef = useRef<HTMLButtonElement>(null);
<Box as="button" ref={btnRef}>Button</Box>

// as="a" → ref type is HTMLAnchorElement
const linkRef = useRef<HTMLAnchorElement>(null);
<Box as="a" ref={linkRef}>Link</Box>

// Measuring
useEffect(() => {
  if (divRef.current) {
    const { width, height } = divRef.current.getBoundingClientRect();
    console.log(width, height);
  }
}, []);
        `}</Code>
      </Section>

      <div className="section-divider" />

      {/* ── PROPS ── */}
      <Section num="■" title="Style props reference">
        <PropsTable
          rows={[
            {
              prop: 'as',
              type: 'ElementType',
              def: '"div"',
              desc: 'HTML element or React component to render',
            },
            { prop: 'p', type: 'CSS padding', def: '—', desc: 'padding (all sides)' },
            { prop: 'px / py', type: 'CSS', def: '—', desc: 'padding-inline / padding-block' },
            { prop: 'pt/pr/pb/pl', type: 'CSS', def: '—', desc: 'Individual padding sides' },
            { prop: 'm', type: 'CSS margin', def: '—', desc: 'margin (all sides)' },
            { prop: 'mx / my', type: 'CSS', def: '—', desc: 'margin-inline / margin-block' },
            { prop: 'mt/mr/mb/ml', type: 'CSS', def: '—', desc: 'Individual margin sides' },
            { prop: 'w / h', type: 'CSS', def: '—', desc: 'width / height' },
            { prop: 'minW/maxW', type: 'CSS', def: '—', desc: 'min-width / max-width' },
            { prop: 'minH/maxH', type: 'CSS', def: '—', desc: 'min-height / max-height' },
            { prop: 'display', type: 'CSS', def: '—', desc: 'display property' },
            {
              prop: 'pos',
              type: 'CSS',
              def: '—',
              desc: 'position (static/relative/absolute/fixed/sticky)',
            },
            {
              prop: 'top/right/bottom/left',
              type: 'CSS',
              def: '—',
              desc: 'Inset values (use with pos)',
            },
            { prop: 'z', type: 'CSS', def: '—', desc: 'z-index' },
            {
              prop: 'overflow / overflowX / overflowY',
              type: 'CSS',
              def: '—',
              desc: 'overflow properties',
            },
            { prop: 'direction', type: 'CSS', def: '—', desc: 'flex-direction' },
            { prop: 'align', type: 'CSS', def: '—', desc: 'align-items' },
            { prop: 'justify', type: 'CSS', def: '—', desc: 'justify-content' },
            { prop: 'wrap', type: 'CSS', def: '—', desc: 'flex-wrap' },
            { prop: 'gap / columnGap / rowGap', type: 'CSS', def: '—', desc: 'Grid/flex gaps' },
            {
              prop: 'flex / grow / shrink / alignSelf',
              type: 'CSS',
              def: '—',
              desc: 'Flex child props',
            },
            { prop: 'bg', type: 'CSS', def: '—', desc: 'background' },
            { prop: 'c', type: 'CSS', def: '—', desc: 'color' },
            { prop: 'opacity', type: 'CSS', def: '—', desc: 'opacity' },
            { prop: 'border', type: 'CSS', def: '—', desc: 'border shorthand' },
            { prop: 'borderColor', type: 'CSS', def: '—', desc: 'border-color' },
            { prop: 'radius', type: 'CSS', def: '—', desc: 'border-radius' },
            { prop: 'fz', type: 'CSS', def: '—', desc: 'font-size' },
            { prop: 'fw', type: 'CSS', def: '—', desc: 'font-weight' },
            { prop: 'ff', type: 'CSS', def: '—', desc: 'font-family' },
            { prop: 'lh', type: 'CSS', def: '—', desc: 'line-height' },
            { prop: 'ls', type: 'CSS', def: '—', desc: 'letter-spacing' },
            { prop: 'ta', type: 'CSS', def: '—', desc: 'text-align' },
            { prop: 'shadow', type: 'CSS', def: '—', desc: 'box-shadow' },
            { prop: 'cursor', type: 'CSS', def: '—', desc: 'cursor' },
            {
              prop: 'style',
              type: 'CSSProperties',
              def: '—',
              desc: 'Inline styles — merged after shorthand props',
            },
            { prop: 'className', type: 'string', def: '—', desc: 'Additional CSS class' },
            {
              prop: 'ref',
              type: 'Ref<Element>',
              def: '—',
              desc: 'Forwarded ref — type inferred from as prop',
            },
          ]}
        />
      </Section>
    </div>
  );
};
