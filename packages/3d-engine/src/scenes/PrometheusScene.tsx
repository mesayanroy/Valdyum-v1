import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@valdyum/hooks';

/**
 * Per-section 3D model choreography.
 *
 * Uses globalScrollProgress (0→1) to interpolate between
 * position/scale/rotation keyframes for each section.
 *
 * Section scroll ranges (approximate):
 *   Hero:        0.00 – 0.25
 *   HowItWorks:  0.25 – 0.65
 *   Ecosystem:   0.65 – 0.85
 *   CTA:         0.85 – 1.00
 */

// Keyframes: [x, y, scale, rotationSpeedMultiplier]
const KEYFRAMES = {
  hero: { x: 1.5, y: -1.5, scale: 1.4, rotSpeed: 0.12, tiltX: 0 },
  howItWorks: { x: 2.2, y: 1.2, scale: 0.35, rotSpeed: 0.15, tiltX: 0.0 },
  faq: { x: 0.0, y: 0.0, scale: 0.45, rotSpeed: 0.05, tiltX: 0.05 },
  cta: { x: 0.0, y: 3.0, scale: 0.0, rotSpeed: 0.5, tiltX: 0 }, // Drops below + shrinks to vanish
};

// Map globalScrollProgress to a section + local progress within that section
function getSectionProgress(globalProgress: number) {
  // Ecosystem section removed — page goes: Hero → HowItWorks → FAQ → CTA → Founders
  const sections = [
    { current: 'hero' as const, next: 'howItWorks' as const, start: 0.00, end: 0.12 },
    { current: 'howItWorks' as const, next: 'howItWorks' as const, start: 0.12, end: 0.55 },
    { current: 'howItWorks' as const, next: 'faq' as const, start: 0.55, end: 0.60 },
    { current: 'faq' as const, next: 'faq' as const, start: 0.60, end: 0.78 },
    { current: 'faq' as const, next: 'cta' as const, start: 0.78, end: 0.85 }, // Vanish transition
    { current: 'cta' as const, next: 'cta' as const, start: 0.85, end: 1.00 }, // Fully gone
  ];

  for (let i = sections.length - 1; i >= 0; i--) {
    if (globalProgress >= sections[i].start) {
      const s = sections[i];
      const localProgress = Math.min(1, (globalProgress - s.start) / (s.end - s.start));
      return { current: s.current, next: s.next, progress: localProgress };
    }
  }
  return { current: 'hero' as const, next: 'howItWorks' as const, progress: 0 };
}

export const PrometheusScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/statue.glb');
  const timeRef = useRef(0);
  const twistRef = useRef(0);

  useFrame((_, delta) => {
    const { globalScrollProgress } = useSceneStore.getState();
    timeRef.current += delta;

    if (!groupRef.current) return;

    try {
      const { current, next, progress } = getSectionProgress(globalScrollProgress || 0);
      const from = KEYFRAMES[current];
      const to = KEYFRAMES[next];

      // Smooth ease for transitions
      const safeProgress = isNaN(progress) ? 0 : progress;
      const ease = safeProgress * safeProgress * (3 - 2 * safeProgress);

      // Interpolate base position
      const targetX = THREE.MathUtils.lerp(from.x, to.x, ease) || 0;
      let targetY = THREE.MathUtils.lerp(from.y, to.y, ease) || 0;
      let targetTwist = 0;

      // Apply HOP & SPIN when statically bookmarking
      if (current === 'howItWorks' && next === 'howItWorks') {
        const rawHwp = useSceneStore.getState().howItWorksProgress;
        const hwp = isNaN(rawHwp) ? 0 : rawHwp;

        const TITLE_PORTION = 0.30;
        if (hwp > TITLE_PORTION) {
          const HOP_END_PORTION = 0.85;
          const availableScrub = HOP_END_PORTION - TITLE_PORTION;

          let hopProgress = ((hwp - TITLE_PORTION) / availableScrub) * 4;
          hopProgress = Math.min(4, Math.max(0, isNaN(hopProgress) ? 0 : hopProgress));

          targetY += Math.pow(Math.sin(hopProgress * Math.PI), 2) * 0.35;

          const step = Math.floor(hopProgress);
          const frac = step === 4 ? 0 : hopProgress % 1;
          const smoothFrac = frac * frac * (3 - 2 * frac);

          targetTwist = (step + smoothFrac) * (Math.PI / 2);
        }
      }

      const currentX = groupRef.current.position.x;
      groupRef.current.position.x = THREE.MathUtils.lerp(isNaN(currentX) ? 0 : currentX, targetX, 0.08);

      const currentY = groupRef.current.position.y;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        isNaN(currentY) ? 0 : currentY,
        targetY + Math.sin(timeRef.current * 1.5) * 0.06,
        0.08
      );

      // Interpolate scale
      const targetScale = THREE.MathUtils.lerp(from.scale, to.scale, ease) || 1;
      const currentScaleX = groupRef.current.scale.x;
      const currentScale = THREE.MathUtils.lerp(isNaN(currentScaleX) ? 1 : currentScaleX, targetScale, 0.08);
      groupRef.current.scale.setScalar(Math.max(0.001, currentScale)); // Avoid exactly 0 scale issues

      // Continuous rotation + Targeted twist
      const rotSpeed = THREE.MathUtils.lerp(from.rotSpeed, to.rotSpeed, ease) || 0;
      const twistDelta = (targetTwist || 0) - (twistRef.current || 0);
      twistRef.current += twistDelta * 0.1;

      const currentRotY = groupRef.current.rotation.y;
      groupRef.current.rotation.y = (isNaN(currentRotY) ? 0 : currentRotY) + (rotSpeed * delta * 2) + (twistDelta * 0.1);

      // Tilt
      const targetTiltX = THREE.MathUtils.lerp(from.tiltX, to.tiltX, ease) || 0;
      const currentRotX = groupRef.current.rotation.x;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(isNaN(currentRotX) ? 0 : currentRotX, targetTiltX, 0.05);
    } catch (e) {
      console.warn("PrometheusScene render loop error gracefully caught:", e);
    }
  });

  return (
    <>
      <directionalLight position={[5, 8, 3]} intensity={4} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={2} color="#e0e0e0" />
      <ambientLight intensity={2.5} color="#ffffff" />

      <group ref={groupRef} position={[1.5, -1.5, 0]}>
        <primitive object={scene} scale={1} />
      </group>
    </>
  );
};

useGLTF.preload('/models/statue.glb');
