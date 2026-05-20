import React from 'react';
import { cn } from '@/lib/cn';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'accent';
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, tone = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-block px-3 py-1 text-xs uppercase tracking-wider font-sans font-bold',
          tone === 'default' ? 'bg-primary/5 text-primary/60' : 'bg-accent/10 text-accent',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
