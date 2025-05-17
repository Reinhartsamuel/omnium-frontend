import { erc20Abi, formatUnits } from 'viem';
import { ConnectButton } from '@xellar/kit';
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Settings,
  MoreHorizontal,
} from 'lucide-react';
import {
  useAccount,
  useReadContract,
  useChainId,
} from 'wagmi';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../../components/dashboard/BottomBar';
import { useEffect, useState } from 'react';
import Navbar from '../../components/dashboard/Navbar';

// const transactions = [
//   {
//     id: 1,
//     type: 'received',
//     amount: 250.00,
//     currency: 'USD',
//     from: 'Alex Thompson',
//     date: '2024-03-15',
//     status: 'completed'
//   },
//   {
//     id: 2,
//     type: 'sent',
//     amount: 75.50,
//     currency: 'USD',
//     to: 'Sarah Wilson',
//     date: '2024-03-14',
//     status: 'completed'
//   },
//   {
//     id: 3,
//     type: 'received',
//     amount: 120.00,
//     currency: 'USD',
//     from: 'Mike Johnson',
//     date: '2024-03-14',
//     status: 'completed'
//   },
//   {
//     id: 4,
//     type: 'sent',
//     amount: 45.00,
//     currency: 'USD',
//     to: 'Emma Davis',
//     date: '2024-03-13',
//     status: 'completed'
//   },
//   {
//     id: 5,
//     type: 'received',
//     amount: 180.00,
//     currency: 'USD',
//     from: 'Chris Anderson',
//     date: '2024-03-13',
//     status: 'completed'
//   }
// ];
interface TransactionData {
  hash: string;
  method: string;
  timestamp: string;
  status: string;
  from: {
      hash: string;
  };
  to: {
      hash: string;
      name: string | null;
  };
  decoded_input: {
      method_call: string;
      parameters: Array<{
          name: string;
          type: string;
          value: string | number | any[];
      }>;
  };
}
function Dashboard() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    async function fetchData() {
        if (!address) return;
        try {
            const response = await fetch(`https://sepolia-blockscout.lisk.com/api/v2/addresses/${address}/transactions`);
            const data = await response.json();
            setTransactions(data.items || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchData();
}, [address]);

  const { data, isLoading: isReading } = useReadContract({
    abi: erc20Abi,
    account: address,
    address: '0xD63029C1a3dA68b51c67c6D1DeC3DEe50D681661',
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    chainId,
    query: {
      enabled: !!address,
    },
  });



  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <Navbar />

      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          {/* <ConnectButton className='mb-4' /> */}
          {/* <h2 className="text-lg font-medium mb-4">Total Balance</h2> */}
          <div className="text-4xl font-bold mb-4">
            {isReading ?
              'reading...'
              :
              ` IDRX ${data ? formatUnits(data as bigint, 2) : '0'}`
            }
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/app/send')}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center flex-1 justify-center"
            >
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
        {/* <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">My Assets</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">B</div>
                <div className="ml-3">
                  <div className="text-white">USDC</div>
                  <div className="text-sm text-gray-400">USDC</div>
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
        </div> */}

        {/* Transactions */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <button 
                onClick={() => navigate('/app/activity')}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {isLoading ? (
                <div className="text-slate-400 text-center py-4">Loading...</div>
              ) : transactions.length === 0 ? (
                <div className="text-slate-400 text-center py-4">No transactions yet</div>
              ) : (
                transactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx.hash}
                    className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${tx.method === 'payWithToken' ? 'bg-purple-500/20 text-purple-500' : 'bg-green-500/20 text-green-500'}`}>
                        {tx.method === 'payWithToken' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {tx.method}
                        </div>
                        <div className="text-xs text-slate-400">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {tx.decoded_input?.parameters[2]?.value.toString() || '0'} IDRX
                      </div>
                      <a
                        href={`https://sepolia-blockscout.lisk.com/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Navigation */}
      <BottomBar />
    </div>
  );
}

export default Dashboard;