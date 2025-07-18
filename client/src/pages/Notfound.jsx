function Notfound() {
  return (
    <>
      <main className="min-h-screen bg-[#712b00] flex items-center justify-center text-white font-sans px-4">
        <div
          className="text-center"
          role="alert"
          aria-label="404 Page Not Found"
        >
          <h1 className="text-7xl sm:text-9xl font-bold text-yellow-400 mb-4">
            404
          </h1>
          <p className="text-lg sm:text-xl mb-6">Oops! Page not found.</p>
        </div>
      </main>
    </>
  );
}

export default Notfound;
