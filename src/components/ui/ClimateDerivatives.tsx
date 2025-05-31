
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  AlertTriangle, 
  TrendingUp,
  Leaf,
  Shield
} from 'lucide-react';
import { WeatherService, WeatherData, ClimateRisk, WeatherDerivative } from '@/services/weatherService';
import { useToast } from '@/hooks/use-toast';

const ClimateDerivatives = () => {
  const { toast } = useToast();
  const [weatherService] = useState(() => new WeatherService());
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [climateRisk, setClimateRisk] = useState<ClimateRisk | null>(null);
  const [derivatives, setDerivatives] = useState<WeatherDerivative[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('New York');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [yieldMultiplier, setYieldMultiplier] = useState(1.0);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const data = await weatherService.getWeatherData(selectedLocation);
      const risk = weatherService.calculateClimateRisk(data);
      const derivativesData = weatherService.generateWeatherDerivatives(data);
      const multiplier = weatherService.calculateYieldMultiplier(data);

      setWeatherData(data);
      setClimateRisk(risk);
      setDerivatives(derivativesData);
      setYieldMultiplier(multiplier);

      toast({
        title: "Weather Data Updated",
        description: `Climate data fetched for ${data.location}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [selectedLocation]);

  const getRiskColor = (risk: ClimateRisk['riskLevel']) => {
    switch (risk) {
      case 'low': return 'text-green-400 border-green-500';
      case 'medium': return 'text-yellow-400 border-yellow-500';
      case 'high': return 'text-orange-400 border-orange-500';
      case 'extreme': return 'text-red-400 border-red-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const handlePurchaseDerivative = (derivative: WeatherDerivative) => {
    toast({
      title: "Derivative Purchased",
      description: `${derivative.type} protection for ${derivative.location} acquired`,
    });
  };

  if (!weatherData || !climateRisk) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Cloud className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <p className="text-white">Loading climate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 border-purple-800/50">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Leaf className="w-6 h-6 mr-3 text-green-400" />
            Climate-Based DeFi Hub
          </CardTitle>
          <CardDescription className="text-purple-300">
            Real-world weather data powering agricultural risk management and climate derivatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Enter city name"
                  className="bg-black/30 border-purple-500 text-white"
                />
                <Button 
                  onClick={fetchWeatherData} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Update
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apikey" className="text-white">OpenWeatherMap API Key (Optional)</Label>
              <Input
                id="apikey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key for real data"
                className="bg-black/30 border-purple-500 text-white"
                type="password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="overview">Climate Overview</TabsTrigger>
          <TabsTrigger value="derivatives">Weather Derivatives</TabsTrigger>
          <TabsTrigger value="farming">Climate Farming</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-black/20 border-blue-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Temperature</p>
                    <p className="text-2xl font-bold text-white">{weatherData.temperature.toFixed(1)}°C</p>
                  </div>
                  <Thermometer className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-blue-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Rainfall</p>
                    <p className="text-2xl font-bold text-white">{weatherData.rainfall.toFixed(1)}mm</p>
                  </div>
                  <Droplets className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-blue-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">Wind Speed</p>
                    <p className="text-2xl font-bold text-white">{weatherData.windSpeed.toFixed(1)} m/s</p>
                  </div>
                  <Wind className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-blue-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm">UV Index</p>
                    <p className="text-2xl font-bold text-white">{weatherData.uvIndex.toFixed(1)}</p>
                  </div>
                  <Sun className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Climate Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Risk Level</span>
                  <Badge variant="outline" className={getRiskColor(climateRisk.riskLevel)}>
                    {climateRisk.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Score</span>
                    <span className="text-white">{climateRisk.riskScore}/100</span>
                  </div>
                  <Progress value={climateRisk.riskScore} className="h-2" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Risk Factors:</p>
                  <div className="flex flex-wrap gap-2">
                    {climateRisk.factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="border-yellow-500 text-yellow-400">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/50">
                  <p className="text-blue-300 text-sm">{climateRisk.recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="derivatives" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {derivatives.map((derivative) => (
              <Card key={derivative.id} className="bg-black/20 border-purple-800/50">
                <CardHeader>
                  <CardTitle className="text-white capitalize">
                    {derivative.type} Protection
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    {derivative.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Strike Value</p>
                      <p className="text-white font-semibold">{derivative.strikeValue}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Current Value</p>
                      <p className="text-white font-semibold">{derivative.currentValue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Premium</p>
                      <p className="text-green-400 font-semibold">{(derivative.premium * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Potential Payout</p>
                      <p className="text-green-400 font-semibold">${derivative.payout}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Expires</p>
                    <p className="text-white text-sm">
                      {new Date(derivative.expiry).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    onClick={() => handlePurchaseDerivative(derivative)}
                  >
                    Purchase Protection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="farming" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Climate-Adjusted Yield Farming
              </CardTitle>
              <CardDescription className="text-purple-300">
                Yields automatically adjust based on climate risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-900/20 border-green-800/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold">Conservative Pool</h3>
                      <p className="text-2xl font-bold text-green-400 mt-2">
                        {(5.2 * yieldMultiplier).toFixed(1)}% APY
                      </p>
                      <p className="text-green-300 text-sm mt-1">
                        Climate multiplier: {yieldMultiplier.toFixed(1)}x
                      </p>
                      <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                        Stake Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-900/20 border-yellow-800/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold">Balanced Pool</h3>
                      <p className="text-2xl font-bold text-yellow-400 mt-2">
                        {(8.7 * yieldMultiplier).toFixed(1)}% APY
                      </p>
                      <p className="text-yellow-300 text-sm mt-1">
                        Climate multiplier: {yieldMultiplier.toFixed(1)}x
                      </p>
                      <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">
                        Stake Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-900/20 border-red-800/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <h3 className="text-white font-semibold">High Risk Pool</h3>
                      <p className="text-2xl font-bold text-red-400 mt-2">
                        {(15.3 * yieldMultiplier).toFixed(1)}% APY
                      </p>
                      <p className="text-red-300 text-sm mt-1">
                        Climate multiplier: {yieldMultiplier.toFixed(1)}x
                      </p>
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
                        Stake Tokens
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <h4 className="text-blue-300 font-semibold mb-2">How Climate Farming Works:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Yield rates automatically adjust based on real-time climate risk</li>
                  <li>• Higher risk periods offer increased rewards to compensate for volatility</li>
                  <li>• Farmers can hedge agricultural risks while earning DeFi yields</li>
                  <li>• Smart contracts automatically rebalance based on weather conditions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white">Risk Factors Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Temperature Risk</span>
                      <span className="text-white">
                        {weatherData.temperature > 35 || weatherData.temperature < -10 ? 'High' : 'Normal'}
                      </span>
                    </div>
                    <Progress 
                      value={weatherData.temperature > 35 || weatherData.temperature < -10 ? 80 : 20} 
                      className="h-2" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Precipitation Risk</span>
                      <span className="text-white">
                        {weatherData.rainfall > 5 ? 'High' : weatherData.rainfall === 0 ? 'Drought' : 'Normal'}
                      </span>
                    </div>
                    <Progress 
                      value={weatherData.rainfall > 5 ? 75 : weatherData.rainfall === 0 ? 60 : 25} 
                      className="h-2" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Wind Risk</span>
                      <span className="text-white">{weatherData.windSpeed > 15 ? 'High' : 'Normal'}</span>
                    </div>
                    <Progress 
                      value={weatherData.windSpeed > 15 ? 70 : 30} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {climateRisk.riskLevel === 'extreme' && (
                    <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
                      <p className="text-red-300 text-sm font-semibold">Extreme Risk Detected</p>
                      <p className="text-red-200 text-sm">Consider purchasing maximum weather derivatives</p>
                    </div>
                  )}
                  {climateRisk.riskLevel === 'high' && (
                    <div className="p-3 bg-orange-900/20 border border-orange-800/50 rounded-lg">
                      <p className="text-orange-300 text-sm font-semibold">High Risk Alert</p>
                      <p className="text-orange-200 text-sm">Increase collateral requirements and hedge positions</p>
                    </div>
                  )}
                  <div className="p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
                    <p className="text-green-300 text-sm font-semibold">Optimal Strategies</p>
                    <ul className="text-green-200 text-sm mt-1 space-y-1">
                      <li>• Consider temperature derivatives for {weatherData.location}</li>
                      <li>• Diversify across multiple climate zones</li>
                      <li>• Monitor seasonal patterns for better timing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClimateDerivatives;
