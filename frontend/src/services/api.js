import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const createUser = async (userData) => {
  const response = await api.post('/api/createuser', userData);
  return response.data;
};

export const getUserBySessionId = async (sessionId) => {
  const response = await api.get(`/api/users?sessionId=${sessionId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/api/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/api/users/${userId}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/api/users');
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
