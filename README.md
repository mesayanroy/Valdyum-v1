# Valdyum

> Open-source AI infrastructure platform for building, deploying, and monetizing autonomous agents on Solana.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 8 — install with `npm install -g pnpm`

### Clone & Install

```bash
git clone https://github.com/SATISH-JALAN/Valdyum-v1.git
cd Valdyum-v1
pnpm install
```

### Environment Variables

Create a `.env.local` file inside **`apps/web/`**:

```bash
# apps/web/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Where to get these:** Go to [supabase.com](https://supabase.com) → your project → **Settings** → **API**. Copy the **Project URL** and the **anon/public** key.

### Run Locally

```bash
pnpm run dev
```

The site will be available at **http://localhost:3000**.

### Supabase Table Setup

Run this in your Supabase **SQL Editor** to create the waitlist table:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON waitlist
  FOR SELECT TO anon USING (true);
```

### Project Structure

```
Valdyum-v1/
├── apps/
│   └── web/                  # Next.js landing page
│       ├── app/              # Pages, layout, API routes
│       │   └── api/waitlist/ # Email collection endpoint
│       ├── components/       # React components
│       ├── lib/              # Supabase client
│       ├── public/           # Static assets (logo, 3D model)
│       └── .env.local        # ← Your env file goes here
├── packages/
│   ├── 3d-engine/            # Three.js / R3F persistent canvas
│   ├── hooks/                # Zustand stores, shared hooks
│   └── ui-kit/               # Design system, CSS styles
└── package.json
```

---

## Product Description

## What It Is

Valdyum is an open-source infrastructure platform that lets Web3 developers build, deploy, monetize, and fork AI agents — with every agent having a verifiable on-chain identity and execution history anchored on Solana. The simplest way to describe it is: GitHub meets a DEX meets v0.dev, but specifically built for autonomous Web3 agents.

The core thesis is that AI agents are becoming the primary way developers interact with blockchains — running trading strategies, monitoring mempools, executing arbitrage, tracking liquidity — but there is currently no dedicated infrastructure layer for building, distributing, and trusting these agents. Developers are cobbling together scripts, running them in isolation, with no standardized tooling, no verifiable performance history, and no ecosystem to share or monetize their work. Valdyum is the infrastructure layer that fills that gap.

---

## The Problem It Solves

Right now, a Solana developer who wants to run an MEV bot has to find fragmented open-source code, adapt it manually, manage their own RPC connections, figure out Jito bundle integration from scratch, handle wallet security themselves, and run everything with zero visibility into whether it's actually performing. There is no standard. There is no community layer. There is no trust mechanism. Every builder starts from zero and works in isolation.

On the other side, developers who have built sophisticated trading bots, arbitrage strategies, and mempool monitors have no way to monetize their work without either open-sourcing their edge and losing it, or keeping it completely private and earning nothing from it. There is no middle ground infrastructure that lets them share selectively, charge for access, and prove performance without revealing strategy.

Valdyum solves both sides of this simultaneously.

---

## Phase 1 Focus — Web3 Developers on Solana

The platform launches exclusively for Web3 developers on Solana. This is a deliberate, non-negotiable decision. Narrowing to one community means the product can go deep rather than wide, and the Solana Web3 developer community is the ideal starting point because they already think natively in wallets, on-chain ownership, and cryptographic provenance — the core concepts that make Valdyum work. They also have real money on the line with their bots, which means they have strong incentives to use better tooling and strong opinions when something is not good enough.

The agent categories supported at launch are MEV bots with Jito bundle integration, mempool monitor agents that watch Solana transaction streams in real time, arbitrage tracking bots that detect price deltas across DEXes, liquidity and slippage trackers for pool monitoring, automated trading bots with configurable strategy logic, and on-chain data feed agents for wallet tracking, whale alerts, and token metrics.

Phases 2 and 3 will expand to AI developer tooling and SaaS founder automation respectively, but those are explicitly out of scope for Phase 1. The goal is to be the best possible product for Web3 developers before expanding anywhere else.

---

## How It Works — The Four Layers

Valdyum is built across four distinct layers that each handle a specific part of the system.

The first layer is the chain layer on Solana. This is where all on-chain logic lives. Every agent deployed through Valdyum gets minted as a compressed NFT using Metaplex Bubblegum, giving it a permanent on-chain identity tied to the creator's wallet. A marketplace smart contract written in Anchor handles listings, purchases, and fork registrations. A TAPEDRIVE program anchors compressed execution history as rolling Merkle roots on-chain, with full logs stored on Arweave. A 0x402 payment program handles AI-to-AI micropayments using SOL and USDC. Fork attribution is stored as a parent-to-child PDA relationship, so every derivative agent has its lineage permanently recorded on-chain.

The second layer is the platform backend — a Node.js or Go API server that handles wallet-signature authentication, the agent registry, the build pipeline that packages agents into deployable bundles, RPC connection management with failover between Helius and Triton, and a performance oracle that aggregates on-chain metrics from TAPEDRIVE into readable stats for the marketplace.

The third layer is the agent runtime, which runs on the developer's local machine. It is a Python-based execution engine that manages isolated agent processes, uses LangGraph for multi-step stateful agents and raw async Python for simpler single-tool agents, detects available GPU hardware and routes LLM inference to a local Ollama instance or API-based models accordingly, handles wallet signing securely through the OS keychain, and includes a built-in 0x402 payment client so agents can pay for external services autonomously.

The fourth layer is the developer surface — the CLI tool called valdyum that is the primary interface for everything, a Next.js marketplace frontend that requires wallet connection, a Python SDK published to PyPI, and a library of launch templates maintained by the core team.

---

## The CLI — Primary Interface

The CLI is the most important piece of the developer experience. A developer should be able to go from installing the CLI to having their first agent running on-chain in under 15 minutes. Every design decision in the CLI is built around that constraint.

The setup wizard runs on first use and handles GPU detection, wallet connection, and network selection. Template browsing pulls from the live registry and shows on-chain verified performance data alongside each template. Scaffolding a template downloads the code, installs Python dependencies, and generates a fully documented .env.example file. A dry-run mode lets developers preview every on-chain action before committing any funds. Deployment triggers the full pipeline — building the bundle, registering on-chain, and starting the local runtime — all in a single command. Live logs stream directly to the terminal. Status commands show real-time uptime, PnL, and on-chain identity addresses.

The reference for how a good CLI should feel is Vercel CLI, Railway CLI, and Stripe CLI. The common thread across all three is that they never hang silently, always tell you what is happening, always confirm what succeeded, and always explain what failed. That is the standard Valdyum CLI is built to.

---

## The On-Chain Trust Layer

This is the most technically differentiated part of Valdyum and the thing that makes the marketplace fundamentally different from any other agent directory.

When someone on the marketplace is considering buying or forking a trading bot that will autonomously sign transactions touching their real wallet, they need more than a creator's word that it performs well. They need cryptographic proof. Valdyum provides this through four mechanisms.

TAPEDRIVE is the execution history system. Every 100 agent actions, the local runtime compresses the execution log batch, computes a SHA-256 hash, uploads the full log to Arweave for permanent storage, and anchors the hash as part of a rolling Merkle root in the agent's on-chain PDA. Anyone can independently verify the agent's performance by downloading the Arweave logs, recomputing the hashes, and comparing them against the on-chain Merkle root. The performance data shown on the marketplace — trade count, win rate, PnL, uptime — is derived entirely from this verifiable on-chain record. It cannot be fabricated by the creator.

Source code hashing means every published agent has its full source bundle hashed with SHA-256 and stored on-chain alongside the Arweave content ID. Buyers can download the exact source that produced the performance history and verify that the hash matches. Any update creates a new immutable version with a new hash — old versions remain permanently accessible and auditable.

Creator on-chain identity means the creator's wallet address is their identity across all their published agents. Reputation aggregates across everything they publish. A creator who ships a malicious or broken agent loses their entire on-chain reputation with no way to reset it.

Sandbox test results are published alongside every listing. Before a creator can publish, the build pipeline runs the agent in an isolated devnet sandbox and records pass/fail results, resource usage, and error rates. Buyers see both live production history and pre-launch test data.

