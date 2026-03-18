

const contentStats = [
    {
        title: "Pending Review",
        total: 40,
        colour: "#FDC700"
    }, {
        title: "High Severity",
        colour: "#FF6467",
        total: 1
    }, {
        title: "Reviewed",
        colour: "#05DF72",
        total: 1
    }, {
        title: "Removed",
        colour: "#CBD5E1",
        total: 3
    }
]


export default function ContentStats() {



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
                contentStats?.map((item, key) => {
                    return <div className="bg-[#0F172A] px-4 py-5 flex flex-col gap-y-3 rounded-md border border-white/10" key={key}>

                        <h1 className="text-gray-400 italic text-[14px]">{item?.title}</h1>

                        <h1 className={`text-[${item?.colour}] text-[20px]`}>{item?.total}</h1>

                    </div>
                })
            }

        </div>
    )
}
