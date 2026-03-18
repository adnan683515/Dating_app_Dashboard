import { CheckCircle2, Eye, Store, Wrench, XCircle } from 'lucide-react';

interface RequestData {
    id: string;
    userName: string;
    email: string;
    businessName: string;
    type: 'Shop' | 'Builder';
    date?: string;
    status?: 'Approved' | 'Denied';
}

const RequestTable = ({ title, data, isPending }: { title: string; data: RequestData[]; isPending: boolean }) => {
    return (

        <div className="border border-gray-800 mb-8 rounded-lg overflow-hidden bg-black">
            {/* Header Section: Pure Black Background */}
            <div className="bg-black">
                <h2 className="text-white text-xl font-semibold pb-6 px-6 pt-6">{title}</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-175">
                        <thead>
                            <tr className=" text-sm border-b border-gray-800 bg-black">
                                <th className="pb-4 px-6 font-medium">User Name</th>
                                <th className="pb-4 px-6 font-medium">Business Name</th>
                                <th className="pb-4 px-6 font-medium">Type</th>
                                {isPending ? (
                                    <th className="pb-4 px-6 font-medium">Submitted Date</th>
                                ) : (
                                    <th className="pb-4 px-6 font-medium">Status</th>
                                )}
                                <th className="pb-4 px-6 font-medium text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-[#0B1220] divide-y divide-gray-800/50">
                            {data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="text-gray-300 group bg-white/5 transition-colors"
                                >
                                    <td className="py-5 px-6">
                                        <div className="font-semibold text-white">{row.userName}</div>
                                        <div className="text-xs text-gray-500">{row.email}</div>
                                    </td>
                                    <td className="py-5 px-6 text-sm">{row.businessName}</td>
                                    <td className="py-5 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${row.type === 'Shop'
                                                ? 'bg-blue-900/20 text-blue-400 border-blue-800/50'
                                                : 'bg-purple-900/20 text-purple-400 border-purple-800/50'
                                            }`}>
                                            {row.type === 'Shop' ? <Store size={12} /> : <Wrench size={12} />}
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-sm">
                                        {isPending ? row.date : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Approved' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'
                                                }`}>
                                                {row.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                                <Eye size={18} />
                                            </button>
                                            {isPending && (
                                                <div className="flex gap-2">
                                                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#064e3b] hover:bg-[#065f46] text-green-400 rounded-lg text-sm font-medium transition-all border border-green-800/30 whitespace-nowrap">
                                                        <CheckCircle2 size={16} /> Approve
                                                    </button>
                                                    <button className="flex items-center gap-2 px-4 py-1.5 bg-[#451a1a] hover:bg-[#7f1d1d] text-red-400 rounded-lg text-sm font-medium transition-all border border-red-800/30 whitespace-nowrap">
                                                        <XCircle size={16} /> Deny
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)

};

export default function UserVerifications() {
    const pending: RequestData[] = [
        { id: '1', userName: 'AutoParts Pro', email: 'Contact@Autopartspro.Com', businessName: 'AutoParts Pro LLC', type: 'Shop', date: '1/20/2024' },
        { id: '2', userName: 'Mike Johnson', email: 'Mike.J@Email.Com', businessName: 'Custom Builds By Mike', type: 'Builder', date: '1/19/2024' },
        { id: '3', userName: 'Emily Brown', email: 'Emily.Brown@Email.Com', businessName: 'Classic Restorations', type: 'Builder', date: '1/20/2024' },
    ];

    const processed: RequestData[] = [
        { id: '4', userName: 'TuneWorks', email: 'Info@Tuneworks.Com', businessName: 'TuneWorks Performance', type: 'Shop', status: 'Approved' },
        { id: '5', userName: 'Speed Shop', email: 'Info@Speedshop.Com', businessName: 'The Speed Shop', type: 'Shop', status: 'Denied' },
    ];

    return (
        <div className="my-10">

            <div className="">
                <RequestTable title="Pending Requests" data={pending} isPending={true} />



                <RequestTable title="Processed Requests" data={processed} isPending={false} />
            </div>
        </div>
    );
}