import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

export type Theme        = 'light' | 'dark';
export type ThemeMode    = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** The resolved theme currently applied to the DOM ('light' | 'dark') */
  theme: Theme;
  /** The user's selected preference ('light' | 'dark' | 'system') */
  mode: ThemeMode;
  /** Set preference */
  setMode: (mode: ThemeMode) => void;
  /** Quick toggle between light and dark */
  toggle: () => void;
  isDark: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'vyantra-theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): Theme {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Provider
// ─────────────────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Default mode on first load.
   * @default 'system'
   */
  defaultMode?: ThemeMode;
  /**
   * Element that receives the data-theme attribute.
   * @default document.documentElement
   */
  attribute?: string;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  attribute   = 'data-theme',
}: ThemeProviderProps) {
  // Read stored preference or use default
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? defaultMode;
  });

  const [theme, setTheme] = useState<Theme>(() => resolveTheme(mode));

  // Apply theme to <html> and persist
  const applyTheme = useCallback((m: ThemeMode) => {
    const resolved = resolveTheme(m);
    setTheme(resolved);
    document.documentElement.setAttribute(attribute, resolved);
    localStorage.setItem(STORAGE_KEY, m);
  }, [attribute]);

  // On mount — apply immediately and listen for system changes
  useEffect(() => {
    applyTheme(mode);

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (mode === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handleSystemChange);
    return () => mq.removeEventListener('change', handleSystemChange);
  }, [mode, applyTheme]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    applyTheme(m);
  }, [applyTheme]);

  const toggle = useCallback(() => {
    setMode(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, setMode, toggle, isDark: theme === 'dark' }),
    [theme, mode, setMode, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}