---

## Solving the Strategy Privacy Problem

The most serious challenge for a Web3 agent marketplace is that the developers who build the best MEV and arbitrage strategies are precisely the ones least likely to publish them publicly. The moment a high-performing strategy is visible on a marketplace, competitors can replicate it and the edge disappears. This creates a structural incentive for the best builders to stay private forever.

Valdyum solves this through four mechanisms that each change the economics of publishing.

Obfuscated parameter publishing lets creators publish an agent with the strategy parameters encrypted. The buyer pays, receives a runnable binary that executes the strategy, but never sees the core logic. The creator retains their edge while earning marketplace revenue.

Subscription-only listings let creators sell access rather than ownership. A buyer pays monthly SOL or USDC on-chain and can have that access revoked at any time. The strategy code never leaves the creator's possession.

The performance track record itself becomes the primary selling point. Because TAPEDRIVE provides independently verifiable on-chain performance history, buyers are paying for proven results rather than explained logic. The creator never has to reveal how the strategy works — they just have to prove it works.

Perpetual fork royalties mean that even if a creator publishes a strategy and a competitor improves on it and publishes a derivative, the original creator earns a royalty from every downstream fork forever, enforced on-chain. This changes the calculation from "publishing destroys my edge" to "publishing creates a permanent revenue stream from every derivative."

To bootstrap the marketplace, Valdyum runs a creator fund in the first 90 days that rewards the top 10 agents by verified TAPEDRIVE performance. The platform also takes zero marketplace fees in the first 30 days, with all revenue going directly to creators. This establishes alignment with the creator community before any value is extracted.

---

## 0x402 — AI-to-AI Payments

One of the most forward-looking infrastructure primitives in Valdyum is the 0x402 payment protocol integration. This enables autonomous machine-to-machine micropayments where one AI agent can pay another AI agent for a service, entirely without human involvement.

The mechanism works through the HTTP 402 Payment Required status code. An agent that needs data or a service from another agent sends a standard request. If the provider requires payment, it returns an HTTP 402 with the required amount, payment token, and wallet address. The requesting agent's built-in 0x402 client submits the micropayment on-chain using SOL or USDC. The transaction settles on Solana in roughly 400 milliseconds. The requesting agent retries with the transaction signature as proof of payment in the request header. The provider verifies the on-chain transaction and releases the data or service. Both sides of the transaction are logged to TAPEDRIVE, creating a full on-chain audit trail of all AI-to-AI commerce. The total cycle takes approximately two to three seconds.

This creates the foundation for an agent economy where agents can pay each other for premium data feeds, specialized computation, or access to proprietary information — all settled on-chain with no intermediary and no human approval required at the transaction level.

---

## The Marketplace — Fork, Monetize, Build

The marketplace is where the network effects of Valdyum live. It is a wallet-connected Next.js frontend where developers can browse agents by category, view verified on-chain performance histories, purchase agents, fork existing agents into derivative projects, and publish their own work.

Every listing shows the agent's on-chain identity address, the creator's wallet, the source code hash with a link to the Arweave bundle, TAPEDRIVE-derived performance stats, sandbox test results, the fork tree showing parent and child agents, and the pricing and licensing configuration.

The fork mechanic is central to the long-term network effect. When a developer forks an agent, the fork is registered on-chain as a child of the parent. The fork fee goes directly to the original creator, and the platform takes five percent. The parent-child relationship is permanently recorded and cannot be obscured. As forks accumulate, the marketplace develops a visible lineage of ideas — which strategies evolved from which originals, who built what, and whose foundational work underlies the most-deployed agents on the network.

---

## Revenue Model

Valdyum generates revenue through three streams. The primary stream is marketplace fees — five percent on direct agent sales, five percent on fork payments, and two and a half percent on monthly subscription access payments. These are all deducted on-chain automatically at the time of the transaction.

The second stream is subscription tiers for platform access. A free tier allows three simultaneous agents with one hundred thousand agent actions per month and community RPC endpoints. A Pro tier at twenty-nine dollars per month allows ten agents, one million actions per month, premium Helius RPC access, and a priority build queue. A Builder tier at ninety-nine dollars per month offers unlimited agents, ten million actions per month, a dedicated RPC endpoint, and full TAPEDRIVE analytics.

The third stream is a one percent fee on AI-to-AI payment volume routed through Valdyum's 0x402 infrastructure. This is a long-term passive revenue stream that scales automatically as the agent economy on the platform grows.

---

## Open Source Structure

Valdyum is fully open source, organized as a monorepo using pnpm workspaces and Turborepo for build orchestration. The repository contains the web marketplace frontend, the platform API server, the documentation site, the CLI tool published to PyPI, the Python agent SDK, a JavaScript SDK for frontend integrations, the local agent runtime engine, the Anchor smart contracts, shared types and the agent manifest schema, and the four launch templates maintained by the core team.

The template folder is the most important folder in the repository. It contains the highest quality code, receives the most rigorous PR review, and sets the standard for what a well-built Valdyum agent looks like. Everything in the ecosystem follows from the quality established there.

---

## The Long-Term Vision

Phase 1 is Web3 developers on Solana. Phase 2 expands to AI and ML developers who want to build, train, and deploy custom models and chatbots with specific tasks, using the same on-chain identity and marketplace infrastructure. Phase 3 expands to SaaS founders and non-technical users who want automation agents for their businesses — file management, metrics tracking, subscription handling.

Throughout all phases, the infrastructure primitives remain constant. On-chain identity. Verifiable execution history. Autonomous micropayments. Open-source, locally deployable, composable. The vision is a world where AI agents are first-class on-chain entities with their own identities, their own economic histories, and their own ability to transact with each other — and Valdyum is the infrastructure layer that makes that world possible.

---

## What Makes Valdyum Different

Most agent platforms are either cloud-hosted with no on-chain component, or on-chain with no real developer tooling. Valdyum is the first platform that treats local deployment and on-chain identity as equally important primitives. Developers keep full control of their agents and their keys. The on-chain layer provides trust and monetization without requiring developers to give up sovereignty over their own systems.

The TAPEDRIVE execution history system is genuinely novel. There is no other agent marketplace where performance claims are independently verifiable by anyone with access to a Solana RPC node and an Arweave gateway. That is not a feature — it is the foundation of the entire trust model, and it is what separates Valdyum from every other agent directory that exists today.



FRONTEND ARCHITECTURE
# Valdyum — Complete Frontend Architecture

---

## Part 1: The Monorepo Foundation (The Pulley System)

### Repository Structure

