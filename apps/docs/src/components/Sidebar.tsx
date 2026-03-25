import React from 'react';
import { pageHref } from '../router';

// ─── Nav definition ───────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  soon?: boolean;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navItems: NavGroup[] = [
  {
    group: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'tokens', label: 'Design Tokens' },
      { id: 'theming', label: 'Theming' },
    ],
  },
  {
    group: 'Primitives',
    items: [
      // { id: 'primitives',      label: 'Overview'       },
      { id: 'visually-hidden', label: 'VisuallyHidden' },
      { id: 'box', label: 'Box' },
      { id: 'portal', label: 'Portal' },
      { id: 'divider', label: 'Divider' },
    ],
  },
  // {
  //   group: 'Typography',
  //   items: [
  //     { id: 'typography', label: 'Typography' },
  //   ],
  // },
  // {
  //   group: 'Layout',
  //   items: [
  //     { id: 'layout', label: 'Layout' },
  //   ],
  // },
  {
    group: 'Components',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'input', label: 'Input', soon: true },
      { id: 'badge', label: 'Badge', soon: true },
      { id: 'checkbox', label: 'Checkbox', soon: true },
      { id: 'select', label: 'Select', soon: true },
      { id: 'card', label: 'Card', soon: true },
      { id: 'toast', label: 'Toast', soon: true },
    ],
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => (
  <aside className="sidebar">
    <nav className="sidebar-nav" aria-label="Documentation">
      {navItems.map((group) => (
        <div className="sidebar-group" key={group.group}>
          <div className="sidebar-group-label">{group.group}</div>

          {group.items.map((item) =>
            item.soon ? (
              // "soon" items — not interactive, no href
              <span
                key={item.id}
                className="sidebar-link"
                style={{ opacity: 0.4, cursor: 'default' }}
                aria-disabled="true"
              >
                <span className="sidebar-link-dot" />
                {item.label}
                <span className="sidebar-link-badge">soon</span>
              </span>
            ) : (
              // Real links — use <a> so the browser handles Ctrl+click,
              // middle-click, right-click → Open in new tab, etc.
              <a
                key={item.id}
                href={pageHref(item.id)}
                className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  // Let the hash update happen naturally (href does it),
                  // but also call onNavigate so App state updates instantly
                  // without waiting for the hashchange event.
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                aria-current={activePage === item.id ? 'page' : undefined}
              >
                <span className="sidebar-link-dot" />
                {item.label}
              </a>
            ),
          )}
        </div>
      ))}
    </nav>
  </aside>
);
