import type { HTMLAttributes, ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerLabelPosition = 'left' | 'center' | 'right';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the divider line.
   * Vertical requires the parent to have a defined height.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Border style.
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Thickness of the divider line.
   * @default '1px'
   */
  size?: string | number;

  /**
   * Color of the divider line.
   * Accepts any CSS color value or CSS variable.
   * @default 'var(--vyantra-surface-border)'
   */
  color?: string;

  /**
   * Optional label rendered in the center (or left/right) of the divider.
   * Only works with horizontal orientation.
   */
  label?: ReactNode;

  /**
   * Position of the label along the divider.
   * @default 'center'
   */
  labelPosition?: DividerLabelPosition;

  /**
   * Gap between the label text and the divider lines.
   * @default 'var(--vyantra-spacing-3)'
   */
  labelGap?: string;

  className?: string;
}
