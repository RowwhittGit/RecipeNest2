import { useState } from 'react'
import HomeRecipeCard from './HomeRecipeCard'

const initialRecipes = [
  {
    tag: 'Asian',
    title: 'Steamed Momo Dumplings',
    time: '40 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
  },
  {
    tag: 'Asian',
    title: 'Vegetable Chowmein',
    time: '30 min',
    servings: 3,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
  },
  {
    tag: 'Korean',
    title: 'Korean Kimbab Rolls',
    time: '45 min',
    servings: 5,
    image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=600&q=80',
  },
  {
    tag: 'American',
    title: 'Classic Beef Burger',
    time: '25 min',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  },
  {
    tag: 'Italian',
    title: 'Margherita Pizza',
    time: '35 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1707896543317-da87bde75ff6?w=600&q=80',
  },
  {
    tag: 'Mexican',
    title: 'Mexican Street Tacos',
    time: '20 min',
    servings: 3,
    image: 'https://images.unsplash.com/photo-1707604341704-74abdc25e52a?w=600&q=80',
  },
  {
    tag: 'Japanese',
    title: 'Sushi Roll Platter',
    time: '50 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1707556294605-fd32496554e3?w=600&q=80',
  },
  {
    tag: 'Italian',
    title: 'Creamy Pasta Carbonara',
    time: '25 min',
    servings: 3,
    image: 'https://images.unsplash.com/photo-1627207644206-a2040d60ecad?w=600&q=80',
  },
  {
    tag: 'American',
    title: 'Crispy Fried Chicken',
    time: '45 min',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1672856399624-61b47d70d339?w=600&q=80',
  },
]

export default function RecipeGrid() {
  const [loadCount, setLoadCount] = useState(9)

  return (
    <section className="bg-[#f5f5f0] py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {initialRecipes.slice(0, loadCount).map((recipe, i) => (
            <HomeRecipeCard
              key={recipe.title}
              index={i + 1}
              {...recipe}
            />
          ))}
        </div>

        {loadCount < initialRecipes.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setLoadCount((c) => c + 9)}
              className="bg-[#1e2d4a] text-white font-bold text-sm rounded-full px-10 py-3.5 hover:bg-[#162236] transition-colors shadow-lg"
            >
              Load More Recipes
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
