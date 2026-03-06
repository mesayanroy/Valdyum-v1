'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { MORPHISM } from '../morphism.config';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'light' | 'dark' | 'ichor' | 'electrum' | 'forge';
    blur?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    animate?: boolean;
}

const blurMap = { sm: '8px', md: '16px', lg: '24px' };

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ variant = 'light', blur = 'md', hoverable = false, animate = false, className, style, children, ...props }, ref) => {
        const glassStyle = MORPHISM.glass[variant];

        return (
            <div
                ref={ref}
                className={cn(
                    'relative',
                    hoverable && 'transition-all duration-300 hover:-translate-y-[2px]',
                    animate && 'animate-float',
                    className
                )}
                style={{
                    background: glassStyle.background,
                    backdropFilter: glassStyle.backdropFilter?.replace(/blur\(\d+px\)/, `blur(${blurMap[blur]})`),
                    WebkitBackdropFilter: (glassStyle as any).WebkitBackdropFilter?.replace(/blur\(\d+px\)/, `blur(${blurMap[blur]})`),
                    border: glassStyle.border,
                    boxShadow: glassStyle.boxShadow,
                    borderRadius: 0,
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = 'GlassCard';
