// =============================================================================
//  @vyantra/ui/theme — public exports
//  Import from here for all theming needs:
//
//  import { ThemeProvider, createTheme, useTheme, useScheme } from '@vyantra/ui/theme';
//  import type { CreateThemeInput, ResolvedVyantraTheme }      from '@vyantra/ui/theme';
// =============================================================================

// ─── Provider + hooks ────────────────────────────────────────────────────────
export { ThemeProvider, useVyantra, useTheme, useScheme } from './ThemeProvider';
export type { ThemeProviderProps, VyantraContextValue }   from './ThemeProvider';

// ─── createStyles ─────────────────────────────────────────────────────────────
export { createStyles } from './createStyles';

// ─── Context (for advanced use — reading theme in your own components) ───────
export { VyantraContext } from './context';

// ─── createTheme + resolveTheme (re-exported from @vyantra/tokens) ───────────
export { createTheme, resolveTheme } from '@vyantra/tokens';
export type { VyantraThemeConfig }   from '@vyantra/tokens';

// ─── All theme types (re-exported from @vyantra/tokens) ──────────────────────
export type {
  CreateThemeInput,
  ResolvedVyantraTheme,
  ColorScale,
  PartialColorScale,
  ColorRoleMapping,
  PartialColorRoleMapping,
  ThemeTypography,
  ThemeFontSize,
  ThemeFontWeight,
  ThemeLineHeight,
  ThemeSpacing,
  ThemeRadius,
  ThemeShadows,
  ThemeMotion,
  ThemeMotionDuration,
  ThemeMotionEasing,
  ThemeSurface,
  ThemeText,
  ResolvedColorRole,
  ThemeComponents,
  ComponentOverrideBase,
  ButtonSlot,
} from '@vyantra/tokens';