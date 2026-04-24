import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiCheckCircle, HiXCircle, HiArrowLeft } from 'react-icons/hi'
import axios from 'axios'
import logo from '../images/logo_small.png'

export default function VerifyEmailPage() {
  const { token } = useParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    axios
      .get(`http://localhost:8080/api/auth/verify-email/${token}`)
      .then((res) => {
        setMessage(res.data.message || 'Email verified successfully')
        setStatus('success')
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || 'Verification failed. Link may be invalid or expired.')
        setStatus('error')
      })
  }, [token])

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-[#f5c518]/20 pointer-events-none" />

      {/* Logo */}
      <div className="flex items-center gap-2 mb-2">
        <img src={logo} alt="recipeNest" className="w-10 h-10 object-contain" />
        <span className="text-[#1e2d4a] font-black text-2xl">recipeNest</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">Email Verification</p>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
        <div className="absolute -top-4 -left-3 w-10 h-10 bg-[#f5c518] rotate-12 rounded-sm opacity-90" />

        {status === 'loading' && (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
            </div>
            <h1 className="text-[#1e2d4a] font-black text-2xl mb-2">Verifying...</h1>
            <p className="text-gray-400 text-sm">Please wait while we verify your email.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <HiCheckCircle className="text-4xl text-green-500" />
            </div>
            <h1 className="text-[#1e2d4a] font-black text-2xl mb-2">Email Verified!</h1>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <Link
              to="/login"
              className="inline-block w-full bg-[#f5c518] text-[#1e2d4a] font-black text-base rounded-xl py-3.5 hover:opacity-90 transition-opacity"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <HiXCircle className="text-4xl text-red-500" />
            </div>
            <h1 className="text-[#1e2d4a] font-black text-2xl mb-2">Verification Failed</h1>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <Link
              to="/register"
              className="inline-block w-full bg-[#1e2d4a] text-white font-black text-base rounded-xl py-3.5 hover:opacity-85 transition-opacity"
            >
              Back to Register
            </Link>
          </>
        )}
      </div>

      <Link to="/" className="mt-6 flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1e2d4a] transition-colors">
        <HiArrowLeft />
        Back to home
      </Link>
    </div>
  )
}
