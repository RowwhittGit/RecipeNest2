import { create } from 'zustand'
import { registerUser, loginUser, googleLoginUser, forgotPasswordUser, resetPasswordUser, getUserProfile } from '../api/authApi'
import { useSocialStore } from './socialStore'

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  profileFetched: false,

  fetchProfile: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (get().profileFetched) return;
    try {
      const res = await getUserProfile(token);
      if (res.data?.data?.user) {
        set({ user: res.data.data.user, profileFetched: true });
      }
    } catch {
      // silent — token may be expired, user will be prompted on protected pages
    }
  },

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
      const { user, accessToken, refreshToken } = res.data.data
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token: accessToken, loading: false })
      useSocialStore.getState().initializeSocialState(user._id)
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
      const { user, accessToken, refreshToken } = res.data.data
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token: accessToken, loading: false })
      useSocialStore.getState().initializeSocialState(user._id)
      return true
    } catch (err) {
      set({ error: err.response?.data?.message || 'Google login failed', loading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    useSocialStore.getState().reset()
    set({ user: null, token: null, error: null, profileFetched: false })
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
