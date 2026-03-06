import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ActiveSection = 'hero' | 'howItWorks' | 'faq' | 'ecosystem' | 'cta';

export interface SceneState {
  // ── Global scroll (written by ScrollOrchestrator, read by Three.js) ─
  globalScrollProgress: number;   // 0.0 → 1.0 across entire page
  activeSection: ActiveSection;
  setGlobalScrollProgress: (v: number) => void;
  setActiveSection: (s: ActiveSection) => void;

  // ── Legacy hero scroll (still used by HeroSection entrance) ─
  heroScrollProgress: number;
  setHeroScrollProgress: (v: number) => void;

  // ── Local section progress ─
  howItWorksProgress: number;
  setHowItWorksProgress: (v: number) => void;

  // ── Camera ─
  cameraTarget: [number, number, number];
  cameraFov: number;
  setCameraTarget: (pos: [number, number, number]) => void;
  setCameraFov: (fov: number) => void;

  // ── Canvas theming ─
  canvasOpacity: number;
  setCanvasOpacity: (v: number) => void;

  // ── Model visibility (fade before footer) ─
  modelOpacity: number;
  setModelOpacity: (v: number) => void;
}

export const useSceneStore = create<SceneState>()(
  immer((set) => ({
    globalScrollProgress: 0,
    activeSection: 'hero' as ActiveSection,
    setGlobalScrollProgress: (v) => set((state) => { state.globalScrollProgress = v; }),
    setActiveSection: (s) => set((state) => { state.activeSection = s; }),

    heroScrollProgress: 0,
    setHeroScrollProgress: (v) => set((state) => { state.heroScrollProgress = v; }),

    howItWorksProgress: 0,
    setHowItWorksProgress: (v) => set((state) => { state.howItWorksProgress = v; }),

    cameraTarget: [0, 0, 0],
    cameraFov: 45,
    setCameraTarget: (pos) => set((state) => { state.cameraTarget = pos; }),
    setCameraFov: (fov) => set((state) => { state.cameraFov = fov; }),

    canvasOpacity: 1.0,
    setCanvasOpacity: (v) => set((state) => { state.canvasOpacity = v; }),

    modelOpacity: 1.0,
    setModelOpacity: (v) => set((state) => { state.modelOpacity = v; }),
  }))
);
