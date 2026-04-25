import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function ChefFilters() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All Chefs' },
    { id: 'italian', label: 'Italian' },
    { id: 'pastry', label: 'Pastry' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'fine-dining', label: 'Fine Dining' },
    { id: 'asian', label: 'Asian' },
    { id: 'mediterranean', label: 'Mediterranean' },
  ];

  return (
    <section className="pt-8 pb-4 px-4 bg-[#f5f5f0]">
      <div className="max-w-[1000px] mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search chefs by name or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-14 py-3 md:py-3.5 rounded-full text-sm border-2 border-[#2b3d63]/10 focus:outline-none focus:border-[#fdd228] transition-colors bg-white shadow-sm font-medium text-[#2b3d63] placeholder:text-[#2b3d63]/50"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#fdd228] p-2 md:p-2.5 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fcc926] transition-colors">
              <FiSearch className="text-[#2b3d63] w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition-all text-xs md:text-sm border-2 ${
                activeFilter === filter.id
                  ? 'bg-[#2b3d63] text-white border-[#2b3d63] shadow-md'
                  : 'bg-white text-[#2b3d63] border-white hover:border-[#2b3d63]/20 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
