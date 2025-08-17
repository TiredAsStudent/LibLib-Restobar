import { useState, useEffect } from "react";

function FilterModal({ isOpen, onClose, onApply, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters); // sync when reopened
  }, [initialFilters]);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Filter Menu Items
        </h2>

        <form className="space-y-5">
          {/* Category */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Category</p>
            <select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="">All categories</option>
              <option value="Uncategorized">Uncategorized</option>
              <option value="Rice Meals">Rice Meals</option>
              <option value="Snacks">Snacks</option>
              <option value="Pancit">Pancit</option>
              <option value="Chicken Wings">Chicken Wings</option>
              <option value="Soup Meals">Soup Meals</option>
              <option value="Vegetables">Vegetables</option>
              <option value="For Sharing">For Sharing</option>
              <option value="Beers">Beers</option>
              <option value="Add-Ons">Add-Ons</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Availability
            </p>
            <select
              value={filters.availability}
              onChange={(e) => handleChange("availability", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="">Any</option>
              <option value="true">Available</option>
              <option value="false">Out of stock</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Price Range
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex-1">
                <input
                  type="number"
                  placeholder="Min ₱"
                  value={filters.minPrice}
                  onChange={(e) => handleChange("minPrice", e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  min="0"
                />
              </label>
              <label className="flex-1">
                <input
                  type="number"
                  placeholder="Max ₱"
                  value={filters.maxPrice}
                  onChange={(e) => handleChange("maxPrice", e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  min="0"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md transition"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterModal;
