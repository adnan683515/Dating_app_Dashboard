import { CircleDollarSign, TrendingUp, Calendar, User } from "lucide-react";
import { Statics } from "./Statics";
import ActvieBoost from "./ActvieBoost";




const boostsStats = [
  {
    title: "Active Boosts",
    total: 5,
    bg: "#1F3A5F",
    icon: <TrendingUp className="text-blue-950" />,
    text: '#51A2FF',
  }, {

    icon: <CircleDollarSign className="text-green-400" />,
    title: "Total Revenue",
    total: 399.50,
    bg: "#00C95033",
    text: "#05DF72",

  }, {
    title: "Pending Payment",
    icon: <Calendar className="text-amber-300" />,
    bg: '#F0B10033',
    total: 45,
    text: "#FDC700",

  }, {
    title: "Total Views",
    icon: <User className="text-[#51A2FF]" />,
    bg: '#2B7FFF33',
    total: 43,
    text: "#51A2FF",
  }
]


export default function BoostedListing() {




  return (


    <div>

      <div className="grid mt-3 sm:mt-1  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {
          boostsStats?.map((item, key) => {
            return <div key={key} className={`bg-[#111827] px-4.25 py-4.25 flex flex-col gap-y-2 rounded-md border border-white/5 `}>

              <div className="flex items-center gap-x-2">

                <div className={`bg-[${item?.bg}] p-2 rounded-lg`}>{item?.icon}</div>
                <h1 className="text-white text-[16px]">{item?.title}</h1>

              </div>

              <div>
                <h1 className={`text-[${item?.text}] text-[20px]`}>${item?.total.toFixed(2)}</h1>
              </div>
            </div>
          })
        }
      </div>


     <div className="my-4 sm:my-10">
       <ActvieBoost></ActvieBoost>
     </div>

      <Statics></Statics>
    </div>
  )
}
