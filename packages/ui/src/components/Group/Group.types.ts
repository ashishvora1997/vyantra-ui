import type { HTMLAttributes, ElementType, CSSProperties } from 'react';

export interface GroupProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Gap between items. @default 'var(--vyantra-spacing-2)' */
  gap?: CSSProperties['gap'];
  /** Align items vertically. @default 'center' */
  align?: CSSProperties['alignItems'];
  /** Justify content horizontally. @default 'flex-start' */
  justify?: CSSProperties['justifyContent'];
  /** Allow items to wrap to next line. @default false */
  wrap?: boolean;
  /** Prevent children from growing. @default false */
  noWrap?: boolean;
  /** Grow to fill container. @default false */
  grow?: boolean;
  className?: string;
  children?: React.ReactNode;
}
