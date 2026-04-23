import RecipeCard from './Recipecard'
import octopus2 from '../images/octopus2.png'
import cakebin from '../images/cakebin.png'
import octopus from '../images/octopus.png'
import lemon from '../images/lemon.png'
import jug from '../images/jug.png'
import tomato from '../images/tomato.png'

const recipes = [
  {
    tag: 'Seafood',
    tagColor: '#f5c518',
    image: octopus2,
    title: 'Mediterranean Grilled Octopus',
    time: '45 min',
    servings: 4,
    rating: '4.8',
  },
  {
    tag: 'Seafood',
    tagColor: '#f5c518',
    image: cakebin,
    title: 'Lemon Herb Fish Fillet',
    time: '30 min',
    servings: 2,
    rating: '4.9',
  },
  {
    tag: 'Greek',
    tagColor: '#f5c518',
    image: octopus,
    title: 'Traditional Greek Octopus',
    time: '50 min',
    servings: 4,
    rating: '4.7',
  },
  {
    tag: 'Dessert',
    tagColor: '#f5c518',
    image: lemon,
    title: 'Fresh Lemon Tart',
    time: '60 min',
    servings: 8,
    rating: '4.8',
  },
  {
    tag: 'Beverages',
    tagColor: '#f5c518',
    image: jug,
    title: 'Greek Mountain Tea',
    time: '10 min',
    servings: 2,
    rating: '4.6',
  },
  {
    tag: 'Salads',
    tagColor: '#f5c518',
    image: tomato,
    title: 'Heirloom Tomato Salad',
    time: '15 min',
    servings: 4,
    rating: '4.7',
  },
]

export default function FeaturedRecipes() {
  return (
    <section className="bg-[#f5f3e8] py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-[#1e2d4a] font-black text-3xl md:text-5xl mb-3">Featured Recipes</h2>
          <p className="text-gray-500 text-base">Handpicked favorites from our community</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.title} {...recipe} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-full px-8 py-3.5 hover:opacity-90 transition-opacity">
            View All Recipes
          </button>
        </div>
      </div>
    </section>
  )
}