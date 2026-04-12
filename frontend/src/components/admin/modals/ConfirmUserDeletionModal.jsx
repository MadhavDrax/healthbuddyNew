import React from 'react';
import UserAvatar from '../../common/UserAvatar';

const ConfirmUserDeletionModal = ({ isOpen, onClose, user, onConfirm }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2e25]/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] p-8 max-w-[480px] w-full shadow-2xl relative animate-in zoom-in-95 duration-300 border border-[#edf6f0]">
        
        <div className="flex items-start gap-5 mb-8">
           <div className="w-14 h-14 bg-[#fef2f2] rounded-full flex items-center justify-center shadow-sm shrink-0 border border-red-100">
              <span className="material-symbols-outlined text-red-600 text-[28px]">warning</span>
           </div>
           <div className="pt-1 border-b border-transparent">
              <h2 className="text-xl font-extrabold text-[#1a2e25] tracking-tight">Confirm User Deletion</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">This action is permanent and cannot be undone.</p>
           </div>
        </div>

        <div className="bg-[#f8fbfa] p-4 rounded-2xl border border-[#edf6f0] flex items-center gap-4 mb-6 shadow-sm">
           <UserAvatar name={user.userName || user.email} className="w-12 h-12 text-lg" showStatus={true} status={user.status} />
           <div>
              <p className="font-bold text-[#1a2e25] text-base mb-1">{user.userName || 'Unnamed User'}</p>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-200 px-2 py-0.5 rounded-md">{user.email}</span>
                 <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm ${user.role === 'admin' ? 'bg-[#6ee7b7] text-[#006b4d]' : 'bg-slate-200 text-slate-600'}`}>{user.role}</span>
              </div>
           </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
           By deleting this account, all associated clinical notes, patient assignments, and administrative logs for <span className="font-bold text-[#1a2e25]">{user.userName || user.email}</span> will be archived. The user will lose immediate access to the HealthBuddy sanctuary.
        </p>

        <div className="bg-[#eff6ff] p-4 rounded-2xl flex gap-3 mb-8 border border-blue-100 shadow-inner">
           <span className="material-symbols-outlined text-[#2563eb] text-[18px] shrink-0 mt-0.5">info</span>
           <p className="text-xs text-blue-800 font-medium leading-relaxed">
             System audit: Deleting an active user removes their device sessions securely. Make sure to back up required clinical logs.
           </p>
        </div>

        <div className="flex gap-4">
           <button onClick={onClose} className="flex-1 py-3.5 bg-[#e2e8f0] hover:bg-slate-300 text-slate-700 font-bold rounded-2xl transition-colors text-sm shadow-sm">
              Cancel Action
           </button>
           <button onClick={() => onConfirm(user._id)} className="flex-[1.5] py-3.5 bg-[#b91c1c] hover:bg-red-800 text-white font-bold rounded-2xl shadow-lg shadow-[#b91c1c]/25 transition-all text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">delete_forever</span>
              Delete User Profile
           </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmUserDeletionModal;
