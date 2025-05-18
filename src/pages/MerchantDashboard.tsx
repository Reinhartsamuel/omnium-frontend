import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import CustomWalletButton from '../components/common/CustomWalletButton'
import { ApiKeyModal } from '../components/dashboard/ApiKeyModal'
import { DeleteConfirmationModal } from '../components/dashboard/DeleteConfirmationModal'
import { formatUnits } from 'viem'
import { supabase } from '../configs/supabase'

interface ApiKey {
  created_at: string
  address: string
  api_key: string
  api_key_name: string
}

interface Order {
  id: string
  created_at: string
  seller: string
  price: bigint
  status: 'CREATED' | 'FAILED' | 'PAID'
  product: string
}

const MerchantDashboard = () => {
  const { isConnected, address } = useAccount()
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)


  const fetchApiKeys = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('merchants_api')
        .select('*')
        .eq('address', address)

      if (error) throw error
      setApiKeys(data || [])
    } catch (error) {
      console.error('Error fetching API keys:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      if (!address) return

      setOrdersLoading(true)
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('seller', address)
          .order('created_at', { ascending: false })
          .limit(5)
        console.log(data)

        if (error) throw error
        setOrders(data || [])
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchRecentTransactions()
    fetchApiKeys()
  }, [address])

  const handleDeleteKey = (apiKey: string) => {
    setDeleteKeyId(apiKey)
  }

  const confirmDelete = async () => {
    if (!deleteKeyId || !address) return

    try {
      const { error } = await supabase
        .from('merchants_api')
        .delete()
        .eq('api_key', deleteKeyId)
        .eq('address', address)

      if (error) throw error

      setApiKeys(apiKeys.filter(key => key.api_key !== deleteKeyId))
      setDeleteKeyId(null)
    } catch (error) {
      console.error('Error deleting API key:', error)
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
          <TotalOrders address={address} />
          <PaidOrders address={address} />
          <Revenue address={address} />
          <AverageValue address={address} />
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
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : (
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
                      <tr key={key.api_key} className="border-b border-slate-800">
                        <td className="py-4 text-slate-300">{key.api_key_name}</td>
                        <td className="py-4 text-slate-300">{key.api_key}</td>
                        <td className="py-4 text-slate-300">
                          {new Date(key.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleDeleteKey(key.api_key)}
                            className="text-red-500 hover:text-red-400 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
            </div>

            <div className="overflow-x-auto">
              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  No transactions found
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Amount (IDRX)</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-slate-800">
                        <td className="py-4 text-slate-300">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-slate-300">{order.product}</td>
                        <td className="py-4 text-slate-300">
                          IDRX {order.price ? Number(formatUnits(order.price as bigint, 2)).toLocaleString() : '0'}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'PAID'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'CREATED'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* New API Key Modal */}

      {/* API Keys Table */}


      {/* Modals */}
      {showNewKeyModal && (
        <ApiKeyModal
          onClose={() => setShowNewKeyModal(false)}
          fetchApiKeys={fetchApiKeys}
        />
      )}

      {deleteKeyId && (
        <DeleteConfirmationModal
          keyName={apiKeys.find(k => k.api_key === deleteKeyId)?.api_key_name || ''}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteKeyId(null)}
        />
      )}
    </div>
  )
}

export default MerchantDashboard




const TotalOrders = ({ address }: { address: string | undefined }) => {
  const [totalOrders, setTotalOrders] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const countTotalOrders = async () => {
      if (!address) return;
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*', { count: 'exact' })
          .eq('seller', address)
        if (error) throw error
        setTotalOrders(data?.length || 0)
      } catch (error) {
        console.error('Error fetching total orders:', error)
      } finally {
        setIsLoading(false)
      }
    }
    countTotalOrders()
  }, [])
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
      <h3 className="text-sm font-medium text-slate-400">Total Orders</h3>
      {isLoading ? (
        <div className="mt-2 flex justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        <p className="mt-2 text-3xl font-semibold text-white">
          {totalOrders} 
        </p>
      )}
    </div>
  )
}
const PaidOrders = ({ address }: { address: string | undefined }) => {
  const [totalOrders, setTotalOrders] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const countTotalOrders = async () => {
      if (!address) return;
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*', { count: 'exact' })
          .eq('seller', address)
          .eq('status', 'PAID')
        if (error) throw error
        setTotalOrders(data?.length || 0)
      } catch (error) {
        console.error('Error fetching total orders:', error)
      } finally {
        setIsLoading(false)
      }
    }
    countTotalOrders()
  }, [])
  return (
    <>
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
        <h3 className="text-sm font-medium text-slate-400">Paid Orders</h3>
        {isLoading ? (
          <div className="mt-2 flex justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        ) : (
          <p className="mt-2 text-3xl font-semibold text-white">
            {totalOrders} 
          </p>
        )}
      </div>
    </>
  )
}
const Revenue = ({ address }: { address: string | undefined }) => {
  const [revenue, setRevenue] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRevenue = async () => {
      if (!address) return

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('price')
          .eq('seller', address)
          .eq('status', 'PAID')

        if (error) throw error

        const totalRevenue = data?.reduce((sum, order) => {
          const price = Number(formatUnits(order.price as bigint, 2))
          return sum + price
        }, 0) || 0

        setRevenue(totalRevenue)
      } catch (error) {
        console.error('Error fetching revenue:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRevenue()
  }, [address])

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
      <h3 className="text-sm font-medium text-slate-400">Revenue</h3>
      {isLoading ? (
        <div className="mt-2 flex justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        <p className="mt-2 text-3xl font-semibold text-white">
          {revenue.toLocaleString()} IDRX
        </p>
      )}
    </div>
  )
}

const AverageValue = ({ address }: { address: string | undefined }) => {
  const [average, setAverage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAverageValue = async () => {
      if (!address) return

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('price')
          .eq('seller', address)
          .eq('status', 'PAID')

        if (error) throw error

        if (data && data.length > 0) {
          const totalValue = data.reduce((sum, order) => {
            const price = Number(formatUnits(order.price as bigint, 2))
            return sum + price
          }, 0)
          setAverage(totalValue / data.length)
        }
      } catch (error) {
        console.error('Error fetching average value:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAverageValue()
  }, [address])

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800 p-6">
      <h3 className="text-sm font-medium text-slate-400">Average Value</h3>
      {isLoading ? (
        <div className="mt-2 flex justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        <p className="mt-2 text-3xl font-semibold text-white">
          {average.toLocaleString()} IDRX
        </p>
      )}
    </div>
  )
}