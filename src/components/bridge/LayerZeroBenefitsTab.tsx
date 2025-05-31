
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, DollarSign, Globe } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface LayerZeroBenefitsTabProps {
  ultraLightNodeBenefits: Benefit[];
}

const LayerZeroBenefitsTab: React.FC<LayerZeroBenefitsTabProps> = ({ ultraLightNodeBenefits }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ultraLightNodeBenefits.map((benefit, index) => (
          <Card key={index} className="bg-black/40 border-purple-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="text-2xl mr-3">{benefit.icon}</span>
                {benefit.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black/40 border-purple-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-6 h-6 mr-3 text-blue-400" />
            Why LayerZero Ultra Light Nodes?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-black/30 rounded-lg border border-blue-800/30">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Trustless Security</h4>
              <p className="text-sm text-gray-300">No trusted validators or multisigs. Every message is cryptographically verified.</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg border border-green-800/30">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Ultra Low Cost</h4>
              <p className="text-sm text-gray-300">Only store block headers, not full blocks. Dramatically reduces gas costs.</p>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-lg border border-purple-800/30">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">True Omnichain</h4>
              <p className="text-sm text-gray-300">Connect to 50+ blockchains with a single integration. Build once, deploy everywhere.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayerZeroBenefitsTab;
