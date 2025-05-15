import React, { useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import Button from './common/Button';

const Currencies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'popular' | 'all'>('popular');
  
  const popularCurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', popular: true },
    { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', popular: true },
    { symbol: 'USDT', name: 'Tether', color: '#26A17B', popular: true },
    { symbol: 'USDC', name: 'USD Coin', color: '#2775CA', popular: true },
    { symbol: 'BNB', name: 'Binance Coin', color: '#F3BA2F', popular: true },
    { symbol: 'XRP', name: 'Ripple', color: '#23292F', popular: true },
    { symbol: 'ADA', name: 'Cardano', color: '#0033AD', popular: true },
    { symbol: 'SOL', name: 'Solana', color: '#14F195', popular: true },
  ];
  
  const allCurrencies = [
    ...popularCurrencies,
    { symbol: 'DOGE', name: 'Dogecoin', color: '#C2A633', popular: false },
    { symbol: 'DOT', name: 'Polkadot', color: '#E6007A', popular: false },
    { symbol: 'AVAX', name: 'Avalanche', color: '#E84142', popular: false },
    { symbol: 'SHIB', name: 'Shiba Inu', color: '#FFA409', popular: false },
    { symbol: 'MATIC', name: 'Polygon', color: '#8247E5', popular: false },
    { symbol: 'LTC', name: 'Litecoin', color: '#345D9D', popular: false },
    { symbol: 'LINK', name: 'Chainlink', color: '#2A5ADA', popular: false },
    { symbol: 'UNI', name: 'Uniswap', color: '#FF007A', popular: false },
    { symbol: 'ATOM', name: 'Cosmos', color: '#2E3148', popular: false },
    { symbol: 'XLM', name: 'Stellar', color: '#7D00FF', popular: false },
    { symbol: 'ALGO', name: 'Algorand', color: '#000000', popular: false },
    { symbol: 'BCH', name: 'Bitcoin Cash', color: '#8DC351', popular: false },
  ];
  
  const displayCurrencies = activeTab === 'popular' ? popularCurrencies : allCurrencies;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Support for 50+ Cryptocurrencies
          </h2>
          <p className="text-xl text-gray-300">
            Accept all major cryptocurrencies and tokens with a single integration
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-800 rounded-lg">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'popular'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('popular')}
            >
              Popular
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Supported
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayCurrencies.map((currency) => (
            <div
              key={currency.symbol}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 flex flex-col items-center transition-all hover:bg-slate-700/50 hover:border-slate-600/50"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${currency.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: currency.color }}
                >
                  {currency.symbol.substring(0, 1)}
                </div>
              </div>
              <h3 className="font-medium text-white mb-1">{currency.name}</h3>
              <span className="text-sm text-gray-400">{currency.symbol}</span>
            </div>
          ))}
        </div>
        
        {activeTab === 'popular' && (
          <div className="text-center mt-10">
            <Button 
              variant="ghost" 
              className="text-indigo-400 hover:text-indigo-300 group"
              onClick={() => setActiveTab('all')}
            >
              View all supported currencies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
        
        <div className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 bg-indigo-500/10 p-3 rounded-full mb-4 md:mb-0 md:mr-6">
            <Info className="h-8 w-8 text-indigo-400" />
          </div>
          <div className="md:flex-1">
            <h3 className="text-xl font-semibold text-white mb-2 text-center md:text-left">
              Don't see your preferred cryptocurrency?
            </h3>
            <p className="text-gray-300 text-center md:text-left">
              We're constantly adding support for new cryptocurrencies. Contact our team to request a specific coin or token.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
            <Button>Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Currencies;