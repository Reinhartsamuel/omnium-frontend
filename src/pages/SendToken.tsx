import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseUnits } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { ArrowLeft, Send, Wallet, Search } from 'lucide-react';
import { ConnectButton } from '@xellar/kit';

const savedContacts = [
  {
    name: 'Mom',
    address: '0x1234567890123456789012345678901234567890',
    color: 'bg-pink-500'
  },
  {
    name: 'Alex',
    address: '0x2345678901234567890123456789012345678901',
    color: 'bg-blue-500'
  },
  {
    name: 'Bob',
    address: '0x3456789012345678901234567890123456789012',
    color: 'bg-green-500'
  }
];

function SendToken() {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { writeContractAsync, isPending } = useWriteContract();

  const handleTransfer = async () => {
    try {
      await writeContractAsync({
        abi: erc20Abi,
        address: '0x2f8E8c18e66059e2C4e1D43A980B346C46109B28',
        functionName: 'transfer',
        args: [recipientAddress as `0x${string}`, parseUnits(amount, 2)],
      });
      navigate('/app');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const filteredContacts = savedContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/app')}
                className="flex items-center text-white hover:text-indigo-400 transition-colors"
              >
                <ArrowLeft className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">Send Token</span>
              </button>
            </div>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 pt-20 pb-24">
        {/* Transfer Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Send className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Send IDRX</h2>
          <p className="text-white/80 text-center text-sm mb-4">Transfer tokens to any wallet address</p>
        </div>

        {/* Saved Contacts */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Saved Contacts</h3>
            <div className="relative flex-1 max-w-[200px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search contacts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {filteredContacts.map((contact) => (
              <button
                key={contact.address}
                onClick={() => setRecipientAddress(contact.address)}
                className={`p-3 rounded-xl ${recipientAddress === contact.address ? 'bg-indigo-600' : 'bg-slate-800/40 hover:bg-slate-800/60'} transition-colors flex flex-col items-center`}
              >
                <div className={`w-12 h-12 rounded-full ${contact.color} flex items-center justify-center text-white font-medium text-lg mb-2`}>
                  {contact.name[0]}
                </div>
                <span className="text-white text-sm font-medium">{contact.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Recipient Address</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-medium">IDRX</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-16 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleTransfer}
            disabled={isPending || !amount || !recipientAddress}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400/50 disabled:cursor-not-allowed py-3.5 rounded-lg font-medium text-white transition-colors flex items-center justify-center space-x-2"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Confirming...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Token</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SendToken;