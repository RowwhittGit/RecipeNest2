import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoSmall from '../images/logo_small.png'
import useAuthStore from '../store/authStore'
import { useSocialStore } from '../store/socialStore'

export default function HomeNavbar() {
  const [activeNav, setActiveNav] = useState('Recipes')
  const { user, fetchProfile } = useAuthStore()
  const { initializeSocialState } = useSocialStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile])

  useEffect(() => {
    if (user?._id) {
      initializeSocialState(user._id);
    }
  }, [user?._id, initializeSocialState])

  const getInitials = () => {
    if (!user) return ''
    const first = user.firstName ? user.firstName.charAt(0).toUpperCase() : ''
    const last = user.lastName ? user.lastName.charAt(0).toUpperCase() : ''
    return `${first}${last}` || 'U'
  }

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-10 py-4 bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b-2 border-[#1e2d4a]/10 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/home')}>
        <img src={logoSmall} alt="recipeNest logo" className="w-9 h-9 object-contain" />
        <span className="text-[#1e2d4a] font-black text-xl tracking-tight">recipeNest</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {[{ label: 'Recipes', path: '/home' }, { label: 'Cheflist', path: '/chefs' }].map(({ label, path }) => (
          <button
            key={label}
            onClick={() => { setActiveNav(label); navigate(path); }}
            className={`font-semibold text-base transition-all pb-1 ${
              activeNav === label
                ? 'text-[#1e2d4a] border-b-2 border-[#f5c518]'
                : 'text-[#1e2d4a]/50 hover:text-[#1e2d4a]'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/my-profile')}
          className="w-9 h-9 rounded-full bg-[#1e2d4a] flex items-center justify-center hover:opacity-85 transition-opacity overflow-hidden"
        >
          {user && user.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : user ? (
            <span className="text-white font-bold text-sm tracking-widest">{getInitials()}</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
