import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ThemeMode } from '../context/ThemeContext';

// ─── Icons ───────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

// ─── Nav data ─────────────────────────────────────────────────────────────────

const navItems = [
  {
    group: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'tokens',   label: 'Design Tokens' },
      { id: 'theming',  label: 'Theming' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'button',   label: 'Button' },
      { id: 'input',    label: 'Input',    soon: true },
      { id: 'badge',    label: 'Badge',    soon: true },
      { id: 'checkbox', label: 'Checkbox', soon: true },
      { id: 'select',   label: 'Select',   soon: true },
      { id: 'card',     label: 'Card',     soon: true },
      { id: 'toast',    label: 'Toast',    soon: true },
    ],
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  activePage:   string;
  onNavigate:   (page: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="sidebar">
      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((group) => (
          <div className="sidebar-group" key={group.group}>
            <div className="sidebar-group-label">{group.group}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => !item.soon && onNavigate(item.id)}
                style={item.soon ? { opacity: 0.45, cursor: 'default' } : {}}
              >
                <span className="sidebar-link-dot" />
                {item.label}
                {item.soon && <span className="sidebar-link-badge">soon</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};