
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  error: string | null;
  networkId: number | null;
  balance: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networkId, setNetworkId] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const fetchBalance = async (provider: ethers.BrowserProvider, account: string) => {
    try {
      const balanceWei = await provider.getBalance(account);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0.0000');
    }
  };

  const connect = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setAccount(accounts[0]);
      setNetworkId(Number(network.chainId));
      
      // Fetch user's balance
      await fetchBalance(provider, accounts[0]);
      
      console.log('Connected to wallet:', accounts[0]);
      console.log('Network:', network.chainId);
      console.log('Network name:', network.name);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setNetworkId(null);
    setBalance(null);
    setError(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setAccount(accounts[0]);
          if (provider) {
            await fetchBalance(provider, accounts[0]);
          }
        }
      });

      window.ethereum.on('chainChanged', async (chainId: string) => {
        const newNetworkId = parseInt(chainId, 16);
        setNetworkId(newNetworkId);
        
        // Refetch balance on network change
        if (provider && account) {
          await fetchBalance(provider, account);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, [provider, account]);

  // Auto-refresh balance every 30 seconds
  useEffect(() => {
    if (provider && account && networkId) {
      const interval = setInterval(() => {
        fetchBalance(provider, account);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [provider, account, networkId]);

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        isConnected: !!account,
        isConnecting,
        connect,
        disconnect,
        error,
        networkId,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
