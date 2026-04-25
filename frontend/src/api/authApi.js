import axios from 'axios';

export const registerUser = (data) => axios.post('/api/auth/register', data);
export const loginUser = (data) => axios.post('/api/auth/login', data);
export const googleLoginUser = (idToken) => axios.post('/api/auth/google', { idToken });
export const forgotPasswordUser = (email) => axios.post('/api/auth/forgot-password', { email });
export const resetPasswordUser = (token, password) => axios.post(`/api/auth/reset-password/${token}`, { password });
export const getUserProfile = (token) => axios.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
