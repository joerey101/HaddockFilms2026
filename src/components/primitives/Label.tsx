import React from 'react';
import { cn } from '@/lib/cn';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement | HTMLDivElement> {
  as?: 'span' | 'div';
}

export const Label = React.forwardRef<HTMLSpanElement | HTMLDivElement, LabelProps>(
  ({ className, as: Component = 'span', children, ...props }, ref) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLSpanElement & HTMLDivElement>}
        className={cn('text-prestige-label', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Label.displayName = 'Label';
