import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getUserGrowth } from './userGrowth';



const UserGrowthChart: React.FC = () => {

  const [growth, setGrowth] = useState<string>("monthly")
  const [chartData, setChartData] = useState<{ label: string; percentage: number }[]>([])


  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserGrowth(growth)
      setChartData(result)
    }
    fetchData()
  }, [growth])



  return (
    <div className="w-full  p-6 bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">User Growth</h2>
        <div className="flex bg-[#1e293b] p-1 rounded-xl">
          <button onClick={() => setGrowth("monthly")} className={`px-4 py-1.5 cursor-pointer  text-sm font-medium ${growth == "monthly" ? 'text-slate-900 bg-white' : ''}  rounded-lg transition-all`}>
            Monthly
          </button>
          <button onClick={() => setGrowth("weekly")} className={`px-4 py-1.5 cursor-pointer text-sm font-medium text-slate-400 hover:text-white rounded-lg transition-all ${growth == "weekly" ? 'text-slate-900 bg-white' : ''}`}>
            Weekly
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 8 }}>
            <defs>
              {/* The Glowy Gradient */}
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              horizontal={true}
              stroke="#1e293b"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 14 }}
              dy={15}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 14 }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />

            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#818cf8' }}
            />

            <Area
              type="monotone" // This creates the smooth "curvy" look
              dataKey="percentage"
              stroke="#818cf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{
                r: 4,
                fill: "#fff",
                stroke: "#818cf8",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;