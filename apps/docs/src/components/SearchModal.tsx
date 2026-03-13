import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── Search index ────────────────────────────────────────────────────────────

interface SearchEntry {
  id:       string;
  title:    string;
  desc:     string;
  section:  string;
  page:     string;
  keywords: string[];
  status?:  'stable' | 'soon';
  icon:     React.ReactNode;
}

const BoxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const TokenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v8M8 12h8"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const LayoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
);

const SEARCH_INDEX: SearchEntry[] = [
  // Getting started
  { id:'overview',  title:'Overview',       desc:'Introduction to Vyantra UI System',         section:'Getting Started', page:'overview', keywords:['home','start','intro','about'], status:'stable', icon:<LayoutIcon/> },
  { id:'tokens',    title:'Design Tokens',  desc:'Colors, spacing, typography',       section:'Getting Started', page:'tokens',   keywords:['token','color','spacing','type','radius','shadow'], status:'stable', icon:<TokenIcon/> },
  { id:'theming',   title:'Theming',        desc:'Light, dark, custom themes',        section:'Getting Started', page:'tokens',   keywords:['theme','dark','light','custom','css variable'], status:'stable', icon:<PaletteIcon/> },
  // Components
  { id:'button',    title:'Button',         desc:'25+ variants, icons, loading, asChild', section:'Components', page:'button',   keywords:['btn','click','action','cta','icon','loading','disabled','solid','outline','ghost'], status:'stable', icon:<BoxIcon/> },
  { id:'input',     title:'Input',          desc:'Text, number, password, search',    section:'Components', page:'input',    keywords:['field','form','text','type'], status:'soon', icon:<BoxIcon/> },
  { id:'badge',     title:'Badge',          desc:'Status indicators and labels',      section:'Components', page:'badge',    keywords:['tag','label','status','chip'], status:'soon', icon:<BoxIcon/> },
  { id:'checkbox',  title:'Checkbox',       desc:'Checkbox, radio, switch',           section:'Components', page:'checkbox', keywords:['check','radio','toggle','switch','select'], status:'soon', icon:<BoxIcon/> },
  { id:'select',    title:'Select',         desc:'Dropdown select menu',              section:'Components', page:'select',   keywords:['dropdown','option','choose','pick'], status:'soon', icon:<BoxIcon/> },
  { id:'card',      title:'Card',           desc:'Surface container component',       section:'Components', page:'card',     keywords:['surface','container','panel'], status:'soon', icon:<BoxIcon/> },
  { id:'toast',     title:'Toast',          desc:'Notification messages',             section:'Components', page:'toast',    keywords:['notification','alert','message','snackbar'], status:'soon', icon:<BoxIcon/> },
  // Variants as deep-link items
  { id:'btn-intent', title:'Button Intents',   desc:'primary, secondary, danger, success…', section:'Button', page:'button', keywords:['intent','color','primary','danger','success','warning','info','secondary','neutral'], status:'stable', icon:<BoxIcon/> },
  { id:'btn-appear', title:'Button Appearances',desc:'solid, outline, ghost, soft, link',   section:'Button', page:'button', keywords:['appearance','solid','outline','ghost','soft','link','style'], status:'stable', icon:<BoxIcon/> },
  { id:'btn-size',   title:'Button Sizes',      desc:'2xs, xs, sm, md, lg, xl, 2xl',        section:'Button', page:'button', keywords:['size','small','large','height','compact','2xs','xs','sm','md','lg','xl'], status:'stable', icon:<BoxIcon/> },
];

function search(query: string): SearchEntry[] {
  if (!query.trim()) return SEARCH_INDEX.filter(e => e.status === 'stable');
  const q = query.toLowerCase();
  return SEARCH_INDEX.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.desc.toLowerCase().includes(q) ||
    e.section.toLowerCase().includes(q) ||
    e.keywords.some(k => k.includes(q))
  );
}

function groupResults(results: SearchEntry[]): Record<string, SearchEntry[]> {
  return results.reduce((acc, item) => {
    (acc[item.section] ??= []).push(item);
    return acc;
  }, {} as Record<string, SearchEntry[]>);
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, onNavigate }) => {
  const [query,   setQuery]   = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = search(query);
  const grouped = groupResults(results);
  const flat    = results; // for keyboard nav

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery('');
      setFocused(0);
    }
  }, [open]);

  // Global shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose(); else open; // parent handles open state
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, flat.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
    if (e.key === 'Enter' && flat[focused]) {
      onNavigate(flat[focused].page);
      onClose();
    }
  }, [flat, focused, onNavigate, onClose]);

  const handleSelect = (page: string) => { onNavigate(page); onClose(); };

  if (!open) return null;

  let globalIdx = 0;

  return (
    <div className="search-backdrop" onClick={onClose} onKeyDown={handleKeyDown}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div className="search-input-wrap">
          <span className="search-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search components, tokens, themes…"
            value={query}
            onChange={e => { setQuery(e.target.value); setFocused(0); }}
          />
          <button className="search-esc" onClick={onClose}>esc</button>
        </div>

        {/* Results */}
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No results for "{query}"</div>
          ) : (
            Object.entries(grouped).map(([section, items]) => (
              <div key={section}>
                <div className="search-section-label">{section}</div>
                {items.map(item => {
                  const idx = globalIdx++;
                  return (
                    <button
                      key={item.id}
                      className={`search-item ${idx === focused ? 'focused' : ''}`}
                      onClick={() => handleSelect(item.page)}
                      onMouseEnter={() => setFocused(idx)}
                    >
                      <div className="search-item-icon">{item.icon}</div>
                      <div className="search-item-content">
                        <div className="search-item-title">{item.title}</div>
                        <div className="search-item-desc">{item.desc}</div>
                      </div>
                      {item.status && (
                        <span className={`search-item-badge ${item.status}`}>{item.status}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="search-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};