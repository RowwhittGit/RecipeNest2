import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HeroSection from '../components/Herosection'
import FeaturesSection from '../components/Featuresection'
import FeaturedRecipes from '../components/Featuredrecipe'
import Footer from '../components/Footer'
import useAuthStore from '../store/authStore'

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true });
    }
  }, []);

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