

import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router";
import AddEventModal from "./EventModal";
import { eventStatusCount, useEvents } from "./getAllEvents";
import Loader from "../Loader/Loader";

import { FaClock, FaDoorOpen, FaPlay, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { EventTags } from "../../config/type";
import { STATUS_CONFIG } from "./listing";





const statusColors: Record<string, string> = {
  NOSTART: "from-[#C7B268] to-[#776a39]",
  "OPEN DOOR": "from-[#FF00FF] to-[#D400D4]",
  GOING: "from-green-500 to-green-700",
  END: "from-gray-600 to-gray-800",
  CANCELLED: "from-red-500 to-red-700",
};

const statusIcons: Record<string, JSX.Element> = {
  NOSTART: <FaClock size={24} />,
  "OPEN DOOR": <FaDoorOpen size={24} />,
  GOING: <FaPlay size={24} />,
  END: <FaCheckCircle size={24} />,
  CANCELLED: <FaTimesCircle size={24} />,
};




const tagStyles: Record<EventTags, string> = {
  VIP: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black",
  NEARBY: "bg-gradient-to-r from-green-400 to-green-600 text-white",
  ROOFTOP: "bg-gradient-to-r from-purple-500 to-indigo-600 text-white",
  OUTDOOR: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
};


export default function EventPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const tags = Object.values(EventTags);
  const [selectTag, setSeletectTag] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [currentPage, setCurrentpage] = useState<number>(1)
  const { data, isLoading, error } = useEvents({ page: currentPage, limit: 15, status: selectedStatus, tags: selectTag, searchTerm: debouncedSearch });



  // Debounce logic (2 sec)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, [search]);


  console.log(selectedStatus)


  const { data: statusCount } = useQuery({
    queryKey: ['statusCount'],
    queryFn: (async () => {
      const ans = await eventStatusCount()
      return ans?.data
    })
  })


  const statusData = {
    NOSTART: statusCount?.NOSTART,
    "OPEN DOOR": statusCount?.OPENDOOR,
    GOING: statusCount?.GOING,
    END: statusCount?.END,
    CANCELLED: statusCount?.CANCELLED,
  };





  if (error) return <div>Error loading events</div>;

  return (
    <div className=" bg-black min-h-screen text-white">

      <div className="grid grid-cols-1 my-3 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {Object.entries(statusData).map(([status, count]) => (
          <div
            key={status}
            className={`relative  animate-pulse overflow-hidden p-6 rounded-2xl text-white flex flex-col items-center justify-center 
  shadow-xl backdrop-blur-xl border border-white/10 
  bg-linear-to-br ${statusColors[status]} 
  before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-2xl before:rounded-2xl
  transform hover:scale-105 transition-all duration-300 group`}
          >
            {/* Shine Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
              <div className="absolute -top-1/2 left-[-50%] w-[200%] h-[200%] 
    bg-linear-to-r from-transparent via-white/30 to-transparent 
    rotate-12 -translate-x-full group-hover:translate-x-full 
    transition-transform duration-1000"></div>
            </div>

            {/* Glow Background Blur */}
            <div className={`absolute inset-0 blur-2xl opacity-30 ${statusColors[status]}`}></div>

            {/* Icon */}
            <div className="absolute top-4 right-4 opacity-30 z-10">
              {statusIcons[status]}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold z-10">{status}</h3>
            <p className="text-4xl font-extrabold z-10 mt-2">{count}</p>

            <div className="mt-3 w-10 h-1 rounded-full bg-white/30 z-10"></div>
          </div>
        ))}
      </div>


      <div className="flex sm:flex-row flex-col items-center justify-between mt-6 gap-4">

        {/* Left Section */}
        <div className="flex flex-col gap-3 w-full max-w-xl">
          <h1 className="text-2xl font-bold">All Events</h1>


          <input
            type="text"
            placeholder="Search by name or location ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B1120] border border-[#C7B268]/40 rounded-xl py-3 px-4 text-white placeholder:text-pink-300/60 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:border-pink-400 transition-all"
          />


          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => setSeletectTag(tag)}
                className={`
                  
      relative px-4 py-1.5 
      text-sm font-medium 
      rounded-full 
      shadow-md 
      cursor-pointer 
                
      transition-all  animate-pulse duration-300 hover:scale-105

      ${tagStyles[tag as EventTags]}

      ${tag === selectTag ? "text-white" : ""}
    `}
              >
                {/* Border Layer */}
                {tag === selectTag && (
                  <span className="absolute inset-0 rounded-full p-0.5 bg-linear-to-r from-amber-400 to-pink-500">
                    <span className="block w-full h-full rounded-full bg-black/80" />
                  </span>
                )}

                {/* Text */}
                <span className="relative flex gap-x-1 items-center z-10">
                  {tag == EventTags.VIP && <Star size={16}></Star>} {tag}
                </span>
              </span>
            ))}
          </div>

        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(STATUS_CONFIG).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedStatus(key)}
              className={`
        px-4 py-1.5 rounded-full text-sm font-medium 
        border transition-all animate-pulse duration-300 cursor-pointer

        ${selectedStatus === key
                  ? `${value.color} scale-105 shadow-md`
                  : "bg-white/10 text-gray-300 border-white/10 hover:bg-white/20"
                }
      `}
            >
              {value.label}
            </button>
          ))}
        </div>




        {/* Right Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-5 py-3 h-10
    rounded-xl bg-linear-to-r from-[#C7B268] to-[#776a39] 
    text-white font-semibold hover:opacity-90 whitespace-nowrap"
        >
          <Plus size={18} />
          Add Event
        </button>

      </div>

      <div className="">
        <div className="overflow-x-auto mt-6 rounded-xl 

         bg-linear-to-br from-black via-gray-900 to-black shadow-2xl 
  backdrop-blur-lg  border border-white/10 ">
          <table className="min-w-full rounded-xl divide-y divide-gray-200">
            <thead className="bg-white/5 rounded-xl  backdrop-blur-lg border border-white/10 shadow-xl ">
              <tr>
                <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">Event</th>
                <th className="px-4 py-2 text-left text-[16px]  font-medium text-gray-500">Category</th>
                <th className="px-4 py-2 text-left text-[16px] font-medium text-gray-500">Fee</th>
                {/* <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">LineupMember</th> */}
                <th className="px-4 py-2 text-left text-[16px] font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">Attendance</th>
                <th className="px-4 py-2 text-center text-[16px] font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-200">
              {isLoading ? <tr>
                <td colSpan={100} className="text-center py-6">
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                </td>
              </tr> : !data?.data?.length ? <tr>
                <td colSpan={8} className="text-center text-white py-5">
                  No Events Found
                </td>
              </tr> : data?.data?.map((event) => (
                <tr key={event._id} className="border-t animate-pulse border-white/10 hover:bg-white/10 transition">
                  <td className="px-4  py-2 flex items-center gap-3">

                    <span className="w-2 animate-pulse h-2 bg-pink-500 rounded-full"></span>

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
                    <Link to={`/dashboard/add-event/event-details/${event?._id}`}>
                      <button className="flex rounded-lg items-center gap-2 px-4 py-1 bg-linear-to-r from-pink-500 to-pink-800 hover:from-pink-600 hover:to-pink-900 transition duration-300 transform hover:scale-105">
                        👁️ View
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

        </div>


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













