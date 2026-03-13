import React from 'react';

interface IconProps {
  name: string;
  size?: number;
}

const paths: Record<string, React.ReactNode> = {
  plus:     <path d="M12 5v14M5 12h14" strokeWidth={2} strokeLinecap="round"/>,
  arrow:    <path d="M5 12h14M13 6l6 6-6 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>,
  trash:    <><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></>,
  check:    <path d="M20 6L9 17l-5-5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>,
  download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeWidth={2} strokeLinecap="round"/><polyline points="7 10 12 15 17 10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="15" x2="12" y2="3" strokeWidth={2} strokeLinecap="round"/></>,
  send:     <><line x1="22" y1="2" x2="11" y2="13" strokeWidth={2} strokeLinecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></>,
  star:     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>,
  settings: <><circle cx="12" cy="12" r="3" strokeWidth={2}/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth={2}/></>,
  external: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeWidth={2} strokeLinecap="round"/><polyline points="15 3 21 3 21 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" strokeWidth={2} strokeLinecap="round"/></>,
  zap:      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>,
  close:    <><line x1="18" y1="6" x2="6" y2="18" strokeWidth={2.5} strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeWidth={2.5} strokeLinecap="round"/></>,
  bell:     <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" strokeWidth={2} strokeLinecap="round"/><path d="M13.73 21a2 2 0 01-3.46 0" strokeWidth={2} strokeLinecap="round"/></>,
  copy:     <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2}/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth={2} strokeLinecap="round"/></>,
  github:   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>,
};

export const Icon: React.FC<IconProps> = ({ name, size = 14 }) => (
  <svg
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    {paths[name] ?? null}
  </svg>
);