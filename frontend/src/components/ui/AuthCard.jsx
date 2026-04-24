import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import logo from '../../images/logo_small.png'

export default function AuthCard({ subtitle, tapePosition = 'right', children }) {
  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blobs */}
      {tapePosition === 'right' ? (
        <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-[#f5c518]/20 pointer-events-none" />
      ) : (
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[#f5c518]/20 pointer-events-none" />
      )}

      {/* Logo */}
      <div className="flex items-center gap-2 mb-2">
        <img src={logo} alt="recipeNest" className="w-10 h-10 object-contain" />
        <span className="text-[#1e2d4a] font-black text-2xl">recipeNest</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">{subtitle}</p>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-sm p-6 md:p-8">
        {/* Tape decoration */}
        <div
          className={`absolute -top-4 ${tapePosition === 'right' ? '-right-3' : '-left-3'} w-10 h-10 bg-[#f5c518] rotate-12 rounded-sm opacity-90`}
        />
        {children}
      </div>

      {/* Back to home */}
      <Link to="/" className="mt-6 flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1e2d4a] transition-colors">
        <HiArrowLeft />
        Back to home
      </Link>
    </div>
  )
}
