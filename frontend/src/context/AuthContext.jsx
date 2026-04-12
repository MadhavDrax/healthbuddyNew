import { createContext, useContext, useState, useEffect } from 'react';
import { signupUser, loginUser, adminLogin, getCurrentUser, updateUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('healthbuddy_token');
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (userData) => {
    const data = await signupUser(userData);
    localStorage.setItem('healthbuddy_token', data.token);
    setUser(data.user);
    return data;
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem('healthbuddy_token', data.token);
    setUser(data.user);
    return data;
  };

  const loginAdmin = async (credentials) => {
    const data = await adminLogin(credentials);
    localStorage.setItem('healthbuddy_token', data.token);
    setUser(data.user);
    return data;
  };

  const updateUserProfile = async (userData) => {
    if (!user) return;
    const updated = await updateUser(userData);
    setUser(updated);
    return updated;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthbuddy_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginAdmin, updateUserProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
