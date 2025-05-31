
interface DeFiQuery {
  intent: string;
  entities: Record<string, string>;
  response: string;
}

interface TokenInfo {
  symbol: string;
  apy: number;
  price: number;
  tvl: string;
}

const MOCK_TOKEN_DATA: Record<string, TokenInfo> = {
  FXRP: { symbol: 'FXRP', apy: 12.5, price: 0.6234, tvl: '$2.4M' },
  FBTC: { symbol: 'FBTC', apy: 8.7, price: 43521.90, tvl: '$15.6M' },
  FLTC: { symbol: 'FLTC', apy: 15.2, price: 72.45, tvl: '$1.2M' },
  FLR: { symbol: 'FLR', apy: 6.8, price: 0.0234, tvl: '$45.8M' }
};

  getRandomTip(): string {
    const tips = [
      "FAssets let you use real Bitcoin as FBTC on Flare with up to 8.7% APY while keeping BTC exposure.",
      "FTSO oracles update prices every 3 seconds using 100+ independent data providers for maximum accuracy.",
      "State Connector can verify any Bitcoin transaction or Ethereum event directly on Flare without bridges.",
      "Flare Data Connector brings real-world APIs on-chain - weather, sports, economic data, and more.",
      "You can stake FXRP in multiple yield strategies while maintaining exposure to XRP price movements.",
      "Secure random numbers on Flare use commit-reveal schemes for provably fair gaming and lotteries.",
      "LayerZero bridging connects Flare to 5+ major chains with 2-5 minute settlement times.",
      "FLR delegation rewards compound automatically while supporting network decentralization."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  }
}
