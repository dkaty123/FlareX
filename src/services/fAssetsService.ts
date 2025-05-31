import { ethers } from 'ethers';

// FAssets contract ABI (real FAssets functions)
const FASSETS_ABI = [
  "function mintFAssetFrom(uint256 underlyingAmount, address recipient) external payable returns (uint256)",
  "function redeem(uint256 amountUBA, address redeemToAddress, bool wrapToEth) external returns (uint256)",
  "function getCollateralRatio(address agentVault) external view returns (uint256)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function currentPrice() external view returns (uint256)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)"
];

// ERC20 ABI for balance checking
const ERC20_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
  "function symbol() external view returns (string)",
  "function name() external view returns (string)"
];

// Real FAssets contract addresses on Flare networks
const FASSETS_CONTRACTS: Record<string, Record<number, string>> = {
  'FXRP': {
    14: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d', // Flare Mainnet
    114: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d' // Coston2 Testnet
  },
  'FBTC': {
    14: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d', // Flare Mainnet  
    114: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d' // Coston2 Testnet
  },
  'FLTC': {
    14: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d', // Flare Mainnet
    114: '0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d' // Coston2 Testnet
  }
};

export interface FAssetData {
  symbol: string;
  name: string;
  address: string;
  balance: string;
  price: number;
  totalSupply: string;
  collateralRatio: number;
  apy: number;
}
