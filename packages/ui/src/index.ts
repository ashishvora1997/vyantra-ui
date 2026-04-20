// =============================================================================
//  @vyantra/ui — components only
//
//  For theming, use the dedicated subpath:
//  import { ThemeProvider, createTheme } from '@vyantra/ui/theme';
// =============================================================================

// ─── Components ────────────────────────────────────────────────────
export * from './components';

// ─── Shared utilities ─────────────────────────────────────────────────────────
// cx and createRipple are exported so users can build their own components
// that follow the same patterns (e.g. ripple effect on custom buttons).
// ─── Utilities ────────────────────────────────────────────────────────────────
export { cx, createRipple } from './utils';

// Future components will be added here:
// export { Input }    from './components/Input';
// export { Badge }    from './components/Badge';
// export { Checkbox } from './components/Checkbox';