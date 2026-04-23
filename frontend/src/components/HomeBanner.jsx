import homeBanner2 from '../images/HomeBanner2.png'
import tomato from '../images/tomato.png'
import greenHerb from '../images/green_herb.png'
import redChilly from '../images/red_chilly.png'
import lemon from '../images/lemon.png'
import sunflower from '../images/sunflower.png'

export default function HomeBanner() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-28 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${homeBanner2})` }}
    >
      {/* Floating decorative images - hidden on mobile */}
      <img src={sunflower} alt="" className="hidden lg:block absolute top-4 left-16 w-24 object-contain pointer-events-none select-none drop-shadow-sm z-10 opacity-40" />
      <img src={tomato} alt="" className="hidden lg:block absolute top-32 left-48 w-20 object-contain pointer-events-none select-none drop-shadow-sm z-10 rotate-12 opacity-40" />
      <img src={redChilly} alt="" className="hidden lg:block absolute bottom-8 left-20 w-32 object-contain pointer-events-none select-none drop-shadow-sm z-10 -rotate-12 opacity-40" />
      <img src={greenHerb} alt="" className="hidden lg:block absolute top-12 left-1/3 w-16 object-contain pointer-events-none select-none drop-shadow-sm z-10 -rotate-12 opacity-40" />

      <img src={lemon} alt="" className="hidden lg:block absolute top-8 right-40 w-28 object-contain pointer-events-none select-none drop-shadow-sm z-10 rotate-12 opacity-40" />
      <img src={tomato} alt="" className="hidden lg:block absolute bottom-12 right-24 w-24 object-contain pointer-events-none select-none drop-shadow-sm z-10 -rotate-6 opacity-40" />
      <img src={redChilly} alt="" className="hidden lg:block absolute top-32 right-12 w-28 object-contain pointer-events-none select-none drop-shadow-sm z-10 -scale-x-100 rotate-45 opacity-40" />
      <img src={greenHerb} alt="" className="hidden lg:block absolute bottom-8 right-60 w-16 object-contain pointer-events-none select-none drop-shadow-sm z-10 rotate-12 -scale-x-100 opacity-40" />

      {/* Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mt-[-20px]">
        <h1 className="font-black text-4xl md:text-5xl leading-tight mb-3 drop-shadow-md">
          <span className="text-[#1e2d4a]">Explore Our </span>
          <span className="text-[#f5c518]">Recipes</span>
        </h1>
        <p className="text-[#1e2d4a] font-medium text-base md:text-lg">
          Find the perfect dish for any occasion
        </p>
      </div>
    </section>
  )
}
