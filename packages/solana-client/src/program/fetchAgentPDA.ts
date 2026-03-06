import { Connection, PublicKey } from '@solana/web3.js';
// import { BorshAccountsCoder } from '@coral-xyz/anchor';

export interface AgentPDAData {
  agentId: string;
  creatorWallet: string;
  sourceHash: string;
  arweaveContentId: string;
  currentMerkleRoot: string;
  tradeCount: number;
  winRate: number;
  pnl30d: number;
  uptimePercent: number;
  forkCount: number;
  parentAgentPDA: string | null;
  childAgentPDAs: string[];
  createdAt: number;        // unix timestamp
  lastActiveAt: number;
}

export async function fetchAgentPDA(
  agentId: string,
  connection: Connection,
  programId: PublicKey
): Promise<AgentPDAData | null> {
  try {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from('agent'), Buffer.from(agentId)],
      programId
    );

    const accountInfo = await connection.getAccountInfo(pda);
    if (!accountInfo) {
      return null;
    }

    // TODO: Replace with actual IDL when available
    // const coder = new BorshAccountsCoder(idl);
    // const data = coder.decode('Agent', accountInfo.data);
    
    // Mock return for now since we don't have the IDL
    return null;
  } catch (error) {
    console.error('Error fetching Agent PDA:', error);
    return null;
  }
}

export async function fetchAgentRegistry(options: {
  rpc: string;
  fallback?: string;
  limit?: number;      // default 50
  offset?: number;     // default 0
  filters?: {
    type?: string[];
    verified?: boolean;
    hasForked?: boolean;
  };
}): Promise<AgentPDAData[]> {
  // TODO: Replace with getProgramAccounts + memcmp filters
  
  // Returning mock data for now
  return Array.from({ length: 12 }).map((_, i) => ({
    agentId: `agent-${i + 1}`,
    creatorWallet: '5xKR...p9aM',
    sourceHash: `SHA:${Math.random().toString(16).slice(2, 10)}`,
    arweaveContentId: `arweave-id-${i + 1}`,
    currentMerkleRoot: `0x${Math.random().toString(16).slice(2, 10)}`,
    tradeCount: Math.floor(Math.random() * 10000),
    winRate: 40 + Math.random() * 40,
    pnl30d: (Math.random() - 0.2) * 5000,
    uptimePercent: 95 + Math.random() * 5,
    forkCount: Math.floor(Math.random() * 50),
    parentAgentPDA: null,
    childAgentPDAs: [],
    createdAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    lastActiveAt: Date.now() - Math.random() * 24 * 60 * 60 * 1000,
  }));
}
