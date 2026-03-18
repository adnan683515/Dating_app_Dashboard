import { CircleCheck, Clock, Facebook, Menu, TrendingUp, Users } from "lucide-react";
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



const listing = [
  {
    title: 'New Listing Created',
    subtitle: '2019 BMW M3 - Listed by Mike Johnson',
    time: '12 minutes ago',
    icon: <Clock size={16} />
  },
  {
    title: 'Listing Boosted',
    subtitle: 'Turbo Kit - Boosted for 7 days',
    time: '12 minutes ago',
    icon: <Clock size={16} />
  },
  {
    title: 'Verification Request',
    subtitle: 'AutoParts Pro requested shop verification',
    time: '12 minutes ago',
    icon: <Clock size={16} />
  },
  {
    title: 'New Listing Created',
    subtitle: 'John Smith registered as a seller',
    time: '1 minutes ago',
    icon: <Clock size={16} />
  },
  {
    title: 'New User Registration',
    subtitle: '2019 BMW M3 - Listed by Mike Johnson',
    time: '12 hours ago',
    icon: <Clock size={16} />
  },

  {
    title: 'New Listing Created',
    subtitle: '2019 BMW M3 - Listed by Mike Johnson',
    time: '12 minutes ago',
    icon: <Clock size={16} />
  },
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


          <div className="bg-white/2 lg:w-2/3 p-6 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl overflow-hidden">



            <div className="flex flex-col">
              {listing?.map((item, key) => (
                <div
                  key={key}
                  className="flex gap-x-3 px-4 py-2 transition-all duration-300 hover:bg-white/5 group border-b border-white/10 last:border-0"
                >

                  <div className="relative shrink-0 mt-3">
                    <div className="bg-[#1F3A5F] h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)] group-hover:scale-125 transition-transform" />

                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-px h-full bg-white/5 group-last:hidden" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <h1 className="text-[20px] font-semibold   tracking-wider  text-white  ">
                      {item?.title}
                    </h1>

                    <h2 className="text-[#CBD5E1] text-[14px]">
                      {item?.subtitle}
                    </h2>

                    <div className="flex gap-x-2 items-center pt-1">
                      <div className="text-[#CBD5E1]">
                        {item?.icon}
                      </div>
                      <span className="text-[12px] font-semibold   text-[#CBD5E1]">
                        {item?.time}
                      </span>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </div>



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




    </div>
  )
}
