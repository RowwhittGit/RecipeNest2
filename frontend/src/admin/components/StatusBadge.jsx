import React from 'react';

export default function StatusBadge({ status }) {
  const s = status?.toLowerCase() || 'unknown';

  let colorClasses = 'bg-gray-100 text-gray-800';
  if (s === 'active' || s === 'published' || s === 'resolved') {
    colorClasses = 'bg-green-100 text-green-800';
  } else if (s === 'suspended') {
    colorClasses = 'bg-red-100 text-red-800';
  } else if (s === 'flagged' || s === 'pending') {
    colorClasses = 'bg-amber-100 text-amber-800';
  } else if (s === 'professional') {
    colorClasses = 'bg-blue-100 text-blue-800';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colorClasses}`}>
      {status}
    </span>
  );
}
