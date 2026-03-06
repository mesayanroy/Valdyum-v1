'use client';

import * as React from 'react';

type AuroraPreset = 'hero' | 'tapedrive' | 'lineage' | 'hermes' | 'pricing' | 'cta' | 'dashboard';

interface OrbConfig {
    x: string;
    y: string;
    size: number;
    color: string;
    opacity: number;
    blur: number;
    animClass: string;
}

interface AuroraBackgroundProps {
    preset: AuroraPreset;
    animated?: boolean;
    intensity?: number;
}

const presets: Record<AuroraPreset, OrbConfig[]> = {
    hero: [
        { x: '75%', y: '20%', size: 700, color: '255,215,0', opacity: 0.04, blur: 100, animClass: 'aurora-orb-1' },
        { x: '15%', y: '85%', size: 600, color: '184,144,42', opacity: 0.03, blur: 90, animClass: 'aurora-orb-2' },
        { x: '60%', y: '50%', size: 500, color: '255,215,0', opacity: 0.02, blur: 80, animClass: 'aurora-orb-3' },
    ],
    tapedrive: [
        { x: '70%', y: '50%', size: 600, color: '0,255,102', opacity: 0.03, blur: 100, animClass: 'aurora-orb-1' },
        { x: '45%', y: '10%', size: 500, color: '250,240,220', opacity: 0.05, blur: 90, animClass: 'aurora-orb-2' },
    ],
    lineage: [
        { x: '50%', y: '50%', size: 800, color: '255,215,0', opacity: 0.04, blur: 120, animClass: 'aurora-orb-1' },
        { x: '80%', y: '80%', size: 400, color: '0,255,102', opacity: 0.025, blur: 80, animClass: 'aurora-orb-3' },
    ],
    hermes: [
        { x: '50%', y: '45%', size: 500, color: '0,255,102', opacity: 0.04, blur: 100, animClass: 'aurora-orb-1' },
        { x: '20%', y: '50%', size: 300, color: '0,229,255', opacity: 0.025, blur: 80, animClass: 'aurora-orb-2' },
        { x: '80%', y: '50%', size: 300, color: '0,229,255', opacity: 0.025, blur: 80, animClass: 'aurora-orb-3' },
    ],
    pricing: [
        { x: '50%', y: '50%', size: 400, color: '0,255,102', opacity: 0.06, blur: 60, animClass: 'aurora-pricing' },
    ],
    cta: [
        { x: '50%', y: '50%', size: 800, color: '255,215,0', opacity: 0.03, blur: 120, animClass: 'aurora-orb-1' },
        { x: '20%', y: '80%', size: 500, color: '0,255,102', opacity: 0.02, blur: 90, animClass: 'aurora-orb-2' },
    ],
    dashboard: [
        { x: '85%', y: '5%', size: 600, color: '255,59,0', opacity: 0.06, blur: 100, animClass: 'aurora-orb-1' },
        { x: '10%', y: '90%', size: 500, color: '180,80,0', opacity: 0.04, blur: 90, animClass: 'aurora-orb-2' },
        { x: '50%', y: '50%', size: 700, color: '255,59,0', opacity: 0.03, blur: 110, animClass: 'aurora-orb-3' },
    ],
};

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
    preset,
    animated = true,
    intensity = 1,
}) => {
    const orbs = presets[preset];

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {orbs.map((orb, i) => (
                <div
                    key={`${preset}-orb-${i}`}
                    className={`aurora-orb ${animated ? orb.animClass : ''}`}
                    style={{
                        left: orb.x,
                        top: orb.y,
                        width: orb.size,
                        height: orb.size,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, rgba(${orb.color},${orb.opacity * intensity}) 0%, transparent 70%)`,
                        filter: `blur(${orb.blur}px)`,
                    }}
                />
            ))}
        </div>
    );
};
