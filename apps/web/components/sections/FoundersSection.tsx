import React from 'react';
import Image from 'next/image';

const FOUNDERS = [
    {
        name: 'Sayan Roy',
        title: 'FOUNDER',
        image: '/founder_avatar.png',
        linkedin: 'https://www.linkedin.com/in/mesayanroy/',
        x: 'https://x.com/mesayanroy'
    },
    {
        name: 'Satish Jalan',
        title: 'CO-FOUNDER',
        image: '/founder_avatar.png',
        linkedin: 'https://www.linkedin.com/in/satish-jalan/',
        x: 'https://x.com/SatishJalan52'
    }
];

export const FoundersSection = () => {
    return (
        <section className="relative z-10 w-full bg-alabaster border-t border-stone/10 py-16 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24">

                {/* Left Column - Section Title */}
                <div className="md:w-1/4 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone/50">
                        WHO WE ARE
                    </span>
                </div>

                {/* Right Column - Content */}
                <div className="md:w-3/4 flex flex-col">
                    <h2 className="font-display text-4xl md:text-5xl text-obsidian mb-16 md:mb-20">
                        Founders
                    </h2>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-32">
                        {FOUNDERS.map((founder, i) => (
                            <div key={i} className="flex items-start group">
                                {/* Text Content */}
                                <div className="flex flex-col mr-8 md:mr-10 pt-2 shrink-0">
                                    <h3 className="font-display text-xl tracking-tight text-obsidian transition-colors group-hover:text-stone/60">{founder.name}</h3>
                                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone/40 mt-1">
                                        {founder.title}
                                    </span>

                                    <div className="flex items-center gap-3 mt-4">
                                        <a href={founder.linkedin} className="flex items-center justify-center w-[18px] h-[18px] rounded-[3px] bg-obsidian text-alabaster text-[9px] hover:bg-stone/70 transition-colors font-bold shadow-sm">
                                            in
                                        </a>
                                        <a href={founder.x} className="flex items-center justify-center w-[18px] h-[18px] text-obsidian text-[13px] hover:text-stone/50 transition-colors font-bold pt-px">
                                            𝕏
                                        </a>
                                    </div>
                                </div>

                                {/* Avatar */}
                                <div className="relative w-32 h-32 md:w-[140px] md:h-[140px] bg-white border border-stone/10 shadow-sm overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-[1.02]">
                                    <Image
                                        src={founder.image}
                                        alt={founder.name}
                                        fill
                                        className="object-cover object-center mix-blend-multiply"
                                    />
                                    {/* Subtle gradient overlay to match light theme aesthetic */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-stone-50/20 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
