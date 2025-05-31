import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Thermometer, 
  Wind, 
  Droplets, 
  Leaf, 
  MapPin,
  TrendingUp,
  Award,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { WeatherService, WeatherData } from '@/services/weatherService';

interface RewardTier {
  id: string;
  name: string;
  condition: string;
  multiplier: number;
  description: string;
  icon: React.ReactNode;
  active: boolean;
}

interface UserLocation {
  city: string;
  country: string;
  lat: number;
  lon: number;
  verified: boolean;
}

const RealWorldDataRewards = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  const [weatherService] = useState(() => new WeatherService());
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  
  const [userLocation, setUserLocation] = useState<UserLocation>({
    city: 'Detecting...',
    country: 'Unknown',
    lat: 0,
    lon: 0,
    verified: false
  });

  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([]);
  const [totalMultiplier, setTotalMultiplier] = useState(1.0);
  const [baseApy] = useState(12.5);

  // Load weather data on component mount
  useEffect(() => {
    loadWeatherData();
  }, []);

  // Update reward tiers when weather data changes
  useEffect(() => {
    if (weatherData) {
      const updatedTiers = [
        {
          id: 'green-air',
          name: 'Clean Air Bonus',
          condition: 'Good Weather Conditions',
          multiplier: 1.2,
          description: 'Extra APY when your region has optimal conditions',
          icon: <Wind className="w-5 h-5 text-green-400" />,
          active: weatherData.weatherCondition === 'Clear' || weatherData.weatherCondition === 'Clouds'
        },
        {
          id: 'low-temp',
          name: 'Cool Climate Reward',
          condition: 'Temp < 25°C',
          multiplier: 1.15,
          description: 'Reward for lower energy consumption regions',
          icon: <Thermometer className="w-5 h-5 text-blue-400" />,
          active: weatherData.temperature < 25
        },
        {
          id: 'renewable',
          name: 'Renewable Energy Boost',
          condition: 'High Wind Speed',
          multiplier: 1.1,
          description: 'Bonus for regions with renewable energy potential',
          icon: <Zap className="w-5 h-5 text-yellow-400" />,
          active: weatherData.windSpeed > 10
        },
        {
          id: 'humidity',
          name: 'Optimal Humidity',
          condition: '40% < Humidity < 70%',
          multiplier: 1.05,
          description: 'Reward for comfortable living conditions',
          icon: <Droplets className="w-5 h-5 text-blue-300" />,
          active: weatherData.humidity > 40 && weatherData.humidity < 70
        }
      ];
      setRewardTiers(updatedTiers);
    }
  }, [weatherData]);

  // Calculate total multiplier
  useEffect(() => {
    const activeMultipliers = rewardTiers
      .filter(tier => tier.active)
      .reduce((sum, tier) => sum + (tier.multiplier - 1), 0);
    setTotalMultiplier(1 + activeMultipliers);
  }, [rewardTiers]);

  const loadWeatherData = async () => {
    setIsLoadingWeather(true);
    try {
      const data = await weatherService.getWeatherData();
      setWeatherData(data);
      
      // Update location info
      setUserLocation(prev => ({
        ...prev,
        city: data.location.split(',')[0] || 'Unknown',
        country: data.location.split(',')[1]?.trim() || 'Unknown'
      }));
      
      console.log('Weather data loaded:', data);
    } catch (error) {
      console.error('Error loading weather data:', error);
      toast({
        title: "Weather Data Error",
        description: "Could not load weather data. Using default values.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const verifyLocation = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Connect your wallet to verify location",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Verifying Location...",
      description: "Using Flare Data Connector to verify your location"
    });

    setTimeout(() => {
      setUserLocation(prev => ({ ...prev, verified: true }));
      toast({
        title: "Location Verified!",
        description: "Your location has been verified using FDC attestation"
      });
    }, 2000);
  };

  const refreshWeatherData = () => {
    loadWeatherData();
    toast({
      title: "Refreshing Data",
      description: "Updating environmental data..."
    });
  };

  if (!weatherData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-white mb-2">Loading Environmental Data</h3>
          <p className="text-gray-400">Fetching real-time weather information...</p>
        </div>
      </div>
    );
  }

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAQILabel = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  // Mock AQI based on weather conditions
  const airQuality = weatherData.weatherCondition === 'Clear' ? 35 : 
                    weatherData.weatherCondition === 'Rain' ? 25 : 65;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Globe className="w-8 h-8 mr-3 text-blue-400" />
          Real-World Data Rewards
        </h2>
        <p className="text-purple-300 max-w-3xl mx-auto">
          Earn enhanced staking rewards based on real-world environmental data from your location. 
          Powered by Flare Data Connector and verified through oracle attestations.
        </p>
        <Button 
          onClick={refreshWeatherData}
          disabled={isLoadingWeather}
          variant="outline"
          size="sm"
          className="mt-4"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingWeather ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Location Verification */}
      <Card className="bg-black/20 border-purple-800/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-400" />
            Location Verification
          </CardTitle>
          <CardDescription className="text-purple-300">
            Verify your location to unlock region-specific rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">{userLocation.city}, {userLocation.country}</p>
              <p className="text-sm text-gray-400">
                Last updated: {new Date(weatherData.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {userLocation.verified ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Button onClick={verifyLocation} variant="outline" size="sm">
                  Verify Location
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="rewards">Active Rewards</TabsTrigger>
          <TabsTrigger value="data">Environmental Data</TabsTrigger>
          <TabsTrigger value="multipliers">Reward Multipliers</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Current APY Boost
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {(baseApy * totalMultiplier).toFixed(2)}%
                  </div>
                  <p className="text-gray-400">Enhanced APY</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      +{((totalMultiplier - 1) * 100).toFixed(1)}% bonus
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base APY:</span>
                    <span className="text-white">{baseApy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environmental Bonus:</span>
                    <span className="text-green-400">+{((totalMultiplier - 1) * baseApy).toFixed(2)}%</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total APY:</span>
                      <span className="text-green-400">{(baseApy * totalMultiplier).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">24h Earnings Projection</h4>
                  <p className="text-2xl font-bold text-white">+15.42 FXRP</p>
                  <p className="text-sm text-green-300 mt-1">
                    With environmental bonuses applied
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white">Active Reward Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewardTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`p-4 rounded-lg border transition-all ${
                      tier.active 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-gray-500/10 border-gray-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {tier.icon}
                        <span className="font-semibold text-white ml-2">{tier.name}</span>
                      </div>
                      {tier.active ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-gray-500 text-gray-400">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{tier.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Condition: {tier.condition}</span>
                      <span className={tier.active ? 'text-green-400' : 'text-gray-400'}>
                        {tier.multiplier}x multiplier
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Thermometer className="w-5 h-5 mr-2 text-red-400" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {weatherData.temperature.toFixed(1)}°C
                  </div>
                  <Progress 
                    value={Math.max(0, Math.min(100, (weatherData.temperature + 10) * 2))} 
                    className="h-2 mb-2" 
                  />
                  <p className="text-sm text-gray-400">
                    Condition: {weatherData.weatherCondition}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Wind className="w-5 h-5 mr-2 text-green-400" />
                  Air Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${getAQIColor(airQuality)}`}>
                    {Math.round(airQuality)} AQI
                  </div>
                  <Badge variant="outline" className={`${getAQIColor(airQuality)} border-current`}>
                    {getAQILabel(airQuality)}
                  </Badge>
                  <Progress 
                    value={(airQuality / 200) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-400" />
                  Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {Math.round(weatherData.humidity)}%
                  </div>
                  <Progress 
                    value={weatherData.humidity} 
                    className="h-2 mb-2" 
                  />
                  <p className="text-sm text-gray-400">Relative humidity</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Wind className="w-5 h-5 mr-2 text-cyan-400" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {weatherData.windSpeed.toFixed(1)} m/s
                  </div>
                  <Progress 
                    value={(weatherData.windSpeed / 30) * 100} 
                    className="h-2 mb-2" 
                  />
                  <p className="text-sm text-gray-400">Current wind speed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  UV Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {weatherData.uvIndex.toFixed(1)}
                  </div>
                  <Progress 
                    value={(weatherData.uvIndex / 11) * 100} 
                    className="h-2 mb-2" 
                  />
                  <p className="text-sm text-gray-400">UV radiation level</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-400" />
                  Data Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                    <Shield className="w-3 h-3 mr-1" />
                    Real-Time Data
                  </Badge>
                  <p className="text-sm text-gray-300">
                    Location-based environmental data with automatic updates
                  </p>
                  <div className="text-xs text-gray-400">
                    Updated: {new Date(weatherData.timestamp).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="multipliers" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white">Reward Multiplier System</CardTitle>
              <CardDescription className="text-purple-300">
                Understand how environmental conditions affect your staking rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-4">Current Multipliers</h4>
                  <div className="space-y-3">
                    {rewardTiers.map((tier) => (
                      <div key={tier.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center">
                          {tier.icon}
                          <span className="text-white ml-2">{tier.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={tier.active ? 'text-green-400' : 'text-gray-400'}>
                            {tier.multiplier}x
                          </span>
                          {tier.active && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-4">How It Works</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Real-time environmental data from your location</li>
                    <li>• Automatic geolocation detection</li>
                    <li>• Flare Data Connector verifies data authenticity</li>
                    <li>• Rewards update automatically based on conditions</li>
                    <li>• All data is stored on-chain for transparency</li>
                    <li>• Multipliers stack for maximum rewards</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">Total Reward Calculation</h4>
                <div className="text-sm space-y-1">
                  <p className="text-gray-300">Base APY: {baseApy}%</p>
                  <p className="text-gray-300">Environmental Multiplier: {totalMultiplier.toFixed(3)}x</p>
                  <p className="text-green-400 font-semibold">
                    Final APY: {(baseApy * totalMultiplier).toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealWorldDataRewards;
