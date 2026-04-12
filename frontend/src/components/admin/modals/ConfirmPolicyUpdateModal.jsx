import React from 'react';

const ConfirmPolicyUpdateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a2e25]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[32px] p-8 sm:p-10 max-w-[500px] w-full shadow-2xl relative animate-in zoom-in-95 duration-300 border border-[#edf6f0]">
        
        <div className="flex justify-between items-start mb-6">
           <div className="w-12 h-12 bg-[#edf6f0] rounded-2xl flex items-center justify-center shrink-0 border border-[#bbf7d0]">
              <span className="material-symbols-outlined text-[#00a676] text-[24px]">gpp_good</span>
           </div>
           <span className="px-3 py-1.5 bg-[#edf6f0] text-[#004e38] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#a7f3d0]">SYSTEM CONFIRMATION</span>
        </div>

        <h2 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight mb-2">Confirm Policy Update</h2>
        <p className="text-base text-slate-600 font-medium mb-8">Data Retention & Governance v5.0</p>

        <div className="bg-[#f8fbfa] p-6 rounded-3xl border border-[#edf6f0] mb-8 shadow-inner">
           <div className="flex items-center gap-4 mb-6 border-b border-[#edf6f0] pb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">IMPACT LEVEL</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[12px]">public</span> Global Deployment
              </span>
           </div>

           <div className="flex items-center gap-2 mb-4">
               <div className="w-1 h-3 bg-[#00a676] rounded-full"></div>
               <h3 className="text-[10px] font-bold text-[#1a2e25] uppercase tracking-widest">SUMMARY OF CHANGES</h3>
           </div>
           
           <ul className="space-y-4">
               <li className="flex gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                   <span className="material-symbols-outlined text-[#00a676] text-[16px] shrink-0 mt-0.5">check_circle</span>
                   <p>Adjusted clinical data retention period from <span className="font-bold text-[#1a2e25]">5 to 7 years</span> to comply with new regional healthcare mandates.</p>
               </li>
               <li className="flex gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                   <span className="material-symbols-outlined text-[#00a676] text-[16px] shrink-0 mt-0.5">check_circle</span>
                   <p>Updated encryption standard to <span className="font-bold text-[#1a2e25]">AES-256-GCM</span> for all archived patient telemetry logs.</p>
               </li>
               <li className="flex gap-3 text-sm text-slate-700 font-medium leading-relaxed">
                   <span className="material-symbols-outlined text-[#00a676] text-[16px] shrink-0 mt-0.5">check_circle</span>
                   <p>Integrated automatic deletion hooks for HIPAA-expired temporary cache files.</p>
               </li>
           </ul>
        </div>

        <button onClick={onClose} className="w-full py-4 bg-[#00a676] hover:bg-[#008f65] text-white font-bold rounded-2xl shadow-lg shadow-[#00a676]/25 transition-all text-base mb-6">
           Confirm Changes
        </button>

        <div className="flex items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest">
           <button className="text-[#006b4d] hover:text-[#00a676] flex items-center gap-1.5 transition-colors">
              <span className="material-symbols-outlined text-[14px]">history</span>
              REVIEW DETAILED LOG
           </button>
           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              CANCEL EDIT
           </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmPolicyUpdateModal;
