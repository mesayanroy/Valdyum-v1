'use client';

import dynamic from 'next/dynamic';

export const PersistentCanvas = dynamic(
  () => import('@valdyum/3d-engine').then((mod) => mod.PersistentCanvas),
  { ssr: false }
);
