import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import MobileSidebar from "../components/admin/MobileSidebar";
import LogoutModal from "../components/common/LogoutModal";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // moved here
  const { logout } = useAuth();

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = async () => {
    await logout();
    closeLogoutModal();
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      className="flex h-screen bg-gray-100 overflow-hidden"
      role="application"
    >
      {/* Sidebar */}
      <Sidebar openLogoutModal={openLogoutModal} />
      <MobileSidebar
        openLogoutModal={openLogoutModal}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <section
          className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-white"
          aria-label="Admin main content"
        >
          <Outlet />
        </section>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default AdminLayout;
