import { Link } from 'react-router-dom'
import { HiMail, HiArrowLeft } from 'react-icons/hi'
import logo from '../images/logo_small.png'

export default function VerifyNoticePage() {
  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[#f5c518]/20 pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-2 mb-2">
        <img src={logo} alt="recipeNest" className="w-10 h-10 object-contain" />
        <span className="text-[#1e2d4a] font-black text-2xl">recipeNest</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">One more step!</p>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
        <div className="absolute -top-4 -right-3 w-10 h-10 bg-[#f5c518] rotate-12 rounded-sm opacity-90" />

        <div className="w-16 h-16 rounded-full bg-[#f5c518]/20 flex items-center justify-center mx-auto mb-5">
          <HiMail className="text-3xl text-[#f5c518]" />
        </div>

        <h1 className="text-[#1e2d4a] font-black text-2xl mb-3">Check your email</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Thank you for registering. Please check your email and click the verification link to activate your account.
        </p>

        <Link
          to="/login"
          className="inline-block w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity"
        >
          Go to Login
        </Link>
      </div>

      <Link to="/" className="mt-6 flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1e2d4a] transition-colors">
        <HiArrowLeft />
        Back to home
      </Link>
    </div>
  )
}
