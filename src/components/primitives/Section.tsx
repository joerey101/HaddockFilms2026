import React from 'react';
import { cn } from '@/lib/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'default' | 'sm' | 'lg';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'default', children, ...props }, ref) => {
    const spacingClasses = {
      default: 'py-editorial',
      sm: 'py-[clamp(2rem,4vw,4rem)]',
      lg: 'py-[clamp(6rem,12vw,16rem)]',
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
