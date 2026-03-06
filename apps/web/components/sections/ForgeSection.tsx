'use client';

import * as React from 'react';
import { useScrollReveal } from '@valdyum/hooks';
import { TerminalWindow, type TerminalLine } from '@valdyum/ui-kit';

const TERMINAL_LINES: TerminalLine[] = [
  { type: 'comment', text: '# Install Valdyum CLI' },
  { type: 'cmd', text: 'pip install valdyum', prompt: '~' },
  { type: 'success', text: '✓ Installed valdyum v0.4.2' },
  { type: 'empty', text: '' },
  { type: 'comment', text: '# Initialize — GPU detected, wallet connected' },
  { type: 'cmd', text: 'valdyum init', prompt: '~' },
  { type: 'info', text: '⚡ GPU detected: RTX 4090 → routing to Ollama' },
  { type: 'info', text: '🔑 Wallet connected: 5xKR...p9aM' },
  { type: 'success', text: '✓ Network: Solana Mainnet-Beta (Helius RPC)' },
  { type: 'empty', text: '' },
  { type: 'comment', text: '# Browse verified templates' },
  { type: 'cmd', text: 'valdyum template list --verified', prompt: '~' },
  { type: 'dim', text: '  JITO-MEV-v1     Win: 68.2%   PnL: +$22,100' },
  { type: 'dim', text: '  WHALE-WATCH-PRO Uptime: 99.9% Trades: 2.8M' },
  { type: 'dim', text: '  DELTA-HUNTER-V3 Win: 61.0%   Forks: 5' },
  { type: 'empty', text: '' },
  { type: 'comment', text: '# Deploy your agent on-chain' },
  { type: 'cmd', text: 'valdyum deploy --dry-run', prompt: '~' },
  { type: 'info', text: '→ Building bundle...' },
  { type: 'info', text: '→ Minting cNFT identity (Metaplex Bubblegum)...' },
  { type: 'hash', text: '  TX: 3nFgX8...Kp2M | Block: 287,440,198' },
  { type: 'success', text: '✓ Agent live. PDA: 7xK3...F9mQ' },
  { type: 'empty', text: '' },
  { type: 'cmd', text: 'valdyum status', prompt: '~', delay: 800 },
];

export const ForgeSection = () => {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section id="forge" ref={ref} className="relative py-[clamp(80px,10vw,140px)] px-[clamp(24px,5vw,80px)] bg-obsidian overflow-hidden">
      {/* Radial gradient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_right,rgba(255,59,0,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-forge" />
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-forge">
              IV — DEVELOPER EXPERIENCE
            </span>
          </div>

          <h2 className="font-display text-[clamp(36px,5vw,68px)] font-semibold leading-[1.05] mb-8 text-alabaster">
            First Agent<br />
            <span className="italic font-normal text-white/40">Running in 15min.</span>
          </h2>

          <p className="font-body text-[clamp(16px,1.3vw,19px)] text-white/50 leading-[1.65] max-w-[52ch] mb-12">
            The Valdyum CLI handles the complexity of Solana transactions, Arweave uploads, and cryptographic proofs so you can focus on strategy logic.
          </p>

          <div className="flex flex-col">
            {[
              "Install CLI via pip or npm",
              "Initialize project & connect Solana wallet",
              "Write strategy in Python or TypeScript",
              "Deploy with one command. Identity minted automatically."
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start py-4 border-t border-white/[0.06]">
                <span className="font-mono text-[9px] text-forge tracking-[0.15em] min-w-[24px]">
                  0{i + 1}
                </span>
                <span className="font-mono text-xs text-white/60 leading-[1.6]">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT TERMINAL */}
        <div className="reveal reveal-delay-1">
          <TerminalWindow
            lines={TERMINAL_LINES}
            autoPlay={true}
            cursorVariant="forge"
          />
        </div>

      </div>
    </section>
  );
};
