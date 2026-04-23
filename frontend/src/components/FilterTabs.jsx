import { useState } from 'react'

const tabs = ['All Recipes', 'Quick Servings', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'New', 'Popular']

export default function FilterTabs() {
  const [active, setActive] = useState('All Recipes')

  return (
    <div className="bg-white sticky top-[61px] z-40 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all flex-shrink-0 ${
                active === tab
                  ? 'bg-[#1e2d4a] text-white'
                  : 'bg-[#f5f3e8] text-[#1e2d4a] hover:bg-[#e8e5d5]'
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
