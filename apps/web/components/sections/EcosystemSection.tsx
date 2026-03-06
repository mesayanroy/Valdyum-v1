'use client';

import * as React from 'react';
import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = ['Solana', 'Jito', 'Helius', 'Arweave', 'Metaplex', 'LangGraph', 'Triton', 'Ollama'];

export const EcosystemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Magnetic hover effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const cell = e.currentTarget;
    const rect = cell.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cell, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Clip-path headline wipe — reveal from left to right
    const headline = sectionRef.current.querySelector('.eco-headline');
    if (headline) {
      gsap.fromTo(headline,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: headline,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Staggered grid entrance — each cell fades/scales in
    const cells = sectionRef.current.querySelectorAll('.eco-cell');
    gsap.fromTo(cells,
      { opacity: 0, scale: 0.85, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Node))
        .forEach((t) => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      id="ecosystem-section"
      ref={sectionRef}
      className="py-[clamp(100px,12vw,160px)] px-[clamp(24px,6vw,100px)] bg-alabaster"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header — clip-path wipe */}
        <div className="mb-16">
          <span className="block mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-stone/40">
            Ecosystem
          </span>
          <h2 className="eco-headline font-display text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] text-obsidian">
            Built on the{' '}
            <em className="font-normal italic text-stone/50">Best Stack.</em>
          </h2>
        </div>

        {/* Tech grid — neumorphic cells with magnetic hover */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5"
        >
          {techStack.map((logo, i) => (
            <div
              key={i}
              className="eco-cell neu-light-raised p-8 flex items-center justify-center font-display text-[13px] tracking-[0.15em] text-stone/50 cursor-default transition-colors hover:text-obsidian"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
