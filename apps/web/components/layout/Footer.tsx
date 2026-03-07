'use client';

import * as React from 'react';

export const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: '#0E0C0A',
        paddingTop: 'clamp(40px, 8vw, 120px)',
      }}
    >
      {/* Copyright text — centered above the giant text */}
      <div className="text-center mb-[clamp(24px,5vw,80px)]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 leading-relaxed">
          All Rights Reserved, 2025
          <br />
          Valdyum Protocol
        </p>
      </div>

      {/* Giant brand text — positioned at bottom, bottom portion overflows and is clipped by footer */}
      <div
        className="relative w-full text-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{
          height: 'clamp(50px, 12vw, 200px)',
        }}
      >
        <span
          className="font-display font-bold whitespace-nowrap inline-block"
          style={{
            fontSize: 'clamp(80px, 20vw, 380px)',
            lineHeight: '0.78',
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
          }}
        >
          VALDYUM
        </span>
      </div>
    </footer>
  );
};
