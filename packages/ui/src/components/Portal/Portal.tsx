// =============================================================================
//  VYANTRA — Portal.tsx
//  Renders children into a DOM node outside the current component tree.
//  Used by Tooltip, Modal, Drawer, Popover, Toast — any overlay component.
// =============================================================================

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { PortalProps } from './Portal.types';

/**
 * Renders children into a different DOM node — by default `document.body`.
 * Handles SSR safely: portal is only created after mount.
 *
 * @example
 * // Basic — renders into body
 * <Portal>
 *   <div className="overlay">...</div>
 * </Portal>
 *
 * @example
 * // Custom target
 * const containerRef = useRef<HTMLDivElement>(null);
 * <Portal target={containerRef.current}>
 *   <Tooltip>...</Tooltip>
 * </Portal>
 *
 * @example
 * // Conditionally disable (renders inline)
 * <Portal enabled={isClient}>
 *   <Modal />
 * </Portal>
 */
export function Portal({ children, target, enabled = true }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  // Only mount after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Not yet mounted (SSR) or disabled — render inline
  if (!mounted || !enabled) return <>{children}</>;

  const node = target ?? document.body;
  return createPortal(children, node);
}

Portal.displayName = 'Portal';
export default Portal;
