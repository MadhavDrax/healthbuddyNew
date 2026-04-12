import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { forgotPassword, verifyOtp, resetPassword } from '../services/api';
import { Heart, Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [mode, setMode] = useState('login'); // login | forgot | otp | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryMode = params.get('mode');
    const queryEmail = params.get('email');
    const queryError = params.get('error');
    if (queryMode) setMode(queryMode);
    if (queryEmail) setEmail(decodeURIComponent(queryEmail));
    if (queryError === 'suspended') {
      setError('Your account has been suspended by an administrator.');
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setError('Password must contain only letters and numbers (alphanumeric)');
      return;
    }
    setError(''); setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);
    try {
      const res = await forgotPassword(email);
      setMessage(res.message);
      setMode('otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      setMessage(res.message);
      setMode('reset');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
      setError('Password must contain only letters and numbers (alphanumeric)');
      return;
    }
    setError(''); setMessage(''); setLoading(true);
    try {
      const res = await resetPassword({ email, otp, newPassword });
      setMessage(res.message);
      setTimeout(() => setMode('login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500">
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-xl shadow-green-500/20 mb-4 hover:scale-105 transition-transform duration-300">
              {mode === 'login' ? <Heart className="w-8 h-8 text-white" fill="currentColor" /> : <ShieldCheck className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
              {mode === 'login' ? 'Welcome Back' : mode === 'forgot' ? 'Reset Password' : mode === 'otp' ? 'Verify OTP' : 'New Password'}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              {mode === 'login' ? 'Sign in to access your AI health buddy' : 'Secure your account'}
            </p>
          </div>

          {error && <div className="p-4 mb-6 text-red-700 bg-red-100/50 border border-red-200 rounded-2xl text-sm font-semibold">{error}</div>}
          {message && <div className="p-4 mb-6 text-green-700 bg-green-100/50 border border-green-200 rounded-2xl text-sm font-semibold">{message}</div>}

          {/* Login Mode */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-500 ml-1 tracking-wide">EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-1.5 group">
                 <div className="flex justify-between items-center ml-1">
                   <label className="text-sm font-bold text-slate-500 tracking-wide">PASSWORD</label>
                   <button type="button" onClick={() => {setMode('forgot'); setError(''); setMessage('');}} className="text-xs font-bold text-green-600 hover:text-green-700 transition">Forgot?</button>
                 </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-500 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0">
                {loading ? <span className="animate-pulse">Signing in...</span> : <><ArrowRight className="w-5 h-5" /> Sign In</>}
              </button>
            </form>
          )}

          {/* Forgot Password Mode */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-500 ml-1 tracking-wide">ACCOUNT EMAIL</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="you@example.com" />
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-slate-800/30 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70">
                {loading ? <span className="animate-pulse">Sending OTP...</span> : 'Send OTP'}
              </button>
              <button type="button" onClick={() => setMode('login')} className="w-full text-sm font-bold text-slate-500 hover:text-slate-700 transition">Back to Login</button>
            </form>
          )}

          {/* Verify OTP Mode */}
          {mode === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-500 ml-1 tracking-wide">ENTER OTP</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required type="text" maxLength="6" value={otp} onChange={e => setOtp(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none font-mono text-center tracking-[0.5em] text-lg" placeholder="123456" />
                </div>
              </div>
              <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70">
                {loading ? <span className="animate-pulse">Verifying...</span> : 'Verify Code'}
              </button>
            </form>
          )}

          {/* Reset Password Mode */}
          {mode === 'reset' && (
             <form onSubmit={handleResetPassword} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-1.5 group">
              <label className="text-sm font-bold text-slate-500 ml-1 tracking-wide">NEW PASSWORD</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input required type={showNewPassword ? "text" : "password"} minLength="6" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="••••••••" />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-500 transition-colors">
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70">
              {loading ? <span className="animate-pulse">Resetting...</span> : 'Set New Password'}
            </button>
          </form>
          )}

          {mode === 'login' && (
            <p className="text-center mt-8 text-slate-500 font-medium">
              Don't have an account? <Link to="/signup" className="text-green-600 font-bold hover:underline">Sign up</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
