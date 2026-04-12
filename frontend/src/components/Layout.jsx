import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Home, User, Stethoscope, LogOut, LogIn, Mic, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/health-tips', icon: Stethoscope, label: 'Health Tips' },
  ];

  if (user) {
    navItems.push({ path: '/chat', icon: MessageCircle, label: 'Chat' });
    navItems.push({ path: '/voice-chat', icon: Mic, label: 'Voice AI' });
    navItems.push({ path: '/profile', icon: User, label: 'Profile' });
    navItems.push({ path: '/feedback', icon: Star, label: 'Feedback' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-105 duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Heart className="w-6 h-6 text-white transition-transform group-hover:scale-110" fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                HealthBuddy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-50 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
              
              {user ? (
                 <button
                  onClick={handleLogout}
                  className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all duration-300 shadow-md"
                >
                  <LogIn className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-slate-500 text-sm font-medium">
            HealthBuddy — Your AI-powered health assistant
          </p>
          <p className="text-slate-400 text-xs">
            Powered by React, Node.js & Groq LLMs
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
