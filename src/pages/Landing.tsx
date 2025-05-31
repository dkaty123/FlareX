import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, TrendingUp, DollarSign, Users, Activity, BarChart3, Globe, Shield, Sparkles, Star, Clock, Wallet, Target, Brain, Flame, ArrowUpRight, ArrowDownRight, Play, Calendar, Coins, Cloud, LineChart, PieChart, Settings, Repeat, Lock, Unlock, Code, Terminal, FileCode, GitBranch, Database, Server, Monitor, Cpu, HardDrive, Network, Wifi, CheckCircle, AlertTriangle, XCircle, Copy, Eye, MousePointer, Layers, Smartphone, Tablet, Maximize2, Minimize2, RefreshCw, Download, Upload, Search, Filter, Bell, MessageCircle, Share2, Heart, BookOpen, Video, Image, Music, Headphones, Camera, Mic, Volume2, Edit3, Save, Trash2, Plus, Minus, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreHorizontal, MoreVertical, Menu, Home, Mail, Phone, Map, User, UserPlus, Users2, Briefcase, Building, Car, Plane, Ship, Truck, Train, Bike, Anchor, Compass, MapPin, Navigation, Flag, Award, Trophy, Medal, Crown, Gem, Diamond, Coins as CoinsAlt, CreditCard, BanknoteIcon, ExternalLink, Lightbulb, Rocket, Boxes, CircuitBoard, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [currentMetrics, setCurrentMetrics] = useState({
    tvl: 3,
    users: 10,
    volume: 1,
    yield: 18.4,
    price: 0.0342
  });

  const [activeSection, setActiveSection] = useState('overview');
  const [portfolioData, setPortfolioData] = useState([
    { name: 'FLR', value: 452.3, change: 5.2, percentage: 45.2 },
    { name: 'fBTC', value: 321.1, change: 2.1, percentage: 32.1 },
    { name: 'fETH', value: 227.6, change: -1.3, percentage: 22.7 }
  ]);
  
  const [tradingData, setTradingData] = useState([
    { time: '00:00', price: 0.0340, volume: 2.4 },
    { time: '04:00', price: 0.0342, volume: 3.1 },
    { time: '08:00', price: 0.0345, volume: 2.8 },
    { time: '12:00', price: 0.0343, volume: 4.2 },
    { time: '16:00', price: 0.0347, volume: 3.7 },
    { time: '20:00', price: 0.0344, volume: 2.9 },
    { time: '24:00', price: 0.0346, volume: 3.5 }
  ]);

  const [yieldFarmingData, setYieldFarmingData] = useState([
    { pool: 'FLR-USDT', apy: 24.5, liquidity: 15200000, userStake: 5000, rewards: 12.5 },
    { pool: 'fBTC-USDT', apy: 18.3, liquidity: 28700000, userStake: 12000, rewards: 28.7 },
    { pool: 'fETH-USDT', apy: 21.7, liquidity: 19400000, userStake: 8500, rewards: 19.4 }
  ]);

  const [realTimeTransactions, setRealTimeTransactions] = useState([
    { hash: '0x7d2a...4f8e', type: 'Swap', amount: '2,500 FLR → 847 USDT', gas: '0.0034', status: 'confirmed', timestamp: Date.now() - 2000 },
    { hash: '0x9b1c...7a2d', type: 'Stake', amount: '10,000 FLR', gas: '0.0021', status: 'pending', timestamp: Date.now() - 15000 },
    { hash: '0x3e8f...9c1b', type: 'LP Add', amount: '5,000 USDT + 15,000 FLR', gas: '0.0067', status: 'confirmed', timestamp: Date.now() - 45000 },
    { hash: '0x6d4a...2e8f', type: 'Oracle', amount: 'Price Update: $0.0342', gas: '0.0012', status: 'confirmed', timestamp: Date.now() - 78000 }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    blockTime: 2.1,
    gasPrice: 0.0025,
    networkLoad: 67,
    oracleAccuracy: 99.97,
    totalNodes: 147,
    activeValidators: 89
  });

  const [demoMode, setDemoMode] = useState('trading');
  const [liveCodeDemo, setLiveCodeDemo] = useState(0);

  // Real-time data simulation with more complex updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        tvl: Math.max(200, Math.min(300, prev.tvl + (Math.random() - 0.5) * 5)),
        users: Math.max(14000, Math.min(17000, prev.users + Math.floor((Math.random() - 0.5) * 100))),
        volume: Math.max(70, Math.min(120, prev.volume + (Math.random() - 0.5) * 8)),
        yield: Math.max(15, Math.min(25, prev.yield + (Math.random() - 0.5) * 0.5)),
        price: Math.max(0.02, Math.min(0.05, prev.price + (Math.random() - 0.5) * 0.002))
      }));

      setPortfolioData(prev => prev.map(asset => ({
        ...asset,
        change: Math.max(-10, Math.min(10, asset.change + (Math.random() - 0.5) * 0.5)),
        value: Math.max(100, asset.value + (Math.random() - 0.5) * 10)
      })));

      setTradingData(prev => {
        const newData = [...prev];
        newData.shift();
        const lastPrice = newData[newData.length - 1].price;
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour12: false }),
          price: Math.max(0.02, Math.min(0.05, lastPrice + (Math.random() - 0.5) * 0.002)),
          volume: Math.random() * 5 + 1
        });
        return newData;
      });

      // Update real-time transactions
      if (Math.random() > 0.7) {
        const types = ['Swap', 'Stake', 'LP Add', 'Oracle', 'Transfer', 'Claim'];
        const newTx = {
          hash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
          type: types[Math.floor(Math.random() * types.length)],
          amount: `${(Math.random() * 10000).toFixed(0)} FLR`,
          gas: (Math.random() * 0.01).toFixed(4),
          status: Math.random() > 0.1 ? 'confirmed' : 'pending',
          timestamp: Date.now()
        };
        
        setRealTimeTransactions(prev => [newTx, ...prev.slice(0, 9)]);
      }

      // Update system metrics
      setSystemMetrics(prev => ({
        blockTime: Math.max(1.8, Math.min(2.5, prev.blockTime + (Math.random() - 0.5) * 0.1)),
        gasPrice: Math.max(0.002, Math.min(0.005, prev.gasPrice + (Math.random() - 0.5) * 0.0005)),
        networkLoad: Math.max(40, Math.min(95, prev.networkLoad + (Math.random() - 0.5) * 5)),
        oracleAccuracy: Math.max(99.9, Math.min(100, prev.oracleAccuracy + (Math.random() - 0.5) * 0.01)),
        totalNodes: Math.max(140, Math.min(160, prev.totalNodes + Math.floor((Math.random() - 0.5) * 2))),
        activeValidators: Math.max(80, Math.min(100, prev.activeValidators + Math.floor((Math.random() - 0.5) * 2)))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const tradingPairs = [
    { pair: 'FLR/USDT', price: currentMetrics.price, change: 5.2, volume: '2.4M' },
    { pair: 'fBTC/USDT', price: 67432, change: 2.1, volume: '12.8M' },
    { pair: 'fETH/USDT', price: 3456, change: -1.3, volume: '8.9M' },
    { pair: 'fXRP/USDT', price: 0.52, change: 3.7, volume: '5.2M' }
  ];

  const liquidityPools = [
    { name: 'FLR-USDT', apy: 24.5, tvl: '15.2M', rewards: 'FLR + WFLR' },
    { name: 'fBTC-USDT', apy: 18.3, tvl: '28.7M', rewards: 'FLR' },
    { name: 'fETH-USDT', apy: 21.7, tvl: '19.4M', rewards: 'FLR + SGB' }
  ];

  // Code snippets for different features
  const codeSnippets = {
    oracle: `// Real-time FTSO Price Oracle
import { IFtsoRegistry } from "@flare/contracts";

contract FlareXOracle {
    IFtsoRegistry ftsoRegistry;
    
    function getLivePrice(string symbol) external view returns (uint256) {
        (uint256 price, uint256 timestamp, uint256 decimals) = 
            ftsoRegistry.getCurrentPriceWithDecimals(symbol);
        
        require(block.timestamp - timestamp < 300, "Price too old");
        return price * (10 ** (18 - decimals));
    }
    
    function getMultiplePrices(string[] symbols) external view 
        returns (uint256[] memory prices) {
        prices = new uint256[](symbols.length);
        for(uint i = 0; i < symbols.length; i++) {
            (prices[i],,) = ftsoRegistry.getCurrentPrice(symbols[i]);
        }
    }
}`,
    
    trading: `// Automated Trading Strategy
import { FlareXOracle } from "./FlareXOracle.sol";

contract TradingBot {
    FlareXOracle oracle;
    mapping(address => Strategy) strategies;
    
    struct Strategy {
        uint256 buyThreshold;
        uint256 sellThreshold;
        uint256 maxPosition;
        bool active;
    }
    
    function executeStrategy(address user, string symbol) external {
        Strategy memory strategy = strategies[user];
        uint256 currentPrice = oracle.getLivePrice(symbol);
        
        if (currentPrice <= strategy.buyThreshold && strategy.active) {
            _executeBuy(user, symbol, currentPrice);
            emit TradeExecuted(user, "BUY", symbol, currentPrice);
        }
        
        if (currentPrice >= strategy.sellThreshold && strategy.active) {
            _executeSell(user, symbol, currentPrice);
            emit TradeExecuted(user, "SELL", symbol, currentPrice);
        }
    }
}`,

    defi: `// Yield Farming Pool with Dynamic APY
contract FlareXYieldFarm {
    using SafeMath for uint256;
    
    struct Pool {
        IERC20 lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accFLRPerShare;
        uint256 totalStaked;
    }
    
    Pool[] public pools;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    
    function deposit(uint256 _pid, uint256 _amount) external {
        Pool storage pool = pools[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        
        updatePool(_pid);
        
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accFLRPerShare)
                .div(1e12).sub(user.rewardDebt);
            safeFLRTransfer(msg.sender, pending);
        }
        
        pool.lpToken.transferFrom(msg.sender, address(this), _amount);
        user.amount = user.amount.add(_amount);
        pool.totalStaked = pool.totalStaked.add(_amount);
        user.rewardDebt = user.amount.mul(pool.accFLRPerShare).div(1e12);
        
        emit Deposit(msg.sender, _pid, _amount);
    }
}`
  };

  // Live demo data
  const liveDemoData = {
    orderbook: [
      { price: 0.03421, size: 15420, side: 'buy', total: 527.23 },
      { price: 0.03420, size: 12350, total: 422.47 },
      { price: 0.03419, size: 8900, total: 304.29 },
      { price: 0.03422, size: 9800, side: 'sell', total: 335.36 },
      { price: 0.03423, size: 11200, total: 383.38 },
      { price: 0.03424, size: 7600, total: 260.22 }
    ],
    portfolio: {
      total: 847293,
      change: 23847,
      changePercent: 2.9,
      positions: [
        { asset: 'FLR', amount: 452300, value: 15479, allocation: 45.2 },
        { asset: 'fBTC', amount: 7.2341, value: 485720, allocation: 32.1 },
        { asset: 'fETH', amount: 89.24, value: 307821, allocation: 22.7 }
      ]
    }
  };

  // Update live code demo
  useEffect(() => {
    const codeInterval = setInterval(() => {
      setLiveCodeDemo(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(codeInterval);
  }, []);

  const flareProtocols = [
    {
      name: "FTSO Oracle",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Real-time price feeds with sub-second latency for accurate DeFi operations",
      features: [
        "30+ cryptocurrency price feeds",
        "Sub-second update intervals", 
        "Decentralized oracle network",
        "High accuracy (99.9%+)"
      ],
      status: "Active",
      color: "from-purple-500 to-indigo-500",
      borderColor: "border-purple-500/30",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-400",
      usage: "Powers live price charts and trading decisions across FlareX platform"
    },
    {
      name: "FAssets Protocol", 
      icon: <Coins className="w-8 h-8" />,
      description: "Synthetic assets bringing non-smart-contract cryptocurrencies into DeFi",
      features: [
        "FXRP, FBTC, FLTC trading",
        "Mint & redeem functionality",
        "Cross-chain liquidity",
        "Yield farming opportunities"
      ],
      status: "Active",
      color: "from-cyan-500 to-blue-500", 
      borderColor: "border-cyan-500/30",
      bgColor: "bg-cyan-500/10",
      textColor: "text-cyan-400",
      usage: "Enables synthetic asset trading and cross-chain DeFi operations"
    },
    {
      name: "Secure Random Number",
      icon: <Shield className="w-8 h-8" />,
      description: "Provably fair randomness for gaming and selection mechanisms",
      features: [
        "Cryptographically secure",
        "Zero manipulation risk",
        "90-second update cycles",
        "Gas-free generation"
      ],
      status: "Active",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500/30", 
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
      usage: "Powers fair gaming mechanics and random selection in DApps"
    },
    {
      name: "FDC Data Connector",
      icon: <Globe className="w-8 h-8" />,
      description: "Web2 and Web3 data integration for comprehensive DeFi solutions",
      features: [
        "Weather data feeds",
        "Sports & events data",
        "Social media metrics",
        "IoT sensor integration"
      ],
      status: "Coming Soon",
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/30",
      bgColor: "bg-orange-500/10", 
      textColor: "text-orange-400",
      usage: "Future expansion for weather derivatives and real-world data DApps"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-violet-500/12 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/6 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <header className="relative z-10 border-b border-purple-800/30 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-all duration-300">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FlareX</h1>
                <p className="text-sm text-purple-300">DeFi Revolution</p>
              </div>
            </div>
            <Link to="/app">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:scale-105 transition-all duration-300">
                Launch App <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center max-w-6xl mx-auto">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 mr-2" />
            Live on Flare Network
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text mb-8 animate-fade-in">
            FlareX
            <br />
            <span className="relative">
              Reimagined
              <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Experience the future of decentralized finance with real-time oracles, 
            cross-chain assets, and revolutionary yield farming on Flare Network.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <Card className="bg-slate-800/90 border-purple-500/30 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">${currentMetrics.tvl.toFixed(1)}K</div>
                <div className="text-xs text-slate-400">Total Value Locked</div>
                <div className="text-xs text-green-400 flex items-center justify-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.4%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/90 border-cyan-500/30 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">{currentMetrics.users.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Active Users</div>
                <div className="text-xs text-cyan-400 flex items-center justify-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +8.7%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full animate-pulse" style={{width: '85%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/90 border-violet-500/30 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-violet-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">${currentMetrics.volume.toFixed(1)}K</div>
                <div className="text-xs text-slate-400">24h Volume</div>
                <div className="text-xs text-violet-400 flex items-center justify-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +15.2%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-1 rounded-full animate-pulse" style={{width: '65%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/90 border-yellow-500/30 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">{currentMetrics.yield.toFixed(1)}%</div>
                <div className="text-xs text-slate-400">Avg APY</div>
                <div className="text-xs text-yellow-400 flex items-center justify-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +2.1%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1 rounded-full animate-pulse" style={{width: '90%'}}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/90 border-pink-500/30 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 text-pink-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">${currentMetrics.price.toFixed(4)}</div>
                <div className="text-xs text-slate-400">FLR Price</div>
                <div className="text-xs text-pink-400 flex items-center justify-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +5.3%
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-1 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 mb-12 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['overview', 'live-trading', 'smart-contracts', 'system-monitoring', 'dev-tools', 'real-time-data'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === tab 
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg transform scale-105' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {activeSection === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <Card className="bg-slate-800/80 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Wallet className="w-5 h-5 mr-2 text-purple-400" />
                      Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">$847,293</div>
                    <div className="text-sm text-purple-300">+$23,847 (2.9%) today</div>
                    <div className="mt-4 space-y-2">
                      {portfolioData.map((asset, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-slate-400">{asset.name}</span>
                          <span className={`${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {asset.percentage}% ({asset.change > 0 ? '+' : ''}{asset.change.toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/80 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">+127.3%</div>
                    <div className="text-sm text-cyan-300">All-time return</div>
                    <div className="mt-4 h-20 relative">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 60 Q 50 20 100 30 T 200 10"
                          fill="none"
                          stroke="url(#performanceGradient)"
                          strokeWidth="3"
                          className="animate-pulse"
                        />
                        <circle cx="200" cy="10" r="4" fill="#06b6d4" className="animate-pulse">
                          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/80 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Star className="w-5 h-5 mr-2 text-green-400" />
                      Rewards Earned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">2,847 FLR</div>
                    <div className="text-sm text-green-300">≈ $97.32 USD</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Staking</span>
                        <span className="text-green-400">1,234 FLR</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">LP Rewards</span>
                        <span className="text-green-400">987 FLR</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Trading</span>
                        <span className="text-green-400">626 FLR</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"
                            style={{width: `${Math.random() * 100}%`, animationDelay: `${i * 0.2}s`}}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'live-trading' && (
              <div className="animate-fade-in space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/80 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span>Live Trading Chart</span>
                        <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 relative">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                          <defs>
                            <linearGradient id="tradingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                            </linearGradient>
                          </defs>
                          <path
                            d={`M ${tradingData.map((d, i) => `${i * 60} ${150 - (d.price - 0.03) * 5000}`).join(' L ')}`}
                            fill="url(#tradingGradient)"
                          />
                          <path
                            d={`M ${tradingData.map((d, i) => `${i * 60} ${150 - (d.price - 0.03) * 5000}`).join(' L ')}`}
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="2"
                          />
                          <circle 
                            cx={tradingData.length * 60 - 60} 
                            cy={150 - (tradingData[tradingData.length - 1]?.price - 0.03) * 5000} 
                            r="4" 
                            fill="#8b5cf6"
                            className="animate-pulse"
                          >
                            <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
                          </circle>
                        </svg>
                        <div className="absolute top-4 left-4">
                          <div className="text-2xl font-bold text-white">${tradingData[tradingData.length - 1]?.price.toFixed(4)}</div>
                          <div className="text-sm text-green-400">+5.2% (24h)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/80 border-cyan-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                        Real-Time Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                      {realTimeTransactions.map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-900/50 rounded-lg text-sm">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${tx.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                            <div>
                              <div className="text-white font-mono">{tx.hash}</div>
                              <div className="text-slate-400">{tx.type} • {tx.amount}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-300">{tx.gas} FLR</div>
                            <div className="text-xs text-slate-500">{Math.floor((Date.now() - tx.timestamp) / 1000)}s ago</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-800/80 border-indigo-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-indigo-400" />
                      Live Order Book - FLR/USDT
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-green-400 font-medium mb-3">Buy Orders</h4>
                        <div className="space-y-2">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex justify-between text-sm bg-green-500/10 p-2 rounded relative overflow-hidden">
                              <div 
                                className="absolute left-0 top-0 bottom-0 bg-green-500/20 transition-all duration-1000"
                                style={{width: `${Math.random() * 80 + 20}%`}}
                              ></div>
                              <span className="text-green-400 relative z-10">${(currentMetrics.price - 0.0005 * (i + 1)).toFixed(4)}</span>
                              <span className="text-slate-300 relative z-10">{(Math.random() * 15000 + 5000).toFixed(0)}</span>
                              <span className="text-green-300 relative z-10">${(Math.random() * 50000 + 10000).toFixed(0)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-red-400 font-medium mb-3">Sell Orders</h4>
                        <div className="space-y-2">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex justify-between text-sm bg-red-500/10 p-2 rounded relative overflow-hidden">
                              <div 
                                className="absolute left-0 top-0 bottom-0 bg-red-500/20 transition-all duration-1000"
                                style={{width: `${Math.random() * 80 + 20}%`}}
                              ></div>
                              <span className="text-red-400 relative z-10">${(currentMetrics.price + 0.0005 * (i + 1)).toFixed(4)}</span>
                              <span className="text-slate-300 relative z-10">{(Math.random() * 15000 + 5000).toFixed(0)}</span>
                              <span className="text-red-300 relative z-10">${(Math.random() * 50000 + 10000).toFixed(0)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'smart-contracts' && (
              <div className="animate-fade-in space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/80 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Code className="w-5 h-5 mr-2 text-green-400" />
                        FTSO Oracle Integration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-900/80 p-4 rounded-lg font-mono text-sm overflow-x-auto text-left">
                        <div className="text-green-400">// FlareX Oracle Price Feed</div>
                        <div className="text-blue-400">contract</div> <span className="text-yellow-400">FlareXOracle</span> <span className="text-slate-300">{'{'}</span>
                        <div className="ml-4 text-purple-400">IFtsoRegistry</div> <span className="text-slate-300">ftsoRegistry;</span>
                        <div className="ml-4 text-blue-400">function</div> <span className="text-yellow-400">getPrice</span><span className="text-slate-300">(</span><span className="text-purple-400">string</span> <span className="text-slate-300">symbol) </span><span className="text-blue-400">external</span> <span className="text-slate-300">{'{'}</span>
                        <div className="ml-8 text-slate-300">(</div><span className="text-purple-400">uint256</span> <span className="text-slate-300">price, , ) = ftsoRegistry</span>
                        <div className="ml-12 text-slate-300">.getCurrentPrice(symbol);</div>
                        <div className="ml-8 text-blue-400">return</div> <span className="text-slate-300">price;</span>
                        <div className="ml-4 text-slate-300">{'}'}</div>
                        <div className="text-slate-300">{'}'}</div>
                      </div>
                      <div className="mt-4 flex justify-between text-xs">
                        <Badge className="bg-green-500/20 text-green-400">Deployed</Badge>
                        <span className="text-slate-400">Gas: 21,000</span>
                        <span className="text-slate-400">Verified ✓</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/80 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Database className="w-5 h-5 mr-2 text-blue-400" />
                        Contract Deployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Contracts</span>
                          <span className="text-white font-bold">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Today</span>
                          <span className="text-green-400 font-bold">89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Gas Saved</span>
                          <span className="text-cyan-400 font-bold">45.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Success Rate</span>
                          <span className="text-green-400 font-bold">99.7%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-slate-400 flex justify-between">
                          <span>Deployment Activity</span>
                          <span>Last 24h</span>
                        </div>
                        <div className="h-16 flex items-end space-x-1">
                          {[...Array(24)].map((_, i) => (
                            <div 
                              key={i} 
                              className="flex-1 bg-blue-500/30 rounded-t animate-pulse"
                              style={{
                                height: `${Math.random() * 60 + 20}%`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-800/80 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <Terminal className="w-5 h-5 mr-2 text-purple-400" />
                        FlareX Smart Contract Editor
                      </span>
                      <div className="flex space-x-2">
                        <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">Flare Testnet</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900/90 p-6 rounded-lg font-mono text-sm text-left">
                      <div className="flex items-center space-x-4 mb-4 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400">YieldFarm.sol</span>
                        <Badge className="bg-orange-500/20 text-orange-400">Modified</Badge>
                      </div>
                      <div className="space-y-1">
                        <div><span className="text-slate-600">1</span> <span className="text-green-400">// SPDX-License-Identifier: MIT</span></div>
                        <div><span className="text-slate-600">2</span> <span className="text-blue-400">pragma solidity</span> <span className="text-yellow-400">^0.8.19</span>;</div>
                        <div><span className="text-slate-600">3</span></div>
                        <div><span className="text-slate-600">4</span> <span className="text-blue-400">import</span> <span className="text-green-400">"@flare/contracts/IFtsoRegistry.sol"</span>;</div>
                        <div><span className="text-slate-600">5</span></div>
                        <div><span className="text-slate-600">6</span> <span className="text-blue-400">contract</span> <span className="text-yellow-400">FlareXYieldFarm</span> <span className="text-slate-300">{'{'}</span></div>
                        <div><span className="text-slate-600">7</span> <span className="ml-4 text-purple-400">mapping</span><span className="text-slate-300">(</span><span className="text-blue-400">address</span> <span className="text-slate-300">=&gt;</span> <span className="text-purple-400">uint256</span><span className="text-slate-300">) </span><span className="text-cyan-400">public</span> <span className="text-slate-300">stakes;</span></div>
                        <div><span className="text-slate-600">8</span> <span className="ml-4 text-purple-400">uint256</span> <span className="text-cyan-400">public</span> <span className="text-slate-300">totalRewards = </span><span className="text-yellow-400">1000000</span> <span className="text-slate-300">* </span><span className="text-yellow-400">10</span><span className="text-slate-300">**</span><span className="text-yellow-400">18</span>;</div>
                        <div><span className="text-slate-600">9</span></div>
                        <div><span className="text-slate-600">10</span> <span className="ml-4 text-blue-400">function</span> <span className="text-yellow-400">stake</span><span className="text-slate-300">(</span><span className="text-purple-400">uint256</span> <span className="text-slate-300">amount) </span><span className="text-cyan-400">external</span> <span className="text-slate-300">{'{'}</span></div>
                        <div><span className="text-slate-600">11</span> <span className="ml-8 text-green-400">// Stake FLR tokens and earn rewards</span></div>
                        <div><span className="text-slate-600">12</span> <span className="ml-8 text-slate-300">stakes[msg.sender] += amount;</span></div>
                        <div className="text-cyan-400 animate-pulse">│ <span className="bg-cyan-500/20">Cursor position</span></div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-4 text-sm">
                        <Button size="sm" className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/50">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Compile
                        </Button>
                        <Button size="sm" className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50">
                          <Play className="w-4 h-4 mr-2" />
                          Deploy
                        </Button>
                        <Button size="sm" className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50">
                          <Shield className="w-4 h-4 mr-2" />
                          Verify
                        </Button>
                      </div>
                      <div className="text-xs text-slate-400">
                        Gas Estimate: 247,891 | Cost: ~$0.82
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === 'system-monitoring' && (
              <div className="animate-fade-in space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-slate-800/80 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Server className="w-5 h-5 mr-2 text-green-400" />
                        Network Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 truncate">{systemMetrics.networkLoad}%</div>
                          <div className="text-sm text-slate-400">Network Load</div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-yellow-500 h-3 rounded-full transition-all duration-1000"
                            style={{width: `${systemMetrics.networkLoad}%`}}
                          ></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-slate-400">Block Time</div>
                            <div className="text-white font-bold truncate">{systemMetrics.blockTime.toFixed(1)}s</div>
                          </div>
                          <div>
                            <div className="text-slate-400">Gas Price</div>
                            <div className="text-white font-bold truncate">{systemMetrics.gasPrice.toFixed(4)} FLR</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/80 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Network className="w-5 h-5 mr-2 text-blue-400" />
                        Node Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Nodes</span>
                          <span className="text-white font-bold">{systemMetrics.totalNodes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Active Validators</span>
                          <span className="text-green-400 font-bold">{systemMetrics.activeValidators}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Online</span>
                            <span className="text-green-400">98.7%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Syncing</span>
                            <span className="text-yellow-400">1.1%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Offline</span>
                            <span className="text-red-400">0.2%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full flex">
                            <div className="bg-green-500 flex-1"></div>
                            <div className="bg-yellow-500" style={{width: '5%'}}></div>
                            <div className="bg-red-500" style={{width: '2%'}}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/80 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Cpu className="w-5 h-5 mr-2 text-orange-400" />
                        Oracle Accuracy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2 truncate">{systemMetrics.oracleAccuracy.toFixed(2)}%</div>
                          <div className="text-sm text-slate-400">Price Accuracy</div>
                        </div>
                        <div className="space-y-2">
                          {['BTC/USD', 'ETH/USD', 'FLR/USD', 'XRP/USD'].map((pair, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-slate-400">{pair}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-green-400">{(99.9 + Math.random() * 0.09).toFixed(2)}%</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-800/80 border-cyan-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
                      Real-Time System Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-4">Transaction Flow</h4>
                        <div className="h-40 relative bg-slate-900/50 rounded-lg p-4">
                          <div className="absolute inset-4 flex items-center justify-center">
                            <div className="relative">
                              <div className="w-32 h-32 border-2 border-purple-500/30 rounded-full relative">
                                <div className="absolute inset-2 border-2 border-cyan-500/30 rounded-full">
                                  <div className="absolute inset-2 border-2 border-green-500/30 rounded-full">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="text-center">
                                        <div className="text-2xl font-bold text-white">{Math.floor(Math.random() * 50 + 100)}</div>
                                        <div className="text-xs text-slate-400">TPS</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {[...Array(8)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                                    style={{
                                      top: '50%',
                                      left: '50%',
                                      transform: `rotate(${i * 45}deg) translateY(-60px)`,
                                      animationDelay: `${i * 0.2}s`
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-4">Live System Metrics</h4>
                        <div className="space-y-4">
                          {[
                            { metric: 'CPU Usage', value: Math.floor(Math.random() * 30 + 40), unit: '%', color: 'bg-green-500' },
                            { metric: 'Memory', value: Math.floor(Math.random() * 20 + 60), unit: '%', color: 'bg-blue-500' },
                            { metric: 'Disk I/O', value: Math.floor(Math.random() * 40 + 20), unit: 'MB/s', color: 'bg-purple-500' },
                            { metric: 'Network', value: Math.floor(Math.random() * 100 + 200), unit: 'Mbps', color: 'bg-cyan-500' }
                          ].map((metric, i) => (
                            <div key={i} className="flex justify-between items-center">
                              <span className="text-slate-400">{metric.metric}</span>
                              <div className="flex items-center space-x-3">
                                <div className="w-24 bg-slate-700 rounded-full h-2">
                                  <div 
                                    className={`${metric.color} h-2 rounded-full transition-all duration-1000`}
                                    style={{width: `${Math.min(metric.value, 100)}%`}}
                                  ></div>
                                </div>
                                <span className="text-white font-mono text-sm w-16 text-right">
                                  {metric.value}{metric.unit}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/app">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-12 py-6 text-lg rounded-2xl shadow-2xl shadow-purple-500/25 hover:scale-105 transition-all duration-300">
                <Play className="w-6 h-6 mr-3" />
                Launch FlareX
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-bold px-12 py-6 text-lg rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <Globe className="w-6 h-6 mr-3" />
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* New Flare Protocols Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border-purple-500/50 animate-pulse">
              <Flame className="w-4 h-4 mr-2" />
              Powered by Flare Network
            </Badge>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text mb-6 animate-fade-in">
            Flare Protocols
            <br />
            <span className="text-3xl md:text-4xl text-slate-300">Powering the Future</span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-8">
            FlareX leverages Flare's revolutionary enshrined data protocols to bring real-world data 
            into DeFi with unprecedented security and reliability.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              3/4 Protocols Integrated
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              Real-time Data Feeds
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              Production Ready
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {flareProtocols.map((protocol, index) => (
            <Card 
              key={index} 
              className={`group bg-slate-800/80 ${protocol.borderColor} hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-2xl hover:border-opacity-80 relative`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${protocol.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 ${protocol.bgColor} rounded-2xl flex items-center justify-center ${protocol.textColor} group-hover:scale-110 transition-transform`}>
                    {protocol.icon}
                  </div>
                  <Badge 
                    className={`${protocol.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-orange-500/20 text-orange-400 border-orange-500/50'} animate-pulse`}
                  >
                    {protocol.status === 'Active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {protocol.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {protocol.name}
                </CardTitle>
                
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {protocol.description}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {protocol.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm group/feature">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full group-hover/feature:scale-125 transition-transform"></div>
                        <span className="text-slate-300 group-hover/feature:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-4 ${protocol.bgColor} rounded-lg border ${protocol.borderColor}`}>
                  <h5 className="text-white font-medium mb-2 flex items-center">
                    <Boxes className="w-4 h-4 mr-2" />
                    FlareX Integration
                  </h5>
                  <p className="text-sm text-slate-300">{protocol.usage}</p>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className={`${protocol.bgColor} hover:${protocol.bgColor}/80 ${protocol.textColor} border ${protocol.borderColor} hover:scale-105 transition-all duration-300 flex-1`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                  {protocol.status === 'Active' && (
                    <Button 
                      size="sm" 
                      className="bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 border border-slate-600 hover:scale-105 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                  )}
                </div>

                <div className="w-full bg-slate-700 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full bg-gradient-to-r ${protocol.color} group-hover:w-full w-0 transition-all duration-1000`}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Protocol Integration Showcase */}
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 animate-pulse"></div>
          
          <div className="relative z-10 text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <CircuitBoard className="w-8 h-8 mr-3 text-cyan-400" />
              Protocol Integration Impact
            </h3>
            <p className="text-slate-400 max-w-3xl mx-auto">
              See how Flare's protocols revolutionize DeFi through real-world data integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Real-World Data</h4>
                <p className="text-slate-400 text-sm mb-4">Bridging traditional finance with DeFi through reliable oracle feeds</p>
                <div className="text-2xl font-bold text-purple-400">156+ Feeds</div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-cyan-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Secure & Fair</h4>
                <p className="text-slate-400 text-sm mb-4">Cryptographically secure randomness and tamper-proof data</p>
                <div className="text-2xl font-bold text-cyan-400">99.9% Uptime</div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Innovation Ready</h4>
                <p className="text-slate-400 text-sm mb-4">Enabling next-generation DeFi applications and use cases</p>
                <div className="text-2xl font-bold text-green-400">∞ Possibilities</div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center relative z-10">
            <Link to="/app">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl shadow-purple-500/25 hover:scale-105 transition-all duration-300 animate-pulse"
              >
                <Play className="w-5 h-5 mr-3" />
                Experience Flare Protocols
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Revolutionary Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/50 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Revolutionary Features
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text mb-6">
            Next-Gen DeFi Platform
          </h2>
          
          <p className="text-xl text-slate-400 max-w-4xl mx-auto mb-12">
            Experience cutting-edge DeFi features powered by Flare's revolutionary data protocols, designed for the future of decentralized finance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Multi-Asset Trading */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Multi-Asset Trading</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Trade synthetic assets, crypto pairs, and yield farm across multiple protocols with real-time FTSO price feeds.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm">20+ Price Feeds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm">99.9% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm">Sub-second Updates</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Cross-Chain Bridge */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Cross-Chain Bridge</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Seamlessly bridge assets between Flare and other networks with LayerZero's secure cross-chain infrastructure.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">Multi-chain</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">Low Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">Fast Transfers</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Secure Random Gaming */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Secure Random Gaming</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Provably fair gaming platform with cryptographically secure random number generation from Flare's native protocols.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">Provably Fair</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">Zero Cost</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300 text-sm">Gaming Ready</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* FAssets Trading */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">FAssets Trading</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Native Bitcoin & Ethereum on Flare through synthetic assets with full collateralization and instant redemption.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-300 text-sm">Cross-chain Assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-300 text-sm">Yield Farming</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-300 text-sm">Instant Swaps</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Climate Derivatives */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-green-500/30 hover:border-green-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">Climate Derivatives</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Climate-based financial instruments powered by real-world weather data for risk management and speculation.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Weather Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Risk Management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300 text-sm">Smart Contracts</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* AI Trading Insights */}
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 group hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">AI Trading Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                Smart trading insights and predictions powered by machine learning algorithms and real-time market data analysis.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">ML Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">Predictions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300 text-sm">Auto Trading</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold">
                Explore Feature
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-slate-900/60 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                ${currentMetrics.tvl.toFixed(0)}M+
              </div>
              <div className="text-slate-400 text-lg">Total Value Locked</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                {Math.floor(currentMetrics.users / 1000)}K+
              </div>
              <div className="text-slate-400 text-lg">Active Users</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-4/5 animate-pulse"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                156
              </div>
              <div className="text-slate-400 text-lg">Oracle Feeds</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full animate-pulse"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                99.9%
              </div>
              <div className="text-slate-400 text-lg">Uptime</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center bg-slate-900/60 border border-purple-500/30 rounded-3xl p-16 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-6xl font-black text-white mb-6">Ready to Start?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Join the DeFi revolution and experience the power of real-world data integration.
            </p>
            <Link to="/app">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold px-16 py-8 text-xl rounded-2xl shadow-2xl shadow-purple-500/25 hover:scale-110 transition-all duration-300">
                <Zap className="w-8 h-8 mr-4" />
                Launch FlareX Now
                <ArrowRight className="w-8 h-8 ml-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-purple-500/30 bg-black/30 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-slate-400">
            <p>&copy; 2024 FlareX. Built on Flare Network. The future of DeFi is here.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
