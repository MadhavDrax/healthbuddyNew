import React from 'react';

const AdminPolicies = () => {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-2">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold tracking-widest uppercase">
            <span className="text-[#00a676]">MANAGEMENT</span>
            <span className="material-symbols-outlined text-[12px] text-slate-400">chevron_right</span>
            <span className="text-slate-500">LEGAL CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight">Legal & Policies</h1>
          <p className="text-sm text-[#446d5c] mt-2 font-medium max-w-[600px]">Review and update the clinical sanctuary's regulatory frameworks and user agreements. Ensure all versions maintain compliance standards.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00a676] text-white font-bold rounded-xl shadow-lg shadow-[#00a676]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm whitespace-nowrap">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Create New Policy
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Left Column */}
        <div className="lg:w-[320px] shrink-0 space-y-6">
          
          {/* Compliance Health */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0]">
             <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-[#edf6f0] text-[#00a676] rounded-2xl flex items-center justify-center">
                     <span className="material-symbols-outlined text-[24px]">gpp_good</span>
                 </div>
                 <div>
                     <p className="text-[10px] font-bold text-[#00a676] uppercase tracking-widest mb-0.5">COMPLIANCE HEALTH</p>
                     <p className="text-3xl font-extrabold text-[#1a2e25]">98.4%</p>
                 </div>
             </div>
             <div className="w-full h-2 bg-[#edf6f0] rounded-full overflow-hidden">
                 <div className="h-full bg-[#004e38] rounded-full" style={{width: '98.4%'}}></div>
             </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-[#f8fbfa] p-6 rounded-[24px] shadow-inner border border-[#edf6f0]">
             <h3 className="font-bold text-[#1a2e25] mb-4 text-sm">Pending Approvals</h3>
             
             <div className="space-y-3">
                 <button className="w-full text-left bg-white p-4 rounded-2xl shadow-sm border border-[#edf6f0] hover:border-[#00a676]/30 flex items-center justify-between group transition-colors">
                     <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-[#00a676] text-[20px]">description</span>
                         <div>
                             <p className="text-[#1a2e25] font-bold text-sm">HIPAA Amendment</p>
                             <p className="text-[10px] text-slate-500 font-bold mt-0.5">v2.4.0 Draft</p>
                         </div>
                     </div>
                     <span className="material-symbols-outlined text-slate-400 group-hover:text-[#00a676] transition-colors">arrow_forward</span>
                 </button>

                 <button className="w-full text-left bg-white p-4 rounded-2xl shadow-sm border border-[#edf6f0] hover:border-[#00a676]/30 flex items-center justify-between group transition-colors">
                     <div className="flex items-center gap-3">
                         <span className="material-symbols-outlined text-blue-600 text-[20px]">description</span>
                         <div>
                             <p className="text-[#1a2e25] font-bold text-sm">EU AI Act Alignment</p>
                             <p className="text-[10px] text-slate-500 font-bold mt-0.5">v1.1.0 Review</p>
                         </div>
                     </div>
                     <span className="material-symbols-outlined text-slate-400 group-hover:text-[#00a676] transition-colors">arrow_forward</span>
                 </button>
             </div>
          </div>
        </div>

        {/* Right Column - Active Documents Table */}
        <div className="flex-1 bg-white rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#edf6f0] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1a2e25]">Active Documents</h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-[#edf6f0] text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-[#00a676] transition-colors">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    </button>
                    <button className="w-8 h-8 rounded-full border border-[#edf6f0] text-slate-400 flex items-center justify-center hover:bg-slate-50 hover:text-[#00a676] transition-colors">
                        <span className="material-symbols-outlined text-[18px]">sort</span>
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#edf6f0]">
                        <th className="pl-14 pr-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/2">DOCUMENT NAME</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">STATUS</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">VERSION</th>
                        <th className="px-8 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf6f0]/50">
                      
                      {/* Row 1 */}
                       <tr className="hover:bg-[#f8fbfa] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e1efe6] text-[#00a676] rounded-xl flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">gavel</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#1a2e25] text-sm">Terms of Service</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Last updated: Oct 24, 2023</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#bbf7d0] text-[#166534]">Active</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-600">v3.1.2</td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">history</span></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2 */}
                       <tr className="hover:bg-[#f8fbfa] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">health_and_safety</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#1a2e25] text-sm">Privacy Policy</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Last updated: Jan 12, 2024</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#bbf7d0] text-[#166534]">Active</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-600">v4.0.5</td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">history</span></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3 */}
                       <tr className="hover:bg-[#f8fbfa] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e4ece7] text-[#446d5c] rounded-xl flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">cookie</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#1a2e25] text-sm">Cookie Policy</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Last updated: Feb 05, 2024</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">Draft</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-600">v2.1.0-dev</td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">history</span></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4 */}
                       <tr className="hover:bg-[#f8fbfa] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#e1efe6] text-[#00a676] rounded-xl flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined">local_hospital</span>
                            </div>
                            <div>
                              <p className="font-bold text-[#1a2e25] text-sm">HIPAA Compliance Disclosure</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Last updated: Nov 11, 2023</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#bbf7d0] text-[#166534]">Active</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-600">v1.2.9</td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-[#00a676] hover:bg-slate-50 rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">history</span></button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Deep Blue Alert Banner */}
      <div className="bg-[#0b5cba] rounded-[24px] p-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-xl shadow-[#0b5cba]/20 text-white">
        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-3">
             <span className="material-symbols-outlined text-[20px]">info</span>
             <span className="text-[10px] font-bold uppercase tracking-widest">UPCOMING REGULATORY CHANGE</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-3">EU AI Act Compliance Window</h2>
          <p className="text-white/80 font-medium text-sm leading-relaxed max-w-[700px]">
             Your current AI safety disclosure policies need updating by Q3 to remain compliant with the latest legislative framework. We recommend starting the draft review now.
          </p>
        </div>
        <div className="relative z-10 shrink-0 mt-4 md:mt-0">
          <button className="px-8 py-3.5 bg-white text-[#0b5cba] font-bold rounded-xl shadow-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all">
            Prepare Draft
          </button>
        </div>
        {/* Decorative Background curve */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#0d4f9f] rounded-l-[100px] pointer-events-none z-0"></div>
      </div>
    </div>
  );
};

export default AdminPolicies;
