
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Globe, Shield, Activity } from 'lucide-react';

const NetworkStatus = () => {
  const networks = [
    { name: 'Flare Network', status: 'online', latency: '45ms', icon: Zap, color: 'text-orange-400' },
    { name: 'LayerZero', status: 'online', latency: '120ms', icon: Globe, color: 'text-blue-400' },
    { name: 'FTSOv2 Oracle', status: 'online', latency: '23ms', icon: Shield, color: 'text-green-400' },
    { name: 'Cross-Chain Bridge', status: 'online', latency: '89ms', icon: Activity, color: 'text-purple-400' }
  ];

  return (
    <Card className="bg-black/20 border-purple-800/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Network Status</h3>
          <Badge variant="outline" className="border-green-500 text-green-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            All Systems Operational
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {networks.map((network, index) => {
            const IconComponent = network.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 bg-black/40 rounded-lg overflow-hidden">
                <IconComponent className={`w-5 h-5 ${network.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{network.name}</p>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Badge 
                      variant="outline" 
                      className="text-xs border-green-500 text-green-400 px-2 py-0 flex-shrink-0"
                    >
                      {network.status}
                    </Badge>
                    <span className="text-xs text-gray-400 flex-shrink-0">{network.latency}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
