import { CircleCheck, Facebook, Menu, TrendingUp, Users } from "lucide-react";
import EventsMap from "./EventsMap";
import { useQuery } from "@tanstack/react-query";
import { topFiveEvents } from "./dashboard";
import { Link } from "react-router";
// import AuthHook from "../../Hooks/AuthHook";



const statsGrid = [
  {
    icon: <Users />,
    title: 'Total Users',
    count: 12845,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  }, {
    title: 'Total Listings',
    count: 3492,
    icon: <Menu />,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  },
  {
    icon: <CircleCheck />,
    title: 'Verification Requests',
    count: 324,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  },
  {
    icon: <Facebook />,
    title: 'Total Posts',
    count: 324,
    parcent: '+12%',
    analytics: <TrendingUp className="text-[#05DF72]" />
  }
]




const Quicks = [
  {
    title: 'Approve Listings',
    count: 34
  },
  {
    title: 'Verification Requests',
    count: 34
  },
  {
    title: 'View Reports',
    count: 34
  }
]


const system = [

  {
    title: 'API Status',
    value: 'Operational'
  }, {
    title: "Database",
    value: "Healthy"
  }, {
    title: "Storage",
    value: "78% Used"
  }
]




export default function Dashboard() {


  // const userData = AuthHook()

  // console.log(userData)


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['topFiveEvents'],
    queryFn: topFiveEvents,
  });

  return (
    <div className="mt-5 ">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {statsGrid?.map((item, key) => (
          <div
            key={key}
            className="relative overflow-hidden group bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-xl transition-all duration-300 hover:bg-white/15 hover:-translate-y-1"
          >

            <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-colors" />

            <div className="flex justify-between items-start">

              <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-[#324763] group-hover:scale-110 transition-transform duration-300">
                {item?.icon}
              </div>


              <div className={`text-[14px] flex font-bold gap-x-2 py-1 rounded-lg ${item?.parcent?.includes('-')
                ? 'bg-red-500/20 text-red-400'
                : ' text-[#05DF72]'
                }`}>
                <h1 >{item?.parcent}</h1>

                {item?.analytics}
              </div>
            </div>

            {/* Text Data */}
            <div className="mt-4">
              <p className="text-[#CBD5E1] text-[14px]   capitalize ">
                {item?.title || "Total Stats"}
              </p>
              <h3 className="text-2xl  text-white  ">
                {item?.count || "0.00"}
              </h3>
            </div>
          </div>
        ))}
      </div>





      <div className="mt-8">
        <div className="flex gap-y-4 sm:gap-y-2 flex-col lg:flex-row gap-x-6 ">


          <EventsMap></EventsMap>


          <div className="lg:w-1/3 flex flex-col gap-y-6">


            <div className=" bg-[#111827] h-1/2 border border-white/10 rounded-2xl px-5.5 py-6.5">

              <div className="space-y-3">
                <h1 className="text-white  text-xl capitalize">Quick Actions</h1>
                {
                  Quicks?.map((item, key) => {
                    return <div key={key} className="flex bg-[#1F3A5F] p-4 rounded-2xl justify-between">

                      <h1 className="text-[14px] text-white" >{item?.title}</h1>

                      <p className="text-[14px] text-white  bg-[#FFFFFF33] px-2 py-.5 rounded-full">{item?.count}</p>
                    </div>
                  })

                }
              </div>

            </div>

            <div className="bg-[#111827] h-1/2 border border-white/10 rounded-2xl px-5.5 py-6.5">

              <div className="space-y-3 ">
                <h1 className="text-white    text-xl capitalize">System Status</h1>

                {
                  system?.map((item, key) => {
                    return <div key={key} className="flex justify-between items-center" >

                      <h1 className="text-sm text-white">{item?.title}</h1>

                      <span className={`px-2 py-1 rounded-sm text-[12px] ${item?.title == "Storage" ? "bg-[#F0B10033] text-[#FDC700]" : "text-[#05DF72] bg-[#00C95033]"}`}>{item?.value}</span>
                    </div>
                  })
                }
              </div>

            </div>




          </div>



        </div>


      </div>





      <div className="text-center my-6">
     

        <h2 className="mt-4   text-3xl md:text-5xl font-extrabold text-white relative inline-block">
         <h1> Top 5 Events</h1>
          <span className="block text-pink-500 text-lg md:text-xl mt-1">
            Where Sparks Fly 💖
          </span>
          {/* Glow effect */}
          <span className="absolute inset-0 blur-xl opacity-30 bg-pink-500 rounded-full"></span>
        </h2>

      
      </div>






      <div className="w-full mt-10">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-3xl bg-linear-to-br from-black via-gray-900 to-black shadow-2xl border border-pink-500/20">
          <table className="w-full text-left border-collapse text-gray-200">

            <thead className="bg-linear-to-r from-pink-500/20 to-purple-500/20 text-gray-300 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-5">Event</th>
                <th className="p-5">Category</th>
                <th className="p-5">Venue</th>
                <th className="p-5">Attendance</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.map((event: any) => (
                <tr key={event._id} className="border-b border-white/10 hover:bg-white/5 transition duration-300">

                  {/* Event */}
                  <td className="p-5 flex items-center gap-4">
                    <img src={event.image} className="w-14 h-14 rounded-2xl object-cover border border-pink-400/40" />
                    <div>
                      <p className="font-semibold text-white">{event.title}</p>
                      <p className="text-xs text-gray-400 line-clamp-1 max-w-50">
                        {event.descripton}
                      </p>
                    </div>
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {event.category?.name}
                    </span>
                  </td>

                  <td className="p-5 text-gray-400">📍 {event.venue}</td>

                  <td className="p-5">
                    <span className="px-3 py-1 text-sm bg-pink-500/20 text-pink-300 rounded-full">
                      {event.attendanceTotal} joined 💖
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <Link to={`/dashboard/add-event/event-details/${event?._id}`}>
                      <button className="px-5 py-2 bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-xl">
                        View
                      </button>
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {data?.data?.map((event: any) => (
            <div
              key={event._id}
              className="bg-gray-900 border border-pink-500/20 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={event.image}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div>
                  <p className="text-white font-semibold">{event.title}</p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {event.descripton}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm text-gray-400">
                <span>{event.category?.name}</span>
                <span>📍 {event.venue}</span>
              </div>

              <div className="mt-2">
                <span className="px-3 py-1 text-xs bg-pink-500/20 text-pink-300 rounded-full">
                  {event.attendanceTotal} joined 💖
                </span>
              </div>

              <div className="mt-4 text-right">
                <Link to={`/dashboard/add-event/event-details/${event?._id}`}>
                  <button className="px-4 py-2 text-sm bg-linear-to-r from-pink-500 to-rose-500 text-white rounded-xl">
                    View
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}
