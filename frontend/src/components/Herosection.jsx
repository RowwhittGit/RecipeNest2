import logo from '../images/logo_small.png'
import tomato from '../images/tomato.png'
import greenHerb from '../images/green_herb.png'
import redChilly from '../images/red_chilly.png'
import lemon from '../images/lemon.png'
import sunflower from '../images/sunflower.png'

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts']

export default function HeroSection() {
  return (
    <section className="relative bg-[#f5f3e8] overflow-hidden py-12 md:py-16 px-4 md:px-6">
      {/* Floating decorative images - hidden on mobile */}
      <img src={tomato} alt="" className="hidden md:block absolute top-4 left-36 w-28 object-contain pointer-events-none select-none" />
      <img src={greenHerb} alt="" className="hidden md:block absolute opacity-75 top-58 left-64 w-20 object-contain pointer-events-none select-none rotate-12" />
      <img src={redChilly} alt="" className="hidden md:block absolute opacity-85 bottom-12 left-36 w-40 object-contain pointer-events-none select-none" />
      <img src={greenHerb} alt="" className="hidden md:block absolute top-8 right-40 w-20 object-contain pointer-events-none select-none -scale-x-100 -rotate-12" />
      <img src={lemon} alt="" className="hidden md:block absolute top-48 opacity-75 right-40 w-40 object-contain pointer-events-none select-none" />
      <img src={sunflower} alt="" className="hidden md:block opacity-75 absolute bottom-10 right-64 w-40 object-contain pointer-events-none select-none rotate-6" />
      {/* Center content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo icon */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="recipeNest icon" className="w-16 h-16 object-contain" />
        </div>

        <h1 className="text-[#1e2d4a] font-black text-4xl md:text-6xl leading-tight mb-2">
          Discover Your Next
        </h1>
        <h1 className="text-[#f5c518] font-black text-4xl md:text-6xl leading-tight mb-6">
          Favorite Recipe
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-8">Explore authentic flavors and traditional recipes</p>

        {/* Search bar */}
        <div className="flex items-center bg-white border-2 border-[#1e2d4a]/10 rounded-full px-5 py-3 shadow-sm mb-6 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for recipes, ingredients, cuisines..."
            className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-400 bg-transparent"
          />
          <button className="ml-3 bg-[#f5c518] rounded-full w-9 h-9 flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1e2d4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        {/* Category pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`rounded-full px-5 py-2.5 font-bold text-sm transition-opacity hover:opacity-80 ${
                i % 2 === 0
                  ? 'bg-[#1e2d4a] text-white'
                  : 'bg-[#f5c518] text-[#1e2d4a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}