'use client';

import * as React from 'react';
import { useScrollReveal } from '@valdyum/hooks';

const agents = [
  { id: 0, name: 'JITO-MEV-v1', gen: 0, x: 0.5, y: 0.2, r: 14, wr: '68.2%', pnl: '+$22,100', forks: 7, wallet: '5xKR...p9aM' },
  { id: 1, name: 'ARB-ALPHA', gen: 1, x: 0.22, y: 0.45, r: 10, wr: '73.4%', pnl: '+$48,290', forks: 3, wallet: '7mFT...k3Ns' },
  { id: 2, name: 'MEV-ULTRA', gen: 1, x: 0.5, y: 0.45, r: 10, wr: '61.8%', pnl: '+$14,700', forks: 2, wallet: '2pLX...d8Qr' },
  { id: 3, name: 'SANDWICH-PRO', gen: 1, x: 0.78, y: 0.45, r: 10, wr: '55.1%', pnl: '+$8,200', forks: 1, wallet: '9wZA...m2Kt' },
  { id: 4, name: 'ARB-v2', gen: 2, x: 0.12, y: 0.72, r: 7, wr: '77.0%', pnl: '+$61,040', forks: 0, wallet: '4nBY...p5Rq' },
  { id: 5, name: 'ARB-LITE', gen: 2, x: 0.32, y: 0.72, r: 7, wr: '64.5%', pnl: '+$9,800', forks: 0, wallet: '1jCS...x7Mv' },
  { id: 6, name: 'ULTRA-PRO', gen: 2, x: 0.5, y: 0.72, r: 7, wr: '58.3%', pnl: '+$5,100', forks: 0, wallet: '6kDT...q4Lz' },
  { id: 7, name: 'SAND-v2', gen: 2, x: 0.68, y: 0.72, r: 7, wr: '52.8%', pnl: '+$3,300', forks: 0, wallet: '3eHM...n9Wp' },
  { id: 8, name: 'DELTA-MEV', gen: 2, x: 0.86, y: 0.72, r: 7, wr: '59.1%', pnl: '+$7,900', forks: 0, wallet: '8yRP...b2Sq' },
];
const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7], [3, 8]];
const nodeColors: Record<number, string> = { 0: '#00FF66', 1: '#B8902A', 2: '#6B6258' };

export const LineageSection = () => {
  const ref = useScrollReveal() as React.RefObject<HTMLElement>;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = React.useState<typeof agents[0] | null>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw edges
      edges.forEach(([fromIdx, toIdx]) => {
        const from = agents[fromIdx];
        const to = agents[toIdx];
        const x1 = from.x * canvas.width;
        const y1 = from.y * canvas.height;
        const x2 = to.x * canvas.width;
        const y2 = to.y * canvas.height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        // Bezier curve for organic look
        ctx.bezierCurveTo(x1, y1 + 50, x2, y2 - 50, x2, y2);
        ctx.strokeStyle = 'rgba(107, 98, 88, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -time * 20;
        ctx.stroke();
      });

      // Draw nodes
      agents.forEach(node => {
        const x = node.x * canvas.width;
        const y = node.y * canvas.height;
        const color = nodeColors[node.gen];

        if (node.gen === 0) {
          ctx.beginPath();
          ctx.arc(x, y, node.r + 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 102, 0.1)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, node.r, 0, Math.PI * 2);
        ctx.strokeStyle = '#F0EBE1';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '10px monospace';
        ctx.fillStyle = '#6B6258';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, x, y + node.r + 16);
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = null;
    for (const node of agents) {
      const nx = node.x * canvas.width;
      const ny = node.y * canvas.height;
      const dist = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);
      if (dist <= node.r + 10) {
        found = node;
        break;
      }
    }
    setHoveredNode(found);
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section ref={ref} className="py-[clamp(80px,10vw,140px)] px-[clamp(24px,5vw,80px)] bg-[#F0EBE1]">
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-end mb-[60px]">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-stone-2" />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-stone-2">
                II — ON-CHAIN LINEAGE
              </span>
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,68px)] font-semibold leading-[1.05] text-obsidian">
              Every Strategy<br />
              <span className="italic font-normal text-stone">Has a Bloodline.</span>
            </h2>
          </div>
          <div className="reveal reveal-delay-1 flex flex-col items-start md:items-end text-left md:text-right">
            <p className="font-body text-[clamp(16px,1.3vw,19px)] text-stone leading-[1.65] max-w-[40ch] mb-6">
              Fork successful agents. Inherit their verified track records. When your fork generates profit, the original creator earns a royalty automatically via smart contracts.
            </p>
            <a href="#" className="font-mono text-[11px] uppercase tracking-[0.15em] text-obsidian border-b border-obsidian pb-1 hover:text-ichor hover:border-ichor transition-colors cursor-none">
              Explore Marketplace →
            </a>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-[480px] border border-stone-2/20 bg-alabaster/50 mb-12 reveal reveal-delay-2"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredNode(null)}
          />

          {hoveredNode && (
            <div
              className="absolute bg-obsidian border border-ichor/20 py-3 px-4 shadow-hard pointer-events-none z-50"
              style={{ left: mousePos.x + 15, top: mousePos.y + 15 }}
            >
              <div className="font-display text-[11px] text-alabaster mb-2">{hoveredNode.name}</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                <span className="font-mono text-[8px] text-white/50">Win Rate:</span>
                <span className="font-mono text-[8px] text-ichor text-right">{hoveredNode.wr}</span>
                <span className="font-mono text-[8px] text-white/50">PnL:</span>
                <span className="font-mono text-[8px] text-ichor text-right">{hoveredNode.pnl}</span>
                <span className="font-mono text-[8px] text-white/50">Forks:</span>
                <span className="font-mono text-[8px] text-alabaster text-right">{hoveredNode.forks}</span>
              </div>
              <div className="font-mono text-[7px] text-white/25 pt-2 border-t border-white/10">
                PDA: {hoveredNode.wallet}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-2/20 border border-stone-2/20 reveal reveal-delay-3">
          {[
            { type: 'GEN 0', name: 'JITO-MEV-v1', badge: 'Verified', pnl: '+$22,100', wr: '68.2%', forks: 7 },
            { type: 'GEN 1', name: 'ARB-ALPHA', badge: 'Verified', pnl: '+$48,290', wr: '73.4%', forks: 3 },
            { type: 'GEN 2', name: 'ARB-v2', badge: 'New', pnl: '+$61,040', wr: '77.0%', forks: 0 },
          ].map((card, i) => (
            <div key={i} className="group relative bg-alabaster p-7 cursor-none hover:bg-[#F0EBE1] transition-colors">
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-ichor transition-all duration-300 group-hover:w-full" />

              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[9px] tracking-[0.2em] text-stone-2">{card.type}</span>
                <span className={`font-mono text-[8px] px-2 py-1 border ${card.badge === 'Verified' ? 'border-ichor/30 text-ichor bg-ichor/5' : 'border-stone-2/30 text-stone-2'}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-obsidian mb-6">{card.name}</h3>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-stone">PnL (30d)</span>
                  <span className="text-ichor">{card.pnl}</span>
                </div>
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-stone">Win Rate</span>
                  <span className="text-obsidian">{card.wr}</span>
                </div>
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-stone">Active Forks</span>
                  <span className="text-obsidian">{card.forks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
