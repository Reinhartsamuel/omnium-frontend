import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Button from './common/Button';

const Cta: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-indigo-500/20 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-2/3 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Accept Crypto Payments?
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Join thousands of businesses already using CryptoGate to accept cryptocurrency payments globally.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">No setup fees or monthly charges</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">10-minute integration</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">50+ cryptocurrencies supported</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">24/7 customer support</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block md:w-1/3 md:border-l border-slate-700 md:pl-8 mt-8 md:mt-0">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">14 days</div>
                <p className="text-gray-400 mb-6">Free trial with full access</p>
                
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <p className="text-gray-400 mb-6">Merchants onboarded</p>
                
                <div className="text-4xl font-bold text-white mb-2">$2B+</div>
                <p className="text-gray-400">Processed annually</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;