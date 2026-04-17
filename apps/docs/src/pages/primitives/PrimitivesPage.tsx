import React from 'react';
import { Box, Divider, Text } from '@vyantra/ui';
import { pageHref } from '../../router';

const COMPONENTS = [
  {
    id: 'visually-hidden',
    name: 'VisuallyHidden',
    badge: 'A11y',
    badgeColor: 'success',
    desc: 'Hides content visually while keeping it accessible to screen readers.',
    benefit: 'Required for icon buttons, skip links, live regions, and form descriptions.',
    preview: (
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <button type="button" style={{ display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:'var(--radius-md)',border:'1px solid var(--color-border)',background:'var(--color-bg-subtle)',cursor:'pointer' }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
        </button>
        <Text size="xs" dimmed style={{ fontFamily:'var(--font-mono)' }}>icon button with hidden label</Text>
      </div>
    ),
  },
  {
    id: 'box',
    name: 'Box',
    badge: 'Layout',
    badgeColor: 'primary',
    desc: 'Renders any HTML element with shorthand CSS props — p, m, w, h, display, flex, bg, c, radius, shadow.',
    benefit: 'Base primitive every other component is built on. No CSS classes — pure inline styles.',
    preview: (
      <Box display="flex" align="center" gap="var(--vyantra-spacing-2, 8px)">
        <Box w={32} h={32} radius="50%" bg="var(--color-primary-subtle)" border="1px solid var(--color-primary-border)" display="flex" align="center" justify="center" c="var(--color-primary-text)" fz="12px" fw={700}>AV</Box>
        <Box><Box fw={600} fz="13px" c="var(--color-text-primary)">Ashish Vora</Box><Box fz="11px" c="var(--color-text-tertiary)">ashish@vyantra.dev</Box></Box>
      </Box>
    ),
  },
  {
    id: 'portal',
    name: 'Portal',
    badge: 'Overlay',
    badgeColor: 'warning',
    desc: 'Renders children outside the current DOM tree — directly into document.body by default.',
    benefit: 'Escapes overflow:hidden and z-index stacking contexts. SSR-safe. Used by Tooltip, Modal, Toast.',
    preview: (
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <Text size="xs" dimmed style={{ fontFamily:'var(--font-mono)' }}>Overlay renders in &lt;body&gt;</Text>
        <div style={{ position:'relative', overflow:'hidden', height:40, background:'var(--color-bg-subtle)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-md)', display:'flex', alignItems:'center', padding:'0 12px' }}>
          <Text size="xs" dimmed>parent: overflow:hidden</Text>
        </div>
      </div>
    ),
  },
  {
    id: 'divider',
    name: 'Divider',
    badge: 'Layout',
    badgeColor: 'primary',
    desc: 'Semantic horizontal or vertical separator with label, variant (solid/dashed/dotted), and custom color.',
    benefit: 'role="separator" + aria-orientation set automatically. Used for OR dividers, section breaks, toolbars.',
    preview: (
      <div style={{ display:'flex', flexDirection:'column', gap:8, width:'100%' }}>
        <Divider />
        <Divider variant="dashed" />
        <Divider label="OR" />
      </div>
    ),
  },
];

const BADGE_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  primary: { bg:'var(--color-primary-subtle)',border:'var(--color-primary-border)',color:'var(--color-primary-text)' },
  success: { bg:'var(--color-success-subtle)',border:'var(--color-success-border)',color:'var(--color-success-text)' },
  warning: { bg:'var(--color-warning-subtle)',border:'var(--color-warning-border)',color:'var(--color-warning-text)' },
};

export const PrimitivesPage: React.FC = () => (
  <div className="page-content">
    <div className="page-heading">
      <div className="page-heading-eyebrow">level 0 — primitives</div>
      <h1>Primitives</h1>
      <p>
        Zero-dependency building blocks. No tokens required, no ThemeProvider needed.
        Every higher-level Vyantra component is built on these four primitives.
      </p>
      <div className="prop-badges">
        {COMPONENTS.map(c => (
          <a key={c.id} href={pageHref(c.id)} style={{ textDecoration:'none' }}>
            <span className="prop-badge" style={{ cursor:'pointer' }}>{c.name}</span>
          </a>
        ))}
      </div>
    </div>

    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(440px, 1fr))', gap:16 }}>
      {COMPONENTS.map(c => {
        const bc = BADGE_COLORS[c.badgeColor] ?? BADGE_COLORS.primary!;
        return (
          <a key={c.id} href={pageHref(c.id)} style={{ textDecoration:'none' }}
            onClick={e => { e.preventDefault(); window.location.hash = '/' + c.id; }}>
            <div className="doc-card" style={{ cursor:'pointer', transition:'border-color 150ms', height:'100%' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary-border)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'; }}>
              <div style={{ marginBottom:14, minHeight:60, display:'flex', alignItems:'center', width:'100%' }}>{c.preview}</div>
              <div className="section-divider" style={{ margin:'12px 0' }} />
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--color-text-primary)' }}>{c.name}</span>
                <span style={{ fontSize:10, fontFamily:'var(--font-mono)', background:bc.bg, border:`1px solid ${bc.border}`, color:bc.color, padding:'1px 6px', borderRadius:'var(--radius-full)' }}>{c.badge}</span>
                <span style={{ fontSize:10, fontFamily:'var(--font-mono)', color:'var(--color-primary-text)', background:'var(--color-primary-subtle)', border:'1px solid var(--color-primary-border)', padding:'1px 6px', borderRadius:'var(--radius-full)', marginLeft:'auto' }}>docs →</span>
              </div>
              <p style={{ fontSize:12.5, color:'var(--color-text-tertiary)', lineHeight:1.5, marginBottom:6 }}>{c.desc}</p>
              <p style={{ fontSize:12, color:'var(--color-success-text)', lineHeight:1.5 }}>✦ {c.benefit}</p>
            </div>
          </a>
        );
      })}
    </div>

    <div className="section" style={{ marginTop:48 }}>
      <div className="section-header">
        <div className="section-num">◆</div>
        <div className="section-title">Quick import</div>
      </div>
      <div className="pg-code-box" style={{ fontSize:13, lineHeight:1.75 }}>
        {`import {
  VisuallyHidden, // hides from visual display, keeps in accessibility tree
  Box,            // base layout primitive — any element, shorthand style props
  Portal,         // render outside DOM tree, escape overflow:hidden
  Divider,        // separator line — horizontal or vertical, with optional label
} from '@vyantra/ui';`.split('\n').map((line, i) => <div key={i}>{line || '\u00A0'}</div>)}
      </div>
    </div>
  </div>
);