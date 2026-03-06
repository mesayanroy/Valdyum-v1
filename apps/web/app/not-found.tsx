import * as React from 'react';
import { Button } from '@valdyum/ui-kit';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-alabaster flex flex-col items-center justify-center relative overflow-hidden">
      {/* Large Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <span className="font-display text-[40vw] font-bold text-transparent" style={{ WebkitTextStroke: '2px #0A0A0A' }}>
          404
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-obsidian mb-6">
          The Agent Was Not Found.
        </h1>
        <p className="font-body text-lg text-obsidian/60 max-w-md mb-12">
          The pathways of the Forge have shifted, or the entity you seek does not exist.
        </p>
        <a href="/">
          <Button variant="ghost" className="text-obsidian border-obsidian/20 hover:bg-obsidian/5">
            Return Home →
          </Button>
        </a>
      </div>
    </div>
  );
}
