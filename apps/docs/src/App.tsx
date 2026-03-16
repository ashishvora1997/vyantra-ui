import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import type { ThemeMode } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { ButtonPage } from './pages/button/ButtonPage';
import './styles/globals.css';
import { ThemingPage } from './pages/theme/ThemingPage';

// ─── Icons ────────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);
const MonitorIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

// ─── Overview page ────────────────────────────────────────────────────────────
const OverviewPage: React.FC = () => (
  <div className="page-content">
    <div className="page-heading">
      <div className="page-heading-eyebrow">getting started</div>
      <h1>Overview</h1>
      <p>A lightweight, fully-typed design system built with React and TypeScript. Token-based theming — switch between light, dark and custom themes with zero component changes.</p>
    </div>
    <div className="section">
      <div className="section-title-line">Components</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:10 }}>
        {[
          { name:'Button',   desc:'25+ variants, icons, loading, asChild', status:'stable' },
          { name:'Input',    desc:'Text, number, password, search',        status:'soon'   },
          { name:'Badge',    desc:'Status indicators and labels',          status:'soon'   },
          { name:'Checkbox', desc:'Checkbox, radio, switch',               status:'soon'   },
          { name:'Select',   desc:'Native and custom dropdown',            status:'soon'   },
          { name:'Card',     desc:'Surface container',                     status:'soon'   },
          { name:'Toast',    desc:'Notification messages',                 status:'soon'   },
        ].map(c => (
          <div key={c.name} style={{ background:'var(--color-bg-subtle)', border:'1px solid var(--color-border)', borderRadius:'var(--radius-xl)', padding:'16px 18px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
              <span style={{ fontSize:14, fontWeight:600, color:'var(--color-text-primary)' }}>{c.name}</span>
              <span style={{ fontSize:10, fontFamily:'var(--font-mono)', padding:'2px 7px', borderRadius:'var(--radius-sm)', background: c.status==='stable' ? 'var(--color-success-subtle)' : 'var(--color-bg-muted)', border: `1px solid ${c.status==='stable' ? 'var(--color-success-border)' : 'var(--color-border)'}`, color: c.status==='stable' ? 'var(--color-success-text)' : 'var(--color-text-disabled)' }}>{c.status}</span>
            </div>
            <p style={{ fontSize:12.5, color:'var(--color-text-tertiary)', lineHeight:1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Tokens page ──────────────────────────────────────────────────────────────
const TokensPage: React.FC = () => {
  const groups = [
    { label:'Color — Semantic', rows:[['--color-bg','Surface','Page background'],['--color-bg-subtle','Surface','Subtle tinted background'],['--color-text-primary','Text','Primary text'],['--color-primary','Primary','Brand action color'],['--color-on-primary','Primary','Text on solid primary'],['--color-danger','Danger','Destructive action'],['--color-success','Success','Positive/confirm action'],['--color-border','Border','Default border']] },
    { label:'Spacing', rows:[['--spacing-1','4px','Tight gap'],['--spacing-2','8px','Small gap'],['--spacing-4','16px','Standard padding'],['--spacing-6','24px','Section padding']] },
    { label:'Typography', rows:[['--font-sans','Geist, system-ui','Sans-serif stack'],['--font-mono','Geist Mono','Monospace stack'],['--text-sm','14px','Body / default'],['--weight-medium','500','Medium weight']] },
    { label:'Radius', rows:[['--radius-sm','4px','Slight rounding'],['--radius-md','6px','Default'],['--radius-xl','12px','Card radius'],['--radius-full','9999px','Pill / circle']] },
  ];
  return (
    <div className="page-content">
      <div className="page-heading">
        <div className="page-heading-eyebrow">foundation</div>
        <h1>Design Tokens</h1>
        <p>All tokens are CSS custom properties. Components reference semantic tokens only — swap themes by overriding the semantic layer.</p>
      </div>
      {groups.map(g => (
        <div className="section" key={g.label}>
          <div className="section-title-line">{g.label}</div>
          <div style={{ overflowX:'auto' }}>
            <table className="docs-table">
              <thead><tr><th>Token</th><th>Value / Type</th><th>Usage</th></tr></thead>
              <tbody>{g.rows.map(([token,val,desc]) => (<tr key={token}><td className="token">{token}</td><td className="type">{val}</td><td className="desc">{desc}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Top Header ───────────────────────────────────────────────────────────────
const Topbar: React.FC<{ onSearchOpen: () => void }> = ({ onSearchOpen }) => {
  const { mode, setMode } = useTheme();
  const modes: { value: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { value: 'light',  icon: <SunIcon />,     label: 'Light'  },
    { value: 'dark',   icon: <MoonIcon />,    label: 'Dark'   },
    { value: 'system', icon: <MonitorIcon />, label: 'System' },
  ];
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <div className="topbar-logo-mark">I</div>
        <span className="topbar-logo-text">Vyantra UI</span>
        <span className="topbar-logo-badge">v1.0</span>
      </div>
      <div className="topbar-right">
        <button className="topbar-search" onClick={onSearchOpen}>
          <SearchIcon />
          <span className="topbar-search-fill">Search docs…</span>
          <span className="topbar-search-kbd">⌘K</span>
        </button>
        <div className="theme-mode-group">
          {modes.map(m => (
            <button
              key={m.value}
              className={`theme-mode-btn ${mode === m.value ? 'active' : ''}`}
              onClick={() => setMode(m.value)}
              title={m.label}
            >
              {m.icon}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

// ─── App inner ────────────────────────────────────────────────────────────────
function AppInner() {
  const [page,       setPage]       = useState<string>('button');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(prev => !prev); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavigate = (p: string) => { setPage(p); setSearchOpen(false); };

  return (
    <div className="layout">
      <Topbar onSearchOpen={() => setSearchOpen(true)} />
      <Sidebar activePage={page} onNavigate={handleNavigate} />
      <main className="main">
        {page === 'overview' && <OverviewPage />}
        {page === 'tokens'   && <TokensPage />}
        {page === 'button'   && <ButtonPage />}
        {page === 'theming'  && <ThemingPage />}
      </main>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="system">
      <AppInner />
    </ThemeProvider>
  );
}