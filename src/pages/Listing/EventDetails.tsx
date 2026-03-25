import { useQuery } from "@tanstack/react-query";
import { BadgeDollarSign, House, MapPin, Users } from "lucide-react";
import { useParams } from "react-router";
import { fetchEvent, formatDateTime, getLineUpofEvent, getStatus } from "./details";



export default function EventDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id as string),
  });


  const { data: lineupData, isLoading: lineupLoading } = useQuery({
    queryKey: [id],
    queryFn: () => getLineUpofEvent(id as string)
  })

  console.log(lineupData)


  if (isLoading) return <h1 className="text-white text-center">Loading...</h1>;




  return (
    <div className="flex gap-10">

      <div className=" text-white flex-1">

        {/* Hero */}
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src={data?.image}
            alt="event"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Title + Status */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-bold">{data?.title}</h1>

          <span className="px-4 py-1 rounded-full bg-[#C7B268] text-black text-sm">
            {getStatus(data?.status)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
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
            <p className="font-semibold text-lg">
              {formatDateTime(data?.start_date_time)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-xs">End Time</p>
            <p className="font-semibold text-lg">
              {formatDateTime(data?.end_date_time)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400 text-xs">Open Door</p>
            <p className="font-semibold text-lg">
              {formatDateTime(data?.openDoor)}
            </p>
          </div>

        </div>

        {/* Attendance + Lineup */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <Users />
            <p>
              {data?.attendanceTotal > 0
                ? `${data?.attendanceTotal} attending`
                : "No attendees yet"}
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <Users />
            <p>
              {data?.lineupMember > 0
                ? `${data?.lineupMember} lineup members`
                : "No lineup yet"}
              {/* {data} */}
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-2xl flex items-center gap-3">

            <p>
              Category :  {data?.category?.name}
            </p>
          </div>
        </div>

        {/* Venue */}

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="mt-6 p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <MapPin />
            <p>{data?.venue}</p>
          </div>



          <div className="mt-6 p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <BadgeDollarSign />
            <p>{data?.fee}$</p>
          </div>
          <div className="mt-6 p-4 bg-white/5 rounded-2xl flex items-center gap-3">
            <House />
            <p>{data?.addRess}</p>
          </div>



        </div>

        {/* Organizer */}
        <div className="mt-8 flex items-center gap-4">
          <img
            src={data?.user?.image}
            className="w-14 h-14 rounded-full object-cover"
          />
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


      <div className="">
        <h2 className="text-xl font-semibold text-white mb-4">Lineup Members</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lineupData?.data?.map((item: { name: string; _id: string }) => (
            <div
              key={item._id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur 
                   hover:scale-105 hover:border-[#C7B268] transition-all duration-300"
            >
              <div className="flex items-center gap-3">

                {/* Avatar (auto generated) */}
                <div className="w-10 h-10 rounded-full bg-[#C7B268] flex items-center justify-center text-black font-bold">
                  {item.name.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">Performer</p>
                </div>

              </div>
            </div>
          ))}
        </div>


        <div>
           <h2 className="text-xl font-semibold text-white mt-6">Joined Members</h2>


        </div>
      </div>

      
    </div>
  );
}