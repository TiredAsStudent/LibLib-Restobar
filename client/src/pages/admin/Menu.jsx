import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import useDebounce from "../../hooks/useDebounce.js";
import { listMenus, deleteMenu } from "../../services/adminMenuService.js";
import CustomToast from "../../components/common/CustomToast";

import MenuHeader from "../../components/admin/menu/MenuHeader";
import MenuItemCard from "../../components/admin/menu/MenuItemCard";
import MenuForm from "../../components/admin/menu/MenuForm";
import FilterModal from "../../components/admin/menu/FilterModal";
import Pagination from "../../components/admin/menu/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loading from "../../components/loaders/Loading";

function Menu() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [total, setTotal] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // modal for add/edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // modal for delete confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteItem, setToDeleteItem] = useState(null);

  // modal for filter
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const socket = useSocket();
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchItems = async (opts = {}) => {
    setLoading(true);
    try {
      const params = {
        search: debouncedSearch,
        category: category || undefined,
        availability: availability || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        page: opts.page ?? page,
        limit: opts.limit ?? pageSize,
        sort: opts.sort ?? "createdAt:desc",
      };
      const data = await listMenus(params);
      setItems(data.items || []);
      setPage(data.page || 1);
      setPageSize(data.pageSize || data.limit || pageSize);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset to first page if filters change
  useEffect(
    () => setPage(1),
    [debouncedSearch, category, availability, minPrice, maxPrice, pageSize]
  );

  useEffect(() => {
    fetchItems({ page, limit: pageSize });
  }, [
    page,
    pageSize,
    debouncedSearch,
    category,
    availability,
    minPrice,
    maxPrice,
  ]);

  // Socket updates
  useEffect(() => {
    if (!socket) return;

    const onCreated = ({ item }) => setItems((prev) => [item, ...prev]);
    const onUpdated = ({ item }) =>
      setItems((prev) => prev.map((i) => (i._id === item._id ? item : i)));
    const onDeleted = ({ itemId }) =>
      setItems((prev) => prev.filter((i) => i._id !== itemId));

    socket.on("menu:item_created", onCreated);
    socket.on("menu:item_updated", onUpdated);
    socket.on("menu:item_deleted", onDeleted);

    return () => {
      socket.off("menu:item_created", onCreated);
      socket.off("menu:item_updated", onUpdated);
      socket.off("menu:item_deleted", onDeleted);
    };
  }, [socket]);

  // Open delete confirmation modal
  const openDeleteConfirm = (item) => {
    setToDeleteItem(item);
    setConfirmOpen(true);
  };

  // Handle confirmed deletion
  const handleDeleteConfirmed = async () => {
    if (!toDeleteItem) return;
    const prev = items;
    setItems((cur) => cur.filter((i) => i._id !== toDeleteItem._id));
    CustomToast.success("Menu item deleted successfully!");

    setConfirmOpen(false);
    try {
      await deleteMenu(toDeleteItem._id);
    } catch (e) {
      setItems(prev);
      CustomToast.error("Failed to delete menu item");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col p-3 sm:p-4 md:p-6">
        {/* Header */}
        <MenuHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenFilters={() => setFilterModalOpen(true)}
          onAddItem={() => {
            setEditingItem(null);
            setModalOpen(true);
          }}
        />

        {/* Main */}
        <main className="flex-1 flex flex-col mt-4">
          {loading ? (
            <Loading text="Fetching menu items..." />
          ) : (
            <>
              <section
                aria-label="Menu items"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              >
                {items.length > 0 ? (
                  items.map((item) => (
                    <MenuItemCard
                      key={item._id}
                      item={item}
                      onEdit={() => {
                        setEditingItem(item);
                        setModalOpen(true);
                      }}
                      onDelete={() => openDeleteConfirm(item)}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No menu items found.
                  </p>
                )}
              </section>

              <footer className="mt-6 sm:mt-8 flex justify-center">
                <Pagination
                  total={total}
                  page={page}
                  pageSize={pageSize}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                />
              </footer>
            </>
          )}
        </main>

        {/* Modals */}
        {modalOpen && (
          <MenuForm
            item={editingItem}
            onClose={() => setModalOpen(false)}
            onSaved={() => fetchItems({ page: 1, limit: pageSize })}
          />
        )}
        <ConfirmModal
          isOpen={confirmOpen}
          title="Delete Menu Item"
          message={`Are you sure you want to delete "${toDeleteItem?.name}"?`}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleDeleteConfirmed}
        />
        <FilterModal
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApply={(filters) => {
            setCategory(filters.category);
            setAvailability(filters.availability);
            setMinPrice(filters.minPrice);
            setMaxPrice(filters.maxPrice);
          }}
          initialFilters={{
            category,
            availability,
            minPrice,
            maxPrice,
          }}
        />
      </div>
    </>
  );
}

export default Menu;
