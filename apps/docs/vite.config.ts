import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  resolve: {
    // alias: {
    //   // Point to source — Vite processes CSS and TS directly, gives HMR
    //   '@vyantra/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    //   '@vyantra/ui/theme': path.resolve(__dirname, '../../packages/ui/src/theme/index.ts'),
    //   '@vyantra/tokens': path.resolve(__dirname, '../../packages/tokens/src/index.ts'),
    //   // Point CSS import directly at the tokens.css source file
    //   '@vyantra/tokens/src/tokens.css': path.resolve(
    //     __dirname,
    //     '../../packages/tokens/src/tokens.css',
    //   ),
    // },
    alias: [
      // ── Order matters — more specific entries FIRST ──────────────────────
      //
      // 1. @vyantra/ui/theme  →  packages/ui/src/theme/index.ts
      //    Must come BEFORE the bare @vyantra/ui alias below,
      //    otherwise Vite matches the shorter prefix first and appends
      //    "/theme" to index.ts (which is a file, not a directory → ENOTDIR).
      {
        find: '@vyantra/ui/theme',
        replacement: r('../../packages/ui/src/theme/index.ts'),
      },

      // 2. @vyantra/ui/styles  →  packages/ui/src/styles/index.css
      { find: '@vyantra/ui/styles', replacement: r('../../packages/ui/src/styles/index.css') },

      // 3. @vyantra/ui  →  packages/ui/src/index.ts
      {
        find: '@vyantra/ui',
        replacement: r('../../packages/ui/src/index.ts'),
      },

      // 4. @vyantra/tokens/css  →  packages/tokens/src/tokens.css
      { find: '@vyantra/tokens/css', replacement: r('../../packages/tokens/src/tokens.css') },

      // 5. @vyantra/tokens  →  packages/tokens/src/index.ts  (JS only)
      {
        find: '@vyantra/tokens',
        replacement: r('../../packages/tokens/src/index.ts'),
      },
    ],
  },
  css: {
    // Let Vite handle @import in CSS natively
    preprocessorOptions: {},
  },
});
