import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed } from 'react-icons/hi'
import AuthCard from '../components/ui/AuthCard'
import InputField from '../components/ui/InputField'
import GoogleButton from '../components/ui/GoogleButton'
import useAuthStore from '../store/authStore'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form)
    if (ok) navigate('/home')
  }

  return (
    <AuthCard subtitle="Welcome back!" tapePosition="right">
      <h1 className="text-[#1e2d4a] font-black text-2xl text-center mb-6">Sign in to your account</h1>

      <GoogleButton />

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
          icon={HiMail}
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={HiLockClosed}
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-semibold text-[#1e2d4a] hover:opacity-70">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity mt-1 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-5">
        Don't have an account?{' '}
        <Link to="/register" className="font-black text-[#1e2d4a] hover:opacity-70">
          Sign up
        </Link>
      </p>
    </AuthCard>
  )
}
