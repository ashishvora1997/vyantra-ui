import React, { useState } from 'react';
import { Button } from '@vyantra/ui';
import type { ButtonIntent, ButtonAppearance, ButtonSize, ButtonRadius } from '@vyantra/ui';
import type { Intent, Appearance, Size, Radius } from '../../components/ControlsBar';
import { Icon } from '../../components/Icon';

// ─── Local config type (maps to ControlsBar types) ───────────────────────────
interface Config {
  intent: Intent;
  appearance: Appearance;
  size: Size;
  radius: Radius;
  loading: boolean;
  disabled: boolean;
  startIcon: boolean;
  endIcon: boolean;
  elevated: boolean;
}

const DEFAULT: Config = {
  intent: 'primary',
  appearance: 'solid',
  size: 'md',
  radius: 'md',
  loading: false,
  disabled: false,
  startIcon: false,
  endIcon: false,
  elevated: false,
};

// ─── Code builder ─────────────────────────────────────────────────────────────
const buildCode = (cfg: Config): string => {
  const props = [];
  // const lines = [];
  if (cfg.intent !== 'primary') props.push(`  intent="${cfg.intent}"`);
  if (cfg.appearance !== 'solid') props.push(`  appearance="${cfg.appearance}"`);
  if (cfg.size !== 'md') props.push(`  size="${cfg.size}"`);
  if (cfg.radius !== 'md') props.push(`  radius="${cfg.radius}"`);
  if (cfg.loading) props.push('  loading');
  if (cfg.disabled) props.push('  disabled');
  if (cfg.elevated) props.push('  elevated');
  if (cfg.startIcon) props.push('  startIcon={<ArrowIcon />}');
  if (cfg.endIcon) props.push('  endIcon={<ExternalIcon />}');

  // if (props.length) {
  //   lines.push('<Button')
  //   lines.push(...props);
  //   lines.push('>');
  // } else {
  //   lines.push('<Button>');
  // }
  // lines.push('  Click me');
  // lines.push('</Button>');
  const lines = [
    ...(props.length ? ['<Button', ...props, '>'] : ['<Button>']),
    '  Click me',
    '</Button>',
  ];
  return lines.join('\n');
};

// ─── Constants ────────────────────────────────────────────────────────────────
const INTENTS: ButtonIntent[] = [
  'primary',
  'secondary',
  'neutral',
  'success',
  'warning',
  'danger',
  'info',
];
const APPEARANCES: ButtonAppearance[] = ['solid', 'outline', 'ghost', 'soft', 'link'];
const SIZES: ButtonSize[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const RADII: ButtonRadius[] = ['none', 'sm', 'md', 'lg', 'xl', 'full'];

// ─── Chip helpers ─────────────────────────────────────────────────────────────
const Chip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick,
}) => (
  <button className={`ctrl-chip ${active ? 'on' : ''}`} onClick={onClick} type="button">
    {label}
  </button>
);
const Toggle: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({
  label,
  active,
  onClick,
}) => (
  <button className={`ctrl-toggle-chip ${active ? 'on' : ''}`} onClick={onClick} type="button">
    <span className="ctrl-toggle-chip-dot" />
    {label}
  </button>
);

