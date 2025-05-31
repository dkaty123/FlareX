
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

interface Chain {
  id: number;
  name: string;
  logo: string;
}

interface SupportedChainsProps {
  supportedChains: Chain[];
}

const SupportedChains: React.FC<SupportedChainsProps> = ({ supportedChains }) => {
  return (
    <Card className="bg-black/20 border-purple-800/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Network className="w-5 h-5 mr-2 text-green-400" />
          Supported Chains
        </CardTitle>
        <CardDescription className="text-purple-300">
          LayerZero enables omnichain connectivity across all major blockchains
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {supportedChains.map(chain => (
            <div 
              key={chain.id}
              className="flex items-center p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-800/30 rounded-lg"
            >
              <span className="text-2xl mr-3">{chain.logo}</span>
              <div>
                <h4 className="font-semibold text-white text-sm">{chain.name}</h4>
                <p className="text-xs text-purple-300">Chain ID: {chain.id}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedChains;
