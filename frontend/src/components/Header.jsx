import { useNavigate } from 'react-router-dom'
import logoSmall from '../images/logo_small.png'

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-10 py-4 bg-[#f5f3e8] sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoSmall} alt="recipeNest logo" className="w-9 h-9 object-contain" />
        <span className="text-[#1e2d4a] font-black text-xl tracking-tight">recipeNest</span>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-[#1e2d4a] font-semibold text-sm hover:opacity-70 transition-opacity">Home</a>
        <a href="#" className="text-[#1e2d4a] font-semibold text-sm hover:opacity-70 transition-opacity">Recipes</a>
        <a href="#" className="text-[#1e2d4a] font-semibold text-sm hover:opacity-70 transition-opacity">Categories</a>
        <a href="#" className="text-[#1e2d4a] font-semibold text-sm hover:opacity-70 transition-opacity">Community</a>
        <a href="#" className="text-[#1e2d4a] font-semibold text-sm hover:opacity-70 transition-opacity">About</a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/login')} className="text-[#1e2d4a] font-bold text-sm hover:opacity-70 transition-opacity">Log in</button>
        <button onClick={() => navigate('/register')} className="bg-[#1e2d4a] text-white font-bold text-sm rounded-full px-5 py-2.5 hover:opacity-85 transition-opacity">
          Sign Up
        </button>
      </div>
    </header>
  )
}