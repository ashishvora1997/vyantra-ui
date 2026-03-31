import React, { forwardRef } from 'react';
import type { GridProps, GridColProps } from './Grid.types';
import { cx } from '../../utils';

// ── Grid ─────────────────────────────────────────────────────────────────────
export const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as: Component = 'div', columns = 12, rows, gap = 'var(--vyantra-spacing-4, 16px)',
     columnGap, rowGap, align, justify, inline = false,
     className, style, children, ...rest }, ref) => {

    const templateCols = typeof columns === 'number'
      ? `repeat(${columns}, 1fr)`
      : columns;
    const templateRows = rows === undefined
      ? undefined
      : typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows;

    return (
      <Component
        ref={ref}
        className={cx('vyantra-grid', className)}
        style={{
          display:               inline ? 'inline-grid' : 'grid',
          gridTemplateColumns:   templateCols,
          ...(templateRows ? { gridTemplateRows: templateRows } : {}),
          gap,
          ...(columnGap ? { columnGap } : {}),
          ...(rowGap    ? { rowGap }    : {}),
          ...(align     ? { alignItems:   align   } : {}),
          ...(justify   ? { justifyItems: justify } : {}),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
Grid.displayName = 'Grid';

// ── Grid.Col ─────────────────────────────────────────────────────────────────
export const GridCol = forwardRef<HTMLElement, GridColProps>(
  ({ as: Component = 'div', span = 1, offset, rowSpan,
     className, style, children, ...rest }, ref) => {

    const colSpan = span === 'full' ? '1 / -1'
      : span === 'auto' ? 'auto'
      : `span ${span}`;

    return (
      <Component
        ref={ref}
        className={cx('vyantra-grid-col', className)}
        style={{
          gridColumn: colSpan,
          ...(offset  ? { gridColumnStart: offset }  : {}),
          ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
          ...style,
        }}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
GridCol.displayName = 'Grid.Col';

// Attach Col as static property
(Grid as typeof Grid & { Col: typeof GridCol }).Col = GridCol;

export default Grid;
