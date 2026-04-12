import React, { useState, useEffect } from 'react';
import { getAdminLogs } from '../../services/api';
import UserAvatar from '../../components/common/UserAvatar';

const getActionIcon = (action) => {
  switch(action) {
    case 'USER_ACTIVATED': return { icon: 'check_circle', color: 'text-[#00a676]', bg: 'bg-[#edf6f0]' };
    case 'USER_SUSPENDED': return { icon: 'block', color: 'text-orange-600', bg: 'bg-orange-50' };
    case 'USER_DELETED': return { icon: 'delete_forever', color: 'text-red-600', bg: 'bg-red-50' };
    case 'REVIEW_SUBMITTED': return { icon: 'rate_review', color: 'text-blue-600', bg: 'bg-blue-50' };
    default: return { icon: 'history', color: 'text-blue-600', bg: 'bg-blue-50' };
  }
};

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const data = await getAdminLogs();
      setLogs(data);
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight">System Logs</h1>
        <p className="text-sm text-[#446d5c] mt-2 font-medium">An immutable audit trail of administrative actions.</p>
      </header>
      
      <div className="bg-white rounded-[24px] shadow-sm border border-[#edf6f0] p-6 mb-8">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#1a2e25]">Activity Trail</h2>
            <button onClick={fetchLogs} className="flex items-center gap-1 text-sm font-bold text-[#00a676] hover:text-[#008f65]">
               <span className="material-symbols-outlined text-[18px]">refresh</span> Reload
            </button>
         </div>

         {isLoading ? (
            <div className="text-center py-12">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00a676] mx-auto mb-4"></div>
               <p className="text-slate-500 font-medium">Fetching secure logs...</p>
            </div>
         ) : logs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium tracking-wide bg-[#f8fbfa] rounded-2xl border border-dashed border-[#edf6f0]">
               No administrative actions have been logged yet.
            </div>
         ) : (
            <div className="space-y-6">
               {logs.map((log) => {
                 const { icon, color, bg } = getActionIcon(log.action);
                 return (
                   <div key={log._id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl hover:bg-[#f8fbfa] transition-colors border border-transparent hover:border-[#edf6f0]">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg} ${color}`}>
                         <span className="material-symbols-outlined">{icon}</span>
                      </div>
                      <div className="flex-1">
                         <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-bold text-[#1a2e25] text-sm">
                               {log.admin?.userName || log.targetUser?.userName || 'System'}
                            </span>
                            <span className="text-slate-500 text-xs font-medium">
                               {log.admin ? 'performed action' : 'activity recorded'}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest border border-slate-200 shadow-sm ${log.action.includes('SUSPEND') || log.action.includes('DELETE') ? 'bg-red-50 text-red-700' : 'bg-white text-slate-600'}`}>{log.action.replace('_', ' ')}</span>
                         </div>
                         <p className="text-sm text-[#446d5c]">{log.description}</p>
                      </div>
                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(log.createdAt).toLocaleDateString()}</p>
                         <p className="text-xs text-slate-500 font-semibold">{new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                   </div>
                 );
               })}
            </div>
         )}
      </div>

      <div className="bg-[#f0f6ff] border border-[#dbeafe] rounded-2xl p-6 flex items-start gap-4 shadow-inner">
         <span className="material-symbols-outlined text-[#2563eb] text-[24px]">verified_user</span>
         <div>
            <h5 className="font-bold text-[#1e3a8a] text-sm mb-1">Compliance Audit Status</h5>
            <p className="text-[#3b82f6] text-xs font-medium max-w-2xl leading-relaxed">System logs are cryptographically sealed and maintained for 7 years to meet strict inter-hospital compliance requirements. Only Senior Practitioners may request log archival.</p>
         </div>
      </div>
    </div>
  );
};

export default AdminLogs;
