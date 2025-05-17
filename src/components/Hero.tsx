import { ArrowRight, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <span className="block">Accept Crypto Payments</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                In Minutes, Not Months
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The easiest way to accept Bitcoin, Ethereum, and 50+ cryptocurrencies in your app or website. No code required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="group" onClick={() =>navigate('/merchant')}>
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" className="group" onClick={() =>window.open('/app')}>
                Open App
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/Reinhartsamuel/omnium-frontend')}>
                View Documentation
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center text-sm text-gray-400">
              <div className="flex items-center mb-4 sm:mb-0 sm:mr-8">
                <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center mb-4 sm:mb-0 sm:mr-8">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Lightning-fast settlement</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-blue-500 mr-2" />
                <span>99.99% uptime</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">Payment Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Today's Volume</span>
                        <span className="text-white font-medium">$12,438.28</span>
                      </div>
                      <div className="w-full bg-slate-600/50 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Bitcoin</div>
                        <div className="font-medium text-white">3.28 BTC</div>
                      </div>
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Ethereum</div>
                        <div className="font-medium text-white">18.54 ETH</div>
                      </div>
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-gray-400 text-sm">Conversion Rate</div>
                        <div className="font-medium text-white">98.2%</div>
                      </div>
                      <div className="text-green-400 flex items-center text-sm">
                        <span>+2.4%</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;