```
valdyum-monorepo/
├── apps/
│   ├── landing-page/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── fonts.ts
│   │   ├── components/
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── StatsStrip.tsx
│   │   │   │   ├── TapedriveSection.tsx
│   │   │   │   ├── HermesSection.tsx
│   │   │   │   ├── ForgeSection.tsx
│   │   │   │   ├── PricingSection.tsx
│   │   │   │   ├── EcosystemSection.tsx
│   │   │   │   ├── RoadmapSection.tsx
│   │   │   │   └── CtaBanner.tsx
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx
│   │   │       └── Footer.tsx
│   │   ├── public/
│   │   │   └── assets/
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── marketplace/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── agents/
│       │   │   ├── page.tsx
│       │   │   └── [agentId]/
│       │   │       └── page.tsx
│       │   ├── dashboard/
│       │   │   └── page.tsx
│       │   ├── publish/
│       │   │   └── page.tsx
│       │   └── globals.css
│       ├── components/
│       │   ├── marketplace/
│       │   │   ├── AgentTable.tsx
│       │   │   ├── AgentCard.tsx
│       │   │   ├── FilterSidebar.tsx
│       │   │   ├── LineageDrawer.tsx
│       │   │   ├── ComparePanel.tsx
│       │   │   └── AgentHoverCard.tsx
│       │   ├── agent-detail/
│       │   │   ├── TapedriveLedger.tsx
│       │   │   ├── LineageGraph.tsx
│       │   │   ├── VerifyPanel.tsx
│       │   │   ├── SandboxResults.tsx
│       │   │   └── ForkActionBar.tsx
│       │   ├── dashboard/
│       │   │   ├── TerminalWindow.tsx
│       │   │   ├── AgentStatusGrid.tsx
│       │   │   ├── WalletPanel.tsx
│       │   │   ├── MicropaymentFeed.tsx
│       │   │   └── OnboardingOverlay.tsx
│       │   └── layout/
│       │       ├── Navbar.tsx
│       │       └── Footer.tsx
│       ├── next.config.ts
│       └── package.json
│
├── packages/
│   ├── ui-kit/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── Drawer.tsx
│   │   │   │   ├── HoverCard.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Tabs.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── TerminalWindow.tsx
│   │   │   │   ├── WalletButton.tsx
│   │   │   │   └── NoiseBackground.tsx
│   │   │   ├── tokens/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   ├── 3d-engine/
│   │   ├── src/
│   │   │   ├── PersistentCanvas.tsx
│   │   │   ├── scenes/
│   │   │   │   ├── PrometheusScene.tsx
│   │   │   │   ├── PantheonScene.tsx
│   │   │   │   ├── MoiraiScene.tsx
│   │   │   │   └── ForgeScene.tsx
│   │   │   ├── models/
│   │   │   │   ├── MarbleBust.tsx
│   │   │   │   ├── ShatterFragments.tsx
│   │   │   │   ├── MarbleColumn.tsx
│   │   │   │   ├── DigitalHelix.tsx
│   │   │   │   └── StoneGear.tsx
│   │   │   ├── materials/
│   │   │   │   ├── MarbleMaterial.tsx
│   │   │   │   ├── EmissiveMaterial.tsx
│   │   │   │   └── WireframeMaterial.tsx
│   │   │   ├── lighting/
│   │   │   │   ├── DramaticLight.tsx
│   │   │   │   └── AmbientFill.tsx
│   │   │   └── hooks/
│   │   │       ├── useSceneTransition.ts
│   │   │       ├── useShatterAnimation.ts
│   │   │       └── useFrameSpeed.ts
│   │   └── package.json
│   │
│   ├── solana-client/
│   │   ├── src/
│   │   │   ├── WalletProvider.tsx
│   │   │   ├── program/
│   │   │   │   ├── fetchAgentPDA.ts
│   │   │   │   ├── verifyMerkleRoot.ts
│   │   │   │   ├── submitFork.ts
│   │   │   │   ├── purchaseAgent.ts
│   │   │   │   └── register0x402Payment.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── hooks/
│   │   ├── src/
│   │   │   ├── store/
│   │   │   │   └── useSceneStore.ts
│   │   │   ├── useScrollProgress.ts
│   │   │   ├── useAgentData.ts
│   │   │   ├── useWebSocket.ts
│   │   │   ├── useWalletBalance.ts
│   │   │   ├── useTapedriveVerification.ts
│   │   │   └── useCountUp.ts
│   │   └── package.json
│   │
│   ├── config/
│   │   ├── src/
│   │   │   ├── endpoints.ts
│   │   │   ├── programs.ts
│   │   │   ├── marketplace.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── tsconfig/
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Part 2: The Design System (The Mosaic Aesthetic)

### The Core Rule

The entire visual identity operates on one principle: **95% monochrome, 5% accent**. Color only appears to signal user action, live blockchain state, or verified data. Every other element is white, black, or a shade of stone grey. This gives the accents enormous visual power because they appear against a silent, neutral canvas.

### Color Tokens

All colors live in `packages/ui-kit/tailwind.config.ts` as semantic tokens. No app or component ever hard-codes a hex value.

```typescript
// packages/ui-kit/tailwind.config.ts
colors: {
  // Base (95% of all UI)
  'alabaster':     '#FAFAFA',   // Primary background — landing, marketplace
  'alabaster-2':   '#F2EDE6',   // Secondary background — card surfaces
  'alabaster-3':   '#E5DDD2',   // Borders, dividers, subtle separators
  'obsidian':      '#0A0A0A',   // Primary text, borders, logo
  'obsidian-2':    '#1A1A1A',   // Dashboard background
  'obsidian-3':    '#2A2A2A',   // Dashboard card surfaces
  'stone':         '#6B6258',   // Secondary text, labels, captions
  'stone-2':       '#9B9188',   // Placeholder text, disabled states

  // Page Accents (5% of all UI — used with extreme restraint)
  'electrum':      '#FFD700',   // Landing page — Prometheus theme
  'aether':        '#00E5FF',   // Marketplace — Pantheon theme
  'ichor':         '#00FF66',   // Agent detail — Moirai theme
  'forge':         '#FF3B00',   // Dashboard — Hephaestus theme
}
```

### Typography System

Three typefaces. Each has a single exclusive domain. They never swap roles.

**Cinzel** — Display and headings only. Every H1, H2, section title, and monumental statement. Evokes carved stone, classical antiquity, the weight of something permanent. Loaded via `next/font/google` with `display: swap`.

**Geist Mono** — All technical data. Wallet addresses, SHA-256 hashes, PnL figures, trade counts, Merkle roots, CLI commands, button labels, navigation links. Everything that is functional rather than decorative. Loaded via `next/font/local` from Vercel's font package.

**Geist** (not mono) — Body copy only. Long-form explanations, section paragraphs, tooltip descriptions. Neutral and legible. Never used for headings or data.

```typescript
// apps/landing-page/app/fonts.ts
import { Cinzel } from 'next/font/google';
import localFont from 'next/font/local';

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

export const geistMono = localFont({
  src: '../public/fonts/GeistMono-Variable.woff2',
  variable: '--font-mono',
});

export const geist = localFont({
  src: '../public/fonts/Geist-Variable.woff2',
  variable: '--font-body',
});
```

### The Noise Texture

The background is never flat white. A mathematical SVG noise filter is applied at 2-3% opacity across the entire `<body>` to mimic the granular texture of the mosaic stone. This is a single CSS snippet applied globally. It adds zero network weight because it is inline SVG.

```css
/* apps/landing-page/app/globals.css */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9997;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,..."); /* fractal noise SVG */
  background-size: 200px 200px;
}
```

### Component Design Rules

Every component in `packages/ui-kit/` follows these rules without exception:

**Zero border radius.** Every corner is sharp at 0px. This is the single most important rule. Rounded corners feel soft and consumer-facing. Sharp corners feel chiseled, technical, and precise. A border-radius of even 2px anywhere in the UI breaks the aesthetic.

**1px borders only.** Never 2px, never 0. Every card, table, input, modal has a 1px border in `color-alabaster-3` on the light theme, and `rgba(255,255,255,0.08)` on the dark theme.

**Hard shadows, not soft shadows.** When an element needs elevation, it uses a hard offset shadow — `box-shadow: 6px 6px 0px #0A0A0A` — not a blurred Gaussian shadow. This directly references the heavy stone blocks being lifted in the mosaic image. Soft blurred shadows feel like Dribbble UI. Hard offset shadows feel like something carved.

**Monospace for every interactive element.** Button labels, nav links, filter tags, table headers — all use `font-mono`. The display font is reserved for headings. The body font is reserved for paragraphs. Everything you click or interact with is monospace.

---

## Part 3: The Global Zustand Store (The Nervous System)

This store is the most important file in the entire codebase. It is the single source of truth that lets the Three.js canvas (running in a WebGL context) and the Next.js DOM (running in a React context) communicate with each other. It lives in `packages/hooks/src/store/useSceneStore.ts`.

