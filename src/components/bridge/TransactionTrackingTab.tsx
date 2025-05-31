
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  ArrowRight, 
  Clock,
  Activity,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { BridgeTransaction, LAYERZERO_CHAIN_IDS } from '@/services/layerZeroService';

interface TransactionTrackingTabProps {
  transactions: BridgeTransaction[];
  setSelectedTx: (tx: BridgeTransaction | null) => void;
}

const TransactionTrackingTab: React.FC<TransactionTrackingTabProps> = ({
  transactions,
  setSelectedTx
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'confirming':
        return <Activity className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-black/20 border-purple-800/50">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          Transaction Tracking
        </CardTitle>
        <CardDescription className="text-purple-300">
          Monitor your cross-chain transactions in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300">No bridge transactions yet</p>
            <p className="text-sm text-gray-500">Your cross-chain transfers will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div 
                key={tx.id}
                className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-800/30 rounded-lg cursor-pointer hover:border-blue-600/50 transition-all"
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getStatusIcon(tx.status)}
                    <span className="ml-2 font-semibold text-white">{tx.amount} {tx.asset}</span>
                  </div>
                  <Badge variant={tx.status === 'completed' ? 'default' : 'outline'}>
                    {tx.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <span>{LAYERZERO_CHAIN_IDS[tx.fromChain]?.logo} {LAYERZERO_CHAIN_IDS[tx.fromChain]?.name}</span>
                  <ArrowRight className="w-4 h-4 mx-2" />
                  <span>{LAYERZERO_CHAIN_IDS[tx.toChain]?.logo} {LAYERZERO_CHAIN_IDS[tx.toChain]?.name}</span>
                </div>
                {tx.status === 'confirming' && (
                  <Progress value={60} className="mt-2 h-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTrackingTab;
