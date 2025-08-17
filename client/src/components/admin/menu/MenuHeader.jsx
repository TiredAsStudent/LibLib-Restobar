import { SlidersHorizontal } from "lucide-react";

function MenuHeader({ searchQuery, setSearchQuery, onOpenFilters, onAddItem }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex gap-2 w-full md:w-auto">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Filters Button */}
        <button
          type="button"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Add Item Button */}
      <button
        type="button"
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-colors"
        onClick={onAddItem}
      >
        + Add Item
      </button>
    </header>
  );
}

export default MenuHeader;
