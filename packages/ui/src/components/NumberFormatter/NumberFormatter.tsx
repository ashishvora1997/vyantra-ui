import React from 'react';
import type { NumberFormatterProps } from './NumberFormatter.types';

export const NumberFormatter: React.FC<NumberFormatterProps> = ({
  value,
  locale = 'en-US',
  style = 'decimal',
  currency,
  currencyDisplay = 'symbol',
  unit,
  minimumFractionDigits,
  maximumFractionDigits,
  useGrouping = true,
  notation = 'standard',
  prefix = '',
  suffix = '',
  thousandSeparator,
  decimalSeparator,
  as: Component = 'span',
  className,
  style2,
}) => {
  let formatted: string;

  if (thousandSeparator !== undefined || decimalSeparator !== undefined) {
    // Manual formatting path
    const [intPart, decPart] = Math.abs(value).toFixed(maximumFractionDigits ?? 0).split('.');
    const sep = thousandSeparator ?? ',';
    const dec = decimalSeparator  ?? '.';
    const grouped = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    formatted = (value < 0 ? '-' : '') + grouped + (decPart ? `${dec}${decPart}` : '');
  } else {
    formatted = new Intl.NumberFormat(locale, {
      style,
      ...(currency ? { currency, currencyDisplay } : {}),
      ...(unit     ? { unit, unitDisplay: 'short' } : {}),
      ...(minimumFractionDigits !== undefined ? { minimumFractionDigits } : {}),
      ...(maximumFractionDigits !== undefined ? { maximumFractionDigits } : {}),
      useGrouping,
      notation,
    } as Intl.NumberFormatOptions).format(value);
  }

  return (
    <Component className={className} style={style2}>
      {prefix}{formatted}{suffix}
    </Component>
  );
};

NumberFormatter.displayName = 'NumberFormatter';
export default NumberFormatter;
