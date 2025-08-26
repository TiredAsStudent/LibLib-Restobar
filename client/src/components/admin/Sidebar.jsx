import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import Logo from "../../assets/liblibRestBar.jpg";
import { memo } from "react";
import navItems from "./navItems";

function Sidebar({ openLogoutModal }) {
  return (
    <>
      <aside className="bg-[#39110c] text-yellow-300 w-64 min-h-screen p-4 hidden md:flex flex-col justify-between shadow-xl">
        <div>
          <div className="p-4 border-b border-orange-500">
            {/* Logo and Navigation */}
            <header className="flex items-center justify-center gap-3 ">
              <img
                src={Logo}
                alt="Liblib Logo"
                className="w-12 h-12 rounded-full shadow-lg object-cover border border-orange-500"
              />
              <h1 className="text-2xl font-extrabold tracking-wide text-orange-500">
                LIBLIB
              </h1>
            </header>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-3 p-3" role="menu">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200
                 ${
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
    </>
  );
}

export default memo(Sidebar);
