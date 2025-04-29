// components/SizedBox.tsx
import { CSSProperties, ReactNode } from 'react';

interface SizedBoxProps {
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function SizedBox  ({
  width,
  height,
  children,
  className = '',
  style = {},
}: SizedBoxProps) {
  return (
    <div
      className={className}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    >
      {children}
    </div>
  );
};