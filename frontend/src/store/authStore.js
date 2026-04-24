import { create } from 'zustand'
import { registerUser, loginUser, googleLoginUser, forgotPasswordUser, resetPasswordUser } from '../api/authApi'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null })
    try {
      await registerUser(data)
      set({ loading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Registration failed', loading: false })
      return false
    }
  },

  login: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await loginUser(data)
      const { user, accessToken } = res.data.data
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token: accessToken, loading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Login failed', loading: false })
      return false
    }
  },

  googleLogin: async (idToken) => {
    if (!idToken) {
      set({ error: 'Google login failed: missing token', loading: false })
      return false
    }
    set({ loading: true, error: null })
    try {
      const res = await googleLoginUser(idToken)
      const { user, accessToken } = res.data.data
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token: accessToken, loading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Google login failed', loading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, error: null })
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null })
    try {
      await forgotPasswordUser(email)
      set({ loading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to send reset link', loading: false })
      return false
    }
  },

  resetPassword: async (token, password) => {
    set({ loading: true, error: null })
    try {
      await resetPasswordUser(token, password)
      set({ loading: false })
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Password reset failed', loading: false })
      return false
    }
  },
}))

export default useAuthStore
