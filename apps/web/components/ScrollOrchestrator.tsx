'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneStore, type ActiveSection } from '@valdyum/hooks';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS: { id: string; name: ActiveSection }[] = [
    { id: 'hero-section', name: 'hero' },
    { id: 'stats-section', name: 'stats' },
    { id: 'how-it-works-section', name: 'howItWorks' },
    { id: 'ecosystem-section', name: 'ecosystem' },
    { id: 'cta-section', name: 'cta' },
];

// Model opacity per section
const SECTION_OPACITY: Record<ActiveSection, number> = {
    hero: 1.0,
    stats: 0.55,
    howItWorks: 0.3,
    ecosystem: 0.45,
    cta: 0.0,
};

export const ScrollOrchestrator = () => {
    const triggersRef = useRef<ScrollTrigger[]>([]);
    const opacityObjRef = useRef({ value: 1.0 });
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const store = useSceneStore.getState();

        // 1. Global scroll progress
        const mainEl = document.querySelector('main');
        if (mainEl) {
            const globalTrigger = ScrollTrigger.create({
                trigger: mainEl,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self) => {
                    store.setGlobalScrollProgress(self.progress);
                },
            });
            triggersRef.current.push(globalTrigger);
        }

        // 2. Per-section: active state + model opacity
        const setOpacity = (name: ActiveSection) => {
            store.setActiveSection(name);

            // Kill previous tween
            if (tweenRef.current) tweenRef.current.kill();

            // Tween a proxy object, write to store on each frame
            tweenRef.current = gsap.to(opacityObjRef.current, {
                value: SECTION_OPACITY[name],
                duration: 0.6,
                ease: 'power2.out',
                onUpdate: () => {
                    store.setModelOpacity(opacityObjRef.current.value);
                },
            });
        };

        SECTIONS.forEach(({ id, name }) => {
            const el = document.getElementById(id);
            if (!el) return;

            const trigger = ScrollTrigger.create({
                trigger: el,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => setOpacity(name),
                onEnterBack: () => setOpacity(name),
            });
            triggersRef.current.push(trigger);
        });

        return () => {
            triggersRef.current.forEach((t) => t.kill());
            triggersRef.current = [];
            if (tweenRef.current) tweenRef.current.kill();
        };
    }, []);

    return null;
};
