'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider as SolanaBaseWalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ENDPOINTS } from '@valdyum/config';

// USDC Mint Address on Mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

export interface WalletContextState {
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  disconnect: () => Promise<void>;
  signTransaction: ((tx: Transaction) => Promise<Transaction>) | undefined;
  truncatedAddress: string | null;
  balance: number | null;
  usdcBalance: number | null;
}

const WalletContext = createContext<WalletContextState>({} as WalletContextState);

export const useWalletContext = () => useContext(WalletContext);

const InnerWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { publicKey, connected, connecting, disconnect, signTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);

  const connection = useMemo(() => {
    try {
      return new Connection(ENDPOINTS.HELIUS_RPC, 'confirmed');
    } catch (e) {
      console.warn('Failed to connect to primary RPC, falling back to Triton', e);
      return new Connection(ENDPOINTS.TRITON_FALLBACK, 'confirmed');
    }
  }, []);

  const truncatedAddress = useMemo(() => {
    if (!publicKey) return null;
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  }, [publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      localStorage.setItem('wallet_connected', 'true');
    } else {
      localStorage.removeItem('wallet_connected');
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(null);
      setUsdcBalance(null);
      return;
    }

    const fetchBalances = async () => {
      try {
        const solBalance = await connection.getBalance(publicKey);
        setBalance(solBalance / LAMPORTS_PER_SOL);

        // Fetch USDC balance
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: USDC_MINT,
        });
        
        if (tokenAccounts.value.length > 0) {
          const amount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
          setUsdcBalance(amount);
        } else {
          setUsdcBalance(0);
        }
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
    const interval = setInterval(fetchBalances, 30000);

    return () => clearInterval(interval);
  }, [connected, publicKey, connection]);

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        connected,
        connecting,
        disconnect,
        signTransaction,
        truncatedAddress,
        balance,
        usdcBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const SolanaWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = useMemo(() => {
    try {
      new Connection(ENDPOINTS.HELIUS_RPC);
      return ENDPOINTS.HELIUS_RPC;
    } catch {
      return ENDPOINTS.TRITON_FALLBACK;
    }
  }, []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaBaseWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <InnerWalletProvider>{children}</InnerWalletProvider>
        </WalletModalProvider>
      </SolanaBaseWalletProvider>
    </ConnectionProvider>
  );
};
