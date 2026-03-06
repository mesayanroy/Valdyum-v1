import { Connection, PublicKey } from '@solana/web3.js';
import { WalletContextState } from '../WalletProvider';

export interface Payment402 {
  requestingAgentId: string;
  providingAgentId: string;
  amountSOL: number;
  serviceDescription: string;
  timestamp: number;
  transactionSignature: string;
}

export async function register0x402Payment(
  payment: Omit<Payment402, 'timestamp' | 'transactionSignature'>,
  wallet: WalletContextState,
  connection: Connection,
  programId: PublicKey
): Promise<Payment402> {
  // TODO: Implement real Anchor call to register 0x402 payment
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    ...payment,
    timestamp: Date.now(),
    transactionSignature: `mock_payment_tx_${Math.random().toString(36).substring(7)}`,
  };
}

export async function fetchPaymentHistory(
  agentId: string,
  connection: Connection,
  limit: number = 10
): Promise<Payment402[]> {
  // TODO: Implement real RPC call to fetch payment history
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return Array.from({ length: limit }).map((_, i) => ({
    requestingAgentId: `agent-${Math.floor(Math.random() * 100)}`,
    providingAgentId: agentId,
    amountSOL: Number((Math.random() * 0.1).toFixed(4)),
    serviceDescription: `API Call ${i + 1}`,
    timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
    transactionSignature: `mock_tx_${Math.random().toString(36).substring(7)}`,
  }));
}
