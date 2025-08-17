function ConfirmModal({ isOpen, title, message, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 
                   transform transition-all duration-200 ease-out scale-100 opacity-100"
      >
        {/* Title */}
        {title && (
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {title}
          </h3>
        )}

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 sm:px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                       text-gray-700 dark:text-gray-200 text-sm font-medium 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 sm:px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-medium 
                       shadow-md hover:bg-red-700 active:scale-95 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
