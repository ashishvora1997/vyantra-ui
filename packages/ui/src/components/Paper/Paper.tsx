import React, { forwardRef } from 'react';
import type { PaperProps } from './Paper.types';
import { cx } from '../../utils';
import './Paper.css';

export const Paper = forwardRef<HTMLElement, PaperProps>(
  ({ as: Component = 'div', shadow = 'sm', radius = 'md', p = 'md', withBorder = true,
     className, children, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cx(
        'vyantra-paper',
        `vyantra-paper--shadow-${shadow}`,
        `vyantra-paper--radius-${radius}`,
        `vyantra-paper--p-${p}`,
        withBorder && 'vyantra-paper--bordered',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  ),
);
Paper.displayName = 'Paper';
export default Paper;
