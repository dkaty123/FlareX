
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


export class VoiceAssistantService {
  classifyIntent(transcript: string): DeFiQuery {
    const text = transcript.toLowerCase();
    
    // FAssets specific queries
    if (text.includes('fassets') || text.includes('f-assets')) {
      return {
        intent: 'fassets_info',
        entities: {},
        response: 'FAssets lets you use real Bitcoin, XRP, and Litecoin on Flare as FBTC, FXRP, and FLTC. You can stake them for yield or use them in DeFi protocols while keeping exposure to the underlying assets.'
      };
    }

    // FTSO specific queries
    if (text.includes('ftso') || text.includes('oracle') || text.includes('price oracle')) {
      return {
        intent: 'ftso_info',
        entities: {},
        response: 'FTSO provides decentralized price feeds every 3 seconds with over 100 independent data providers. It supports 47 different price pairs with sub-second latency and high accuracy.'
      };
    }

    // State Connector queries
    if (text.includes('state connector') || text.includes('cross chain') || text.includes('verify')) {
      return {
        intent: 'state_connector',
        entities: {},
        response: 'State Connector verifies events from other blockchains on Flare. It can prove Bitcoin transactions, Ethereum events, or XRP ledger data without trust assumptions.'
      };
    }

    // Flare Data Connector queries
    if (text.includes('data connector') || text.includes('fdc') || text.includes('real world data')) {
      return {
        intent: 'data_connector',
        entities: {},
        response: 'Flare Data Connector brings real-world data on-chain, including weather, sports scores, economic indicators, and API data. This enables smart contracts to react to external events.'
      };
    }

    // APY/Yield queries
    if (text.includes('apy') || text.includes('yield') || text.includes('staking')) {
      const token = this.extractToken(text);
      if (token) {
        const tokenData = MOCK_TOKEN_DATA[token.toUpperCase()];
        return {
          intent: 'apy_query',
          entities: { token },
          response: `${token.toUpperCase()} staking currently offers ${tokenData?.apy || 'unknown'}% APY. This includes base rewards plus additional FAssets protocol incentives and delegation rewards.`
        };
      }
      return {
        intent: 'general_apy',
        entities: {},
        response: 'Current Flare ecosystem yields: FXRP offers 12.5%, FBTC offers 8.7%, FLTC offers 15.2%, and FLR delegation offers 6.8% APY. These rates include protocol rewards and delegation incentives.'
      };
    }

    // Price queries
    if (text.includes('price') || text.includes('cost')) {
      const token = this.extractToken(text);
      if (token) {
        const tokenData = MOCK_TOKEN_DATA[token.toUpperCase()];
        return {
          intent: 'price_query',
          entities: { token },
          response: `${token.toUpperCase()} is currently priced at $${tokenData?.price?.toFixed(4) || 'unknown'}. All Flare prices come from FTSO decentralized oracles updated every 3 seconds.`
        };
      }
      return {
        intent: 'general_price',
        entities: {},
        response: 'Current FTSO prices: FLR $0.0234, FXRP $0.6234, FBTC $43,521.90, FLTC $72.45. All prices verified by 100+ independent data providers.'
      };
    }

    // Bridge queries
    if (text.includes('bridge') || text.includes('layerzero')) {
      return {
        intent: 'bridge_info',
        entities: {},
        response: 'FlareSync supports LayerZero bridging to Ethereum, Polygon, Avalanche, BNB Chain, and Arbitrum. Bridge time averages 2-5 minutes with automatic verification.'
      };
    }

    // Random number queries
    if (text.includes('random') || text.includes('rng') || text.includes('lottery')) {
      return {
        intent: 'random_info',
        entities: {},
        response: 'Flare provides cryptographically secure random numbers every 90 seconds using commit-reveal schemes from 100+ validators. Perfect for fair gaming and DeFi lottery systems.'
      };
    }

    // Help/General queries
    if (text.includes('help') || text.includes('what can') || text.includes('how to')) {
      return {
        intent: 'help',
        entities: {},
        response: 'I can help with FAssets trading, FTSO price feeds, State Connector proofs, Data Connector APIs, yield strategies, and bridging. Ask about specific protocols or say what you want to do!'
      };
    }

    // Default response
    return {
      intent: 'unknown',
      entities: {},
      response: "I can help with Flare protocols like FAssets, FTSO, State Connector, and Data Connector. Try asking about yields, prices, or specific features!"
    };
  }

  private extractToken(text: string): string | null {
    const tokens = ['fxrp', 'fbtc', 'fltc', 'flr', 'eth', 'btc', 'xrp'];
    for (const token of tokens) {
      if (text.includes(token)) {
        return token;
      }
    }
    return null;
  }

}
