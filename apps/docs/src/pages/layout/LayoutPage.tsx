import React from 'react';
import {
  Paper,
  Container,
  Flex,
  Group,
  Grid,
  GridCol,
  SimpleGrid,
  Button,
  Text,
  Box,
} from '@vyantra/ui';

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// Cell helper for grid demos
const Cell: React.FC<{ children: React.ReactNode; span?: number }> = ({ children, span }) => (
  <div
    style={{
      background: 'var(--color-primary-subtle)',
      border: '1px solid var(--color-primary-border)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--color-primary-text)',
      fontFamily: 'var(--font-mono)',
      gridColumn: span ? `span ${span}` : undefined,
    }}
  >
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  LAYOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export const LayoutPage: React.FC = () => (
  <div className="page-content">
    <div className="page-heading">
      <div className="page-heading-eyebrow">level 1 — layout</div>
      <h1>Layout</h1>
      <p>
        Composable layout primitives. All accept{' '}
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            background: 'var(--color-bg-muted)',
            padding: '1px 6px',
            borderRadius: 4,
          }}
        >
          as
        </code>{' '}
        for polymorphic rendering. Inline styles only — no CSS classes needed.
      </p>
      <div className="prop-badges">
        {['Paper', 'Container', 'Flex', 'Group', 'Grid', 'Grid.Col', 'SimpleGrid'].map((c) => (
          <span className="prop-badge" key={c}>
            {c}
          </span>
        ))}
      </div>
    </div>

    {/* ══ PAPER ══ */}
    <Section num={1} title="Paper" desc="surface container — background, shadow, radius, border">
      <div className="doc-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(['none', 'xs', 'sm', 'md', 'lg'] as const).map((s) => (
            <Paper key={s} shadow={s} style={{ minWidth: 110 }}>
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                shadow="{s}"
              </Text>
            </Paper>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((r) => (
            <Paper key={r} radius={r} style={{ minWidth: 80 }}>
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                radius="{r}"
              </Text>
            </Paper>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 12 }}>
          {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((p) => (
            <Paper key={p} p={p}>
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                p="{p}"
              </Text>
            </Paper>
          ))}
        </div>
        <Paper withBorder={false} shadow="md" style={{ marginTop: 12 }}>
          <Text size="sm" c="var(--color-text-secondary)">
            withBorder={'{false}'} — no border, shadow only
          </Text>
        </Paper>
      </div>

      <DocCode>{`
import { Paper } from '@vyantra/ui';

<Paper>Default — sm shadow, md radius, md padding, with border</Paper>

<Paper shadow="lg" radius="xl" p="lg">Large shadow, xl radius</Paper>

<Paper withBorder={false} shadow="md">No border, shadow only</Paper>

<Paper as="section" shadow="sm" radius="lg" p="xl">
  Renders as <section>
</Paper>
      `}</DocCode>

      <PropsTable
        rows={[
          {
            prop: 'shadow',
            type: '"none"|"xs"|"sm"|"md"|"lg"',
            def: '"sm"',
            desc: 'Box shadow level',
          },
          { prop: 'radius', type: '"none"|"xs"→"2xl"', def: '"md"', desc: 'Border radius' },
          { prop: 'p', type: '"none"|"xs"|"sm"|"md"|"lg"|"xl"', def: '"md"', desc: 'Padding' },
          { prop: 'withBorder', type: 'boolean', def: 'true', desc: 'Show 1px border' },
          { prop: 'as', type: 'ElementType', def: '"div"', desc: 'Polymorphic element' },
        ]}
      />
    </Section>

    <div className="section-divider" />

    {/* ══ CONTAINER ══ */}
    <Section num={2} title="Container" desc="centered max-width wrapper">
      <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
          <div
            key={s}
            style={{
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            <Container
              size={s}
              style={{ background: 'var(--color-primary-subtle)', padding: '8px 0' }}
            >
              <Text
                size="xs"
                c="var(--color-primary-text)"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                size="{s}" —{' '}
                {s === 'xs'
                  ? '480'
                  : s === 'sm'
                    ? '640'
                    : s === 'md'
                      ? '768'
                      : s === 'lg'
                        ? '1024'
                        : s === 'xl'
                          ? '1280'
                          : '1536'}
                px max
              </Text>
            </Container>
          </div>
        ))}
      </div>

      <DocCode>{`
import { Container } from '@vyantra/ui';

// Default — lg (1024px max, centered, with horizontal padding)
<Container>
  <YourContent />
</Container>

// Narrow — good for article/blog content
<Container size="sm">
  <Article />
</Container>

// Full width (no max-width constraint)
<Container size="full">
  <WideLayout />
</Container>

// Custom horizontal padding
<Container size="lg" px="var(--vyantra-spacing-8)">
  <Content />
</Container>
      `}</DocCode>

      <PropsTable
        rows={[
          {
            prop: 'size',
            type: 'ContainerSize',
            def: '"lg"',
            desc: 'Max-width: xs=480 sm=640 md=768 lg=1024 xl=1280 2xl=1536 full=100%',
          },
          {
            prop: 'px',
            type: 'string',
            def: '--vyantra-spacing-4',
            desc: 'Horizontal padding override',
          },
          { prop: 'centered', type: 'boolean', def: 'true', desc: 'Center with margin:auto' },
          { prop: 'as', type: 'ElementType', def: '"div"', desc: 'Polymorphic element' },
        ]}
      />
    </Section>

    <div className="section-divider" />

    {/* ══ FLEX ══ */}
    <Section num={3} title="Flex" desc="flexbox container with all layout props">
      <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            direction="row" align="center" justify="space-between"
          </Text>
          <Flex
            align="center"
            justify="space-between"
            style={{
              padding: '12px 16px',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Text size="sm" weight="semibold">
              Title
            </Text>
            <Group gap="var(--vyantra-spacing-2, 8px)">
              <Button size="xs" appearance="ghost">
                Cancel
              </Button>
              <Button size="xs" appearance="solid">
                Save
              </Button>
            </Group>
          </Flex>
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            direction="column" gap="var(--vyantra-spacing-2)"
          </Text>
          <Flex
            direction="column"
            gap="var(--vyantra-spacing-2, 8px)"
            style={{
              padding: '12px',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              width: 240,
            }}
          >
            {['First item', 'Second item', 'Third item'].map((t) => (
              <div
                key={t}
                style={{
                  padding: '8px 12px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  color: 'var(--color-text-primary)',
                }}
              >
                {t}
              </div>
            ))}
          </Flex>
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            wrap with gap
          </Text>
          <Flex wrap="wrap" gap="var(--vyantra-spacing-2, 8px)">
            {[
              'React',
              'TypeScript',
              'Vite',
              'CSS Variables',
              'Design Tokens',
              'ThemeProvider',
              'Components',
              'Accessible',
            ].map((t) => (
              <div
                key={t}
                style={{
                  padding: '4px 10px',
                  background: 'var(--color-primary-subtle)',
                  border: '1px solid var(--color-primary-border)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12,
                  color: 'var(--color-primary-text)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t}
              </div>
            ))}
          </Flex>
        </div>
      </div>

      <DocCode>{`
import { Flex } from '@vyantra/ui';

// Row with space-between
<Flex align="center" justify="space-between">
  <Title order={3}>Heading</Title>
  <Button>Action</Button>
</Flex>

// Column layout
<Flex direction="column" gap="var(--vyantra-spacing-3)">
  <Input label="First name" />
  <Input label="Last name" />
  <Button width="full">Submit</Button>
</Flex>

// Wrapping tags
<Flex wrap gap="var(--vyantra-spacing-2)">
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Flex>

// Inline flex
<Flex inline align="center" gap="var(--vyantra-spacing-1)">
  <Icon /> Label
</Flex>
      `}</DocCode>

      <PropsTable
        rows={[
          { prop: 'direction', type: 'CSSProperties', def: '"row"', desc: 'flex-direction' },
          { prop: 'align', type: 'CSSProperties', def: '"stretch"', desc: 'align-items' },
          { prop: 'justify', type: 'CSSProperties', def: '"flex-start"', desc: 'justify-content' },
          { prop: 'wrap', type: 'CSSProperties', def: '"nowrap"', desc: 'flex-wrap' },
          { prop: 'gap', type: 'CSSProperties', def: '—', desc: 'gap between items' },
          {
            prop: 'inline',
            type: 'boolean',
            def: 'false',
            desc: 'Use inline-flex instead of flex',
          },
          { prop: 'as', type: 'ElementType', def: '"div"', desc: 'Polymorphic element' },
        ]}
      />
    </Section>

    <div className="section-divider" />

    {/* ══ GROUP ══ */}
    <Section num={4} title="Group" desc="horizontal row — the most common layout pattern">
      <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            default — align center, gap 8px
          </Text>
          <Group>
            <Button appearance="solid">Primary</Button>
            <Button appearance="outline">Secondary</Button>
            <Button appearance="ghost">Cancel</Button>
          </Group>
        </div>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            justify="space-between"
          </Text>
          <Group
            justify="space-between"
            style={{
              padding: '10px 16px',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Text size="sm" weight="semibold">
              Section title
            </Text>
            <Group gap="var(--vyantra-spacing-1, 4px)">
              <Button size="xs" appearance="ghost">
                Edit
              </Button>
              <Button size="xs" appearance="ghost" intent="danger">
                Delete
              </Button>
            </Group>
          </Group>
        </div>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            wrap + custom gap
          </Text>
          <Group wrap gap="var(--vyantra-spacing-2, 8px)">
            {['Home', 'About', 'Docs', 'Blog', 'Pricing', 'Contact', 'Careers', 'Status'].map(
              (item) => (
                <Button key={item} size="xs" appearance="soft">
                  {item}
                </Button>
              ),
            )}
          </Group>
        </div>
      </div>

      <DocCode>{`
import { Group } from '@vyantra/ui';

// Button row (most common use)
<Group>
  <Button>Save</Button>
  <Button appearance="outline">Cancel</Button>
</Group>

// Space between
<Group justify="space-between">
  <Title order={4}>Heading</Title>
  <Button size="sm">Action</Button>
</Group>

// Wrapping
<Group wrap gap="var(--vyantra-spacing-2)">
  {items.map(item => <Tag key={item}>{item}</Tag>)}
</Group>
      `}</DocCode>

      <PropsTable
        rows={[
          {
            prop: 'gap',
            type: 'CSSProperties',
            def: '"var(--vyantra-spacing-2)"',
            desc: 'Gap between items',
          },
          { prop: 'align', type: 'CSSProperties', def: '"center"', desc: 'align-items' },
          { prop: 'justify', type: 'CSSProperties', def: '"flex-start"', desc: 'justify-content' },
          { prop: 'wrap', type: 'boolean', def: 'false', desc: 'Allow items to wrap' },
          { prop: 'grow', type: 'boolean', def: 'false', desc: 'Flex-grow the Group itself' },
          { prop: 'as', type: 'ElementType', def: '"div"', desc: 'Polymorphic element' },
        ]}
      />
    </Section>

    <div className="section-divider" />

    {/* ══ GRID ══ */}
    <Section num={5} title="Grid + Grid.Col" desc="CSS Grid with column spans and offsets">
      <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            12-column grid
          </Text>
          <Grid columns={12} gap="var(--vyantra-spacing-2, 8px)">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <Cell key={n}>{n}</Cell>
            ))}
          </Grid>
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            spans: 8+4, 4+4+4, 6+6
          </Text>
          <Grid columns={12} gap="var(--vyantra-spacing-2, 8px)">
            <GridCol span={8}>
              <Cell>span 8</Cell>
            </GridCol>
            <GridCol span={4}>
              <Cell>span 4</Cell>
            </GridCol>
            <GridCol span={4}>
              <Cell>span 4</Cell>
            </GridCol>
            <GridCol span={4}>
              <Cell>span 4</Cell>
            </GridCol>
            <GridCol span={4}>
              <Cell>span 4</Cell>
            </GridCol>
            <GridCol span={6}>
              <Cell>span 6</Cell>
            </GridCol>
            <GridCol span={6}>
              <Cell>span 6</Cell>
            </GridCol>
          </Grid>
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            span="full" + offset
          </Text>
          <Grid columns={12} gap="var(--vyantra-spacing-2, 8px)">
            <GridCol span="full">
              <Cell>span="full" (1/-1)</Cell>
            </GridCol>
            <GridCol span={4} offset={3}>
              <Cell>span 4, offset 3</Cell>
            </GridCol>
            <GridCol span={4}>
              <Cell>span 4</Cell>
            </GridCol>
          </Grid>
        </div>
      </div>

      <DocCode>{`
import { Grid, GridCol } from '@vyantra/ui';

// Basic 12-column grid
<Grid columns={12} gap="var(--vyantra-spacing-4)">
  <GridCol span={8}>Main content</GridCol>
  <GridCol span={4}>Sidebar</GridCol>
</Grid>

// Full-width header
<Grid columns={12} gap="var(--vyantra-spacing-4)">
  <GridCol span="full">Header</GridCol>
  <GridCol span={3}>Nav</GridCol>
  <GridCol span={9}>Content</GridCol>
</Grid>

// Custom column template
<Grid columns="200px 1fr 200px" gap="var(--vyantra-spacing-4)">
  <div>Fixed left</div>
  <div>Fluid center</div>
  <div>Fixed right</div>
</Grid>

// Offset
<Grid columns={12}>
  <GridCol span={6} offset={4}>Centered-ish</GridCol>
</Grid>
      `}</DocCode>

      <PropsTable
        rows={[
          {
            prop: 'columns',
            type: 'number | string',
            def: '12',
            desc: 'Number → repeat(N,1fr). String → used as-is for grid-template-columns',
          },
          {
            prop: 'rows',
            type: 'number | string',
            def: '—',
            desc: 'Number → repeat(N,1fr). String → grid-template-rows',
          },
          {
            prop: 'gap',
            type: 'CSSProperties',
            def: '"var(--vyantra-spacing-4)"',
            desc: 'Gap between cells',
          },
          { prop: 'align', type: 'CSSProperties', def: '—', desc: 'align-items' },
          { prop: 'justify', type: 'CSSProperties', def: '—', desc: 'justify-items' },
          { prop: 'inline', type: 'boolean', def: 'false', desc: 'inline-grid instead of grid' },
        ]}
      />
      <PropsTable
        rows={[
          {
            prop: 'span',
            type: 'number|"auto"|"full"',
            def: '1',
            desc: 'Column span. "full" = 1/-1 (entire row)',
          },
          {
            prop: 'offset',
            type: 'number',
            def: '—',
            desc: 'gridColumnStart — column to start at',
          },
          { prop: 'rowSpan', type: 'number', def: '—', desc: 'Row span' },
        ]}
      />
    </Section>

    <div className="section-divider" />

    {/* ══ SIMPLE GRID ══ */}
    <Section num={6} title="SimpleGrid" desc="equal-width columns — simpler than Grid">
      <div className="doc-card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            cols=2 / 3 / 4
          </Text>
          {[2, 3, 4].map((cols) => (
            <div key={cols} style={{ marginBottom: 8 }}>
              <Text
                size="xs"
                c="var(--color-text-tertiary)"
                style={{ fontFamily: 'var(--font-mono)', marginBottom: 4 }}
              >
                cols={cols}
              </Text>
              <SimpleGrid cols={cols} spacing="var(--vyantra-spacing-2, 8px)">
                {Array.from({ length: cols }).map((_, i) => (
                  <Cell key={i}>col {i + 1}</Cell>
                ))}
              </SimpleGrid>
            </div>
          ))}
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            minChildWidth="160px" — auto-fill
          </Text>
          <SimpleGrid minChildWidth="160px" spacing="var(--vyantra-spacing-2, 8px)">
            {['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Badge', 'Tag'].map(
              (c) => (
                <Cell key={c}>{c}</Cell>
              ),
            )}
          </SimpleGrid>
        </div>

        <div>
          <Text
            size="xs"
            c="var(--color-text-tertiary)"
            style={{ fontFamily: 'var(--font-mono)', marginBottom: 6 }}
          >
            card layout
          </Text>
          <SimpleGrid cols={3} spacing="var(--vyantra-spacing-3, 12px)">
            {[
              { title: 'Button', desc: '25+ variants, icons, loading' },
              { title: 'Text', desc: 'Full token scale typography' },
              { title: 'Grid', desc: '12-column CSS Grid layout' },
            ].map(({ title, desc }) => (
              <Paper key={title} shadow="xs" radius="lg" p="md">
                <Text size="sm" weight="semibold" c="var(--color-text-primary)">
                  {title}
                </Text>
                <Text size="xs" dimmed style={{ marginTop: 4 }}>
                  {desc}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </div>
      </div>

      <DocCode>{`
import { SimpleGrid } from '@vyantra/ui';

// Fixed columns
<SimpleGrid cols={3} spacing="var(--vyantra-spacing-4)">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</SimpleGrid>

// Auto-fill — fills as many columns as fit at 200px+ each
<SimpleGrid minChildWidth="200px" spacing="var(--vyantra-spacing-3)">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</SimpleGrid>

// Different row and column gap
<SimpleGrid cols={2}
  spacing="var(--vyantra-spacing-4)"
  verticalSpacing="var(--vyantra-spacing-8)">
  {items.map(item => <Card key={item.id} />)}
</SimpleGrid>
      `}</DocCode>

      <PropsTable
        rows={[
          { prop: 'cols', type: 'number', def: '1', desc: 'Number of equal-width columns' },
          {
            prop: 'spacing',
            type: 'string',
            def: '"var(--vyantra-spacing-4)"',
            desc: 'Gap between all cells (row + column)',
          },
          { prop: 'verticalSpacing', type: 'string', def: 'spacing', desc: 'Row gap override' },
          {
            prop: 'minChildWidth',
            type: 'string',
            def: '—',
            desc: 'Auto-fill columns — each at least this wide (ignores cols)',
          },
          { prop: 'as', type: 'ElementType', def: '"div"', desc: 'Polymorphic element' },
        ]}
      />
    </Section>
  </div>
);
