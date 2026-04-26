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
        {['Recipes', 'Cheflist'].map((link) => (
          <button
            key={link}
            onClick={() => setActiveNav(link)}
            className={`font-semibold text-base transition-all pb-1 ${
              activeNav === link
                ? 'text-[#1e2d4a] border-b-2 border-[#f5c518]'
                : 'text-[#1e2d4a]/50 hover:text-[#1e2d4a]'
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f5f3e8] transition-colors text-[#1e2d4a]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f5f3e8] transition-colors text-[#1e2d4a] relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f5c518] rounded-full" />
        </button>
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
