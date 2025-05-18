import { useState } from 'react'
import { useAccount } from 'wagmi';


interface ApiKeyModalProps {
  onClose: () => void
  fetchApiKeys : () => void
}


export const ApiKeyModal = ({ onClose, fetchApiKeys }: ApiKeyModalProps) => {
  const [keyName, setKeyName] = useState('');
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!keyName) return alert('Please enter a key name');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/generate-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key_name: keyName,
          address,
        })
      });

      const result = await res.json();
      console.log(result);
      fetchApiKeys();

      
      onClose();
      setKeyName('')
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-white mb-6">Create New API Key</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="keyName" className="block text-sm font-medium text-slate-400 mb-2">
              Key Name
            </label>
            <input
              id="keyName"
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Enter a name for your API key"
              className="w-full bg-slate-800 border-0 rounded-lg text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!keyName.trim() || isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {
                isLoading ?
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> :
                  'Create Key'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}