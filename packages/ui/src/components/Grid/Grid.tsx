import React, { forwardRef } from 'react';
import {
  parseSpacingProps,
  omitSpacingProps,
  parseGapProps,
  omitGapProps,
} from '../../utils/spacing';
import { GridColProps, GridProps } from './Grid.types';
import { cx } from '../../utils';

const alignMap = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
};

// ── Grid ─────────────────────────────────────────────────────────────────────
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = 'div',
      columns,
      autoFlow,
      align,
      justify,
      inline = false,
      style,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const spacingStyles = parseSpacingProps(props);
    const gapStyles = parseGapProps(props);
    const restProps = omitGapProps(omitSpacingProps(props));

    const gridStyles: React.CSSProperties = {
      display: inline ? 'inline-grid' : 'grid',
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
      gridAutoFlow: autoFlow,
      alignItems: align ? alignMap[align] : undefined,
      justifyItems: justify ? alignMap[justify] : undefined,
      ...gapStyles,
      ...spacingStyles,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cx('vyantra-grid', className)}
        style={gridStyles}
        {...restProps}
      >
        {children}
      </Component>
    );
  },
);
Grid.displayName = 'Grid';

// ── Grid.Col ─────────────────────────────────────────────────────────────────
export const GridCol = forwardRef<HTMLElement, GridColProps>(
  (
    { as: Component = 'div', span = 1, offset, rowSpan, className, style, children, ...rest },
    ref,
  ) => {
    const spacingStyles = parseSpacingProps(rest);
    const gapStyles = parseGapProps(rest);
    const restProps = omitGapProps(omitSpacingProps(rest));
    const colSpan = span === 'full' ? '1 / -1' : span === 'auto' ? 'auto' : `span ${span}`;

    return (
      <Component
        ref={ref}
        className={cx('vyantra-grid-col', className)}
        style={{
          gridColumn: colSpan,
          ...(offset ? { gridColumnStart: offset } : {}),
          ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
          ...spacingStyles,
          ...gapStyles,
          ...style,
        }}
        {...restProps}
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
