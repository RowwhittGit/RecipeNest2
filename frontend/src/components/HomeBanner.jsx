import { useState } from 'react'
import homeBanner2 from '../images/HomeBanner2.png'
import tomato from '../images/tomato.png'
import greenHerb from '../images/green_herb.png'
import redChilly from '../images/red_chilly.png'
import lemon from '../images/lemon.png'
import sunflower from '../images/sunflower.png'
import { useRecipeStore } from '../store/recipeStore'

export default function HomeBanner() {
  const [input, setInput] = useState('');
  const { search } = useRecipeStore();

  const handleSearch = (e) => {
    e.preventDefault();
    search(input);
  };

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${homeBanner2})` }}
    >
      <img src={sunflower} alt="" className="hidden md:block absolute top-2 left-10 w-20 object-contain pointer-events-none select-none z-10 opacity-90" />
      <img src={greenHerb} alt="" className="hidden md:block absolute top-6 left-32 w-14 object-contain pointer-events-none select-none z-10 rotate-12" />
      <img src={redChilly} alt="" className="hidden md:block absolute bottom-4 left-8 w-10 object-contain pointer-events-none select-none z-10" />
      <img src={lemon} alt="" className="hidden md:block absolute top-4 right-32 w-20 object-contain pointer-events-none select-none z-10 -rotate-12" />
      <img src={tomato} alt="" className="hidden md:block absolute bottom-4 right-10 w-24 object-contain pointer-events-none select-none z-10" />

      <div className="relative z-10 max-w-2xl mx-auto text-center py-4">
        <h1 className="font-black text-4xl md:text-5xl leading-tight mb-2">
          <span className="text-[#1e2d4a]">Explore Our </span>
          <span className="text-[#f5c518]">Recipes</span>
        </h1>
        <p className="text-[#1e2d4a]/80 font-medium text-sm md:text-base mb-6">
          Find the perfect dish for any occasion
        </p>
        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-md max-w-lg mx-auto border-2 border-[#1e2d4a]/10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search recipes, ingredients..."
            className="flex-1 outline-none text-sm text-[#1e2d4a] placeholder-[#1e2d4a]/40 bg-transparent"
          />
          <button type="submit" className="ml-2 bg-[#f5c518] rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1e2d4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}
