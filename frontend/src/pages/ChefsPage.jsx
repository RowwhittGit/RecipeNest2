import HomeNavbar from '../components/HomeNavbar';
import ChefHero from '../components/ChefHero';
import ChefFilters from '../components/ChefFilters';
import ChefGrid from '../components/ChefGrid';
import Footer from '../components/Footer';

export default function ChefsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col">
      <HomeNavbar />
      <ChefHero />
      <ChefFilters />
      <div className="flex-1">
        <ChefGrid />
      </div>
      <Footer />
    </div>
  );
}
