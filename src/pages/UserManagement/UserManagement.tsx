import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Loader from '../Loader/Loader';
import { updateUser, type UserType, userGetData } from './userData';


const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};



const UserManagement: React.FC = () => {


  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [limit, setLimit] = useState<number>(10)
  const [search, setSearch] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);


  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);


  // for saerch
  const debouncedSearch = useDebounce(search, 1000);




  // get all users
  const { data: UserData, isLoading: userLoading, error, refetch } = useQuery({
    queryKey: ['userDAta', currentPage, limit, selectedStatus, debouncedSearch],
    queryFn: () => userGetData(currentPage, limit, selectedStatus, debouncedSearch),
  })


  // update user status
  const userUPdate = async (id: string, status: string) => {
    const res = await updateUser(id, status)
    if (res?.success) {
      toast.success(res?.data?.message)
      refetch()
    }
    if (!res?.success) {
      toast.error(res?.data?.message)
      refetch()
    }
  }



  console.log(selectedUser, "deatils")
  // if any error 
  if (error) {
    return <div>
      <h1 className='text-center text-white'>Something Error</h1>
    </div>
  }


  return (
    <div className="w-full   space-y-4">




      <div className="flex flex-col w-full lg:flex-row gap-4 mb-6 items-center bg-[#0F172A]/60 p-4 rounded-2xl border border-[#2e2e2c] backdrop-blur-md shadow-lg">

        {/* 🔍 Search Input */}
        <div className="relative w-full lg:flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center text-pink-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-[#0B1120] border border-[#C7B268]/40 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-pink-300/60 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-400 transition-all"
          />
        </div>

        {/* 🔽 Status Filter */}
        <div className="relative">
          <button
            onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
            className="flex items-center justify-between gap-3 bg-[#0B1120] border border-[#C7B268]/40 px-5 py-3 rounded-xl text-pink-300 hover:bg-pink-500/10 hover:border-pink-400 transition-all w-40"
          >
            <span className="text-sm font-medium">{selectedStatus}</span>
            <ChevronDown size={18} className="text-pink-400" />
          </button>

          {isStatusDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-[#0B1120] border border-[#C7B268]/40 rounded-xl shadow-xl z-50 backdrop-blur-md">
              {["All", "ACTIVE", "INACTIVE"].map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsStatusDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-pink-300 hover:bg-pink-500/10 hover:text-white cursor-pointer transition-all"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="overflow-x-auto rounded-2xl border border-[#C7B268]">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-[#0F172A] text-pink-300  text-sm">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="bg-[#0B1120]">
            {userLoading ? <tr>
              <td colSpan={10}>
                <div className="flex justify-center items-center py-10">
                  <Loader />
                </div>
              </td>
            </tr> : UserData?.data?.map((user: UserType) => (
              <tr
                key={user._id}
                className="border-b border-white/10 hover:bg-pink-500/5 transition"
              >
                {/* 👤 User Info */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <img
                    src={
                      user.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&s"
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border border-[#C7B268]"
                  />
                  <span className="font-medium">{user.displayName}</span>
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-slate-300">
                  {user.userLocation ? user?.userLocation : "Not update"}
                </td>
                {/* Location */}
                <td className="px-4 py-3 text-slate-300">
                  {user.email}
                </td>

                {/* Availability */}
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {user.availableForDate && (
                      <span className="bg-pink-500/10 text-pink-400 px-2 py-1 rounded-md">
                        Date
                      </span>
                    )}
                    {user.availableForFriend && (
                      <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md">
                        Friend
                      </span>
                    )}
                    {user.availableForDance && (
                      <span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-md">
                        Dance
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span

                    className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "ACTIVE"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-300">
                  {user.age ? user.age : "Null"}
                </td>

                {/* Toggle Action */}
                <td className="px-4 flex items-center gap-x-5 py-2 justify-end">

                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedUser(user);
                    }}
                    className="flex items-center justify-center gap-2 
    h-8 min-w-27.5
    rounded-lg 
    bg-linear-to-r from-pink-500 to-pink-800 
    hover:from-pink-600 hover:to-pink-900 
    transition duration-300 transform hover:scale-105"
                  >
                    👁️ View
                  </button>

                  <button
                    onClick={() =>
                      userUPdate(
                        user?._id,
                        user?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                      )
                    }
                    className={`flex items-center justify-center
    h-8 min-w-27.5
    rounded-lg text-xs font-semibold transition-all
    ${user.status === "ACTIVE"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                  >
                    {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 px-2 py-4">


        <div className="flex items-center gap-2 ">


          <div className="flex items-center gap-3 ">
            <span className="text-sm text-pink-300">Show:</span>

            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-[#0B1120] border border-[#C7B268]/40 text-pink-300 text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>


          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={UserData?.meta?.page === 1}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
          </button>



          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={UserData?.meta?.page === UserData?.meta?.totalpage}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} />
          </button>




        </div>
      </div>





      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

          <div className="w-[95%] sm:w-[20%] p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl text-white relative">

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-pink-400 text-xl"
            >
              ✕
            </button>

            {/* Card Content */}
            <div className="flex flex-col items-center text-center space-y-3">

              <img
                src={selectedUser?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&s"}
                alt="user"
                className="w-20 h-20 rounded-full border-2 border-pink-400"
              />

              <h2 className="text-lg font-semibold">{selectedUser?.fullName || selectedUser?.displayName}  </h2>
              <p className="text-sm text-gray-200">{selectedUser?.email}</p>


              <div className="flex items-center gap-1 text-xs text-gray-300">
                {selectedUser?.userLocation}
              </div>

              <p className="text-xs text-gray-300">
                {selectedUser?.bio}
              </p>



              <div className="flex flex-wrap gap-2">

                {/* Available For Date */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser?.availableForDate
                  ? "bg-green-500/30 text-green-300 border border-green-500"
                  : "bg-red-500/30 text-red-300 border border-red-500"
                  }`}>
                  Date
                </span>

                {/* Available For Dance */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser?.availableForDance
                  ? "bg-green-500/30 text-green-300 border border-green-500"
                  : "bg-red-500/30 text-red-300 border border-red-500"
                  }`}>
                  Dance
                </span>

                {/* Available For Friend */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser?.availableForFriend
                  ? "bg-green-500/30 text-green-300 border border-green-500"
                  : "bg-red-500/30 text-red-300 border border-red-500"
                  }`}>
                  Friend
                </span>

              </div>

              <div className="flex gap-2 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${selectedUser?.status === "ACTIVE"
                    ? "bg-green-500/30 text-green-300"
                    : "bg-red-500/30 text-red-300"
                    }`}
                >
                  {selectedUser?.status === "ACTIVE" ? "Active" : "Inactive"}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                  {selectedUser?.role}
                </span>
              </div>


              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {selectedUser?.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-linear-to-r from-pink-500/30 to-pink-800/30 text-pink-200 border border-pink-500/40 backdrop-blur-md"
                  >
                    {interest?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default UserManagement;