import React from 'react';
import { cn } from '@/lib/cn';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  size?: 'body-lg' | 'body' | 'body-sm';
  tone?: 'primary' | 'secondary' | 'muted';
  as?: 'p' | 'span';
}

export const Text = React.forwardRef<HTMLParagraphElement | HTMLSpanElement, TextProps>(
  ({ className, size = 'body', tone = 'primary', as: Component = 'p', children, ...props }, ref) => {
    const sizeClasses = {
      'body-lg': 'text-[clamp(1.125rem,1.4vw,1.375rem)] leading-[1.7]',
      'body': 'text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.8]',
      'body-sm': 'text-sm leading-[1.6]',
    };

    const toneClasses = {
      primary: 'text-primary',
      secondary: 'text-primary/70',
      muted: 'text-primary/40',
    };

    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement & HTMLSpanElement>}
        className={cn(sizeClasses[size], toneClasses[tone], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
