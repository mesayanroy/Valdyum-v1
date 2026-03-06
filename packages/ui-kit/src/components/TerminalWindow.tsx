'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export interface TerminalLine {
  type: 'cmd' | 'success' | 'error' | 'info' | 'comment' | 'dim' | 'hash' | 'empty';
  text: string;
  prompt?: string;
  delay?: number;
}

export interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
  autoPlay?: boolean;
  playbackSpeed?: number;
  cursorVariant?: 'ichor' | 'forge' | 'aether';
  title?: string;
  onComplete?: () => void;
}

export const TerminalWindow = React.forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ className, lines, autoPlay = false, playbackSpeed = 1, cursorVariant = 'ichor', title = 'bash', onComplete, ...props }, ref) => {
    const [visibleLines, setVisibleLines] = React.useState<number>(autoPlay ? 0 : lines.length);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const endRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      // Use scrollTop instead of scrollIntoView to prevent the entire page from 
      // scrolling down to the terminal on mount.
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [visibleLines]);

    React.useEffect(() => {
      if (!autoPlay || !isPlaying) return;

      let timeoutId: NodeJS.Timeout;

      const playNextLine = () => {
        if (visibleLines < lines.length) {
          const line = lines[visibleLines];
          let delay = line.delay;
          if (delay === undefined) {
            switch (line.type) {
              case 'cmd': delay = 600; break;
              case 'success':
              case 'error':
              case 'info': delay = 300; break;
              case 'empty': delay = 150; break;
              default: delay = 200; break;
            }
          }

          timeoutId = setTimeout(() => {
            setVisibleLines(prev => prev + 1);
          }, delay / playbackSpeed);
        } else if (onComplete) {
          onComplete();
        }
      };

      playNextLine();

      return () => clearTimeout(timeoutId);
    }, [visibleLines, autoPlay, isPlaying, lines, playbackSpeed, onComplete]);

    React.useEffect(() => {
      if (!autoPlay) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isPlaying && visibleLines === 0) {
            setIsPlaying(true);
          }
        },
        { threshold: 0.5 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [autoPlay, isPlaying, visibleLines]);

    const cursorColor = {
      ichor: 'bg-ichor',
      forge: 'bg-forge',
      aether: 'bg-aether',
    }[cursorVariant];

    return (
      <div
        ref={ref}
        className={cn('flex flex-col rounded-none overflow-hidden border border-white/[0.08] shadow-hard bg-[#0D0C0A]', className)}
        {...props}
      >
        <div className="flex items-center px-4 py-2 border-b border-white/[0.08] bg-[#1A1918]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 text-center font-mono text-[10px] text-white/20 uppercase tracking-widest">
            {title}
          </div>
        </div>
        <div
          ref={containerRef}
          className="p-4 font-mono text-xs leading-relaxed min-h-[320px] max-h-[500px] overflow-y-auto"
        >
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="min-h-[1.5rem]">
              {line.type === 'cmd' && (
                <>
                  <span className="text-ichor">{line.prompt || '~'} $</span>{' '}
                  <span className="text-alabaster">{line.text}</span>
                </>
              )}
              {line.type === 'success' && <span className="text-ichor">{line.text}</span>}
              {line.type === 'error' && <span className="text-red-400">{line.text}</span>}
              {line.type === 'info' && <span className="text-forge">{line.text}</span>}
              {line.type === 'comment' && <span className="text-white/25">{line.text}</span>}
              {line.type === 'dim' && <span className="text-white/40">{line.text}</span>}
              {line.type === 'hash' && <span className="text-white/30 text-[10px]">{line.text}</span>}
              {line.type === 'empty' && <span className="opacity-0">.</span>}
            </div>
          ))}
          <div className="mt-1">
            <span className={cn('inline-block w-2 h-4 animate-pulse', cursorColor)} />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    );
  }
);
TerminalWindow.displayName = 'TerminalWindow';
