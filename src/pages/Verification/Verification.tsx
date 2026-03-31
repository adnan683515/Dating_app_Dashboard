

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import sequreApi from "../../axios/axiosSequre";
import Loader from "../Loader/Loader";

// ================= API =================

const getCategories = async (page: number, limit: number, search?: string, isDelete?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: Record<string, any> = {
    limit,
    page,
  };

  if (isDelete) params.isDelete = isDelete === "true";
  if (search) params.searchTerm = search;

  const res = await sequreApi.get("/cetegory/cetegories", { params });
  return res?.data;
};

const updateCategory = async (id: string, name: string, isDelete: boolean) => {
  const res = await sequreApi.patch(`/cetegory/update-cetegory/${id}`, {
    name,
    isDelete,
  });
  return res.data;
};

const createCategory = async (name: string) => {
  const res = await sequreApi.post(`/cetegory/create-cetegory`, { name });
  return res.data;
};

// ================= COMPONENT =================

export default function Verification() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState<string>("");
  const [limit, setLimit] = useState(30);

  // modal state (cleaned)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [deleteStore, setDeleteStore] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [isAddMode, setIsAddMode] = useState(true);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories", page, search, isDelete, limit],
    queryFn: () => getCategories(page, limit, search, isDelete),
  });

  const categories = data?.data?.data;
  const meta = data?.data?.meta;

  // ================= HANDLERS =================

  const openAddModal = () => {
    setOpen(true);
    setValue("");
    setDeleteStore(false);
    setId("");
    setIsAddMode(true);
  };

  const openEditModal = (cat: { _id: string, name: string, isDelete: boolean }) => {
    setOpen(true);
    setValue(cat.name);
    setDeleteStore(cat.isDelete);
    setId(cat._id);
    setIsAddMode(false);
  };

  const handleSave = async () => {
    try {
      if (isAddMode) {
        await createCategory(value);
      } else {
        await updateCategory(id, value, deleteStore);
      }
    } catch (err) {
      console.log(err);
    } finally {
      refetch();
      setOpen(false);
    }
  };

  // ================= UI =================

  return (
    <div className="p-6 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          Category List
        </h1>

        <button onClick={openAddModal}
          className="px-5 py-2 rounded-lg text-white font-medium 
          bg-linear-to-r from-[#C7B268] to-[#776a39]
          shadow-lg hover:scale-105 transition">
          + Add Category
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          placeholder="🔍 Search category..."
          className="w-full px-4 py-2 rounded-lg 
          bg-white/10 backdrop-blur-md 
          text-white placeholder-gray-400 
          border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="px-4 py-2 rounded-lg 
          bg-white/10 backdrop-blur-md 
          text-white border border-white/10 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={isDelete}
          onChange={(e) => {
            setPage(1);
            setIsDelete(e.target.value);
          }}
        >
          <option value="" className="bg-black text-white">All</option>
          <option value="false" className="bg-black text-green-400">Active</option>
          <option value="true" className="bg-black text-red-400">Deleted</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6 rounded-xl 
        bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">

        <table className="w-full text-sm text-white">
          <thead className="bg-white/10 text-gray-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  <Loader />
                </td>
              </tr>
            ) : !categories?.length ? (
              <tr>
                <td colSpan={8} className="text-center text-white py-5">
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((cat: { _id: string, name: string, isDelete: boolean }) => (
                <tr key={cat._id} className="border-t border-white/10 hover:bg-white/10 transition">
                  <td className="p-3">

                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      {cat.name}
                    </div>
                  </td>

                  <td className="p-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${cat.isDelete
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                    >
                      {cat.isDelete ? "Inactive" : "Active"}
                    </span>
                  </td>

                  <td className="p-3 flex justify-center">
                    <button onClick={() => openEditModal(cat)}
                      className="px-3 py-1 rounded-lg 
                      bg-linear-to-r from-pink-500 to-pink-700 
                      text-white flex gap-x-2 hover:scale-105 transition">
                      <Pencil size={18} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (unchanged UI) */}
      <div className="flex justify-end items-center gap-3 mt-6 text-white">

        <div className="relative">
          <select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="appearance-none px-4 py-2 pr-10 rounded-lg 
            bg-white/10 backdrop-blur-md 
            text-white border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-pink-500 
            cursor-pointer"
          >
            <option value={10} className="bg-black text-white">10</option>
            <option value={20} className="bg-black text-white">20</option>
            <option value={30} className="bg-black text-white">30</option>
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <ChevronDown />
          </span>
        </div>

        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
          className="px-4 py-1 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 disabled:opacity-40">
          Prev
        </button>

        <span>
          Page <span className="text-pink-400">{meta?.page}</span> / {meta?.totalpage}
        </span>

        <button disabled={page === meta?.totalpage} onClick={() => setPage(p => p + 1)}
          className="px-4 py-1 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 disabled:opacity-40">
          Next
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="w-100 p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 shadow-2xl text-white relative">

            <button onClick={() => setOpen(false)} className="absolute top-3 right-3">✕</button>

            <h2 className="text-lg font-semibold mb-4">
              {isAddMode ? "Add Category" : "Update Category"}
            </h2>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10"
            />

            {!isAddMode && (
              <div
                onClick={() => setDeleteStore(!deleteStore)}
                className={`w-12 mt-4 h-6 flex items-center rounded-full p-1 cursor-pointer transition 
                ${deleteStore ? "bg-linear-to-r from-red-500 to-pink-700" : "bg-green-500"}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full transform transition 
                  ${deleteStore ? "translate-x-6" : ""}`} />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setOpen(false)}>Cancel</button>

              <button onClick={handleSave}
                className="px-4 py-2 rounded-lg 
                bg-linear-to-r from-pink-500 to-pink-700 
                text-white hover:scale-105 transition">
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}