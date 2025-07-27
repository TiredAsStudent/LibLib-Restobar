import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserCircle, Menu } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import LiveTime from "../common/LiveTime";
import { memo } from "react";

function Navbar() {
  const location = useLocation();
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();

  //Tab Title
  const getTabTitle = () => {
    const path = location.pathname;

    if (path.includes("/admin/menu")) return "Menu";
    if (path.includes("/admin/orders")) return "Orders";
    if (path.includes("/admin/reports")) return "Reports";
    if (path.includes("/admin/users")) return "Users";
    if (path.includes("/admin/qr-management")) return "QR Management";
    if (path === "/admin") return "Dashboard";

    return "Admin";
  };

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex items-center justify-between"
      >
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-orange-500"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          {/* Title */}
          <h1
            className="text-lg font-semibold text-gray-800 tracking-tight"
            aria-label="Current Admin Tab"
          >
            {getTabTitle()}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Live Time */}
          <LiveTime />

          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm text-gray-700">
              <UserCircle className="w-5 h-5 text-orange-500" />
              <span className="font-bold">{user.username}</span>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default memo(Navbar);
