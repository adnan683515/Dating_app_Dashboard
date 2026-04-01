import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Loader from '../Loader/Loader';
import { upDateTicket, useBookings } from './content';




const ConTentList: React.FC = () => {
    const [limit, setLimit] = useState(10);
    const [countOfTicket, setCountOfTicket] = useState<number | null>(null)
    const [updatedBookId, setUpdateBookId] = useState<string | null>(null)
    const [status, setStatus] = useState<"PAID" | "FAILED" | "UNPAID">("PAID");
    const { data: bookingList, isLoading, error, refetch } = useBookings({ page: 1, limit: limit, paymentStatus: status ? status : '' });



    console.log(bookingList?.data)

    const onChnageCountEvent = async (value: number, id: string) => {
        setCountOfTicket(value)
        setUpdateBookId(id)
    }

    const handleUpdate = async () => {
        if (!updatedBookId || !countOfTicket) {
            return { msg: "Must be add id and count" }
        }

        try {
            const bd = { useCount: countOfTicket }
            const res = await upDateTicket(bd, updatedBookId)
            if (res?.success) {
                toast.success('update successfully!')
                refetch()
            }

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            console.log(err)
        }
        finally {
            setCountOfTicket(null)
            setUpdateBookId(null)
        }


    }





    return (
        <div className="  min-h-screen text-white my-4">


            <div className="flex gap-3">

                {/* PAID */}
                <button
                    onClick={() => setStatus("PAID")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
    ${status === "PAID"
                            ? "bg-green-500/20 text-green-400 border-green-400"
                            : "bg-transparent text-gray-400 border-gray-600"
                        }`}
                >
                    PAID
                </button>

                {/* FAILED */}
                <button
                    onClick={() => setStatus("FAILED")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
    ${status === "FAILED"
                            ? "bg-red-500/20 text-red-400 border-red-400"
                            : "bg-transparent text-gray-400 border-gray-600"
                        }`}
                >
                    FAILED
                </button>

                {/* UNPAID */}
                <button
                    onClick={() => setStatus("UNPAID")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
    ${status === "UNPAID"
                            ? "bg-pink-500/20 text-pink-400 border-pink-400"
                            : "bg-transparent text-gray-400 border-gray-600"
                        }`}
                >
                    UNPAID
                </button>

            </div>


            <div className="overflow-x-auto mt-6 rounded-xl 
  bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
                <table className="min-w-full rounded-xl divide-y divide-gray-200">
                    <thead className="bg-white/5   backdrop-blur-lg border border-white/10 shadow-xl ">
                        <tr>
                            <th className="p-3">Image</th>
                            <th className="p-3">Event Title</th>
                            <th className="p-3 hidden md:table-cell">User</th>
                            <th className="p-3">Fee</th>
                            <th className="p-3">Tickets</th>
                            <th className="p-3">Booking Status</th>
                            <th className="p-3">Ticket Use</th>
                        </tr>
                    </thead>

                    <tbody className='bg-black divide-y divide-gray-200'>
                        {isLoading ? <tr className='' >
                            <td colSpan={100}>
                                <Loader></Loader>
                            </td>
                        </tr> : bookingList?.data?.map((item, index) => (
                            <tr
                                key={item._id}
                                className="border-b border-slate-700  transition-all duration-300"
                                style={{
                                    animation: `fadeIn 0.4s ease ${index * 0.05}s forwards`,
                                    opacity: 0,
                                }}
                            >
                                {/* Event Image */}
                                <td className="p-3 flex gap-x-2 items-center justify-center">
                                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                    <img
                                        src={item?.eventId?.image}
                                        alt="event"
                                        className="w-12  h-12 md:w-14 md:h-14 object-cover rounded-lg"
                                    />

                                </td>

                                {/* Title */}
                                <td className="p-3 font-semibold text-center text-sm md:text-base">
                                    {item?.eventId?.title}
                                </td>

                                {/* User (hide on mobile) */}
                                <td className="p-3 hidden text-center md:table-cell">
                                    {item?.userId?.displayName}
                                </td>

                                {/* Fee */}
                                <td className="p-3 text-center text-[#C7B268] font-semibold">
                                    $ {item?.fee}
                                </td>

                                {/* Ticket Count */}
                                <td className="p-3 text-center">{item?.ticketCount}</td>

                                {/* Payment Status */}
                                <td className="p-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${item?.paymentStatus === 'PAID'
                                            ? "bg-green-500/20 text-green-400"
                                            : item?.paymentStatus === "FAILED"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-pink-500/20 text-pink-400"
                                            }`}
                                    >
                                        {item?.paymentStatus}
                                    </span>
                                </td>



                                <td className="p-3 text-center">
                                    <div className="flex items-center justify-center gap-2">



                                        <input
                                            type="number"
                                            defaultValue={item?.useCount}
                                            min={0}
                                            onChange={(e) => {
                                                onChnageCountEvent(Number(e.target.value), item?._id)
                                            }}
                                            max={item?.ticketCount}
                                            className="w-16 text-center bg-slate-800 border border-slate-600 rounded-lg py-1"
                                        />



                                        <button
                                            disabled={
                                                ['FAILED', 'UNPAID'].includes(item?.paymentStatus) ||
                                                Number(item?.ticketCount) === Number(item?.useCount)
                                            }
                                            onClick={handleUpdate}
                                            className={`relative px-2 py-1 rounded-lg font-semibold text-sm text-white 
  shadow-lg transition-all duration-300
  before:absolute before:inset-0 before:rounded-lg 
  before:bg-white/10 before:opacity-0 hover:before:opacity-100

  ${['FAILED', 'UNPAID'].includes(item?.paymentStatus) ||
                                                    Number(item?.ticketCount) === Number(item?.useCount)
                                                    ? "bg-gray-500 opacity-60 cursor-not-allowed"
                                                    : "bg-linear-to-r from-[#FF1493] to-[#FF00FF] hover:scale-105 cursor-pointer"
                                                }`}
                                        >
                                            ✨ Update
                                        </button>

                                    </div>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination (ONLY 2 BUTTON) */}
            <div className="flex justify-end mt-6 gap-4">


                {/* 🔽 Limit Dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">Show:</span>

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="bg-slate-800 border border-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                    </select>
                </div>
                <button className="px-4 py-2 rounded-lg font-semibold cursor-pointer bg-[#C7B268] text-black hover:opacity-80 transition">
                    <ChevronLeft />
                </button>

                <button className="px-4 py-2 rounded-lg font-semibold bg-linear-to-r cursor-pointer from-[#FF1493] to-[#FF00FF] text-white hover:opacity-80 transition">
                    <ChevronRight />
                </button>
            </div>

            {/* Animation */}
            <style>
                {`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
            </style>
        </div>
    );
};


export default ConTentList;