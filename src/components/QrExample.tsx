import { Banknote, Wallet, Key } from 'lucide-react';

const QrExample: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Seriously, it's just 3 simple steps
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
            <div className="space-y-16">
              <div className="flex items-start gap-8 group hover:bg-slate-800/30 p-6 rounded-xl transition-all duration-300">
                <div className="bg-indigo-500/10 p-4 rounded-xl w-20 h-20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <Wallet className="h-10 w-10 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-white mb-3">1. Connect Wallet</h3>
                  <p className="text-gray-300 text-lg">Connect your wallet to get started with IDRX payments</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group hover:bg-slate-800/30 p-6 rounded-xl transition-all duration-300">
                <div className="bg-indigo-500/10 p-4 rounded-xl w-20 h-20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <Key className="h-10 w-10 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-white mb-3">2. Get API Key</h3>
                  <p className="text-gray-300 text-lg">Generate your unique API key for secure integration</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group hover:bg-slate-800/30 p-6 rounded-xl transition-all duration-300">
                <div className="bg-indigo-500/10 p-4 rounded-xl w-20 h-20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-all duration-300">
                  <Banknote className="h-10 w-10 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-white mb-3">3. Start Collecting IDRX</h3>
                  <p className="text-gray-300 text-lg">Begin accepting IDRX payments from your customers</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6">
                <img
                  src="/OmniumQrExample.jpg"
                  alt="Omnium QR Code Example"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrExample;