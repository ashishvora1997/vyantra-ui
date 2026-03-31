import type { HTMLAttributes, ElementType, CSSProperties } from 'react';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  gap?: CSSProperties['gap'];
  rowGap?: CSSProperties['rowGap'];
  columnGap?: CSSProperties['columnGap'];
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
