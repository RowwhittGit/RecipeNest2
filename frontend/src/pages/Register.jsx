import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiMail, HiLockClosed, HiUser, HiAtSymbol } from 'react-icons/hi'
import AuthCard from '../components/ui/AuthCard'
import InputField from '../components/ui/InputField'
import GoogleButton from '../components/ui/GoogleButton'
import useAuthStore from '../store/authStore'

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { register, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...payload } = form
    const ok = await register(payload)
    if (ok) navigate('/home')
  }

  return (
    <AuthCard subtitle="Join our culinary community!" tapePosition="left">
      <h1 className="text-[#1e2d4a] font-black text-2xl text-center mb-6">Create your account</h1>

      <GoogleButton />

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          name="firstName"
          placeholder="John"
          icon={HiUser}
          value={form.firstName}
          onChange={handleChange}
        />

        <InputField
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          icon={HiUser}
          value={form.lastName}
          onChange={handleChange}
        />

        <InputField
          label="Username"
          name="username"
          placeholder="rohitchef"
          icon={HiAtSymbol}
          value={form.username}
          onChange={handleChange}
        />

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

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          icon={HiLockClosed}
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <p className="text-xs text-gray-400 leading-relaxed">
          By signing up, you agree to our{' '}
          <span className="font-black text-[#1e2d4a]">Terms of Service</span>
          {' '}and{' '}
          <span className="font-black text-[#1e2d4a]">Privacy Policy</span>
        </p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already have an account?{' '}
        <Link to="/login" className="font-black text-[#1e2d4a] hover:opacity-70">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
