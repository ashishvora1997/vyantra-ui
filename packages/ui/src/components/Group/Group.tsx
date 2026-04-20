import React, { forwardRef } from 'react';
import type { GroupProps } from './Group.types';
import { cx } from '../../utils';

export const Group = forwardRef<HTMLElement, GroupProps>(
  ({ as: Component = 'div', gap = 'var(--vyantra-spacing-2, 8px)', align = 'center',
     justify = 'flex-start', wrap = false, grow = false,
     className, style, children, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cx('vyantra-group', className)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap,
        ...(grow ? { flex: 1 } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  ),
);
Group.displayName = 'Group';
export default Group;
