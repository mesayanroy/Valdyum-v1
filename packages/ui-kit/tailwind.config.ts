import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../apps/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      colors: {
        // ── Base (95% of all UI) ──────────────────
        'alabaster':   '#FAFAFA',
        'alabaster-2': '#F2EDE6',
        'alabaster-3': '#E5DDD2',
        'obsidian':    '#0A0A0A',
        'obsidian-2':  '#1A1A1A',
        'obsidian-3':  '#2A2A2A',
        'stone':       '#6B6258',
        'stone-2':     '#9B9188',

        // ── Page Accents (5% of UI — extreme restraint) ──
        // Landing page accent
        'electrum':    '#FFD700',
        // Marketplace accent
        'aether':      '#00E5FF',
        // Agent detail accent
        'ichor':       '#00FF66',
        // Dashboard accent
        'forge':       '#FF3B00',
      },
      fontFamily: {
        'display': ['var(--font-cinzel)', 'serif'],
        'mono':    ['var(--font-geist-mono)', 'monospace'],
        'body':    ['var(--font-geist)', 'sans-serif'],
      },
      borderRadius: {
        // ZERO border radius everywhere — sharp corners only
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px', // only for status indicator dots
      },
      boxShadow: {
        // Hard offset shadows — chiseled stone aesthetic
        'hard-sm':  '3px 3px 0px #0A0A0A',
        'hard':     '6px 6px 0px #0A0A0A',
        'hard-lg':  '10px 10px 0px #0A0A0A',
        'hard-dark': '6px 6px 0px rgba(255,255,255,0.06)',
        'none': 'none',
      },
      animation: {
        'blink':        'blink 1s step-end infinite',
        'float':        'float 4s ease-in-out infinite',
        'pulse-dot':    'pulseDot 2s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'stream':       'streamParticle 1.6s linear infinite',
        'fade-up':      'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        streamParticle: {
          '0%': { left: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
