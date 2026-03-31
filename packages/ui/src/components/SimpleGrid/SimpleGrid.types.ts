import type { HTMLAttributes, ElementType, CSSProperties } from 'react';

export interface SimpleGridProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /**
   * Number of equal columns.
   * Pass a number for fixed columns, or a responsive object.
   * @default 1
   */
  cols?: number;
  /**
   * Responsive columns — breakpoint keys with column counts.
   * @example { base: 1, sm: 2, md: 3, lg: 4 }
   */
  spacing?: CSSProperties['gap'];
  /** Column gap only. Falls back to spacing. */
  verticalSpacing?: CSSProperties['rowGap'];
  /** Minimum column width — auto-fills columns (ignores cols).
   *  Use this instead of cols for truly responsive grids.
   *  @example '200px' → fills as many 200px+ cols as fit */
  minChildWidth?: string;
  className?: string;
  children?: React.ReactNode;
}
