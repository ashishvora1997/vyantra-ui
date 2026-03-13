import React, {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
} from 'react';
import type { ButtonProps } from './Button.types';
import './Button.css';

// ─────────────────────────────────────────────────────────────────────────────
//  DEFAULT SPINNER
//  A simple SVG arc spinner — can be replaced via the `spinner` prop.
// ─────────────────────────────────────────────────────────────────────────────

const DefaultSpinner: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    {/* Static track */}
    <circle cx="12" cy="12" r="9" opacity={0.25} />
    {/* Spinning arc */}
    <path d="M12 3 a9 9 0 0 1 9 9" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
//  CLASS NAME BUILDER
//  Pure function — easier to test, keeps JSX clean.
// ─────────────────────────────────────────────────────────────────────────────

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
}

function buildClassName(cfg: ClassConfig): string {
  return [
    'btn',

    // Intent
    `btn--intent-${cfg.intent ?? 'primary'}`,

    // Appearance
    `btn--appearance-${cfg.appearance ?? 'solid'}`,

    // Size
    `btn--size-${cfg.size ?? 'md'}`,

    // Radius
    `btn--radius-${cfg.radius ?? 'md'}`,

    // Width
    `btn--width-${cfg.width ?? 'auto'}`,

    // Boolean modifiers
    cfg.loading && 'btn--loading',
    cfg.active && 'btn--active',
    cfg.selected && 'btn--selected',
    cfg.elevated && 'btn--elevated',
    cfg.compact && 'btn--compact',
    cfg.uppercase && 'btn--uppercase',
    cfg.iconOnly && 'btn--icon-only',

    // Consumer className last (highest specificity wins)
    cfg.className,
  ]
    .filter(Boolean)
    .join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
//  RIPPLE
// ─────────────────────────────────────────────────────────────────────────────

// function createRipple(
//   event: React.MouseEvent<HTMLElement>,
//   element: HTMLElement,
// ): void {
//   const rect   = element.getBoundingClientRect();
//   const ripple = document.createElement('span');
//   ripple.className = 'btn__ripple';
//   ripple.style.left = `${event.clientX - rect.left}px`;
//   ripple.style.top  = `${event.clientY - rect.top}px`;
//   element.appendChild(ripple);
//   ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
// }

function createRipple(event: React.MouseEvent<HTMLElement>, element: HTMLElement): void {
  const rect = element.getBoundingClientRect();

  const ripple = document.createElement('span');
  ripple.className = 'btn__ripple';

  const size = Math.max(rect.width, rect.height);

  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  element.appendChild(ripple);

  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

// ─────────────────────────────────────────────────────────────────────────────
//  SLOT HELPER  (asChild pattern)
//  Merges our computed className + aria attributes onto the child element.
// ─────────────────────────────────────────────────────────────────────────────

interface SlotProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  // Match React's Booleanish — boolean | "true" | "false"
  'aria-disabled'?: boolean | 'true' | 'false';
  'aria-busy'?: boolean | 'true' | 'false';
  onClick?: React.MouseEventHandler;
  // ref lives here so we avoid forwardRef wrapper type conflicts
  ref?: React.Ref<HTMLElement>;
  [key: string]: unknown;
}

/**
 * Plain function — no forwardRef wrapper needed.
 * Merges button className + all props onto the single child element.
 * ref is forwarded through cloneElement directly.
 */
function Slot({ children, ref, ...props }: SlotProps): React.ReactElement | null {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    console.warn('[Button] asChild requires exactly one valid React child element.');
    return null;
  }

  const childProps = child.props as Record<string, unknown>;

  // Merge classNames — child wins on conflicts for specificity
  const mergedClassName = [props.className, childProps.className].filter(Boolean).join(' ');

  return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
    ...props,
    ...childProps,
    ...(ref != null ? { ref } : {}),
    className: mergedClassName,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  BUTTON COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ## Button
 *
 * The foundational interactive element of the design system.
 *
 * ### Variants
 * - **intent** × **appearance** → 35 color combinations
 * - **size** → 7 height presets
 * - **radius** → 8 shape presets
 *
 * ### Icons
 * ```tsx
 * <Button startIcon={<SearchIcon />}>Search</Button>
 * <Button endIcon={<ArrowIcon />}>Next</Button>
 * <Button iconOnly={<SettingsIcon />} aria-label="Settings" />
 * ```
 *
 * ### Slots
 * ```tsx
 * <Button slotStart={<Avatar size="xs" />}>Profile</Button>
 * <Button slotEnd={<Kbd>⌘K</Kbd>}>Command</Button>
 * ```
 *
 * ### Loading
 * ```tsx
 * <Button loading loadingText="Saving…">Save</Button>
 * <Button loading spinner={<MySpinner />}>Save</Button>
 * ```
 *
 * ### asChild (router links, custom elements)
 * ```tsx
 * <Button asChild>
 *   <Link to="/dashboard">Dashboard</Link>
 * </Button>
 *
 * <Button asChild intent="danger">
 *   <NextLink href="/delete">Delete</NextLink>
 * </Button>
 * ```
 *
 * ### Anchor
 * ```tsx
 * <Button href="https://example.com" target="_blank">Open</Button>
 * ```
 *
 * ### Polymorphic
 * ```tsx
 * <Button as={RouterLink} to="/home">Home</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement | HTMLElement, ButtonProps>(
  (props, ref) => {
    const {
      // Content
      children,

      // Appearance
      intent = 'primary',
      appearance = 'solid',
      size = 'md',
      radius = 'md',
      width = 'auto',

      // Icons
      startIcon,
      endIcon,
      iconOnly,

      // Slots
      slotStart,
      slotEnd,

      // Loading
      loading = false,
      loadingText,
      spinnerPlacement = 'start',
      spinner,

      // State
      disabled = false,
      active = false,
      selected = false,

      // Modifiers
      compact = false,
      elevated = false,
      uppercase = false,

      // Patterns
      asChild = false,

      // HTML
      type = 'button',
      href,
      target,
      rel,

      // Polymorphic
      as: Component,

      // Events
      onClick,

      // Rest — `as` is already consumed above, won't appear here
      className,
      ...rest
    } = props;
    const internalRef = useRef<HTMLElement | null>(null);
    // ── Internal ref for ripple ──────────────────────────────────────────────
    const isDisabled = disabled || loading;

    // ── Click handler with ripple ────────────────────────────────────────────
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
        const el = internalRef.current;
        // const el = (ref as React.RefObject<HTMLElement>)?.current;
        if (el) createRipple(event, el);
        onClick?.(event as React.MouseEvent<HTMLButtonElement>);
      },
      [isDisabled, onClick],
    );

    // ── Class name ────────────────────────────────────────────────────────────
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
    });

    // ── Spinner node ──────────────────────────────────────────────────────────
    const spinnerNode = (
      <span className="btn__spinner" aria-hidden="true">
        {spinner ?? <DefaultSpinner />}
      </span>
    );

    // ── Render helpers ────────────────────────────────────────────────────────

    const renderIcon = (icon: React.ReactNode) => (
      <span className="btn__icon" aria-hidden="true">
        {icon}
      </span>
    );

    // ── Content assembly ──────────────────────────────────────────────────────
    let content: React.ReactNode;

    if (iconOnly) {
      // Icon-only — show spinner if loading, otherwise the icon
      content = loading ? spinnerNode : renderIcon(iconOnly);
    } else {
      // Determine start slot content
      const startContent =
        loading && spinnerPlacement === 'start'
          ? spinnerNode
          : startIcon
            ? renderIcon(startIcon)
            : null;

      // Determine end slot content
      const endContent =
        loading && spinnerPlacement === 'end' ? spinnerNode : endIcon ? renderIcon(endIcon) : null;

      // Label — show loadingText if provided and loading
      const label = loading && loadingText ? loadingText : children;

      content = (
        <>
          {/* slotStart — before startIcon */}
          {slotStart && (
            <span className="btn__slot-start" aria-hidden="true">
              {slotStart}
            </span>
          )}

          {startContent}

          {/* Label */}
          {label != null && <span className="btn__label">{label}</span>}

          {endContent}

          {/* slotEnd — after endIcon */}
          {slotEnd && (
            <span className="btn__slot-end" aria-hidden="true">
              {slotEnd}
            </span>
          )}
        </>
      );
    }

    // ── Shared props ──────────────────────────────────────────────────────────
    const sharedProps = {
      className: computedClass,
      'aria-disabled': isDisabled || undefined,
      'aria-busy': loading || undefined,
      onClick: handleClick,
      ...rest,
    };

    // ─────────────────────────────────────────────────────────────────────────
    //  1. asChild — merge onto child element
    // ─────────────────────────────────────────────────────────────────────────
    if (asChild) {
      return (
        <Slot
          {...sharedProps}
          disabled={isDisabled}
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<any>).current = node;
          }}
        >
          {children}
        </Slot>
      );
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  2. href — render as <a> anchor
    // ─────────────────────────────────────────────────────────────────────────
    if (href) {
      const anchorRel =
        target === '_blank' ? ['noreferrer', 'noopener', rel].filter(Boolean).join(' ') : rel;

      return (
        <a
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<any>).current = node;
          }}
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

    // ─────────────────────────────────────────────────────────────────────────
    //  3. as — polymorphic custom component
    // ─────────────────────────────────────────────────────────────────────────
    if (Component) {
      return (
        <Component
          ref={(node: any) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<any>).current = node;
          }}
          {...sharedProps}
          disabled={isDisabled}
        >
          {content}
        </Component>
      );
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  4. Default — <button>
    // ─────────────────────────────────────────────────────────────────────────
    return (
      <button
        // ref={ref as React.Ref<HTMLButtonElement>}
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<any>).current = node;
        }}
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
