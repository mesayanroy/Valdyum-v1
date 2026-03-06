import { Connection, PublicKey } from '@solana/web3.js';

export async function fetchOnChainMerkleRoot(
  agentId: string,
  batchIndex: number,
  connection: Connection,
  programId: PublicKey
): Promise<string | null> {
  try {
    // TODO: Implement actual Anchor fetch
    return `0x${Math.random().toString(16).slice(2, 10)}`;
  } catch (error) {
    console.error('Error fetching Merkle root:', error);
    return null;
  }
}

export async function fetchAllMerkleRoots(
  agentId: string,
  connection: Connection,
  programId: PublicKey
): Promise<Array<{ batchIndex: number; merkleRoot: string; blockHeight: number }>> {
  try {
    // TODO: Implement actual Anchor fetch
    return [
      { batchIndex: 1, merkleRoot: '0x123...', blockHeight: 1000 },
      { batchIndex: 2, merkleRoot: '0x456...', blockHeight: 2000 },
    ];
  } catch (error) {
    console.error('Error fetching all Merkle roots:', error);
    return [];
  }
}
