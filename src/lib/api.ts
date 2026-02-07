import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Standard page size for API lists; keep at or below backend max (100)
export const DEFAULT_PAGE_LIMIT = 50;
// Smaller page size for modal tables to avoid overwhelming the UI
export const DEFAULT_MODAL_PAGE_LIMIT = 10;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we actually had a token (genuine expiry),
      // and avoid redirect loops if already on /login
      const hadToken = !!localStorage.getItem('accessToken');
      localStorage.removeItem('accessToken');
      if (hadToken && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
