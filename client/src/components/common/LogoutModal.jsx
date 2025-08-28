import { useEffect, useCallback } from "react";

function LogoutModal({ isOpen, onClose, onConfirm }) {
  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-zinc-900 rounded-2xl shadow-lg max-w-xs sm:max-w-sm w-full p-6 space-y-4">
        {/* Message */}
        <h2 id="logout-title" className="text-xl font-semibold text-white">
          Confirm Logout
        </h2>
        <p className="text-gray-300">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-3 pt-4">
          {/* Buttons */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-700 text-gray-300 hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
