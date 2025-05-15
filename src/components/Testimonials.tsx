import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Integrating CryptoGate was incredibly simple. We were up and running in less than a day, and our crypto payment volume has increased by 200% since we made the switch.",
      author: "Sarah Johnson",
      title: "CTO, DigitalEdge",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stats: [
        { label: 'Conversion Rate', value: '+45%' },
        { label: 'Transaction Volume', value: '$2.8M' }
      ]
    },
    {
      quote: "CryptoGate's API is the most developer-friendly I've ever worked with. The documentation is clear, support is responsive, and everything just works as expected.",
      author: "Michael Chen",
      title: "Lead Developer, BlockFi",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stats: [
        { label: 'Integration Time', value: '2 Days' },
        { label: 'API Uptime', value: '99.99%' }
      ]
    },
    {
      quote: "The automatic conversion to fiat has been a game-changer for our business. We can accept crypto without worrying about market volatility, and our finance team loves it.",
      author: "Emily Rodriguez",
      title: "CFO, NexusPay",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      stats: [
        { label: 'Settlement Speed', value: 'Same Day' },
        { label: 'Processing Fees', value: '-30%' }
      ]
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Innovative Companies
          </h2>
          <p className="text-xl text-gray-300">
            See what our customers have to say
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 shadow-xl">
            <div className="absolute top-8 left-8 text-indigo-400 opacity-30">
              <Quote className="h-16 w-16" />
            </div>
            
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl text-gray-200 font-medium mb-8 relative z-10">
                "{current.quote}"
              </blockquote>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <img
                    src={current.image}
                    alt={current.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="text-white font-semibold">{current.author}</div>
                    <div className="text-gray-400">{current.title}</div>
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  {current.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-indigo-400 font-bold text-xl">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-slate-800 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'bg-indigo-500 w-4'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="bg-slate-800 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {['CompanyOne', 'CompanyTwo', 'CompanyThree', 'CompanyFour', 'CompanyFive', 'CompanySix', 'CompanySeven', 'CompanyEight'].map((company, index) => (
            <div
              key={index}
              className="bg-slate-800/40 rounded-lg h-20 flex items-center justify-center border border-slate-700/50 filter grayscale hover:grayscale-0 transition-all hover:border-slate-600/50"
            >
              <div className="text-gray-400 font-medium">{company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;