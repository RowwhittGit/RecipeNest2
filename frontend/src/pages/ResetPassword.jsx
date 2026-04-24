import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiLockClosed } from 'react-icons/hi'
import AuthCard from '../components/ui/AuthCard'
import InputField from '../components/ui/InputField'
import useAuthStore from '../store/authStore'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mismatch, setMismatch] = useState(false)
  const { resetPassword, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password) return
    if (password !== confirmPassword) {
      setMismatch(true)
      return
    }
    setMismatch(false)
    const ok = await resetPassword(token, password)
    if (ok) navigate('/login')
  }

  return (
    <AuthCard subtitle="Set a new password" tapePosition="left">
      <h1 className="text-[#1e2d4a] font-black text-2xl text-center mb-2">Reset Password</h1>
      <p className="text-gray-400 text-sm text-center mb-6">
        Enter your new password below.
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputField
          label="New Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={HiLockClosed}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          icon={HiLockClosed}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {mismatch && <p className="text-red-500 text-sm text-center">Passwords do not match</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password || !confirmPassword}
          className="w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-5">
        <Link to="/login" className="font-black text-[#1e2d4a] hover:opacity-70">
          Back to Login
        </Link>
      </p>
    </AuthCard>
  )
}
