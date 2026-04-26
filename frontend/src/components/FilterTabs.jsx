import { useState } from 'react'
import { useRecipeStore } from '../store/recipeStore'

const tabs = [
  { label: 'All Recipes', cuisine: '' },
  { label: 'Italian', cuisine: 'Italian' },
  { label: 'Japanese', cuisine: 'Japanese' },
  { label: 'Asian', cuisine: 'Asian' },
  { label: 'Mexican', cuisine: 'Mexican' },
  { label: 'American', cuisine: 'American' },
  { label: 'Mediterranean', cuisine: 'Mediterranean' },
  { label: 'Indian', cuisine: 'Indian' },
  { label: 'Chinese', cuisine: 'Chinese' },
  { label: 'French', cuisine: 'French' },
]

export default function FilterTabs() {
  const { activeCuisine, setCuisine, search } = useRecipeStore();
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    search(input);
  };

  return (
    <div className="bg-[#f5f5f0]/95 backdrop-blur-sm sticky top-[73px] z-40 border-b border-[#1e2d4a]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Search bar */}
        <div className="pt-3 pb-2">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm max-w-lg border border-[#1e2d4a]/10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="flex-1 outline-none text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/40 bg-transparent"
            />
            <button type="submit" className="ml-2 bg-[#f5c518] rounded-full w-7 h-7 flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#1e2d4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>
        {/* Cuisine filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCuisine(tab.cuisine)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all flex-shrink-0 ${
                activeCuisine === tab.cuisine
                  ? 'bg-[#1e2d4a] text-white'
                  : 'bg-white text-[#1e2d4a] hover:bg-gray-50 border border-[#1e2d4a]/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
