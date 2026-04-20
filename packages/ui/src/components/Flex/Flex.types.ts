import type { HTMLAttributes, ElementType, CSSProperties } from 'react';
import { GapProps, SpacingProps } from '../../utils/spacing';

export type WrapKey = 'true' | 'false' | 'wrap' | 'nowrap' | 'wrap-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexProps extends HTMLAttributes<HTMLElement>, SpacingProps, GapProps {
  as?: ElementType;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: FlexWrap;
  gap?: CSSProperties['gap'];
  rowGap?: CSSProperties['rowGap'];
  columnGap?: CSSProperties['columnGap'];
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
