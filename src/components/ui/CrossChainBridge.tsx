import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWallet } from '@/hooks/useWallet';
import { LayerZeroService, BridgeTransaction, LAYERZERO_CHAIN_IDS } from '@/services/layerZeroService';
import { useToast } from '@/hooks/use-toast';
import BridgeHeader from './bridge/BridgeHeader';
import AssetBridgeTab from './bridge/AssetBridgeTab';
import OracleBridgeTab from './bridge/OracleBridgeTab';
import TransactionTrackingTab from './bridge/TransactionTrackingTab';
import LayerZeroBenefitsTab from './bridge/LayerZeroBenefitsTab';

const CrossChainBridge = () => {
  const { provider, isConnected, networkId, account, balance } = useWallet();
  const { toast } = useToast();
  const [layerZeroService, setLayerZeroService] = useState<LayerZeroService | null>(null);
  
  // Bridge state
  const [fromChain, setFromChain] = useState('14'); // Flare
  const [toChain, setToChain] = useState('1'); // Ethereum
  const [selectedAsset, setSelectedAsset] = useState('FXRP');
  const [amount, setAmount] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedFees, setEstimatedFees] = useState<{ nativeFee: string; zroFee: string } | null>(null);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({
    'FXRP': '0',
    'FBTC': '0', 
    'FLTC': '0'
  });
  
  // Transaction tracking
  const [transactions, setTransactions] = useState<BridgeTransaction[]>([]);
  const [selectedTx, setSelectedTx] = useState<BridgeTransaction | null>(null);

  // Price feed bridge state
  const [priceFeeds] = useState([
    { symbol: 'FLR/USD', price: 0.0234, timestamp: Date.now() },
    { symbol: 'ETH/USD', price: 2456.78, timestamp: Date.now() },
    { symbol: 'BTC/USD', price: 43521.90, timestamp: Date.now() }
  ]);

  useEffect(() => {
    if (provider && networkId) {
      console.log('Creating LayerZero service for network:', networkId);
      setLayerZeroService(new LayerZeroService(provider, networkId));
    }
  }, [provider, networkId]);

  useEffect(() => {
    if (layerZeroService && amount && toChain) {
      estimateBridgeFees();
    }
  }, [amount, toChain, layerZeroService]);

  // Auto-fill destination address with current account
  useEffect(() => {
    if (account && !destinationAddress) {
      setDestinationAddress(account);
    }
  }, [account, destinationAddress]);

  // Simulate fetching token balances from wallet
  useEffect(() => {
    if (isConnected && provider) {
      fetchTokenBalances();
    }
  }, [isConnected, provider, selectedAsset]);

  const fetchTokenBalances = async () => {
    if (!provider || !account) return;
    
    try {
      // Simulate fetching token balances - in reality this would query token contracts
      const mockBalances = {
        'FXRP': (Math.random() * 1000).toFixed(4),
        'FBTC': (Math.random() * 10).toFixed(6),
        'FLTC': (Math.random() * 100).toFixed(4)
      };
      setTokenBalances(mockBalances);
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  };

  const estimateBridgeFees = async () => {
    if (!layerZeroService) return;
    
    try {
      const fees = await layerZeroService.estimateFees(parseInt(toChain), "0x", 200000);
      setEstimatedFees(fees);
    } catch (error) {
      console.error('Error estimating fees:', error);
    }
  };

  const handleBridgeAsset = async () => {
    if (!layerZeroService || !amount || !destinationAddress) return;
    
    try {
      setIsLoading(true);
      const tx = await layerZeroService.sendAsset(
        parseInt(toChain),
        destinationAddress,
        selectedAsset,
        amount
      );
      
      setTransactions(prev => [tx, ...prev]);
      setSelectedTx(tx);
      
      toast({
        title: "Bridge Transaction Initiated!",
        description: `Bridging ${amount} ${selectedAsset} to ${supportedChains.find(c => c.id === parseInt(toChain))?.name}`,
      });
      
      setAmount('');
      fetchTokenBalances();
    } catch (error) {
      toast({
        title: "Bridge Failed",
        description: "Failed to initiate cross-chain transfer",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBridgePriceFeeds = async () => {
    if (!layerZeroService) return;
    
    try {
      setIsLoading(true);
      const tx = await layerZeroService.sendPriceFeed(
        parseInt(toChain),
        destinationAddress || account || '0x742d35Cc6634C0532925a3b8D55B8c3e3D4c5Abc',
        priceFeeds
      );
      
      setTransactions(prev => [tx, ...prev]);
      setSelectedTx(tx);
      
      toast({
        title: "Price Feeds Sent!",
        description: `FTSO data bridged to ${supportedChains.find(c => c.id === parseInt(toChain))?.name}`,
      });
    } catch (error) {
      toast({
        title: "Bridge Failed",
        description: "Failed to send price feeds",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxAmount = () => {
    const tokenBalance = tokenBalances[selectedAsset];
    if (tokenBalance) {
      setAmount(tokenBalance);
    }
  };

  // Always provide supported chains, even if service isn't initialized
  const supportedChains = layerZeroService?.getSupportedChains() || Object.values(LAYERZERO_CHAIN_IDS);
  const ultraLightNodeBenefits = layerZeroService?.getUltraLightNodeBenefits() || [];

  console.log('Supported chains:', supportedChains);
  console.log('Current fromChain:', fromChain);
  console.log('Current toChain:', toChain);

  return (
    <div className="space-y-6">
      <BridgeHeader />

      <Tabs defaultValue="bridge" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="bridge" className="text-gray-400 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Asset Bridge</TabsTrigger>
          <TabsTrigger value="oracle" className="text-gray-400 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Oracle Bridge</TabsTrigger>
          <TabsTrigger value="tracking" className="text-gray-400 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">Transaction Tracking</TabsTrigger>
          <TabsTrigger value="benefits" className="text-gray-400 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white">LayerZero Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="bridge" className="space-y-6">
          <AssetBridgeTab
            isConnected={isConnected}
            account={account}
            balance={balance}
            networkId={networkId}
            fromChain={fromChain}
            setFromChain={setFromChain}
            toChain={toChain}
            setToChain={setToChain}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            amount={amount}
            setAmount={setAmount}
            destinationAddress={destinationAddress}
            setDestinationAddress={setDestinationAddress}
            tokenBalances={tokenBalances}
            estimatedFees={estimatedFees}
            isLoading={isLoading}
            supportedChains={supportedChains}
            handleBridgeAsset={handleBridgeAsset}
            handleMaxAmount={handleMaxAmount}
          />
        </TabsContent>

        <TabsContent value="oracle" className="space-y-6">
          <OracleBridgeTab
            priceFeeds={priceFeeds}
            toChain={toChain}
            setToChain={setToChain}
            destinationAddress={destinationAddress}
            setDestinationAddress={setDestinationAddress}
            isLoading={isLoading}
            isConnected={isConnected}
            supportedChains={supportedChains}
            handleBridgePriceFeeds={handleBridgePriceFeeds}
          />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <TransactionTrackingTab
            transactions={transactions}
            setSelectedTx={setSelectedTx}
          />
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <LayerZeroBenefitsTab ultraLightNodeBenefits={ultraLightNodeBenefits} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrossChainBridge;
