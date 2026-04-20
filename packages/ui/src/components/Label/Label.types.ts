import type { LabelHTMLAttributes } from 'react';

export type LabelSize = 'xs' | 'sm' | 'md' | 'lg';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** @default 'sm' */
  size?: LabelSize;
  /** Shows a required asterisk */
  required?: boolean;
  /** Position of the asterisk. @default 'right' */
  asteriskPosition?: 'left' | 'right';
  /** Dims the label — used when associated input is disabled */
  disabled?: boolean;
  /** Shows "(optional)" text */
  optional?: boolean;
  className?: string;
  children?: React.ReactNode;
}