import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import sequreApi from "../../axios/axiosSequre";
import Loader from "../Loader/Loader";

// API function
const getCategories = async (page: number, limit: number, search?: string, isDelete?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: Record<string, any> = {
    limit: limit || 10,
    page: page || 1,
  };
  if (isDelete) {
    params.isDelete = isDelete == "true" ? true : false;
  }

  if (search) {
    params.searchTerm = search
  }

  const res = await sequreApi.get('/cetegory/cetegories', { params });
  return res?.data;
};




export default function Verification() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState<string>("");
  const [limit, setLimit] = useState(30);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [previous, setPrevious] = useState("");


  const handleUndo = () => {
    setValue(previous);
  };


  const { data, isLoading } = useQuery({
    queryKey: ["categories", page, search, isDelete, limit],
    queryFn: () => getCategories(page, limit, search, isDelete),
  });

  const categories = data?.data?.data;
  const meta = data?.data?.meta;

  return (
    <div className="p-6 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">
          Category List
        </h1>

        <button className="px-5 py-2 rounded-lg text-white font-medium 
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
                <td colSpan={8} className="text-center p-6 text-gray-400">
                  <Loader></Loader>
                </td>
              </tr>
            ) : !categories?.length ? <tr>
              <td colSpan={8} className="text-center  text-white py-5">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <h1 className="text-2xl font-semibold text-pink-400 mb-2">
                    No Categories Found
                  </h1>
                  <p className="text-sm text-pink-300/70">
                    There are no categories available right now.
                  </p>
                </div>
              </td>
            </tr> : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              categories?.map((cat: any) => (
                <tr
                  key={cat._id}
                  className="border-t border-white/10 hover:bg-white/10 transition"
                >
                  {/* Name */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      {cat.name}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${cat.isDelete
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                    >
                      {cat.isDelete ? "Deleted" : "Active"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3 flex justify-center">
                    <button   onClick={() => setOpen(true)} className="px-3 py-1 rounded-lg 
            bg-linear-to-r from-pink-500 to-pink-700 
                text-white flex gap-x-2  justify-end hover:scale-105 transition">

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

      {/* Pagination */}
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

          {/* Custom Arrow */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            <ChevronDown />
          </span>
        </div>

        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-1 rounded-lg border border-white/20 
      bg-white/5 cursor-pointer  hover:bg-white/10 
      disabled:opacity-40 transition"
        >
          Prev
        </button>

        <span className="text-gray-300">
          Page <span className="text-pink-400">{meta?.page}</span> /{" "}
          {meta?.totalpage}
        </span>

        <button
          disabled={page === meta?.totalpage}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-1 rounded-lg border border-white/20 
      bg-white/5 cursor-pointer hover:bg-white/10 
      disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>





      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

          <div className="w-100 p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 shadow-2xl text-white relative">

            {/* Close (X) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-300 hover:text-pink-400 text-lg"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">
              Add Category
            </h2>

            {/* Input */}
            <input
              type="text"
              placeholder="Enter category name..."
              value={value}
              onChange={(e) => {
                setPrevious(value);
                setValue(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-lg 
                bg-white/10 border border-white/10 
                text-white placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Undo */}
            <button
              onClick={handleUndo}
              className="mt-2 text-xs text-pink-400 hover:underline"
            >
              Undo
            </button>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg 
                  bg-white/10 border border-white/20 
                  hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  console.log("Saved:", value);
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg 
                  bg-linear-to-r from-pink-500 to-pink-700 
                  hover:scale-105 transition"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}