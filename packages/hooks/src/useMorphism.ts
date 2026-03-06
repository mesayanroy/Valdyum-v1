import { useSceneStore } from './store/useSceneStore';

// Simplified glass config to avoid circular workspace dependency
// Full config lives in @valdyum/ui-kit/morphism.config.ts
const GLASS_STYLES = {
  light: { background: 'rgba(250,248,245,0.65)', backdropFilter: 'blur(16px) saturate(180%)' },
  dark: { background: 'rgba(14,12,10,0.60)', backdropFilter: 'blur(20px) saturate(160%)' },
  ichor: { background: 'rgba(0,255,102,0.05)', backdropFilter: 'blur(16px)' },
  electrum: { background: 'rgba(255,215,0,0.04)', backdropFilter: 'blur(16px)' },
  forge: { background: 'rgba(255,59,0,0.05)', backdropFilter: 'blur(20px)' },
} as const;

const NEU_STYLES = {
  light: {
    outset: '-8px -8px 18px rgba(255,255,255,0.9), 8px 8px 18px rgba(180,172,162,0.55)',
    inset: 'inset -4px -4px 10px rgba(255,255,255,0.9), inset 4px 4px 10px rgba(180,172,162,0.55)',
  },
  dark: {
    outset: '-6px -6px 14px rgba(35,30,25,0.8), 6px 6px 14px rgba(0,0,0,0.95)',
    inset: 'inset -4px -4px 10px rgba(35,30,25,0.8), inset 4px 4px 10px rgba(0,0,0,0.95)',
  },
} as const;

const CLAY_STYLES = {
  ichor: {
    background: 'linear-gradient(145deg, rgba(0,255,102,0.18), rgba(0,220,88,0.12))',
    shadow: '0 20px 40px rgba(0,255,102,0.25), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.6)',
    border: '1px solid rgba(0,255,102,0.25)',
  },
  electrum: {
    background: 'linear-gradient(145deg, rgba(255,215,0,0.18), rgba(230,193,0,0.12))',
    shadow: '0 20px 40px rgba(255,215,0,0.2), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,215,0,0.22)',
  },
  aether: {
    background: 'linear-gradient(145deg, rgba(0,229,255,0.15), rgba(0,200,230,0.10))',
    shadow: '0 20px 40px rgba(0,229,255,0.2), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.65)',
    border: '1px solid rgba(0,229,255,0.2)',
  },
  forge: {
    background: 'linear-gradient(145deg, rgba(255,59,0,0.14), rgba(230,50,0,0.09))',
    shadow: '0 20px 40px rgba(255,59,0,0.18), 0 8px 16px rgba(0,0,0,0.06), inset 0 2px 6px rgba(255,255,255,0.55)',
    border: '1px solid rgba(255,59,0,0.2)',
  },
} as const;

export function useMorphism() {
  const { currentPage } = useSceneStore();

  const getGlassStyle = (variant?: keyof typeof GLASS_STYLES) => {
    if (!variant) {
      return currentPage === 'dashboard' ? GLASS_STYLES.dark : GLASS_STYLES.light;
    }
    return GLASS_STYLES[variant];
  };

  const getNeuStyle = (type: 'outset' | 'inset') => {
    return currentPage === 'dashboard' ? NEU_STYLES.dark[type] : NEU_STYLES.light[type];
  };

  const getClayStyle = (accent: keyof typeof CLAY_STYLES) => {
    return CLAY_STYLES[accent];
  };

  return { getGlassStyle, getNeuStyle, getClayStyle };
}
