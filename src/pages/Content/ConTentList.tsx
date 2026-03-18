import {
    ChevronLeft,
    ChevronRight,
    CircleCheck,
    Eye,
    OctagonAlert,
    Trash2,

    TriangleAlert
} from 'lucide-react';
import React, { useState } from 'react';
import type { Listing } from '../../config/type';



// --- Sample Data ---
const MOCK_DATA: Listing[] = [
    {
        id: 1,
        title: '2020 Mercedes-AMG C63S',
        user: 'John Smith',
        reason: 'Suspected fraudulent pricing',
        serevity: 'HIGH',
        status: 'Pending',
        paymentStatus: 'Completed',
        amount: '$49.99',
        views: '1,247',
        reasobBy: "Rimon islam"
    },
    {
        id: 2,
        title: 'Best turbo kit recommendations?',
        user: 'AutoParts Pro',
        reason: 'Spam content',
        serevity: 'LOW',
        status: 'Pending',
        paymentStatus: 'Completed',
        amount: '$89.99',
        views: '856',
        reasobBy: "Shakil Ahmed"
    },
    {
        id: 3,
        title: 'Conversation with seller',
        user: 'Mike Johnson',
        reason: 'Inappropriate language',
        serevity: 'MEDIUM',
        status: 'Reviewed',
        paymentStatus: 'Pending',
        amount: '$49.99',
        views: '324',
        reasobBy: "Kabir"
    },
    {
        id: 4,
        title: 'Performance Parts Bundle',
        user: 'TuneWorks',
        reason: 'Misleading description',
        serevity: 'LOW',
        status: 'Pending',
        paymentStatus: 'Completed',
        amount: '$149.99',
        views: '2,103',
        reasobBy: "Rokeya"
    },
    {
        id: 5,
        title: 'Check out my new build!',
        user: 'Emily Brown',
        reason: 'Spam/Self-promotion',
        serevity: 'HIGH',
        status: 'Removed',
        paymentStatus: 'Completed',
        amount: '$49.99',
        views: '1,891',
        reasobBy: "Nabila"
    },
];




const ConTentList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);

    const paginatedData = MOCK_DATA.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="   text-slate-300">
            <div className="">
                <h2 className="mb-6 text-xl font-semibold text-white tracking-tight">
                    Flagged Content
                </h2>

                <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]/50 shadow-2xl backdrop-blur-sm">

                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-800 bg-black text-[16px] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Content</th>
                                    <th className="px-6 py-4 font-medium">User Name</th>
                                    <th className="px-6 py-4 font-medium">Reason</th>
                                    <th className="px-6 py-4 font-medium">Severity</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Actions</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {paginatedData.map((item) => (
                                    <tr key={item.id} className="transition-colors hover:bg-slate-800/40">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">

                                                <span className="text-[16px] text-white whitespace-nowrap">{item.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">{item.user}</td>
                                        <td className="px-6 py-5 flex flex-col gap-y-2">

                                            <span className='text-[17px] '>{item.reason}</span>

                                            <span className='font-light tracking-wider'>{item?.reasobBy}</span>
                                        </td>
                                        <td className="px-6 py-5 ">


                                            <span
                                                className={`capitalize flex justify-center items-center gap-x-1 px-3 font-semibold py-1 rounded-full
                                                         ${item?.serevity === 'HIGH'
                                                        ? 'bg-[#FB2C3633] text-red-500'
                                                        : item?.serevity === 'MEDIUM'
                                                            ? 'bg-[#F0B10033] text-[#FDC700]'
                                                            : item?.serevity === 'LOW'
                                                                ? 'bg-[#2B7FFF33] text-[#51A2FF] '
                                                                : ''
                                                    }
  `}
                                            >
                                                {item?.serevity == "HIGH"
                                                    ? <OctagonAlert size={15} /> : item?.serevity == "MEDIUM" ? <TriangleAlert className='text-yellow-300' size={15} /> : ""}
                                                {item.serevity.toLowerCase()}
                                            </span>

                                        </td>
                                        <td className="px-6 py-5 text-slate-400">
                                            <span className={` px-3 rounded-l-full rounded-r-full py-1 
                                                ${item?.status == "Pending"
                                                    ? 'bg-[#F0B10033] text-yellow-400' :
                                                    item?.status == "Reviewed" ? 'bg-[#00C95033] text-green-400' : "bg-[#FB2C3633] text-red-400"} `}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-5 flex items-center flex-wrap gap-2">


                                            <Eye size={17} />

                                            {
                                                item?.status == "Pending" && <div className='flex items-center gap-x-2'>
                                                    <button className='bg-[#00C95033] text-[13px] flex items-center gap-x-1 px-2.5 py-2 rounded-md text-green-400'>  <CircleCheck size={15} /> Approve</button>
                                                    <button className='bg-[#FB2C3633] text-[13px] flex items-center gap-x-1 px-2.5 py-2 rounded-md text-red-400'>  <Trash2 size={15} /> Removed</button>

                                                </div>
                                            }
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View: Visible only on small screens */}
                    <div className="block lg:hidden divide-y divide-slate-800">
                        {paginatedData.map((item) => (
                            <div key={item.id} className="p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-2">

                                        <span className="font-bold text-white leading-tight">{item.title}</span>
                                    </div>
                                    <StatusBadge status={item.paymentStatus} />
                                </div>
                                <div className="grid grid-cols-2 gap-y-3 text-xs border-t border-slate-800/50 pt-3">
                                    <div><p className="text-slate-500">User</p><p>{item.user}</p></div>
                                    <div className="text-right"><p className="text-slate-500">Views</p><p className="font-mono">{item.views}</p></div>
                                    <div><p className="text-slate-500">reason</p><p>{item.reason}</p></div>
                                    <div className="text-right"><p className="text-slate-500">Amount</p><p className="text-white font-bold">{item.amount}</p></div>
                                </div>
                                <div className="px-6 w-full py-5 flex items-center flex-wrap gap-2">


                                    <Eye size={17} />

                                    {
                                        item?.status == "Pending" && <div className='flex items-center gap-x-2'>
                                            <button className='bg-[#00C95033] text-[13px] flex items-center gap-x-1 px-2.5 py-2 rounded-md text-green-400'>  <CircleCheck size={15} /> Approve</button>
                                            <button className='bg-[#FB2C3633] text-[13px] flex items-center gap-x-1 px-2.5 py-2 rounded-md text-red-400'>  <Trash2 size={15} /> Removed</button>

                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Smooth Pagination Footer */}
                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/30 px-6 py-4">
                        <span className="text-xs text-slate-500">
                            Showing <span className="text-slate-300">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-slate-300">{Math.min(currentPage * itemsPerPage, MOCK_DATA.length)}</span> of <span className="text-slate-300">{MOCK_DATA.length}</span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-400 transition hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Badge Sub-component ---
const StatusBadge = ({ status }: { status: string }) => {
    const isCompleted = status === 'Completed';
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isCompleted
            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            }`}>
            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {status}
        </span>
    );
};

export default ConTentList;