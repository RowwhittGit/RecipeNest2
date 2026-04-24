import { create } from 'zustand'
import { registerUser, loginUser } from '../api/authApi'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  register: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await registerUser(data)
      const { user, accessToken } = res.data.data
      localStorage.setItem('token', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token: accessToken, loading: false })
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

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, error: null })
  },
}))

export default useAuthStore
