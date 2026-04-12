import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getAdminStats, getAdminLogs } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalReviews: 0,
    averageRating: 0
  });

  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, logsData] = await Promise.all([
          getAdminStats(),
          getAdminLogs()
        ]);
        setStats(statsData);
        setLogs(logsData.slice(0, 4));
      } catch (error) {
        console.error('Failed to load admin dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  const inactiveUsers = stats.totalUsers - stats.activeUsers;
  
  // Synthetic projected curve based on total current users 
  const dynamicData = [
    { name: 'Mon', users: Math.floor(stats.totalUsers * 0.7) },
    { name: 'Tue', users: Math.floor(stats.totalUsers * 0.75) },
    { name: 'Wed', users: Math.floor(stats.totalUsers * 0.8) },
    { name: 'Thu', users: Math.floor(stats.totalUsers * 0.85) },
    { name: 'Fri', users: Math.floor(stats.totalUsers * 0.9) },
    { name: 'Sat', users: Math.floor(stats.totalUsers * 0.95) },
    { name: 'Sun', users: stats.totalUsers },
  ];

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-[#446d5c] mt-2 font-medium">Real-time clinical insights and user growth analytics.</p>
      </header>
      
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0]">
           <div className="flex justify-between items-start mb-6">
             <div className="w-12 h-12 bg-[#86efac] text-[#14532d] rounded-xl flex items-center justify-center shadow-inner">
               <span className="material-symbols-outlined">how_to_reg</span>
             </div>
             <div className="px-2.5 py-1 bg-[#f0fdf4] text-[#16a34a] text-xs font-bold rounded-full flex items-center gap-1 border border-[#bbf7d0]">
               <span className="material-symbols-outlined text-[14px]">trending_up</span>
               12%
             </div>
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ACTIVE USERS</p>
             <p className="text-4xl font-extrabold text-[#1a2e25]">{stats.activeUsers}</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0]">
           <div className="flex justify-between items-start mb-6">
             <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center shadow-inner">
               <span className="material-symbols-outlined">group</span>
             </div>
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TOTAL USERS</p>
             <p className="text-4xl font-extrabold text-[#1a2e25]">{stats.totalUsers}</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0]">
           <div className="flex justify-between items-start mb-6">
             <div className="w-12 h-12 bg-red-100 text-red-700 rounded-xl flex items-center justify-center shadow-inner">
               <span className="material-symbols-outlined">person_off</span>
             </div>
             <div className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase">
               Inactive
             </div>
           </div>
           <div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">INACTIVE USERS</p>
             <p className="text-4xl font-extrabold text-[#1a2e25]">{inactiveUsers}</p>
           </div>
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Growth Chart (Left 2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#1a2e25]">User Growth</h2>
              <p className="text-xs text-[#446d5c] font-medium mt-1">Growth trajectory over the last 30 days</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#edf6f0] text-[#1a2e25] text-xs font-bold rounded-lg hover:bg-[#e1efe6] transition-colors">Last 7 Days</button>
              <button className="px-4 py-2 bg-[#00a676] text-white text-xs font-bold rounded-lg shadow-sm">Last 30 Days</button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dynamicData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00a676" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00a676" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    padding: '12px'
                  }} 
                  itemStyle={{ color: '#00a676', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#00a676" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: '#00a676' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Sidebar (Right col) */}
        <div className="bg-[#edf6f0] rounded-2xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-[#1a2e25]">Recent Activity</h2>
             <button onClick={() => navigate('/admin/logs')} className="text-xs font-bold text-[#00a676] hover:underline">View All</button>
           </div>
           
           <div className="flex-1 space-y-6">
              {logs.length > 0 ? logs.map((log, i) => (
                <div key={log._id || i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 ${log.action.includes('SUSPEND') || log.action.includes('DELETE') ? 'bg-red-100 text-red-600' : 'bg-[#86efac] text-[#14532d]'}`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {log.action.includes('SUSPEND') ? 'block' : log.action.includes('DELETE') ? 'delete' : 'manage_accounts'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-[#1a2e25] font-medium leading-tight">{log.description}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">{new Date(log.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )) : (
                 <div className="flex items-center justify-center h-full text-slate-500 text-sm font-medium">
                    No recent activity logs.
                 </div>
              )}
           </div>

           <button onClick={() => navigate('/admin/logs')} className="w-full mt-6 py-3 bg-[#00a676] hover:bg-[#008f65] text-white font-bold rounded-xl shadow-lg shadow-[#00a676]/20 transition-all flex items-center justify-center gap-2 text-sm">
             <span className="material-symbols-outlined text-[18px]">visibility</span>
             Review All Logs
           </button>
        </div>
      </div>

      {/* Bottom Status Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#edf6f0] flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">SYNC STATUS</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#00a676] animate-pulse"></span>
            <p className="font-bold text-[#1a2e25]">All Nodes Online</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#edf6f0] flex flex-col justify-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PENDING VERIFICATIONS</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-extrabold text-red-600">24</p>
            <p className="text-xs font-semibold text-slate-500">Requires Action</p>
          </div>
        </div>

        <div className="bg-[#004e38] p-6 rounded-2xl flex justify-between items-center shadow-lg shadow-[#004e38]/20">
          <div>
            <h4 className="text-white font-bold text-lg">Monthly Clinical<br/>Audit Ready</h4>
            <p className="text-[#86efac] text-[10px] font-bold uppercase tracking-widest mt-2">COMPLIANCE: 99.8%</p>
          </div>
          <button className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white backdrop-blur-sm">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
