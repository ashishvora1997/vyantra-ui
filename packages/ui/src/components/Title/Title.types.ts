import type { HTMLAttributes } from 'react';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSize  = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level — renders as h1–h6.
   * @default 1
   */
  order?: TitleOrder;

  /**
   * Visual size override — render h2 with h4 styling for example.
   * Defaults to match the order.
   */
  size?: TitleSize;

  /**
   * Text color — CSS value or token.
   * @default 'var(--vyantra-text-primary)'
   */
  c?: string;

  /** Text alignment. */
  align?: 'left' | 'center' | 'right';

  /** Truncate to one line with ellipsis. */
  lineClamp?: number;

  /** Font family override. */
  ff?: string;

  /** Font weight override. */
  fw?: string | number;

  className?: string;
  children?: React.ReactNode;
}