import React from 'react';
import { cn } from '@/lib/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'display-xl' | 'display-lg' | 'display-md' | 'h1' | 'h2' | 'h3';
  font?: 'serif' | 'sans';
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size = 'h2', font = 'serif', children, ...props }, ref) => {
    const sizeClasses = {
      'display-xl': 'text-display-xl',
      'display-lg': 'text-display-lg',
      'display-md': 'text-display-md',
      'h1': 'text-[clamp(2rem,4vw,3.5rem)] leading-tight tracking-[-0.03em]',
      'h2': 'text-[clamp(1.5rem,3vw,2.5rem)] leading-tight tracking-[-0.02em]',
      'h3': 'text-[clamp(1.25rem,2vw,1.75rem)] leading-tight',
    };

    const merged = cn(
      font === 'serif' ? 'font-serif' : 'font-sans',
      className
    );
    
    const sizeClass = sizeClasses[size];
    const finalClassName = sizeClass.startsWith('text-display')
      ? `${merged} ${sizeClass}`
      : cn(font === 'serif' ? 'font-serif' : 'font-sans', sizeClass, className);

    return (
      <Component
        ref={ref}
        className={finalClassName}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';
