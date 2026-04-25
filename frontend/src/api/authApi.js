import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export const registerUser = (data) => api.post('/api/auth/register', data)
export const loginUser = (data) => api.post('/api/auth/login', data)
export const googleLoginUser = (idToken) => api.post('/api/auth/google', { idToken })
export const forgotPasswordUser = (email) => api.post('/api/auth/forgot-password', { email })
export const resetPasswordUser = (token, password) => api.post(`/api/auth/reset-password/${token}`, { password })
export const getUserProfile = (token) => api.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
