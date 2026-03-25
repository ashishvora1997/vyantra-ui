import React, { useState } from 'react';
import { Divider } from '@vyantra/ui';
import { Button } from '@vyantra/ui';
import { Code, M, Callout, Section, PropsTable, Preview, PageHeading } from '../../helper';

// ─────────────────────────────────────────────────────────────────────────────

export const DividerPage: React.FC = () => {
  const [variant, setVariant] = useState<'solid' | 'dashed' | 'dotted'>('solid');
  const [size, setSize] = useState<number>(1);
  const [labelPos, setLabelPos] = useState<'left' | 'center' | 'right'>('center');

  return (
    <div className="page-content">
      <PageHeading
        title="Divider"
        desc="Separates content with a semantic horizontal or vertical line. Supports labels, dashed/dotted variants, custom colors and thickness."
        badges={['orientation', 'variant', 'size', 'color', 'label', 'labelPosition', 'labelGap']}
        source="Divider/"
      />

      {/* ── 1. BASIC ── */}
      <Section num={1} title="Basic" desc="solid · dashed · dotted">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['solid', 'dashed', 'dotted'] as const).map((v) => (
              <div key={v}>
                <Divider variant={v} />
                <div className="variant-label" style={{ marginTop: 6 }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </Preview>

        <Code>{`
import { Divider } from '@vyantra/ui';

<Divider />                      // solid (default)
<Divider variant="dashed" />
<Divider variant="dotted" />
        `}</Code>
      </Section>

      {/* ── 2. SIZE + COLOR ── */}
      <Section num={2} title="Size & color" desc="thickness and custom line color">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <Divider size={1} />
              <div className="variant-label" style={{ marginTop: 6 }}>
                size=1 (default)
              </div>
            </div>
            <div>
              <Divider size={2} />
              <div className="variant-label" style={{ marginTop: 6 }}>
                size=2
              </div>
            </div>
            <div>
              <Divider size={4} />
              <div className="variant-label" style={{ marginTop: 6 }}>
                size=4
              </div>
            </div>
            <div>
              <Divider size={2} color="var(--color-primary)" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                color=primary
              </div>
            </div>
            <div>
              <Divider size={2} color="var(--color-success-border)" variant="dashed" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                color=success-border dashed
              </div>
            </div>
            <div>
              <Divider size={2} color="var(--color-danger-border)" variant="dotted" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                color=danger-border dotted
              </div>
            </div>
          </div>
        </Preview>

        <Code>{`
// size — number becomes px, string used as-is
<Divider size={2} />
<Divider size="2px" />

// color — any CSS color or --vyantra-* token
<Divider color="var(--vyantra-color-primary-base)" />
<Divider color="var(--vyantra-color-danger-border)" />
<Divider color="#e2e8f0" />
<Divider color="rgba(0,0,0,0.08)" />

// combined
<Divider size={2} color="var(--vyantra-color-primary-base)" variant="dashed" />
        `}</Code>
      </Section>

      {/* ── 3. LABELS ── */}
      <Section num={3} title="Labels" desc="text, icons, or any ReactNode in the center">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Divider label="OR" />
            <Divider label="AND" variant="dashed" />
            <Divider label="Continue with" />
            <Divider
              label={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-tertiary)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  ◆ New section ◆
                </span>
              }
            />
            <Divider
              label={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Optional section
                </span>
              }
            />
          </div>
        </Preview>

        <Code>{`
// Simple text label
<Divider label="OR" />
<Divider label="AND" variant="dashed" />

// Custom styled label
<Divider label={
  <span style={{ fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
    ◆ New section ◆
  </span>
} />

// Icon + text
<Divider label={
  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <InfoIcon />
    Optional section
  </span>
} />
        `}</Code>
      </Section>

      {/* ── 4. LABEL POSITION ── */}
      <Section num={4} title="Label position" desc="left · center · right">
        <Preview>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <Divider label="Left label" labelPosition="left" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                labelPosition="left"
              </div>
            </div>
            <div>
              <Divider label="Center label" labelPosition="center" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                labelPosition="center" (default)
              </div>
            </div>
            <div>
              <Divider label="Right label" labelPosition="right" />
              <div className="variant-label" style={{ marginTop: 6 }}>
                labelPosition="right"
              </div>
            </div>
            <div>
              <Divider label="Steps" labelPosition="left" variant="dashed" />
            </div>
          </div>
        </Preview>

        {/* Interactive playground */}
        <div
          style={{
            marginTop: 16,
            padding: '16px',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-tertiary)',
              marginBottom: 12,
            }}
          >
            interactive
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {(['solid', 'dashed', 'dotted'] as const).map((v) => (
              <Button
                key={v}
                size="xs"
                appearance={variant === v ? 'solid' : 'outline'}
                onClick={() => setVariant(v)}
              >
                {v}
              </Button>
            ))}
            <div style={{ width: 1, background: 'var(--color-border)', margin: '0 4px' }} />
            {[1, 2, 3].map((s) => (
              <Button
                key={s}
                size="xs"
                appearance={size === s ? 'solid' : 'outline'}
                onClick={() => setSize(s)}
              >
                size={s}
              </Button>
            ))}
            <div style={{ width: 1, background: 'var(--color-border)', margin: '0 4px' }} />
            {(['left', 'center', 'right'] as const).map((p) => (
              <Button
                key={p}
                size="xs"
                appearance={labelPos === p ? 'solid' : 'outline'}
                onClick={() => setLabelPos(p)}
              >
                {p}
              </Button>
            ))}
          </div>
          <Divider variant={variant} size={size} label="Section label" labelPosition={labelPos} />
          <div
            style={{
              marginTop: 12,
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {`<Divider variant="${variant}" size={${size}} label="Section label" labelPosition="${labelPos}" />`}
          </div>
        </div>

        <Code>{`
<Divider label="New users" labelPosition="left" />
<Divider label="More options" labelPosition="right" variant="dashed" />
        `}</Code>
      </Section>

      {/* ── 5. VERTICAL ── */}
      <Section num={5} title="Vertical" desc="parent must have a defined height">
        <Preview label="navigation breadcrumb">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 28 }}>
            {['Home', 'Products', 'Accessories', 'Cables'].map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <Divider orientation="vertical" />}
                <span
                  style={{
                    fontSize: 13,
                    color: i === 3 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: i === 3 ? 500 : 400,
                  }}
                >
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        </Preview>

        <Preview label="toolbar separator">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              padding: '4px 8px',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              height: 38,
            }}
          >
            {[
              { icon: 'B', title: 'Bold', fw: 700 },
              { icon: 'I', title: 'Italic', style: { fontStyle: 'italic' as const } },
              { icon: 'U', title: 'Underline', style: { textDecoration: 'underline' as const } },
            ].map((btn) => (
              <button
                key={btn.icon}
                title={btn.title}
                type="button"
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontFamily: 'serif',
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: btn.fw,
                  ...btn.style,
                }}
              >
                {btn.icon}
              </button>
            ))}
            <div
              style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 2px' }}
            />
            {[
              { icon: '≡', title: 'Align left' },
              { icon: '≡', title: 'Align center' },
              { icon: '≡', title: 'Align right' },
            ].map((btn) => (
              <button
                key={btn.title}
                title={btn.title}
                type="button"
                style={{
                  width: 28,
                  height: 28,
                  border: 'none',
                  background: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </Preview>

        <Preview label="vertical — dashed + custom color">
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 16, height: 40, padding: '0 8px' }}
          >
            <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>React 18</span>
            <Divider orientation="vertical" />
            <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>TypeScript</span>
            <Divider orientation="vertical" variant="dashed" />
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>MIT License</span>
            <Divider orientation="vertical" size={2} color="var(--color-primary)" />
            <span style={{ fontSize: 13, color: 'var(--color-primary-text)', fontWeight: 600 }}>
              v0.1.4
            </span>
          </div>
        </Preview>

        <Code>{`
// Parent MUST have a defined height for vertical to be visible
<div style={{ display: 'flex', alignItems: 'center', height: 32, gap: 12 }}>
  <span>Home</span>
  <Divider orientation="vertical" />
  <span>Docs</span>
  <Divider orientation="vertical" variant="dashed" />
  <span>Blog</span>
</div>

// Toolbar separator
<div style={{ display: 'flex', alignItems: 'center', height: 36 }}>
  <BoldButton />
  <ItalicButton />
  <Divider orientation="vertical" />
  <AlignLeftButton />
  <AlignCenterButton />
</div>
        `}</Code>

        <Callout type="warning">
          Vertical Divider does not support <M>label</M>. Labels are horizontal-only. The parent
          container must have a defined height — if height is <M>auto</M>, the divider will have
          zero height and be invisible.
        </Callout>
      </Section>

      {/* ── 6. FORM PATTERNS ── */}
      <Section num={6} title="Real-world patterns" desc="login, settings, auth forms">
        <Preview label="auth form — OR divider">
          <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                height: 38,
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
              }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <Divider label="OR" />
            <input
              placeholder="Email"
              type="email"
              style={{
                height: 38,
                padding: '0 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <input
              placeholder="Password"
              type="password"
              style={{
                height: 38,
                padding: '0 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                outline: 'none',
              }}
            />
            <Button appearance="solid" width="full">
              Sign in
            </Button>
          </div>
        </Preview>

        <Preview label="settings section headers">
          <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Divider label="Account" labelPosition="left" />
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', padding: '0 2px' }}>
              Name, email, password settings
            </div>
            <Divider label="Notifications" labelPosition="left" />
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', padding: '0 2px' }}>
              Email, push and SMS preferences
            </div>
            <Divider label="Danger zone" labelPosition="left" color="var(--color-danger-border)" />
            <div style={{ fontSize: 13, color: 'var(--color-danger-text)', padding: '0 2px' }}>
              Delete account and data
            </div>
          </div>
        </Preview>

        <Code>{`
// Auth form OR divider
<Button width="full">Continue with Google</Button>
<Divider label="OR" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Button width="full">Sign in</Button>

// Settings sections
<Divider label="Account" labelPosition="left" />
<SettingsGroup />
<Divider label="Notifications" labelPosition="left" />
<NotificationsGroup />
<Divider label="Danger zone" labelPosition="left" color="var(--vyantra-color-danger-border)" />
<DangerActions />
        `}</Code>
      </Section>

      <div className="section-divider" />

      {/* ── PROPS ── */}
      <Section num="■" title="Props">
        <PropsTable
          rows={[
            {
              prop: 'orientation',
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              desc: 'Line direction. Vertical requires parent to have defined height.',
            },
            {
              prop: 'variant',
              type: '"solid" | "dashed" | "dotted"',
              def: '"solid"',
              desc: 'CSS border-style of the line',
            },
            {
              prop: 'size',
              type: 'string | number',
              def: '"1px"',
              desc: 'Thickness. Number → px, string used as-is',
            },
            {
              prop: 'color',
              type: 'string',
              def: 'var(--vyantra-surface-border)',
              desc: 'Line color — any CSS color or token variable',
            },
            {
              prop: 'label',
              type: 'ReactNode',
              def: '—',
              desc: 'Text or any element in the middle of the line. Horizontal only.',
            },
            {
              prop: 'labelPosition',
              type: '"left" | "center" | "right"',
              def: '"center"',
              desc: 'Position of the label along the divider',
            },
            {
              prop: 'labelGap',
              type: 'string',
              def: 'var(--vyantra-spacing-3)',
              desc: 'Space between the label and each line segment',
            },
            { prop: 'className', type: 'string', def: '—', desc: 'Additional CSS class names' },
            {
              prop: '...rest',
              type: 'HTMLAttributes<HTMLDivElement>',
              def: '—',
              desc: 'Native div attributes — role="separator" is applied automatically',
            },
          ]}
        />
      </Section>

      {/* ── ACCESSIBILITY ── */}
      <Section num="◈" title="Accessibility">
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Divider renders as a <M>div</M> with <M>role="separator"</M> and the correct{' '}
          <M>aria-orientation</M> attribute set automatically. This communicates the structural
          separation to screen readers without additional configuration.
        </p>
        <Code>{`
// What Divider renders
<div role="separator" aria-orientation="horizontal" class="vyantra-divider">
  <span class="vyantra-divider__line" />
  <span class="vyantra-divider__label">OR</span>
  <span class="vyantra-divider__line" />
</div>

// Vertical
<div role="separator" aria-orientation="vertical" class="vyantra-divider vyantra-divider--vertical" />
        `}</Code>
      </Section>
    </div>
  );
};
