function Pagination({ total, page, pageSize, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <nav
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm"
        aria-label="Pagination"
      >
        {/* Left side: Prev/Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 rounded-md border text-white bg-orange-500 shadow-sm 
                 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="px-2 text-gray-600">
            Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>

          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1.5 rounded-md border text-white bg-orange-500 shadow-sm 
                 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Right side: Per page */}
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Per page:</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border rounded-md px-3 py-1.5 shadow-sm bg-orange-500 hover:bg-orange-600 text-white"
          >
            {[8, 12, 16, 24].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </>
  );
}

export default Pagination;
