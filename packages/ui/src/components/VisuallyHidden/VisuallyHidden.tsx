// =============================================================================
//  VYANTRA — VisuallyHidden.tsx
//  Hides content visually while keeping it accessible to screen readers.
// =============================================================================

import React from 'react';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';
import { cx } from '../../utils';
import './VisuallyHidden.css';

/**
 * Hides content visually while keeping it accessible to screen readers.
 *
 * @example
 * // Icon button with accessible label
 * <button>
 *   <TrashIcon aria-hidden />
 *   <VisuallyHidden>Delete item</VisuallyHidden>
 * </button>
 *
 * @example
 * // Skip navigation link (visible on focus)
 * <VisuallyHidden as="a" href="#main" focusable>
 *   Skip to main content
 * </VisuallyHidden>
 *
 * @example
 * // Live region announcement
 * <VisuallyHidden role="status" aria-live="polite">
 *   {statusMessage}
 * </VisuallyHidden>
 */
export const VisuallyHidden = React.forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as: Component = 'span', focusable = false, className, children, ...rest }, ref) => (
    <Component
      ref={ref}
      className={cx(
        'vyantra-visually-hidden',
        focusable && 'vyantra-visually-hidden--focusable',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  ),
);

VisuallyHidden.displayName = 'VisuallyHidden';
export default VisuallyHidden;