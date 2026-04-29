import axios from 'axios';

const useAdminApi = () => {
  const adminApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  });

  adminApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
      }
      return Promise.reject(error);
    }
  );

  return adminApi;
};

export default useAdminApi;
