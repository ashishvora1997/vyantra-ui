export interface NumberFormatterProps {
  /** The number to format */
  value: number;
  /** Locale string (e.g. 'en-US', 'de-DE'). @default 'en-US' */
  locale?: string;
  /** Intl.NumberFormat style. @default 'decimal' */
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  /** Currency code when style='currency'. e.g. 'USD', 'INR' */
  currency?: string;
  /** Currency display format. @default 'symbol' */
  currencyDisplay?: 'symbol' | 'code' | 'name' | 'narrowSymbol';
  /** Unit when style='unit'. e.g. 'kilometer', 'byte' */
  unit?: string;
  /** Minimum fraction digits. */
  minimumFractionDigits?: number;
  /** Maximum fraction digits. */
  maximumFractionDigits?: number;
  /** Use grouping separators (1,000 vs 1000). @default true */
  useGrouping?: boolean;
  /** Notation. @default 'standard' */
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
  /** Prefix string prepended to the formatted value */
  prefix?: string;
  /** Suffix string appended to the formatted value */
  suffix?: string;
  /** Thousand separator override (bypasses Intl if set) */
  thousandSeparator?: string;
  /** Decimal separator override */
  decimalSeparator?: string;
  /** Render as this HTML element. @default 'span' */
  as?: React.ElementType;
  className?: string;
  style2?: React.CSSProperties;
}
