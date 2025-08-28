import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import Logo from "../../assets/liblibRestBar.jpg";
import LogoutButton from "../common/LogoutButton";
import navItems from "./navItems";
import { memo } from "react";

function MobileSidebar({ openLogoutModal, isSidebarOpen, toggleSidebar }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={toggleSidebar}
      >
        <aside
          className={`w-64 bg-[#39110c] text-yellow-300 min-h-screen shadow-xl p-3 flex flex-col justify-between transform transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center p-4 border-b border-orange-500">
              {/* Logo and name */}
              <header className="flex justify-between items-center gap-3">
                <img
                  src={Logo}
                  alt="Liblib Logo"
                  className="w-12 h-12 rounded-full shadow-lg object-cover border border-orange-500"
                />
                <h2 className="text-xl font-extrabold tracking-wide text-orange-500">
                  LIBLIB
                </h2>
              </header>

              {/* Close Button */}
              <button onClick={toggleSidebar}>
                <X size={24} className="text-yellow-300" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-3 p-3" role="menu">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/staff/menu"}
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-orange-500 text-white font-semibold shadow"
                        : "hover:bg-[#4e1a14] text-yellow-300"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="pt-6">
            <div className="flex justify-center">
              <LogoutButton openLogoutModal={openLogoutModal} />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default memo(MobileSidebar);
