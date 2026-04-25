import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import RecipeForm from '../components/RecipeForm';
import tomato from '../images/tomato.png';
import lemon from '../images/lemon.png';
import redChilly from '../images/red_chilly.png';
import greenHerb from '../images/green_herb.png';

export default function CreateRecipePage() {
  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col">
      <HomeNavbar />

      <main className="flex-1 py-10 px-4 relative overflow-hidden">
        <img src={tomato}    alt="" className="hidden lg:block absolute top-6 left-4 w-20 opacity-60 pointer-events-none select-none" />
        <img src={lemon}     alt="" className="hidden lg:block absolute top-10 right-6 w-16 opacity-60 pointer-events-none select-none -rotate-12" />
        <img src={redChilly} alt="" className="hidden lg:block absolute bottom-24 left-8 w-10 opacity-50 pointer-events-none select-none" />
        <img src={greenHerb} alt="" className="hidden lg:block absolute bottom-32 right-8 w-16 opacity-50 pointer-events-none select-none rotate-12" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#1e2d4a] flex items-center justify-center gap-2">
              <span className="text-2xl">🍳</span> Create New Recipe
            </h1>
            <p className="text-sm text-[#1e2d4a]/50 mt-1 font-medium">
              Share your culinary masterpiece with the recipeNest community
            </p>
          </div>
          <RecipeForm submitLabel="Publish Recipe" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
