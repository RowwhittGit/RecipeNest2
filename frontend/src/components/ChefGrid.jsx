import ChefCard from './ChefCard';
import FeaturedChefCard from './FeaturedChefCard';

export default function ChefGrid() {
  const featuredChef = {
    image: 'https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNTUxNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    name: 'Chef Marcus Anderson',
    specialty: 'Mediterranean & Coastal Cuisine',
    experience: 15,
    rating: 4.9,
    bio: 'With over 15 years of experience crafting Mediterranean masterpieces, Chef Marcus brings the flavors of the coast to your table. His passion for fresh, seasonal ingredients has earned him acclaim across the culinary world.'
  };

  const chefs = [
    {
      image: 'https://images.unsplash.com/photo-1594394206930-67339d922f8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NzI2Mjc0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef Sarah Williams',
      specialty: 'French Pastry & Desserts',
      experience: 12,
      rating: 4.8
    },
    {
      image: 'https://images.unsplash.com/photo-1759521296144-fe6f2d2dc769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0cnklMjBjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNjI3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef Elena Rodriguez',
      specialty: 'Italian Fine Dining',
      experience: 18,
      rating: 4.9
    },
    {
      image: 'https://images.unsplash.com/photo-1574966740793-953ad374e8fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwY2hlZiUyMGtpdGNoZW58ZW58MXx8fHwxNzcyNjI3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef David Kim',
      specialty: 'Modern Asian Fusion',
      experience: 10,
      rating: 4.7
    },
    {
      image: 'https://images.unsplash.com/photo-1550967960-64994bfba9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGNoZWYlMjBjb29raW5nfGVufDF8fHx8MTc3MjU2MjM1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef Mei Chen',
      specialty: 'Traditional Chinese Cuisine',
      experience: 20,
      rating: 4.9
    },
    {
      image: 'https://images.unsplash.com/photo-1611657365907-1ca5d9799f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjaGVmJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyNTUxNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef Antonio Rossi',
      specialty: 'Rustic Italian & Pizza',
      experience: 14,
      rating: 4.8
    },
    {
      image: 'https://images.unsplash.com/photo-1594394206930-67339d922f8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NzI2Mjc0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: 'Chef Priya Sharma',
      specialty: 'Plant-Based & Vegan',
      experience: 8,
      rating: 4.7
    },
  ];

  return (
    <section className="py-8 md:py-12 px-4 bg-[#f5f5f0]">
      <div className="max-w-6xl mx-auto">
        <FeaturedChefCard {...featuredChef} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chefs.map((chef, index) => (
            <ChefCard key={index} {...chef} />
          ))}
        </div>

        <div className="text-center mt-14 mb-8">
          <button className="px-10 py-3 bg-[#2b3d63] hover:bg-[#1f2d4a] text-white rounded-full font-bold transition-all shadow-md text-sm cursor-pointer">
            Load More Chefs
          </button>
        </div>
      </div>
    </section>
  );
}
