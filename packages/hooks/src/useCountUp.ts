import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  duration?: number;
  decimal?: boolean;
  prefix?: string;
  suffix?: string;
  startOnView?: boolean;
}

const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const useCountUp = (target: number, options?: UseCountUpOptions) => {
  const {
    duration = 1800,
    decimal = false,
    prefix = '',
    suffix = '',
    startOnView = false,
  } = options || {};

  const [value, setValue] = useState<string>(
    `${prefix}${decimal ? '0.0' : '0'}${suffix}`
  );
  const ref = useRef<HTMLElement | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      const currentVal = target * easeOutQuart(percent);
      
      const formattedVal = decimal 
        ? currentVal.toFixed(1) 
        : Math.round(currentVal).toString();
        
      setValue(`${prefix}${formattedVal}${suffix}`);

      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;
      animationFrameId = requestAnimationFrame(animate);
    };

    if (startOnView) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            if (ref.current) observer.unobserve(ref.current);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        observer.disconnect();
      };
    } else {
      startAnimation();
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }
  }, [target, duration, decimal, prefix, suffix, startOnView]);

  return { value, ref };
};
