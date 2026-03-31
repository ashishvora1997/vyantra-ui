import type { HTMLAttributes, ElementType } from 'react';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /**
   * Max-width of the container.
   * @default 'lg'
   */
  size?: ContainerSize;
  /**
   * Horizontal padding.
   * @default 'var(--vyantra-spacing-4)'
   */
  px?: string;
  /** Center the container horizontally. @default true */
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}
