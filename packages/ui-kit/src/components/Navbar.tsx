'use client';

import * as React from 'react';
import { cn } from '../lib/utils';
import { MORPHISM } from '../morphism.config';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> { }

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 60);
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const glassStyle = scrolled ? MORPHISM.glass.navbar.scrolled : MORPHISM.glass.navbar.static;

    return (
      <header
        ref={ref}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] flex h-[var(--nav-height,72px)] items-center px-6',
          className
        )}
        style={{
          background: glassStyle.background,
          backdropFilter: glassStyle.backdropFilter,
          WebkitBackdropFilter: glassStyle.WebkitBackdropFilter,
          borderBottom: glassStyle.borderBottom,
          boxShadow: glassStyle.boxShadow || 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        }}
        {...props}
      >
        {/* Logo only */}
        <a href="/" className="flex items-center gap-3 group" aria-label="Valdyum Home">
          <div
            className="relative flex h-[28px] w-[28px] items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(10,10,10,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(10,10,10,0.12)',
            }}
          >
            <span className="font-display text-[14px] font-bold text-obsidian">V</span>
          </div>
          <span className="font-display text-[14px] font-semibold tracking-[0.18em] text-obsidian">
            VALDYUM
          </span>
        </a>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
