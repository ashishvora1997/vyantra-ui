import React, { forwardRef } from 'react';
import type { CodeProps } from './Code.types';
import { cx } from '../../utils';
import './Code.css';

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ block = false, bg, c, className, style, children, ...rest }, ref) => {
    const Tag = block ? 'pre' : 'code';
    return (
      <Tag
        ref={ref as React.Ref<HTMLPreElement & HTMLElement>}
        className={cx('vyantra-code', block && 'vyantra-code--block', className)}
        style={{ ...(bg ? { background: bg } : {}), ...(c ? { color: c } : {}), ...style }}
        {...rest}
      >
        {block ? <code>{children}</code> : children}
      </Tag>
    );
  },
);
Code.displayName = 'Code';
export default Code;
