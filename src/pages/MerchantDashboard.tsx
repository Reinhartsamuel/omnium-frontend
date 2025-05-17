import { useState } from 'react'
import { useAccount } from 'wagmi'
import CustomWalletButton from '../components/common/CustomWalletButton'
import { ApiKeyModal } from '../components/dashboard/ApiKeyModal'
import { DeleteConfirmationModal } from '../components/dashboard/DeleteConfirmationModal'

const MerchantDashboard = () => {
  const { address, isConnected } = useAccount()
  const [dateRange, setDateRange] = useState('today')
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production Key', key: 'pk_live_123...abc', created: '2024-01-20' },
    { id: '2', name: 'Test Key', key: 'pk_test_456...xyz', created: '2024-01-19' }
  ])

  const handleCreateKey = () => {
    if (!newKeyName) return
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `pk_${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0]
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    setShowNewKeyModal(false)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const confirmDelete = () => {
    if (deleteKeyId) {
      setApiKeys(apiKeys.filter(key => key.id !== deleteKeyId))
      setDeleteKeyId(null)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-white mb-8">My Dashboard</h1>
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-8 max-w-md w-full text-center">
          <h2 className="text-xl text-slate-300 mb-6">Connect your wallet to access the merchant dashboard</h2>
          <CustomWalletButton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/omniumlogohorizontal-removebg-preview.png"
                alt="Omnium"
              />
              <span className="ml-2 text-white font-semibold">My Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <CustomWalletButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
            <h3 className="text-sm font-medium text-slate-400">Total Orders</h3>
            <p className="mt-2 text-3xl font-semibold text-white">1,234</p>
            <p className="mt-1 text-sm text-green-500">+12.3% from last period</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
            <h3 className="text-sm font-medium text-slate-400">Paid Orders</h3>
            <p className="mt-2 text-3xl font-semibold text-white">1,198</p>
            <p className="mt-1 text-sm text-green-500">+5.3% from last period</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
            <h3 className="text-sm font-medium text-slate-400">Revenue</h3>
            <p className="mt-2 text-3xl font-semibold text-white">$12,345.67</p>
            <p className="mt-1 text-sm text-green-500">+15.2% from last period</p>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
            <h3 className="text-sm font-medium text-slate-400">Average Value</h3>
            <p className="mt-2 text-3xl font-semibold text-white">$123.45</p>
            <p className="mt-1 text-sm text-red-500">-2.1% from last period</p>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">API Keys</h2>
              <button
                onClick={() => setShowNewKeyModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Create New Key
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Key</th>
                    <th className="pb-3 font-medium">Created</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {apiKeys.map(key => (
                    <tr key={key.id} className="border-b border-slate-800">
                      <td className="py-4 text-slate-300">{key.name}</td>
                      <td className="py-4 text-slate-300">{key.key}</td>
                      <td className="py-4 text-slate-300">{key.created}</td>
                      <td className="py-4">
                        <button
                          onClick={() => handleDeleteKey(key.id)}
                          className="text-red-500 hover:text-red-400 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-slate-800 border-0 rounded-lg text-sm text-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                    <th className="pb-3 font-medium">Transaction ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-800">
                    <td className="py-4 text-slate-300">#TX123456</td>
                    <td className="py-4 text-slate-300">2024-01-20 14:30</td>
                    <td className="py-4 text-slate-300">0x1234...5678</td>
                    <td className="py-4 text-slate-300">$100.00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">Success</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 text-slate-300">#TX123455</td>
                    <td className="py-4 text-slate-300">2024-01-20 14:25</td>
                    <td className="py-4 text-slate-300">0x9876...4321</td>
                    <td className="py-4 text-slate-300">$50.00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-500">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-slate-300">#TX123454</td>
                    <td className="py-4 text-slate-300">2024-01-20 14:20</td>
                    <td className="py-4 text-slate-300">0x5432...8765</td>
                    <td className="py-4 text-slate-300">$75.00</td>
                    <td className="py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-500">Failed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* New API Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Create New API Key</h3>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter key name"
              className="w-full bg-slate-800 border-0 rounded-lg text-white px-4 py-2 mb-4 focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewKeyModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MerchantDashboard