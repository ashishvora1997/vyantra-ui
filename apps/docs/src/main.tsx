import React from 'react';
import { createRoot } from 'react-dom/client';
// Load design tokens FIRST — all CSS custom properties must exist before
// any component CSS references them. Vite handles .css imports in JS natively.
// import '../../../packages/tokens/src/tokens.css';
// One import loads both design tokens CSS vars AND all component styles.
// No need for a separate @vyantra/tokens/css import.
import '@vyantra/ui/styles';
import App from './App';

const root = document.getElementById('root')!;
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);