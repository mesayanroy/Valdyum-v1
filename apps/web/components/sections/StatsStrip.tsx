'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 847, label: 'Active Agents', suffix: '', decimals: 0, prefix: '' },
  { value: 12400, label: 'Verified Executions', suffix: '+', decimals: 0, prefix: '' },
  { value: 2.3, label: 'Agent PnL Tracked', prefix: '$', suffix: 'M', decimals: 1 },
  { value: 400, label: 'Avg Settlement', suffix: 'ms', decimals: 0, prefix: '' },
];

export const StatsStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(() => stats.map(() => 0));

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.stat-card');

    // Staggered slide-up entrance
    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Scrub-driven counter — numbers count up as you scroll through
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'bottom 50%',
      scrub: 1,
      onUpdate: (self) => {
        setCounts(stats.map((s) => {
          const eased = self.progress * self.progress * (3 - 2 * self.progress); // smoothstep
          return s.value * Math.min(1, eased * 1.2); // overshoot slightly then clamp
        }));
      },
    });

    // Horizontal progress line
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === sectionRef.current)
        .forEach((t) => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="relative w-full py-24 px-6"
      style={{ background: '#FAFAFA' }}
    >
      {/* Progress line */}
      <div
        ref={progressRef}
        className="absolute top-0 left-0 right-0 h-px bg-obsidian/10 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card neu-light-raised py-10 px-8"
          >
            <div className="font-display text-[clamp(36px,4vw,54px)] font-bold text-obsidian mb-2">
              {stat.prefix && <span className="text-stone/60">{stat.prefix}</span>}
              {counts[i].toFixed(stat.decimals)}
              {stat.suffix && <span className="text-stone/40 text-[0.7em]">{stat.suffix}</span>}
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone/40">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-obsidian/8" />
    </section>
  );
};
