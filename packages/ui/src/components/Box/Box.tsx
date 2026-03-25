// =============================================================================
//  VYANTRA — Box.tsx
//  Base layout primitive. Renders any HTML element with shorthand style props
//  that map directly to CSS properties. Zero CSS class overhead —
//  all styles are applied as inline style, merged with the style prop.
//
//  Design decision: Box uses inline styles (not CSS classes) because:
//  1. Values are dynamic — users pass arbitrary CSS strings or token refs
//  2. No runtime CSS injection needed
//  3. Tree-shaking works perfectly
//  4. Works without ThemeProvider
//
//  Ref pattern: Box accepts ref as a plain prop typed as React.Ref<any>.
//  forwardRef<HTMLElement> causes TS errors because the inferred element type
//  from `as` (e.g. HTMLDivElement) does not satisfy HTMLElement for JSX refs.
//  The polymorphic cast at the bottom restores the public API type.
// =============================================================================

import React from 'react';
import type { ElementType, Ref } from 'react';
import type { BoxProps, BoxStyleProps } from './Box.types';
import { cx } from '../../utils';

// ─── Style prop → CSS property mapping ───────────────────────────────────────

function resolveStyleProps(props: BoxStyleProps): React.CSSProperties {
  const style: React.CSSProperties = {};

  // Spacing
  if (props.p !== undefined) style.padding = props.p;
  if (props.pt !== undefined) style.paddingTop = props.pt;
  if (props.pr !== undefined) style.paddingRight = props.pr;
  if (props.pb !== undefined) style.paddingBottom = props.pb;
  if (props.pl !== undefined) style.paddingLeft = props.pl;
  if (props.px !== undefined) style.paddingInline = props.px;
  if (props.py !== undefined) style.paddingBlock = props.py;

  if (props.m !== undefined) style.margin = props.m;
  if (props.mt !== undefined) style.marginTop = props.mt;
  if (props.mr !== undefined) style.marginRight = props.mr;
  if (props.mb !== undefined) style.marginBottom = props.mb;
  if (props.ml !== undefined) style.marginLeft = props.ml;
  if (props.mx !== undefined) style.marginInline = props.mx;
  if (props.my !== undefined) style.marginBlock = props.my;

  // Sizing
  if (props.w !== undefined) style.width = props.w;
  if (props.h !== undefined) style.height = props.h;
  if (props.minW !== undefined) style.minWidth = props.minW;
  if (props.maxW !== undefined) style.maxWidth = props.maxW;
  if (props.minH !== undefined) style.minHeight = props.minH;
  if (props.maxH !== undefined) style.maxHeight = props.maxH;

  // Layout
  if (props.display !== undefined) style.display = props.display;
  if (props.pos !== undefined) style.position = props.pos;
  if (props.top !== undefined) style.top = props.top;
  if (props.right !== undefined) style.right = props.right;
  if (props.bottom !== undefined) style.bottom = props.bottom;
  if (props.left !== undefined) style.left = props.left;
  if (props.z !== undefined) style.zIndex = props.z;
  if (props.overflow !== undefined) style.overflow = props.overflow;
  if (props.overflowX !== undefined) style.overflowX = props.overflowX;
  if (props.overflowY !== undefined) style.overflowY = props.overflowY;

  // Flexbox
  if (props.direction !== undefined) style.flexDirection = props.direction;
  if (props.align !== undefined) style.alignItems = props.align;
  if (props.justify !== undefined) style.justifyContent = props.justify;
  if (props.wrap !== undefined) style.flexWrap = props.wrap;
  if (props.gap !== undefined) style.gap = props.gap;
  if (props.columnGap !== undefined) style.columnGap = props.columnGap;
  if (props.rowGap !== undefined) style.rowGap = props.rowGap;
  if (props.flex !== undefined) style.flex = props.flex;
  if (props.grow !== undefined) style.flexGrow = props.grow;
  if (props.shrink !== undefined) style.flexShrink = props.shrink;
  if (props.alignSelf !== undefined) style.alignSelf = props.alignSelf;

  // Background & Color
  if (props.bg !== undefined) style.background = props.bg;
  if (props.c !== undefined) style.color = props.c;
  if (props.opacity !== undefined) style.opacity = props.opacity;

  // Border
  if (props.border !== undefined) style.border = props.border;
  if (props.borderColor !== undefined) style.borderColor = props.borderColor;
  if (props.radius !== undefined) style.borderRadius = props.radius;

  // Typography
  if (props.fz !== undefined) style.fontSize = props.fz;
  if (props.fw !== undefined) style.fontWeight = props.fw;
  if (props.ff !== undefined) style.fontFamily = props.ff;
  if (props.lh !== undefined) style.lineHeight = props.lh;
  if (props.ls !== undefined) style.letterSpacing = props.ls;
  if (props.ta !== undefined) style.textAlign = props.ta;

  // Shadow & Cursor
  if (props.shadow !== undefined) style.boxShadow = props.shadow;
  if (props.cursor !== undefined) style.cursor = props.cursor;

  return style;
}

// ─── Internal render function ─────────────────────────────────────────────────
// Typed as (props: any) to avoid the impossible constraint of satisfying
// every possible element's ref type simultaneously. The public-facing type
// is restored via the cast below, which is the standard polymorphic pattern.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BoxImpl(props: any): React.ReactElement | null {
  const {
    as: Component = 'div',
    ref,
    className,
    style,
    children,
    // ── destructure all shorthand props so they never reach the DOM ──
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    display,
    pos,
    top,
    right,
    bottom,
    left,
    z,
    overflow,
    overflowX,
    overflowY,
    direction,
    align,
    justify,
    wrap,
    gap,
    columnGap,
    rowGap,
    flex,
    grow,
    shrink,
    alignSelf,
    bg,
    c,
    opacity,
    border,
    borderColor,
    radius,
    fz,
    fw,
    ff,
    lh,
    ls,
    ta,
    shadow,
    cursor,
    ...rest
  } = props;

  const styleProps = resolveStyleProps({
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    display,
    pos,
    top,
    right,
    bottom,
    left,
    z,
    overflow,
    overflowX,
    overflowY,
    direction,
    align,
    justify,
    wrap,
    gap,
    columnGap,
    rowGap,
    flex,
    grow,
    shrink,
    alignSelf,
    bg,
    c,
    opacity,
    border,
    borderColor,
    radius,
    fz,
    fw,
    ff,
    lh,
    ls,
    ta,
    shadow,
    cursor,
  });

  return (
    <Component ref={ref} className={cx(className)} style={{ ...styleProps, ...style }} {...rest}>
      {children}
    </Component>
  );
}

BoxImpl.displayName = 'Box';

// ─── Public API — polymorphic type ────────────────────────────────────────────
// Cast restores the full generic signature so consumers get correct
// prop and ref types when they pass `as="button"`, `as="a"`, etc.

export const Box = BoxImpl as <C extends ElementType = 'div'>(
  props: BoxProps<C> & {
    ref?: Ref<C extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[C] : HTMLElement>;
  },
) => React.ReactElement | null;

export default Box;
