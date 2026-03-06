'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Progress: 0 when footer top enters bottom of viewport → 1 when fully in view
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowH));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Derived values
  const brandY = (1 - scrollProgress) * 80; // rises from 80px below
  const brandOpacity = scrollProgress;
  const copyrightOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ background: '#0E0C0A' }}
    >
      {/* Copyright text */}
      <div
        ref={copyrightRef}
        className="relative z-10 pt-32 pb-8 text-center"
        style={{ opacity: copyrightOpacity }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 leading-relaxed">
          All Rights Reserved, 2025
          <br />
          Valdyum Protocol
        </p>
      </div>

      {/* Giant cropped brand name — scroll-driven rise */}
      <div
        className="relative flex items-start justify-center pointer-events-none select-none"
        aria-hidden="true"
        style={{
          height: 'clamp(120px, 14vw, 220px)',
          overflow: 'hidden',
        }}
      >
        <span
          ref={brandRef}
          className="font-display font-bold text-white whitespace-nowrap will-change-transform"
          style={{
            fontSize: 'clamp(140px, 15vw, 280px)',
            lineHeight: '0.85',
            letterSpacing: '-0.02em',
            transform: `translateY(${brandY}px)`,
            opacity: brandOpacity,
            transition: 'none',
          }}
        >
          VALDYUM
        </span>
      </div>
    </footer>
  );
};
