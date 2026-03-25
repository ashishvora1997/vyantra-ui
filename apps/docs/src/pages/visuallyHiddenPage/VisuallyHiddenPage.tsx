import React, { useState } from 'react';
import { VisuallyHidden } from '@vyantra/ui';
import { Button } from '@vyantra/ui';
import { Code, M, Callout, Section, PropsTable, Preview, PageHeading } from '../../helper';

// ─── Icon helpers ────────────────────────────────────────────────────────────
const TrashIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const EditIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const StarIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

export const VisuallyHiddenPage: React.FC = () => {
  const [announcement, setAnnouncement] = useState('');
  const [loading, setLoading] = useState(false);

  const simulateSave = () => {
    setLoading(true);
    setAnnouncement('Saving...');
    setTimeout(() => {
      setLoading(false);
      setAnnouncement('Changes saved successfully');
      setTimeout(() => setAnnouncement(''), 4000);
    }, 1500);
  };

  return (
    <div className="page-content">
      <PageHeading
        title="VisuallyHidden"
        desc="Hides content visually while keeping it fully accessible to screen readers and other assistive technology."
        badges={['accessibility', 'as', 'focusable', 'aria-live']}
        source="VisuallyHidden/"
      />

      {/* ── 1. THE PROBLEM ── */}
      <Section num={1} title="Why it exists" desc="display:none isn't the answer">
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--color-text-secondary)',
            marginBottom: 12,
            lineHeight: 1.7,
          }}
        >
          When you need a label that sighted users don't need to see — like an icon button's action
          label — you might reach for <M>display:none</M> or <M>visibility:hidden</M>. Don't. Both
          of those remove the element from the accessibility tree entirely, making it invisible to
          screen readers too.
        </p>
        <Preview label="the difference">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 120,
                  fontSize: 12,
                  color: 'var(--color-text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                display:none
              </div>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-danger-border)',
                  background: 'var(--color-danger-subtle)',
                  cursor: 'pointer',
                }}
              >
                <TrashIcon />
                <span style={{ display: 'none' }}>Delete item</span>
              </button>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-danger-text)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ← screen reader reads: "button" (no label)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 120,
                  fontSize: 12,
                  color: 'var(--color-text-tertiary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                VisuallyHidden
              </div>
              <button
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-danger-border)',
                  background: 'var(--color-danger-subtle)',
                  cursor: 'pointer',
                }}
              >
                <TrashIcon />
                <VisuallyHidden>Delete item</VisuallyHidden>
              </button>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-success-text)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ← screen reader reads: "Delete item, button" ✓
              </span>
            </div>
          </div>
        </Preview>
        <Callout type="tip">
          <strong>Rule of thumb:</strong> If a button or control has no visible text label, it{' '}
          <em>must</em> have either <M>aria-label</M>, <M>aria-labelledby</M>, or a{' '}
          <M>VisuallyHidden</M> child. WCAG 2.1 success criterion 4.1.2 requires all UI components
          to have accessible names.
        </Callout>
      </Section>

      {/* ── 2. ICON BUTTONS ── */}
      <Section num={2} title="Icon buttons" desc="the most common use case">
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
          Every icon-only button needs an accessible name. <M>VisuallyHidden</M> is the right tool
          when you want the label in the DOM (better than <M>aria-label</M> for i18n and testing).
        </p>
        <Preview label="toolbar with icon buttons">
          <div
            style={{
              display: 'flex',
              gap: 4,
              padding: '8px 12px',
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              width: 'fit-content',
            }}
          >
            {[
              { icon: <EditIcon />, label: 'Edit document', color: 'var(--color-primary)' },
              {
                icon: <StarIcon />,
                label: 'Add to favourites',
                color: 'var(--color-warning-text)',
              },
              { icon: <TrashIcon />, label: 'Delete document', color: 'var(--color-danger-text)' },
            ].map(({ icon, label, color }) => (
              <button
                key={label}
                type="button"
                title={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg-muted)';
                  (e.currentTarget as HTMLButtonElement).style.color = color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color =
                    'var(--color-text-secondary)';
                }}
              >
                {icon}
                <VisuallyHidden>{label}</VisuallyHidden>
              </button>
            ))}
          </div>
        </Preview>

        <Code>{`
import { VisuallyHidden } from '@vyantra/ui';

// Single icon button
<button type="button">
  <TrashIcon aria-hidden="true" />
  <VisuallyHidden>Delete item</VisuallyHidden>
</button>

// Toolbar
<div role="toolbar" aria-label="Document actions">
  <button type="button">
    <EditIcon aria-hidden="true" />
    <VisuallyHidden>Edit document</VisuallyHidden>
  </button>
  <button type="button">
    <StarIcon aria-hidden="true" />
    <VisuallyHidden>Add to favourites</VisuallyHidden>
  </button>
  <button type="button">
    <TrashIcon aria-hidden="true" />
    <VisuallyHidden>Delete document</VisuallyHidden>
  </button>
</div>
        `}</Code>
      </Section>

      {/* ── 3. SKIP LINK ── */}
      <Section num={3} title="Skip-to-content link" desc="focusable — visible on Tab">
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
          The <M>focusable</M> prop makes the element invisible until it receives focus. Skip links
          are a WCAG requirement — they let keyboard users jump past navigation directly to the main
          content.
        </p>
        <Preview label="press Tab to reveal the skip link below">
          <div
            style={{
              position: 'relative',
              padding: 16,
              background: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <VisuallyHidden
              as="a"
              href="#main-content"
              focusable
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                padding: '6px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-primary)',
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                zIndex: 100,
              }}
            >
              Skip to main content
            </VisuallyHidden>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
              Tab into this area to reveal the skip link above →
            </p>
          </div>
        </Preview>

        <Code>{`
// Typically placed as the very first element inside <body>
// It's invisible until focused via keyboard Tab

<VisuallyHidden
  as="a"
  href="#main-content"
  focusable
  style={{
    // Styles applied when focused (focusable=true removes the hide styles on focus)
    padding: '8px 16px',
    background: 'var(--vyantra-color-primary-base)',
    color: '#fff',
    borderRadius: 'var(--vyantra-radius-md)',
    textDecoration: 'none',
  }}
>
  Skip to main content
</VisuallyHidden>

// Target element
<main id="main-content" tabIndex={-1}>
  {/* page content */}
</main>
        `}</Code>
      </Section>

      {/* ── 4. LIVE REGIONS ── */}
      <Section num={4} title="Live regions" desc="announce dynamic changes to screen readers">
        <p style={{ fontSize: 13.5, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
          <M>aria-live</M> regions announce content changes to screen readers without moving focus.
          Wrap them in <M>VisuallyHidden</M> so sighted users don't see the status messages.
        </p>
        <Preview label="live save status announcement">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button size="sm" appearance="solid" loading={loading} onClick={simulateSave}>
              Save changes
            </Button>
            {/* Sighted users don't see this — screen readers announce it */}
            <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
              {announcement}
            </VisuallyHidden>
            {/* Visual feedback for sighted users (separate) */}
            {announcement && !loading && (
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-success-text)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ✓ {announcement}
              </span>
            )}
          </div>
        </Preview>

        <Code>{`
import { VisuallyHidden } from '@vyantra/ui';
import { useState } from 'react';

function SaveButton() {
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    setStatus('Saving...');
    await save();
    setStatus('Saved successfully');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>

      {/* polite — waits for user to finish before announcing */}
      <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
        {status}
      </VisuallyHidden>
    </>
  );
}

// assertive — interrupts immediately (use sparingly, e.g. errors)
<VisuallyHidden role="alert" aria-live="assertive">
  {errorMessage}
</VisuallyHidden>
        `}</Code>

        <Callout type="warning">
          Use <M>aria-live="assertive"</M> only for critical errors. It interrupts the user
          immediately. For status updates, progress, and success messages, always use{' '}
          <M>aria-live="polite"</M>.
        </Callout>
      </Section>

      {/* ── 5. FORM DESCRIPTIONS ── */}
      <Section num={5} title="Form descriptions" desc="hidden hints linked via aria-describedby">
        <Preview label="input with hidden description">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 320 }}>
            <label
              htmlFor="pw-input"
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}
            >
              Password
            </label>
            <input
              id="pw-input"
              type="password"
              placeholder="Enter password"
              aria-describedby="pw-hint"
              style={{
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
                background: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            />
            {/* Sighted users don't see this — screen reader reads it after the input label */}
            <VisuallyHidden id="pw-hint">
              Must be at least 8 characters and include one number and one special character
            </VisuallyHidden>
          </div>
        </Preview>

        <Code>{`
<label htmlFor="password">Password</label>
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
/>
<VisuallyHidden id="password-hint">
  Must be at least 8 characters and include a number
</VisuallyHidden>

// Screen reader announces:
// "Password, edit text. Must be at least 8 characters and include a number."
        `}</Code>
      </Section>

      <div className="section-divider" />

      {/* ── PROPS ── */}
      <Section num="■" title="Props">
        <PropsTable
          rows={[
            {
              prop: 'as',
              type: 'ElementType',
              def: '"span"',
              desc: 'HTML element to render. Use "a" for skip links, "div" for live regions.',
            },
            {
              prop: 'focusable',
              type: 'boolean',
              def: 'false',
              desc: 'When true, the element becomes visible on :focus and :focus-within.',
            },
            {
              prop: 'children',
              type: 'ReactNode',
              def: '—',
              desc: 'Content to hide visually but expose to screen readers.',
            },
            {
              prop: 'className',
              type: 'string',
              def: '—',
              desc: 'Additional CSS class names merged with the visually-hidden class.',
            },
            {
              prop: '...rest',
              type: 'HTMLAttributes<HTMLElement>',
              def: '—',
              desc: 'All native HTML attributes: role, aria-live, aria-atomic, id, tabIndex, etc.',
            },
          ]}
        />
      </Section>

      {/* ── CSS ── */}
      <Section num="◈" title="CSS classes">
        <Code>{`
/* Applied automatically — never reference these directly */

.vyantra-visually-hidden {
  position:    absolute;
  width:       1px;
  height:      1px;
  padding:     0;
  margin:      -1px;
  overflow:    hidden;
  clip:        rect(0, 0, 0, 0);
  white-space: nowrap;
  border:      0;
}

/* focusable=true — element becomes visible on focus */
.vyantra-visually-hidden--focusable:focus,
.vyantra-visually-hidden--focusable:focus-within {
  position:    static;
  width:       auto;
  height:      auto;
  overflow:    visible;
  clip:        auto;
  white-space: normal;
}
        `}</Code>
      </Section>
    </div>
  );
};
