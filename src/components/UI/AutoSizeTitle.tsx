import type React from 'react';

const titleSizeAdapter = (title: string, max: number, min: number) => {
  if (min > max) {
    console.warn('max must be greater than or equal to min: ' + min);
  }
  const titleLength = title.length;
  const titleSize = Math.max(max - titleLength ** 2.3 * 0.0001, min);
  return titleSize;
};

export interface AutoSizeTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  /** rem */
  min?: number;
  /** rem */
  max?: number;
}

export function AutoSizeTitle({
  title,
  max = 2,
  min = 1.2,
  ...props
}: AutoSizeTitleProps) {
  const titleSize = titleSizeAdapter(title, max, min);
  return (
    <h1 style={{ fontSize: titleSize + 'rem' }} {...props}>
      {title}
    </h1>
  );
}
