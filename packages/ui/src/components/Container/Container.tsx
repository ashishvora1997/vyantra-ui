import React, { forwardRef } from 'react';
import type { ContainerProps } from './Container.types';
import { cx } from '../../utils';
import './Container.css';

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ as: Component = 'div', size = 'lg', px, centered = true,
     className, style, children, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cx(
        'vyantra-container',
        `vyantra-container--${size}`,
        centered && 'vyantra-container--centered',
        className,
      )}
      style={{ ...(px ? { '--_container-px': px } as React.CSSProperties : {}), ...style }}
      {...rest}
    >
      {children}
    </Component>
  ),
);
Container.displayName = 'Container';
export default Container;
