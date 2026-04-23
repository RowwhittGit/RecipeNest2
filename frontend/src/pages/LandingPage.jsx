import Header from '../components/Header'
import HeroSection from '../components/Herosection'
import FeaturesSection from '../components/Featuresection'
import FeaturedRecipes from '../components/Featuredrecipe'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FeaturedRecipes />
      </main>
      <Footer />
    </div>
  )
}