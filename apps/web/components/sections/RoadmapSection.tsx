'use client';

import * as React from 'react';
import { useScrollReveal } from '@valdyum/hooks';

export const RoadmapSection = () => {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section ref={ref} className="py-[clamp(80px,10vw,140px)] px-[clamp(24px,5vw,80px)] bg-obsidian-2">
      <div className="max-w-[1280px] mx-auto">
        
        <div className="flex items-center gap-3 mb-16 reveal">
          <div className="w-6 h-px bg-stone-2" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-stone-2">
            ROADMAP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/[0.06] reveal reveal-delay-1">
          
          {/* Phase I */}
          <div className="border-b md:border-b-0 md:border-r border-white/[0.06] px-8 py-10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-10 font-display text-[160px] font-black text-transparent [-webkit-text-stroke:1px_theme(colors.ichor)] opacity-20 select-none">
              I
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[8px] text-ichor uppercase tracking-widest mb-6">● Live Now</div>
              <h3 className="font-display text-[20px] text-alabaster mb-3">Foundation</h3>
              <p className="font-body text-[15px] text-white/40 mb-8">Core infrastructure for verifiable AI agents on Solana.</p>
              <ul className="flex flex-col gap-3">
                {['TAPEDRIVE Protocol v1', 'Valdyum CLI Beta', 'Basic Marketplace', 'Arweave Integration', 'Ed25519 Signatures'].map((item, i) => (
                  <li key={i} className="flex gap-2 font-mono text-[10px] text-white/35">
                    <span className="text-ichor">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Phase II */}
          <div className="border-b md:border-b-0 md:border-r border-white/[0.06] px-8 py-10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-10 font-display text-[160px] font-black text-transparent [-webkit-text-stroke:1px_#B8902A] opacity-20 select-none">
              II
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[8px] text-[#B8902A] uppercase tracking-widest mb-6">◐ Coming Next</div>
              <h3 className="font-display text-[20px] text-alabaster mb-3">Commerce</h3>
              <p className="font-body text-[15px] text-white/40 mb-8">Enabling agent-to-agent micropayments and complex workflows.</p>
              <ul className="flex flex-col gap-3">
                {['0x402 Protocol Implementation', 'Agent Swarms', 'Advanced Analytics', 'Creator Royalties', 'Fiat On-ramps'].map((item, i) => (
                  <li key={i} className="flex gap-2 font-mono text-[10px] text-white/35">
                    <span className="text-[#B8902A]">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Phase III */}
          <div className="px-8 py-10 relative overflow-hidden group">
            <div className="absolute -right-4 -top-10 font-display text-[160px] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] opacity-20 select-none">
              III
            </div>
            <div className="relative z-10">
              <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mb-6">○ Future</div>
              <h3 className="font-display text-[20px] text-alabaster mb-3">Autonomy</h3>
              <p className="font-body text-[15px] text-white/40 mb-8">Fully decentralized execution and self-improving models.</p>
              <ul className="flex flex-col gap-3">
                {['Decentralized Compute', 'Zero-Knowledge Proofs', 'Cross-chain Agents', 'Governance DAO', 'Self-funding Agents'].map((item, i) => (
                  <li key={i} className="flex gap-2 font-mono text-[10px] text-white/35">
                    <span className="text-white/20">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
