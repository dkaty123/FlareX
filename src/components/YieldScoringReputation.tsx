import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Shield, 
  Target,
  User,
  Award,
  BarChart3,
  Zap,
  Crown
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

interface UserScore {
  overall: number;
  riskManagement: number;
  diversification: number;
  consistency: number;
  socialReputation: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface LeaderboardEntry {
  rank: number;
  address: string;
  username?: string;
  score: number;
  portfolioValue: string;
  streak: number;
}

const YieldScoringReputation = () => {
  const { isConnected, account } = useWallet();
  const { toast } = useToast();
  
  const [userScore, setUserScore] = useState<UserScore>({
    overall: 847,
    riskManagement: 92,
    diversification: 78,
    consistency: 85,
    socialReputation: 64
  });

  const [userRank] = useState(23);
  const [userTier] = useState('Gold');

  const [achievements] = useState<Achievement[]>([
    {
      id: 'first-stake',
      name: 'First Steps',
      description: 'Make your first staking deposit',
      icon: <Target className="w-5 h-5 text-green-400" />,
      rarity: 'common',
      unlocked: true
    },
    {
      id: 'diversified',
      name: 'Diversification Master',
      description: 'Stake in 5 different protocols',
      icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
      rarity: 'rare',
      unlocked: true,
      progress: 4,
      maxProgress: 5
    },
    {
      id: 'consistency',
      name: 'Consistent Trader',
      description: 'Maintain positive returns for 30 days',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      rarity: 'epic',
      unlocked: false,
      progress: 23,
      maxProgress: 30
    },
    {
      id: 'whale',
      name: 'DeFi Enthusiast',
      description: 'Reach $1K total portfolio value',
      icon: <Crown className="w-5 h-5 text-yellow-400" />,
      rarity: 'legendary',
      unlocked: false,
      progress: 475,
      maxProgress: 1000
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, address: '0x742d...35c1', username: 'DeFiKing', score: 1247, portfolioValue: '$2.4K', streak: 45 },
    { rank: 2, address: '0x8d9c...42f8', username: 'YieldHunter', score: 1198, portfolioValue: '$1.8K', streak: 38 },
    { rank: 3, address: '0x1a2b...78e9', username: 'FlareMaxi', score: 1156, portfolioValue: '$1.5K', streak: 42 },
    { rank: 4, address: '0x9f3e...12d4', username: 'CryptoSage', score: 1089, portfolioValue: '$1.2K', streak: 29 },
    { rank: 5, address: '0x5c7a...8e91', username: 'BlockMaster', score: 1034, portfolioValue: '$980', streak: 35 }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 text-gray-400';
      case 'rare': return 'border-blue-500 text-blue-400';
      case 'epic': return 'border-purple-500 text-purple-400';
      case 'legendary': return 'border-yellow-500 text-yellow-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600';
      case 'Silver': return 'text-gray-400';
      case 'Gold': return 'text-yellow-400';
      case 'Platinum': return 'text-purple-400';
      case 'Diamond': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const claimAchievement = (achievement: Achievement) => {
    if (!achievement.unlocked) {
      toast({
        title: "Achievement Locked",
        description: "Complete the requirements to unlock this achievement",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Achievement Claimed!",
      description: `You've claimed: ${achievement.name}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
          <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
          Yield Scoring & Reputation
        </h2>
        <p className="text-purple-300 max-w-3xl mx-auto">
          Track your DeFi performance, earn achievements, and build your reputation in the ecosystem. 
          Scores based on FTSO data analysis and on-chain behavior patterns.
        </p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Overall Score</p>
              <p className="text-2xl font-bold text-yellow-400">{userScore.overall}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Rank</p>
              <p className="text-2xl font-bold text-white">#{userRank}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Tier</p>
              <p className={`text-2xl font-bold ${getTierColor(userTier)}`}>{userTier}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-purple-800/50">
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Trust Score</p>
              <p className="text-2xl font-bold text-green-400">96%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-purple-800/50">
          <TabsTrigger value="overview">Score Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="insights">Performance Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Score Breakdown
                </CardTitle>
                <CardDescription className="text-purple-300">
                  Your performance across different categories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Risk Management</span>
                      <span className={`font-semibold ${getScoreColor(userScore.riskManagement)}`}>
                        {userScore.riskManagement}/100
                      </span>
                    </div>
                    <Progress value={userScore.riskManagement} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Diversification</span>
                      <span className={`font-semibold ${getScoreColor(userScore.diversification)}`}>
                        {userScore.diversification}/100
                      </span>
                    </div>
                    <Progress value={userScore.diversification} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Consistency</span>
                      <span className={`font-semibold ${getScoreColor(userScore.consistency)}`}>
                        {userScore.consistency}/100
                      </span>
                    </div>
                    <Progress value={userScore.consistency} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Social Reputation</span>
                      <span className={`font-semibold ${getScoreColor(userScore.socialReputation)}`}>
                        {userScore.socialReputation}/100
                      </span>
                    </div>
                    <Progress value={userScore.socialReputation} className="h-2" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">Score Factors</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Portfolio volatility and risk-adjusted returns</li>
                    <li>• Asset allocation across different protocols</li>
                    <li>• Trading frequency and timing decisions</li>
                    <li>• Community engagement and social signals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400">30d Return</p>
                    <p className="text-xl font-bold text-green-400">+18.7%</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400">Sharpe Ratio</p>
                    <p className="text-xl font-bold text-blue-400">2.34</p>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400">Max Drawdown</p>
                    <p className="text-xl font-bold text-purple-400">-8.2%</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-xl font-bold text-yellow-400">73%</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Trade:</span>
                      <span className="text-white">2 hours ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Positions:</span>
                      <span className="text-white">7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Avg Hold Time:</span>
                      <span className="text-white">12.5 days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-400 mb-2">Next Tier Progress</h4>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Gold → Platinum</span>
                    <span className="text-white">847/1000</span>
                  </div>
                  <Progress value={84.7} className="h-2" />
                  <p className="text-xs text-gray-400 mt-1">153 points to next tier</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`bg-black/20 border-purple-800/50 hover:border-opacity-70 transition-all ${
                  achievement.unlocked ? 'border-green-500/50' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {achievement.icon}
                      <CardTitle className="text-lg text-white ml-2">{achievement.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{achievement.description}</p>

                  {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">Progress</span>
                        <span className="text-white text-sm">
                          {achievement.progress.toLocaleString()}/{achievement.maxProgress.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-2" 
                      />
                    </div>
                  )}

                  <Button 
                    onClick={() => claimAchievement(achievement)}
                    disabled={!achievement.unlocked}
                    variant={achievement.unlocked ? "default" : "secondary"}
                    className="w-full"
                  >
                    {achievement.unlocked ? 'Claim Reward' : 'Locked'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-black/20 border-purple-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Global Leaderboard
              </CardTitle>
              <CardDescription className="text-purple-300">
                Top performers based on overall yield scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      entry.address === account ? 'bg-green-500/10 border-green-500/30' : 'bg-black/20 border-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        entry.rank <= 3 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {entry.rank <= 3 ? <Crown className="w-4 h-4" /> : entry.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {entry.username || `${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
                        </p>
                        <p className="text-sm text-gray-400">{entry.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-400">{entry.score}</p>
                      <p className="text-sm text-gray-400">{entry.portfolioValue}</p>
                      <p className="text-xs text-green-400">{entry.streak} day streak</p>
                    </div>
                  </div>
                ))}

                {account && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-semibold text-white">Your Rank</p>
                          <p className="text-sm text-gray-400">{account.slice(0, 6)}...{account.slice(-4)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-400">#{userRank}</p>
                        <p className="text-sm text-gray-400">{userScore.overall} points</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white">Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Strengths</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Excellent risk management (92/100)</li>
                    <li>• Strong consistency in returns</li>
                    <li>• Good protocol diversification</li>
                  </ul>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-400 mb-2">Areas for Improvement</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Increase social engagement (64/100)</li>
                    <li>• Consider higher yield opportunities</li>
                    <li>• Optimize rebalancing frequency</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-purple-800/50">
              <CardHeader>
                <CardTitle className="text-white">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h5 className="font-semibold text-blue-400 mb-1">Strategy Suggestion</h5>
                    <p className="text-sm text-gray-300">
                      Consider allocating 15% to FXRP lottery pools for potential high rewards
                    </p>
                  </div>

                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h5 className="font-semibold text-purple-400 mb-1">Social Boost</h5>
                    <p className="text-sm text-gray-300">
                      Connect your Twitter/Discord to improve social reputation score
                    </p>
                  </div>

                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h5 className="font-semibold text-green-400 mb-1">Achievement Unlock</h5>
                    <p className="text-sm text-gray-300">
                      7 more days of positive returns to unlock "Consistent Trader"
                    </p>
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

export default YieldScoringReputation;
