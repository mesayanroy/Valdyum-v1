export const MORPHISM = {

  glass: {
    light: {
      background: 'rgba(250,248,245,0.65)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255,255,255,0.55)',
      borderTop: '1px solid rgba(255,255,255,0.85)',
      boxShadow: '0 8px 32px rgba(10,10,10,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
    },
    dark: {
      background: 'rgba(14,12,10,0.60)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
    },
    ichor: {
      background: 'rgba(0,255,102,0.05)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0,255,102,0.18)',
      boxShadow: '0 8px 32px rgba(0,255,102,0.08), inset 0 1px 0 rgba(0,255,102,0.1)',
    },
    electrum: {
      background: 'rgba(255,215,0,0.04)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,215,0,0.18)',
      boxShadow: '0 8px 32px rgba(255,215,0,0.08), inset 0 1px 0 rgba(255,215,0,0.1)',
    },
    forge: {
      background: 'rgba(255,59,0,0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,59,0,0.18)',
      boxShadow: '0 8px 32px rgba(255,59,0,0.08), inset 0 1px 0 rgba(255,59,0,0.08)',
    },
    navbar: {
      static: {
        background: 'rgba(250,248,245,0.45)',
        backdropFilter: 'blur(8px) saturate(150%)',
        WebkitBackdropFilter: 'blur(8px) saturate(150%)',
        borderBottom: '1px solid rgba(255,255,255,0.35)',
        boxShadow: 'none',
      },
      scrolled: {
        background: 'rgba(250,248,245,0.78)',
        backdropFilter: 'blur(20px) saturate(190%)',
        WebkitBackdropFilter: 'blur(20px) saturate(190%)',
        borderBottom: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 1px 0 rgba(10,10,10,0.04), 0 4px 24px rgba(10,10,10,0.06)',
      },
      dashboard: {
        background: 'rgba(10,10,8,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'none',
      },
    },
  },

  neu: {
    light: {
      outset: '-8px -8px 18px rgba(255,255,255,0.9), 8px 8px 18px rgba(180,172,162,0.55)',
      inset: 'inset -4px -4px 10px rgba(255,255,255,0.9), inset 4px 4px 10px rgba(180,172,162,0.55)',
      focus: 'inset -4px -4px 10px rgba(255,255,255,0.9), inset 4px 4px 10px rgba(180,172,162,0.45), inset 0 0 0 1px rgba(0,255,102,0.3)',
      outsetDeep: '-10px -10px 24px rgba(255,255,255,0.95), 10px 10px 24px rgba(175,167,156,0.50), -5px -5px 12px rgba(255,255,255,0.8), 5px 5px 12px rgba(175,167,156,0.35)',
      outsetPro: '-14px -14px 32px rgba(255,255,255,0.98), 14px 14px 32px rgba(175,167,156,0.55), -7px -7px 16px rgba(255,255,255,0.85), 7px 7px 16px rgba(175,167,156,0.40), 0 0 0 2px rgba(0,255,102,0.15)',
    },
    dark: {
      outset: '-6px -6px 14px rgba(35,30,25,0.8), 6px 6px 14px rgba(0,0,0,0.95)',
      outsetDeep: '-10px -10px 24px rgba(32,27,20,0.85), 10px 10px 24px rgba(0,0,0,1), -4px -4px 8px rgba(28,24,18,0.6), 4px 4px 8px rgba(0,0,0,0.8)',
      inset: 'inset -4px -4px 10px rgba(35,30,25,0.8), inset 4px 4px 10px rgba(0,0,0,0.95)',
      insetDeep: 'inset -6px -6px 16px rgba(32,27,20,0.8), inset 6px 6px 16px rgba(0,0,0,1), inset -3px -3px 8px rgba(28,24,18,0.5), inset 3px 3px 8px rgba(0,0,0,0.8)',
    },
  },

  clay: {
    radius: '20px',
    radiusSm: '12px',
    radiusXs: '10px',
    spring: 'cubic-bezier(0.34,1.56,0.64,1)',
    ichor: {
      background: 'linear-gradient(145deg, rgba(0,255,102,0.18), rgba(0,220,88,0.12))',
      shadow: '0 20px 40px rgba(0,255,102,0.25), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.05)',
      border: '1px solid rgba(0,255,102,0.25)',
    },
    electrum: {
      background: 'linear-gradient(145deg, rgba(255,215,0,0.18), rgba(230,193,0,0.12))',
      shadow: '0 20px 40px rgba(255,215,0,0.2), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.04)',
      border: '1px solid rgba(255,215,0,0.22)',
    },
    aether: {
      background: 'linear-gradient(145deg, rgba(0,229,255,0.15), rgba(0,200,230,0.10))',
      shadow: '0 20px 40px rgba(0,229,255,0.2), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.65), inset 0 -2px 4px rgba(0,0,0,0.04)',
      border: '1px solid rgba(0,229,255,0.2)',
    },
    forge: {
      background: 'linear-gradient(145deg, rgba(255,59,0,0.14), rgba(230,50,0,0.09))',
      shadow: '0 20px 40px rgba(255,59,0,0.18), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.55), inset 0 -2px 4px rgba(0,0,0,0.04)',
      border: '1px solid rgba(255,59,0,0.2)',
    },
  },

  aurora: {
    maxOpacity: 0.06,
    minBlur: 80,
    animationDuration: {
      fast: '30s',
      medium: '45s',
      slow: '60s',
    },
  },

} as const;

export type GlassVariant = keyof typeof MORPHISM.glass;
export type NeuVariant = 'light' | 'dark';
export type ClayAccent = keyof typeof MORPHISM.clay;
