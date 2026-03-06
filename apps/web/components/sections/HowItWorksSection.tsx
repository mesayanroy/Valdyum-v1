'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSceneStore } from '@valdyum/hooks';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Define',
        description: 'Write your agent logic in Python or TypeScript. Use any LLM — OpenAI, Ollama, LangGraph — and define its strategy, triggers, and outputs.',
        accent: 'Strategy',
    },
    {
        number: '02',
        title: 'Deploy',
        description: 'Ship to Solana with a single CLI command. Your agent receives an on-chain identity, execution log, and verifiable reputation from day one.',
        accent: 'On-Chain',
    },
    {
        number: '03',
        title: 'Verify',
        description: 'Every execution is cryptographically stamped. Investors and users can audit the full decision history — no black boxes, no trust required.',
        accent: 'Proof',
    },
    {
        number: '04',
        title: 'Monetize',
        description: 'List on the marketplace. Other users can fork your agent, inherit its track record, and when forks profit — you earn royalties via smart contracts.',
        accent: 'Royalties',
    },
];

export const HowItWorksSection = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    // Measure track width
    useEffect(() => {
        const measure = () => {
            if (trackRef.current) {
                const totalScroll = trackRef.current.scrollWidth - window.innerWidth;
                setScrollWidth(Math.max(0, totalScroll));
                setWindowHeight(window.innerHeight);
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useGSAP(() => {
        if (!wrapperRef.current || !trackRef.current || scrollWidth <= 0) return;

        // Horizontal scroll
        const tween = gsap.to(trackRef.current, {
            x: -scrollWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    useSceneStore.getState().setHowItWorksProgress(self.progress);
                }
            },
        });

        // Progress bar
        if (progressBarRef.current) {
            gsap.fromTo(progressBarRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1,
                    },
                }
            );
        }

        // Panel content parallax — each card's inner content slides in with offset
        const panels = wrapperRef.current.querySelectorAll('.step-panel');
        panels.forEach((panel) => {
            const inner = panel.querySelector('.step-inner');
            if (inner) {
                gsap.fromTo(inner,
                    { y: 30, opacity: 0.5 },
                    {
                        y: 0,
                        opacity: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: panel,
                            start: 'left 80%',
                            end: 'left 30%',
                            scrub: 1,
                            containerAnimation: tween,
                        },
                    }
                );
            }
        });

        return () => {
            tween.scrollTrigger?.kill();
            ScrollTrigger.getAll()
                .filter((t) => wrapperRef.current?.contains(t.trigger as Node))
                .forEach((t) => t.kill());
        };
    }, { scope: wrapperRef, dependencies: [scrollWidth] });

    return (
        <div
            id="how-it-works-section"
            ref={wrapperRef}
            style={{
                height: scrollWidth > 0 && windowHeight > 0 ? `${scrollWidth + windowHeight}px` : 'auto',
                background: '#0E0C0A',
            }}
        >
            {/* Sticky container */}
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                {/* Progress bar at bottom */}
                <div
                    ref={progressBarRef}
                    className="absolute bottom-0 left-0 right-0 h-[2px] z-20 origin-left"
                    style={{
                        background: 'linear-gradient(90deg, rgba(0,255,102,0.5), rgba(0,229,255,0.4))',
                        transform: 'scaleX(0)',
                    }}
                />

                <div
                    ref={trackRef}
                    className="flex h-full items-center"
                    style={{ width: 'max-content' }}
                >
                    {/* Intro panel */}
                    <div className="flex h-full w-screen flex-col justify-center pl-[clamp(24px,6vw,100px)] pr-12">
                        <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
                            How It Works
                        </span>
                        <h2 className="font-display text-[clamp(40px,5.5vw,72px)] font-bold leading-[0.95] text-white max-w-[500px]">
                            From Idea{' '}
                            <em className="font-normal italic text-white/40">to</em>{' '}
                            Income.
                        </h2>
                        <p className="mt-6 max-w-[380px] font-body text-[15px] leading-[1.7] text-white/40">
                            Four steps to launch, verify, and monetize your agent on Solana.
                        </p>
                        <div className="mt-10 flex items-center gap-3">
                            <div className="h-px w-12 bg-white/20" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
                                Scroll →
                            </span>
                        </div>
                    </div>

                    {/* Step panels — neumorphic dark raised + elastic hover */}
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="step-panel flex h-full w-[480px] flex-shrink-0 items-center border-l border-white/8 px-12"
                        >
                            <div className="step-inner neu-dark-raised p-10 w-full transition-transform duration-300 hover:scale-[1.03] hover:skewY-[-0.5deg]">
                                <span className="mb-6 block font-mono text-[11px] tracking-[0.3em] text-white/20">
                                    {step.number}
                                </span>
                                <span className="mb-4 inline-block neu-dark-glow-ichor px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                                    {step.accent}
                                </span>
                                <h3 className="mb-6 font-display text-[clamp(32px,3.5vw,48px)] font-bold text-white">
                                    {step.title}
                                </h3>
                                <p className="max-w-[340px] font-body text-[14px] leading-[1.7] text-white/45">
                                    {step.description}
                                </p>
                                <div className="mt-8 h-px w-16 bg-white/10" />
                            </div>
                        </div>
                    ))}

                    {/* Padding space so the final 4th card can scroll to the center of the screen */}
                    <div className="w-[50vw] flex-shrink-0" />
                </div>
            </div>
        </div>
    );
};
