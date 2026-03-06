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
  howItWorks: { x: 0.0, y: 1.2, scale: 0.35, rotSpeed: 0.15, tiltX: 0.0 },
  ecosystem: { x: 0.0, y: -0.5, scale: 0.6, rotSpeed: 0.02, tiltX: 0.05 },
  cta: { x: 0.0, y: 1.0, scale: 0.0, rotSpeed: 0.5, tiltX: 0 },
};

// Map globalScrollProgress to a section + local progress within that section
function getSectionProgress(globalProgress: number) {
  const sections = [
    { current: 'hero' as const, next: 'howItWorks' as const, start: 0.00, end: 0.15 },
    { current: 'howItWorks' as const, next: 'howItWorks' as const, start: 0.15, end: 0.80 },
    { current: 'howItWorks' as const, next: 'ecosystem' as const, start: 0.80, end: 0.85 },
    { current: 'ecosystem' as const, next: 'ecosystem' as const, start: 0.85, end: 0.90 },
    { current: 'ecosystem' as const, next: 'cta' as const, start: 0.90, end: 0.95 },
    { current: 'cta' as const, next: 'cta' as const, start: 0.95, end: 1.00 },
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

    const { current, next, progress } = getSectionProgress(globalScrollProgress);
    const from = KEYFRAMES[current];
    const to = KEYFRAMES[next];

    // Smooth ease for transitions
    const ease = progress * progress * (3 - 2 * progress); // smoothstep

    // Interpolate base position
    const targetX = THREE.MathUtils.lerp(from.x, to.x, ease);
    let targetY = THREE.MathUtils.lerp(from.y, to.y, ease);
    let targetTwist = 0;

    // Apply HOP & SPIN when statically bookmarking
    if (current === 'howItWorks' && next === 'howItWorks') {
      const hwp = useSceneStore.getState().howItWorksProgress;

      // The horizontal track is: [Intro 100vw] [Step 1] [Step 2] [Step 3] [Step 4] [Padding 50vw]
      // The first ~30% of the horizontal scroll is just moving the intro panel out of the way.
      // We map the remaining 70% of the horizontal scrub perfectly to the 4 card hops.
      const TITLE_PORTION = 0.30;

      if (hwp > TITLE_PORTION) {
        // The horizontal track is: [Intro 100vw] [Cards ~1920px] [Padding 50vw]
        // Because of the 50vw padding at the end, the scrolling physically ends
        // BEFORE the `hwp` mathematical progress reaches 1.0 (it usually reaches ~0.85).
        // If we map to 1.0, the 4th hop gets cut off early.
        // We will map exactly to the range where the 4 cards are actually scrolling.
        const HOP_END_PORTION = 0.85; // Roughly when the 4th card hits the center
        const availableScrub = HOP_END_PORTION - TITLE_PORTION;

        // Map the current progress (clamped) to a 0.0 -> 4.0 range
        let hopProgress = ((hwp - TITLE_PORTION) / availableScrub) * 4;
        hopProgress = Math.min(4, Math.max(0, hopProgress));

        // Hop: creates 4 beautiful sine humps (0 -> 1 -> 0)
        targetY += Math.pow(Math.sin(hopProgress * Math.PI), 2) * 0.35;

        // Snap Spin: gracefully ease a 90-degree twist per card passed
        const step = Math.floor(hopProgress);
        // Handle floating point imprecision when exactly at 4
        const frac = step === 4 ? 0 : hopProgress % 1;
        const smoothFrac = frac * frac * (3 - 2 * frac);

        targetTwist = (step + smoothFrac) * (Math.PI / 2);
      }
    }

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY + Math.sin(timeRef.current * 1.5) * 0.06, // subtle floating
      0.08
    );

    // Interpolate scale
    const targetScale = THREE.MathUtils.lerp(from.scale, to.scale, ease);
    const currentScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
    groupRef.current.scale.setScalar(currentScale);

    // Continuous rotation + Targeted twist
    const rotSpeed = THREE.MathUtils.lerp(from.rotSpeed, to.rotSpeed, ease);

    // Smoothly apply instantaneous twists to the base ongoing rotation
    const twistDelta = targetTwist - twistRef.current;
    twistRef.current += twistDelta * 0.1;
    groupRef.current.rotation.y += (rotSpeed * delta * 2) + (twistDelta * 0.1);

    // Tilt
    const targetTiltX = THREE.MathUtils.lerp(from.tiltX, to.tiltX, ease);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.05);
  });

  return (
    <>
      <directionalLight position={[5, 8, 3]} intensity={5} color="#fff5e6" />
      <directionalLight position={[-4, 2, -3]} intensity={2.5} color="#d6d6ff" />
      <ambientLight intensity={1.2} color="#ffffff" />

      <group ref={groupRef} position={[1.5, -1.5, 0]}>
        <primitive object={scene} scale={1} />
      </group>
    </>
  );
};

useGLTF.preload('/models/statue.glb');
