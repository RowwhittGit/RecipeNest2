import RecipeCard from './Recipecard'
import { useRecipeStore } from '../store/recipeStore'

export default function RecipeGrid() {
  const { recipes, error, fetchRecipes, page, hasMore, loading } = useRecipeStore();

  const handleLoadMore = () => {
    fetchRecipes(page + 1);
  };

  return (
    <section className="bg-[#f5f5f0] py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {error && <div className="text-center text-red-500 mb-6 font-bold">{error}</div>}
        
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((recipe) => {
              // Calculate total time
              const time = (recipe.prepTime || 0) + (recipe.cookTime || 0);
              const timeStr = time > 0 ? `${time} min` : '';
              
              return (
                <RecipeCard
                  key={recipe._id || recipe.id}
                  _id={recipe._id || recipe.id}
                  image={recipe.mainImage}
                  tag={recipe.tags?.[0] || 'Popular'}
                  title={recipe.title}
                  time={timeStr}
                  servings={recipe.servings}
                  isSaved={recipe.isSaved}
                />
              );
            })}
          </div>
        ) : (
          !error && !loading && <div className="text-center py-10 text-[#2b3d63]/70 font-semibold">No recipes found.</div>
        )}

        {loading && <div className="text-center mt-8 mb-4 text-[#2b3d63] font-bold">Loading recipes...</div>}

        {!loading && hasMore && recipes.length > 0 && (
          <div className="flex justify-center mt-12 mb-8">
            <button
              onClick={handleLoadMore}
              className="bg-[#2b3d63] text-white font-bold text-sm rounded-full px-10 py-3.5 hover:bg-[#1f2d4a] transition-all shadow-lg cursor-pointer"
            >
              Load More Recipes
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
