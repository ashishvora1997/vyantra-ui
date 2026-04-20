import type { HTMLAttributes } from 'react';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Code content */
  children?: React.ReactNode;
  /** Display as block (pre) instead of inline (code). @default false */
  block?: boolean;
  /** Custom background color. @default token */
  bg?: string;
  /** Custom text color. @default token */
  c?: string;
  className?: string;
}
