import HomeNavbar from '../components/HomeNavbar'
import HomeBanner from '../components/HomeBanner'
import FilterTabs from '../components/FilterTabs'
import RecipeGrid from '../components/RecipeGrid'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f3e8]">
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
