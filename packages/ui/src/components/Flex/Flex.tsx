import React, { forwardRef } from 'react';
import type { FlexProps } from './Flex.types';
import { cx } from '../../utils';

// Flex.tsx
export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      direction,
      align,
      justify,
      wrap,
      gap,
      rowGap,
      columnGap,
      inline = false,
      className,
      style,
      children,
      ...rest  // gap/rowGap/columnGap are now fully destructured out ✅
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cx('vyantra-flex', className)}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          gap,
          rowGap,
          columnGap,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
Flex.displayName = 'Flex';
export default Flex;