```typescript
// packages/hooks/src/store/useSceneStore.ts
import { create } from 'zustand';

type PageContext =
  | 'landing'
  | 'marketplace'
  | 'agent-detail'
  | 'dashboard';

interface SceneStore {
  // ── Page routing ──────────────────────────────────
  currentPage: PageContext;
  setCurrentPage: (page: PageContext) => void;

  // ── Scroll state (written by GSAP, read by R3F) ───
  heroScrollProgress: number;       // 0 = top of hero, 1 = hero fully scrolled
  setHeroScrollProgress: (v: number) => void;

  // ── Shatter state ─────────────────────────────────
  shatterProgress: number;          // 0 = bust intact, 1 = fully shattered
  isShattered: boolean;
  setShatterProgress: (v: number) => void;

  // ── Camera ────────────────────────────────────────
  cameraTarget: [number, number, number];
  cameraFov: number;
  setCameraTarget: (pos: [number, number, number]) => void;

  // ── Canvas theming ────────────────────────────────
  canvasOpacity: number;            // 1.0 landing, 0.15 marketplace, 0 dashboard
  isDarkCanvas: boolean;            // false = marble, true = wireframe
  setCanvasTheme: (opacity: number, dark: boolean) => void;

  // ── Dashboard — WebSocket driven ──────────────────
  agentActivityRate: number;        // 0 to 1 — drives gear rotation speed
  wsConnectionState: 'connected' | 'reconnecting' | 'disconnected';
  setAgentActivityRate: (v: number) => void;
  setWsConnectionState: (s: SceneStore['wsConnectionState']) => void;

  // ── Onboarding ────────────────────────────────────
  isFirstTimeWallet: boolean;
  onboardingStep: 0 | 1 | 2 | 3;
  setOnboardingStep: (step: SceneStore['onboardingStep']) => void;
  dismissOnboarding: () => void;
}
```

When the Next.js router changes page, a `useEffect` in `layout.tsx` calls `setCurrentPage()` and `setCanvasTheme()`. The `PersistentCanvas` listens to these values and transitions the camera and material mode accordingly. GSAP reads from the DOM and writes `setHeroScrollProgress()`. The Three.js `useFrame` loop reads `shatterProgress` and repositions the bust fragments.

---

## Part 4: The 3D Engine Package

### The PersistentCanvas

This is the most critical component in the codebase. It mounts exactly once in `layout.tsx` and never unmounts for the lifetime of the user's session. When the user navigates between pages, the DOM changes but this canvas keeps running. This is what allows seamless camera transitions between scenes — the same WebGL context, the same scene graph, just different camera positions.

```typescript
// packages/3d-engine/src/PersistentCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { useSceneStore } from '@valdyum/hooks';
import { PrometheusScene } from './scenes/PrometheusScene';
import { PantheonScene } from './scenes/PantheonScene';
import { MoiraiScene } from './scenes/MoiraiScene';
import { ForgeScene } from './scenes/ForgeScene';

export function PersistentCanvas() {
  const { currentPage, canvasOpacity, isDarkCanvas } = useSceneStore();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: canvasOpacity,
        transition: 'opacity 0.6s ease',
        background: isDarkCanvas ? '#0A0A0A' : 'transparent',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          // Critical — without this, mobile GPUs overheat
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        {currentPage === 'landing'       && <PrometheusScene />}
        {currentPage === 'marketplace'   && <PantheonScene />}
        {currentPage === 'agent-detail'  && <MoiraiScene />}
        {currentPage === 'dashboard'     && <ForgeScene />}
      </Canvas>
    </div>
  );
}
```

### Mobile Detection

Before rendering anything, `PersistentCanvas` checks viewport width. On screens below 768px, the entire Three.js canvas renders nothing. A static `.webp` image render of the marble bust is shown instead via CSS. This saves 500KB of JavaScript, prevents mobile GPU strain, and means the landing page loads in under 2 seconds on mobile.

```typescript
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
if (isMobile) return null;
```

### Scene 1 — PrometheusScene (Landing Page)

**Theme:** Prometheus bringing fire to humanity. Technology extracted from the divine and given to mortals.

**3D Elements:**
- A high-fidelity white marble bust of a Greek god, centered in the viewport. Sourced as a `.glb` from Sketchfab and processed through Draco compression (reduces geometry by 90%) and KTX2 texture compression (decompresses on the GPU, not CPU).
- Inside the bust's head: a separate mesh — a geometric node network made of icosahedra and connecting edges — using `EmissiveMaterial` with emissive color set to Electrum Gold `#FFD700`. This inner core is invisible when the bust is intact, revealed only when the fragments separate.
- A low-polygon placeholder sphere with the marble material applied, rendered while the full `.glb` file is downloading. Managed via Three.js `LOD` (Level of Detail).

**Lighting:**
- One harsh `DirectionalLight` at high intensity from the top-left. Casts sharp, deep shadows across the right side of the marble face. This maximizes the black-and-white contrast and makes the bust look like it was lit by Mediterranean sunlight.
- One dim `AmbientLight` at very low intensity so the shadowed side isn't completely black.
- No environment map on the landing scene. The bust should look like a museum object, not a product render.

**The Shatter Animation:**

The bust is not a single mesh. Before being imported, it is fractured in Blender into approximately 80 irregular fragments. Each fragment is a separate child mesh within a parent group. They are positioned exactly in their original formation — from the user's perspective the bust looks completely intact.

