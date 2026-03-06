import { useState, useCallback } from 'react';

export interface VerificationResult {
  status: 'match' | 'mismatch' | 'error';
  computedHash: string;
  onChainHash: string;
  arweaveContentId: string;
  timestamp: number;
  errorMessage?: string;
}

export const useTapedriveVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const verify = useCallback(async (arweaveContentId: string, onChainMerkleRoot: string): Promise<VerificationResult> => {
    setIsVerifying(true);
    setResult(null);

    try {
      const response = await fetch(`https://arweave.net/${arweaveContentId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from Arweave: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const isMatch = computedHash === onChainMerkleRoot;
      
      const verificationResult: VerificationResult = {
        status: isMatch ? 'match' : 'mismatch',
        computedHash,
        onChainHash: onChainMerkleRoot,
        arweaveContentId,
        timestamp: Date.now()
      };
      
      setResult(verificationResult);
      return verificationResult;
    } catch (error) {
      const errorResult: VerificationResult = {
        status: 'error',
        computedHash: '',
        onChainHash: onChainMerkleRoot,
        arweaveContentId,
        timestamp: Date.now(),
        errorMessage: error instanceof Error ? error.message : 'Unknown verification error'
      };
      
      setResult(errorResult);
      return errorResult;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setIsVerifying(false);
  }, []);

  return { verify, isVerifying, result, reset };
};
