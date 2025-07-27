import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import MobileSidebar from "../components/admin/MobileSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/common/LogoutModal";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div
      className="flex h-screen bg-gray-100 overflow-hidden"
      role="application"
    >
      {/* Sidebar */}
      <Sidebar openLogoutModal={() => setIsLogoutOpen(true)} />
      <MobileSidebar openLogoutModal={() => setIsLogoutOpen(true)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main View */}
        <main
          className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-white"
          role="main"
          aria-label="Admin main content"
        >
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={async () => {
          await logout();
          setIsLogoutOpen(false);
        }}
      />
    </div>
  );
}

export default AdminLayout;
