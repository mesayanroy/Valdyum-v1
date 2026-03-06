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
 *   Hero:        0.00 – 0.20
 *   Stats:       0.20 – 0.35
 *   HowItWorks:  0.35 – 0.65
 *   Ecosystem:   0.65 – 0.80
 *   CTA:         0.80 – 1.00
 */

// Keyframes: [x, y, scale, rotationSpeedMultiplier]
const KEYFRAMES = {
  hero: { x: 1.5, y: -1.5, scale: 1.4, rotSpeed: 0.12, tiltX: 0 },
  stats: { x: 0.8, y: -1.0, scale: 0.9, rotSpeed: 0.25, tiltX: 0 },
  howItWorks: { x: -1.8, y: -0.5, scale: 0.6, rotSpeed: 0.15, tiltX: 0.15 },
  ecosystem: { x: 0.0, y: -1.0, scale: 0.5, rotSpeed: 0.08, tiltX: 0 },
  cta: { x: 0.0, y: 0.0, scale: 0.2, rotSpeed: 0.4, tiltX: 0 },
};

// Map globalScrollProgress to a section + local progress within that section
function getSectionProgress(globalProgress: number) {
  const sections = [
    { name: 'hero' as const, start: 0.00, end: 0.20 },
    { name: 'stats' as const, start: 0.20, end: 0.35 },
    { name: 'howItWorks' as const, start: 0.35, end: 0.65 },
    { name: 'ecosystem' as const, start: 0.65, end: 0.80 },
    { name: 'cta' as const, start: 0.80, end: 1.00 },
  ];

  for (let i = sections.length - 1; i >= 0; i--) {
    if (globalProgress >= sections[i].start) {
      const s = sections[i];
      const localProgress = Math.min(1, (globalProgress - s.start) / (s.end - s.start));
      const nextSection = i < sections.length - 1 ? sections[i + 1].name : s.name;
      return { current: s.name, next: nextSection, progress: localProgress };
    }
  }
  return { current: 'hero' as const, next: 'stats' as const, progress: 0 };
}

export const PrometheusScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/statue.glb');
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    const { globalScrollProgress } = useSceneStore.getState();
    timeRef.current += delta;

    if (!groupRef.current) return;

    const { current, next, progress } = getSectionProgress(globalScrollProgress);
    const from = KEYFRAMES[current];
    const to = KEYFRAMES[next];

    // Smooth ease for transitions
    const ease = progress * progress * (3 - 2 * progress); // smoothstep

    // Interpolate position
    const targetX = THREE.MathUtils.lerp(from.x, to.x, ease);
    const targetY = THREE.MathUtils.lerp(from.y, to.y, ease);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY + Math.sin(timeRef.current * 1.0) * 0.06, // float
      0.08
    );

    // Interpolate scale
    const targetScale = THREE.MathUtils.lerp(from.scale, to.scale, ease);
    const currentScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);
    groupRef.current.scale.setScalar(currentScale);

    // Rotation — continuous with speed modulated by section
    const rotSpeed = THREE.MathUtils.lerp(from.rotSpeed, to.rotSpeed, ease);
    groupRef.current.rotation.y += rotSpeed * delta * 2;

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
