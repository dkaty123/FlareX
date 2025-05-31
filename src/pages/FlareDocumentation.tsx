
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Zap, Database, Shuffle, Coins, TrendingUp, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlareDocumentation = () => {
  const navigate = useNavigate();

  const codeSnippets = {
    secureRandom: `pragma solidity >=0.8.0 <0.9.0;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {RandomNumberV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/RandomNumberV2Interface.sol";

contract SecureRandomConsumer {
    RandomNumberV2Interface internal randomV2;

    constructor() {
        randomV2 = ContractRegistry.getRandomNumberV2();
    }

    function getSecureRandomNumber()
        external
        view
        returns (uint256 randomNumber, bool isSecure, uint256 timestamp)
    {
        (randomNumber, isSecure, timestamp) = randomV2.getRandomNumber();
        require(isSecure, "Random number is not secure");
        return (randomNumber, isSecure, timestamp);
    }
}`,

    ftsoConsumer: `contract FtsoV2Consumer {
    bytes21 public constant flrUsdId = 
        0x01464c522f55534400000000000000000000000000;
    
    bytes21[] public feedIds = [
        bytes21(0x01464c522f55534400000000000000000000000000),
        bytes21(0x014254432f55534400000000000000000000000000),
        bytes21(0x014554482f55534400000000000000000000000000)
    ];

    function getFlrUsdPrice() external view returns (uint256, int8, uint64) {
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getTestFtsoV2();
        return ftsoV2.getFeedById(flrUsdId);
    }

    function getFtsoV2CurrentFeedValues()
        external
        view
        returns (
            uint256[] memory _feedValues,
            int8[] memory _decimals,
            uint64 _timestamp
        )
    {
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getTestFtsoV2();
        return ftsoV2.getFeedsByIds(feedIds);
    }
}`,

    typescript: `import { ethers } from 'ethers';

class FTSOService {
  private provider: ethers.Provider;
  private ftsoContract: ethers.Contract;

  constructor(provider: ethers.Provider) {
    this.provider = provider;
    this.ftsoContract = new ethers.Contract(
      FTSO_CONTRACT_ADDRESS,
      FTSO_ABI,
      provider
    );
  }

  async getPrices(symbols: string[]) {
    try {
      const feedIds = symbols.map(symbol => this.symbolToFeedId(symbol));
      const result = await this.ftsoContract.getFeedsByIds(feedIds);
      
      return result._feedValues.map((price: bigint, index: number) => ({
        symbol: symbols[index],
        price: Number(price) / Math.pow(10, result._decimals[index]),
        timestamp: Number(result._timestamp) * 1000
      }));
    } catch (error) {
      console.error('Error fetching FTSO prices:', error);
      throw error;
    }
  }
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-800/50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/app')}
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Protocols
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Flare Protocol Documentation</h1>
                  <p className="text-sm text-purple-300">Complete integration guide with code examples</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Documentation
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview Section */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-6 h-6 mr-2 text-orange-500" />
              Flare Network Protocol Overview
            </CardTitle>
            <CardDescription className="text-purple-300">
              Flare provides secure, decentralized data infrastructure for blockchain applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">FTSO (Flare Time Series Oracle)</h3>
                </div>
                <p className="text-sm text-gray-300">Decentralized price feeds for 100+ cryptocurrency pairs with sub-second updates</p>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Shuffle className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Secure Random Numbers</h3>
                </div>
                <p className="text-sm text-gray-300">Cryptographically secure random number generation every 90 seconds</p>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white">FAssets</h3>
                </div>
                <p className="text-sm text-gray-300">Trustless representation of non-smart contract tokens (BTC, XRP, etc.)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FTSO Section */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
              FTSO v2 Integration
            </CardTitle>
            <CardDescription className="text-purple-300">
              Access real-time price feeds with millisecond precision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>100+ crypto price pairs</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>Sub-second update frequency</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>Decentralized data aggregation</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>Historical data access</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>Deviation-based updates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Supported Assets</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['FLR/USD', 'BTC/USD', 'ETH/USD', 'XRP/USD', 'ADA/USD', 'DOT/USD', 'AVAX/USD', 'LTC/USD'].map(pair => (
                    <Badge key={pair} variant="outline" className="border-blue-500 text-blue-400 justify-center">
                      {pair}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="bg-purple-800/50" />

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Solidity Implementation</h3>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{codeSnippets.ftsoConsumer}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">TypeScript Integration</h3>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{codeSnippets.typescript}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secure Random Numbers Section */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shuffle className="w-6 h-6 mr-2 text-green-500" />
              Secure Random Number Generation
            </CardTitle>
            <CardDescription className="text-purple-300">
              Cryptographically secure randomness for blockchain applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Technical Specifications</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>90-second generation interval</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Cryptographically secure</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Non-manipulable by validators</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Verifiable randomness</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Historical access available</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Use Cases</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Gaming & NFTs</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Lotteries & Gambling</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Fair distribution mechanisms</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Sampling & selection</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Cryptographic applications</li>
                </ul>
              </div>
            </div>

            <Separator className="bg-purple-800/50" />

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Complete Contract Implementation</h3>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300">
                  <code>{codeSnippets.secureRandom}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAssets Section */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Coins className="w-6 h-6 mr-2 text-yellow-500" />
              FAssets Protocol
            </CardTitle>
            <CardDescription className="text-purple-300">
              Trustless tokenization of non-smart contract assets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Supported Assets</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 w-full justify-center py-2">
                    Bitcoin (FBTC)
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 w-full justify-center py-2">
                    XRP (FXRP)
                  </Badge>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400 w-full justify-center py-2">
                    Dogecoin (FDOGE)
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>Trustless 1:1 backing</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>Smart contract compatibility</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>Cross-chain interoperability</li>
                  <li className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>Collateral-backed security</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30">
              <h4 className="font-semibold text-yellow-400 mb-2">How FAssets Work</h4>
              <p className="text-sm text-gray-300">
                FAssets are minted by depositing the underlying asset (e.g., BTC) with a network of agents who provide collateral. 
                The minting process is secured by the FTSO price feeds and can be redeemed 1:1 for the underlying asset at any time.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlareDocumentation;
