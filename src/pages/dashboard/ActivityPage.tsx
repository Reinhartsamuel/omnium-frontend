import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Navbar from '../../components/dashboard/Navbar';
import BottomBar from '../../components/dashboard/BottomBar';

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value: string | number | any[];
        }>;
    };
}

function ActivityPage() {
    const { address } = useAccount();
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (!address) return;
            try {
                setIsLoading(true);
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

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString();
    };

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />
            <div className="max-w-md mx-auto px-4 pt-20 pb-24">
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
                    <h1 className="text-2xl font-bold text-white mb-4">Activity</h1>
                    
                    {!address  ?  
                    
                    <div className="text-slate-400 text-center py-8">Connect Your Wallet!</div>
                    
                    :
                    isLoading ? (
                        <div className="text-slate-400 text-center py-8">Loading transactions...</div>
                    ) : transactions.length === 0 ? (
                        <div className="text-slate-400 text-center py-8">No transactions found</div>
                    ) : (
                        <div className="space-y-4">
                            {transactions.map((tx) => (
                                <div 
                                    key={tx.hash}
                                    className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm font-medium text-indigo-400">
                                            {tx.method}
                                        </div>
                                        <div className="text-sm text-slate-400 shrink-0 ml-2">
                                            {formatDate(tx.timestamp)}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm gap-2">
                                            <span className="text-slate-400 shrink-0 w-12">From:</span>
                                            <span className="text-slate-300 truncate">{shortenAddress(tx.from.hash)}</span>
                                        </div>
                                        <div className="flex items-center text-sm gap-2">
                                            <span className="text-slate-400 shrink-0 w-12">To:</span>
                                            <span className="text-slate-300 truncate">
                                                {tx.to.name || shortenAddress(tx.to.hash)}
                                            </span>
                                        </div>
                                        
                                        {tx.decoded_input && (
                                            <div className="mt-3 pt-3 border-t border-slate-700">
                                                <div className="text-sm text-slate-400 mb-2">Parameters:</div>
                                                {tx.decoded_input.parameters.map((param, index) => (
                                                    <div key={index} className="text-sm flex items-center gap-2">
                                                        <span className="text-slate-400 shrink-0 min-w-[80px]">{param.name}:</span>
                                                        <span className="text-slate-300 truncate">
                                                            {Array.isArray(param.value) 
                                                                ? param.value.join(', ')
                                                                : param.value.toString()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700">
                                            <span className={`text-sm ${tx.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
                                                {tx.status.toUpperCase()}
                                            </span>
                                            <a 
                                                href={`https://sepolia-blockscout.lisk.com/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium shrink-0"
                                            >
                                                View on Explorer
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
 
                </div>
            </div>
            <BottomBar />
        </div>
    );
}

export default ActivityPage;