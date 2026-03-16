// =============================================================================
//  VYANTRA — defaultTheme.ts
//  Complete default theme values — light + dark
//  Users only override what they need; everything else comes from here.
// =============================================================================

import type {
  ColorScale,
  ColorRoleMapping,
  ThemeTypography,
  ThemeSpacing,
  ThemeRadius,
  ThemeShadows,
  ThemeMotion,
  ThemeSurface,
  ThemeText,
} from './theme.types';

// ─── Primitive color palettes ─────────────────────────────────────────────────

export const defaultColors: Record<string, ColorScale> = {
  primary: {
    50:  '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50:  '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  neutral: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50:  '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  danger: {
    50:  '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  info: {
    50:  '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
};

// ─── Default color role mapping ───────────────────────────────────────────────
// Which shade from a ColorScale maps to each semantic role

export const defaultColorMapping: Record<string, ColorRoleMapping> = {
  primary:   { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
  secondary: { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
  neutral:   { base:700, hover:800, active:900, subtle:50,  muted:100, border:200, text:700, on:'white' },
  success:   { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
  warning:   { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
  danger:    { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
  info:      { base:600, hover:700, active:800, subtle:50,  muted:100, border:200, text:700, on:'white' },
};

// ─── Typography ───────────────────────────────────────────────────────────────

export const defaultTypography: ThemeTypography = {
  fontFamily:     "'Geist', system-ui, -apple-system, sans-serif",
  fontFamilyMono: "'Geist Mono', 'JetBrains Mono', monospace",
  fontSize: {
    '2xs': '0.625rem',
    xs:    '0.75rem',
    sm:    '0.875rem',
    md:    '1rem',
    lg:    '1.125rem',
    xl:    '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },
  lineHeight: {
    none:   1,
    tight:  1.25,
    snug:   1.375,
    normal: 1.5,
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const defaultSpacing: ThemeSpacing = {
  px:    '1px',
  0:     '0px',
  '0.5': '2px',
  1:     '4px',
  '1.5': '6px',
  2:     '8px',
  '2.5': '10px',
  3:     '12px',
  '3.5': '14px',
  4:     '16px',
  5:     '20px',
  6:     '24px',
  7:     '28px',
  8:     '32px',
  10:    '40px',
  12:    '48px',
  16:    '64px',
  20:    '80px',
};

// ─── Radius ───────────────────────────────────────────────────────────────────

export const defaultRadius: ThemeRadius = {
  none:  '0px',
  xs:    '2px',
  sm:    '4px',
  md:    '6px',
  lg:    '8px',
  xl:    '12px',
  '2xl': '16px',
  full:  '9999px',
};

// ─── Shadows ──────────────────────────────────────────────────────────────────

export const defaultShadows: ThemeShadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};

// ─── Motion ───────────────────────────────────────────────────────────────────

export const defaultMotion: ThemeMotion = {
  duration: {
    fast:   '100ms',
    normal: '150ms',
    slow:   '200ms',
    slower: '300ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    out:     'cubic-bezier(0, 0, 0.2, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// ─── Surface tokens ───────────────────────────────────────────────────────────

export const defaultSurfaceLight: ThemeSurface = {
  background:         '#ffffff',
  backgroundSubtle:   '#f9fafb',
  backgroundMuted:    '#f3f4f6',
  backgroundEmphasis: '#e5e7eb',
  backgroundInverse:  '#111827',
  border:             '#e5e7eb',
  borderStrong:       '#d1d5db',
  borderFocus:        '#3b82f6',
  overlay:            'rgba(0,0,0,0.4)',
};

export const defaultSurfaceDark: ThemeSurface = {
  background:         '#0c0d11',
  backgroundSubtle:   '#111318',
  backgroundMuted:    '#181920',
  backgroundEmphasis: '#1f2029',
  backgroundInverse:  '#f0f1f5',
  border:             'rgba(255,255,255,0.07)',
  borderStrong:       'rgba(255,255,255,0.13)',
  borderFocus:        '#60a5fa',
  overlay:            'rgba(0,0,0,0.65)',
};

// ─── Text tokens ──────────────────────────────────────────────────────────────

export const defaultTextLight: ThemeText = {
  primary:   '#111827',
  secondary: '#4b5563',
  tertiary:  '#6b7280',
  disabled:  '#9ca3af',
  inverse:   '#ffffff',
  link:      '#2563eb',
  linkHover: '#1d4ed8',
};

export const defaultTextDark: ThemeText = {
  primary:   '#ecedf2',
  secondary: '#9399a8',
  tertiary:  '#585e6e',
  disabled:  '#383d4a',
  inverse:   '#0c0d11',
  link:      '#60a5fa',
  linkHover: '#93c5fd',
};