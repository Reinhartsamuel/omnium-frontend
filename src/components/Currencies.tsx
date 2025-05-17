import { ShieldCheck, Banknote, Zap, Wallet, Key } from 'lucide-react';

const Currencies: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Accept IDRX Payments
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            The first Indonesian Rupiah ERC20 stablecoin for seamless digital transactions
          </p>
          <div className="flex justify-center mb-12">
            <img
              src="https://home.idrx.co/_next/image?url=%2Fassets%2Fidrx-logo-horizontal.png&w=1200&q=75"
              alt="IDRX Logo"
              className="w-40 object-contain"
            />
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Secured by Lisk Network
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            One of the largest Layer-2 Solution for Ethereum Blockchain
          </p>
          <div className="flex justify-center mb-12">
            <img
              src="https://www.stockvault.net/data/2018/04/01/244016/preview16.jpg"
              alt="IDRX Logo"
              className="w-40 object-contain"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center">
            <div className="bg-indigo-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Secure & Stable</h3>
            <p className="text-gray-300">
              1 IDRX = 1 IDR, fully backed and regulated for secure transactions
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center">
            <div className="bg-indigo-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Banknote className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Low Fees</h3>
            <p className="text-gray-300">
              Minimize transaction costs with efficient blockchain-based payments
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center">
            <div className="bg-indigo-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Instant Settlement</h3>
            <p className="text-gray-300">
              Real-time payment processing with immediate confirmation
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center bg-indigo-500/10 px-6 py-2 rounded-full text-indigo-400 font-medium text-sm mb-6">
            Powered by Ethereum
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to Accept IDRX Payments?
          </h3>
          <p className="text-gray-300 mb-8">
            Join the future of digital payments with IDRX - the bridge between traditional finance and blockchain technology.
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Currencies;