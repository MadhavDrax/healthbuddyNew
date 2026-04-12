import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../common/UserAvatar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/users', icon: 'group', label: 'User Management' },
    { path: '/admin/ai', icon: 'smart_toy', label: 'AI Management' },
    { path: '/admin/policies', icon: 'gavel', label: 'Legal & Policies' },
    { path: '/admin/reviews', icon: 'rate_review', label: 'Reviews & Suggestions' },
    { path: '/admin/logs', icon: 'history', label: 'System Logs' },
    { path: '/admin/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fbfa] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#edf6f0] flex flex-col h-full shrink-0">
        {/* Logo Area */}
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00a676] rounded-xl flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white">health_and_safety</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[18px] text-[#004e38] leading-tight tracking-tight">HealthBuddy</h1>
            <span className="text-[9px] font-bold text-[#00a676] uppercase tracking-[0.15em]">Clinical Sanctuary</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold 
                  ${isActive 
                    ? 'bg-[#00a676] text-white shadow-md shadow-[#00a676]/20' 
                    : 'text-[#446d5c] hover:bg-[#e1efe6] hover:text-[#004e38]'
                  }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Logout Action */}
        <div className="px-4 pb-4">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold text-red-600 hover:bg-red-50"
           >
             <span className="material-symbols-outlined text-[20px]">logout</span>
             Logout Session
           </button>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 mx-4 mb-6 mt-2 bg-[#e1efe6] rounded-xl flex items-center gap-3">
          <UserAvatar name={user?.userName || user?.email} className="w-10 h-10 text-sm border-2 border-white object-cover shadow-sm" />
          <div className="overflow-hidden flex-1 text-left">
            <p className="text-sm font-bold text-[#004e38] truncate leading-tight">{user?.userName || 'Admin User'}</p>
            <p className="text-[11px] text-[#446d5c] truncate">Chief Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white flex items-center justify-between px-8 border-b border-[#edf6f0] shrink-0 sticky top-0 z-20">
           {/* Search Bar */}
           <div className="relative w-96">
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
             <input 
               type="text" 
               placeholder="Search clinical records or staff..." 
               className="w-full bg-[#f8fbfa] text-sm pl-11 pr-4 py-3 rounded-full border-none focus:ring-2 focus:ring-[#00a676]/20 outline-none placeholder:text-slate-400 transition-all"
             />
           </div>

           {/* Right Actions */}
           <div className="flex items-center gap-6">
             <button className="relative text-slate-500 hover:text-slate-800 transition-colors">
               <span className="material-symbols-outlined">notifications</span>
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
             </button>
             <div className="w-px h-8 bg-slate-200"></div>
             <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/admin/settings')}>
               <span className="text-sm font-semibold text-[#004e38] group-hover:text-[#00a676] transition-colors">{user?.userName || 'Admin User'}</span>
               <UserAvatar name={user?.userName || user?.email} className="w-8 h-8 text-xs" />
             </div>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto w-full relative z-10 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
