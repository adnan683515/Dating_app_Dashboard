import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, ChevronLeft, ChevronRight, House, MapPin, Users } from "lucide-react";
import { useParams } from "react-router";
import { attendanceEvent, fetchEvent, formatDateTime, getLineUpofEvent, getStatus } from "./details";
import Loader from "../Loader/Loader";
import { useState } from "react";




interface User {
  _id: string;
  displayName: string;
  image: string;
}

interface TicketData {
  _id: string;
  userId: User;
  ticketCount: number;
  fee: number;
  paymentStatus: string;
  txId: string;
  createdAt: string;
  updatedAt: string;
}



export default function EventDetails() {

  const { id } = useParams();
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputArray, setInputArray] = useState<number[]>([1])

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id as string),
  });


  const { data: lineupData, isLoading: lineupLoading } = useQuery({
    queryKey: [id],
    queryFn: () => getLineUpofEvent(id as string)
  })



  const { data: joinedData, isLoading: joningDataLoading } = useQuery({
    queryKey: ["joinedMembers", id, page],
    queryFn: () => attendanceEvent(page, id as string),
    enabled: !!id
  })



  const handleInputField = (type: string) => {

    if (type === '+') {
      setInputArray(prev => [...prev, prev.length + 1]); // add new item
    }

    if (type === '-') {
      setInputArray(prev => prev.length > 1 ? prev.slice(0, -1) : prev); // remove last item
    }
  };



  if (isLoading || lineupLoading) {
    return <div className="min-h-screen flex justify-center items-center">

      <Loader></Loader>
    </div>
  }

  return (

    <div className="flex flex-col lg:flex-row gap-10">

      {/* Left Section */}
      <div className="flex-1 text-white">

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={data?.image}
            alt="event"
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
        </div>

        {/* Title + Status */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{data?.title}</h1>
          <span className="px-4 py-1 rounded-full bg-[#C7B268] text-black text-sm">
            {getStatus(data?.status)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data?.tags?.map((tag: string, i: number) => {
            const colors = ["#00D4FF", "#FF00FF", "#C7B268"];
            return (
              <span
                key={i}
                style={{ backgroundColor: colors[i % 3] }}
                className="px-3 py-1 rounded-full text-sm text-black font-medium"
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-xs">Start Time</p>
            <p className="font-semibold text-lg">{formatDateTime(data?.start_date_time)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-xs">End Time</p>
            <p className="font-semibold text-lg">{formatDateTime(data?.end_date_time)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-xs">Open Door</p>
            <p className="font-semibold text-lg">{formatDateTime(data?.openDoor)}</p>
          </div>
        </div>

        {/* Attendance + Lineup + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <Users />
            <p>{data?.attendanceTotal > 0 ? `${data?.attendanceTotal} attending` : "No attendees yet"}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <Users />
            <p>{data?.lineupMember > 0 ? `${data?.lineupMember} lineup members` : "No lineup yet"}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <p>Category: {data?.category?.name}</p>
          </div>
        </div>

        {/* Venue + Fee + Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <MapPin />
            <p>{data?.venue}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <BadgeDollarSign />
            <p>{data?.fee}$</p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <House />
            <p>{data?.addRess}</p>
          </div>
        </div>

        {/* Organizer */}
        <div className="mt-8 flex items-center gap-4">
          <img src={data?.user?.image} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{data?.user?.displayName}</p>
            <p className="text-sm text-gray-400">Organizer</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-gray-300">{data?.descripton}</p>
        </div>

        {/* Map */}
        <div className="mt-8 rounded-2xl overflow-hidden">
          <iframe
            width="100%"
            height="300"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${data?.lat},${data?.long}&z=15&output=embed`}
          ></iframe>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex-1">

        {/* Lineup Members */}
        <h2 className="text-xl font-semibold text-white mb-4">Lineup Members</h2>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C7B268] text-black font-semibold rounded-xl hover:bg-[#b59d5a] transition"
          >
            <span className="text-xl font-bold">+</span>
            Add Lineup
          </button>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="relative bg-gray-900 rounded-2xl w-full max-w-lg shadow-lg overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <h2 className="text-white text-xl font-semibold">Add Performers</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white text-2xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="p-6 text-gray-300">


                <div className=" space-y-2">
                  {inputArray?.map((item: number) => {
                    return <div key={item} className="flex items-center gap-3">

                      {/* Input Field (text inside) */}
                      <input
                        type="text"
                        placeholder="Enter value"
                        className="px-4 py-2 rounded-xl bg-gray-800 text-white outline-none w-[80%]"
                      />

                      {/* Minus Button */}
                      <button onClick={() => handleInputField('-')} className="w-10 cursor-pointer h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-xl text-white text-xl font-bold">
                        −
                      </button>

                      {/* Plus Button */}
                      <button onClick={() => handleInputField('+')} className="w-10 cursor-pointer h-10 flex items-center justify-center bg-[#C7B268] hover:bg-[#b59d5a] rounded-xl text-black text-xl font-bold">
                        +
                      </button>

                    </div>
                  })}
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">
                <button onClick={()=>setIsOpen(false)} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#C7B268] text-black rounded hover:bg-[#b59d5a] transition">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}





        {/* Lineup Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lineupData?.data && lineupData.data.length > 0 ? (
            lineupData.data.map((item: { name: string; _id: string }) => (
              <div
                key={item._id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:scale-105 hover:border-[#C7B268] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C7B268] flex items-center justify-center text-black font-bold">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">Performer</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              No performers added yet. Add your lineup!
            </div>
          )}
        </div>

        {/* Joined Members */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white">Joined Members</h2>
          <div className="p-4 bg-black text-white mt-2">
            <div className="border border-[#C7B268] rounded-2xl shadow-lg overflow-hidden">

              {/* Header */}
              <div className="p-4 border-b border-[#C7B268]">
                <h2 className="text-xl font-semibold text-[#C7B268]">Ticket Information</h2>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="text-sm text-left w-full">
                  <thead className="bg-[#111] text-[#C7B268]">
                    <tr>
                      <th className="p-3">User</th>
                      <th className="p-3">Tickets</th>
                      <th className="p-3">Fee</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Transaction ID</th>
                      <th className="p-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {joningDataLoading ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-white">
                          Loading....
                        </td>
                      </tr>
                    ) : joinedData?.data?.length ? (
                      joinedData?.data.map((item: TicketData) => (
                        <tr key={item._id} className="border-t border-[#C7B268]/40 hover:bg-[#111] transition">
                          <td className="p-3 flex items-center gap-3">
                            <img
                              src={item?.userId?.image}
                              alt="user"
                              className="w-10 h-10 rounded-full object-cover border border-[#C7B268]"
                            />
                            <span>{item?.userId?.displayName}</span>
                          </td>
                          <td className="p-3">{item?.ticketCount}</td>
                          <td className="p-3 text-[#C7B268] font-medium">${item?.fee}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 text-xs rounded ${item?.paymentStatus === "PAID" ? 'bg-green-400 text-black' : 'bg-[#C7B268]'} text-black font-medium`}
                            >
                              {item?.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400">
                            <div className="relative group inline-block">
                              <span className="cursor-pointer">{item?.txId?.slice(0, 10)}...</span>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 rounded border border-[#C7B268] z-10 w-48 text-center shadow-lg wrap-break-word">
                                {item?.txId}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-gray-400">{new Date(item?.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-gray-400">
                          No Booking Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end gap-3 p-4 border-t border-[#C7B268]">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="flex items-center justify-center px-4 py-2 border border-[#C7B268] text-[#C7B268] rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#C7B268] hover:text-black transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  disabled={page === joinedData?.meta?.totalpage || joinedData?.meta?.totalpage == 0}
                  onClick={() => setPage(page + 1)}
                  className="flex items-center justify-center px-4 py-2 bg-[#C7B268] text-black rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}