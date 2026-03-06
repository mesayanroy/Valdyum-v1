'use client';

import React from 'react';

const FAQS = [
    {
        id: '01',
        question: 'How does the On-Chain Reputation work?',
        answer: 'Every action your AI agent takes is cryptographically stamped on Solana. This creates an immutable, verifiable history of decisions and performance, allowing investors to audit track records with mathematically proven certainty, eliminating black-box trust issues.'
    },
    {
        id: '02',
        question: 'What models can I use for my agents?',
        answer: 'Valdyum is model-agnostic. You can plug in any LLM—from OpenAI\'s GPT-4 to Anthropic\'s Claude, or even specialized open-source models hosted via Ollama. We provide the execution environment and blockchain rail, you provide the brain.'
    },
    {
        id: '03',
        question: 'How do royalties and monetization actually function?',
        answer: 'When you list a successful agent on the Valdyum Marketplace, its logic becomes a composable primitive. If another developer forks your agent or incorporates its strategy, smart contracts automatically route a defined percentage of their generated yield back to your wallet in real-time.'
    },
    {
        id: '04',
        question: 'Is it completely decentralized?',
        answer: 'The core execution logs, identity verification, and financial routing are entirely handled by Solana smart contracts. While the compute environment (the actual AI inference) currently relies on off-chain infrastructure, the verification and state management are 100% decentralized.'
    },
    {
        id: '05',
        question: 'How fast is the deployment process?',
        answer: 'From finalizing your Python logic to live on-chain execution, deployment takes less than pristine 30 seconds using our CLI. We abstract away the complex Solana RPC endpoints and transaction signing so you can focus entirely on your AI strategy.'
    }
];

export const FaqSection = () => {
    return (
        <section
            id="faq-section"
            className="relative z-10 w-full bg-alabaster py-48 px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-[1400px] mx-auto flex flex-col items-center">

                {/* Section Header */}
                <div className="w-full max-w-4xl text-center mb-32">
                    <span className="inline-block py-1 px-3 rounded-full border border-stone/10 bg-white shadow-sm text-xs font-mono text-stone/50 tracking-widest uppercase mb-6">
                        Knowledge Base
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display text-obsidian font-bold tracking-tight">
                        Frequently Asked <span className="italic font-normal text-stone/40">Questions</span>
                    </h2>
                </div>

                {/* Sticky Stacking Cards Container */}
                <div className="w-full max-w-4xl relative pb-48">
                    {FAQS.map((faq, index) => {
                        // Calculate a staggered top offset so the cards neatly stack like a deck
                        // Assuming header height ~80px + a cascading gap of 40px per card
                        const stickyTop = `calc(120px + ${index * 40}px)`;

                        return (
                            <div
                                key={faq.id}
                                className="sticky w-full mb-12 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)]"
                                style={{
                                    top: stickyTop,
                                    zIndex: 10 + index
                                }}
                            >
                                {/* Card Inner */}
                                <div className="w-full bg-white border border-stone/10 rounded-[32px] p-8 md:p-14 transition-transform duration-500 hover:scale-[1.01] shadow-xl shadow-obsidian/5">

                                    {/* Numbering */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="font-mono text-sm text-stone/40">{faq.id}</span>
                                        <div className="h-px bg-stone/10 flex-grow" />
                                    </div>

                                    {/* Q & A */}
                                    <h3 className="text-2xl md:text-4xl text-obsidian font-display font-medium mb-6 leading-tight">
                                        {faq.question}
                                    </h3>
                                    <p className="text-lg text-stone/60 font-body leading-relaxed max-w-3xl">
                                        {faq.answer}
                                    </p>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
