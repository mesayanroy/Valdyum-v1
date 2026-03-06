import { useState, useEffect, useCallback } from 'react';

export interface Agent {
  id: string;
  name: string;
  type: 'mev-bot' | 'mempool-monitor' | 'arbitrage' | 'liquidity' | 'whale-alert' | 'data-feed';
  creatorWallet: string;
  onChainAddress: string;
  sourceHash: string;
  arweaveContentId: string;
  winRate: number;
  pnl30d: number;
  tradeCount: number;
  uptimePercent: number;
  forkCount: number;
  parentAgentId: string | null;
  childAgentIds: string[];
  price: number | null;
  priceType: 'one-time' | 'subscription' | 'free';
  isVerified: boolean;
  sandboxPassed: boolean;
  createdAt: string;
  lastActiveAt: string;
}

interface UseAgentDataOptions {
  refreshInterval?: number;
  suspense?: boolean;
}

export const useAgentData = (agentId?: string, options?: UseAgentDataOptions) => {
  const { refreshInterval = 30000 } = options || {};
  
  const [data, setData] = useState<Agent | Agent[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const url = agentId ? `/api/agents/${agentId}` : '/api/agents';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch agent data: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchData();
    
    if (refreshInterval > 0) {
      const intervalId = setInterval(fetchData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, refreshInterval]);

  return { data, isLoading, error, mutate: fetchData };
};
