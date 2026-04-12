import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import VoiceChat from './pages/VoiceChat';
import HealthTips from './pages/HealthTips';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/admin/AdminRoute';

import AdminUsers from './pages/admin/AdminUsers';
import AdminAI from './pages/admin/AdminAI';
import AdminPolicies from './pages/admin/AdminPolicies';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from './pages/admin/AdminLogin';
import AdminReviews from './pages/admin/AdminReviews';
import AdminLogs from './pages/admin/AdminLogs';
import UserFeedback from './pages/UserFeedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="health-tips" element={<HealthTips />} />
            <Route path="chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="voice-chat" element={
              <ProtectedRoute>
                <VoiceChat />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="feedback" element={
              <ProtectedRoute>
                <UserFeedback />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="ai" element={<AdminAI />} />
            <Route path="policies" element={<AdminPolicies />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="logs" element={<AdminLogs />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
