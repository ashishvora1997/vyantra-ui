import type { ElementType, ComponentPropsWithRef, CSSProperties } from 'react';

// ─── Polymorphic helper ───────────────────────────────────────────────────────

type AsProp<C extends ElementType> = { as?: C };
type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicBoxProps<
  C extends ElementType,
  Props = Record<string, never>,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;

// ─── Style shorthand props ────────────────────────────────────────────────────
// A curated subset of CSS properties available as direct props on Box.
// All map 1:1 to their CSS equivalent — values accept any CSS string
// or a --vyantra-* token reference.
//
// Example:
//   <Box p="var(--vyantra-spacing-4)" bg="var(--vyantra-surface-bg)" radius="var(--vyantra-radius-lg)">

export interface BoxStyleProps {
  // ── Spacing ──────────────────────────────────────────────────────────────
  /** padding (shorthand) */
  p?: CSSProperties['padding'];
  /** padding-top */
  pt?: CSSProperties['paddingTop'];
  /** padding-right */
  pr?: CSSProperties['paddingRight'];
  /** padding-bottom */
  pb?: CSSProperties['paddingBottom'];
  /** padding-left */
  pl?: CSSProperties['paddingLeft'];
  /** padding-inline (left + right) */
  px?: CSSProperties['paddingInline'];
  /** padding-block (top + bottom) */
  py?: CSSProperties['paddingBlock'];

  /** margin (shorthand) */
  m?: CSSProperties['margin'];
  /** margin-top */
  mt?: CSSProperties['marginTop'];
  /** margin-right */
  mr?: CSSProperties['marginRight'];
  /** margin-bottom */
  mb?: CSSProperties['marginBottom'];
  /** margin-left */
  ml?: CSSProperties['marginLeft'];
  /** margin-inline (left + right) */
  mx?: CSSProperties['marginInline'];
  /** margin-block (top + bottom) */
  my?: CSSProperties['marginBlock'];

  // ── Sizing ───────────────────────────────────────────────────────────────
  /** width */
  w?: CSSProperties['width'];
  /** height */
  h?: CSSProperties['height'];
  /** min-width */
  minW?: CSSProperties['minWidth'];
  /** max-width */
  maxW?: CSSProperties['maxWidth'];
  /** min-height */
  minH?: CSSProperties['minHeight'];
  /** max-height */
  maxH?: CSSProperties['maxHeight'];

  // ── Layout ───────────────────────────────────────────────────────────────
  /** display */
  display?: CSSProperties['display'];
  /** position */
  pos?: CSSProperties['position'];
  /** top */
  top?: CSSProperties['top'];
  /** right */
  right?: CSSProperties['right'];
  /** bottom */
  bottom?: CSSProperties['bottom'];
  /** left */
  left?: CSSProperties['left'];
  /** z-index */
  z?: CSSProperties['zIndex'];
  /** overflow */
  overflow?: CSSProperties['overflow'];
  /** overflow-x */
  overflowX?: CSSProperties['overflowX'];
  /** overflow-y */
  overflowY?: CSSProperties['overflowY'];

  // ── Flexbox (when display='flex') ────────────────────────────────────────
  /** flex-direction */
  direction?: CSSProperties['flexDirection'];
  /** align-items */
  align?: CSSProperties['alignItems'];
  /** justify-content */
  justify?: CSSProperties['justifyContent'];
  /** flex-wrap */
  wrap?: CSSProperties['flexWrap'];
  /** gap */
  gap?: CSSProperties['gap'];
  /** column-gap */
  columnGap?: CSSProperties['columnGap'];
  /** row-gap */
  rowGap?: CSSProperties['rowGap'];
  /** flex */
  flex?: CSSProperties['flex'];
  /** flex-grow */
  grow?: CSSProperties['flexGrow'];
  /** flex-shrink */
  shrink?: CSSProperties['flexShrink'];
  /** align-self */
  alignSelf?: CSSProperties['alignSelf'];

  // ── Background & Color ───────────────────────────────────────────────────
  /** background / background-color */
  bg?: CSSProperties['background'];
  /** color */
  c?: CSSProperties['color'];
  /** opacity */
  opacity?: CSSProperties['opacity'];

  // ── Border ───────────────────────────────────────────────────────────────
  /** border */
  border?: CSSProperties['border'];
  /** border-color */
  borderColor?: CSSProperties['borderColor'];
  /** border-radius */
  radius?: CSSProperties['borderRadius'];

  // ── Typography ───────────────────────────────────────────────────────────
  /** font-size */
  fz?: CSSProperties['fontSize'];
  /** font-weight */
  fw?: CSSProperties['fontWeight'];
  /** font-family */
  ff?: CSSProperties['fontFamily'];
  /** line-height */
  lh?: CSSProperties['lineHeight'];
  /** letter-spacing */
  ls?: CSSProperties['letterSpacing'];
  /** text-align */
  ta?: CSSProperties['textAlign'];

  // ── Shadow ───────────────────────────────────────────────────────────────
  /** box-shadow */
  shadow?: CSSProperties['boxShadow'];

  // ── Cursor ───────────────────────────────────────────────────────────────
  /** cursor */
  cursor?: CSSProperties['cursor'];
}

// ─── Box props ────────────────────────────────────────────────────────────────

export interface BoxBaseProps extends BoxStyleProps {
  /** Additional className */
  className?: string;
  /** Inline style — merged with shorthand style props */
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Render as any HTML element or React component */
  as?: ElementType;
  /**
   * Forwarded ref. The ref type is inferred from the `as` prop:
   * as="button" → Ref<HTMLButtonElement>, as="a" → Ref<HTMLAnchorElement>, etc.
   * Typed as any here because the generic narrowing happens in the cast below.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

export type BoxProps<C extends ElementType = 'div'> = PolymorphicBoxProps<C, BoxBaseProps>;
