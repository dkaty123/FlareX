import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Globe, BarChart3, Trophy, DollarSign, Vault, Gamepad2, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NetworkStatus from '@/components/NetworkStatus';
import WalletConnect from '@/components/WalletConnect';
import CollateralHealthAlert from '@/components/CollateralHealthAlert';
import VoiceAssistant from '@/components/VoiceAssistant';
import YieldAggregator from '@/components/YieldAggregator';
import FXRPYieldStrategies from '@/components/FXRPYieldStrategies';
import RNGMiniGames from '@/components/RNGMiniGames';
import RealWorldDataRewards from '@/components/RealWorldDataRewards';
import YieldScoringReputation from '@/components/YieldScoringReputation';
import FDCDataOracle from '@/components/FDCDataOracle';
import MultiAssetYieldVault from '@/components/MultiAssetYieldVault';
import { useWallet } from '@/hooks/useWallet';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingCard from '@/components/ui/loading-card';

const RealWorldApps = () => {
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="border-b border-purple-800/50 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">FlareX - Real-World Apps</h1>
                  <p className="text-sm text-purple-300">DeFi applications powered by Flare's enshrined data protocols</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/app')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                >
                  Core Protocols
                </Button>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  {isConnected ? 'Live Applications' : 'Demo Mode'}
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

          <Tabs defaultValue="yield" className="mt-8">
            <TabsList className="grid w-full grid-cols-7 bg-black/20 border border-purple-800/50 text-xs h-12">
              <TabsTrigger value="yield" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                Yield
              </TabsTrigger>
              <TabsTrigger value="vault" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Vault className="w-3 h-3" />
                Vault
              </TabsTrigger>
              <TabsTrigger value="fxrp-strategies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                FXRP
              </TabsTrigger>
              <TabsTrigger value="rng-games" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                RNG
              </TabsTrigger>
              <TabsTrigger value="earth-data" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Earth
              </TabsTrigger>
              <TabsTrigger value="fdc-oracle" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Database className="w-3 h-3" />
                FDC
              </TabsTrigger>
              <TabsTrigger value="scoring" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                Score
              </TabsTrigger>
            </TabsList>

            <TabsContent value="yield" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <YieldAggregator />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="vault" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <MultiAssetYieldVault />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="fxrp-strategies" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <FXRPYieldStrategies />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="rng-games" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <RNGMiniGames />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="earth-data" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <RealWorldDataRewards />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="fdc-oracle" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <FDCDataOracle />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="scoring" className="mt-8">
              <ErrorBoundary fallback={<LoadingCard contentLines={4} />}>
                <YieldScoringReputation />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default RealWorldApps;
