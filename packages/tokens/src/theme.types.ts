// =============================================================================
//  VYANTRA — theme.types.ts
//  All TypeScript interfaces for the theme system.
//  Lives in @vyantra/tokens — no React dependency here.
// =============================================================================

// ─── Color scale (50–900) ─────────────────────────────────────────────────────

export interface ColorScale {
  50:  string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export type PartialColorScale = Partial<ColorScale>;

// ─── Color role mapping ───────────────────────────────────────────────────────

export interface ColorRoleMapping {
  base:   keyof ColorScale;
  hover:  keyof ColorScale;
  active: keyof ColorScale;
  subtle: keyof ColorScale;
  muted:  keyof ColorScale;
  border: keyof ColorScale;
  text:   keyof ColorScale;
  on:     keyof ColorScale | 'white' | 'black';
}

export type PartialColorRoleMapping = Partial<ColorRoleMapping>;

// ─── Typography ───────────────────────────────────────────────────────────────

export interface ThemeFontSize {
  '2xs': string;
  xs:    string;
  sm:    string;
  md:    string;
  lg:    string;
  xl:    string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeFontWeight {
  regular:  number;
  medium:   number;
  semibold: number;
  bold:     number;
}

export interface ThemeLineHeight {
  none:   number;
  tight:  number;
  snug:   number;
  normal: number;
}

export interface ThemeTypography {
  fontFamily:     string;
  fontFamilyMono: string;
  fontSize:   ThemeFontSize;
  fontWeight: ThemeFontWeight;
  lineHeight: ThemeLineHeight;
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

export interface ThemeSpacing {
  px:    string;
  0:     string;
  '0.5': string;
  1:     string;
  '1.5': string;
  2:     string;
  '2.5': string;
  3:     string;
  '3.5': string;
  4:     string;
  5:     string;
  6:     string;
  7:     string;
  8:     string;
  10:    string;
  12:    string;
  16:    string;
  20:    string;
}

// ─── Radius ───────────────────────────────────────────────────────────────────

export interface ThemeRadius {
  none:  string;
  xs:    string;
  sm:    string;
  md:    string;
  lg:    string;
  xl:    string;
  '2xl': string;
  full:  string;
}

// ─── Shadows ──────────────────────────────────────────────────────────────────

export interface ThemeShadows {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

// ─── Motion ───────────────────────────────────────────────────────────────────

export interface ThemeMotionDuration {
  fast:   string;
  normal: string;
  slow:   string;
  slower: string;
}

export interface ThemeMotionEasing {
  default: string;
  out:     string;
  spring:  string;
}

export interface ThemeMotion {
  duration: ThemeMotionDuration;
  easing:   ThemeMotionEasing;
}

// ─── Surface ─────────────────────────────────────────────────────────────────

export interface ThemeSurface {
  background:         string;
  backgroundSubtle:   string;
  backgroundMuted:    string;
  backgroundEmphasis: string;
  backgroundInverse:  string;
  border:             string;
  borderStrong:       string;
  borderFocus:        string;
  overlay:            string;
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export interface ThemeText {
  primary:   string;
  secondary: string;
  tertiary:  string;
  disabled:  string;
  inverse:   string;
  link:      string;
  linkHover: string;
}

// ─── Resolved color role ──────────────────────────────────────────────────────

export interface ResolvedColorRole {
  base:   string;
  hover:  string;
  active: string;
  subtle: string;
  muted:  string;
  border: string;
  text:   string;
  on:     string;
}

// ─── Component overrides ──────────────────────────────────────────────────────
// ThemeComponents is defined here WITHOUT importing ButtonProps from @vyantra/ui.
// ButtonProps is kept in @vyantra/ui to avoid a circular dependency:
//   tokens → ui → tokens would be a cycle.
// Components reference their own slot strings directly.

export type ButtonSlot = 'root' | 'label' | 'icon' | 'spinner';

// Generic component override shape — each component in @vyantra/ui
// reads this from the resolved theme context.
export interface ComponentOverrideBase<Slots extends string> {
  /** Override default props for every instance */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultProps?: Record<string, any>;

  /**
   * Write CSS variables for this component onto the DOM.
   * These are read by the component's CSS for all pseudo-selectors.
   * Receives the fully-resolved theme + current scheme.
   */
  vars?: (
    token: ResolvedVyantraTheme,
    scheme: 'light' | 'dark',
  ) => Record<string, string>;

  /** CSS Module class names applied to named slots */
  classNames?: Partial<Record<Slots, string>>;
}

export interface ThemeComponents {
  Button?: ComponentOverrideBase<ButtonSlot>;
  // Future: Input, Badge, Card, Modal, etc.
}

// ─── Full resolved theme ──────────────────────────────────────────────────────

export interface ResolvedVyantraTheme {
  /** Currently applied scheme — always 'light' or 'dark' */
  scheme: 'light' | 'dark';

  /** Full color scales (50–900) for every intent + user-defined colors */
  colors: Record<string, ColorScale>;

  /** Pre-resolved semantic role values per intent */
  resolved: Record<string, ResolvedColorRole>;

  /** Surface / background / border tokens for current scheme */
  surface: ThemeSurface;

  /** Text color tokens for current scheme */
  text: ThemeText;

  typography: ThemeTypography;
  spacing:    ThemeSpacing;
  radius:     ThemeRadius;
  shadows:    ThemeShadows;
  motion:     ThemeMotion;
  components: ThemeComponents;
  other:      Record<string, unknown>;
}

// ─── createTheme input ────────────────────────────────────────────────────────

export interface CreateThemeInput {
  scheme?:       'light' | 'dark' | 'system';
  colors?:       Record<string, PartialColorScale>;
  colorMapping?: Partial<Record<string, PartialColorRoleMapping>>;
  typography?:   Partial<Pick<ThemeTypography, 'fontFamily' | 'fontFamilyMono'>>;
  radius?:       Partial<ThemeRadius>;
  shadows?:      Partial<ThemeShadows>;
  components?:   ThemeComponents;
  other?:        Record<string, unknown>;
}