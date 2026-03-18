import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { date: 'Dec 1', orders: 1550, revenue: 1750 },
  { date: 'Dec 2', orders: 750, revenue: 1350 },
  { date: 'Dec 3', orders: 1650, revenue: 1850 },
  { date: 'Dec 4', orders: 1550, revenue: 2550 },
  { date: 'Dec 5', orders: 1250, revenue: 2250 },
  { date: 'Dec 6', orders: 900, revenue: 1250 },
  { date: 'Dec 7', orders: 1500, revenue: 2000 },
  { date: 'Dec 8', orders: 1400, revenue: 2350 },
  { date: 'Dec 9', orders: 850, revenue: 1150 },
  { date: 'Dec 10', orders: 1400, revenue: 2100 },
  { date: 'Dec 11', orders: 600, revenue: 800 },
  { date: 'Dec 12', orders: 850, revenue: 1450 },
];

const EngagementMetrics: React.FC = () => {
  return (
    <div className="w-full  p-8 bg-[#0b1120] rounded-2xl border border-slate-800 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-10 px-2">User Engagement Metrics</h2>

      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {/* Blue Gradient & Glow */}
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              {/* Orange Gradient & Glow */}
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={true} 
              horizontal={true} 
              stroke="#1e293b" 
              opacity={0.5}
            />

            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={15}
            />

            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={[0, 3000]}
              ticks={[0, 1000, 1500, 2000, 2500, 3000]}
            />

            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />

            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-slate-400 text-sm capitalize ml-1">{value}</span>}
            />

            {/* Orders Area (Blue) */}
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#0ea5e9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOrders)"
              dot={{ r: 3, fill: '#0b1120', stroke: '#0ea5e9', strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />

            {/* Revenue Area (Orange) */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={{ r: 3, fill: '#0b1120', stroke: '#f97316', strokeWidth: 2 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementMetrics;