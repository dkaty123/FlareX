
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Wallet } from 'lucide-react';
import SupportedChains from './SupportedChains';

interface Chain {
  id: number;
  name: string;
  logo: string;
}

interface AssetBridgeTabProps {
  isConnected: boolean;
  account: string | null;
  balance: string | null;
  networkId: number | null;
  fromChain: string;
  setFromChain: (value: string) => void;
  toChain: string;
  setToChain: (value: string) => void;
  selectedAsset: string;
  setSelectedAsset: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  destinationAddress: string;
  setDestinationAddress: (value: string) => void;
  tokenBalances: Record<string, string>;
  estimatedFees: { nativeFee: string; zroFee: string } | null;
  isLoading: boolean;
  supportedChains: Chain[];
  handleBridgeAsset: () => void;
  handleMaxAmount: () => void;
}

const AssetBridgeTab: React.FC<AssetBridgeTabProps> = ({
  isConnected,
  account,
  balance,
  networkId,
  fromChain,
  setFromChain,
  toChain,
  setToChain,
  selectedAsset,
  setSelectedAsset,
  amount,
  setAmount,
  destinationAddress,
  setDestinationAddress,
  tokenBalances,
  estimatedFees,
  isLoading,
  supportedChains,
  handleBridgeAsset,
  handleMaxAmount
}) => {
  // Debug log to see what we're working with
  console.log('AssetBridgeTab supportedChains:', supportedChains);
  console.log('Current fromChain value:', fromChain);
  console.log('Current toChain value:', toChain);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bridge Interface */}
      <Card className="bg-black/20 border-purple-800/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ArrowRight className="w-5 h-5 mr-2 text-blue-400" />
            Cross-Chain Asset Bridge
          </CardTitle>
          <CardDescription className="text-purple-300">
            Bridge FXRP, FBTC, or FLTC to any LayerZero-supported chain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wallet Connection Status */}
          {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center text-yellow-300">
                <Wallet className="w-4 h-4 mr-2" />
                <span className="text-sm">Connect your MetaMask wallet to access balances and bridge assets</span>
              </div>
            </div>
          )}

          {/* Chain Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-purple-200 mb-2 block font-medium">From Chain</label>
              <Select value={fromChain} onValueChange={setFromChain}>
                <SelectTrigger className="bg-black/40 border-purple-800/50 text-white">
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-800/50 z-50">
                  {supportedChains && supportedChains.length > 0 ? (
                    supportedChains.map(chain => (
                      <SelectItem 
                        key={`from-${chain.id}`} 
                        value={chain.id.toString()} 
                        className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50"
                      >
                        {chain.logo} {chain.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled className="text-gray-400">
                      Loading chains...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-purple-200 mb-2 block font-medium">To Chain</label>
              <Select value={toChain} onValueChange={setToChain}>
                <SelectTrigger className="bg-black/40 border-purple-800/50 text-white">
                  <SelectValue placeholder="Select destination chain" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-800/50 z-50">
                  {supportedChains && supportedChains.length > 0 ? (
                    supportedChains
                      .filter(chain => chain.id.toString() !== fromChain)
                      .map(chain => (
                        <SelectItem 
                          key={`to-${chain.id}`} 
                          value={chain.id.toString()} 
                          className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50"
                        >
                          {chain.logo} {chain.name}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="loading" disabled className="text-gray-400">
                      Loading chains...
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Asset Selection */}
          <div>
            <label className="text-sm text-purple-200 mb-2 block font-medium">Asset</label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="bg-black/40 border-purple-800/50 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-purple-800/50 z-50">
                <SelectItem value="FXRP" className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50">
                  <div className="flex justify-between items-center w-full">
                    <span>FXRP - Synthetic XRP</span>
                    {isConnected && (
                      <span className="ml-2 text-purple-300">Balance: {tokenBalances.FXRP}</span>
                    )}
                  </div>
                </SelectItem>
                <SelectItem value="FBTC" className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50">
                  <div className="flex justify-between items-center w-full">
                    <span>FBTC - Synthetic Bitcoin</span>
                    {isConnected && (
                      <span className="ml-2 text-purple-300">Balance: {tokenBalances.FBTC}</span>
                    )}
                  </div>
                </SelectItem>
                <SelectItem value="FLTC" className="text-white hover:bg-purple-800/50 focus:bg-purple-800/50">
                  <div className="flex justify-between items-center w-full">
                    <span>FLTC - Synthetic Litecoin</span>
                    {isConnected && (
                      <span className="ml-2 text-purple-300">Balance: {tokenBalances.FLTC}</span>
                    )}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount with Balance Display */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-purple-200 font-medium">Amount</label>
              {isConnected && (
                <div className="flex items-center text-sm text-purple-300">
                  <span>Balance: {tokenBalances[selectedAsset]} {selectedAsset}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMaxAmount}
                    className="ml-2 h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
                  >
                    MAX
                  </Button>
                </div>
              )}
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-black/40 border-purple-800/50 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Destination Address */}
          <div>
            <label className="text-sm text-purple-200 mb-2 block font-medium">Destination Address</label>
            <Input
              placeholder="0x... (auto-filled with your address)"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              className="bg-black/40 border-purple-800/50 text-white placeholder:text-gray-500"
            />
            {account && (
              <p className="text-xs text-gray-400 mt-1">
                Connected: {account.slice(0, 8)}...{account.slice(-6)}
              </p>
            )}
          </div>

          {/* Fee Estimation */}
          {estimatedFees && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2">Estimated Fees</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">LayerZero Fee:</span>
                  <span className="text-white">{estimatedFees.nativeFee} {networkId === 14 ? 'FLR' : 'ETH'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Your Balance:</span>
                  <span className="text-white">{balance || '0'} {networkId === 14 ? 'FLR' : 'ETH'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated Time:</span>
                  <span className="text-white">5 minutes</span>
                </div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleBridgeAsset}
            disabled={isLoading || !amount || !destinationAddress || !isConnected}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isLoading ? 'Bridging...' : 'Bridge Asset'}
          </Button>
        </CardContent>
      </Card>

      {/* Supported Chains */}
      <SupportedChains supportedChains={supportedChains} />
    </div>
  );
};

export default AssetBridgeTab;
