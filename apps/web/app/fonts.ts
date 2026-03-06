import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const geist = Inter({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
