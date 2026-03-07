'use client';

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

/* ── Manual SplitText (no GSAP Club needed) ─────────── */
const SplitChars = ({
  children,
  className,
  'data-hero': dataHero,
}: {
  children: React.ReactNode;
  className?: string;
  'data-hero'?: string;
}) => {
  const text = typeof children === 'string' ? children : '';
  // Split into segments: plain text chars and React elements (like <em>)
  return (
    <span className={className} data-hero={dataHero}>
      {React.Children.toArray(
        typeof children === 'string'
          ? text.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block"
              style={{ opacity: 0, transform: 'translateY(40px) rotate(3deg)' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))
          : // Handle mixed content (text + <em> + <br/>)
          React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              return child.split('').map((char, i) => (
                <span
                  key={`t-${i}`}
                  className="hero-char inline-block"
                  style={{ opacity: 0, transform: 'translateY(40px) rotate(3deg)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ));
            }
            // For React elements like <em> or <br/>, wrap their text children too
            if (React.isValidElement(child)) {
              const el = child as React.ReactElement<{ children?: React.ReactNode; className?: string }>;
              if (el.type === 'br') return <br key="br" />;
              const innerText = typeof el.props.children === 'string' ? el.props.children : '';
              return React.cloneElement(el, {
                ...el.props,
                children: innerText.split('').map((char: string, i: number) => (
                  <span
                    key={`em-${i}`}
                    className="hero-char inline-block"
                    style={{ opacity: 0, transform: 'translateY(40px) rotate(3deg)' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                )),
              } as React.Attributes & { children: React.ReactNode });
            }
            return child;
          })
      )}
    </span>
  );
};

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    if (!sectionRef.current || !mounted) return;

    const chars = sectionRef.current.querySelectorAll('.hero-char');

    const tl = gsap.timeline({
      onComplete: () => {
        // Parallax scroll-out: headline moves slower, tagline faster
        gsap.to('[data-hero="headline"]', {
          y: -60,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '55% top',
            scrub: 1,
          },
        });
        gsap.to('[data-hero="tagline"]', {
          y: -90,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
        });
        gsap.to('[data-hero="eyebrow"], [data-hero="form"], [data-hero="scroll-hint"]', {
          y: -40,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1,
          },
        });
      },
    });

    // Eyebrow fade in
    tl.fromTo('[data-hero="eyebrow"]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.2
    );

    // Kinetic typography — stagger each character
    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotation: 0,
      stagger: 0.025,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.4);

    // Tagline
    tl.fromTo('[data-hero="tagline"]',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.2
    );

    // Form slide up
    tl.fromTo('[data-hero="form"]',
      { opacity: 0, y: 20, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
      1.5
    );

    // Scroll hint
    tl.fromTo('[data-hero="scroll-hint"]',
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' },
      2.0
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === sectionRef.current || sectionRef.current?.contains(t.trigger as Node))
        .forEach((t) => t.kill());
    };
  }, { scope: sectionRef, dependencies: [mounted] });

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative flex min-h-screen items-center bg-transparent overflow-hidden"
    >
      {/* Aurora orbs — subtle floating background color */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="aurora-orb aurora-orb-1"
          style={{
            width: '600px', height: '600px',
            top: '-10%', left: '-5%',
            background: 'radial-gradient(circle, rgba(0,255,102,0.04) 0%, transparent 70%)',
          }}
        />
        <div
          className="aurora-orb aurora-orb-2"
          style={{
            width: '500px', height: '500px',
            bottom: '-15%', right: '10%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%)',
          }}
        />
        <div
          className="aurora-orb aurora-orb-3"
          style={{
            width: '400px', height: '400px',
            top: '30%', left: '25%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.025) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Left side — Text content */}
      <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left px-6 md:pl-[clamp(24px,6vw,100px)] md:pr-6 max-w-full md:max-w-[55%] py-12">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 mb-16" aria-label="Valdyum Home">
          <Image
            src="/Valdyum-logo.png"
            alt="Valdyum Logo"
            width={330}
            height={100}
            className="h-20 md:h-28 w-auto object-contain"
            priority
          />
        </a>

        {/* Eyebrow */}
        <div
          data-hero="eyebrow"
          className="mb-6 md:mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-stone/50"
        >
          Open-Source AI Infrastructure on Solana
        </div>

        {/* Headline — Kinetic char stagger */}
        <h1
          data-hero="headline"
          className="mb-6 md:mb-8 font-display text-[clamp(36px,6vw,88px)] font-bold leading-[0.92] tracking-[-0.02em] text-obsidian"
        >
          <SplitChars>
            Build <em className="font-normal italic text-stone/40">with</em> Agents.
          </SplitChars>
          <br />
          <SplitChars>
            Scale <em className="font-normal italic text-stone/40">with</em> Solana.
          </SplitChars>
        </h1>

        {/* Tagline */}
        <p
          data-hero="tagline"
          className="mb-8 md:mb-10 max-w-[44ch] font-body text-[clamp(14px,1.2vw,17px)] leading-[1.7] text-stone/60"
        >
          Deploy, verify, and monetize autonomous AI agents with cryptographic proof.
          Every execution is on-chain. Every agent has a soul.
        </p>

        {/* Waitlist Form — Glass container + Neumorphic input */}
        <div
          data-hero="form"
          className="glass-light relative p-1"
          style={{ border: '1px solid rgba(10,10,10,0.06)' }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[420px] flex-col sm:flex-row items-stretch sm:items-center gap-0"
          >
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
          <p className="mt-3 font-mono text-[11px] text-ichor/70 tracking-wider">
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

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[160px] pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(to bottom, transparent, #FAFAFA)' }}
      />

      {/* Scroll hint */}
      <div
        data-hero="scroll-hint"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[clamp(24px,6vw,100px)] flex flex-col items-center gap-2 z-10"
      >
        <div className="h-10 w-px animate-scroll-pulse bg-gradient-to-b from-stone/20 to-transparent" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stone/30">
          Scroll
        </span>
      </div>
    </section>
  );
};
