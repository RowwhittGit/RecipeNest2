import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  'Warning Issued': '#F59E0B',
  'Content Removed': '#EF4444',
  'No Action Taken': '#9CA3AF'
};

export default function DisputeOutcomeChart({ disputes }) {
  if (!disputes || disputes.length === 0) {
    return <div className="h-[260px] flex items-center justify-center text-gray-400 bg-white rounded-2xl ring-1 ring-black/5">No resolved disputes</div>;
  }

  const resolvedDisputes = disputes.filter(d => d.status === 'resolved' && d.resolution?.actionTaken);
  
  if (resolvedDisputes.length === 0) {
    return <div className="h-[260px] flex items-center justify-center text-gray-400 bg-white rounded-2xl ring-1 ring-black/5">No resolved disputes yet</div>;
  }

  const counts = resolvedDisputes.reduce((acc, d) => {
    const action = d.resolution.actionTaken;
    acc[action] = (acc[action] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(counts).map(action => ({
    name: action,
    value: counts[action]
  }));

  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Dispute Outcomes</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#219EBC'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
