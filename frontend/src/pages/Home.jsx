import { useEffect } from 'react'
import HomeNavbar from '../components/HomeNavbar'
import HomeBanner from '../components/HomeBanner'
import FilterTabs from '../components/FilterTabs'
import RecipeGrid from '../components/RecipeGrid'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import { useRecipeStore } from '../store/recipeStore'

export default function HomePage() {
  const { fetchRecipes, searchQuery } = useRecipeStore();

  useEffect(() => {
    if (!searchQuery) fetchRecipes(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <Toaster position="top-right" />
      <HomeNavbar />
      <main>
        <HomeBanner />
        <FilterTabs />
        <RecipeGrid />
      </main>
      <Footer />
    </div>
  )
}
