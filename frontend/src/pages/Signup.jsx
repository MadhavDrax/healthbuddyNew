import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, User, Mail, Lock, Activity, Scale, Ruler, Droplet, Globe, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '', email: '', password: '', age: '', weight: '', height: '', bloodGroup: 'O+', country: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
      setError('Password must contain only letters and numbers (alphanumeric). No special characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height)
      };
      await signup(payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        <div className="p-8 sm:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 shadow-xl shadow-green-500/30 mb-4 transition-transform hover:scale-105">
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Join HealthBuddy</h2>
            <p className="text-slate-500 mt-2 font-medium">Get personalized AI health insights today.</p>
          </div>
          
          {error && <div className="p-4 mb-6 text-red-600 border border-red-200 bg-red-50 rounded-xl text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 group">
                <label className="text-sm font-semibold text-slate-600 ml-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required name="userName" type="text" value={formData.userName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-sm font-semibold text-slate-600 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                  <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="john@example.com" />
                </div>
              </div>
            </div>

            <div className="space-y-1 group">
              <label className="text-sm font-semibold text-slate-600 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input required name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none" placeholder="••••••••" minLength="6" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-500 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Age</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                  <input required name="age" type="number" min="0" value={formData.age} onChange={handleChange} className="w-full pl-9 pr-2 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="Yrs" />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Weight (kg)</label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                  <input required name="weight" type="number" min="0" value={formData.weight} onChange={handleChange} className="w-full pl-9 pr-2 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="kg" />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                  <input required name="height" type="number" min="0" value={formData.height} onChange={handleChange} className="w-full pl-9 pr-2 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm" placeholder="cm" />
                </div>
              </div>
              <div className="space-y-1 group">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Blood</label>
                <div className="relative">
                  <Droplet className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-green-500" />
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full pl-8 pr-2 py-2 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm appearance-none">
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1 group">
              <label className="text-sm font-semibold text-slate-600 ml-1">Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                <input required name="country" type="text" value={formData.country} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. USA" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full flex items-center justify-center gap-2 mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
              {loading ? <span className="animate-pulse">Creating Profile...</span> : <><CheckCircle2 className="w-5 h-5" /> Let's Go</>}
            </button>
          </form>

          <p className="text-center mt-6 text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
