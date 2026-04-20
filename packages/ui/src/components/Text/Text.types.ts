import type { ElementType, HTMLAttributes } from 'react';

export type TextSize =
  | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export type TextWeight =
  | 'regular' | 'medium' | 'semibold' | 'bold';

export type TextAlign =
  | 'left' | 'center' | 'right' | 'justify';

export type TextTransform =
  | 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type TextDecoration =
  | 'none' | 'underline' | 'line-through';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** HTML element to render. @default 'p' */
  as?: ElementType;

  /** Font size from the token scale. @default 'md' */
  size?: TextSize;

  /** Font weight. @default 'regular' */
  weight?: TextWeight;

  /**
   * Text color — accepts any CSS color or --vyantra-* variable.
   * @default 'var(--vyantra-text-primary)'
   */
  c?: string;

  /** Text alignment. */
  align?: TextAlign;

  /** Text transform. */
  transform?: TextTransform;

  /** Text decoration. */
  decoration?: TextDecoration;

  /** Line height — CSS value or token. */
  lineHeight?: string | number;

  /** Letter spacing — CSS value. */
  letterSpacing?: string | number;

  /**
   * Truncate text with ellipsis after N lines.
   * 1 = single line truncation, 2+ = multi-line clamp.
   * @default undefined (no truncation)
   */
  lineClamp?: number;

  /**
   * Inherit font size and color from parent.
   * Useful for inline spans inside other text.
   * @default false
   */
  inherit?: boolean;

  /**
   * Render as inline element (span) instead of block.
   * Equivalent to as="span".
   * @default false
   */
  span?: boolean;

  /** Font family — CSS value or token. */
  ff?: string;

  /** Make text dimmed (uses --vyantra-text-secondary). @default false */
  dimmed?: boolean;

  className?: string;
  children?: React.ReactNode;
}