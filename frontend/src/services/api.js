import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('healthbuddy_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to intercept 403 Suspended
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      if (error.response.data?.error?.includes('Suspended')) {
        localStorage.removeItem('healthbuddy_token');
        window.location.href = '/login?error=suspended';
      }
    }
    return Promise.reject(error);
  }
);

// User APIs
export const signupUser = async (userData) => {
  const response = await api.post('/api/auth/signup', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await api.post('/api/auth/admin/login', credentials);
  return response.data;
};

export const submitReview = async (reviewData) => {
  const response = await api.post('/api/reviews', reviewData);
  return response.data;
};

export const getReviews = async () => {
  const response = await api.get('/api/reviews');
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post('/api/auth/verify-otp', data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post('/api/auth/reset-password', data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/api/users/me');
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await api.put(`/api/users/me`, userData);
  return response.data;
};

// Admin APIs
export const getAdminStats = async () => {
  const response = await api.get('/api/admin/stats');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/api/admin/users');
  return response.data;
};

export const updateUserStatus = async (id, status) => {
  const response = await api.put(`/api/admin/users/${id}/status`, { status });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/admin/users/${id}`);
  return response.data;
};

export const getAdminLogs = async () => {
  const response = await api.get('/api/admin/logs');
  return response.data;
};

// Chat APIs
export const sendMessage = async (message) => {
  const response = await api.post('/api/chat/message', { message });
  return response.data;
};

export const getChatHistory = async (userId) => {
  const response = await api.get(`/api/chat/history/${userId}`);
  return response.data;
};

// Health Tips API
export const getHealthTip = async (category = null) => {
  const url = category ? `/api/health/tips?category=${category}` : '/api/health/tips';
  const response = await api.get(url);
  return response.data;
};

export default api;
