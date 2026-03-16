// =============================================================================
//  VYANTRA — themeToCSSVars.ts
//  Maps ResolvedVyantraTheme → flat Record<cssVarName, value>
//  ThemeProvider writes these to the DOM once per scheme change.
// =============================================================================

import type { ResolvedVyantraTheme, ResolvedColorRole } from '@vyantra/tokens';

export function themeToCSSVars(theme: ResolvedVyantraTheme): Record<string, string> {
  const vars: Record<string, string> = {};

  // ── Color scales: --vyantra-color-{name}-{shade} ──
  for (const [name, scale] of Object.entries(theme.colors)) {
    const entries = Object.entries(scale) as [string, string][];
    for (const [shade, value] of entries) {
      vars[`--vyantra-color-${name}-${shade}`] = value;
    }
  }

  // ── Resolved roles: --vyantra-color-{name}-{role} ──
  for (const [name, roles] of Object.entries(theme.resolved)) {
    const r = roles as ResolvedColorRole;
    vars[`--vyantra-color-${name}-base`]   = r.base;
    vars[`--vyantra-color-${name}-hover`]  = r.hover;
    vars[`--vyantra-color-${name}-active`] = r.active;
    vars[`--vyantra-color-${name}-subtle`] = r.subtle;
    vars[`--vyantra-color-${name}-muted`]  = r.muted;
    vars[`--vyantra-color-${name}-border`] = r.border;
    vars[`--vyantra-color-${name}-text`]   = r.text;
    vars[`--vyantra-color-${name}-on`]     = r.on;
  }

  // ── Surface ──
  vars['--vyantra-surface-bg']            = theme.surface.background;
  vars['--vyantra-surface-bg-subtle']     = theme.surface.backgroundSubtle;
  vars['--vyantra-surface-bg-muted']      = theme.surface.backgroundMuted;
  vars['--vyantra-surface-bg-emphasis']   = theme.surface.backgroundEmphasis;
  vars['--vyantra-surface-bg-inverse']    = theme.surface.backgroundInverse;
  vars['--vyantra-surface-border']        = theme.surface.border;
  vars['--vyantra-surface-border-strong'] = theme.surface.borderStrong;
  vars['--vyantra-surface-border-focus']  = theme.surface.borderFocus;
  vars['--vyantra-surface-overlay']       = theme.surface.overlay;

  // ── Text ──
  vars['--vyantra-text-primary']    = theme.text.primary;
  vars['--vyantra-text-secondary']  = theme.text.secondary;
  vars['--vyantra-text-tertiary']   = theme.text.tertiary;
  vars['--vyantra-text-disabled']   = theme.text.disabled;
  vars['--vyantra-text-inverse']    = theme.text.inverse;
  vars['--vyantra-text-link']       = theme.text.link;
  vars['--vyantra-text-link-hover'] = theme.text.linkHover;

  // ── Typography ──
  vars['--vyantra-font-family']      = theme.typography.fontFamily;
  vars['--vyantra-font-family-mono'] = theme.typography.fontFamilyMono;

  const fontSizeEntries = Object.entries(theme.typography.fontSize) as [string, string][];
  for (const [size, value] of fontSizeEntries) {
    vars[`--vyantra-font-size-${size}`] = value;
  }

  vars['--vyantra-font-weight-regular']  = String(theme.typography.fontWeight.regular);
  vars['--vyantra-font-weight-medium']   = String(theme.typography.fontWeight.medium);
  vars['--vyantra-font-weight-semibold'] = String(theme.typography.fontWeight.semibold);
  vars['--vyantra-font-weight-bold']     = String(theme.typography.fontWeight.bold);

  vars['--vyantra-leading-none']   = String(theme.typography.lineHeight.none);
  vars['--vyantra-leading-tight']  = String(theme.typography.lineHeight.tight);
  vars['--vyantra-leading-snug']   = String(theme.typography.lineHeight.snug);
  vars['--vyantra-leading-normal'] = String(theme.typography.lineHeight.normal);

  // ── Spacing ──
  const spacingMap: Record<string, string> = {
    '0.5': '0-5', '1.5': '1-5', '2.5': '2-5', '3.5': '3-5',
  };
  const spacingEntries = Object.entries(theme.spacing) as [string, string][];
  for (const [key, value] of spacingEntries) {
    const name = spacingMap[key] ?? key;
    vars[`--vyantra-spacing-${name}`] = value;
  }

  // ── Radius ──
  const radiusEntries = Object.entries(theme.radius) as [string, string][];
  for (const [size, value] of radiusEntries) {
    vars[`--vyantra-radius-${size}`] = value;
  }

  // ── Shadows ──
  const shadowEntries = Object.entries(theme.shadows) as [string, string][];
  for (const [size, value] of shadowEntries) {
    vars[`--vyantra-shadow-${size}`] = value;
  }

  // ── Motion ──
  const durationEntries = Object.entries(theme.motion.duration) as [string, string][];
  for (const [speed, value] of durationEntries) {
    vars[`--vyantra-duration-${speed}`] = value;
  }
  vars['--vyantra-ease-default'] = theme.motion.easing.default;
  vars['--vyantra-ease-out']     = theme.motion.easing.out;
  vars['--vyantra-ease-spring']  = theme.motion.easing.spring;

  return vars;
}

// ─── Component vars ───────────────────────────────────────────────────────────

export function resolveComponentVars(
  theme: ResolvedVyantraTheme,
  scheme: 'light' | 'dark',
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const override of Object.values(theme.components)) {
    if (override?.vars) {
      const componentVars = override.vars(theme, scheme);
      Object.assign(vars, componentVars);
    }
  }

  return vars;
}