import UserVerifications from "./UserVerifications"

const notificationArray = [
  {
    title: "Pending Requests",
    value: 6,
    colour: "[#FDC700]"
  }, {
    title: "Approved",
    value: 5,
    colour: "[#05DF72]"
  }, {
    title: "Denied",
    value: 4,
    colour: "[#FF6467]"
  }
]
export default function Verification() {
  return (
    <div className="text-white mt-2 ">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {
          notificationArray?.map((item, k) => {

            return <div key={k} className="bg-[#111827] rounded-lg border border-[#1F3A5F4D]  p-4.25 flex flex-col gap-y-2">
              <h1 className="text-[#CBD5E1]">{item?.title}</h1>
              <h1 className={`text-${item?.colour} text-xl font-semibold`}>{item?.value}</h1>
            </div>
          })
        }
      </div>

      <UserVerifications></UserVerifications>



    </div>
  )
}
