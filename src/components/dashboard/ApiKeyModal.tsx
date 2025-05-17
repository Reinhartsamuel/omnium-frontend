import { useState } from 'react'

interface ApiKeyModalProps {
  onClose: () => void
  onSubmit: (name: string) => void
}

export const ApiKeyModal = ({ onClose, onSubmit }: ApiKeyModalProps) => {
  const [keyName, setKeyName] = useState('')

  const handleSubmit = () => {
    if (!keyName.trim()) return
    onSubmit(keyName)
    setKeyName('')
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
              disabled={!keyName.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Key
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}