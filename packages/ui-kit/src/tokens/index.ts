export const COLORS = {
  alabaster:    '#FAFAFA',
  alabaster2:   '#F2EDE6',
  alabaster3:   '#E5DDD2',
  obsidian:     '#0A0A0A',
  obsidian2:    '#1A1A1A',
  obsidian3:    '#2A2A2A',
  stone:        '#6B6258',
  stone2:       '#9B9188',
  electrum:     '#FFD700',
  aether:       '#00E5FF',
  ichor:        '#00FF66',
  forge:        '#FF3B00',
} as const;

export type ColorKey = keyof typeof COLORS;

export const FONTS = {
  display: 'var(--font-cinzel)',
  mono:    'var(--font-geist-mono)',
  body:    'var(--font-geist)',
} as const;

export const SHADOWS = {
  hardSm:   '3px 3px 0px #0A0A0A',
  hard:     '6px 6px 0px #0A0A0A',
  hardLg:   '10px 10px 0px #0A0A0A',
  hardDark: '6px 6px 0px rgba(255,255,255,0.06)',
} as const;
