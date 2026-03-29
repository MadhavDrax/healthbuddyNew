import { createContext, useContext, useState, useEffect } from 'react';
import { createUser, getUserBySessionId } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = localStorage.getItem('healthbuddy_session_id');
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('healthbuddy_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);

    // Check for existing user data
    const storedUser = localStorage.getItem('healthbuddy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const createUserProfile = async (userData) => {
    const newUser = { ...userData, sessionId };
    const created = await createUser(newUser);
    setUser(created);
    localStorage.setItem('healthbuddy_user', JSON.stringify(created));
    return created;
  };

  const updateUserProfile = async (userData) => {
    if (!user) return;
    // Note: Update API needs to be implemented in backend
    const updated = { ...user, ...userData };
    setUser(updated);
    localStorage.setItem('healthbuddy_user', JSON.stringify(updated));
    return updated;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthbuddy_user');
  };

  return (
    <AuthContext.Provider value={{ user, sessionId, loading, createUserProfile, updateUserProfile, logout }}>
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
