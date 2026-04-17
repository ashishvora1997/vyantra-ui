// =============================================================================
//  VYANTRA — ThemeProvider.tsx
//  Writes all CSS vars to DOM, manages scheme, provides context.
// =============================================================================

import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ResolvedVyantraTheme } from '@vyantra/tokens';
import type { VyantraThemeConfig } from '@vyantra/tokens';
import { createTheme, resolveTheme } from '@vyantra/tokens';

// VyantraContextValue is defined in context.ts — import from there
import { VyantraContext, type VyantraContextValue } from './context';
import { themeToCSSVars, resolveComponentVars } from './themeToCSSVars';

// Re-export so consumers can import from either place
export type { VyantraContextValue } from './context';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Pass the result of createTheme() here.
   * Omitting uses Vyantra's built-in defaults.
   */
  theme?: VyantraThemeConfig;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'vyantra-scheme';

function getOSScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveScheme(pref: 'light' | 'dark' | 'system'): 'light' | 'dark' {
  return pref === 'system' ? getOSScheme() : pref;
}

// ─── ThemeProvider ────────────────────────────────────────────────────────────

export function ThemeProvider({ children, theme: themeProp }: ThemeProviderProps) {
  const config = useMemo(() => themeProp ?? createTheme(), [themeProp]);

  const [schemePref, setSchemePref] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window === 'undefined') return config.scheme;
    return (
      (localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | 'system' | null) ?? config.scheme
    );
  });

  const [scheme, setSchemeResolved] = useState<'light' | 'dark'>(() => resolveScheme(schemePref));

  const resolvedTheme = useMemo<ResolvedVyantraTheme>(
    () => resolveTheme(config, scheme),
    [config, scheme],
  );

  const rootRef = useRef<HTMLDivElement>(null);

  // Write CSS vars before paint — prevents FOUC
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const tokenVars = themeToCSSVars(resolvedTheme);
    for (const [k, v] of Object.entries(tokenVars)) {
      el.style.setProperty(k, v);
    }

    const componentVars = resolveComponentVars(resolvedTheme, scheme);
    for (const [k, v] of Object.entries(componentVars)) {
      el.style.setProperty(k, v);
    }

    el.setAttribute('data-theme', scheme);
    document.documentElement.setAttribute('data-theme', scheme);
  }, [resolvedTheme, scheme]);

  // Follow OS when preference is 'system'
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (schemePref === 'system') setSchemeResolved(getOSScheme());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [schemePref]);

  const setScheme = useCallback((pref: 'light' | 'dark' | 'system') => {
    setSchemePref(pref);
    setSchemeResolved(resolveScheme(pref));
    localStorage.setItem(STORAGE_KEY, pref);
  }, []);

  const toggleScheme = useCallback(() => {
    setScheme(scheme === 'dark' ? 'light' : 'dark');
  }, [scheme, setScheme]);

  const value = useMemo<VyantraContextValue>(
    () => ({
      theme: resolvedTheme,
      scheme,
      schemePreference: schemePref,
      setScheme,
      toggleScheme,
      isSystem: schemePref === 'system',
    }),
    [resolvedTheme, scheme, schemePref, setScheme, toggleScheme],
  );

  return (
    <VyantraContext.Provider value={value}>
      {/* display:contents — wrapper doesn't affect layout, CSS vars are inherited */}
      <div ref={rootRef} style={{ display: 'contents' }}>
        {children}
      </div>
    </VyantraContext.Provider>
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Access the full Vyantra context — theme, scheme, controls.
 * Must be used inside <ThemeProvider>.
 */
export function useVyantra(): VyantraContextValue {
  const ctx = useContext(VyantraContext);
  if (!ctx) throw new Error('[Vyantra] useVyantra must be used inside <ThemeProvider>');
  return ctx;
}

/**
 * Access just the resolved theme object.
 * @example
 * const token = useTheme();
 * token.colors.primary[600]   // '#e11d48'
 * token.surface.background    // resolved for current scheme
 */
export function useTheme(): ResolvedVyantraTheme {
  return useVyantra().theme;
}

/**
 * Access and control the color scheme.
 * @example
 * const { scheme, toggleScheme, setScheme, isSystem } = useScheme();
 */
export function useScheme() {
  const { scheme, schemePreference, setScheme, toggleScheme, isSystem } = useVyantra();
  return { scheme, schemePreference, setScheme, toggleScheme, isSystem };
}
