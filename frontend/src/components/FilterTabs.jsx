import { useState } from 'react'

const tabs = ['All Recipes', 'Quick Servings', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'New', 'Popular']

export default function FilterTabs() {
  const [active, setActive] = useState('All Recipes')

  return (
    <div className="bg-[#f5f5f0]/95 backdrop-blur-sm sticky top-[73px] z-40 border-b border-[#1e2d4a]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all flex-shrink-0 ${
                active === tab
                  ? 'bg-[#1e2d4a] text-white'
                  : 'bg-white text-[#1e2d4a] hover:bg-gray-50 border border-[#1e2d4a]/15'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
