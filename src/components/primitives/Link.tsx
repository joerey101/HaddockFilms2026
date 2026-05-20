import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/lib/cn';

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: 'default' | 'underlined' | 'accent';
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', external, children, href, ...props }, ref) => {
    const isExternal = external || (typeof href === 'string' && href.startsWith('http'));
    
    const variantClasses = {
      default: 'hover:text-accent transition-colors duration-200',
      underlined: 'border-b border-primary/20 hover:border-accent hover:text-accent transition-colors duration-200',
      accent: 'text-accent hover:text-accent-hover transition-colors duration-200',
    };

    if (isExternal) {
      return (
        <a
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(variantClasses[variant], className)}
          ref={ref}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink
        href={href}
        className={cn(variantClasses[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
