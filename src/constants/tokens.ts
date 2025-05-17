export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logo?: string;
  color: string;
}

export const TOKENS: { [key: string]: Token } = {
  IDRX: {
    symbol: 'IDRX',
    name: 'Indonesian Rupiah',
    address: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    decimals: 2,
    color: 'bg-green-500'
  },
  USDT: {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    color: 'bg-teal-500'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
    color: 'bg-blue-500'
  },
  DAI: {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    color: 'bg-yellow-500'
  },
  WETH: {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    color: 'bg-purple-500'
  }
};

export const DEFAULT_TOKEN = TOKENS.IDRX;
export const TOKEN_LIST = Object.values(TOKENS);
export const PAYMENT_GATEWAY_ADDRESS = "0xf422ef4e6512bfad4b67b4e22d29c8a0bf5c052c";
