import { LogOut } from "lucide-react";

function LogoutButton({ openLogoutModal }) {
  return (
    <>
      <button
        onClick={openLogoutModal}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600"
        type="button"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
