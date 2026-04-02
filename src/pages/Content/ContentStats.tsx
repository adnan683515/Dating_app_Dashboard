
import CountUp from "react-countup";
import { FaCheckCircle, FaRegMoneyBillAlt, FaShoppingCart, FaTimesCircle } from "react-icons/fa";
import { countBookingDocuments } from "./content";
import { useQuery } from "@tanstack/react-query";

type CounterCardProps = {
    title: string;
    start: number;
    end: number;
    styles: string;
    icon: React.ReactNode;
    isLoading : boolean;
};

const CounterCard = ({ title, start, end, styles, icon , isLoading }: CounterCardProps) => {
    return (
        <div
            className={`relative p-6 rounded-2xl border backdrop-blur-md transition duration-300 hover:scale-105 overflow-hidden ${styles}`}
        >
            {/* Text */}
            <div className="relative z-10">
                <h2 className="text-sm opacity-80">{title}</h2>

                <p className="text-3xl font-bold mt-3">
                  {isLoading ? 'Loading..' :  <CountUp start={start} end={end} duration={3} />} 
                </p> 
            </div>

            {/* Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20 text-4xl sm:text-5xl">
                {icon}
            </div>
        </div>
    );
};

export default function ContentStats() {


    const { data , isLoading } = useQuery({ queryKey: ['count'], queryFn: () => countBookingDocuments() })

    console.log(data)


    return (
        <div className=" text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <CounterCard
                    title="Total Payments"
                    start={0}
                    end={data?.total}
                    icon={<FaShoppingCart />}
                    isLoading={isLoading}
                    styles="bg-gradient-to-br from-green-500/20 to-green-700/10 text-green-400 border-green-400 shadow-lg shadow-green-500/10"
                />

                <CounterCard
                    title="Payment success"
                    start={0}
                    end={data?.paid}
                    icon={<FaCheckCircle />}
                    isLoading={isLoading}
                    styles="bg-gradient-to-br from-blue-500/20 to-blue-700/10 text-blue-400 border-blue-400 shadow-lg shadow-blue-500/10 rounded-3xl"
                />

                <CounterCard
                    title="Failed"
                    start={0}
                    end={data?.failed}
                    icon={<FaTimesCircle />}
                    isLoading={isLoading}
                    styles="bg-gradient-to-br from-red-500/20 to-red-700/10 text-red-400 border-red-400 shadow-xl shadow-red-500/20"
                />

                <CounterCard
                    title="Unpaid"
                    start={0}
                    end={data?.unpaid}
                    icon={<FaRegMoneyBillAlt />}
                    isLoading={isLoading}
                    styles="bg-gradient-to-br from-pink-500/20 to-purple-600/10 text-pink-400 border-pink-400 shadow-lg shadow-pink-500/10 rounded-xl"
                />

            </div>
        </div>
    )
}
