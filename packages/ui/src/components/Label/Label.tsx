import React, { forwardRef } from 'react';
import type { LabelProps } from './Label.types';
import { cx } from '../../utils';
import './Label.css';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = 'sm',
      required = false,
      asteriskPosition = 'right',
      disabled = false,
      optional = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const asterisk = required ? (
      <span className="vyantra-label__asterisk" aria-hidden="true">*</span>
    ) : null;

    return (
      <label
        ref={ref}
        className={cx(
          'vyantra-label',
          `vyantra-label--size-${size}`,
          disabled && 'vyantra-label--disabled',
          className,
        )}
        {...rest}
      >
        {required && asteriskPosition === 'left' && asterisk}
        {children}
        {required && asteriskPosition === 'right' && asterisk}
        {optional && !required && (
          <span className="vyantra-label__optional">(optional)</span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
export default Label;