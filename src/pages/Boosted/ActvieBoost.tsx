import { TrendingUp } from 'lucide-react';
import React, { useState } from 'react';

interface Listing {
  id: number;
  title: string;
  user: string;
  duration: string;
  startDate: string;
  endDate: string;
  paymentStatus: 'Completed' | 'Pending';
  amount: string;
  views: string;
}

const listings: Listing[] = [
  { id: 1, title: '2019 BMW M3 - Competition Package', user: 'John Smith', duration: '7 Days', startDate: '1/18/2024', endDate: '1/25/2024', paymentStatus: 'Completed', amount: '$49.99', views: '1,247' },
  { id: 2, title: 'Turbo Kit - Universal Fit', user: 'AutoParts Pro', duration: '14 Days', startDate: '1/17/2024', endDate: '1/31/2024', paymentStatus: 'Completed', amount: '$89.99', views: '856' },
  { id: 3, title: '2020 Audi RS6 Avant', user: 'Mike Johnson', duration: '7 Days', startDate: '1/20/2024', endDate: '1/27/2024', paymentStatus: 'Pending', amount: '$49.99', views: '324' },
  { id: 4, title: 'Carbon Fiber Body Kit', user: 'TuneWorks', duration: '30 Days', startDate: '1/10/2024', endDate: '2/9/2024', paymentStatus: 'Completed', amount: '$149.99', views: '2,103' },
  { id: 5, title: '2021 Porsche 911 Turbo S', user: 'Emily Brown', duration: '7 Days', startDate: '1/19/2024', endDate: '1/26/2024', paymentStatus: 'Completed', amount: '$49.99', views: '1,891' },
  // Add more items here to test pagination...
];

const ITEMS_PER_PAGE = 5;

const ActvieBoost: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(listings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = listings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className=" bg-[#0a0f1c]    text-gray-200">
      <div className="">
        <h2 className="mb-6 text-xl font-semibold text-white">Active Boosted Listings</h2>
        
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#0f172a] shadow-2xl">
         
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-black border-gray-800 text-white">
                <tr>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Listing Title</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">User</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Duration</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Start Date</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">End Date</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Payment</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider">Amount</th>
                  <th className="px-6 py-4 font-medium  capitalized tracking-wider text-right">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {currentData.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-white/5">
                    <td className="flex items-center gap-3 px-6 py-5 font-bold text-white whitespace-nowrap">
                      <TrendingUp className='text-blue-900' />
                      {item.title}
                    </td>
                    <td className="px-6 py-5 text-gray-300">{item.user}</td>
                    <td className="px-6 py-5 text-gray-300">{item.duration}</td>
                    <td className="px-6 py-5 text-gray-300">{item.startDate}</td>
                    <td className="px-6 py-5 text-gray-300">{item.endDate}</td>
                    <td className="px-6 py-5">
                      <StatusBadge  status={item.paymentStatus} />
                    </td>
                    <td className="px-6 py-5 font-bold text-white">{item.amount}</td>
                    <td className="px-6 py-5 text-white text-right">{item.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="md:hidden divide-y divide-gray-800">
            {currentData.map((item) => (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <svg className="h-4 w-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {item.title}
                  </div>
                  <StatusBadge status={item.paymentStatus} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <div><span className="text-gray-600">User:</span> {item.user}</div>
                  <div className="text-right"><span className="text-gray-600">Views:</span> {item.views}</div>
                  <div><span className="text-gray-600">Start:</span> {item.startDate}</div>
                  <div className="text-right font-bold text-white">{item.amount}</div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex items-center justify-between border-t border-gray-800 bg-[#0f172a] px-6 py-4">
            <p className="text-xs text-gray-500">
              Showing <span className="text-gray-300">{startIndex + 1}</span> to <span className="text-gray-300">{Math.min(startIndex + ITEMS_PER_PAGE, listings.length)}</span> of <span className="text-gray-300">{listings.length}</span> results
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-700 px-3 py-1 text-xs font-medium text-gray-300 transition hover:bg-gray-800 disabled:opacity-30"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-700 px-3 py-1 text-xs font-medium text-gray-300 transition hover:bg-gray-800 disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Status Badge Component
const StatusBadge = ({ status }: { status: 'Completed' | 'Pending' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
    status === 'Completed' 
      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
  }`}>
    {status}
  </span>
);

export default ActvieBoost;