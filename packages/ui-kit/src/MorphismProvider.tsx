'use client';

import * as React from 'react';

interface MorphismProviderProps {
    children: React.ReactNode;
}

export function MorphismProvider({ children }: MorphismProviderProps) {
    React.useEffect(() => {
        const supportsGlass =
            CSS.supports('backdrop-filter', 'blur(1px)') ||
            CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
        document.body.setAttribute('data-glass-supported', String(supportsGlass));
        document.body.setAttribute('data-morphism-ready', 'true');

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.body.setAttribute('data-reduced-motion', String(prefersReduced));

        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e: MediaQueryListEvent) => {
            document.body.setAttribute('data-reduced-motion', String(e.matches));
        };
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return <>{children}</>;
}
