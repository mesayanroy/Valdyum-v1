'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CtaBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.message === 'already_exists') {
        setStatus('duplicate');
      } else if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Parallax watermark — moves at 0.3× scroll speed
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Scale-bounce form entrance
    const form = sectionRef.current.querySelector('.cta-form');
    if (form) {
      gsap.fromTo(form,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Headline fade-in
    const headline = sectionRef.current.querySelector('.cta-headline');
    if (headline) {
      gsap.fromTo(headline,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Background color shift — slightly darker as you scroll in
    gsap.fromTo(sectionRef.current,
      { backgroundColor: '#FAFAFA' },
      {
        backgroundColor: '#F2EDE6',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => sectionRef.current?.contains(t.trigger as Node) || t.trigger === sectionRef.current)
        .forEach((t) => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative py-[clamp(120px,15vw,200px)] px-[clamp(24px,6vw,100px)] overflow-hidden flex items-center justify-center text-center"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* Parallax watermark */}
      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
      >
        <span className="font-display text-[clamp(100px,16vw,200px)] font-black text-transparent [-webkit-text-stroke:1px_rgba(10,10,10,0.06)]">
          VALDYUM
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.4em] text-stone/40">
          Get Early Access
        </span>
        <h2 className="cta-headline font-display text-[clamp(36px,5vw,64px)] font-bold text-obsidian mb-4 leading-[1.05]">
          Be the First <em className="font-normal italic text-stone/40">to</em> Build.
        </h2>
        <p className="font-body text-[15px] text-stone/50 mb-10 max-w-[40ch] leading-[1.7]">
          Join the waitlist. Get early access to the CLI, marketplace, and agent SDK before public launch.
        </p>

        {/* Glass form with neumorphic input */}
        <div
          className="cta-form glass-light relative p-1"
          style={{ border: '1px solid rgba(10,10,10,0.06)' }}
        >
          <form onSubmit={handleSubmit} className="flex w-full max-w-[420px] flex-col sm:flex-row items-stretch sm:items-center gap-0">
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="neu-light-sunken flex-1 px-5 py-3.5 font-mono text-[13px] text-obsidian placeholder:text-stone/40 outline-none border-none"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="whitespace-nowrap bg-obsidian px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.15em] text-alabaster transition-all hover:bg-obsidian/85 active:scale-[0.98] disabled:opacity-60 w-full sm:w-auto"
            >
              {status === 'loading' ? '...' : status === 'success' ? '✓ Joined' : 'Join Waitlist'}
            </button>
          </form>
        </div>

        {status === 'success' && (
          <p className="mt-3 font-mono text-[11px] text-stone/50 tracking-wider">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        )}
        {status === 'duplicate' && (
          <p className="mt-3 font-mono text-[11px] text-stone/50 tracking-wider">
            You&apos;re already on the list!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-3 font-mono text-[11px] text-red-500/70 tracking-wider">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
};
