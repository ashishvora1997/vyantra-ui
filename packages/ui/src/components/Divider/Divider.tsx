// =============================================================================
//  VYANTRA — Divider.tsx
// =============================================================================

import React from 'react';
import type { DividerProps } from './Divider.types';
import { cx } from '../../utils';
import './Divider.css';

/**
 * Separates content with a horizontal or vertical line.
 * Supports labels, dashed/dotted variants, custom colors.
 *
 * @example
 * <Divider />
 *
 * @example
 * <Divider label="OR" />
 *
 * @example
 * <Divider label="Section" labelPosition="left" variant="dashed" />
 *
 * @example
 * // Vertical — parent must have defined height
 * <div style={{ display:'flex', height: 40, gap: 12 }}>
 *   <span>Left</span>
 *   <Divider orientation="vertical" />
 *   <span>Right</span>
 * </div>
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      size = '1px',
      color,
      label,
      labelPosition = 'center',
      labelGap,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const cssVars = {
      '--_divider-variant': variant,
      '--_divider-size': typeof size === 'number' ? `${size}px` : size,
      ...(color ? { '--_divider-color': color } : {}),
      ...(labelGap ? { '--_divider-label-gap': labelGap } : {}),
    } as React.CSSProperties;

    // Vertical — simple line, no label support
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cx('vyantra-divider vyantra-divider--vertical', className)}
          style={{ ...cssVars, ...style }}
          {...rest}
        />
      );
    }

    // Horizontal without label — single line
    if (!label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cx('vyantra-divider', className)}
          style={{ ...cssVars, ...style }}
          {...rest}
        >
          <span className="vyantra-divider__line" />
        </div>
      );
    }

    // Horizontal with label
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cx('vyantra-divider', `vyantra-divider--label-${labelPosition}`, className)}
        style={{ ...cssVars, ...style }}
        {...rest}
      >
        <span className="vyantra-divider__line" />
        <span className="vyantra-divider__label">{label}</span>
        <span className="vyantra-divider__line" />
      </div>
    );
  },
);

Divider.displayName = 'Divider';
export default Divider;
