
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Zap, Globe, ArrowUpRight, Coins, Dice1, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PriceFeedChart from '@/components/PriceFeedChart';
import FAssetsTrading from '@/components/FAssetsTrading';
import SecureRandomNumber from '@/components/SecureRandomNumber';
import NetworkStatus from '@/components/NetworkStatus';
import WalletConnect from '@/components/WalletConnect';
import CollateralHealthAlert from '@/components/CollateralHealthAlert';
import VoiceAssistant from '@/components/VoiceAssistant';
import { useWallet } from '@/hooks/useWallet';
import { FTSOService } from '@/services/ftsoService';
import ErrorBoundary from '@/components/ErrorBoundary';
import PriceFeedSkeleton from '@/components/PriceFeedSkeleton';
import LoadingCard from '@/components/ui/loading-card';

const FlareProtocols = () => {
  const { provider, isConnected } = useWallet();
  const navigate = useNavigate();
  const [priceFeeds, setPriceFeeds] = useState([
    { symbol: 'FLR/USD', price: 0.0234, change: 5.67, volume: '240', lastUpdated: Date.now() },
    { symbol: 'ETH/USD', price: 2456.78, change: -2.34, volume: '456', lastUpdated: Date.now() },
    { symbol: 'BTC/USD', price: 43521.90, change: 1.23, volume: '892', lastUpdated: Date.now() },
    { symbol: 'XRP/USD', price: 0.6234, change: 3.45, volume: '128', lastUpdated: Date.now() },
    { symbol: 'ADA/USD', price: 0.4567, change: -1.23, volume: '89', lastUpdated: Date.now() },
    { symbol: 'DOT/USD', price: 7.234, change: 2.67, volume: '154', lastUpdated: Date.now() }
  ]);

  const [selectedFeed, setSelectedFeed] = useState(priceFeeds[0]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Fetch real price data when wallet is connected
  useEffect(() => {
    if (provider && isConnected) {
      const ftsoService = new FTSOService(provider);
      
      const fetchRealPrices = async () => {
        try {
          setIsLoadingPrices(true);
          setPriceError(null);
          const symbols = priceFeeds.map(feed => feed.symbol);
          const realPrices = await ftsoService.getPrices(symbols);
          
          setPriceFeeds(prev => prev.map(feed => {
            const realPrice = realPrices.find(p => p.symbol === feed.symbol);
            if (realPrice) {
              const change = ((realPrice.price - feed.price) / feed.price) * 100;
              return {
                ...feed,
                price: realPrice.price,
                change: change,
                lastUpdated: realPrice.timestamp
              };
            }
            return feed;
          }));
          
          console.log('Updated with real FTSOv2 prices:', realPrices);
        } catch (error) {
          console.error('Error fetching real prices:', error);
          setPriceError('Failed to fetch live prices. Showing demo data.');
        } finally {
          setIsLoadingPrices(false);
        }
      };

      fetchRealPrices();
      const interval = setInterval(fetchRealPrices, 30000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setPriceFeeds(prev => prev.map(feed => ({
          ...feed,
          price: feed.price * (1 + (Math.random() - 0.5) * 0.02),
          change: feed.change + (Math.random() - 0.5) * 0.5,
          lastUpdated: Date.now()
        })));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [provider, isConnected]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="border-b border-purple-800/50 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">FlareX - Core Protocols</h1>
                  <p className="text-sm text-purple-300">FTSO, FAssets & Secure Random Number Generator</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/app/documentation')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
                <Button
                  onClick={() => navigate('/app/real-world')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                >
                  Real-World Apps
                </Button>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  {isConnected ? 'Live Protocols' : 'Demo Mode'}
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Wallet Connection */}
          <div className="mb-8">
            <ErrorBoundary fallback={<LoadingCard contentLines={2} />}>
              <WalletConnect />
            </ErrorBoundary>
          </div>

          {/* Network Status */}
          <ErrorBoundary fallback={<LoadingCard contentLines={1} />}>
            <NetworkStatus />
          </ErrorBoundary>

          {/* Voice Assistant */}
          <div className="mt-8 mb-8">
            <ErrorBoundary fallback={<LoadingCard contentLines={3} />}>
              <VoiceAssistant />
            </ErrorBoundary>
          </div>

          {/* Collateral Health Alert */}
          {isConnected && (
            <div className="mt-8 mb-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={2} />}>
                <CollateralHealthAlert />
              </ErrorBoundary>
            </div>
          )}

          <Tabs defaultValue="feeds" className="mt-8">
            <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-purple-800/50">
              <TabsTrigger value="feeds" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                FTSO Oracles
              </TabsTrigger>
              <TabsTrigger value="fassets" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                FAssets
              </TabsTrigger>
              <TabsTrigger value="random" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                Secure RNG
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feeds" className="space-y-6 mt-8">
              <ErrorBoundary fallback={<PriceFeedSkeleton />}>
                {isLoadingPrices && !priceFeeds.length ? (
                  <PriceFeedSkeleton />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Price Feeds List */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">Live Price Feeds</h3>
                        {isConnected && (
                          <Badge variant="outline" className="border-orange-500 text-orange-400">
                            <Zap className="w-3 h-3 mr-1" />
                            FTSOv2
                          </Badge>
                        )}
                      </div>
                      {priceError && (
                        <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-md">
                          <p className="text-yellow-400 text-sm">{priceError}</p>
                        </div>
                      )}
                      {priceFeeds.map((feed, index) => (
                        <Card 
                          key={feed.symbol} 
                          className={`bg-black/20 border-purple-800/50 hover:border-purple-600/70 transition-all cursor-pointer ${selectedFeed.symbol === feed.symbol ? 'border-orange-500' : ''}`}
                          onClick={() => setSelectedFeed(feed)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-white">{feed.symbol}</h4>
                                <p className="text-2xl font-bold text-white">${feed.price.toFixed(4)}</p>
                                <p className="text-sm text-gray-400">Vol: {feed.volume}</p>
                              </div>
                              <div className="text-right">
                                <div className={`flex items-center ${feed.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {feed.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                  {Math.abs(feed.change).toFixed(2)}%
                                </div>
                                <Badge variant="outline" className="mt-2 border-purple-500 text-purple-300">
                                  {isConnected ? 'Live' : 'Demo'}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="lg:col-span-2">
                      <ErrorBoundary fallback={<LoadingCard headerHeight="h-8" contentLines={1} className="h-96" />}>
                        <PriceFeedChart selectedFeed={selectedFeed} />
                      </ErrorBoundary>
                    </div>
                  </div>
                )}
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="fassets" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <FAssetsTrading />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="random" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={3} />}>
                <SecureRandomNumber />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black/20 border-purple-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-300">Total Volume (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$128</div>
                    <div className="flex items-center text-green-400 text-sm">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      +15.3%
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-purple-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-300">Active Feeds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="flex items-center text-green-400 text-sm">
                      <Activity className="w-4 h-4 mr-1" />
                      All Online
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-purple-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-300">FAssets Minted</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">284</div>
                    <div className="flex items-center text-green-400 text-sm">
                      <Coins className="w-4 h-4 mr-1" />
                      +8.7%
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-purple-800/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-300">Network Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-400">99.8%</div>
                    <Progress value={99.8} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FlareProtocols;
