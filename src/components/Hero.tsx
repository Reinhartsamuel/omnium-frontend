import { ArrowRight, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 lg:pr-12 space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block mb-2">Start Accept IDRX</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-purple-500">
                In Minutes, Not Months
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              No hassle, no stress, 3 simple steps, start accept IDRX for your business. Fast, cheap & secured by Lisk blockchain
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group text-lg py-3 px-8" onClick={() => navigate('/merchant')}>
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" className="group md:hidden text-lg py-3 px-8" onClick={() => window.open('/app')}>
                Open App
              </Button>
              <Button variant="outline" size="lg" className="text-lg py-3 px-8" onClick={() => window.open('https://github.com/Reinhartsamuel/omnium-frontend')}>
                View Documentation
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                <span className="text-gray-300">Enterprise-grade security</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-500" />
                <span className="text-gray-300">Lightning-fast settlement</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-6 w-6 text-blue-500" />
                <span className="text-gray-300">99.99% uptime</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-10 animate-pulse"></div>
              <img
                  src="/OmniumQrExample.jpg"
                  alt="Omnium QR Code Example"
                  className="w-full rounded-xl shadow-2xl"
                />
              {/* <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-medium text-white">Payment Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-700/50 p-6 rounded-xl">
                      <div className="flex justify-between mb-4">
                        <span className="text-gray-400 text-lg">Today's Volume</span>
                        <span className="text-white font-medium text-xl">IDRX 12,438.28</span>
                      </div>
                      <div className="w-full bg-slate-600/50 h-3 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-slate-700/50 p-6 rounded-xl">
                        <div className="text-gray-400 text-lg mb-2">Bitcoin</div>
                        <div className="font-medium text-white text-xl">3.28 BTC</div>
                      </div>
                      <div className="bg-slate-700/50 p-6 rounded-xl">
                        <div className="text-gray-400 text-lg mb-2">Ethereum</div>
                        <div className="font-medium text-white text-xl">18.54 ETH</div>
                      </div>
                    </div>
                    <div className="bg-slate-700/50 p-6 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-gray-400 text-lg">Conversion Rate</div>
                        <div className="font-medium text-white text-xl">98.2%</div>
                      </div>
                      <div className="text-green-400 flex items-center text-lg">
                        <span>+2.4%</span>
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;