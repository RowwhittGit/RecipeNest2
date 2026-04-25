import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import RecipeForm from '../components/RecipeForm';
import tomato from '../images/tomato.png';
import lemon from '../images/lemon.png';
import redChilly from '../images/red_chilly.png';
import greenHerb from '../images/green_herb.png';
import { getMyRecipeByIdApi } from '../api/recipeApi';

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    getMyRecipeByIdApi(id)
      .then(res => setRecipe(res.data.data.recipe))
      .catch(() => setError('Failed to load recipe.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1e2d4a]/20 border-t-[#1e2d4a] rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f3e8]">
        <HomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500 font-bold">{error || 'Recipe not found.'}</p>
        </div>
        <Footer />
      </div>
    );
  }

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
              ✏️ Edit Recipe
            </h1>
            <p className="text-sm text-[#1e2d4a]/50 mt-1 font-medium">
              Update your culinary masterpiece
            </p>
          </div>
          <RecipeForm
            initialData={recipe}
            recipeId={id}
            submitLabel="Update Recipe"
            onCancel={() => navigate(-1)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
