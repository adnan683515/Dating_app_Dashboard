import { useQuery } from "@tanstack/react-query";
import { fetchTopListings } from "./topListing";







const TopPerformingListings = () => {


  const { data: topListingData, isLoading, error } = useQuery({
    queryKey: ['topListings'],
    queryFn: fetchTopListings,
  })



  if (isLoading) {
    return <div className="flex justify-center items-center"> <h1>Loading....</h1> </div>
  }

  if (error) {
    return <div>
      <h1>Something Error</h1>
    </div>
  }


  return (
    <div className="w-full ">
      {/* Main Container with subtle border and rounded corners */}
      <div className="bg-[#111827] border border-gray-800/40 rounded-xl overflow-hidden shadow-2xl">


        <div className="bg-[#111827] px-6 py-5">
          <h2 className="text-white text-[20px] font-semibold tracking-tight">
            Top Performing Listings
          </h2>
        </div>


        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Table Column Headers - Pure Black to match Title */}
              <tr className="bg-[#0B1220]  text-[18px] tracking-wider text-white  border-b border-gray-800/50">
                <th className="px-6 py-4">Listing Title</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Inquiries</th>
                <th className="px-6 py-4">Conversion Rate</th>
              </tr>
            </thead>

            {/* Table Body - Deep Charcoal/Navy Background */}
            <tbody className="bg-[#111827] divide-y divide-gray-800/20">
              {!topListingData?.length ? 
              
              <tr>
                <td colSpan={100} className="py-10">
                  <div className="flex justify-center items-center">
                    <h1 className="text-white">Not found</h1>
                  </div>
                </td>
              </tr>
                : topListingData?.map((item: { listingTitle: string, views: number, inquiries: number, conversionRate: number }, inx: number) => (
                  <tr
                    key={inx}
                    className="group hover:bg-white/2 transition-colors duration-200"
                  >
                    <td className="px-6 py-5 text-[16px] text-gray-300 font-medium">
                      {item.listingTitle}
                    </td>
                    <td className="px-6 py-5 text-[16px] text-gray-400">
                      {item.views}
                    </td>
                    <td className="px-6 py-5 text-[16px] text-gray-400">
                      {item.inquiries}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-emerald-500 text-[16px] font-semibold">
                        {item.conversionRate}%
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopPerformingListings;