import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserCircle, Menu } from "lucide-react";
import LiveTime from "../common/LiveTime";
import { memo, useMemo } from "react";

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const { user } = useAuth();

  // Tab title
  const pageTitles = {
    "/admin/menu": "Menu",
    "/admin/orders": "Orders",
    "/admin/reports": "Reports",
    "/admin/users": "Users",
    "/admin/qr-management": "QR Management",
    "/admin": "Dashboard",
  };

  const tabTitle = useMemo(() => {
    const found = Object.entries(pageTitles).find(([path]) =>
      location.pathname.startsWith(path)
    );
    return found ? found[1] : "Admin";
  }, [location.pathname]);

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex items-center justify-between"
    >
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-orange-500"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          {tabTitle}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Live Time */}
        <LiveTime />

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm text-gray-700">
            <UserCircle className="w-5 h-5 text-orange-500" />
            <span className="font-bold">{user.username}</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Navbar);
