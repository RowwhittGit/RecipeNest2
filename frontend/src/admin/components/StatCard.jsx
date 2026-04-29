import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, highlighting, index = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 1000; // 1 second
    const targetValue = typeof value === 'number' ? value : parseInt(value) || 0;
    
    if (targetValue === 0) {
      setDisplayValue(0);
      return;
    }

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeProgress * targetValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const highlightClass = highlighting 
    ? 'text-red-600 bg-red-50 ring-1 ring-red-100' 
    : 'text-gray-900 bg-white ring-1 ring-black/5 shadow-sm';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: 'easeOut' }}
      className={`p-6 rounded-2xl ${highlightClass} transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className={`text-3xl font-bold tracking-tight ${highlighting ? 'text-red-700' : 'text-gray-900'}`}>
            {displayValue}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${highlighting ? 'bg-red-100 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
