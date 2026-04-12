import React from 'react';
import UserAvatar from '../../common/UserAvatar';

const UpdateUserStatusModal = ({ isOpen, onClose, user, onConfirm }) => {
  if (!isOpen || !user) return null;

  const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2e25]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] p-8 max-w-[480px] w-full shadow-2xl relative animate-in zoom-in-95 duration-300 border border-[#edf6f0]">
        
        <div className="flex justify-between items-start mb-6">
           <span className="px-3 py-1 bg-[#bbf7d0] text-[#166534] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#86efac]">SECURITY PROTOCOL</span>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 hover:bg-slate-100 p-1 rounded-full">
              <span className="material-symbols-outlined text-[20px]">close</span>
           </button>
        </div>

        <h2 className="text-2xl font-extrabold text-[#1a2e25] tracking-tight mb-6">Update User Status</h2>
        
        <div className="bg-[#f8fbfa] p-4 rounded-2xl border border-[#edf6f0] flex items-center gap-4 mb-6 shadow-sm">
           <UserAvatar name={user.userName || user.email} className="w-14 h-14 text-xl" showStatus={true} status={user.status} />
           <div>
              <p className="font-bold text-[#1a2e25] text-lg">{user.userName || 'Unnamed User'}</p>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">{user.email}</p>
           </div>
        </div>

        <div className="flex justify-between items-center mb-6 px-1">
           <div>
              <p className="font-bold text-[#1a2e25] text-sm mb-0.5">Account Status</p>
              <p className="text-[11px] text-slate-500 font-medium">Toggle clinical access permissions</p>
           </div>
           <div className="flex items-center gap-3">
              <div className={`w-12 h-6 rounded-full relative shadow-inner transition-colors ${user.status === 'Active' ? 'bg-[#00a676]' : 'bg-red-500'}`}>
                 <div className={`absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-all ${user.status === 'Active' ? 'right-1' : 'left-1'}`}></div>
              </div>
              <span className={`text-sm font-bold ${user.status === 'Active' ? 'text-[#004e38]' : 'text-red-700'}`}>{user.status}</span>
           </div>
        </div>

        <div className={`p-4 rounded-2xl flex gap-3 mb-8 border shadow-inner ${user.status === 'Active' ? 'bg-red-50 border-red-200' : 'bg-[#e2f9f1] border-[#a7f3d0]'}`}>
           <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${user.status === 'Active' ? 'text-red-700' : 'text-[#004e38]'}`}>info</span>
           <p className={`text-xs font-medium leading-relaxed ${user.status === 'Active' ? 'text-red-800' : 'text-[#004e38]'}`}>
             {user.status === 'Active' ? 'Suspending this user will immediately revoke access to all clinical records and force a logout. This action is logged for compliance.' : 'Reactivating this user will restore their clinical access immediately.'}
           </p>
        </div>

        <div className="flex justify-between items-center px-2">
           <button onClick={onClose} className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
              Cancel
           </button>
           <button onClick={() => onConfirm(user, newStatus)} className="px-6 py-3 bg-[#00a676] hover:bg-[#008f65] text-white font-bold rounded-xl shadow-lg shadow-[#00a676]/25 transition-all text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {user.status === 'Active' ? 'Suspend Account' : 'Reactivate Account'}
           </button>
        </div>

      </div>
    </div>
  );
};

export default UpdateUserStatusModal;
