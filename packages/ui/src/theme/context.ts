// =============================================================================
//  VYANTRA — context.ts
//  Defines VyantraContextValue and VyantraContext.
//  Separate from ThemeProvider so components can useContext without
//  importing ThemeProvider (prevents circular dependency).
// =============================================================================

import { createContext } from 'react';
import type { ResolvedVyantraTheme } from '@vyantra/tokens';

// VyantraContextValue is defined HERE — the single source of truth.
// ThemeProvider imports it from here, not the other way around.
export interface VyantraContextValue {
  /** Fully resolved theme for the current scheme */
  theme: ResolvedVyantraTheme;
  /** Current scheme — always 'light' or 'dark', never 'system' */
  scheme: 'light' | 'dark';
  /** Raw user preference — may be 'system' */
  schemePreference: 'light' | 'dark' | 'system';
  /** Set preference + persist to localStorage */
  setScheme: (s: 'light' | 'dark' | 'system') => void;
  /** Toggle light ↔ dark */
  toggleScheme: () => void;
  /** true when following OS preference */
  isSystem: boolean;
}

export const VyantraContext = createContext<VyantraContextValue | null>(null);
