
import { ethers } from 'ethers';

// FTSOv2 contract ABI (simplified for price feeds)
const FTSO_ABI = [
  "function getPrice(string memory symbol) external view returns (uint256 price, uint256 timestamp)",
  "function getPrices(string[] memory symbols) external view returns (uint256[] memory prices, uint256[] memory timestamps)"
];

// Flare Network FTSOv2 contract addresses
const FTSO_CONTRACT_ADDRESSES: Record<number, string> = {
  14: '0x3d893C53D9e8056135C26C8c638B76C8b60Df726', // Flare Mainnet
  114: '0x3d893C53D9e8056135C26C8c638B76C8b60Df726', // Coston2 Testnet
  19: '0x3d893C53D9e8056135C26C8c638B76C8b60Df726' // Songbird
};

export class FTSOService {
  private contract: ethers.Contract | null = null;
  private provider: ethers.BrowserProvider | null = null;
  private networkId: number | null = null;

  constructor(provider: ethers.BrowserProvider) {
    this.provider = provider;
    this.initializeContract();
  }

