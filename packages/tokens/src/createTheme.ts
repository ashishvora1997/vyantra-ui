// =============================================================================
//  VYANTRA — createTheme.ts
// =============================================================================

import {
  defaultColors,
  defaultColorMapping,
  defaultTypography,
  defaultSpacing,
  defaultRadius,
  defaultShadows,
  defaultMotion,
  defaultSurfaceLight,
  defaultSurfaceDark,
  defaultTextLight,
  defaultTextDark,
} from './defaultTheme';

import type {
  CreateThemeInput,
  ColorScale,
  ColorRoleMapping,
  ResolvedVyantraTheme,
  ResolvedColorRole,
  ThemeComponents,
  ThemeTypography,
  ThemeRadius,
  ThemeShadows,
} from './theme.types';

// ─── VyantraThemeConfig ───────────────────────────────────────────────────────

export interface VyantraThemeConfig {
  _type:        'VyantraThemeConfig';
  scheme:       'light' | 'dark' | 'system';
  colors:       Record<string, ColorScale>;
  colorMapping: Record<string, ColorRoleMapping>;
  typography:   ThemeTypography;
  spacing:      typeof defaultSpacing;
  radius:       ThemeRadius;
  shadows:      ThemeShadows;
  motion:       typeof defaultMotion;
  components:   ThemeComponents;
  other:        Record<string, unknown>;
}

// ─── createTheme ─────────────────────────────────────────────────────────────

export function createTheme(input: CreateThemeInput = {}): VyantraThemeConfig {

  // ── 1. Colors ──
  const mergedColors: Record<string, ColorScale> = { ...defaultColors };

  if (input.colors) {
    for (const [name, scale] of Object.entries(input.colors)) {
      if (name in mergedColors) {
        mergedColors[name] = { ...mergedColors[name], ...scale } as ColorScale;
      } else {
        mergedColors[name] = {
          50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb',
          300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280',
          600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827',
          ...scale,
        } as ColorScale;
      }
    }
  }

  // ── 2. Color role mapping ──
  const mergedMapping: Record<string, ColorRoleMapping> = { ...defaultColorMapping };

  if (input.colorMapping) {
    for (const [name, mapping] of Object.entries(input.colorMapping)) {
      const base = mergedMapping[name] ?? defaultColorMapping['primary']!;
      mergedMapping[name] = { ...base, ...mapping } as ColorRoleMapping;
    }
  }

  for (const name of Object.keys(mergedColors)) {
    if (!(name in mergedMapping)) {
      mergedMapping[name] = { ...defaultColorMapping['primary']! };
    }
  }

  // ── 3. Typography ──
  const mergedTypography: ThemeTypography = input.typography
    ? { ...defaultTypography, ...input.typography }
    : defaultTypography;

  // ── 4. Radius ──
  const mergedRadius: ThemeRadius = input.radius
    ? { ...defaultRadius, ...input.radius }
    : defaultRadius;

  // ── 5. Shadows ──
  const mergedShadows: ThemeShadows = input.shadows
    ? { ...defaultShadows, ...input.shadows }
    : defaultShadows;

  return {
    _type:        'VyantraThemeConfig',
    scheme:       input.scheme ?? 'system',
    colors:       mergedColors,
    colorMapping: mergedMapping,
    typography:   mergedTypography,
    spacing:      defaultSpacing,
    radius:       mergedRadius,
    shadows:      mergedShadows,
    motion:       defaultMotion,
    components:   input.components ?? {},
    other:        input.other ?? {},
  };
}

// ─── resolveTheme ─────────────────────────────────────────────────────────────

export function resolveTheme(
  config: VyantraThemeConfig,
  scheme: 'light' | 'dark',
): ResolvedVyantraTheme {

  const resolved: Record<string, ResolvedColorRole> = {};

  for (const [name, scale] of Object.entries(config.colors)) {
    const mapping = config.colorMapping[name] ?? defaultColorMapping['primary']!;

    const getShade = (key: keyof ColorRoleMapping): string => {
      const val = mapping[key];
      if (val === 'white') return '#ffffff';
      if (val === 'black') return '#000000';
      return scale[val as keyof ColorScale] ?? '#000000';
    };

    resolved[name] = {
      base:   getShade('base'),
      hover:  getShade('hover'),
      active: getShade('active'),
      subtle: getShade('subtle'),
      muted:  getShade('muted'),
      border: getShade('border'),
      text:   getShade('text'),
      on:     getShade('on'),
    };
  }

  const surface = scheme === 'dark' ? defaultSurfaceDark : defaultSurfaceLight;
  const text    = scheme === 'dark' ? defaultTextDark    : defaultTextLight;

  return {
    scheme,
    colors:     config.colors,
    resolved,
    surface,
    text,
    typography: config.typography,
    spacing:    config.spacing,
    radius:     config.radius,
    shadows:    config.shadows,
    motion:     config.motion,
    components: config.components,
    other:      config.other,
  };
}