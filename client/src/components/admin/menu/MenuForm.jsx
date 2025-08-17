import { useEffect, useState } from "react";
import { createMenu, updateMenu } from "../../../services/adminMenuService.js";
import VariantsInput from "../menu/VariantsInput";
import CustomToast from "../../common/CustomToast";

const CATEGORY_OPTIONS = [
  "Uncategorized",
  "Rice Meals",
  "Snacks",
  "Pancit",
  "Chicken Wings",
  "Soup Meals",
  "Vegetables",
  "For Sharing",
  "Beers",
  "Add-Ons",
];

function MenuForm({ item, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: "",
    category: "Uncategorized",
    basePrice: "",
    availability: true,
    variants: [],
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name ?? "",
        category: item.category ?? "Uncategorized",
        basePrice: item.basePrice ?? "",
        availability: item.availability ?? true,
        variants: item.variants ?? [],
        image: null,
      });
      setPreview(
        item.image?.url
          ? item.image.url.startsWith("http")
            ? item.image.url
            : `${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}${
                item.image.url
              }`
          : null
      );
    }
  }, [item]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const f = files[0];
      setForm((s) => ({ ...s, image: f }));
      setPreview(f ? URL.createObjectURL(f) : null);
    } else if (type === "checkbox") {
      setForm((s) => ({ ...s, [name]: checked }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  //Variant handlers (passed to VariantsInput)
  const handleVariantChange = (index, key, value) => {
    setForm((s) => {
      const updated = [...s.variants];
      updated[index][key] = value;
      return { ...s, variants: updated };
    });
  };

  const addVariant = () =>
    setForm((s) => ({
      ...s,
      variants: [...s.variants, { name: "", price: "" }],
    }));

  const removeVariant = (index) =>
    setForm((s) => ({
      ...s,
      variants: s.variants.filter((_, i) => i !== index),
    }));

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("basePrice", form.basePrice);
      fd.append("availability", form.availability);
      fd.append("variants", JSON.stringify(form.variants || []));
      if (form.image) fd.append("image", form.image);

      if (item) {
        await updateMenu(item._id, fd);
        CustomToast.success("Menu Item updated successfully!");
      } else {
        await createMenu(fd);
        CustomToast.success("Menu Item created successfully!");
      }

      onSaved?.();
      onClose();
    } catch (err) {
      CustomToast.error("Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg overflow-y-auto max-h-[90vh] animate-fadeIn"
      >
        {/* Header */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {item ? "Edit Menu Item" : "Add New Item"}
        </h3>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            placeholder="e.g., Adobo"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Base Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Price
          </label>
          <input
            type="number"
            min="0"
            required
            placeholder="e.g., 150"
            name="basePrice"
            value={form.basePrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            name="image"
            type="file"
            required={!item}
            onChange={handleChange}
            className="block w-full text-sm text-gray-700 
              border border-gray-300 rounded-lg cursor-pointer 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
              file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 
              file:text-sm file:font-medium
              file:bg-orange-50 file:text-orange-600 
              hover:file:bg-orange-100"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 w-full object-cover rounded-lg mt-3 shadow-sm"
            />
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            name="availability"
            checked={form.availability}
            onChange={handleChange}
            className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </div>

        {/*Variants*/}
        <VariantsInput
          variants={form.variants}
          onChange={handleVariantChange}
          onAdd={addVariant}
          onRemove={removeVariant}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-md transition disabled:opacity-50"
          >
            {saving ? "Saving..." : item ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuForm;
