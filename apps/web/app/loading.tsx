import * as React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-alabaster flex flex-col items-center justify-center gap-6">
            {/* Rotating V logo */}
            <div className="animate-spin-slow">
                <div className="flex h-12 w-12 items-center justify-center border border-obsidian/20">
                    <span className="font-display text-[20px] font-bold text-obsidian">V</span>
                </div>
            </div>

            {/* Typewriter initializing text */}
            <div className="flex items-center gap-1">
                <span className="font-mono text-[12px] text-stone tracking-wider animate-pulse">
          // initializing agent runtime...
                </span>
                <span className="inline-block w-[6px] h-[14px] bg-stone animate-blink" />
            </div>
        </div>
    );
}
