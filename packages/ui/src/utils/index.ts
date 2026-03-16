// =============================================================================
//  VYANTRA — utils/index.ts
//  Shared utilities used across multiple components.
//  Add new helpers here — never duplicate across component files.
// =============================================================================

import React, { Children, cloneElement, isValidElement } from 'react';

// ─── cx — class name joiner ───────────────────────────────────────────────────

export function cx(...args: (string | undefined | false | null)[]): string {
  return args.filter(Boolean).join(' ');
}

// ─── createRipple ─────────────────────────────────────────────────────────────

export function createRipple(
  event: React.MouseEvent<HTMLElement>,
  element: HTMLElement,
): void {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const ripple = document.createElement('span');
  ripple.className  = 'btn__ripple';
  ripple.style.width  = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left   = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top    = `${event.clientY - rect.top  - size / 2}px`;

  element.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

// ─── Slot (asChild pattern) ───────────────────────────────────────────────────

interface SlotProps {
  children:         React.ReactNode;
  className:        string;
  disabled?:        boolean;
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-busy'?:     boolean | 'true' | 'false';
  onClick?:         React.MouseEventHandler;
  ref?:             React.Ref<HTMLElement>;
  [key: string]:    unknown;
}

export function Slot({ children, ref, ...props }: SlotProps): React.ReactElement | null {
  const child = Children.only(children);
  if (!isValidElement(child)) {
    console.warn('[Vyantra] asChild requires exactly one valid React element as child.');
    return null;
  }
  const childProps = child.props as Record<string, unknown>;
  const mergedClass = cx(props['className'] as string, childProps['className'] as string);

  return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
    ...props,
    ...childProps,
    ...(ref != null ? { ref } : {}),
    className: mergedClass,
  });
}