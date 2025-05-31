
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Zap } from 'lucide-react';

interface Chain {
  id: number;
  name: string;
  logo: string;
}

interface PriceFeed {
  symbol: string;
  price: number;
  timestamp: number;
}

interface OracleBridgeTabProps {
  priceFeeds: PriceFeed[];
  toChain: string;
  setToChain: (value: string) => void;
  destinationAddress: string;
  setDestinationAddress: (value: string) => void;
  isLoading: boolean;
  isConnected: boolean;
  supportedChains: Chain[];
  handleBridgePriceFeeds: () => void;
}

const OracleBridgeTab: React.FC<OracleBridgeTabProps> = ({
  priceFeeds,
  toChain,
  setToChain,
  destinationAddress,
  setDestinationAddress,
  isLoading,
  isConnected,
  supportedChains,
  handleBridgePriceFeeds
}) => {
  return (
    <Card className="bg-black/20 border-purple-800/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-orange-400" />
          FTSO Price Feed Bridge
        </CardTitle>
        <CardDescription className="text-purple-300">
          Send Flare's high-quality FTSO price data to any blockchain via LayerZero
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Feeds to Send */}
          <div>
            <h4 className="font-semibold text-white mb-4">Available FTSO Price Feeds</h4>
            <div className="space-y-3">
              {priceFeeds.map((feed, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div>
                    <h5 className="font-semibold text-white">{feed.symbol}</h5>
                    <p className="text-sm text-gray-400">Updated: {new Date(feed.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-300">${feed.price.toFixed(6)}</p>
                    <Badge variant="outline" className="border-orange-500 text-orange-400">
                      <Zap className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bridge Configuration */}
          <div>
            <h4 className="font-semibold text-white mb-4">Bridge Configuration</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-purple-200 mb-2 block font-medium">Destination Chain</label>
                <Select value={toChain} onValueChange={setToChain}>
                  <SelectTrigger className="bg-black/40 border-orange-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-orange-800/50 z-50">
                    {supportedChains.filter(chain => chain.id.toString() !== '14').map(chain => (
                      <SelectItem key={chain.id} value={chain.id.toString()} className="text-white hover:bg-orange-800/50 focus:bg-orange-800/50">
                        {chain.logo} {chain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-purple-200 mb-2 block font-medium">Oracle Contract Address (Optional)</label>
                <Input
                  placeholder="0x... (auto-generated if empty)"
                  value={destinationAddress}
                  onChange={(e) => setDestinationAddress(e.target.value)}
                  className="bg-black/40 border-orange-800/50 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4">
                <h5 className="font-semibold text-orange-300 mb-2">Bridge Benefits</h5>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Real-time FTSO price data on any chain</li>
                  <li>• Decentralized oracle infrastructure</li>
                  <li>• Cost-effective cross-chain data</li>
                  <li>• High-frequency updates (every 90s)</li>
                </ul>
              </div>

              <Button 
                onClick={handleBridgePriceFeeds}
                disabled={isLoading || !isConnected}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isLoading ? 'Sending Price Feeds...' : 'Bridge FTSO Data'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OracleBridgeTab;
