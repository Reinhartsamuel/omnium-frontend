import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Home,
  Wallet,
  Settings,
  Bell,
  MoreHorizontal,
  QrCode
} from 'lucide-react';
// import BarcodeScanner from "react-qr-barcode-scanner";

const transactions = [
  {
    id: 1,
    type: 'received',
    amount: 250.00,
    currency: 'USD',
    from: 'Alex Thompson',
    date: '2024-03-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'sent',
    amount: 75.50,
    currency: 'USD',
    to: 'Sarah Wilson',
    date: '2024-03-14',
    status: 'completed'
  },
  {
    id: 3,
    type: 'received',
    amount: 120.00,
    currency: 'USD',
    from: 'Mike Johnson',
    date: '2024-03-14',
    status: 'completed'
  },
  {
    id: 4,
    type: 'sent',
    amount: 45.00,
    currency: 'USD',
    to: 'Emma Davis',
    date: '2024-03-13',
    status: 'completed'
  },
  {
    id: 5,
    type: 'received',
    amount: 180.00,
    currency: 'USD',
    from: 'Chris Anderson',
    date: '2024-03-13',
    status: 'completed'
  }
];

function Dashboard() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [data, setData] = useState("Not Found");
  const openQRScanner = async () => {
    try {
      setIsQRModalOpen(true);
      // Handle the stream in a proper QR scanner implementation
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <CreditCard className="h-8 w-8 text-indigo-500" />
                <span className="ml-2 text-xl font-bold text-white">CryptoGate</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Settings className="h-6 w-6" />
              </button>
              <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-lg font-medium mb-4">Total Balance</h2>
          <div className="text-4xl font-bold mb-4">$1,275.50</div>
          <div className="flex space-x-4">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center flex-1 justify-center">
              <ArrowUpRight className="h-5 w-5 mr-2" />
              Send
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center flex-1 justify-center">
              <ArrowDownLeft className="h-5 w-5 mr-2" />
              Request
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-4 mb-6">
          <div className="flex justify-between">
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center hover:bg-slate-800/60 transition-colors mb-1">
                <Wallet className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-xs text-white">Add</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center hover:bg-slate-800/60 transition-colors mb-1">
                <CreditCard className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-xs text-white">Cards</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center hover:bg-slate-800/60 transition-colors mb-1">
                <Settings className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-xs text-white">Settings</span>
            </button>
            <button className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center hover:bg-slate-800/60 transition-colors mb-1">
                <MoreHorizontal className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="text-xs text-white">More</span>
            </button>
          </div>
        </div>

        {/* Crypto Prices */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Crypto Prices</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">B</div>
                <div className="ml-3">
                  <div className="text-white">Bitcoin</div>
                  <div className="text-sm text-gray-400">BTC</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white">$44,250.00</div>
                <div className="text-sm text-green-500">+2.5%</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">E</div>
                <div className="ml-3">
                  <div className="text-white">Ethereum</div>
                  <div className="text-sm text-gray-400">ETH</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white">$2,890.75</div>
                <div className="text-sm text-green-500">+3.2%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800">
          <div className="p-6">
            <div className="flex flex-col space-y-4 mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${transaction.type === 'received'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-purple-500/20 text-purple-500'
                      }`}>
                      {transaction.type === 'received' ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                    </div>
                    <div className="ml-4">
                      <div className="text-white font-medium">
                        {transaction.type === 'received' ? transaction.from : transaction.to}
                      </div>
                      <div className="text-sm text-gray-400">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${transaction.type === 'received' ? 'text-green-500' : 'text-purple-500'
                      }`}>
                      {transaction.type === 'received' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">{transaction.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Scan QR Code</h3>
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-square bg-slate-800 rounded-lg overflow-hidden">
              {/* Camera feed will go here */}
              {/* <video id="qr-video" className="w-full h-full object-cover"></video> */}
              {/* <BarcodeScanner
                width={500}
                height={500}
                onUpdate={(err, result) => {
                  if (result) setData(result?.getText());
                  else setData("Not Found");
                }}
              /> */}
              <p>{data}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-md mx-auto flex justify-around py-3 relative">
          <button className="flex flex-col items-center text-indigo-500">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Wallet className="h-6 w-6" />
            <span className="text-xs mt-1">Wallet</span>
          </button>

          {/* QR Scan Button */}
          <button
            onClick={openQRScanner}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <QrCode className="h-8 w-8 text-white" />
          </button>

          <button className="flex flex-col items-center text-gray-400">
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Activity</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;