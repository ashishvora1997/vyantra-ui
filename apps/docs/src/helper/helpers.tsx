// =============================================================================
//  Shared helpers for all primitive doc pages
// =============================================================================

import React from 'react';

// ─── Inline code block ────────────────────────────────────────────────────────
export const Code: React.FC<{ children: string }> = ({ children }) => (
  <div className="pg-code-box" style={{ marginTop: 12, fontSize: 12.5, lineHeight: 1.75 }}>
    {children
      .trim()
      .split('\n')
      .map((line, i) => (
        <div key={i}>{line || '\u00A0'}</div>
      ))}
  </div>
);

// ─── Inline monospace ─────────────────────────────────────────────────────────
export const M: React.FC<{ children: string }> = ({ children }) => (
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

// ─── Callout ─────────────────────────────────────────────────────────────────
export const Callout: React.FC<{
  type?: 'info' | 'warning' | 'tip';
  children: React.ReactNode;
}> = ({ type = 'info', children }) => {
  const styles: Record<string, { bg: string; border: string; color: string; icon: string }> = {
    info: {
      bg: 'var(--color-bg-muted)',
      border: 'var(--color-border)',
      color: 'var(--color-text-secondary)',
      icon: 'ℹ',
    },
    warning: {
      bg: 'var(--color-warning-subtle)',
      border: 'var(--color-warning-border)',
      color: 'var(--color-warning-text)',
      icon: '⚠',
    },
    tip: {
      bg: 'var(--color-success-subtle)',
      border: 'var(--color-success-border)',
      color: 'var(--color-success-text)',
      icon: '✦',
    },
  };
  const s = styles[type]!;
  return (
    <div
      style={{
        marginTop: 12,
        padding: '12px 14px',
        borderRadius: 'var(--radius-lg)',
        background: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: 13,
        color: s.color,
        lineHeight: 1.65,
        display: 'flex',
        gap: 10,
      }}
    >
      <span style={{ flexShrink: 0, fontSize: 14, marginTop: 1 }}>{s.icon}</span>
      <div>{children}</div>
    </div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
export const Section: React.FC<{
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

// ─── Props table ─────────────────────────────────────────────────────────────
export const PropsTable: React.FC<{
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
        {rows.map(({ prop, type, def, desc }) => (
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
);

// ─── Preview card ─────────────────────────────────────────────────────────────
export const Preview: React.FC<{
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ label, children, style }) => (
  <div>
    {label && (
      <div className="sub-label" style={{ marginBottom: 8 }}>
        {label}
      </div>
    )}
    <div className="doc-card" style={style}>
      {children}
    </div>
  </div>
);

// ─── Page heading ─────────────────────────────────────────────────────────────
export const PageHeading: React.FC<{
  eyebrow?: string;
  title: string;
  desc: string;
  badges?: string[];
  source?: string;
}> = ({ eyebrow = 'primitives', title, desc, badges = [], source }) => (
  <div className="page-heading">
    <div className="page-heading-eyebrow">{eyebrow}</div>
    <h1>{title}</h1>
    <p>{desc}</p>
    {badges.length > 0 && (
      <div className="prop-badges">
        {badges.map((b) => (
          <span className="prop-badge" key={b}>
            {b}
          </span>
        ))}
      </div>
    )}
    {source && (
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        packages/ui/src/components/{source}
      </div>
    )}
  </div>
);
