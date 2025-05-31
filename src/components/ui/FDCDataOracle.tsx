
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Globe, 
  Wifi, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExternalDataSource {
  id: string;
  name: string;
  description: string;
  apiUrl: string;
  dataType: string;
  lastUpdate: number;
  status: 'active' | 'inactive' | 'error';
  value: string | number;
  verified: boolean;
}

interface FDCAttestation {
  id: string;
  sourceId: string;
  timestamp: number;
  data: any;
  proof: string;
  verified: boolean;
  votingRound: number;
}

const FDCDataOracle = () => {
  const { toast } = useToast();
  const [dataSources, setDataSources] = useState<ExternalDataSource[]>([]);
  const [attestations, setAttestations] = useState<FDCAttestation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customApiUrl, setCustomApiUrl] = useState('');
  const [customDataPath, setCustomDataPath] = useState('');

  useEffect(() => {
    initializeDataSources();
    fetchAttestations();
    
    const interval = setInterval(() => {
      updateDataSources();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const initializeDataSources = () => {
    const sources: ExternalDataSource[] = [
      {
        id: 'weather-api',
        name: 'OpenWeather API',
        description: 'Real-time weather data for insurance and agriculture DeFi',
        apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'weather',
        lastUpdate: Date.now(),
        status: 'active',
        value: '22.5°C',
        verified: true
      },
      {
        id: 'commodity-prices',
        name: 'Commodity Prices',
        description: 'Gold, Silver, Oil prices for commodity-backed tokens',
        apiUrl: 'https://api.metals.live/v1/spot',
        dataType: 'commodities',
        lastUpdate: Date.now() - 60000,
        status: 'active',
        value: '$2,023.45',
        verified: true
      },
      {
        id: 'carbon-credits',
        name: 'Carbon Credit Registry',
        description: 'Verified carbon credits for green finance applications',
        apiUrl: 'https://registry.verra.org/app/search/VCS',
        dataType: 'environmental',
        lastUpdate: Date.now() - 300000,
        status: 'active',
        value: '45.2 tCO2e',
        verified: true
      },
      {
        id: 'supply-chain',
        name: 'Supply Chain Tracker',
        description: 'Real-world logistics data for trade finance',
        apiUrl: 'https://api.shipment-tracker.com/v1/status',
        dataType: 'logistics',
        lastUpdate: Date.now() - 120000,
        status: 'active',
        value: 'In Transit',
        verified: false
      }
    ];

    setDataSources(sources);
  };

  const updateDataSources = () => {
    setDataSources(prev => prev.map(source => ({
      ...source,
      lastUpdate: Date.now(),
      value: generateMockValue(source.dataType),
      verified: Math.random() > 0.1 // 90% verification rate
    })));
  };

  const generateMockValue = (dataType: string): string => {
    switch (dataType) {
      case 'weather':
        return `${(15 + Math.random() * 20).toFixed(1)}°C`;
      case 'commodities':
        return `$${(2000 + Math.random() * 100).toFixed(2)}`;
      case 'environmental':
        return `${(40 + Math.random() * 20).toFixed(1)} tCO2e`;
      case 'logistics':
        const statuses = ['In Transit', 'Delivered', 'Processing', 'Shipped'];
        return statuses[Math.floor(Math.random() * statuses.length)];
      default:
        return 'N/A';
    }
  };

  const fetchAttestations = () => {
    const mockAttestations: FDCAttestation[] = [
      {
        id: 'att-001',
        sourceId: 'weather-api',
        timestamp: Date.now() - 300000,
        data: { temperature: 22.5, humidity: 65, location: 'New York' },
        proof: '0x1a2b3c4d5e6f...',
        verified: true,
        votingRound: 12345
      },
      {
        id: 'att-002',
        sourceId: 'commodity-prices',
        timestamp: Date.now() - 180000,
        data: { gold: 2023.45, silver: 24.12 },
        proof: '0x9f8e7d6c5b4a...',
        verified: true,
        votingRound: 12344
      },
      {
        id: 'att-003',
        sourceId: 'carbon-credits',
        timestamp: Date.now() - 600000,
        data: { credits: 45.2, registry: 'VCS' },
        proof: '0x3c4d5e6f7a8b...',
        verified: true,
        votingRound: 12343
      }
    ];

    setAttestations(mockAttestations);
  };

  const handleCreateAttestation = async (sourceId: string) => {
    setIsLoading(true);
    try {
      // Simulate FDC attestation creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const source = dataSources.find(s => s.id === sourceId);
      if (source) {
        const newAttestation: FDCAttestation = {
          id: `att-${Date.now()}`,
          sourceId,
          timestamp: Date.now(),
          data: { value: source.value, verified: true },
          proof: `0x${Math.random().toString(16).substring(2, 18)}...`,
          verified: true,
          votingRound: 12346
        };

        setAttestations(prev => [newAttestation, ...prev]);
        
        toast({
          title: "Attestation Created",
          description: `FDC attestation for ${source.name} successfully created and verified`,
        });
      }
    } catch (error) {
      toast({
        title: "Attestation Failed",
        description: "Failed to create FDC attestation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomSource = () => {
    if (!customApiUrl || !customDataPath) return;

    const newSource: ExternalDataSource = {
      id: `custom-${Date.now()}`,
      name: 'Custom API',
      description: `Custom data from ${customApiUrl}`,
      apiUrl: customApiUrl,
      dataType: 'custom',
      lastUpdate: Date.now(),
      status: 'active',
      value: 'Fetching...',
      verified: false
    };

    setDataSources(prev => [...prev, newSource]);
    setCustomApiUrl('');
    setCustomDataPath('');

    toast({
      title: "Data Source Added",
      description: "Custom API data source added to FDC monitoring",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-black/20 border-purple-800/50">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Database className="w-6 h-6 mr-3 text-blue-400" />
            Flare Data Connector (FDC) Oracle Hub
          </CardTitle>
          <CardDescription className="text-purple-300">
            Validate and attest external Web2 data sources for on-chain DeFi applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">{dataSources.length}</div>
              <div className="text-sm text-blue-300">Active Data Sources</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{attestations.length}</div>
              <div className="text-sm text-green-300">Verified Attestations</div>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">98.5%</div>
              <div className="text-sm text-purple-300">Verification Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="sources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="attestations">Attestations</TabsTrigger>
          <TabsTrigger value="custom">Add Custom API</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSources.map((source) => (
              <Card key={source.id} className="bg-black/20 border-purple-800/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{source.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {source.verified ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      )}
                      <Badge variant="outline" className={
                        source.status === 'active' ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
                      }>
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-purple-300">
                    {source.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Current Value</p>
                      <p className="text-white font-semibold">{source.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Data Type</p>
                      <p className="text-white font-semibold capitalize">{source.dataType}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">API Endpoint</p>
                    <p className="text-blue-300 text-xs font-mono break-all">{source.apiUrl}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Updated</p>
                    <p className="text-white text-sm">
                      {new Date(source.lastUpdate).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={() => handleCreateAttestation(source.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Attestation...' : 'Create FDC Attestation'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attestations" className="space-y-6">
          <div className="space-y-4">
            {attestations.map((attestation) => (
              <Card key={attestation.id} className="bg-black/20 border-purple-800/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-semibold">
                          {dataSources.find(s => s.id === attestation.sourceId)?.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Voting Round: {attestation.votingRound}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Verified
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {new Date(attestation.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Attestation Data</p>
                      <pre className="text-green-300 bg-black/30 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(attestation.data, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="text-gray-400">Cryptographic Proof</p>
                      <p className="text-blue-300 font-mono text-xs break-all">
                        {attestation.proof}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white">Add Custom Data Source</CardTitle>
              <CardDescription className="text-purple-300">
                Connect any Web2 API to Flare's Data Connector for on-chain attestations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-url" className="text-white">API URL</Label>
                <Input
                  id="api-url"
                  value={customApiUrl}
                  onChange={(e) => setCustomApiUrl(e.target.value)}
                  placeholder="https://api.example.com/data"
                  className="bg-black/30 border-purple-500 text-white"
                />
              </div>
              <div>
                <Label htmlFor="data-path" className="text-white">JSON Data Path</Label>
                <Input
                  id="data-path"
                  value={customDataPath}
                  onChange={(e) => setCustomDataPath(e.target.value)}
                  placeholder="data.price or response.value"
                  className="bg-black/30 border-purple-500 text-white"
                />
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                <h4 className="text-blue-300 font-semibold mb-2">How FDC Works:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• FDC fetches data from your specified Web2 API endpoint</li>
                  <li>• Multiple validators independently verify the data</li>
                  <li>• Consensus creates a cryptographic proof of the data's authenticity</li>
                  <li>• Verified data becomes available for smart contracts on Flare</li>
                </ul>
              </div>
              <Button 
                onClick={handleAddCustomSource}
                disabled={!customApiUrl || !customDataPath}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Add Data Source to FDC
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FDCDataOracle;
