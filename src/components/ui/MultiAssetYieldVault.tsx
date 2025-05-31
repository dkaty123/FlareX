import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vault, 
  TrendingUp, 
  RefreshCw, 
  PieChart, 
  Target,
  Zap,
  Trophy,
  BarChart3,
  DollarSign,
  Timer
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

interface VaultAsset {
  symbol: string;
  name: string;
  currentPrice: number;
  allocation: number;
  targetAllocation: number;
  balance: number;
  value: number;
  apy: number;
  priceChange24h: number;
}

interface RebalanceEvent {
  timestamp: number;
  action: string;
  fromAsset: string;
  toAsset: string;
  amount: number;
  reason: string;
}

const MultiAssetYieldVault = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  const [vaultAssets, setVaultAssets] = useState<VaultAsset[]>([
    {
      symbol: 'FXRP',
      name: 'Flare XRP',
      currentPrice: 0.6234,
      allocation: 35,
      targetAllocation: 30,
      balance: 84.50,
      value: 52.67,
      apy: 14.2,
      priceChange24h: 3.4
    },
    {
      symbol: 'FBTC',
      name: 'Flare Bitcoin',
      currentPrice: 43521.90,
      allocation: 25,
      targetAllocation: 25,
      balance: 0.00109,
      value: 47.44,
      apy: 8.7,
      priceChange24h: -1.2
    },
    {
      symbol: 'FLTC',
      name: 'Flare Litecoin',
      currentPrice: 89.45,
      allocation: 20,
      targetAllocation: 25,
      balance: 0.445,
      value: 39.81,
      apy: 15.2,
      priceChange24h: 2.8
    },
    {
      symbol: 'FLR',
      name: 'Flare',
      currentPrice: 0.0234,
      balance: 1264.50,
      allocation: 20,
      targetAllocation: 20,
      value: 29.59,
      apy: 6.8,
      priceChange24h: 5.6
    }
  ]);

  const [totalVaultValue] = useState(169.51);
  const [totalApy] = useState(11.7);
  const [lastRebalance] = useState('4h 23m ago');
  const [nextRebalance] = useState('7h 37m');
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('FXRP');

  const [recentRebalances] = useState<RebalanceEvent[]>([
    {
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      action: 'Rebalance',
      fromAsset: 'FXRP',
      toAsset: 'FLTC',
      amount: 5.67,
      reason: 'FLTC price increased 5%'
    },
    {
      timestamp: Date.now() - 12 * 60 * 60 * 1000,
      action: 'Auto-compound',
      fromAsset: 'Rewards',
      toAsset: 'FXRP',
      amount: 1.34,
      reason: 'Weekly yield distribution'
    }
  ]);

  useEffect(() => {
    // Simulate price updates and rebalancing
    const interval = setInterval(() => {
      setVaultAssets(prev => prev.map(asset => ({
        ...asset,
        currentPrice: asset.currentPrice * (1 + (Math.random() - 0.5) * 0.02),
        priceChange24h: asset.priceChange24h + (Math.random() - 0.5) * 0.5
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const executeRebalance = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Connect your wallet to execute rebalancing",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Rebalancing Initiated",
      description: "Smart contract is rebalancing your vault using Flare's FTSO price feeds..."
    });

    // Simulate rebalancing
    setTimeout(() => {
      toast({
        title: "Rebalancing Complete!",
        description: "Your vault has been optimally rebalanced"
      });
    }, 3000);
  };

  const depositToVault = async () => {
    if (!isConnected || !depositAmount) {
      toast({
        title: "Invalid Input",
        description: "Connect wallet and enter deposit amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Processing",
      description: `Depositing ${depositAmount} ${selectedAsset} to vault...`
    });

    setTimeout(() => {
      toast({
        title: "Deposit Successful!",
        description: `Successfully deposited ${depositAmount} ${selectedAsset}`
      });
      setDepositAmount('');
    }, 2000);
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getAllocationDifference = (current: number, target: number) => {
    const diff = current - target;
    if (Math.abs(diff) < 1) return null;
    return diff > 0 ? 'Over' : 'Under';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Vault className="w-8 h-8 mr-3 text-purple-400" />
          Multi-Asset Yield Vault
        </h2>
        <p className="text-purple-300 max-w-3xl mx-auto">
          Automated yield vault that rebalances based on Flare's FTSO price feeds and rewards participants with RNG-powered bonuses. 
          Stake multiple FAssets and let smart contracts optimize your returns.
        </p>
      </div>

      {/* Vault Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-white">${totalVaultValue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Weighted APY</p>
              <p className="text-2xl font-bold text-blue-400">{totalApy}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Last Rebalance</p>
              <p className="text-lg font-bold text-white">{lastRebalance}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <Timer className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Next Rebalance</p>
              <p className="text-lg font-bold text-yellow-400">{nextRebalance}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="overview" className="text-white data-[state=active]:text-purple-400">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="deposit" className="text-white data-[state=active]:text-purple-400">Deposit & Withdraw</TabsTrigger>
          <TabsTrigger value="rewards" className="text-white data-[state=active]:text-purple-400">RNG Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50 mb-4">
            <CardContent className="p-4">
              <p className="text-center text-purple-300 text-sm">
                Track your diversified FAsset portfolio with automatic rebalancing powered by Flare's FTSO real-time price feeds.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                  Asset Allocation
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Current vs target allocation with auto-rebalancing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {vaultAssets.map((asset) => (
                  <div key={asset.symbol} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                        <span className="font-semibold text-white">{asset.symbol}</span>
                        <Badge variant="outline" className="text-xs text-purple-300 border-purple-500">
                          {asset.allocation.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${asset.value.toLocaleString()}</p>
                        <p className={`text-xs ${getChangeColor(asset.priceChange24h)}`}>
                          {asset.priceChange24h > 0 ? '+' : ''}{asset.priceChange24h.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="text-gray-300">Current</span>
                          <span className="text-white">{asset.allocation.toFixed(1)}%</span>
                        </div>
                        <Progress value={asset.allocation} className="h-2" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="text-gray-300">Target</span>
                          <span className="text-white">{asset.targetAllocation.toFixed(1)}%</span>
                        </div>
                        <Progress value={asset.targetAllocation} className="h-2" />
                      </div>
                    </div>

                    {getAllocationDifference(asset.allocation, asset.targetAllocation) && (
                      <div className="text-xs text-yellow-400">
                        {getAllocationDifference(asset.allocation, asset.targetAllocation)}-weighted by{' '}
                        {Math.abs(asset.allocation - asset.targetAllocation).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-6">
                  <Button 
                    onClick={executeRebalance}
                    disabled={!isConnected}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Rebalance Portfolio
                  </Button>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Uses Flare's FTSO price feeds for optimal rebalancing
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
                  Asset Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vaultAssets.map((asset) => (
                  <div key={asset.symbol} className="p-4 bg-gradient-to-r from-black/40 to-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{asset.name}</h4>
                        <p className="text-sm text-gray-300">{asset.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">${asset.currentPrice.toFixed(4)}</p>
                        <p className={`text-sm ${getChangeColor(asset.priceChange24h)}`}>
                          {asset.priceChange24h > 0 ? '+' : ''}{asset.priceChange24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400">Balance</p>
                        <p className="text-white font-semibold">{asset.balance.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">APY</p>
                        <p className="text-green-400 font-semibold">{asset.apy}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">24h P&L</p>
                        <p className={`font-semibold ${getChangeColor(asset.priceChange24h)}`}>
                          ${(asset.value * asset.priceChange24h / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50 mb-4">
            <CardContent className="p-4">
              <p className="text-center text-purple-300 text-sm">
                Deposit FAssets to the vault and earn automated yield with Flare's price oracle-driven rebalancing strategies.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white">Deposit to Vault</CardTitle>
              <CardDescription className="text-purple-300">
                Add FAssets to the multi-asset yield vault
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white mb-2 block font-medium">Select Asset</label>
                  <select 
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="w-full p-3 bg-black/40 border border-purple-800/50 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                  >
                    {vaultAssets.map(asset => (
                      <option key={asset.symbol} value={asset.symbol} className="bg-black text-white">
                        {asset.name} ({asset.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-white mb-2 block font-medium">Amount</label>
                  <Input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="bg-black/40 border-purple-800/50 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Enter amount to deposit"
                  />
                </div>
              </div>

              <Button 
                onClick={depositToVault}
                disabled={!isConnected || !depositAmount}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Deposit to Vault
              </Button>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2">How it works:</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Deposit any supported FAsset (FXRP, FBTC, FLTC, FLR)</li>
                  <li>• Earn yield from multiple DeFi protocols automatically</li>
                  <li>• Automatic rebalancing based on FTSO price feeds</li>
                  <li>• Withdraw anytime with no lock-up periods</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50 mb-4">
            <CardContent className="p-4">
              <p className="text-center text-purple-300 text-sm">
                Earn random bonus rewards powered by Flare's Secure Random Number Generator for fair and verifiable distributions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                RNG-Powered Vault Rewards
              </CardTitle>
              <CardDescription className="text-purple-300">
                Random bonus distributions using Flare's Secure RNG
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-yellow-400 mb-1">Weekly Lottery</h4>
                  <p className="text-sm text-gray-300">Random vault participants selected for bonus rewards</p>
                  <p className="text-lg font-bold text-white mt-2">Next: 3d 12h</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-400 mb-1">Performance Bonus</h4>
                  <p className="text-sm text-gray-300">Random multipliers for top-performing assets</p>
                  <p className="text-lg font-bold text-white mt-2">Active</p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-400 mb-1">Rebalance Rewards</h4>
                  <p className="text-sm text-gray-300">Participants get random bonuses during rebalancing</p>
                  <p className="text-lg font-bold text-white mt-2">Ready</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border border-yellow-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-400 mb-4">Recent RNG Rewards</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Weekly Lottery Winner</span>
                    <span className="text-green-400 font-semibold">+15 FXRP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance Multiplier</span>
                    <span className="text-blue-400 font-semibold">1.5x APY boost</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rebalance Bonus</span>
                    <span className="text-purple-400 font-semibold">+2% yield</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiAssetYieldVault;
