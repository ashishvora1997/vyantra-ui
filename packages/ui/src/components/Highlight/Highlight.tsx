import React from 'react';
import type { HighlightProps, HighlightChunk } from './Highlight.types';
import { cx } from '../../utils';
import './Highlight.css';

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildChunks(
  text: string,
  queries: HighlightChunk[],
  caseSensitive: boolean,
): { text: string; chunk?: HighlightChunk }[] {
  if (!queries.length) return [{ text }];

  const pattern = queries
    .map(q => `(${escapeRegex(q.query)})`)
    .join('|');
  const regex = new RegExp(pattern, caseSensitive ? 'g' : 'gi');

  const parts: { text: string; chunk?: HighlightChunk }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }
    const matched = match[0];
    const chunk = queries.find(q =>
      caseSensitive ? q.query === matched : q.query.toLowerCase() === matched.toLowerCase()
    );
    parts.push({ text: matched, chunk: chunk ?? { query: matched } });
    lastIndex = match.index + matched.length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

export const Highlight: React.FC<HighlightProps> = ({
  children,
  highlight,
  highlightColor,
  highlightTextColor,
  caseSensitive = false,
  as: Component = 'p',
  className,
  ...rest
}) => {
  const queries: HighlightChunk[] = Array.isArray(highlight)
    ? highlight.map(h => typeof h === 'string' ? { query: h } : h)
    : [{ query: highlight as string }];

  const validQueries = queries.filter(q => q.query.length > 0);
  const chunks = buildChunks(children, validQueries, caseSensitive);

  return (
    <Component className={cx('vyantra-highlight', className)} {...rest}>
      {chunks.map(({ text, chunk }, i) =>
        chunk ? (
          <mark
            key={i}
            className="vyantra-highlight__mark"
            style={{
              background: chunk.color ?? highlightColor ?? undefined,
              color: chunk.textColor ?? highlightTextColor ?? undefined,
            }}
          >
            {text}
          </mark>
        ) : (
          <React.Fragment key={i}>{text}</React.Fragment>
        )
      )}
    </Component>
  );
};

Highlight.displayName = 'Highlight';
export default Highlight;
