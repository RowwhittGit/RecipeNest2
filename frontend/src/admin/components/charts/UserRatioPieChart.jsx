import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FFB703', '#219EBC'];

export default function UserRatioPieChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="h-[260px] flex items-center justify-center text-gray-400 bg-white rounded-2xl ring-1 ring-black/5">No user data</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">User Distribution</h3>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
