import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  ElementType,
  ComponentPropsWithRef,
  AriaAttributes,
} from 'react';

import type { ButtonSlot } from '@vyantra/tokens';

// ─── Variant types ────────────────────────────────────────────────────────────

export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type ButtonAppearance = 'solid' | 'outline' | 'ghost' | 'soft' | 'link';

export type ButtonSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ButtonRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ButtonWidth = 'auto' | 'full' | 'fit';

export type ButtonSpinnerPlacement = 'start' | 'end';

export type ButtonIconPosition = 'start' | 'end';

// Re-export slot type from tokens so consumers don't need two imports
export type { ButtonSlot };

// ─── Polymorphic helper ───────────────────────────────────────────────────────

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);
type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;

// ─── Core button props ────────────────────────────────────────────────────────

export interface ButtonBaseProps extends AriaAttributes {
  // ── Content ──
  children?: ReactNode;

  // ── Appearance ──
  /** @default 'primary' */ intent?: ButtonIntent;
  /** @default 'solid'   */ appearance?: ButtonAppearance;
  /** @default 'md'      */ size?: ButtonSize;
  /** @default 'md'      */ radius?: ButtonRadius;
  /** @default 'auto'    */ width?: ButtonWidth;

  // ── Icons ──
  /** Icon before the label */
  startIcon?: ReactNode;
  /** Icon after the label */
  endIcon?: ReactNode;
  /**
   * Icon-only button — children not rendered visually.
   * Always pair with aria-label.
   * @example <Button iconOnly={<TrashIcon />} aria-label="Delete" />
   */
  iconOnly?: ReactNode;

  // ── Slots ──
  /**
   * Content at the very start — before startIcon.
   * Good for badges, avatars, status dots.
   */
  slotStart?: ReactNode;
  /**
   * Content at the very end — after endIcon.
   * Good for keyboard shortcut hints, chevrons.
   */
  slotEnd?: ReactNode;

  // ── Loading ──
  /** @default false */ loading?: boolean;
  /** Label while loading — falls back to children */
  loadingText?: string;
  /** @default 'start' */ spinnerPlacement?: ButtonSpinnerPlacement;
  /** Custom spinner — replaces built-in SVG */
  spinner?: ReactNode;

  // ── State ──
  /** @default false */ disabled?: boolean;
  /** Toggle / pressed state @default false */ active?: boolean;
  /** Selection ring @default false */ selected?: boolean;

  // ── Layout ──
  /** Remove min-width @default false */ compact?: boolean;
  /** Drop shadow      @default false */ elevated?: boolean;
  /** Uppercase label  @default false */ uppercase?: boolean;

  // ── asChild ──
  /**
   * Merge button styles onto the single child element.
   * Use with router Link or any custom component.
   * @example
   * <Button asChild><Link to="/home">Home</Link></Button>
   */
  asChild?: boolean;

  // ── HTML ──
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  /** @default 'button' */ type?: 'button' | 'submit' | 'reset';

  /** Extra class on the root element */
  className?: string;

  /** eslint-disable-next-line @typescript-eslint/no-explicit-any */
  as?: ElementType | any;

  // ── Slot classNames ──
  /**
   * Apply CSS Module (or any) class names to individual slots.
   * Merged with Vyantra's own classes — your class is appended last.
   *
   * Available slots: root | label | icon | spinner
   *
   * @example
   * import classes from './MyButton.module.css';
   * <Button classNames={{ root: classes.root, label: classes.label }}>
   */
  classNames?: Partial<Record<ButtonSlot, string>>;
}

// ─── Final exported type ──────────────────────────────────────────────────────

export type ButtonProps = ButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'color' | 'type' | 'href' | 'target' | 'rel' | 'as' | keyof AriaAttributes
  >;

// ─── Polymorphic variant ──────────────────────────────────────────────────────

export type PolymorphicButtonProps<C extends ElementType = 'button'> = PolymorphicComponentProp<
  C,
  ButtonBaseProps
>;
