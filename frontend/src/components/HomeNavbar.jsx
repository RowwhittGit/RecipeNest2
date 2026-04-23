import { useState } from 'react'
import logoSmall from '../images/logo_small.png'

export default function HomeNavbar() {
  const [activeNav, setActiveNav] = useState('Recipes')

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-10 py-3.5 bg-[#f5f3e8] sticky top-0 z-50 border-b border-black/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoSmall} alt="recipeNest logo" className="w-8 h-8 object-contain" />
        <span className="text-[#1e2d4a] font-black text-lg tracking-tight">recipeNest</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {['Recipes', 'Chefhat'].map((link) => (
          <button
            key={link}
            onClick={() => setActiveNav(link)}
            className={`font-semibold text-sm transition-all ${
              activeNav === link
                ? 'text-[#1e2d4a]'
                : 'text-[#1e2d4a]/50 hover:text-[#1e2d4a]'
            }`}
          >
            {link}
          </button>
        ))}
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-[#1e2d4a]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        {/* Bell */}
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-[#1e2d4a]">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User Avatar */}
        <button className="w-9 h-9 rounded-full bg-[#1e2d4a] flex items-center justify-center hover:opacity-85 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
