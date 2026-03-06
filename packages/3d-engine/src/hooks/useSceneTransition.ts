import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useSceneStore } from '@valdyum/hooks';

export const useSceneTransition = () => {
  const { camera } = useThree();
  const cameraTarget = useSceneStore((state) => state.cameraTarget);

  useEffect(() => {
    gsap.to(camera.position, {
      x: cameraTarget[0],
      y: cameraTarget[1],
      z: cameraTarget[2] + 5, // Keep some distance
      duration: 1.2,
      ease: 'power2.inOut',
    });
  }, [cameraTarget, camera]);
};
