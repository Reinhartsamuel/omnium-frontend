import React from 'react';
import { Shield, Code, Zap, RefreshCw, Globe, CreditCard, Lock, Wallet } from 'lucide-react';
import FeatureCard from './common/FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-indigo-400" />,
      title: 'Enterprise Security',
      description: 'Industry-leading security protocols with multi-signature wallets and cold storage solutions.'
    },
    {
      icon: <Code className="h-10 w-10 text-indigo-400" />,
      title: 'Simple Integration',
      description: 'Integrate with just a few lines of code using our powerful API and SDK libraries.'
    },
    {
      icon: <Zap className="h-10 w-10 text-indigo-400" />,
      title: 'Lightning Fast',
      description: 'Process thousands of transactions per second with our optimized blockchain infrastructure.'
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-indigo-400" />,
      title: 'Auto Conversion',
      description: 'Automatically convert crypto to fiat currency to protect against market volatility.'
    },
    {
      icon: <Globe className="h-10 w-10 text-indigo-400" />,
      title: 'Global Support',
      description: 'Accept payments from customers worldwide with multi-currency support.'
    },
    {
      icon: <CreditCard className="h-10 w-10 text-indigo-400" />,
      title: 'Fiat On-Ramp',
      description: 'Let your customers easily purchase crypto with credit cards and bank transfers.'
    },
    {
      icon: <Lock className="h-10 w-10 text-indigo-400" />,
      title: 'Compliance Ready',
      description: 'Built-in KYC and AML tools to keep your business compliant with regulations.'
    },
    {
      icon: <Wallet className="h-10 w-10 text-indigo-400" />,
      title: 'Custodial Services',
      description: 'Optional custodial services for businesses that need secure wallet management.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Businesses of All Sizes
          </h2>
          <p className="text-xl text-gray-300">
            From startups to enterprises, our payment gateway scales with your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={index < 4 ? 'md:transform md:hover:-translate-y-2' : 'md:transform md:hover:-translate-y-2'}
            />
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Powerful API, Simple Integration
              </h3>
              <p className="text-gray-300 mb-6">
                Our developer-first approach makes crypto payments integration straightforward. Get up and running in minutes with comprehensive docs and support.
              </p>
              <div className="flex items-center text-sm text-gray-400 space-x-8">
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Global CDN</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-slate-800/60 rounded-lg p-4 font-mono text-sm text-gray-300 shadow-inner">
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <div className="flex space-x-1 mr-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <span>Terminal</span>
              </div>
              <pre className="space-y-2">
                {/* <code className="block">
                  <span className="text-green-400">$</span> npm install <span className="text-indigo-400">cryptogate-js</span>
                </code>
                <code className="block">
                  <span className="text-gray-500"># Initialize the payment gateway</span>
                </code>
                <code className="block">
                  <span className="text-purple-400">import</span> CryptoGate <span className="text-purple-400">from</span> <span className="text-green-400">'cryptogate-js'</span>;
                </code>
                <code className="block">
                  <span className="text-blue-400">const</span> gateway = <span className="text-purple-400">new</span> CryptoGate({
                </code>
                <code className="block pl-2">
                  apiKey: <span className="text-green-400">'your_api_key'</span>,
                </code>
                <code className="block pl-2">
                  environment: <span className="text-green-400">'production'</span>
                </code>
                <code className="block">
                  });
                </code>
                <code className="block">
                  <span className="text-gray-500"># Create a payment session</span>
                </code>
                <code className="block">
                  <span className="text-blue-400">const</span> session = <span className="text-purple-400">await</span> gateway.createSession({
                  <code className="block pl-2">
                    amount: <span className="text-orange-400">100</span>,
                  </code>
                  <code className="block pl-2">
                    currency: <span className="text-green-400">'USD'</span>,
                  </code>
                  <code className="block pl-2">
                    redirectUrl: <span className="text-green-400">'https://your-site.com/success'</span>
                  </code>
                  });
                </code> */}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;