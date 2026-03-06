import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1 border rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-alabaster-2 text-obsidian border-alabaster-3',
        verified: 'bg-ichor/10 text-ichor border-ichor/20',
        new: 'bg-forge/10 text-forge border-forge/20',
        active: 'bg-aether/10 text-aether border-aether/20',
        error: 'bg-red-500/10 text-red-500 border-red-500/20',
        electrum: 'bg-electrum/10 text-electrum border-electrum/20',
        aether: 'bg-aether/10 text-aether border-aether/20',
        ichor: 'bg-ichor/10 text-ichor border-ichor/20',
        forge: 'bg-forge/10 text-forge border-forge/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
        {variant === 'active' && (
          <span className="w-1.5 h-1.5 rounded-full bg-aether animate-pulse" />
        )}
        {variant === 'verified' && (
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';
