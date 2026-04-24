import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMail } from 'react-icons/hi'
import AuthCard from '../components/ui/AuthCard'
import InputField from '../components/ui/InputField'
import useAuthStore from '../store/authStore'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const { forgotPassword, loading, error } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    const ok = await forgotPassword(email)
    if (ok) setSent(true)
  }

  return (
    <AuthCard subtitle="Reset your password" tapePosition="right">
      <h1 className="text-[#1e2d4a] font-black text-2xl text-center mb-2">Forgot Password</h1>
      <p className="text-gray-400 text-sm text-center mb-6">
        Enter your email and we'll send you a reset link.
      </p>

      {sent ? (
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[#f5c518]/20 flex items-center justify-center mx-auto mb-4">
            <HiMail className="text-3xl text-[#f5c518]" />
          </div>
          <p className="text-[#1e2d4a] font-bold text-base mb-1">Reset link sent!</p>
          <p className="text-gray-400 text-sm mb-6">Check your email for the password reset link.</p>
          <Link
            to="/login"
            className="inline-block w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity text-center"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com"
            icon={HiMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-gray-400 mt-5">
        Remember your password?{' '}
        <Link to="/login" className="font-black text-[#1e2d4a] hover:opacity-70">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
