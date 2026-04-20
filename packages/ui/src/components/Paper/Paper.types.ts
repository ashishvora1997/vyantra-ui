import type { HTMLAttributes, ElementType } from 'react';

export type PaperShadow  = 'none' | 'xs' | 'sm' | 'md' | 'lg';
export type PaperRadius  = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type PaperPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PaperProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** @default 'sm' */ shadow?:  PaperShadow;
  /** @default 'md' */ radius?:  PaperRadius;
  /** @default 'md' */ p?:       PaperPadding;
  /** Shows a border. @default true */ withBorder?: boolean;
  className?: string;
  children?: React.ReactNode;
}
