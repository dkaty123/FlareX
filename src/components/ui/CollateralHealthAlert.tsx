import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown,
  Zap,
  Bell,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CollateralAlert {
  id: string;
  asset: string;
  currentRatio: number;
  liquidationRatio: number;
  warningRatio: number;
  severity: 'safe' | 'warning' | 'danger' | 'critical';
  timeToLiquidation?: string;
  suggestedAction: string;
}

interface HealthMetrics {
  totalCollateral: number;
  totalDebt: number;
  healthFactor: number;
  liquidationPrice: number;
  safetyBuffer: number;
}

const CollateralHealthAlert = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<CollateralAlert[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useEffect(() => {
    // Simulate real-time collateral monitoring
    if (isMonitoring) {
      const interval = setInterval(() => {
        updateCollateralData();
      }, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const updateCollateralData = () => {
    // Simulate dynamic collateral ratios with some volatility - smaller amounts
    const mockAlerts: CollateralAlert[] = [
      {
        id: 'fxrp-1',
        asset: 'FXRP',
        currentRatio: 245 + Math.random() * 30 - 15, // 230-260%
        liquidationRatio: 120,
        warningRatio: 140,
        severity: 'safe',
        suggestedAction: 'Monitor price movements'
      },
      {
        id: 'fbtc-1',
        asset: 'FBTC',
        currentRatio: 235 + Math.random() * 20 - 10, // 225-245%
        liquidationRatio: 110,
        warningRatio: 130,
        severity: 'safe',
        suggestedAction: 'Position is healthy'
      },
      {
        id: 'fltc-1',
        asset: 'FLTC',
        currentRatio: 215 + Math.random() * 15 - 7, // 208-223%
        liquidationRatio: 105,
        warningRatio: 125,
        severity: 'safe',
        suggestedAction: 'Good collateral buffer'
      }
    ];

    // Update severity based on current ratios
    const updatedAlerts = mockAlerts.map(alert => {
      let severity: 'safe' | 'warning' | 'danger' | 'critical';
      
      if (alert.currentRatio <= alert.liquidationRatio + 5) {
        severity = 'critical';
      } else if (alert.currentRatio <= alert.liquidationRatio + 15) {
        severity = 'danger';
      } else if (alert.currentRatio <= alert.warningRatio) {
        severity = 'warning';
      } else {
        severity = 'safe';
      }

      return { ...alert, severity };
    });

    setAlerts(updatedAlerts);

    // Update health metrics - much smaller realistic amounts
    const totalCollateral = 450 + Math.random() * 100 - 50; // $400-500
    const totalDebt = 0; // No debt as requested
    const healthFactor = totalCollateral > 0 ? 999 : 0; // Very high since no debt
    
    setHealthMetrics({
      totalCollateral,
      totalDebt,
      healthFactor,
      liquidationPrice: 0, // No liquidation risk with no debt
      safetyBuffer: 100 // 100% safe with no debt
    });

    // Trigger alerts for critical situations
    const criticalAlerts = updatedAlerts.filter(alert => 
      alert.severity === 'critical' || alert.severity === 'danger'
    );

    if (criticalAlerts.length > 0 && alertsEnabled) {
      criticalAlerts.forEach(alert => {
        if (alert.severity === 'critical') {
          toast({
            title: "🚨 CRITICAL: Liquidation Risk!",
            description: `${alert.asset} collateral ratio at ${alert.currentRatio.toFixed(1)}%. Immediate action required!`,
            variant: "destructive",
          });
        } else if (alert.severity === 'danger') {
          toast({
            title: "⚠️ WARNING: Low Collateral",
            description: `${alert.asset} collateral ratio at ${alert.currentRatio.toFixed(1)}%. Add collateral soon.`,
          });
        }
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe': return 'text-green-400 border-green-500 bg-green-500/10';
      case 'warning': return 'text-yellow-400 border-yellow-500 bg-yellow-500/10';
      case 'danger': return 'text-orange-400 border-orange-500 bg-orange-500/10';
      case 'critical': return 'text-red-400 border-red-500 bg-red-500/10';
      default: return 'text-gray-400 border-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'danger': return <TrendingDown className="w-5 h-5 text-orange-400" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2) return 'text-green-400';
    if (factor >= 1.5) return 'text-yellow-400';
    if (factor >= 1.2) return 'text-orange-400';
    return 'text-red-400';
  };

  // Initialize with mock data
  useEffect(() => {
    updateCollateralData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Shield className="w-6 h-6 mr-2 text-blue-400" />
            Collateral Health Monitor
          </h3>
          <p className="text-purple-300">Real-time monitoring and liquidation protection</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            variant={alertsEnabled ? "default" : "outline"}
            size="sm"
            className={alertsEnabled ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Bell className="w-4 h-4 mr-2" />
            {alertsEnabled ? 'Alerts ON' : 'Alerts OFF'}
          </Button>
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            variant={isMonitoring ? "default" : "outline"}
            size="sm"
            className={isMonitoring ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isMonitoring ? 'Live' : 'Paused'}
          </Button>
        </div>
      </div>

      {/* Overall Health Metrics */}
      {healthMetrics && (
        <Card className="bg-black/20 border-purple-800/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Portfolio Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-sm text-gray-400 mb-1">Health Factor</h4>
                <p className={`text-2xl font-bold ${getHealthFactorColor(healthMetrics.healthFactor)}`}>
                  {healthMetrics.healthFactor === 999 ? '∞' : healthMetrics.healthFactor.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {healthMetrics.healthFactor >= 1.5 ? 'Healthy' : 'At Risk'}
                </p>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-sm text-gray-400 mb-1">Total Collateral</h4>
                <p className="text-2xl font-bold text-white">
                  ${healthMetrics.totalCollateral.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="text-sm text-gray-400 mb-1">Total Debt</h4>
                <p className="text-2xl font-bold text-white">
                  ${healthMetrics.totalDebt.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-sm text-gray-400 mb-1">Safety Buffer</h4>
                <p className={`text-2xl font-bold ${healthMetrics.safetyBuffer > 20 ? 'text-green-400' : 'text-orange-400'}`}>
                  {healthMetrics.safetyBuffer.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Asset Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.map((alert) => (
          <Card 
            key={alert.id}
            className={`border transition-all ${getSeverityColor(alert.severity)}`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  {getSeverityIcon(alert.severity)}
                  <span className="ml-2">{alert.asset}</span>
                </CardTitle>
                <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Collateral Ratio</span>
                  <span className="text-white font-semibold">{alert.currentRatio.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={Math.min(alert.currentRatio, 300)} 
                  className="h-3"
                  style={{
                    background: alert.currentRatio <= alert.liquidationRatio + 10 
                      ? 'linear-gradient(to right, #ef4444, #f97316)' 
                      : 'linear-gradient(to right, #10b981, #3b82f6)'
                  }}
                />
                <div className="flex justify-between text-xs mt-1 text-gray-400">
                  <span>Liquidation: {alert.liquidationRatio}%</span>
                  <span>Warning: {alert.warningRatio}%</span>
                </div>
              </div>

              {alert.timeToLiquidation && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                  <div className="flex items-center text-red-300">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Time to liquidation: {alert.timeToLiquidation}</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3">
                <h5 className="text-sm font-semibold text-white mb-1">Suggested Action:</h5>
                <p className="text-sm text-gray-300">{alert.suggestedAction}</p>
              </div>

              {alert.severity === 'critical' || alert.severity === 'danger' ? (
                <Button 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  onClick={() => toast({
                    title: "Quick Action",
                    description: `Redirecting to add collateral for ${alert.asset}...`,
                  })}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Add Collateral Now
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/20"
                  onClick={() => toast({
                    title: "Position Details",
                    description: `Viewing detailed metrics for ${alert.asset}...`,
                  })}
                >
                  View Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-black/20 border-purple-800/50">
        <CardHeader>
          <CardTitle className="text-white">Risk Management Tips</CardTitle>
          <CardDescription className="text-purple-300">
            Best practices for maintaining healthy collateral ratios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-semibold text-blue-400">📊 Monitor Regularly</h5>
              <p className="text-gray-300">Check collateral ratios daily, especially during volatile market conditions.</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-green-400">⚡ Set Alerts</h5>
              <p className="text-gray-300">Enable notifications to get warned before liquidation thresholds.</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-purple-400">🛡️ Maintain Buffer</h5>
              <p className="text-gray-300">Keep collateral ratios well above minimum requirements (200%+ recommended).</p>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-orange-400">🔄 Diversify Risk</h5>
              <p className="text-gray-300">Spread collateral across multiple assets to reduce concentration risk.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollateralHealthAlert;
