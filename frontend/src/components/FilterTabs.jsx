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
  const { activeCuisine, setCuisine } = useRecipeStore();

  return (
    <div className="bg-[#f5f5f0]/95 backdrop-blur-sm sticky top-[73px] z-40 border-b border-[#1e2d4a]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
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
