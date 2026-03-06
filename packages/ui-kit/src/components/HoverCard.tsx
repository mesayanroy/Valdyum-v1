'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { Badge } from './Badge';

export interface HoverCardProps {
  children: React.ReactNode;
  sparklineData: number[];
  recentHashes: string[];
  isVerified: boolean;
}

export const HoverCard = ({ children, sparklineData, recentHashes, isVerified }: HoverCardProps) => {
  // Simple SVG sparkline generator
  const generateSparkline = (data: number[]) => {
    if (!data || data.length === 0) return '';
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 30;

    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' L ');

    return `M ${points}`;
  };

  return (
    <HoverCardPrimitive.Root openDelay={300} closeDelay={100}>
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className="z-50 w-64 p-4 rounded-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          sideOffset={5}
          style={{
            background: 'rgba(12,11,9,0.75)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(0,229,255,0.06)',
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-stone-2 uppercase tracking-wider">Performance</span>
              {isVerified && <Badge variant="verified">Verified</Badge>}
            </div>

            <div className="h-8 w-full">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path
                  d={generateSparkline(sparklineData)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-ichor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-stone-2 uppercase tracking-wider mb-1">Recent Commits</span>
              {recentHashes.map((hash, i) => (
                <div key={i} className="font-mono text-[8px] text-white/40 truncate">
                  {hash}
                </div>
              ))}
            </div>
          </div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};
