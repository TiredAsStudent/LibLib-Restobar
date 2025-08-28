import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/staffMenu/Sidebar";
import Navbar from "../components/staffMenu/Navbar";
import MobileSidebar from "../components/staffMenu/MobileSidebar";
import LogoutModal from "../components/common/LogoutModal";

function StaffMenuLayout() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = async () => {
    await logout();
    closeLogoutModal();
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
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
          <section className="flex-1 overflow-y-auto px-4 py-6 md:px-6 bg-white">
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
    </>
  );
}

export default StaffMenuLayout;
