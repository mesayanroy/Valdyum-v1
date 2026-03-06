import * as React from 'react';
import { cn } from '../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dark' | 'bordered';
  shadow?: 'none' | 'hard' | 'hard-lg';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', shadow = 'none', padding = 'md', hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-none transition-colors duration-300',
          {
            'bg-alabaster border border-alabaster-3': variant === 'default',
            'bg-obsidian-2 border border-white/[0.08]': variant === 'dark',
            'bg-alabaster border-2 border-obsidian': variant === 'bordered',
            'shadow-none': shadow === 'none',
            'shadow-hard': shadow === 'hard',
            'shadow-hard-lg': shadow === 'hard-lg',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
            'p-0': padding === 'none',
            'hover:bg-alabaster-2': hoverable && variant !== 'dark',
            'hover:bg-obsidian-3': hoverable && variant === 'dark',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
