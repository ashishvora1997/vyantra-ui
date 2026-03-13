import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

export type Theme     = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  theme:   Theme;
  mode:    ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle:  () => void;
  isDark:  boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'vyantra-theme';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): Theme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function ThemeProvider({ children, defaultMode = 'system' }: {
  children:    React.ReactNode;
  defaultMode?: ThemeMode;
}) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? defaultMode;
  });

  const [theme, setTheme] = useState<Theme>(() => resolveTheme(mode));

  const applyTheme = useCallback((m: ThemeMode) => {
    const resolved = resolveTheme(m);
    setTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    localStorage.setItem(STORAGE_KEY, m);
  }, []);

  useEffect(() => {
    applyTheme(mode);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (mode === 'system') applyTheme('system'); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}