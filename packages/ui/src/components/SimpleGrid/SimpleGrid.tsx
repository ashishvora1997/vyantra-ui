import React, { forwardRef } from 'react';
import type { SimpleGridProps } from './SimpleGrid.types';
import { cx } from '../../utils';
import { parseSpacingProps, omitSpacingProps, toSpacing } from '../../utils/spacing';

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
  (
    {
      as: Component = 'div',
      cols = 1,
      spacing = 'var(--vyantra-spacing-4, 16px)',
      verticalSpacing,
      minChildWidth,
      style,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const spacingStyles = parseSpacingProps(props);
    const restProps = omitSpacingProps(props);

    const gridTemplateColumns = minChildWidth
      ? `repeat(auto-fit, minmax(${toSpacing(minChildWidth)}, 1fr))`
      : `repeat(${cols}, 1fr)`;

    const gridStyles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      gap: toSpacing(verticalSpacing ?? spacing),
      columnGap: toSpacing(spacing),
      ...spacingStyles,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cx('vyantra-simple-grid', className)}
        style={gridStyles}
        {...restProps}
      >
        {children}
      </Component>
    );
  },
);
SimpleGrid.displayName = 'SimpleGrid';
export default SimpleGrid;
