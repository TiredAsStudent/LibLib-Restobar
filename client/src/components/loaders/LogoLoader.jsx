import logo from "../../assets/liblibRestBar.jpg";

function LogoLoader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-[#2B1B10] transition-all duration-500 ease-in-out">
      <img
        src={logo}
        alt="Liblib Restobar Logo"
        className="w-32 h-32 sm:w-40 sm:h-40 animate-bounce rounded-full shadow-lg"
      />
      <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Loading Liblib Restobar...
      </p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LogoLoader;
