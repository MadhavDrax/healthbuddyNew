import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AdminAI = () => {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight">AI Management</h1>
          <p className="text-sm text-[#446d5c] mt-2 font-medium">Real-time oversight of HealthBuddy's clinical intelligence engine.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-[#edf6f0] shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00a676] rounded-full"></span>
            <span className="text-sm font-bold text-[#1a2e25]">System Healthy</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Token Usage Card (Left) */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0] flex flex-col items-center">
             <div className="w-full flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-[#1a2e25]">Token Usage</h2>
                 <button className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center text-[#00a676] hover:bg-slate-50 transition-colors">
                     <span className="material-symbols-outlined text-[16px]">autorenew</span>
                 </button>
             </div>
             
             <div className="relative w-48 h-48 my-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={[{value: 72}, {value: 28}]}
                            cx="50%" cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            stroke="none"
                        >
                            <Cell fill="#00a676" />
                            <Cell fill="#edf6f0" />
                        </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-4xl font-extrabold text-[#1a2e25]">72%</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ALLOCATED</span>
                 </div>
             </div>

             <div className="w-full mt-6">
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-sm text-slate-600 font-semibold">Monthly Consumption</span>
                     <span className="text-sm font-bold text-[#1a2e25]">1.2M <span className="text-slate-400">/ 2.0M</span></span>
                 </div>
                 <div className="w-full h-2 bg-[#edf6f0] rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-[#00a676] rounded-full" style={{width: '60%'}}></div>
                 </div>
                 <p className="text-[11px] text-center text-slate-400 font-medium mt-3">Resetting in 12 days</p>
             </div>
          </div>

          {/* Current Used AI Modules (Right span 2) */}
          <div className="lg:col-span-2 bg-white rounded-[24px] p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0] flex flex-col">
             <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-[#1a2e25]">Current Used AI Modules</h2>
                    <p className="text-sm text-[#446d5c]">Operational stack status and engine allocation</p>
                 </div>
                 <button className="w-10 h-10 bg-[#f8fbfa] rounded-full border border-slate-100 flex items-center justify-center text-slate-500 hover:text-[#00a676] hover:border-[#00a676]/30 transition-all">
                     <span className="material-symbols-outlined text-[20px]">autorenew</span>
                 </button>
             </div>

             <div className="space-y-4">
                 {/* Module 1 */}
                 <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-[#edf6f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#00a676]/30 transition-colors">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#ff6a00]">
                             <span className="material-symbols-outlined">psychology</span>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[#1a2e25] text-lg">HealthBuddy LPU Engine</h3>
                                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">Groq Runtime</span>
                             </div>
                             <div className="flex items-center gap-4 mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                 <span className="flex items-center gap-1 text-[#00a676]"><span className="w-1.5 h-1.5 bg-[#00a676] rounded-full"></span> ONLINE</span>
                                 <span className="flex items-center gap-1 text-[#ff6a00]"><span className="material-symbols-outlined text-[14px]">bolt</span> LLaMA 3 8B</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">LATENCY</p>
                         <p className="font-extrabold text-[#00a676] text-lg">~120ms</p>
                     </div>
                 </div>

                 {/* Module 2 */}
                 <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-[#edf6f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#1d4ed8]/30 transition-colors">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#1d4ed8]">
                             <span className="material-symbols-outlined">hearing</span>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[#1a2e25] text-lg">Deepgram Speech-to-Text</h3>
                                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">Voice Input</span>
                             </div>
                             <div className="flex items-center gap-4 mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                 <span className="flex items-center gap-1 text-[#00a676]"><span className="w-1.5 h-1.5 bg-[#00a676] rounded-full"></span> ACTIVE</span>
                                 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">graphic_eq</span> Nova-2</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ACCURACY</p>
                         <p className="font-extrabold text-[#1d4ed8] text-lg">99.1%</p>
                     </div>
                 </div>

                 {/* Module 3 */}
                 <div className="bg-[#f8fbfa] rounded-2xl p-5 border border-[#edf6f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#7e22ce]/30 transition-colors">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#7e22ce]">
                             <span className="material-symbols-outlined">record_voice_over</span>
                         </div>
                         <div>
                             <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[#1a2e25] text-lg">Deepgram Text-to-Speech</h3>
                                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">Voice Output</span>
                             </div>
                             <div className="flex items-center gap-4 mt-1 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                 <span className="flex items-center gap-1 text-[#00a676]"><span className="w-1.5 h-1.5 bg-[#00a676] rounded-full"></span> ACTIVE</span>
                                 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">speaker</span> Aura</span>
                             </div>
                         </div>
                     </div>
                     <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">THROUGHPUT</p>
                         <p className="font-extrabold text-[#7e22ce] text-lg">2.1s TTFB</p>
                     </div>
                 </div>
             </div>
          </div>
      </div>

      {/* Secure Clinical Environment Banner */}
      <div className="bg-[#e4fcfa] border border-[#a7f3d0] rounded-[24px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-[#00a676] rounded-2xl shadow-lg shadow-[#00a676]/20 flex items-center justify-center text-white shrink-0">
             <span className="material-symbols-outlined text-[28px]">shield</span>
          </div>
          <div>
            <h3 className="text-[#004e38] font-bold text-lg">Secure Clinical Environment</h3>
            <p className="text-[#00a676] font-semibold text-sm mt-0.5">HIPAA compliant AI processing active <span className="text-slate-400 font-normal ml-1">• Last audit: 2h ago</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
           <span className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-[#00a676] font-bold text-xs border border-white">Uptime: 99.998%</span>
           <span className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-[#00a676] font-bold text-xs border border-white">Encryption: AES-256</span>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-white/40 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AdminAI;
