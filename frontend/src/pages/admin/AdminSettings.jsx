import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../../components/common/UserAvatar';

const AdminSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const fileInputRef = useRef(null);
  
  const [profileForm, setProfileForm] = useState({
    userName: user?.userName || '',
    email: user?.email || ''
  });
  
  const [securityForm, setSecurityForm] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true); setMessage(''); setError('');
      const updateData = { userName: profileForm.userName };
      await updateUserProfile(updateData);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return setError('Image must be less than 2MB');
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setLoading(true); setMessage(''); setError('');
        await updateUserProfile({ avatar: reader.result });
        setMessage('Profile picture updated!');
      } catch (err) {
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true); setMessage(''); setError('');
      if (!securityForm.oldPassword) return setError('Please enter your current password');
      if (securityForm.password !== securityForm.confirmPassword) return setError('Passwords do not match');
      if (securityForm.password.length < 6) return setError('New password must be at least 6 characters');

      await updateUserProfile({ 
        password: securityForm.password,
        oldPassword: securityForm.oldPassword 
      });
      setMessage('Password updated successfully.');
      setSecurityForm({ oldPassword: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 md:px-0 pb-12">
      <header className="mb-8 pt-4 md:pt-0 flex flex-col items-start gap-4">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className="px-2.5 py-1 bg-[#bbf7d0] text-[#166534] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#86efac]">
              CONFIGURATION
            </span>
            <div className="w-12 h-px bg-[#bbf7d0]"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a2e25] tracking-tight">Admin Settings</h1>
          <p className="text-sm text-[#446d5c] mt-2 font-medium">Manage your clinical sanctuary identity and security protocols.</p>
        </div>
        
        {(message || error) && (
          <div className={`w-full max-w-md px-4 py-3 rounded-xl border font-bold text-sm shadow-sm animate-in zoom-in-95 duration-300 ${error ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#e2f9f1] text-[#00a676] border-[#a7f3d0]'}`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">{error ? 'error' : 'check_circle'}</span>
              {error || message}
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Profile Management Card */}
          <div className="bg-[#f8fbfa] p-6 md:p-8 rounded-[24px] shadow-sm border border-[#edf6f0]">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-[#86efac] rounded-xl flex items-center justify-center text-[#14532d] shadow-sm shrink-0">
                 <span className="material-symbols-outlined">person</span>
               </div>
               <div>
                 <h2 className="text-lg md:text-xl font-bold text-[#1a2e25]">Profile Management</h2>
                 <p className="text-xs md:text-sm text-[#446d5c]">Your public identity within the HealthBuddy network.</p>
               </div>
             </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer" onClick={() => fileInputRef.current.click()}>
                         <span className="material-symbols-outlined text-white text-3xl">upload</span>
                      </div>
                      <UserAvatar 
                        name={user?.userName} 
                        avatar={user?.avatar} 
                        className="w-32 h-32 text-4xl border-4 border-white shadow-md bg-white" 
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#00a676] text-white rounded-full flex items-center justify-center border-4 border-[#f8fbfa] shadow-sm hover:scale-110 active:scale-95 transition-all z-20"
                      >
                        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-center text-slate-400 mt-4 max-w-[140px] font-medium leading-tight">Recommended: Square JPEG or PNG, max 2MB.</p>
                  </div>
                  
                  <div className="flex-1 space-y-5 w-full">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">FULL NAME</label>
                      <input 
                        type="text" 
                        value={profileForm.userName} 
                        onChange={(e) => setProfileForm({...profileForm, userName: e.target.value})} 
                        className="w-full bg-white border border-[#edf6f0] text-[#1a2e25] text-sm font-semibold px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        disabled 
                        value={profileForm.email} 
                        className="w-full bg-[#f1f5f9] border-none text-slate-500 text-sm font-semibold px-4 py-3 rounded-xl opacity-70 cursor-not-allowed"
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={handleProfileUpdate} 
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-[#00a676] text-white font-bold rounded-xl shadow-lg shadow-[#00a676]/20 hover:bg-[#008f65] active:scale-95 transition-all text-sm disabled:opacity-50"
                      >
                        {loading ? 'Updating...' : 'Update Profile'}
                      </button>
                    </div>
                  </div>
                </div>
          </div>

          {/* Security Card */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-[#edf6f0]">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 bg-[#bfdbfe] rounded-xl flex items-center justify-center text-[#1d4ed8] shadow-sm shrink-0">
                 <span className="material-symbols-outlined">lock</span>
               </div>
               <div>
                 <h2 className="text-lg md:text-xl font-bold text-[#1a2e25]">Security & Password</h2>
                 <p className="text-xs md:text-sm text-[#446d5c]">Update your credentials to maintain account security.</p>
               </div>
             </div>

             <div className="space-y-6">
               <div>
                 <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CURRENT PASSWORD</label>
                 <input 
                   type="password" 
                   placeholder="Enter current password" 
                   value={securityForm.oldPassword} 
                   onChange={(e) => setSecurityForm({...securityForm, oldPassword: e.target.value})} 
                   className="w-full bg-[#f8fbfa] border border-[#edf6f0] text-[#1a2e25] text-sm px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all"
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">NEW PASSWORD</label>
                   <input 
                     type="password" 
                     placeholder="New password" 
                     value={securityForm.password} 
                     onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})} 
                     className="w-full bg-[#f8fbfa] border border-[#edf6f0] text-[#1a2e25] text-sm px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all"
                   />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CONFIRM PASSWORD</label>
                   <input 
                     type="password" 
                     placeholder="Confirm password" 
                     value={securityForm.confirmPassword} 
                     onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})} 
                   className="w-full bg-[#f8fbfa] border border-[#edf6f0] text-[#1a2e25] text-sm px-4 py-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00a676]/20 outline-none transition-all"/>
                 </div>
               </div>

               <div className="pt-2">
                 <button 
                  onClick={handlePasswordUpdate} 
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-3 bg-[#00a676] text-white font-bold rounded-xl shadow-lg hover:bg-[#008f65] active:scale-95 transition-all text-sm disabled:opacity-50"
                 >
                   {loading ? 'Processing...' : 'Change Password'}
                 </button>
               </div>
             </div>
          </div>

        </div>

        {/* Right Column - Status */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Preferences Card */}
           <div className="bg-[#0b6d49] p-6 md:p-8 rounded-[24px] shadow-lg shadow-[#0b6d49]/20 text-white">
             <div className="flex items-center gap-3 mb-8">
               <span className="material-symbols-outlined text-[#86efac]">verified_user</span>
               <h3 className="text-lg font-bold">Preferences</h3>
             </div>

             <div className="space-y-6">
               <label className="flex items-start gap-4 cursor-pointer group">
                 <span className="material-symbols-outlined text-white/50 text-[20px] pt-0.5">mail</span>
                 <div className="flex-1 text-sm font-semibold">Weekly analytics report</div>
                 <div className="w-5 h-5 rounded border-2 border-[#86efac] flex items-center justify-center bg-[#00a676]">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                 </div>
               </label>
               
               <label className="flex items-start gap-4 cursor-pointer group">
                 <span className="material-symbols-outlined text-white/50 text-[20px] pt-0.5">campaign</span>
                 <div className="flex-1 text-sm font-semibold">High-priority alerts</div>
                 <div className="w-5 h-5 rounded border-2 border-[#86efac] flex items-center justify-center bg-[#00a676]">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                 </div>
               </label>
             </div>
           </div>

           {/* Account Status Card */}
           <div className="bg-[#e4ece7] p-6 md:p-8 rounded-[24px] shadow-inner">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">ACCOUNT STATUS</p>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1a2e25]">Access Level</span>
                  <span className="px-2.5 py-1 bg-[#6ee7b7] text-[#065f46] text-[10px] font-extrabold rounded-full uppercase tracking-wider">FULL ADMIN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1a2e25]">Role</span>
                  <span className="text-sm font-extrabold text-[#004e38] uppercase tracking-tight">{user?.role}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#d1dfd6] gap-3 flex items-start">
                 <span className="material-symbols-outlined text-[16px] text-slate-500 pt-0.5">security</span>
                 <p className="text-[11px] text-slate-600 font-medium leading-relaxed">This account has administrative privileges. Keep your credentials confidential.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
