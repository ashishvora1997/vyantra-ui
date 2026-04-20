import type { HTMLAttributes } from 'react';

export interface HighlightChunk {
  /** Text to highlight */
  query: string;
  /** Highlight color — any CSS color or token. @default 'var(--vyantra-color-warning-subtle)' */
  color?: string;
  /** Text color on highlighted segment. */
  textColor?: string;
}

export interface HighlightProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Full text to display.
   */
  children: string;

  /**
   * Substring(s) to highlight.
   * String → single highlight with default color.
   * HighlightChunk[] → multiple highlights with individual colors.
   */
  highlight: string | string[] | HighlightChunk[];

  /** Default highlight background color. @default 'var(--vyantra-color-warning-subtle)' */
  highlightColor?: string;

  /** Default highlight text color. */
  highlightTextColor?: string;

  /** Case-sensitive matching. @default false */
  caseSensitive?: boolean;

  /** HTML element to render as. @default 'p' */
  as?: React.ElementType;

  className?: string;
}
