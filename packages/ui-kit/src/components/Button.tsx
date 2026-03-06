import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-none font-mono uppercase cursor-none transition-all duration-300 group overflow-hidden relative',
  {
    variants: {
      variant: {
        primary: 'bg-obsidian text-ichor border border-obsidian hover:text-obsidian',
        ghost: 'bg-transparent text-obsidian border border-alabaster-3 hover:border-obsidian',
        dark: 'bg-obsidian-3 text-alabaster border border-white/[0.08]',
        electrum: 'bg-obsidian text-electrum border border-electrum/20 hover:text-obsidian',
        aether: 'bg-obsidian text-aether border border-aether/20 hover:text-obsidian',
        ichor: 'bg-obsidian text-ichor border border-ichor/20 hover:text-obsidian',
        forge: 'bg-obsidian text-forge border border-forge/20 hover:text-obsidian',
        light: 'bg-transparent text-alabaster border border-white/[0.12] hover:text-obsidian',
      },
      size: {
        sm: 'py-2 px-4 text-xs tracking-widest',
        md: 'py-3 px-6 text-sm tracking-widest',
        lg: 'py-4 px-8 text-sm tracking-wide',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const overlayVariants = cva(
  'absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-0',
  {
    variants: {
      variant: {
        primary: 'bg-ichor',
        ghost: 'bg-alabaster-2',
        dark: 'bg-obsidian-2',
        electrum: 'bg-electrum',
        aether: 'bg-aether',
        ichor: 'bg-ichor',
        forge: 'bg-forge',
        light: 'bg-alabaster',
      }
    },
    defaultVariants: {
      variant: 'primary',
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={cn(overlayVariants({ variant }))} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'icon', ...props }, ref) => {
    return (
      <Button
        className={cn('aspect-square', className)}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = 'IconButton';
