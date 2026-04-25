import homeBanner2 from '../images/HomeBanner2.png';
import greenHerb from '../images/green_herb.png';
import tomato from '../images/tomato.png';
import lemon from '../images/lemon.png';
import sunflower from '../images/sunflower.png';
import redChilly from '../images/red_chilly.png';

export default function ChefHero() {
  return (
    <section className="relative py-14 md:py-20 flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${homeBanner2})` }}>
      {/* Decorative Images */}
      <img src={sunflower} alt="" className="hidden md:block absolute top-4 left-16 w-20 object-contain pointer-events-none select-none z-10 opacity-90" />
      <img src={greenHerb} alt="" className="hidden md:block absolute top-8 left-36 w-14 object-contain pointer-events-none select-none z-10 rotate-12" />
      <img src={redChilly} alt="" className="hidden md:block absolute bottom-8 right-24 w-10 object-contain pointer-events-none select-none z-10" />
      <img src={lemon} alt="" className="hidden md:block absolute top-8 right-40 w-20 object-contain pointer-events-none select-none z-10 -rotate-12" />
      <img src={tomato} alt="" className="hidden md:block absolute bottom-8 left-20 w-24 object-contain pointer-events-none select-none z-10" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-4">
        <h1 className="text-4xl md:text-[3.5rem] font-black text-[#2b3d63] mb-3 leading-tight tracking-tight">
          Meet Our <span className="text-[#fdd228]">Chefs</span>
        </h1>
        <p className="text-sm md:text-base text-[#2b3d63]/80 font-medium">
          Discover the culinary masters behind your favorite recipes
        </p>
      </div>
    </section>
  );
}
