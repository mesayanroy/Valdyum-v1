'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSceneStore } from '@valdyum/hooks';
import { PrometheusScene } from './scenes/PrometheusScene';

export const PersistentCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const modelOpacity = useSceneStore((s) => s.modelOpacity);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 2,
        pointerEvents: 'none',
        opacity: modelOpacity,
        transition: 'opacity 0.15s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))}
        style={{ pointerEvents: 'none' }}
      >
        <PrometheusScene />
      </Canvas>
    </div>
  );
};
