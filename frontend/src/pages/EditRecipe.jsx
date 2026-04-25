import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import Footer from '../components/Footer';
import RecipeForm from '../components/RecipeForm';
import tomato from '../images/tomato.png';
import lemon from '../images/lemon.png';
import redChilly from '../images/red_chilly.png';
import greenHerb from '../images/green_herb.png';

// Mock data matching the backend shape (ingredients/steps as objects with order)
// Replace with real API data when integrating
const MOCK_RECIPE = {
  title: 'Steamed Momo Dumplings',
  description: 'Rich and hearty ramen from scratch...',
  cuisineType: 'Asian',
  difficulty: 'Medium',
  prepTime: 30,
  cookTime: 20,
  youtubeVideoUrl: 'https://www.youtube.com/watch?v=example',
  mainImage: null,
  ingredients: [
    { order: 1, ingredient: '2 cups all-purpose flour' },
    { order: 2, ingredient: '1 cup finely chopped cabbage' },
    { order: 3, ingredient: '1/2 cup ground chicken' },
    { order: 4, ingredient: '1/2 cup finely chopped onions' },
    { order: 5, ingredient: '2 cloves garlic, minced' },
    { order: 6, ingredient: '1 tablespoon soy sauce' },
    { order: 7, ingredient: '1 tablespoon sesame oil' },
  ],
  steps: [
    { order: 1, instruction: 'e.g., Boil the broth for 2 hours.' },
    { order: 2, instruction: 'e.g., Boil the broth for 2 hours.' },
    { order: 3, instruction: 'e.g., Boil the broth for 2 hours.' },
    { order: 4, instruction: 'e.g., Boil the broth for 2 hours.' },
  ],
};

export default function EditRecipePage() {
  const navigate = useNavigate();

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
            initialData={MOCK_RECIPE}
            submitLabel="Update Recipe"
            onCancel={() => navigate(-1)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
