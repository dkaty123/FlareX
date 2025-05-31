import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  TrendingUp, 
  Zap, 
  Target, 
  Leaf, 
  Trophy,
  Timer,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

interface YieldPool {
  id: string;
  name: string;
  type: 'auto-compound' | 'lottery' | 'carbon-offset';
  apy: number;
  tvl: string;
  minimumDeposit: number;
  lockPeriod: string;
  description: string;
  features: string[];
  riskLevel: 'low' | 'medium' | 'high';
  nextCompound?: string;
  lotteryDrawTime?: string;
  carbonCredits?: number;
}

const FXRPYieldStrategies = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  const [yieldPools] = useState<YieldPool[]>([
    {
      id: 'fxrp-auto-compound',
      name: 'FXRP Auto-Compound Vault',
      type: 'auto-compound',
      apy: 18.7,
      tvl: '$2.4M',
      minimumDeposit: 100,
      lockPeriod: 'Flexible',
      description: 'Automatically compounds FXRP staking rewards every 6 hours using FTSO delegation rewards',
      features: ['Auto-Compound', 'FTSO Rewards', 'Flexible Withdrawal', 'Gas Optimization'],
      riskLevel: 'low',
      nextCompound: '4h 23m'
    },
    {
      id: 'fxrp-lottery-pool',
      name: 'FXRP Yield Lottery',
      type: 'lottery',
      apy: 22.5,
      tvl: '$1.8M',
      minimumDeposit: 50,
      lockPeriod: '7 days',
      description: 'Stake FXRP and enter weekly lottery drawings powered by Flare\'s Secure RNG',
      features: ['Weekly Lottery', 'Secure RNG', 'Base APY + Prizes', 'Community Rewards'],
      riskLevel: 'medium',
      lotteryDrawTime: '2d 14h'
    },
    {
      id: 'fxrp-carbon-offset',
      name: 'Green FXRP Vault',
      type: 'carbon-offset',
      apy: 15.2,
      tvl: '$890K',
      minimumDeposit: 25,
      lockPeriod: '30 days',
      description: 'Stake FXRP and automatically purchase carbon credits based on environmental data',
      features: ['Carbon Neutral', 'Environmental Data', 'Impact Tracking', 'Green Incentives'],
      riskLevel: 'low',
      carbonCredits: 124
    }
  ]);

  const [selectedPool, setSelectedPool] = useState<YieldPool | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [userBalance] = useState('1,247.50');
  const [projectedEarnings, setProjectedEarnings] = useState(0);
  const [isDepositing, setIsDepositing] = useState(false);

  useEffect(() => {
    if (selectedPool && depositAmount) {
      const amount = parseFloat(depositAmount);
      if (amount > 0) {
        const daily = (amount * selectedPool.apy / 365 / 100);
        setProjectedEarnings(daily * 30); // 30 day projection
        console.log('Projected earnings calculated:', { amount, apy: selectedPool.apy, daily, monthly: daily * 30 });
      } else {
        setProjectedEarnings(0);
      }
    } else {
      setProjectedEarnings(0);
    }
  }, [selectedPool, depositAmount]);

  const selectPool = (pool: YieldPool) => {
    setSelectedPool(pool);
    console.log('Selected pool:', pool);
    toast({
      title: "Pool Selected",
      description: `Selected ${pool.name} for deposit`
    });
  };

  const handleDeposit = async (pool: YieldPool) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to deposit into yield pools",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    if (!amount || amount < pool.minimumDeposit) {
      toast({
        title: "Invalid Amount",
        description: `Minimum deposit is ${pool.minimumDeposit} FXRP`,
        variant: "destructive"
      });
      return;
    }

    const availableBalance = parseFloat(userBalance.replace(',', ''));
    if (amount > availableBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${userBalance} FXRP available`,
        variant: "destructive"
      });
      return;
    }

    setIsDepositing(true);

    toast({
      title: "Deposit Initiated",
      description: `Depositing ${amount} FXRP into ${pool.name}...`
    });

    // Simulate deposit process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Deposit Successful!",
        description: `Successfully deposited ${amount} FXRP into ${pool.name}. Start earning ${pool.apy}% APY!`
      });
      
      setDepositAmount('');
    } catch (error) {
      toast({
        title: "Deposit Failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDepositing(false);
    }
  };

  const getPoolIcon = (type: string) => {
    switch (type) {
      case 'auto-compound': return <Zap className="w-5 h-5 text-blue-400" />;
      case 'lottery': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'carbon-offset': return <Leaf className="w-5 h-5 text-green-400" />;
      default: return <Coins className="w-5 h-5" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'border-green-500 text-green-400';
      case 'medium': return 'border-yellow-500 text-yellow-400';
      case 'high': return 'border-red-500 text-red-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Coins className="w-8 h-8 mr-3 text-orange-400" />
          FXRP Yield Strategies
        </h2>
        <p className="text-purple-300 max-w-3xl mx-auto">
          Stake FXRP into innovative yield pools powered by FAssets bridge and Flare's unique protocols. 
          Auto-compound, lottery pools, and carbon offset strategies available.
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">FXRP Balance</p>
                <p className="text-xl font-bold text-white">{userBalance}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Staked</p>
                <p className="text-xl font-bold text-white">892.30</p>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Earned</p>
                <p className="text-xl font-bold text-green-400">+47.82</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="pools">Available Pools</TabsTrigger>
          <TabsTrigger value="deposit">Deposit & Manage</TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yieldPools.map((pool) => (
              <Card 
                key={pool.id}
                className={`bg-black/20 border-purple-800/50 hover:border-orange-500/70 transition-all cursor-pointer ${
                  selectedPool?.id === pool.id ? 'border-orange-500 bg-orange-500/10' : ''
                }`}
                onClick={() => selectPool(pool)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getPoolIcon(pool.type)}
                      <CardTitle className="text-lg text-white ml-2">{pool.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getRiskColor(pool.riskLevel)}>
                      {pool.riskLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">{pool.apy}%</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">TVL</p>
                      <p className="font-semibold text-white">{pool.tvl}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Deposit:</span>
                      <span className="text-white">{pool.minimumDeposit} FXRP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lock Period:</span>
                      <span className="text-white">{pool.lockPeriod}</span>
                    </div>
                  </div>

                  {pool.nextCompound && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <div className="flex items-center">
                        <Timer className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-blue-300 text-sm">Next compound: {pool.nextCompound}</span>
                      </div>
                    </div>
                  )}

                  {pool.lotteryDrawTime && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-yellow-300 text-sm">Next draw: {pool.lotteryDrawTime}</span>
                      </div>
                    </div>
                  )}

                  {pool.carbonCredits && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-green-300 text-sm">{pool.carbonCredits} CO₂ credits offset</span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-300">{pool.description}</p>

                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-white">Features:</h5>
                    <div className="flex flex-wrap gap-1">
                      {pool.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-500 text-purple-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedPool?.id === pool.id && (
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2">
                      <p className="text-xs text-orange-300 text-center">✓ Selected for Deposit</p>
                    </div>
                  )}

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPool(pool);
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
                  >
                    Select Pool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-6">
          {selectedPool ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    {getPoolIcon(selectedPool.type)}
                    <span className="ml-2">Deposit into {selectedPool.name}</span>
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    {selectedPool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Deposit Amount (FXRP)</label>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-black/40 border-orange-800/50 text-white placeholder:text-gray-400"
                      placeholder={`Min: ${selectedPool.minimumDeposit} FXRP`}
                    />
                    <p className="text-xs text-gray-400 mt-1">Available: {userBalance} FXRP</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Pool Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400 font-semibold">{selectedPool.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lock Period:</span>
                        <span className="text-white">{selectedPool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Risk Level:</span>
                        <Badge variant="outline" className={getRiskColor(selectedPool.riskLevel)}>
                          {selectedPool.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDeposit(selectedPool)}
                    disabled={!isConnected || !depositAmount || isDepositing}
                    className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600"
                  >
                    {isDepositing ? 'Depositing...' : 'Deposit FXRP'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Earnings Projection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {depositAmount && projectedEarnings > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="text-sm text-gray-400 mb-1">30-Day Projection</h4>
                        <p className="text-2xl font-bold text-green-400">+{projectedEarnings.toFixed(2)} FXRP</p>
                        <p className="text-sm text-green-300 mt-1">
                          ${(projectedEarnings * 0.6234).toFixed(2)} USD value
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Daily Earnings:</span>
                          <span className="text-white">+{(projectedEarnings / 30).toFixed(4)} FXRP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weekly Earnings:</span>
                          <span className="text-white">+{(projectedEarnings / 30 * 7).toFixed(3)} FXRP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Annual Projection:</span>
                          <span className="text-green-400">+{(projectedEarnings * 12).toFixed(2)} FXRP</span>
                        </div>
                      </div>

                      {selectedPool.type === 'lottery' && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                          <h5 className="text-yellow-400 font-semibold mb-1">Lottery Bonus</h5>
                          <p className="text-sm text-yellow-300">
                            Weekly chance to win up to 1000 FXRP bonus! 
                            Your odds improve with larger deposits.
                          </p>
                        </div>
                      )}

                      {selectedPool.type === 'carbon-offset' && (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                          <h5 className="text-green-400 font-semibold mb-1">Environmental Impact</h5>
                          <p className="text-sm text-green-300">
                            Your deposit will offset ~{(parseFloat(depositAmount) * 0.1).toFixed(1)} tons CO₂ annually
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Enter deposit amount to see projections</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-black/20 border-purple-800/50">
              <CardContent className="text-center py-12">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Pool</h3>
                <p className="text-gray-400">Choose a yield strategy from the Available Pools tab to get started</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FXRPYieldStrategies;
