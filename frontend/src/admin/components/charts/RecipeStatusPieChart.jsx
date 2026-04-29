import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  published: '#10B981', // Green
  draft: '#6B7280',     // Gray
  flagged: '#F59E0B'    // Amber
};

export default function RecipeStatusPieChart({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <div className="h-[260px] flex items-center justify-center text-gray-400 bg-white rounded-2xl ring-1 ring-black/5">No recipe data</div>;
  }

  const statusCounts = recipes.reduce((acc, recipe) => {
    let key = recipe.status || 'draft';
    if (recipe.isFlagged) key = 'flagged';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));

  return (
    <div className="bg-white p-6 rounded-2xl ring-1 ring-black/5 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipe Status Breakdown</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#CBD5E1'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
