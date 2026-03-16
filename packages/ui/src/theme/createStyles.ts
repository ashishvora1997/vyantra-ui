// =============================================================================
//  VYANTRA — createStyles.ts
//  Thin hook factory. No CSS-in-JS engine. No runtime stylesheet injection.
//  Returns plain React.CSSProperties objects — works on any element.
//
//  For pseudo-selectors (:hover, :focus etc.) in YOUR components:
//  → Use CSS Modules and reference --vyantra-* CSS variables inside them.
//
//  createStyles is for dynamic values that depend on the current theme/scheme.
// =============================================================================

import { useMemo }          from 'react';
import { useTheme, useScheme } from './ThemeProvider';
import type { ResolvedVyantraTheme } from '@vyantra/tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

type StyleRecord = Record<string, React.CSSProperties>;

type StyleFactory<T extends StyleRecord> = (
  token:  ResolvedVyantraTheme,
  scheme: 'light' | 'dark',
) => T;

interface UseStylesResult<T extends StyleRecord> {
  /** Plain React.CSSProperties objects — pass to style={} prop */
  styles: T;
  /** Full resolved theme — for extra logic in JSX */
  theme:  ResolvedVyantraTheme;
  /** Current scheme — 'light' | 'dark' */
  scheme: 'light' | 'dark';
}

// ─── createStyles ─────────────────────────────────────────────────────────────

/**
 * Factory that creates a typed `useStyles` hook.
 * The factory function receives the resolved theme and current scheme.
 * Returns plain style objects — no CSS-in-JS, no classNames, no injection.
 *
 * For pseudo-selectors, use CSS Modules with --vyantra-* vars instead.
 *
 * @example
 * const useCardStyles = createStyles((token, scheme) => ({
 *   card: {
 *     background:   token.surface.background,
 *     border:       `1px solid ${token.surface.border}`,
 *     borderRadius: token.radius.lg,
 *     padding:      token.spacing[6],
 *   },
 *   title: {
 *     color:      token.text.primary,
 *     fontWeight: String(token.typography.fontWeight.semibold),
 *   },
 *   badge: {
 *     background: scheme === 'dark'
 *       ? token.colors.brand?.[800] ?? token.colors.primary[800]
 *       : token.colors.brand?.[100] ?? token.colors.primary[100],
 *   },
 * }));
 *
 * // In your component:
 * const { styles, theme, scheme } = useCardStyles();
 * <div style={styles.card}>
 *   <h2 style={styles.title}>Hello</h2>
 * </div>
 */
export function createStyles<T extends StyleRecord>(
  factory: StyleFactory<T>,
): () => UseStylesResult<T> {

  return function useStyles(): UseStylesResult<T> {
    const theme  = useTheme();
    const { scheme } = useScheme();

    // Recompute only when theme or scheme changes
    const styles = useMemo(
      () => factory(theme, scheme),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [theme, scheme],
    );

    return { styles, theme, scheme };
  };
}