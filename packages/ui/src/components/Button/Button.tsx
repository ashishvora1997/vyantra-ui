// =============================================================================
//  VYANTRA — Button.tsx
//  Reads theme.components.Button.defaultProps + classNames from context.
//  Component-level CSS vars (vars()) are already written on the DOM by ThemeProvider.
//  Slots: root | label | icon | spinner
// =============================================================================

import React, { forwardRef, useCallback, useContext, useRef } from 'react';
import type { ButtonProps } from './Button.types';
import { VyantraContext } from '../../theme/context';
import { cx, createRipple, Slot } from '../../utils';
import './Button.css';

// ─── Spinner ──────────────────────────────────────────────────────────────────

const DefaultSpinner: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" opacity={0.25} />
    <path d="M12 3 a9 9 0 0 1 9 9" />
  </svg>
);

// ─── Class builder ────────────────────────────────────────────────────────────

interface ClassConfig {
  intent: ButtonProps['intent'];
  appearance: ButtonProps['appearance'];
  size: ButtonProps['size'];
  radius: ButtonProps['radius'];
  width: ButtonProps['width'];
  loading: boolean;
  disabled: boolean;
  active: boolean;
  selected: boolean;
  elevated: boolean;
  compact: boolean;
  uppercase: boolean;
  iconOnly: boolean;
  className?: string;
  slotClass?: string; // from theme classNames.root
}

function buildClassName(cfg: ClassConfig): string {
  return cx(
    'btn',
    `btn--intent-${cfg.intent ?? 'primary'}`,
    `btn--appearance-${cfg.appearance ?? 'solid'}`,
    `btn--size-${cfg.size ?? 'md'}`,
    `btn--radius-${cfg.radius ?? 'md'}`,
    `btn--width-${cfg.width ?? 'auto'}`,
    cfg.loading && 'btn--loading',
    cfg.active && 'btn--active',
    cfg.selected && 'btn--selected',
    cfg.elevated && 'btn--elevated',
    cfg.compact && 'btn--compact',
    cfg.uppercase && 'btn--uppercase',
    cfg.iconOnly && 'btn--icon-only',
    cfg.className,
    cfg.slotClass,
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement, ButtonProps>(
  (ownProps, ref) => {
    // ── Merge theme defaultProps (instance props always win) ──
    const ctx = useContext(VyantraContext);
    const themeDefaults = ctx?.theme.components.Button?.defaultProps ?? {};
    const themeClassNames = ctx?.theme.components.Button?.classNames ?? {};

    const props: ButtonProps = { ...themeDefaults, ...ownProps };

    const {
      children,
      intent = 'primary',
      appearance = 'solid',
      size = 'md',
      radius = 'md',
      width = 'auto',
      startIcon,
      endIcon,
      iconOnly,
      slotStart,
      slotEnd,
      loading = false,
      loadingText,
      spinnerPlacement = 'start',
      spinner,
      disabled = false,
      active = false,
      selected = false,
      compact = false,
      elevated = false,
      uppercase = false,
      asChild = false,
      type = 'button',
      href,
      target,
      rel,
      as: Component,
      onClick,
      className,
      classNames: ownClassNames = {},
      ...rest
    } = props;

    // Merge theme-level classNames with per-instance classNames (instance wins)
    const classNames = { ...themeClassNames, ...ownClassNames };

    const isDisabled = disabled || loading;
    const internalRef = useRef<HTMLElement | null>(null);

    // ── Ripple click handler ──
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        if (internalRef.current) createRipple(event, internalRef.current);
        onClick?.(event as React.MouseEvent<HTMLButtonElement>);
      },
      [isDisabled, onClick],
    );

    // ── Computed root class ──
    const computedClass = buildClassName({
      intent,
      appearance,
      size,
      radius,
      width,
      loading,
      disabled: isDisabled,
      active,
      selected,
      elevated,
      compact,
      uppercase,
      iconOnly: !!iconOnly,
      className,
      slotClass: classNames.root,
    });

    // ── data-* attributes for CSS Module selectors ──
    const dataAttrs = {
      'data-intent': intent,
      'data-appearance': appearance,
      'data-size': size,
      'data-loading': loading || undefined,
      'data-disabled': isDisabled || undefined,
      'data-active': active || undefined,
      'data-selected': selected || undefined,
      'data-elevated': elevated || undefined,
    };

    // ── Shared ref handler ──
    const setRef = (node: HTMLElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    };

    // ── Spinner node ──
    const spinnerNode = (
      <span className={cx('btn__spinner', classNames.spinner)} aria-hidden="true">
        {spinner ?? <DefaultSpinner />}
      </span>
    );

    // ── Icon helper ──
    const renderIcon = (icon: React.ReactNode) => (
      <span className={cx('btn__icon', classNames.icon)} aria-hidden="true">
        {icon}
      </span>
    );

    // ── Content ──
    let content: React.ReactNode;

    if (iconOnly) {
      content = loading ? spinnerNode : renderIcon(iconOnly);
    } else {
      const startSlot =
        loading && spinnerPlacement === 'start'
          ? spinnerNode
          : startIcon
            ? renderIcon(startIcon)
            : null;

      const endSlot =
        loading && spinnerPlacement === 'end' ? spinnerNode : endIcon ? renderIcon(endIcon) : null;

      const label = loading && loadingText ? loadingText : children;

      content = (
        <>
          {slotStart && (
            <span className="btn__slot-start" aria-hidden="true">
              {slotStart}
            </span>
          )}
          {startSlot}
          {label != null && <span className={cx('btn__label', classNames.label)}>{label}</span>}
          {endSlot}
          {slotEnd && (
            <span className="btn__slot-end" aria-hidden="true">
              {slotEnd}
            </span>
          )}
        </>
      );
    }

    // ── Shared props ──
    const sharedProps = {
      className: computedClass,
      'aria-disabled': isDisabled || undefined,
      'aria-busy': loading || undefined,
      onClick: handleClick,
      ...dataAttrs,
      ...rest,
    };

    // ── 1. asChild ──
    if (asChild) {
      return (
        <Slot {...sharedProps} disabled={isDisabled} ref={setRef}>
          {children}
        </Slot>
      );
    }

    // ── 2. href → <a> ──
    if (href) {
      const anchorRel =
        target === '_blank' ? ['noreferrer', 'noopener', rel].filter(Boolean).join(' ') : rel;
      return (
        <a
          ref={setRef as React.Ref<HTMLAnchorElement>}
          href={isDisabled ? undefined : href}
          target={target}
          rel={anchorRel}
          role="button"
          tabIndex={isDisabled ? -1 : undefined}
          {...sharedProps}
        >
          {content}
        </a>
      );
    }

    // ── 3. as → polymorphic ──
    if (Component) {
      return (
        <Component ref={setRef} {...sharedProps} disabled={isDisabled}>
          {content}
        </Component>
      );
    }

    // ── 4. Default → <button> ──
    return (
      <button
        ref={setRef as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        {...sharedProps}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
