import { useState } from 'react'
import HomeRecipeCard from './HomeRecipeCard'
import momoImg from '../images/momo.png'

const initialRecipes = [
  {
    tag: 'Spicy',
    title: 'Steamed Momo Dumplings',
    time: '40 min',
    servings: 4,
    image: momoImg,
  },
  {
    tag: 'Pulse',
    title: 'Vegetable Chowmein',
    time: '30 min',
    servings: 3,
    image: momoImg,
  },
  {
    tag: 'Surprise',
    title: 'Korean Kimbab Rolls',
    time: '45 min',
    servings: 5,
    image: momoImg,
  },
  {
    tag: 'American',
    title: 'Classic Beef Burger',
    time: '75 min',
    servings: 2,
    image: momoImg,
  },
  {
    tag: 'Italian',
    title: 'Margherita Pizza',
    time: '70 min',
    servings: 4,
    image: momoImg,
  },
  {
    tag: 'Mexican',
    title: 'Mexican Street Tacos',
    time: '55 min',
    servings: 3,
    image: momoImg,
  },
  {
    tag: 'New',
    title: 'Sushi Roll Platter',
    time: '10 min',
    servings: 4,
    image: momoImg,
  },
  {
    tag: 'Italian',
    title: 'Creamy Pasta Carbonara',
    time: '25 min',
    servings: 1,
    image: momoImg,
  },
  {
    tag: 'Pulse',
    title: 'Crispy Fried Chicken',
    time: '65 min',
    servings: 4,
    image: momoImg,
  },
]

export default function RecipeGrid() {
  const [loadCount, setLoadCount] = useState(9)

  return (
    <section className="bg-[#f5f3e8] py-10 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {initialRecipes.slice(0, loadCount).map((recipe, i) => (
            <HomeRecipeCard
              key={recipe.title}
              index={i + 1}
              {...recipe}
            />
          ))}
        </div>

        {/* Load More */}
        {loadCount < initialRecipes.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setLoadCount((c) => c + 9)}
              className="bg-[#1e2d4a] text-white font-bold text-sm rounded-full px-8 py-3 hover:opacity-85 transition-opacity"
            >
              Load More Recipes
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
