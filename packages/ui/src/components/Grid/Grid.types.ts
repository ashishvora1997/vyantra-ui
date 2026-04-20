import type { HTMLAttributes, ElementType, CSSProperties } from 'react';
import { GapProps, SpacingProps } from '../../utils/spacing';

export interface GridProps extends HTMLAttributes<HTMLElement>, SpacingProps, GapProps {
  as?: ElementType;
  /** Number of columns or CSS grid-template-columns value.
   *  Number → repeat(N, 1fr). String → used as-is.
   * @default 12 */
  columns?: number | string;
  /** Number of rows or CSS grid-template-rows value. */
  rows?: number | string;
  /** Gap between all cells. @default 'var(--vyantra-spacing-4)' */
  gap?: CSSProperties['gap'];
  /** Column gap only. */
  columnGap?: CSSProperties['columnGap'];
  /** Row gap only. */
  rowGap?: CSSProperties['rowGap'];
  /** align-items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** justify-items */
  justify?: 'start' | 'center' | 'end' | 'stretch';
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  /** Inline grid. @default false */
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface GridColProps extends HTMLAttributes<HTMLElement>, SpacingProps, GapProps {
  as?: ElementType;
  /** Column span (1–12 or 'auto'). @default 1 */
  span?: number | 'auto' | 'full';
  /** Column start position. */
  offset?: number;
  /** Row span. */
  rowSpan?: number;
  className?: string;
  children?: React.ReactNode;
}

