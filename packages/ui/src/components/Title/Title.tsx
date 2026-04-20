import React, { forwardRef } from 'react';
import type { TitleProps, TitleOrder } from './Title.types';
import { cx } from '../../utils';
import './Title.css';

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ order = 1, size, c, align, lineClamp, ff, fw, className, style, children, ...rest }, ref) => {
    const tag = `h${order}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    const sizeClass = size ?? tag;

    const inlineStyle: React.CSSProperties = {
      ...(c     ? { color: c }          : {}),
      ...(align ? { textAlign: align }  : {}),
      ...(ff    ? { fontFamily: ff }    : {}),
      ...(fw    ? { fontWeight: fw }    : {}),
      ...(lineClamp && lineClamp > 1 ? { WebkitLineClamp: lineClamp } : {}),
      ...style,
    };

    return React.createElement(
      tag,
      {
        ref,
        className: cx(
          'vyantra-title',
          `vyantra-title--${sizeClass}`,
          lineClamp === 1 && 'vyantra-title--clamp-1',
          lineClamp && lineClamp > 1 ? 'vyantra-title--clamp' : '',
          className,
        ),
        style: inlineStyle,
        ...rest,
      },
      children,
    );
  },
);

Title.displayName = 'Title';
export default Title;