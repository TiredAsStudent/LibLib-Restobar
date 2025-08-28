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
    "/staff/menu/payments": "Payments",
    "/staff/menu/orders": "Orders",
    "/staff/menu/table-management": "Table Management",
    "/staff/menu/notifications": "Notifications",
    "/staff/menu": "Menu",
  };

  const tabTitle = useMemo(() => {
    const found = Object.entries(pageTitles).find(([path]) =>
      location.pathname.startsWith(path)
    );
    return found ? found[1] : "Staff Menu";
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Button */}
          <button className="md:hidden text-orange-500" onClick={toggleSidebar}>
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm text-gray-700">
            <UserCircle className="w-5 h-5 text-orange-500" />
            <span className="font-bold">{user?.username || "Guest"}</span>
          </div>
        </div>
      </header>
    </>
  );
}

export default memo(Navbar);