When `shatterProgress` in the Zustand store increments from 0 to 1, each fragment is tweened outward along a pre-calculated vector (its centroid direction from the bust's center). GSAP writes to `shatterProgress` via the `onUpdate` callback of a ScrollTrigger scrub. The `useFrame` hook inside `PrometheusScene` reads `shatterProgress` and applies the fragment positions on every render frame.

```typescript
// Inside PrometheusScene.tsx — useFrame hook
useFrame(() => {
  const progress = useSceneStore.getState().shatterProgress;
  fragments.forEach((fragment, i) => {
    const vector = shatterVectors[i];
    fragment.position.x = vector.x * progress * 3;
    fragment.position.y = vector.y * progress * 3;
    fragment.position.z = vector.z * progress * 3;
    fragment.rotation.x += 0.001 * progress;
    fragment.rotation.y += 0.002 * progress;
    fragment.material.opacity = 1 - (progress * 0.6);
  });
  // Reveal the gold core as fragments separate
  goldCore.material.emissiveIntensity = progress * 2.5;
  goldCore.rotation.y += 0.008;
});
```

**On-load Entry Animation:**

A GSAP timeline fires once on mount. The virtual camera slowly rotates 15 degrees around the bust over 3 seconds, then settles. This proves to the user that the bust is a genuine 3D object, not a flat image. It is the digital equivalent of a sculptor walking around their work.

### Scene 2 — PantheonScene (Marketplace)

**Theme:** The Pantheon. Many gods, many agents, coexisting in a structured architectural space.

**3D Elements:**
- A receding array of white marble columns, arranged in a grid extending infinitely downward into darkness. Each column is a simple cylinder with the marble PBR material — no complex geometry needed.
- The columns rotate infinitely and very slowly around the Y-axis using `useFrame`. The camera pans laterally at a constant glacial speed, giving the illusion of moving through the colonnade.
- Canvas opacity is set to 0.15 so the columns are a whisper in the background, never competing with the data table in the foreground.

**Lighting:** Soft, diffuse. No harsh directional light. The columns should feel like they are deep in shadow, barely visible — a suggested architecture rather than a dominant visual.

### Scene 3 — MoiraiScene (Agent Detail)

**Theme:** The Moirai, the three Fates who spin, measure, and cut the thread of destiny. Every agent action is a thread, woven permanently into the on-chain tapestry.

**3D Elements:**
- A vertical helix composed of geometric block segments — each segment representing a batch of 100 agent actions anchored to TAPEDRIVE.
- The helix rotates continuously on its vertical axis and extends from top to bottom of the viewport at low opacity.
- New segments materialize at the top of the helix and drift downward, representing new execution batches being anchored in real time.
- Accent color on this page is Ichor Green. The connecting edges between helix segments glow `#00FF66` with low emissive intensity.

### Scene 4 — ForgeScene (Dashboard)

**Theme:** Hephaestus's underground forge. The invisible machinery that powers the gods' weapons.

**3D Elements:**
- A single large stone gear, rendered in wireframe mode using `WireframeMaterial`. No marble texture — just the skeletal geometry.
- The gear rotates continuously. Its rotation speed is bound directly to `agentActivityRate` from the Zustand store, which is fed by the WebSocket data stream from the user's running agents. When agents are executing trades at high frequency, the gear spins fast. When agents are idle, it turns slowly. When the WebSocket drops, it stops.
- Canvas background transitions to `#0A0A0A` — obsidian — when this scene is active.
- All marble materials disappear. Only glowing wireframe geometry remains, referencing the "backend of the matrix."

**The Page Transition Into Dashboard:**

When the Next.js router navigates to `/dashboard`, a 600ms sequence fires:
1. GSAP fades the canvas from 1.0 opacity down to 0 over 300ms.
2. The body background-color CSS transitions from `#FAFAFA` to `#0A0A0A` simultaneously.
3. The Zustand store sets `isDarkCanvas: true` and `currentPage: 'dashboard'`.
4. The View Transitions API handles the actual page content swap at the 300ms midpoint.
5. The canvas fades back up to 1.0 opacity with the ForgeScene now active.

The user experiences a cinematic fade-to-black, then a reveal of the dark forge environment. It feels like physically entering a different space.

---

## Part 5: The GSAP Scroll Architecture

### How GSAP Talks to Three.js

GSAP lives in the Next.js DOM context. Three.js lives in the WebGL context. They cannot communicate directly. The pattern is:

```
User scrolls
  → GSAP ScrollTrigger fires onUpdate
  → GSAP calls useSceneStore.getState().setHeroScrollProgress(value)
  → Zustand store updates
  → Three.js useFrame reads store on next render frame
  → 3D objects reposition accordingly
```

### The Hero Pin

The hero section of the landing page is pinned using GSAP `ScrollTrigger`. While pinned, the page does not scroll — instead, scroll wheel input drives the GSAP timeline forward.

```typescript
// apps/landing-page/components/sections/HeroSection.tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-section',
      start: 'top top',
      end: '+=200%',          // Pin for 2 viewport heights of scroll
      pin: true,
      scrub: 1,               // 1 second smoothing lag — feels physical
      onUpdate: (self) => {
        useSceneStore
          .getState()
          .setHeroScrollProgress(self.progress);

        // Map scroll progress to shatter progress
        const shatter = Math.max(0, (self.progress - 0.3) / 0.7);
        useSceneStore
          .getState()
          .setShatterProgress(shatter);
      },
    },
  });

  // Hero text fades out as shatter begins
  tl.to('#hero-headline', { opacity: 0, y: -40, duration: 0.3 }, 0.25)
    .to('#hero-sub',      { opacity: 0, y: -20, duration: 0.2 }, 0.3)
    .to('#hero-cta',      { opacity: 0, duration: 0.2 }, 0.3);

  // After shatter completes, content cards slide up
  tl.to('.tapedrive-card',
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, 0.85);
});
```

### Scroll Reveal Pattern (All Other Sections)

Every section below the hero uses a simple `IntersectionObserver`-based reveal. No GSAP needed for these — they are standard staggered `translateY` + `opacity` transitions driven by CSS classes toggled by JavaScript.

```typescript
// packages/hooks/src/useScrollReveal.ts
export function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
          }
        });
      },
      { threshold }
    );
    document.querySelectorAll('.reveal')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
```

---

## Part 6: Page-by-Page Architecture

---

### Page 1 — Landing Page (`apps/landing-page`)

**URL:** `valdyum.io`
**Theme:** Genesis. Prometheus.
**Accent Color:** Electrum Gold `#FFD700` — used only on the Deploy Agent button hover state and the glowing 3D core.
**3D:** PrometheusScene — full opacity, marble bust, shatter on scroll.

#### Section 1: Hero (The Genesis Entry)

The user lands on a near-empty screen. Almost nothing is visible except the marble bust floating in the center and two lines of text.

**Visual composition:**
- The bust is the dominant visual. It takes up roughly 40% of the viewport height, centered.
- Behind the bust: the noise-textured alabaster background and the faint animated canvas grid.
- Overlaid on the bust: the hero text in Cinzel, large enough to read but positioned so it doesn't cover the face.

**Text hierarchy:**
- Eyebrow: `// anchored on Solana · open source · on-chain trust` in Geist Mono at 10px, letter-spacing 0.35em, color Stone.
- H1: `Every Agent` (line 1) `Has a Soul.` (line 2). Cinzel, 96px on desktop, 52px on mobile. The word "Soul" has an Electrum Gold underline — 3px, not an actual underline tag but a `::after` pseudo-element.
- Sub-headline: A typewriter component cycling through four phrases — `// build. deploy. verify. monetize.` — in Geist Mono, 14px.
- Two CTAs: `Install CLI` (primary — obsidian background, ichor text) and `Browse Agents →` (ghost — transparent, obsidian border).

**On-load sequence:**
1. Page loads. Canvas fades in over 400ms.
2. The 3D camera performs a slow 15-degree pan around the bust over 3 seconds.
3. Eyebrow text fades up (delay 0.3s).
4. H1 fades up (delay 0.5s).
5. Sub-headline typewriter begins (delay 0.8s).
6. CTAs fade up (delay 1.0s).
7. Scroll hint animates in (delay 1.5s).

**Scroll sequence (pinned section):**
- 0% → 30% scroll: Hero text fades out. Camera begins to push forward toward the bust.
- 30% → 70% scroll: Bust begins shattering. Fragments push outward. Gold core starts glowing.
- 70% → 100% scroll: Shatter is complete. Gold core is fully revealed and rotating. Fragment opacity fades. Section unpins.

#### Section 2: Stats Strip

Full-width dark band immediately after the hero unpins. Background: `#0A0A0A`. Four metrics in a CSS grid:

- `847` — Active Agents
- `12,400+` — Verified Executions
- `$2.3M` — Agent PnL Tracked
- `400ms` — Avg Settlement

All numbers animate from 0 using `useCountUp` when the section enters the viewport. Numbers rendered in Cinzel, labels in Geist Mono at 9px, letter-spacing 0.3em. The accent color — Electrum Gold — appears only on the `+` and `$` and `ms` suffixes.

#### Section 3: TAPEDRIVE — "Performance Carved in Stone"

Split grid — content left, visual right.

**Left (content):**
- Section label: `I — THE TRUST LAYER` in Geist Mono, 9px, letter-spacing 0.4em, Electrum Gold.
- Section numeral: `I` in Cinzel at 140px, color transparent, `-webkit-text-stroke: 1px alabaster-3`. Positioned absolutely behind the heading for decorative depth.
- H2: `Performance` (line 1) `Carved in Stone.` (line 2, italic in Cinzel).
- Body: One paragraph explaining TAPEDRIVE in plain language.
- Four-step process list in Geist Mono at 12px — numbered 01, 02, 03, 04 — explaining the SHA-256 → Arweave → Merkle root flow.

**Right (visual):**
- A white marble column rendered as a CSS-constructed element (not 3D — the 3D scene is in the background). The column has a top capital and base, and is filled with hash values that etch in with a staggered CSS animation.
- Floating `PnL Card` — dark background, Ichor Green accent, displaying a mock agent's verified stats. Hard-shadow offset: `8px 8px 0px #0A0A0A`. Animation: `float` keyframe, 4px vertical drift.
- Floating `Hash Stream Card` — light background, cycling through recent Merkle commits with animated replacement every 3 seconds.

#### Section 4: Lineage — "Every Strategy Has a Bloodline"

**Visual center:** An interactive Canvas node graph drawn in vanilla `<canvas>` showing the fork tree. Nodes are circles — root agents in Ichor Green, generation-1 forks in Electrum Gold, generation-2+ in Stone. Bezier curves connect parents to children with animated dashed lines. Hovering a node reveals a dark tooltip showing creator wallet, win rate, PnL, and fork count.

**Below the graph:** Three agent cards in a grid. Each card has: agent type label in Geist Mono (8px), agent name in Cinzel (17px), a tag (`Verified` or `New`), and three stat blocks. A 2px Ichor Green line slides in from the left on card hover.

#### Section 5: 0x402 Hermes — "Agents That Pay Each Other"

Split grid — content left, animation right.

**Right (animation):**
- Two agent node cards facing each other. Left card: `ARB Agent / Requesting`. Right card: `Data Feed / Providing`.
- Between them: a particle stream of four glowing green dots flowing left to right, each particle on a staggered animation loop.
- Above the stream: a centered label showing `0.024 SOL` and `Micropayment`.
- Below the stream: four boxes showing the HTTP cycle — `200 Request`, `402 Pay Required`, `⚡ Settle`, `200 Delivered`.
- A floating badge at top: `Settlement: ~400ms on Solana`.

#### Section 6: CLI Forge — "First Agent Running in 15 Minutes"

Full-width dark section. Background: `#0A0A0A`. Split grid — content left, terminal right.

**Terminal window:** Styled like a real macOS terminal with red/yellow/green traffic light dots. The terminal body populates itself line by line with a typewriter sequence, triggered when the section enters the viewport via `IntersectionObserver`. The full sequence types out:

```bash
# Install Valdyum CLI
~ $ pip install valdyum
✓ Installed valdyum v0.4.2

# Initialize — GPU detected, wallet connected
~ $ valdyum init
⚡ GPU detected: RTX 4090 → routing to Ollama
🔑 Wallet connected: 5xKR...p9aM
✓ Network: Solana Mainnet-Beta (Helius RPC)

~ $ valdyum template list --verified
  JITO-MEV-v1     Win: 68.2%   PnL: +$22,100
  WHALE-WATCH-PRO Uptime: 99.9% Trades: 2.8M

~ $ valdyum deploy --dry-run
→ Building bundle...
→ Minting cNFT identity (Metaplex Bubblegum)...
  TX: 3nFgX8...Kp2M | Block: 287,440,198
✓ Agent live. PDA: 7xK3...F9mQ

~ $ valdyum status█
```

The Forge Orange blinking cursor (`█`) appears at the end of the final line.

#### Section 7: Pricing — "Start Free. Scale On-Chain."

Three-column grid with 1px borders between columns. No rounded corners anywhere.

**Free tier:** $0, forever. 3 agents, 100K actions/month, community RPC, 5% marketplace fee.

**Pro tier (featured):** $29/month. 10 agents, 1M actions/month, Helius RPC, priority build queue, 5% fee. This column has an obsidian background, alabaster text, and a `Most Popular` badge in Electrum Gold.

**Builder tier:** $99/month. Unlimited agents, 10M actions/month, dedicated RPC, 2.5% fee.

Below the three columns: a full-width obsidian banner — `🔥 Creator Fund: First 30 days — zero marketplace fees. All revenue goes to creators.`

#### Section 8: Ecosystem

**Integration logo wall:** 8 cells in a 4×2 CSS grid. Each cell has a 1px border, the integration name in Cinzel (12px), and a small icon. Cells: Jito, Helius, Arweave, Metaplex, LangGraph, Triton, Ollama, Solana. On hover, cell background shifts to `alabaster-2`.

**Launch Templates:** Four template cards below the logo wall. Each card: emoji icon, template name in Cinzel, one-sentence description, two or three tag badges. Cards: Jito MEV Bot, Whale Alert, Arbitrage Tracker, Liquidity Monitor.

#### Section 9: Roadmap

Dark section — obsidian background. Three columns for three phases.

**Phase I (Active):** Cinzel numeral `I` in Ichor Green stroke. Status dot `● Live Now`. Title: `Web3 Developers`. Five feature items in Geist Mono.

**Phase II (Coming):** Numeral in faded stroke. Status: `◐ Coming Next` in bronze. Title: `AI/ML Developers`.

**Phase III (Future):** Numeral in very faint stroke. Status: `○ Future` in stone-2. Title: `SaaS Founders`.

#### Section 10: CTA Banner + Footer

CTA section has a massive `VALDYUM` watermark text in Cinzel at 200px, color transparent with a 1px alabaster-3 stroke, centered behind the content. In front: `Forge Your First Agent Today.` heading, and the install command as a styled button: `$ pip install valdyum`.

Footer: Four-column grid on obsidian. Brand description left. Three link columns right. Bottom bar: copyright left, `● Anchored on Solana Mainnet` right with an animated pulse dot.

---

### Page 2 — Marketplace (`apps/marketplace/agents`)

**URL:** `valdyum.io/agents`
**Theme:** The Pantheon. Many agents, structured architecture, data density.
**Accent Color:** Aether Cyan `#00E5FF`
**3D:** PantheonScene — 15% opacity marble columns scrolling behind the data table.

#### Layout Structure

The marketplace has three distinct view modes. The URL reflects the active mode via query params.

**Discovery Mode** (`/agents`) — The default DataTable view.
**Lineage Mode** (`/agents?lineage=AGENT_ID`) — A drawer opens from the right.
**Compare Mode** (`/agents?compare=ID1,ID2`) — A split panel replaces the main content.

#### Discovery Mode

**Left sidebar (220px fixed):** Filter panel with 1px black borders. Filter groups:
- Category: MEV Bot, Mempool Monitor, Arbitrage, Liquidity, Whale Alert, Data Feed.
- Status: Verified Only, Has Forks, Active.
- Price range: Free, Paid, Subscription.
- PnL range: slider in Geist Mono.
- Sort by: Win Rate, PnL, Trade Count, Newest, Most Forked.

Each filter option is a checkbox with a Geist Mono label. Active filter count badge in Aether Cyan. A `Clear All` link at the bottom in Geist Mono.

**Main content area:** The Agent DataTable.

Table headers use Cinzel at 11px, letter-spacing 0.15em, uppercase. All data rows use Geist Mono. Column layout:

```
Agent Name   |  Type          |  Win Rate  |  30d PnL    |  Trades  |  Forks  |  Creator    |  Price    |  Actions
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
JITO-ARB-v2  |  MEV Bot       |  73.4%     |  +$48,290   |  12,847  |  7      |  5xKR...    |  0.5 SOL  |  [Fork] [View]
WHALE-WATCH  |  Mempool       |  —         |  —          |  2.8M    |  3      |  7mFT...    |  Free     |  [Fork] [View]
```

**Hover Card behavior:** When the user hovers over the Win Rate cell, a dark-background Shadcn `HoverCard` appears with:
- A micro sparkline chart of the last 30 days of trade performance.
- The last 5 Merkle commit hashes from TAPEDRIVE in Geist Mono.
- Verification status badge in Aether Cyan.

The Win Rate cell itself uses Aether Cyan text when the rate is above 65%.

**Row selection for Compare:** A checkbox column at the far left. When two rows are selected, a floating bar appears at the bottom of the viewport: `Comparing 2 agents — View Comparison →`.

#### Lineage Drawer

When the user clicks `View Lineage` on any agent row, a Shadcn `Drawer` slides in from the right at 70% viewport width. The DataTable is still visible at 30% width on the left, dimmed to 40% opacity.

Inside the drawer:
- Drawer header: Agent name in Cinzel, creator wallet in Geist Mono, close button.
- React Flow canvas taking up the full drawer body.

**React Flow customization:**
- All nodes are sharp-cornered white boxes with 1px obsidian borders.
- The root agent node has a 2px Aether Cyan border.
- Connecting edges are thin 1px lines in Stone.
- On hover over any child node, the edge connecting it to its parent glows Aether Cyan.
- Each node shows: agent name in Cinzel, win rate and PnL in Geist Mono, and fork date.
- A minimap in the bottom-right corner of the drawer for navigating large trees.
- Zoom controls in the top-right.

**Royalty flow visualization:** When a node is selected, an animated dashed line flows upward through the tree from the selected node to the root, representing the royalty payment flowing to the original creator. The flow is colored Aether Cyan.

#### Compare Mode

When the user clicks `View Comparison`, the DataTable hides and a split-panel takes over:

- Left 50%: Full stats panel for Agent A.
- Right 50%: Full stats panel for Agent B.
- A center vertical divider with `VS` in Cinzel at 48px.
- For each comparable metric, a visual indicator shows which agent wins — a small triangle pointing toward the better value in Ichor Green.
- TAPEDRIVE charts for both agents stacked vertically below the stat panels, rendered at the same scale for honest comparison.

---

### Page 3 — Agent Detail (`apps/marketplace/agents/[agentId]`)

**URL:** `valdyum.io/agents/JITO-ARB-ALPHA`
**Theme:** The Moirai — The Fates. Immutable thread of destiny.
**Accent Color:** Ichor Green `#00FF66`
**3D:** MoiraiScene — spinning TAPEDRIVE helix at 25% opacity.

#### Layout

This page is data-heavy but structured to feel like a legal record or a stone inscription — something permanent and authoritative.

**Above the fold:** Agent header with name in Cinzel at 48px, agent type badge, creator wallet, and on-chain identity address. A `Fork Agent — 0.5 SOL` button (large, primary) and a `Purchase Access` button (secondary). Below these: four large stat blocks in a row — Win Rate, 30d PnL, Total Trades, Uptime — all in Cinzel numerals with Geist Mono labels.

**Main content grid (below fold):**

Left column (60% width): The TAPEDRIVE ledger and verification panel.
Right column (40% width): The lineage graph and source code hash.

#### The TAPEDRIVE Ledger

A scrolling vertical window, auto-advancing, showing the agent's execution history in real time. Each row:

```
✓  Batch #12,847   SHA: a3f8c2d1...   Arweave: ar://3xK9...   Block: 287,440,112
✓  Batch #12,846   SHA: 9e4b71a0...   Arweave: ar://8mF2...   Block: 287,440,098
```

All text in Geist Mono at 9px. Verified batches have Ichor Green checkmarks. The window auto-scrolls at a slow pace. The user can pause auto-scroll by hovering.

#### The Verify-Yourself Panel

This is the most important feature on the entire page. It lets any developer independently verify the agent's TAPEDRIVE claims without trusting Valdyum.

**UI:** A bordered panel with a Cinzel heading `Verify On-Chain.` and body text explaining the verification process. Below:

- An input field labeled `Arweave Content ID` in Geist Mono.
- A `Verify` button.

**What happens when Verify is clicked:**
1. The browser fetches the Arweave log at the provided Content ID using the `@ardrive/turbo-sdk`.
2. The Web Crypto API computes the SHA-256 hash of the downloaded log data client-side — no server involved.
3. The `verifyMerkleRoot` function from `packages/solana-client/` fetches the agent's on-chain PDA and extracts the corresponding Merkle root.
4. The computed hash is compared against the on-chain value.
5. Result panel appears with: computed hash in Geist Mono, on-chain hash in Geist Mono, and a large `MATCH` or `MISMATCH` verdict.

If it matches: a full-width Ichor Green banner with `✓ Cryptographic Proof Confirmed. This performance data is real.`

If it mismatches: a red banner with an explanation.

This runs entirely in the browser. It is the trust foundation of the entire platform, made tangible and interactive.

#### The Source Code Hash Panel

Below the verification panel: the agent's source code hash in a dark code block. A link to the Arweave bundle. A link to the specific version hash. An explanation that any update creates a new immutable version. The user can download the exact source that produced the performance history and verify the hash matches.

#### The Lineage Graph (Right Column)

A smaller React Flow canvas — same aesthetic as the marketplace drawer but focused on this specific agent's position in its family tree. The current agent's node has an Ichor Green border. Parent node above it, children nodes below it.

#### Sandbox Test Results

A card showing the pre-launch devnet sandbox results: pass/fail for each test category, resource usage (CPU, memory), error rate, and test date. All in Geist Mono.

#### Sticky Action Bar

A footer fixed to the bottom of the viewport:
- Left: Agent name, creator address, current price.
- Right: `Fork This Agent — 0.5 SOL` primary button and `Subscribe — 0.1 SOL/mo` secondary button.

The fork button fires a transaction via `submitFork()` from `packages/solana-client/`. On success: a toast notification in Ichor Green confirming the fork and showing the new agent's PDA address.

---

### Page 4 — Developer Dashboard (`apps/marketplace/dashboard`)

**URL:** `valdyum.io/dashboard`
**Theme:** Hephaestus's Forge. The private workshop.
**Accent Color:** Forge Orange `#FF3B00`
**3D:** ForgeScene — wireframe stone gear. Speed driven by WebSocket activity.
**Color scheme:** INVERTED. Obsidian background, alabaster text.

#### First-Time Wallet Onboarding Overlay

When a wallet connects for the first time (checked by querying whether the wallet address exists in the Valdyum program's PDA), a three-step overlay appears above everything.

**Step 1:** `Choose Your Template` — shows the four template cards from the landing page, same design, but selectable. Clicking one highlights it and advances to Step 2.

**Step 2:** `Install & Initialize` — shows the two terminal commands to run locally. A `Copy Commands` button. A note: "Run these in your terminal, then come back."

**Step 3:** `Your Agent Is Deploying` — a live status checker that polls the Solana RPC every 5 seconds waiting for the agent's cNFT to appear. When it does: confetti in Forge Orange and a `✓ Agent Deployed. Welcome to Valdyum.` message.

The overlay is dismissible but reappears on the next three sessions until an agent is actually deployed.

#### Dashboard Layout

The dashboard is a bento grid layout. The terminal window dominates, surrounded by smaller status boxes.

```
┌─────────────────────────────────┬──────────────┐
│                                 │  Wallet       │
│                                 │  Panel        │
│     Terminal Window             ├──────────────┤
│     (60% width, 70% height)     │  Agent        │
│                                 │  Status Grid  │
│                                 ├──────────────┤
│                                 │  0x402        │
│                                 │  Micropayment │
└─────────────────────────────────┴──────────────┘
│  Tab Bar: Active Agents | Wallet | API Keys     │
└─────────────────────────────────────────────────┘
```

#### The Terminal Window

The largest element on the screen. 1px border in `rgba(255,255,255,0.08)`. Background: `#0D0C0A` — slightly warmer than pure black.

**Three connection states — rendered with distinct UI:**

**Connected state:**
- Forge Orange blinking cursor active.
- Logs stream in real time from the WebSocket.
- Each log line prefixed with a timestamp in Stone color.
- Success lines in Ichor Green. Error lines in `#FF4444`. Info lines in Forge Orange. Neutral lines in alabaster at 60% opacity.
- Terminal history is preserved — the window does not clear.

```
[14:23:01]  Agent JITO-ARB-ALPHA executing batch #12,848
[14:23:01]  → Scanning mempool for sandwich opportunities
[14:23:02]  ✓ Bundle submitted to Jito: 3nFgX8...Kp2M
[14:23:02]  ✓ Bundle landed. PnL: +$18.42
[14:23:04]  → Anchoring to TAPEDRIVE (batch 100/100)
[14:23:05]  ✓ Merkle root written: a3f8c2d1...
            On-chain PDA: 7xK3...F9mQ  Arweave: ar://9mT4...█
```

**Reconnecting state:**
- Cursor turns amber `#FFAA00`.
- Log stream pauses. A new line appears: `// runtime connection interrupted. retrying... (attempt 3/10)`
- Gear in the 3D canvas slows to idle.
- No existing log history is cleared.

**Disconnected state:**
- Cursor turns red `#FF4444`.
- Log stream stopped. A non-blocking banner at the top of the terminal: `Runtime connection lost. Restart your local valdyum daemon and click Retry.`
- A `Retry` button in the banner.
- Gear stops rotating.
- All previous log history visible for diagnosis.

#### Wallet Panel

Top-right bento box. Background: `obsidian-3`. The Solana wallet adapter button is completely overridden — no purple, no default Solana branding. It shows:

- Connected address in Geist Mono: `5xKR...p9aM`
- SOL balance: `4.82 SOL`
- USDC balance: `$1,240.00`
- A `Disconnect` link in Stone color at the bottom.
- A `Copy Address` icon button.

When not connected: a stark obsidian button with Forge Orange text `Connect Wallet`.

#### Agent Status Bento Grid

Four smaller boxes below the wallet panel, each showing one real-time metric:

- `Active RPC: Helius` with a pulsing green dot.
- `Total Actions: 12,403` with a `useCountUp` animation on new actions.
- `Pending 0x402: 3 payments` with Forge Orange accent.
- `Uptime: 99.8%` with an Ichor Green accent.

#### 0x402 Micropayment Feed

Bottom-right bento box. A scrolling feed of recent AI-to-AI payments involving the user's agents. Each row:

```
→  ARB-ALPHA paid DATA-FEED-PRO   0.024 SOL   14:23:02
←  WHALE-WATCH received from UNKNOWN-AGENT   0.011 SOL   14:19:44
```

Outgoing payments in Forge Orange. Incoming payments in Ichor Green.

#### Tabs: Active Agents | Wallet History | API Keys

A tab bar at the bottom of the main content area.

**Active Agents tab:** A table of the user's deployed agents with live status (Running / Stopped / Error), current PnL for today, and action buttons (Stop, View Logs, Manage).

**Wallet History tab:** Full on-chain transaction history for the connected wallet, filtered to Valdyum-related transactions. Hash values in Geist Mono, amounts with color coding.

**API Keys tab:** API key management for connecting external tools to the user's agent runtime. Keys shown in a password-masked Geist Mono field with a `Reveal` toggle.

---

## Part 7: Shared UI Kit Component Specifications

Every component below lives in `packages/ui-kit/src/components/`. Zero rounded corners. Zero hard-coded colors. All classes use the Tailwind token names defined in the design system.

### Button

Three variants — all 0px border-radius, all Geist Mono labels:

**Primary:** Obsidian background, Ichor text. On hover: Ichor background, Obsidian text via a `::before` pseudo-element slide-up transition at 300ms cubic-bezier.

**Ghost:** Transparent background, Obsidian border and text. On hover: `alabaster-2` background.

**Danger:** Obsidian background, `#FF4444` text. For destructive actions only.

**Accent variants:** Each page accent (Electrum, Aether, Ichor, Forge) has a corresponding button variant used sparingly for primary actions on that page.

### Card

White background, 1px `alabaster-3` border, hard offset shadow `6px 6px 0px #0A0A0A`. No border radius. Padding 24px. Three sizes: sm, md, lg.

### DataTable

Built on Shadcn's TanStack Table implementation. Headers in Cinzel. Rows in Geist Mono. Row hover: `alabaster-2` background. Row border: 1px `alabaster-3` bottom only. Column sort indicators: small arrows in Stone color.

### TerminalWindow

The reusable terminal component used on both the landing page and the dashboard. Props: `lines: TerminalLine[]`, `autoPlay: boolean`, `playbackSpeed: number`, `onComplete: () => void`. Line types: `cmd`, `success`, `error`, `info`, `comment`, `dim`, `hash`. The cursor variant (orange vs green) is passed as a prop.

### WalletButton

Custom Solana wallet button that wraps `@solana/wallet-adapter-react-ui` and completely overrides all default styles. The purple branding is removed via a global CSS `wallet-adapter-*` class override in `globals.css`. The component itself renders as a plain Geist Mono button in the design system style.

### NoiseBackground

A single-use component that injects the SVG noise filter into the `<body>`. Renders null — it exists only for its side effect. Mounted once in `layout.tsx`.

---

## Part 8: Data Fetching Strategy

### React Server Components (Marketplace)

The marketplace agent list is fetched server-side using Next.js 15 RSC. No loading spinners on initial page load. The Solana RPC call happens during server rendering via the `fetchAgentRegistry()` function in `packages/solana-client/`. The resulting data is passed as props to the `AgentTable` client component.

```typescript
// apps/marketplace/app/agents/page.tsx
import { fetchAgentRegistry } from '@valdyum/solana-client';
import { AgentTable } from '../../components/marketplace/AgentTable';

export default async function AgentsPage() {
  const agents = await fetchAgentRegistry({
    rpc: config.HELIUS_RPC,
    fallback: config.TRITON_RPC,
  });

  return <AgentTable initialData={agents} />;
}
```

### Client-Side Real-Time Updates

After the initial server render, the `AgentTable` uses `useSWR` with a 30-second refresh interval to keep the data current without requiring a page reload.

### WebSocket Connection (Dashboard)

The dashboard terminal connects to the Valdyum platform API via WebSocket. The connection is managed by `useWebSocket` from `packages/hooks/`. It handles reconnection logic (exponential backoff up to 10 retries), connection state updates to Zustand (`setWsConnectionState`), and graceful cleanup on component unmount.

### Arweave Queries (Agent Detail)

The TAPEDRIVE verification panel queries the Arweave gateway directly from the browser using `fetch`. No backend proxy. This is intentional — it proves that verification is decentralized and does not depend on Valdyum's servers.

---

## Part 9: Performance Budget and Constraints

### JavaScript Budget

- Landing page initial bundle: under 150KB gzipped (excluding the 3D engine which is lazy-loaded).
- 3D engine chunk: lazy-loaded via `next/dynamic` with `ssr: false`. Only requested after the above-the-fold content is interactive.
- Marketplace: under 200KB gzipped. TanStack Table and React Flow are loaded lazily on demand.

### 3D Asset Budget

- Marble bust `.glb`: maximum 5MB raw. After Draco compression: under 500KB.
- All PBR textures: maximum 2MB total. After KTX2 compression: under 800KB, decompressed on the GPU.
- Pixel ratio clamped to `Math.min(window.devicePixelRatio, 2)` on all devices.
- Three.js not loaded at all on viewports below 768px width.

### Core Web Vitals Targets

- LCP (Largest Contentful Paint): under 2.5s on mobile (no WebGL loaded, static `.webp` bust image).
- LCP on desktop: under 3.5s (3D canvas lazy-loaded, placeholder visible immediately).
- CLS (Cumulative Layout Shift): 0. All dimensions pre-defined. No content shifts after load.
- INP (Interaction to Next Paint): under 200ms. No heavy computations on the main thread.

---

## Part 10: Build, CI/CD, and Deployment

### Turborepo Pipeline Order

```
tsconfig → config → hooks → ui-kit → 3d-engine → solana-client → landing-page, marketplace
```

Every package builds before any app. Type errors in shared packages surface before any app can deploy.

### Environment Variables

```
# packages/config/src/endpoints.ts pulls from:
HELIUS_RPC_URL=
TRITON_FALLBACK_URL=
ARWEAVE_GATEWAY=https://arweave.net
TAPEDRIVE_PROGRAM_ID=
MARKETPLACE_PROGRAM_ID=
NEXT_PUBLIC_NETWORK=mainnet-beta
```

### Deployment

**`apps/landing-page`** → Vercel. Static generation where possible. ISR (Incremental Static Regeneration) at 60-second intervals for the ecosystem and stats sections.

**`apps/marketplace`** → Vercel. Fully dynamic. Server components fetch live Solana data on every request.

**WebSocket server** → Fly.io or Railway. The Go/Node.js API server that bridges the user's local Python runtime to the dashboard terminal.

---

## Part 11: File Naming and Code Conventions

**Components:** PascalCase. `AgentTable.tsx`, `TerminalWindow.tsx`.

**Hooks:** camelCase with `use` prefix. `useScrollProgress.ts`, `useAgentData.ts`.

**Utilities:** camelCase. `formatWalletAddress.ts`, `computeShatterVectors.ts`.

**Types:** Separate `types.ts` file per package. Never inline complex types in component files.

**No index barrel exports** except at the package root level. Deep imports are explicit: `import { AgentTable } from '@valdyum/ui-kit/components/AgentTable'` not `from '@valdyum/ui-kit'`.

**Zero `any` types.** Strict TypeScript throughout. The shared `tsconfig/base.json` enforces this with `"strict": true` and `"noImplicitAny": true`.

**Zero inline styles** in React components. All styling through Tailwind classes. The only inline styles permitted are in the `PersistentCanvas` component for the fixed positioning and opacity transition, because Tailwind cannot handle dynamic opacity values tied to the Zustand store at runtime.

---

That is the complete architecture. Every page, every component, every data flow, every 3D scene, every performance constraint, and every engineering rule is defined here. This document is the single source of truth your team builds from.