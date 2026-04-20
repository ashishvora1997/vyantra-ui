import type { HTMLAttributes, AnchorHTMLAttributes, ElementType } from 'react';

/**
 * VisuallyHidden hides content visually while keeping it
 * accessible to screen readers and other assistive technology.
 *
 * Use for:
 * - Icon button labels          <VisuallyHidden>Delete</VisuallyHidden>
 * - Skip-to-content links       <VisuallyHidden as="a" href="#main" focusable>Skip</VisuallyHidden>
 * - Form field descriptions     <VisuallyHidden id="hint">Must be 8+ characters</VisuallyHidden>
 * - Status announcements        <VisuallyHidden role="status">Saved</VisuallyHidden>
 */
export interface VisuallyHiddenProps
  // Merge both HTMLElement and anchor attributes so href/target/rel
  // are always valid regardless of the `as` prop value.
  extends
    HTMLAttributes<HTMLElement>,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'download'> {
  /**
   * The HTML element to render.
   * @default 'span'
   */
  as?: ElementType;

  /**
   * When true, the element becomes visible on :focus / :focus-within.
   * Perfect for skip-to-content links.
   * @default false
   */
  focusable?: boolean;

  /** Content to hide visually but expose to screen readers. */
  children?: React.ReactNode;

  className?: string;
}
