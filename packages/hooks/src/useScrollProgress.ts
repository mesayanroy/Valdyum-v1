import { useState, useEffect } from 'react';

export const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the element has been scrolled past
      // 0 = top of element hits bottom of viewport
      // 1 = bottom of element hits top of viewport
      const totalScrollDistance = rect.height + windowHeight;
      const scrolledDistance = windowHeight - rect.top;
      
      let currentProgress = scrolledDistance / totalScrollDistance;
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);

  return { progress };
};
