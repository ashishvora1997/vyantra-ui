// =============================================================================
//  Hash router — zero deps, survives page refresh, shareable URLs
//
//  URL format:  https://vyantra.dev/docs#/button
//               https://vyantra.dev/docs#/visually-hidden
//
//  The hash (#/) prefix avoids conflicts with real anchor links on the page.
// =============================================================================

/** All valid page IDs */
export const PAGES = [
  'overview',
  'tokens',
  'theming',
  'custom-theming',
  'primitives',
  'visually-hidden',
  'box',
  'portal',
  'divider',
  'typography',
  'layout',
  'button',
  'input',
  'badge',
  'checkbox',
  'select',
  'card',
  'toast',
] as const;

export type PageId = (typeof PAGES)[number];

const DEFAULT_PAGE: PageId = 'overview';
const HASH_PREFIX = '#/';

/** Read the current page from the URL hash. Falls back to default. */
export function getPageFromHash(): PageId {
  const raw = window.location.hash; // e.g. "#/button"
  if (!raw.startsWith(HASH_PREFIX)) return DEFAULT_PAGE;
  const id = raw.slice(HASH_PREFIX.length) as PageId;
  return (PAGES as readonly string[]).includes(id) ? id : DEFAULT_PAGE;
}

/** Build the href for a nav link */
export function pageHref(id: string): string {
  return `${HASH_PREFIX}${id}`;
}

/** Navigate to a page by updating the hash (adds to browser history) */
export function navigateTo(id: string): void {
  window.location.hash = `/${id}`;
}

/** Replace current history entry (no back-button entry) */
export function replacePage(id: string): void {
  const url = `${window.location.pathname}${window.location.search}#/${id}`;
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
