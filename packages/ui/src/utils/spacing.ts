/**
 * Convert spacing value to CSS value
 * Supports: number (converts to px), string with units, CSS variables
 */
export function toSpacing(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  // if (typeof value === 'number') return `var(--vyantra-spacing-${value})`;
  return value;
}

/**
 * Parse spacing props and convert to CSS properties
 */
export interface SpacingProps {
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
}

export function parseSpacingProps(props: SpacingProps) {
  const { m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py } = props;

  const raw = {
    margin: toSpacing(m),
    marginTop: toSpacing(mt ?? my),
    marginRight: toSpacing(mr ?? mx),
    marginBottom: toSpacing(mb ?? my),
    marginLeft: toSpacing(ml ?? mx),
    padding: toSpacing(p),
    paddingTop: toSpacing(pt ?? py),
    paddingRight: toSpacing(pr ?? px),
    paddingBottom: toSpacing(pb ?? py),
    paddingLeft: toSpacing(pl ?? px),
  };

  // Only return keys that have an actual value
  return Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as React.CSSProperties;
}

/**
 * Gap props interface
 */
export interface GapProps {
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
}

/**
 * Parse gap props efficiently
 * Uses shorthand when possible, expands only when needed
 */
export function parseGapProps(props: GapProps): React.CSSProperties {
  const { gap, rowGap, columnGap } = props;

  // Use shorthand if only gap is provided
  if (gap !== undefined && rowGap === undefined && columnGap === undefined) {
    return { gap: toSpacing(gap) };
  }

  // Expand to individual properties
  const resolvedRowGap = rowGap ?? gap;
  const resolvedColumnGap = columnGap ?? gap;

  return {
    ...(resolvedRowGap !== undefined && { rowGap: toSpacing(resolvedRowGap) }),
    ...(resolvedColumnGap !== undefined && { columnGap: toSpacing(resolvedColumnGap) }),
  };
}

/**
 * Omit spacing props from component props
 */
export function omitSpacingProps<T extends SpacingProps>(props: T) {
  const { m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py, ...rest } = props;
  return rest;
}

/**
 * Omit gap props from component props
 */
export function omitGapProps<T extends GapProps>(props: T) {
  const { gap, rowGap, columnGap, ...rest } = props;
  return rest;
}
