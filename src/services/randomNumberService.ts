import { ethers } from 'ethers';

// RandomNumberV2 contract ABI (simplified for the main functions we need)
const RANDOM_NUMBER_V2_ABI = [
  "function getRandomNumber() external view returns (uint256 _randomNumber, bool _isSecureRandom, uint256 _randomTimestamp)",
  "function getVotingRoundId(uint256 _timestamp) external view returns (uint256)",
  "function stateData() external view returns (uint8 randomNumberProtocolId, uint32 firstVotingRoundStartTs, uint8 votingEpochDurationSeconds, uint32 firstRewardEpochStartVotingRoundId, uint16 rewardEpochDurationInVotingEpochs, uint16 thresholdIncreaseBIPS, uint32 randomVotingRoundId, bool isSecureRandom, uint32 lastInitializedRewardEpoch, bool noSigningPolicyRelay, uint32 messageFinalizationWindowInRewardEpochs)"
];

// RandomNumberV2 contract addresses on different Flare networks
const RANDOM_NUMBER_V2_ADDRESSES: Record<number, string> = {
  // Flare Mainnet
  14: '0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250',
  // Flare Testnet Coston2  
  114: '0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250',
  // Songbird
  19: '0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250'
};

// Default address (Coston2)
const DEFAULT_ADDRESS = '0x5CdF9eAF3EB8b44fB696984a1420B56A7575D250';

export interface RandomNumberData {
  randomNumber: string;
  isSecureRandom: boolean;
  timestamp: number;
  votingRoundId?: string;
  formattedTimestamp: string;
}

export interface RandomNumberState {
  randomNumberProtocolId: number;
  firstVotingRoundStartTs: number;
  votingEpochDurationSeconds: number;
  firstRewardEpochStartVotingRoundId: number;
  rewardEpochDurationInVotingEpochs: number;
  thresholdIncreaseBIPS: number;
  randomVotingRoundId: number;
  isSecureRandom: boolean;
  lastInitializedRewardEpoch: number;
  noSigningPolicyRelay: boolean;
  messageFinalizationWindowInRewardEpochs: number;
}

export class RandomNumberService {
  private provider: ethers.BrowserProvider;
  private contract: ethers.Contract;

  constructor(provider: ethers.BrowserProvider, networkId?: number) {
    this.provider = provider;
    
    const contractAddress = networkId && RANDOM_NUMBER_V2_ADDRESSES[networkId] 
      ? RANDOM_NUMBER_V2_ADDRESSES[networkId]
      : DEFAULT_ADDRESS;
      
    this.contract = new ethers.Contract(contractAddress, RANDOM_NUMBER_V2_ABI, provider);
    console.log(`RandomNumberV2 service initialized with contract address: ${contractAddress}`);
  }

  async getSecureRandomNumber(): Promise<RandomNumberData> {
    try {
      console.log('Fetching secure random number from RandomNumberV2...');
      
      const [randomNumber, isSecureRandom, timestamp] = await this.contract.getRandomNumber();
      
      const randomNumberData: RandomNumberData = {
        randomNumber: randomNumber.toString(),
        isSecureRandom,
        timestamp: Number(timestamp),
        formattedTimestamp: new Date(Number(timestamp) * 1000).toLocaleString()
      };

      // Get voting round ID for additional context
      try {
        const votingRoundId = await this.contract.getVotingRoundId(timestamp);
        randomNumberData.votingRoundId = votingRoundId.toString();
      } catch (error) {
        console.warn('Could not fetch voting round ID:', error);
      }

      console.log('Secure random number fetched:', randomNumberData);
      return randomNumberData;
    } catch (error) {
      console.error('Error fetching secure random number:', error);
      throw new Error('Failed to fetch secure random number from Flare network');
    }
  }

  async getRandomNumberState(): Promise<RandomNumberState> {
    try {
      console.log('Fetching RandomNumberV2 state data...');
      
      const stateData = await this.contract.stateData();
      
      const state: RandomNumberState = {
        randomNumberProtocolId: Number(stateData[0]),
        firstVotingRoundStartTs: Number(stateData[1]),
        votingEpochDurationSeconds: Number(stateData[2]),
        firstRewardEpochStartVotingRoundId: Number(stateData[3]),
        rewardEpochDurationInVotingEpochs: Number(stateData[4]),
        thresholdIncreaseBIPS: Number(stateData[5]),
        randomVotingRoundId: Number(stateData[6]),
        isSecureRandom: Boolean(stateData[7]),
        lastInitializedRewardEpoch: Number(stateData[8]),
        noSigningPolicyRelay: Boolean(stateData[9]),
        messageFinalizationWindowInRewardEpochs: Number(stateData[10])
      };

      console.log('RandomNumberV2 state data:', state);
      return state;
    } catch (error) {
      console.error('Error fetching RandomNumberV2 state:', error);
      throw new Error('Failed to fetch RandomNumberV2 state data');
    }
  }

  // Utility method to generate a mock random number for demo purposes
  generateMockRandomNumber(): RandomNumberData {
    const timestamp = Math.floor(Date.now() / 1000);
    return {
      randomNumber: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(),
      isSecureRandom: true,
      timestamp,
      formattedTimestamp: new Date(timestamp * 1000).toLocaleString(),
      votingRoundId: Math.floor(Math.random() * 10000).toString()
    };
  }
}
