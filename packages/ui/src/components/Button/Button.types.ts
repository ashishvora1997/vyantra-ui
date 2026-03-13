import type {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  ElementType,
  ComponentPropsWithRef,
  AriaAttributes,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  VARIANT UNION TYPES
//  Every accepted value is explicit — gives full IntelliSense autocomplete.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Semantic color intent of the button.
 *
 * | Value       | Use case                                  |
 * |-------------|-------------------------------------------|
 * | primary     | Main call-to-action                       |
 * | secondary   | Supporting action                         |
 * | neutral     | Tertiary / utility action                 |
 * | success     | Confirm / save / approve                  |
 * | warning     | Proceed with caution                      |
 * | danger      | Destructive / delete / irreversible       |
 * | info        | Informational / help                      |
 */
export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * Visual appearance / style of the button.
 *
 * | Value   | Description                                         |
 * |---------|-----------------------------------------------------|
 * | solid   | Filled background — high emphasis (default)         |
 * | outline | Transparent bg + intent-colored border              |
 * | ghost   | No background, no border — appears on hover only   |
 * | soft    | Light tinted background — medium emphasis           |
 * | link    | Looks like a hyperlink — lowest emphasis            |
 */
export type ButtonAppearance =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'soft'
  | 'link';

/**
 * Size of the button — controls height, padding, font-size, icon size, gap.
 *
 * | Value | Height | Font  | Padding  |
 * |-------|--------|-------|----------|
 * | 2xs   | 22px   | 11px  | 0 8px    |
 * | xs    | 26px   | 12px  | 0 10px   |
 * | sm    | 30px   | 13px  | 0 12px   |
 * | md    | 36px   | 14px  | 0 16px   |
 * | lg    | 42px   | 15px  | 0 20px   |
 * | xl    | 48px   | 16px  | 0 24px   |
 * | 2xl   | 56px   | 18px  | 0 32px   |
 */
export type ButtonSize =
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

/**
 * Border-radius shape of the button.
 *
 * | Value | Radius  |
 * |-------|---------|
 * | none  | 0px     |
 * | xs    | 2px     |
 * | sm    | 4px     |
 * | md    | 6px     |
 * | lg    | 8px     |
 * | xl    | 12px    |
 * | 2xl   | 16px    |
 * | full  | 9999px  |
 */
export type ButtonRadius =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'full';

/**
 * Width behaviour of the button.
 *
 * | Value | Behaviour                      |
 * |-------|-------------------------------|
 * | auto  | Shrinks to content (default)  |
 * | full  | Stretches to 100%             |
 * | fit   | min-content                   |
 */
export type ButtonWidth = 'auto' | 'full' | 'fit';

/** Where the loading spinner appears relative to the label. */
export type ButtonSpinnerPlacement = 'start' | 'end';

// ─────────────────────────────────────────────────────────────────────────────
//  POLYMORPHIC HELPER
//  Lets <Button as={RouterLink} to="/home"> work with full type safety.
// ─────────────────────────────────────────────────────────────────────────────

type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;

// ─────────────────────────────────────────────────────────────────────────────
//  CORE BUTTON PROPS  (independent of the root element)
// ─────────────────────────────────────────────────────────────────────────────

export interface ButtonBaseProps extends AriaAttributes {
  // ── Content ────────────────────────────────────────────────────────────────

  /** Button label or any React node. */
  children?: ReactNode;

  // ── Appearance ─────────────────────────────────────────────────────────────

  /**
   * Semantic color intent.
   * @default 'primary'
   */
  intent?: ButtonIntent;

  /**
   * Visual style / appearance.
   * @default 'solid'
   */
  appearance?: ButtonAppearance;

  /**
   * Button size — controls height, padding, font-size and icon size.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Border-radius shape.
   * @default 'md'
   */
  radius?: ButtonRadius;

  /**
   * Width behaviour.
   * @default 'auto'
   */
  width?: ButtonWidth;

  // ── Icons ──────────────────────────────────────────────────────────────────

  /**
   * Icon rendered **before** the label.
   * Pass any React node — works with any icon library.
   *
   * @example
   * startIcon={<SearchIcon />}
   * startIcon={<img src="icon.svg" alt="" />}
   */
  startIcon?: ReactNode;

  /**
   * Icon rendered **after** the label.
   *
   * @example
   * endIcon={<ArrowRightIcon />}
   */
  endIcon?: ReactNode;

  /**
   * Renders an **icon-only** button (equal width and height).
   * When used, `children` is NOT rendered visually — set `aria-label`
   * for accessibility.
   *
   * @example
   * <Button iconOnly={<TrashIcon />} aria-label="Delete item" />
   */
  iconOnly?: ReactNode;

  // ── Slots ──────────────────────────────────────────────────────────────────

  /**
   * **Start slot** — rendered at the very start of the button, before startIcon.
   * Useful for badges, avatars, status dots, keyboard shortcuts.
   *
   * @example
   * slotStart={<span className="badge">3</span>}
   */
  slotStart?: ReactNode;

  /**
   * **End slot** — rendered at the very end of the button, after endIcon.
   * Useful for badges, keyboard shortcut hints, chevrons.
   *
   * @example
   * slotEnd={<Kbd>⌘K</Kbd>}
   */
  slotEnd?: ReactNode;

  // ── Loading ────────────────────────────────────────────────────────────────

  /**
   * Puts the button in a loading state.
   * Shows a spinner and disables all interaction.
   * @default false
   */
  loading?: boolean;

  /**
   * Label displayed while `loading={true}`.
   * Falls back to `children` when not provided.
   *
   * @example
   * loadingText="Saving…"
   */
  loadingText?: string;

  /**
   * Where the spinner renders relative to the label.
   * @default 'start'
   */
  spinnerPlacement?: ButtonSpinnerPlacement;

  /**
   * Custom spinner node — replaces the built-in SVG spinner.
   *
   * @example
   * spinner={<MyCustomSpinner />}
   */
  spinner?: ReactNode;

  // ── State ──────────────────────────────────────────────────────────────────

  /**
   * Disables the button — adds visual + interaction disabled state.
   * @default false
   */
  disabled?: boolean;

  /**
   * Marks the button as active / pressed.
   * Useful for toggle buttons and selected toolbar items.
   * @default false
   */
  active?: boolean;

  /**
   * Marks the button as selected — adds a selection ring.
   * Useful for option groups.
   * @default false
   */
  selected?: boolean;

  // ── Layout modifiers ───────────────────────────────────────────────────────

  /**
   * Removes the minimum width constraint.
   * @default false
   */
  compact?: boolean;

  /**
   * Adds an elevation shadow to the button.
   * @default false
   */
  elevated?: boolean;

  /**
   * Applies uppercase letter-spacing to the label.
   * @default false
   */
  uppercase?: boolean;

  // ── asChild ────────────────────────────────────────────────────────────────

  /**
   * **asChild** pattern — merges Button props and styles onto its
   * single child element instead of rendering a `<button>`.
   *
   * Use this when you need to compose with a router link or any
   * custom component while keeping all button styling.
   *
   * @example
   * // React Router
   * <Button asChild>
   *   <Link to="/dashboard">Go to Dashboard</Link>
   * </Button>
   *
   * @example
   * // Next.js
   * <Button asChild>
   *   <NextLink href="/about">About</NextLink>
   * </Button>
   */
  asChild?: boolean;

  // ── HTML / Anchor ──────────────────────────────────────────────────────────

  /**
   * Renders the button as an `<a>` anchor tag.
   * Automatically adds `rel="noreferrer noopener"` when `target="_blank"`.
   */
  href?: string;

  /** Link target — only used with `href`. */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /** Link rel — merged with auto `noreferrer noopener` for `_blank`. */
  rel?: string;

  /**
   * HTML button type.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /** Additional class names merged onto the root element. */
  className?: string;

  // ── Polymorphic `as` prop ──────────────────────────────────────────────────

  /**
   * Render the button as a different element or component.
   * All native props of the target element are available with full type safety
   * via the `PolymorphicButtonProps<C>` helper type.
   *
   * For router links prefer `asChild` — it gives cleaner types.
   *
   * @example
   * <Button as="a" href="/home">Home</Button>
   * <Button as={RouterLink} to="/dashboard">Dashboard</Button>
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType | any;
}

// ─────────────────────────────────────────────────────────────────────────────
//  FINAL EXPORTED PROPS TYPE
//  Merges ButtonBaseProps with native button/anchor HTML attributes.
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonProps = ButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement> &
      AnchorHTMLAttributes<HTMLAnchorElement>,
    | 'children'
    | 'color'
    | 'type'
    | 'href'
    | 'target'
    | 'rel'
    | 'as'
    | keyof AriaAttributes
  >;

// ─────────────────────────────────────────────────────────────────────────────
//  POLYMORPHIC VARIANT  (for `as` prop usage)
// ─────────────────────────────────────────────────────────────────────────────

export type PolymorphicButtonProps<C extends ElementType = 'button'> =
  PolymorphicComponentProp<C, ButtonBaseProps>;