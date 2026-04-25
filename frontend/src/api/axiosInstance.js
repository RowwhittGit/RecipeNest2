import axios from 'axios';

const getToken = () => localStorage.getItem('token') || '';
const getRefreshToken = () => localStorage.getItem('refreshToken') || '';

// ── Refresh access token ───────────────────────────────────────────────────────
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');
  const res = await axios.post('/api/auth/refresh-token', { token: refreshToken });
  const newToken = res.data.data.accessToken;
  localStorage.setItem('token', newToken);
  return newToken;
}

// ── authFetch: makes a request, retries once after refreshing on 401 ───────────
export async function authFetch(requestFn) {
  try {
    return await requestFn(getToken());
  } catch (err) {
    if (err.response?.status === 401) {
      try {
        const newToken = await refreshAccessToken();
        return await requestFn(newToken);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw err;
      }
    }
    throw err;
  }
}
