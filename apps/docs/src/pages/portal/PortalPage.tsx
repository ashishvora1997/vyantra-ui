import React, { useRef, useState, useEffect } from 'react';
import { Portal } from '@vyantra/ui';
import { Button } from '@vyantra/ui';
import { Code, M, Callout, Section, PropsTable, Preview, PageHeading } from '../../helper';

// ─────────────────────────────────────────────────────────────────────────────

export const PortalPage: React.FC = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tooltipAnchor, setTooltipAnchor] = useState<DOMRect | null>(null);
  const customTargetRef = useRef<HTMLDivElement>(null);
  const tooltipBtnRef = useRef<HTMLButtonElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3000);
  };

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  return (
    <div className="page-content">
      <PageHeading
        title="Portal"
        desc="Renders children into a different DOM node — by default document.body. Escapes CSS overflow:hidden, z-index stacking contexts, and transform constraints. SSR-safe."
        badges={['children', 'target', 'enabled', 'createPortal', 'SSR-safe']}
        source="Portal/"
      />

      {/* ── 1. WHY PORTALS ── */}
      <Section num={1} title="Why you need it" desc="escaping stacking contexts">
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 12,
          }}
        >
          Overlays (modals, tooltips, dropdowns, toasts) need to render above everything else. But
          if they live inside a parent with <M>overflow:hidden</M> or a CSS <M>transform</M>,
          they'll be clipped or repositioned incorrectly. Portal renders the content as a direct
          child of <M>document.body</M>, completely outside any parent stacking context.
        </p>

        <Preview label="the stacking context problem">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Without portal — clipped */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-danger-text)',
                  marginBottom: 6,
                }}
              >
                ❌ without Portal — clipped
              </div>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: 80,
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-danger-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  parent: overflow:hidden
                </span>
                <div
                  style={{
                    position: 'absolute',
                    top: 60,
                    left: 20,
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 10px',
                    fontSize: 12,
                    color: 'var(--color-text-primary)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  Tooltip — clipped! 🚫
                </div>
              </div>
            </div>
            {/* With portal — correct */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-success-text)',
                  marginBottom: 6,
                }}
              >
                ✓ with Portal — escapes
              </div>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: 80,
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-success-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 12,
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                  parent: overflow:hidden
                </span>
                {/* The portal content renders in body, not here — just showing visually */}
              </div>
              <div
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  fontSize: 12,
                  color: 'var(--color-text-primary)',
                  width: 'fit-content',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  marginTop: 4,
                }}
              >
                Tooltip — in body ✓
              </div>
            </div>
          </div>
        </Preview>
      </Section>

      {/* ── 2. TOAST / NOTIFICATION ── */}
      <Section num={2} title="Toast notification" desc="fixed position, document.body">
        <Preview label="renders in body — scroll won't affect it">
          <div style={{ display: 'flex', gap: 10 }}>
            <Button size="sm" appearance="solid" onClick={showToast}>
              Show toast
            </Button>
            <Button size="sm" appearance="outline" onClick={() => setToastVisible(false)}>
              Dismiss
            </Button>
          </div>
          {/* Toast portal */}
          {toastVisible && (
            <Portal>
              <div
                style={{
                  position: 'fixed',
                  bottom: 24,
                  right: 24,
                  background: '#1e2030',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '12px 18px',
                  borderRadius: 10,
                  fontSize: 13.5,
                  fontFamily: 'var(--font-sans)',
                  zIndex: 9999,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  animation: 'fadeIn 150ms ease',
                  maxWidth: 360,
                }}
              >
                <span style={{ fontSize: 18 }}>✓</span>
                <span>Changes saved successfully</span>
                <button
                  onClick={() => setToastVisible(false)}
                  type="button"
                  style={{
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: 18,
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            </Portal>
          )}
        </Preview>

        <Code>{`
import { Portal } from '@vyantra/ui';
import { useState } from 'react';

function Toast({ visible, onClose, children }) {
  if (!visible) return null;
  return (
    <Portal>
      <div style={{
        position: 'fixed', bottom: 24, right: 24,
        zIndex: 9999,
        background: '#1e2030', color: '#e2e8f0',
        padding: '12px 18px', borderRadius: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {children}
        <button onClick={onClose}>×</button>
      </div>
    </Portal>
  );
}

// Usage
<Toast visible={toastVisible} onClose={() => setToastVisible(false)}>
  Changes saved successfully
</Toast>
        `}</Code>
      </Section>

      {/* ── 3. MODAL ── */}
      <Section num={3} title="Modal / Dialog" desc="backdrop + content in body">
        <Preview>
          <Button size="sm" appearance="outline" onClick={() => setModalVisible(true)}>
            Open modal
          </Button>

          {modalVisible && (
            <Portal>
              {/* Backdrop */}
              <div
                onClick={() => setModalVisible(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 9998,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Dialog */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                  style={{
                    background: 'var(--color-bg)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 12,
                    padding: '24px 28px',
                    width: 400,
                    maxWidth: '90vw',
                    boxShadow: '0 24px 48px rgba(0,0,0,0.3)',
                    zIndex: 9999,
                  }}
                >
                  <h2
                    id="modal-title"
                    style={{
                      margin: '0 0 8px',
                      fontSize: 18,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                    }}
                  >
                    Confirm action
                  </h2>
                  <p
                    style={{
                      margin: '0 0 20px',
                      fontSize: 14,
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-sans)',
                      lineHeight: 1.6,
                    }}
                  >
                    This dialog is rendered in{' '}
                    <code
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        background: 'var(--color-bg-muted)',
                        padding: '1px 5px',
                        borderRadius: 3,
                      }}
                    >
                      document.body
                    </code>{' '}
                    via Portal — completely outside the component tree.
                  </p>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Button size="sm" appearance="outline" onClick={() => setModalVisible(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" appearance="solid" onClick={() => setModalVisible(false)}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </Portal>
          )}
        </Preview>

        <Code>{`
function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <Portal>
      {/* Backdrop — click to close */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
      />

      {/* Dialog content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          background: 'var(--vyantra-surface-bg)',
          borderRadius: 'var(--vyantra-radius-xl)',
          padding: 'var(--vyantra-spacing-6)',
          minWidth: 400,
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="modal-title">Modal title</h2>
        {children}
      </div>
    </Portal>
  );
}
        `}</Code>
      </Section>

      {/* ── 4. TOOLTIP ── */}
      <Section num={4} title="Tooltip" desc="positioned relative to trigger, rendered in body">
        <Preview label="hover to see the tooltip">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Save', 'Delete', 'Share'].map((label) => (
              <div key={label} style={{ position: 'relative', display: 'inline-block' }}>
                <Button
                  size="sm"
                  appearance={label === 'Delete' ? 'outline' : 'ghost'}
                  intent={label === 'Delete' ? 'danger' : 'neutral'}
                  onMouseEnter={(e) => {
                    setTooltipAnchor(
                      (e.currentTarget as HTMLButtonElement).getBoundingClientRect(),
                    );
                  }}
                  onMouseLeave={() => setTooltipAnchor(null)}
                >
                  {label}
                </Button>
              </div>
            ))}
          </div>
          {tooltipAnchor && (
            <Portal>
              <div
                style={{
                  position: 'fixed',
                  top: tooltipAnchor.top - 36,
                  left: tooltipAnchor.left + tooltipAnchor.width / 2,
                  transform: 'translateX(-50%)',
                  background: '#1e2030',
                  color: '#e2e8f0',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: 'var(--font-sans)',
                  whiteSpace: 'nowrap',
                  zIndex: 9999,
                  pointerEvents: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                Keyboard shortcut: ⌘S
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 8,
                    height: 8,
                    background: '#1e2030',
                    rotate: '45deg',
                  }}
                />
              </div>
            </Portal>
          )}
        </Preview>

        <Code>{`
function Tooltip({ children, label }) {
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  return (
    <>
      <span
        onMouseEnter={e => setAnchor(e.currentTarget.getBoundingClientRect())}
        onMouseLeave={() => setAnchor(null)}
      >
        {children}
      </span>

      {anchor && (
        <Portal>
          <div style={{
            position: 'fixed',
            top: anchor.top - 36,
            left: anchor.left + anchor.width / 2,
            transform: 'translateX(-50%)',
            background: '#1e2030',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            zIndex: 9999,
            pointerEvents: 'none',
          }}>
            {label}
          </div>
        </Portal>
      )}
    </>
  );
}
        `}</Code>
      </Section>

      {/* ── 5. CUSTOM TARGET ── */}
      <Section num={5} title="Custom target" desc="render into any DOM node">
        <Preview label="portal into a specific container (not body)">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div
              ref={customTargetRef}
              style={{
                width: 240,
                minHeight: 60,
                border: '2px dashed var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '10px 14px',
                background: 'var(--color-bg-subtle)',
                fontSize: 12,
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              target container
              <Portal target={customTargetRef.current}>
                <div
                  style={{
                    marginTop: 8,
                    padding: '6px 10px',
                    background: 'var(--color-primary-subtle)',
                    border: '1px solid var(--color-primary-border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12,
                    color: 'var(--color-primary-text)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Portal content ✓
                </div>
              </Portal>
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: 'var(--color-text-secondary)',
                maxWidth: 200,
                lineHeight: 1.6,
              }}
            >
              Useful for nested portals — render dropdown menus inside a scroll container, or inject
              content into a third-party widget.
            </div>
          </div>
        </Preview>

        <Code>{`
const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} />

<Portal target={containerRef.current}>
  <DropdownMenu />
</Portal>
        `}</Code>
      </Section>

      {/* ── 6. SSR / ENABLED ── */}
      <Section
        num={6}
        title="SSR safety + enabled prop"
        desc="works with Next.js, Remix, and Vite SSR"
      >
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: 8,
          }}
        >
          Portal waits for the React tree to mount before calling <M>createPortal</M>. During SSR or
          before hydration it renders children inline, so the HTML is valid and React can hydrate
          without a mismatch warning.
        </p>

        <Code>{`
// SSR-safe by default — no configuration needed
<Portal>
  <Overlay />
</Portal>

// Conditionally disable — same as rendering children inline
<Portal enabled={isClientSide}>
  <HeavyModal />
</Portal>

// Next.js page — safe to use without guards
export default function Page() {
  return (
    <>
      <Content />
      <Portal>
        <FloatingButton />  {/* works on server render too */}
      </Portal>
    </>
  );
}
        `}</Code>

        <Callout type="tip">
          The <M>enabled</M> prop is useful for feature flags — you can disable the portal behaviour
          in tests or storybook environments where <M>document.body</M> may not behave as expected.
        </Callout>
      </Section>

      <div className="section-divider" />

      {/* ── PROPS ── */}
      <Section num="■" title="Props">
        <PropsTable
          rows={[
            {
              prop: 'children',
              type: 'ReactNode',
              def: '—',
              desc: 'Content to render outside the current DOM tree',
            },
            {
              prop: 'target',
              type: 'HTMLElement | null',
              def: 'document.body',
              desc: 'DOM node to portal into. null triggers fallback to document.body.',
            },
            {
              prop: 'enabled',
              type: 'boolean',
              def: 'true',
              desc: 'When false, renders children inline in-place (no portal). Useful for SSR guards and tests.',
            },
          ]}
        />
      </Section>
    </div>
  );
};
