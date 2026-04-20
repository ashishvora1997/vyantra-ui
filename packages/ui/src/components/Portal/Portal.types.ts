import type { ReactNode } from 'react';

export interface PortalProps {
  /**
   * Content to render outside the current DOM tree.
   */
  children: ReactNode;

  /**
   * The DOM element to render into.
   * Defaults to document.body.
   * Pass a ref or querySelector result for custom mount points.
   */
  target?: HTMLElement | null;

  /**
   * When false the Portal renders inline (no portal).
   * Useful for SSR or conditional disabling.
   * @default true
   */
  enabled?: boolean;
}