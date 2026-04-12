import React from 'react';

const ActionSuccessfulModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2e25]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] p-10 max-w-[420px] w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden animate-in zoom-in-95 duration-300 border border-[#edf6f0]">
        
        <div className="w-20 h-20 bg-[#edf6f0] rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm shrink-0">
           <div className="w-12 h-12 bg-[#00a676] rounded-full flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[28px] font-bold">check</span>
           </div>
        </div>
        
        <h2 className="text-2xl font-extrabold text-[#1a2e25] tracking-tight mb-3">Action Successful</h2>
        
        <p className="text-[#446d5c] text-sm font-medium leading-relaxed mb-8">
          The medical record has been updated across the Clinical Sanctuary network. All changes are now synchronized.
        </p>
        
        <button onClick={onClose} className="w-full py-3.5 bg-[#00a676] hover:bg-[#008f65] text-white font-bold rounded-2xl shadow-lg shadow-[#00a676]/25 transition-all text-sm mb-4">
          Continue to Dashboard
        </button>
        
        <button onClick={onClose} className="text-[11px] font-bold text-[#004e38] uppercase tracking-widest hover:text-[#00a676] transition-colors mb-6">
          CLOSE
        </button>
        
        <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
           <span className="material-symbols-outlined text-[14px]">local_police</span>
           VERIFIED SECURE BY HEALTHBUDDY
        </div>
        
      </div>
    </div>
  );
};

export default ActionSuccessfulModal;
