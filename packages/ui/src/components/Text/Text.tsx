import React, { forwardRef } from 'react';
import type { ElementType } from 'react';
import type { TextProps } from './Text.types';
import { cx } from '../../utils';
import './Text.css';

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      size = 'md',
      weight = 'regular',
      c,
      align,
      transform,
      decoration,
      lineHeight,
      letterSpacing,
      lineClamp,
      inherit = false,
      span = false,
      ff,
      dimmed = false,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const Component: ElementType = as ?? (span ? 'span' : 'p');

    const inlineStyle: React.CSSProperties = {
      ...(c            ? { color: c }                                    : {}),
      ...(align        ? { textAlign: align }                            : {}),
      ...(transform    ? { textTransform: transform }                    : {}),
      ...(decoration   ? { textDecoration: decoration }                  : {}),
      ...(lineHeight   ? { lineHeight }                                  : {}),
      ...(letterSpacing? { letterSpacing }                               : {}),
      ...(ff           ? { fontFamily: ff }                              : {}),
      ...(lineClamp && lineClamp > 1 ? { WebkitLineClamp: lineClamp }   : {}),
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cx(
          'vyantra-text',
          !inherit && `vyantra-text--size-${size}`,
          !inherit && `vyantra-text--weight-${weight}`,
          dimmed && 'vyantra-text--dimmed',
          inherit && 'vyantra-text--inherit',
          lineClamp === 1 && 'vyantra-text--truncate-1',
          lineClamp && lineClamp > 1 ? 'vyantra-text--clamp' : '',
          className,
        )}
        style={inlineStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';
export default Text;