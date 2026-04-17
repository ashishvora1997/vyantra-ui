import React, { forwardRef } from 'react';
import { parseSpacingProps, omitSpacingProps, GapProps, parseGapProps, omitGapProps } from '../../utils/spacing';
import { FlexProps, FlexWrap, WrapKey } from './Flex.types';
import { cx } from '../../utils';

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const wrapMap: Record<WrapKey, FlexWrap> = {
  true: 'wrap',
  wrap: 'wrap',
  false: 'nowrap',
  nowrap: 'nowrap',
  'wrap-reverse': 'wrap-reverse',
};


export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      direction = 'row',
      align,
      justify,
      wrap,
      inline = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const spacingStyles = parseSpacingProps(props);
    const gapStyles = parseGapProps(props);
    const restProps = omitGapProps(omitSpacingProps(props));

    const flexStyles: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction,
      alignItems: align ? alignMap[align] : undefined,
      justifyContent: justify ? justifyMap[justify] : undefined,
      flexWrap: wrap !== undefined ? wrapMap[String(wrap) as FlexWrap] : undefined,
      ...gapStyles,
      ...spacingStyles,
      ...style,
    };

    console.log('flexStyles', props.id, flexStyles, spacingStyles, restProps);

    return (
      <Component ref={ref} className={cx('vyantra-flex', className)} style={flexStyles} {...restProps}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';
export default Flex;