interface DeleteConfirmationModalProps {
  keyName: string
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal = ({ keyName, onConfirm, onCancel }: DeleteConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-white mb-4">Delete API Key</h3>
        <p className="text-slate-300 mb-6">
          Are you sure you want to delete the API key "{keyName}"? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-400 hover:text-slate-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}