import React from 'react';
import { Check, HelpCircle } from 'lucide-react';
import Button from './common/Button';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Startup',
      description: 'Perfect for new businesses accepting crypto payments',
      price: '0.5%',
      features: [
        'Up to $10,000 monthly volume',
        '10 cryptocurrencies supported',
        'Standard payment page',
        'Email support',
        'Basic analytics',
        'Webhook notifications',
        'Manual settlements'
      ],
      popular: false
    },
    {
      name: 'Business',
      description: 'For growing businesses with increasing payment volume',
      price: '0.4%',
      features: [
        'Up to $100,000 monthly volume',
        '30+ cryptocurrencies supported',
        'Customizable payment page',
        'Priority email & chat support',
        'Advanced analytics & reporting',
        'Multi-user accounts',
        'Automatic settlements'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for high-volume businesses',
      price: 'Custom',
      features: [
        'Unlimited processing volume',
        '50+ cryptocurrencies supported',
        'Fully white-labeled solution',
        'Dedicated account manager',
        'Custom integration support',
        'Multi-signature security',
        'Priority settlements'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300">
            No hidden fees. No monthly charges. Only pay for what you use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border transition-all hover:transform hover:-translate-y-1 ${
                plan.popular
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 relative z-10'
                  : 'border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-sm font-medium py-1 px-3 text-center">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 ml-2">per transaction</span>
                  )}
                </div>
                <Button
                  variant={plan.popular ? 'default' : 'outline'}
                  className="w-full justify-center mb-8"
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </Button>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-indigo-500/10 p-2 rounded-full mr-4">
              <HelpCircle className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Need a custom solution?</h4>
              <p className="text-gray-300 mb-4">
                We offer tailored plans for businesses with unique requirements. Our team will work with you to create a custom plan that fits your needs.
              </p>
              <Button variant="ghost" className="text-indigo-400 hover:text-indigo-300">
                Contact our sales team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;