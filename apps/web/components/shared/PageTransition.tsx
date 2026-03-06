'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => {
          setDisplayChildren(children);

          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        },
      });
    });

    return () => ctx.revert();
  }, [pathname, children]);

  return (
    <div ref={containerRef}>
      {displayChildren}
    </div>
  );
};
