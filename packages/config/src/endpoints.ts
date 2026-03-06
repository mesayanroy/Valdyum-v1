export const ENDPOINTS = {
  HELIUS_RPC:      process.env.NEXT_PUBLIC_HELIUS_RPC_URL || 'https://mainnet.helius-rpc.com',
  TRITON_FALLBACK: process.env.NEXT_PUBLIC_TRITON_URL     || 'https://rpc.triton.one',
  ARWEAVE_GATEWAY: 'https://arweave.net',
  WEBSOCKET_URL:   process.env.NEXT_PUBLIC_WS_URL         || 'ws://localhost:8080/ws',
} as const;
