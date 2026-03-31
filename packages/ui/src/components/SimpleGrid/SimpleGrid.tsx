import React, { forwardRef } from 'react';
import type { SimpleGridProps } from './SimpleGrid.types';
import { cx } from '../../utils';

export const SimpleGrid = forwardRef<HTMLElement, SimpleGridProps>(
  ({ as: Component = 'div', cols = 1, spacing = 'var(--vyantra-spacing-4, 16px)',
     verticalSpacing, minChildWidth,
     className, style, children, ...rest }, ref) => {

    const templateCols = minChildWidth
      ? `repeat(auto-fill, minmax(${minChildWidth}, 1fr))`
      : `repeat(${cols}, 1fr)`;

    return (
      <Component
        ref={ref}
        className={cx('vyantra-simple-grid', className)}
        style={{
          display:             'grid',
          gridTemplateColumns: templateCols,
          gap:                 spacing,
          ...(verticalSpacing ? { rowGap: verticalSpacing } : {}),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
SimpleGrid.displayName = 'SimpleGrid';
export default SimpleGrid;
