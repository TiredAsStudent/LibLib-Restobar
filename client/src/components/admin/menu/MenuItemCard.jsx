import { LucideEdit, LucideTrash } from "lucide-react";
import { fileUrl } from "../../../utils/fileUrl.js";

function MenuItemCard({ item, onEdit, onDelete }) {
  return (
    <>
      <article className="border rounded-2xl shadow-md p-4 flex flex-col bg-white transition-transform duration-200 hover:shadow-lg hover:scale-[1.01]">
        {/* IMAGE */}
        {item.image?.url && (
          <div className="relative w-full h-40 mb-3">
            <img
              src={fileUrl(item.image.url)}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
            {/* Availability Badge */}
            <span
              className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md font-medium ${
                item.availability
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.availability ? "Available" : "Out of Stock"}
            </span>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">{item.category}</p>

          <div className="mt-3">
            <p className="text-lg font-bold text-orange-600">
              ₱{Number(item.basePrice).toFixed(2)}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <footer className="flex justify-evenly items-center mt-5 pt-3 border-t border-gray-200">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <LucideEdit size={16} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition"
          >
            <LucideTrash size={16} /> Delete
          </button>
        </footer>
      </article>
    </>
  );
}

export default MenuItemCard;
