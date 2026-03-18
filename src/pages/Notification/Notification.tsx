import { Bell, Check, CircleAlert, Menu, Settings, Trash2, UserPlus } from "lucide-react"
import { useState } from "react"

const notificationArray = [
  {
    title: "Total Notifications",
    value: 6,
    colour: "white"
  }, {
    title: "Unread",
    value: 5,
    colour: "[#FDC700]"
  }, {
    title: "Read",
    value: 4,
    colour: "[#05DF72]"
  }
]
const btns = [
  {
    title: "All",
    value: 6
  }, {
    title: "Unread",
    value: 3
  }
]

const notifications = [
  {
    title: "New User Registration",
    sub: "5 new users registered today",
    time: "731 days ago",
    icon: <UserPlus className="text-[#05DF72]" />,
    bg: '[#00C95033]'
  }, {
    title: "Verification Request",
    sub: "3 new verification requests pending review",
    time: "731 days ago",
    icon: <CircleAlert className="text-[#FDC700]" />,
    bg: '[#F0B10033]'
  }, {
    title: "New Listings",
    sub: "12 new listings created in the last hour",
    time: "731 days ago",
    icon: <Menu className="text-[#51A2FF]" />,
    bg: '[#2B7FFF33]'
  }, {
    title: "Payment Received",
    sub: "Boost payment of $49.99 processed successfully",
    time: "732 days ago",
    icon: <Bell className="text-[#05DF72]" />,
    bg: '[#00C95033]'
  }, {
    title: "System Update",
    sub: "Platform maintenance scheduled for tonight",
    time: "732 days ago",
    icon: <Settings className="text-[#51A2FF]" />,
    bg: '[#2B7FFF33]'
  }
]


const settingsNotifi = [
  {
    title: "Email Notifications",
    sub: "Receive notifications via email"
  }, {
    title: "New User Alerts",
    sub: "Get notified when new users register"
  }, {
    title: "Content Moderation Alerts",
    sub: "Get notified of flagged content"
  }, {
    title: "Payment Notifications",
    sub: "Get notified of flagged content"
  }
]


export default function Notification() {

  const [clickbtn, setClickBtn] = useState<string>("all")
  const [on, setOn] = useState(false);

  return (
    <div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {
          notificationArray?.map((item, k) => {

            return <div key={k} className="bg-[#111827] p-4.25 flex flex-col gap-y-2">
              <h1 className="text-[#CBD5E1]">{item?.title}</h1>
              <h1 className={`text-${item?.colour}`}>{item?.value}</h1>
            </div>
          })
        }
      </div>

      <div className="flex my-5 sm:my-10 gap-x-2">
        {
          btns?.map((item, k) => <button key={k} onClick={() => setClickBtn(item?.title.toLocaleLowerCase())} className={`text-white cursor-pointer px-4 py-2 rounded-md ${clickbtn == item?.title.toLocaleLowerCase() ? 'bg-[#1F3A5F]' : 'bg-[#111827]'} `}>{item?.title} ({item?.value})</button>)
        }
      </div>

      <div className=" flex flex-col gap-y-2 ">
        {
          notifications?.map((item, k) => {
            return (
              <div
                key={k}
                className="flex items-start justify-between gap-x-4 py-6 px-3 rounded-lg bg-[#111827] border border-[#1F3A5F]"
              >
                {/* Left */}
                <div className="flex gap-x-3">

                  {/* Icon */}
                  <div
                    className={`h-[5vh] flex p-3 items-center justify-center rounded-lg bg-${item?.bg}`}

                  >
                    {item?.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-y-1">
                    <h1 className="text-[#F8FAFC] font-medium">
                      {item?.title}
                    </h1>

                    <h2 className="text-[#CBD5E1] text-sm">
                      {item?.sub}
                    </h2>

                    <h2 className="text-[#94A3B8] text-xs">
                      {item?.time}
                    </h2>
                  </div>

                </div>

                {/* Right actions */}
                <div className="flex gap-x-1 sm:gap-x-5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1F3A5F]" />
                  <Check size={20} className="text-green-400 cursor-pointer" />
                  <Trash2 size={20} className="text-red-500 cursor-pointer" />
                </div>
              </div>
            );
          })
        }

      </div>

      <div className="bg-[#111827] my-10 p-6 rounded-lg border border-[#1F3A5F4D]">


        <div className="flex gap-x-2 items-center">
          <Settings className="text-white" />
          <h1 className="text-white text-xl" >Notification Settings</h1>
        </div>



        <div className="mt-4 flex flex-col gap-y-4">
          {
            settingsNotifi?.map((item, k) => {
              return <div className="flex justify-between" key={k} >
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-[16px] font-semibold text-white">{item?.title}</h1>
                  <h2 className="text-sm  text-[#CBD5E1]">{item?.sub}</h2>
                </div>

                <div
                  onClick={() => setOn(!on)}
                  className="relative w-14 h-6 rounded-full bg-[#1F3A5F] cursor-pointer transition-colors duration-300"
                >
                  <div
                    className={`absolute top-1/2 h-5 w-5 rounded-full bg-white 
        transition-all duration-300 ease-in-out
        ${on ? "translate-x-8" : "translate-x-1"} 
        -translate-y-1/2`}
                  />
                </div>

              </div>
            })
          }
        </div>
      </div>


    </div>
  )
}
