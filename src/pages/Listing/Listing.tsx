

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import AddEventModal from "./EventModal";
import { useEvents } from "./getAllEvents";
// import AddEventModal from "./AddEventModal";

export default function EventPage() {
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentpage] = useState<number>(1)

  const { data, isLoading, error } = useEvents({ page: currentPage, limit: 15, status: '', tags: 'VIP' });

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events</div>;

  console.log(data, "event")



  return (
    <div className="p-6 bg-black min-h-screen text-white">


      {/* Dummy List */}
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-[#0F172A] border border-white/10"
          >
            <h2 className="text-lg font-semibold">Event Title</h2>
            <p className="text-sm text-gray-400">Dhaka, BD</p>
            <p className="text-[#C7B268] font-bold mt-2">$500</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-2xl font-bold">All Events</h1>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C7B268] text-black font-semibold hover:opacity-90"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>


      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-[16px] font-medium text-gray-500">Event</th>
                <th className="px-4 py-2 text-left text-[16px]  font-medium text-gray-500">Category</th>
                <th className="px-4 py-2 text-left text-[16px] font-medium text-gray-500">Fee</th>
                {/* <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">LineupMember</th> */}
                <th className="px-4 py-2 text-left text-[16px] font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">Attendance</th>
                <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-200">
              {data?.data?.map((event) => (
                <tr key={event._id} className="hover:bg-gray-950 cursor-pointer">
                  <td className="px-4 py-2 flex items-center gap-3">
                    <img
                      src={event.image || "https://via.placeholder.com/60"}
                      alt={event.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{event.title.slice(15)}...</p>
                      <p className="text-sm text-white">{new Date(event.start_date_time).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-white">{event.category.name}</td>
                  <td className="px-4 py-2 text-white">{event.fee}$</td>
                  {/* <td className="px-4 py-2 text-white text-center">
                    {event?.lineupMember > 0
                      ? `${event.lineupMember} lineup members`
                      : "No lineup yet"}
                      {event?.lineupMember}
                  </td> */}

                  <td className="px-4 py-2 text-white text-center">
                    {event.status
                      .replace(/([A-Z])/g, '$1') // Add a space before each capital letter
                      .trim()                      // Remove leading space
                      .toLowerCase()               // Convert all to lowercase
                      .replace(/^./, str => str.toUpperCase())} {/* Capitalize first letter */}
                  </td>

                  <td className="px-4 py-2 text-white text-center">
                    {event.attendanceTotal > 0
                      ? `${event.attendanceTotal} People attending`
                      : "No attendees yet"}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <Link to={`/dashboard/event-details/${event?._id}`}>
                      <button

                        className="bg-linear-to-b from-[#FF00FF] to-[#FF1493] text-white px-3 py-1 rounded  cursor-pointer hover:scale-105 text-sm"
                      >
                        View
                      </button>
                    </Link>
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          {/* {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-white text-gray-700"
              }`}
          >
            {i + 1}
          </button>
        ))} */}
        </div>

        {/* Modal */}
        {/* <Dialog open={!!selectedEvent} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-bold">{selectedEvent?.title}</Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              <p>Status: {selectedEvent?.status}</p>
              <p>Attendance: {selectedEvent?.attendanceTotal}</p>
              <p>Venue: {selectedEvent?.venue}</p>
              <p>
                Date: {new Date(selectedEvent?.start_date_time || "").toLocaleString()} -{" "}
                {new Date(selectedEvent?.end_date_time || "").toLocaleString()}
              </p>
            </Dialog.Description>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog> */}
      </div>


      <div className="flex justify-end">
        <div className="flex justify-center gap-2 mt-4">

          <button
            onClick={() => setCurrentpage(currentPage - 1)}
            disabled={data?.meta?.page === 1}
            className={`px-4 py-2 rounded-l-full rounded-r-full 
    ${data?.meta?.page == 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#C7B268] cursor-pointer hover:bg-[#b49f5c]"}`}
          >
            <ChevronLeft />
          </button>



          <button
            onClick={() => setCurrentpage(currentPage + 1)}
            disabled={data?.meta?.page === data?.meta?.totalpage} // disable if last page
            className={`px-4 py-2 rounded-l-full rounded-r-full 
    ${data?.meta?.page === data?.meta?.totalpage
                ? "bg-gray-400 cursor-not-allowed" // disabled style
                : "bg-[#C7B268] cursor-pointer hover:bg-[#b49f5c]" // normal style
              }`}
          >
            <ChevronRight />
          </button>
        </div>

      </div>




      {/* Modal */}
      {open && <AddEventModal onClose={() => setOpen(false)} />}
    </div>
  );
}