// ─── Props table ──────────────────────────────────────────────────────────────
const PROPS = [
  {
    prop: 'intent',
    type: '"primary"|"secondary"|"neutral"|"success"|"warning"|"danger"|"info"',
    def: '"primary"',
    desc: 'Color and semantic role of the button',
  },
  {
    prop: 'appearance',
    type: '"solid"|"outline"|"ghost"|"soft"|"link"',
    def: '"solid"',
    desc: 'Visual style variant',
  },
  {
    prop: 'size',
    type: '"2xs"|"xs"|"sm"|"md"|"lg"|"xl"|"2xl"',
    def: '"md"',
    desc: 'Height, padding and font size',
  },
  { prop: 'radius', type: '"none"|"sm"|"md"|"lg"|"xl"|"full"', def: '"md"', desc: 'Border radius' },
  { prop: 'loading', type: 'boolean', def: 'false', desc: 'Shows spinner, prevents interaction' },
  { prop: 'loadingText', type: 'string', def: '—', desc: 'Accessible label while loading' },
  { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Prevents all interaction' },
  { prop: 'elevated', type: 'boolean', def: 'false', desc: 'Adds drop shadow' },
  { prop: 'startIcon', type: 'ReactNode', def: '—', desc: 'Icon before the label' },
  { prop: 'endIcon', type: 'ReactNode', def: '—', desc: 'Icon after the label' },
  { prop: 'iconOnly', type: 'ReactNode', def: '—', desc: 'Square/circle icon-only button' },
  { prop: 'width', type: '"auto"|"full"|"fit"', def: '"auto"', desc: 'Width behaviour' },
  { prop: 'href', type: 'string', def: '—', desc: 'Renders as <a> anchor tag' },
  { prop: 'as', type: 'ElementType', def: '"button"', desc: 'Polymorphic root element' },
  { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Merges props onto single child' },
  { prop: 'aria-label', type: 'string', def: '—', desc: 'Required for iconOnly buttons' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  BUTTON PAGE
// ─────────────────────────────────────────────────────────────────────────────
export const ButtonPage: React.FC = () => {
  const [cfg, setCfg] = useState<Config>(DEFAULT);
  const patch = (p: Partial<Config>) => setCfg((prev) => ({ ...prev, ...p }));

  // const [bg, setBg] = useState<'dark'|'light'|'gradient'>('dark');

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const click = (id: string) => {
    setLoadingId(id);
    setTimeout(() => setLoadingId(null), 1800);
  };

  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(buildCode(cfg)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const propLines = [
    cfg.intent !== 'primary' ? `  intent="${cfg.intent}"` : null,
    cfg.appearance !== 'solid' ? `  appearance="${cfg.appearance}"` : null,
    cfg.size !== 'md' ? `  size="${cfg.size}"` : null,
    cfg.radius !== 'md' ? `  radius="${cfg.radius}"` : null,
    cfg.loading ? '  loading' : null,
    cfg.disabled ? '  disabled' : null,
    cfg.elevated ? '  elevated' : null,
    cfg.startIcon ? '  startIcon={<ArrowIcon />}' : null,
    cfg.endIcon ? '  endIcon={<ExternalIcon />}' : null,
  ].filter(Boolean) as string[];

  const codeLines = [
    ...(propLines.length ? ['<Button', ...propLines, '>'] : ['<Button>']),
    '  Click me',
    '</Button>',
  ];

  return (
    <div className="page-content">
      {/* HEADING */}
      <div className="page-heading">
        <div className="page-heading-eyebrow">components</div>
        <h1>
          Button <span className="badge-count">25 variants</span>
        </h1>
        <p>intent × appearance × size × radius — fully composable</p>
        <div className="prop-badges">
          {[
            'intent',
            'appearance',
            'size',
            'radius',
            'loading',
            'disabled',
            'startIcon',
            'endIcon',
            'iconOnly',
            'elevated',
            'href',
            'as',
          ].map((p) => (
            <span className="prop-badge" key={p}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ══ PLAYGROUND ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">★</div>
          <div className="section-title">Live Playground</div>
          <div className="section-desc">build your variant</div>
        </div>

        <div className="playground">
          {/* Preview */}
          <div className={`playground-preview`}>
            <Button
              intent={cfg.intent as ButtonIntent}
              appearance={cfg.appearance as ButtonAppearance}
              size={cfg.size as ButtonSize}
              radius={cfg.radius as ButtonRadius}
              loading={cfg.loading}
              disabled={cfg.disabled}
              elevated={cfg.elevated}
              startIcon={cfg.startIcon ? <Icon name="arrow" size={14} /> : undefined}
              endIcon={cfg.endIcon ? <Icon name="external" size={14} /> : undefined}
            >
              Click me
            </Button>
          </div>

          {/* Controls */}
          <div className="playground-controls">
            <div className="pg-group" style={{ minWidth: 240 }}>
              <div className="pg-label">Intent</div>
              <div className="pg-options">
                {INTENTS.map((i) => (
                  <Chip
                    key={i}
                    label={i}
                    active={cfg.intent === i}
                    onClick={() => patch({ intent: i as Intent })}
                  />
                ))}
              </div>
            </div>

            <div className="pg-group">
              <div className="pg-label">Style</div>
              <div className="pg-options">
                {APPEARANCES.map((a) => (
                  <Chip
                    key={a}
                    label={a}
                    active={cfg.appearance === a}
                    onClick={() => patch({ appearance: a as Appearance })}
                  />
                ))}
              </div>
            </div>

            <div className="pg-group">
              <div className="pg-label">Size</div>
              <div className="pg-options">
                {SIZES.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    active={cfg.size === s}
                    onClick={() => patch({ size: s as Size })}
                  />
                ))}
              </div>
            </div>

            <div className="pg-group">
              <div className="pg-label">Radius</div>
              <div className="pg-options">
                {RADII.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    active={cfg.radius === r}
                    onClick={() => patch({ radius: r as Radius })}
                  />
                ))}
              </div>
            </div>

            <div className="pg-group">
              <div className="pg-label">State</div>
              <div className="pg-options" style={{ flexDirection: 'column', gap: 5 }}>
                <Toggle
                  label="loading"
                  active={cfg.loading}
                  onClick={() => patch({ loading: !cfg.loading })}
                />
                <Toggle
                  label="disabled"
                  active={cfg.disabled}
                  onClick={() => patch({ disabled: !cfg.disabled })}
                />
                <Toggle
                  label="elevated"
                  active={cfg.elevated}
                  onClick={() => patch({ elevated: !cfg.elevated })}
                />
                <Toggle
                  label="startIcon"
                  active={cfg.startIcon}
                  onClick={() => patch({ startIcon: !cfg.startIcon })}
                />
                <Toggle
                  label="endIcon"
                  active={cfg.endIcon}
                  onClick={() => patch({ endIcon: !cfg.endIcon })}
                />
              </div>
            </div>

            {/* <div className="pg-group">
              <div className="pg-label">Preview BG</div>
              <div className="pg-options">
                {(['dark','light','gradient'] as const).map(b => (
                  <button key={b} className={`pg-btn ${bg===b?'active':''}`} onClick={() => setBg(b)}>{b}</button>
                ))}
              </div>
            </div> */}
          </div>

          {/* Code output */}
          <div className="playground-code">
            <div className="pg-code-box" style={{ position: 'relative' }}>
              <button
                onClick={copy}
                type="button"
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 5,
                  padding: '3px 10px',
                  fontSize: 11,
                  color: '#94a3b8',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 100ms',
                }}
              >
                {copied ? '✓ copied' : 'copy'}
              </button>
              {codeLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 1: INTENT × APPEARANCE ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">1</div>
          <div className="section-title">Intent × Appearance Matrix</div>
          <div className="section-desc">7 intents × 5 appearances</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="sub-label">primary</div>
          <div className="btn-grid">
            {(['solid', 'outline', 'ghost', 'soft'] as const).map((a) => {
              const id = `primary-${a}`;
              return (
                <div className="variant-item" key={a}>
                  <Button
                    intent="primary"
                    appearance={a}
                    loading={loadingId === id}
                    onClick={() => click(id)}
                  >
                    {loadingId === id ? 'Loading' : a}
                  </Button>
                  <div className="variant-label">{a}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="sub-label">secondary</div>
          <div className="btn-grid">
            {(['solid', 'outline', 'ghost', 'soft'] as const).map((a) => (
              <div className="variant-item" key={a}>
                <Button intent="secondary" appearance={a}>
                  {a}
                </Button>
                <div className="variant-label">{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div className="sub-label">success · danger · warning · info</div>
          <div className="btn-grid">
            {(
              [
                ['success', 'solid', 'Confirm'],
                ['success', 'outline', 'Confirm'],
                ['success', 'soft', 'Confirm'],
                ['danger', 'solid', 'Delete'],
                ['danger', 'outline', 'Delete'],
                ['danger', 'soft', 'Delete'],
                ['warning', 'solid', 'Caution'],
                ['warning', 'soft', 'Caution'],
                ['info', 'soft', 'Info'],
                ['info', 'outline', 'Info'],
              ] as const
            ).map(([int, app, label]) => (
              <div className="variant-item" key={`${int}-${app}`}>
                <Button intent={int} appearance={app}>
                  {label}
                </Button>
                <div className="variant-label">
                  {int}/{app}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sub-label">neutral</div>
          <div className="btn-grid">
            {(['solid', 'outline', 'ghost', 'soft'] as const).map((a) => (
              <div className="variant-item" key={a}>
                <Button intent="neutral" appearance={a}>
                  {a}
                </Button>
                <div className="variant-label">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 2: SPECIAL VARIANTS ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">2</div>
          <div className="section-title">Special Variants</div>
          <div className="section-desc">gradient · glass · link</div>
        </div>

        <div className="doc-card">
          <div className="btn-grid">
            <div className="variant-item">
              <Button intent="primary" appearance="solid" startIcon={<Icon name="zap" size={14} />}>
                Upgrade Now
              </Button>
              <div className="variant-label" style={{ color: '#94a3b8' }}>
                primary/solid
              </div>
            </div>
            <div className="variant-item">
              <Button
                intent="secondary"
                appearance="solid"
                startIcon={<Icon name="star" size={14} />}
              >
                Go Premium
              </Button>
              <div className="variant-label" style={{ color: '#94a3b8' }}>
                secondary/solid
              </div>
            </div>
            <div className="variant-item">
              <Button intent="neutral" appearance="ghost">
                Glass Effect
              </Button>
              <div className="variant-label" style={{ color: '#94a3b8' }}>
                neutral/ghost
              </div>
            </div>
            <div className="variant-item">
              <Button intent="info" appearance="outline">
                Learn More
              </Button>
              <div className="variant-label" style={{ color: '#94a3b8' }}>
                info/outline
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 3: SIZES ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">3</div>
          <div className="section-title">Sizes</div>
          <div className="section-desc">2xs · xs · sm · md · lg · xl · 2xl</div>
        </div>
        <div className="doc-card">
          <div className="btn-grid" style={{ alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div className="variant-item" key={s}>
                <Button
                  intent={cfg.intent as ButtonIntent}
                  appearance={cfg.appearance as ButtonAppearance}
                  size={s}
                  radius={cfg.radius as ButtonRadius}
                >
                  {s}
                </Button>
                <div className="variant-label">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4: RADIUS ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">4</div>
          <div className="section-title">Radius / Shape</div>
          <div className="section-desc">none · sm · md · lg · xl · full</div>
        </div>
        <div className="doc-card">
          <div className="btn-grid">
            {RADII.map((r) => (
              <div className="variant-item" key={r}>
                <Button
                  intent={cfg.intent as ButtonIntent}
                  appearance={cfg.appearance as ButtonAppearance}
                  size={cfg.size as ButtonSize}
                  radius={r}
                >
                  Button
                </Button>
                <div className="variant-label">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 5: ICONS ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">5</div>
          <div className="section-title">Icons</div>
          <div className="section-desc">startIcon · endIcon · iconOnly</div>
        </div>
        <div className="doc-card">
          <div className="btn-grid" style={{ marginBottom: 16 }}>
            <Button intent="primary" appearance="solid" startIcon={<Icon name="plus" size={14} />}>
              Add Item
            </Button>
            <Button
              intent="primary"
              appearance="outline"
              startIcon={<Icon name="download" size={14} />}
            >
              Download
            </Button>
            <Button intent="success" appearance="solid" startIcon={<Icon name="check" size={14} />}>
              Approve
            </Button>
            <Button
              intent="danger"
              appearance="outline"
              startIcon={<Icon name="trash" size={14} />}
            >
              Delete
            </Button>
            <Button intent="secondary" appearance="soft" startIcon={<Icon name="send" size={14} />}>
              Send Message
            </Button>
            <Button intent="neutral" appearance="outline" endIcon={<Icon name="arrow" size={14} />}>
              Continue
            </Button>
            <Button intent="primary" appearance="soft" endIcon={<Icon name="external" size={14} />}>
              Open Docs
            </Button>
          </div>
          <div className="sub-label">icon-only (square + pill)</div>
          <div className="btn-grid">
            {(
              [
                ['primary', 'settings'],
                ['danger', 'trash'],
                ['success', 'check'],
                ['neutral', 'menu'],
                ['warning', 'bell'],
                ['secondary', 'star'],
              ] as const
            ).map(([int, ico]) => (
              <div className="btn-grid" key={`${int}-${ico}`} style={{ gap: 6 }}>
                <Button
                  intent={int}
                  appearance="soft"
                  iconOnly={<Icon name={ico} size={14} />}
                  aria-label={ico}
                />
                <Button
                  intent={int}
                  appearance="soft"
                  radius="full"
                  iconOnly={<Icon name={ico} size={14} />}
                  aria-label={ico}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 6: STATES ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">6</div>
          <div className="section-title">States</div>
          <div className="section-desc">loading · disabled · elevated</div>
        </div>
        <div className="doc-card">
          <div className="btn-grid">
            <div className="variant-item">
              <Button intent="primary" appearance="solid" loading>
                Saving
              </Button>{' '}
              <div className="variant-label">loading</div>
            </div>
            <div className="variant-item">
              <Button intent="success" appearance="solid" loading>
                Uploading
              </Button>{' '}
              <div className="variant-label">loading</div>
            </div>
            <div className="variant-item">
              <Button intent="primary" appearance="solid" disabled>
                Disabled
              </Button>{' '}
              <div className="variant-label">disabled</div>
            </div>
            <div className="variant-item">
              <Button intent="danger" appearance="outline" disabled>
                Disabled
              </Button>{' '}
              <div className="variant-label">disabled</div>
            </div>
            <div className="variant-item">
              <Button intent="primary" appearance="soft" elevated>
                Elevated
              </Button>{' '}
              <div className="variant-label">elevated</div>
            </div>
            <div className="variant-item">
              <Button intent="secondary" appearance="solid" loading>
                Processing
              </Button>{' '}
              <div className="variant-label">loading</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 7: FULL WIDTH ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">7</div>
          <div className="section-title">Full Width</div>
          <div className="section-desc">auth + CTA patterns</div>
        </div>
        <div className="doc-card btn-grid-col" style={{ maxWidth: 400 }}>
          <Button
            intent="primary"
            appearance="solid"
            radius="full"
            width="full"
            startIcon={<Icon name="zap" size={15} />}
          >
            Get Started Free
          </Button>
          <Button
            intent="neutral"
            appearance="outline"
            radius="full"
            width="full"
            startIcon={<Icon name="github" size={15} />}
          >
            Continue with GitHub
          </Button>
          <Button intent="secondary" appearance="solid" radius="full" width="full">
            Upgrade to Pro →
          </Button>
        </div>
      </div>

      <div className="section-divider" />

      {/* ══ PROPS TABLE ══ */}
      <div className="section">
        <div className="section-header">
          <div className="section-num">■</div>
          <div className="section-title">Props</div>
        </div>
        <div className="props-wrap">
          <table className="props-table">
            <thead>
              <tr>
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROPS.map(({ prop, type, def, desc }) => (
                <tr key={prop}>
                  <td className="td-prop">{prop}</td>
                  <td className="td-type">{type}</td>
                  <td className="td-def">{def}</td>
                  <td className="td-desc">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
