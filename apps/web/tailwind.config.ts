import type { Config } from 'tailwindcss';
import sharedConfig from '@valdyum/ui-kit/tailwind.config';

const config: Config = {
  presets: [sharedConfig],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui-kit/src/**/*.{ts,tsx}',
  ],
};

export default config;
