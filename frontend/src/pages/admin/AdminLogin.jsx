import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    
    try {
      await loginAdmin({ email, password });
      navigate('/admin');
    } catch (error) {
      setAuthError(error.response?.data?.error || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#edf6f0] font-sans">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 sm:px-12 relative">
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header / Logo */}
            <div className="flex flex-col items-center mb-10 text-center">
               <div className="w-14 h-14 bg-[#00a676] rounded-2xl shadow-lg shadow-[#00a676]/20 flex items-center justify-center text-white mb-6">
                 <span className="material-symbols-outlined text-[32px]">medical_services</span>
               </div>
               <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight mb-1">HealthBuddy</h1>
               <p className="text-sm font-medium text-[#446d5c]">Clinical Sanctuary Admin Portal</p>
            </div>

            {/* Login Card */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
                <form onSubmit={handleLogin} className="space-y-6">
                    {authError && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        <p>{authError}</p>
                      </div>
                    )}
                    
                    <div>
                        <label className="block text-[11px] font-bold text-[#1a2e25] mb-2">Work Email</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@healthbuddy.care" 
                                className="w-full bg-[#f8fbfa] border-none text-[#1a2e25] text-sm font-medium px-4 pl-11 py-3.5 rounded-2xl focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[11px] font-bold text-[#1a2e25]">Password</label>
                            <a href="#" className="text-[11px] font-bold text-[#00a676] hover:underline">Forgot Password?</a>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock</span>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                className="w-full bg-[#f8fbfa] border-none text-[#1a2e25] text-sm font-medium px-4 pl-11 pr-11 py-3.5 rounded-2xl focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all placeholder:text-slate-400"
                            />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1a2e25] transition-colors focus:outline-none">
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                             <div className="w-5 h-5 rounded-[6px] border-2 border-slate-200 bg-[#f8fbfa] flex items-center justify-center group-hover:border-[#00a676] transition-colors">
                             </div>
                             <span className="text-xs font-semibold text-[#446d5c]">Remember this device for 30 days</span>
                        </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-4 bg-[#00a676] hover:bg-[#008f65] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl shadow-lg shadow-[#00a676]/25 hover:shadow-xl hover:shadow-[#00a676]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 mt-4 text-[15px]"
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                        {!isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                </form>

                <div className="mt-10 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">SECURE PROVIDER ACCESS</p>
                    <div className="flex gap-1.5">
                        <div className="w-8 h-1 rounded-full bg-[#bbf7d0]"></div>
                        <div className="w-8 h-1 rounded-full bg-[#00a676]"></div>
                        <div className="w-8 h-1 rounded-full bg-[#bbf7d0]"></div>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center flex flex-col items-center space-y-4">
                <p className="text-[#446d5c] text-xs font-medium">
                    Are you a healthcare provider? <a href="#" className="font-bold text-[#00a676] hover:underline ml-1">Go to Clinical Hub</a>
                </p>
                <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <a href="#" className="hover:text-[#1a2e25] transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-[#1a2e25] transition-colors">Compliance</a>
                    <a href="#" className="hover:text-[#1a2e25] transition-colors">Support</a>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column - Image/Hero */}
      <div className="hidden lg:flex w-[480px] p-6 lg:p-10 shrink-0">
          <div className="w-full h-full rounded-[40px] relative overflow-hidden bg-[#1a2e25] shadow-2xl">
              {/* Note: In a real app the background URL would point to an actual image. Using gradient overlay. */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#004e38]/80 to-[#1a2e25] z-10 mix-blend-multiply"></div>
              <img src="https://images.unsplash.com/photo-1519494026892-80ba3f5efa51?q=80&w=2670&auto=format&fit=crop" alt="Hospital Corridor" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-x-0 bottom-0 p-10 z-20">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-white">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6 border border-white/10 text-white">
                          <span className="material-symbols-outlined text-[24px]">verified_user</span>
                      </div>
                      <h2 className="text-3xl font-extrabold mb-4 leading-tight">Clinical Excellence</h2>
                      <p className="text-white/80 text-sm leading-relaxed font-medium">
                          HealthBuddy Admin provides a secure, intuitive sanctuary for clinical management. Trust, privacy, and performance in one interface.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminLogin;
