import homeBanner2 from '../images/HomeBanner2.png'
import tomato from '../images/tomato.png'
import greenHerb from '../images/green_herb.png'
import redChilly from '../images/red_chilly.png'
import lemon from '../images/lemon.png'
import sunflower from '../images/sunflower.png'

export default function HomeBanner() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${homeBanner2})` }}
    >
      {/* Floating decorative images */}
      <img src={sunflower} alt="" className="hidden md:block absolute top-2 left-10 w-20 object-contain pointer-events-none select-none z-10 opacity-90" />
      <img src={greenHerb} alt="" className="hidden md:block absolute top-6 left-32 w-14 object-contain pointer-events-none select-none z-10 rotate-12" />
      <img src={redChilly} alt="" className="hidden md:block absolute bottom-4 left-8 w-10 object-contain pointer-events-none select-none z-10" />
      <img src={lemon} alt="" className="hidden md:block absolute top-4 right-32 w-20 object-contain pointer-events-none select-none z-10 -rotate-12" />
      <img src={tomato} alt="" className="hidden md:block absolute bottom-4 right-10 w-24 object-contain pointer-events-none select-none z-10" />

      {/* Center Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center py-4">
        <h1 className="font-black text-4xl md:text-5xl leading-tight mb-2">
          <span className="text-[#1e2d4a]">Explore Our </span>
          <span className="text-[#f5c518]">Recipes</span>
        </h1>
        <p className="text-[#1e2d4a]/80 font-medium text-sm md:text-base">
          Find the perfect dish for any occasion
        </p>
      </div>
    </section>
  )
}
