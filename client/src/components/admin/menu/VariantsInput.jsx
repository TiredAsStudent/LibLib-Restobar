import { Trash2 } from "lucide-react";

function VariantsInput({ variants, onChange, onAdd, onRemove }) {
  const handleChange = (index, field, value) => {
    onChange(index, field, value);
  };

  return (
    <>
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">Variants</h4>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mb-2"
            >
              <input
                type="text"
                placeholder="Variant Name"
                required
                value={v.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 flex-1 
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
              <input
                type="number"
                placeholder="Price"
                required
                min="0"
                value={v.price}
                onChange={(e) => handleChange(i, "price", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-32
                focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="mt-2 inline-flex items-center px-3 py-1.5 
          bg-orange-50 text-orange-600 border border-orange-200 
          rounded-lg text-sm font-medium
          hover:bg-orange-100 transition"
        >
          + Add Variant
        </button>
      </div>
    </>
  );
}

export default VariantsInput;
