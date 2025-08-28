import logo from "../../assets/liblibRestBar.jpg";

function LogoLoader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#2B1B10] transition-all duration-500 ease-in-out">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-30 blur-2xl animate-pulse" />
        {/* LOGO */}
        <img
          src={logo}
          alt="Liblib Restobar Logo"
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full shadow-xl border-4 border-orange-500 animate-bounce"
        />
      </div>

      {/* Loading text */}
      <p className="mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 relative overflow-hidden">
        <span className="animate-pulse">Loading Liblib Restobar...</span>
      </p>
    </div>
  );
}

export default LogoLoader;
