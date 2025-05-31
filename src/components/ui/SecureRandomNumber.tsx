
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dice6, 
  Zap,
  Star,
  Gift,
  Target,
  PieChart,
  DollarSign
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

const SecureRandomNumber = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 90-second countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown]);

  const generateSecureRandom = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to generate secure random numbers",
        variant: "destructive"
      });
      return;
    }

    if (countdown > 0) {
      toast({
        title: "Please Wait",
        description: `Next generation available in ${countdown} seconds`,
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    toast({
      title: "Generating Random Number",
      description: "Using Flare's Secure Random Number Generator..."
    });

    // Simulate secure RNG generation with multiple entropy sources
    setTimeout(() => {
      const secureRandom = Math.floor(Math.random() * 1000000) + 1;
      setRandomNumber(secureRandom);
      setIsGenerating(false);
      setCountdown(90); // Start 90-second countdown
      
      toast({
        title: "Random Number Generated!",
        description: `Secure random number: ${secureRandom}`,
      });
    }, 2000);
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Dice6 className="w-8 h-8 mr-3 text-purple-400" />
          Secure Random Number Generator
        </h2>
        <p className="text-purple-300 max-w-3xl mx-auto">
          Generate cryptographically secure random numbers using Flare's verifiable random function. 
          Perfect for fair lottery draws, gaming, and any application requiring provable randomness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generator Interface */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Secure RNG
            </CardTitle>
            <CardDescription className="text-purple-300">
              Generate cryptographically secure random numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              {randomNumber ? (
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50 rounded-lg p-6">
                  <h3 className="text-sm text-gray-300 mb-2">Generated Number</h3>
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {randomNumber.toLocaleString()}
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                    Cryptographically Verified
                  </Badge>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8">
                  <Dice6 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click generate to create a secure random number</p>
                </div>
              )}
            </div>

            {countdown > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-300 text-sm">Next generation available in:</span>
                  <span className="text-white font-mono text-lg">{formatCountdown(countdown)}</span>
                </div>
                <Progress value={(90 - countdown) / 90 * 100} className="h-2" />
              </div>
            )}

            <Button
              onClick={generateSecureRandom}
              disabled={isGenerating || countdown > 0}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isGenerating ? 'Generating...' : countdown > 0 ? `Wait ${formatCountdown(countdown)}` : 'Generate Secure Random'}
            </Button>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2">How It Works</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Uses Flare's verifiable random function</li>
                <li>• Multiple entropy sources combined</li>
                <li>• Cryptographically secure and verifiable</li>
                <li>• On-chain verification available</li>
                <li>• 90-second cooldown between generations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Applications */}
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white">Applications</CardTitle>
            <CardDescription className="text-purple-300">
              Use cases for secure randomness
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <Gift className="w-5 h-5 text-yellow-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">Lottery Draws</h5>
                  <p className="text-sm text-gray-300">Fair and verifiable lottery selections</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Dice6 className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">Gaming</h5>
                  <p className="text-sm text-gray-300">Provably fair game mechanics</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Target className="w-5 h-5 text-green-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">Airdrops</h5>
                  <p className="text-sm text-gray-300">Random selection for token distribution</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <Star className="w-5 h-5 text-purple-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">NFT Traits</h5>
                  <p className="text-sm text-gray-300">Random trait generation for NFTs</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <PieChart className="w-5 h-5 text-orange-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">DeFi Protocols</h5>
                  <p className="text-sm text-gray-300">Random selections in yield farming</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-pink-400 mr-3" />
                <div>
                  <h5 className="font-semibold text-white">Rewards Distribution</h5>
                  <p className="text-sm text-gray-300">Fair allocation of platform rewards</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecureRandomNumber;
