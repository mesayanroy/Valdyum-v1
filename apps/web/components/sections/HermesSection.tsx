'use client';

import * as React from 'react';
import { useScrollReveal } from '@valdyum/hooks';

export const HermesSection = () => {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section ref={ref} className="py-[clamp(80px,10vw,140px)] px-[clamp(24px,5vw,80px)] bg-alabaster">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT CONTENT */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-ichor" />
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-ichor">
              III — AI-TO-AI COMMERCE
            </span>
          </div>
          
          <h2 className="font-display text-[clamp(36px,5vw,68px)] font-semibold leading-[1.05] mb-8 text-obsidian">
            Agents That<br />
            <span className="italic font-normal text-stone">Pay Each Other.</span>
          </h2>
          
          <p className="font-body text-[clamp(16px,1.3vw,19px)] text-stone leading-[1.65] max-w-[52ch] mb-12">
            Using the 0x402 protocol, Valdyum agents can autonomously negotiate and settle micropayments for data, compute, or API access at the speed of Solana.
          </p>
          
          <div className="bg-alabaster-2 p-6 border border-alabaster-3 font-mono text-[11px] text-obsidian-3 leading-[1.8]">
            <div className="text-stone-2 mb-2"># Technical Specs</div>
            <div><span className="text-ichor">Protocol:</span> HTTP 402 Payment Required</div>
            <div><span className="text-ichor">Settlement:</span> Solana SPL Tokens / USDC</div>
            <div><span className="text-ichor">Latency:</span> ~400ms finality</div>
            <div><span className="text-ichor">Auth:</span> Ed25519 Agent Signatures</div>
          </div>
        </div>

        {/* RIGHT PAYMENT STAGE */}
        <div className="relative h-[400px] w-full reveal reveal-delay-1">
          
          {/* Timing Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-alabaster border border-alabaster-3 px-4 py-2 z-10 shadow-sm">
            <span className="font-mono text-[9px] text-stone-2 uppercase tracking-wider">
              Settlement: <strong className="text-ichor">~400ms</strong> on Solana
            </span>
          </div>

          {/* Left Agent Node */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[160px] bg-obsidian border border-ichor/15 p-5 shadow-hard-dark z-10">
            <div className="w-8 h-8 border border-ichor/30 flex items-center justify-center font-mono text-[10px] text-ichor mb-4">
              ⚡
            </div>
            <div className="font-display text-[10px] tracking-widest uppercase text-alabaster mb-1">ARB Agent</div>
            <div className="font-mono text-[8px] text-white/30 uppercase tracking-wider">Requesting</div>
          </div>

          {/* Right Agent Node */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[160px] bg-obsidian border border-ichor/15 p-5 shadow-hard-dark z-10">
            <div className="w-8 h-8 border border-ichor/30 flex items-center justify-center font-mono text-[10px] text-ichor mb-4">
              📡
            </div>
            <div className="font-display text-[10px] tracking-widest uppercase text-alabaster mb-1">Data Feed</div>
            <div className="font-mono text-[8px] text-white/30 uppercase tracking-wider">Providing</div>
          </div>

          {/* Particle Stream */}
          <div className="absolute left-[168px] right-[168px] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-ichor/0 via-ichor/20 to-ichor/0 overflow-hidden">
            {[0, 0.4, 0.8, 1.2].map((delay, i) => (
              <div 
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-ichor animate-stream"
                style={{ animationDelay: `${delay}s`, boxShadow: '0 0 6px #00FF66' }}
              />
            ))}
          </div>

          {/* Center Floating Label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-alabaster border border-alabaster-3 p-2 text-center shadow-sm z-20">
            <div className="font-mono text-[11px] font-bold text-obsidian mb-1">0.024 SOL</div>
            <div className="font-mono text-[8px] uppercase text-stone-2 tracking-wider">Micropayment</div>
          </div>

          {/* HTTP Sequence */}
          <div className="absolute bottom-0 left-0 w-full flex border border-alabaster-3 bg-alabaster">
            {[
              { code: '200', desc: 'Request', color: 'text-ichor' },
              { code: '402', desc: 'Pay Required', color: 'text-[#B8902A]' },
              { code: '⚡', desc: 'Settle', color: 'text-obsidian' },
              { code: '200', desc: 'Delivered', color: 'text-ichor' }
            ].map((step, i) => (
              <div key={i} className="flex-1 p-3 text-center border-r border-alabaster-3 last:border-0">
                <div className={`font-mono text-[10px] font-bold mb-1 ${step.color}`}>{step.code}</div>
                <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-stone-2">{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
