import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

export default function ModerationHealthChart({ flaggedCount, totalCount }) {
  if (totalCount === 0) {
    return <div className="h-[260px] flex items-center justify-center text-gray-400 bg-white rounded-2xl ring-1 ring-black/5">No data</div>;
  }

  const percentage = Math.round((flaggedCount / totalCount) * 100);
  
  let fill = '#10B981'; // Green
  if (percentage > 5) fill = '#F59E0B'; // Amber
  if (percentage > 15) fill = '#EF4444'; // Red

  const data = [
    {
      name: 'Flagged %',
      value: percentage,
      fill
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Moderation Health</h3>
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative">
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart 
            cx="50%" cy="50%" 
            innerRadius="70%" outerRadius="100%" 
            barSize={20} data={data} 
            startAngle={180} endAngle={-180}
          >
            <RadialBar background clockWise dataKey="value" cornerRadius={10} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold" style={{ color: fill }}>{percentage}%</span>
          <span className="text-xs text-gray-500 mt-1">Flagged</span>
        </div>
      </div>
    </div>
  );
}
