import { useState, useEffect } from 'react';
import { User, Save, Edit2, Check, X, Activity, Droplet, Ruler, Calendar, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createUser, updateUser } from '../services/api';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

function Profile() {
  const { user, sessionId, createUserProfile, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    age: '',
    weight: '',
    height: '',
    bloodGroup: '',
    country: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || '',
        age: user.age || '',
        weight: user.weight || '',
        height: user.height || '',
        bloodGroup: user.bloodGroup || '',
        country: user.country || '',
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Name is required';
    if (!formData.age || formData.age < 1 || formData.age > 150) newErrors.age = 'Valid age is required';
    if (!formData.weight || formData.weight < 1) newErrors.weight = 'Valid weight is required';
    if (!formData.height || formData.height < 1) newErrors.height = 'Valid height is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      if (user && user._id) {
        await updateUser(user._id, formData);
      } else {
        await createUserProfile(formData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <User className="w-4 h-4" />
          Your Profile
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Health Profile
        </h1>
        <p className="text-slate-600">
          Manage your personal health information for personalized recommendations
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user?.userName || 'Create Your Profile'}
                </h2>
                <p className="text-purple-100 text-sm">
                  {user ? 'Profile Complete' : 'Get started by creating your profile'}
                </p>
              </div>
            </div>
            {!user && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            )}
            {user && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                {isEditing ? <X className="w-5 h-5 text-white" /> : <Edit2 className="w-5 h-5 text-white" />}
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {isEditing || !user ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  {errors.submit}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    disabled={!isEditing && user}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${errors.userName ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                    placeholder="Enter your name"
                  />
                </div>
                {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={!isEditing && user}
                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.age ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                    placeholder="25"
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing && user}
                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.country ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                    placeholder="Your country"
                  />
                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Activity className="inline w-4 h-4 mr-1" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    disabled={!isEditing && user}
                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.weight ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                    placeholder="70"
                  />
                  {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Ruler className="inline w-4 h-4 mr-1" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    disabled={!isEditing && user}
                    className={`w-full px-4 py-3 bg-slate-50 border ${errors.height ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                    placeholder="175"
                  />
                  {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Droplet className="inline w-4 h-4 mr-1" />
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing && user}
                  className={`w-full px-4 py-3 bg-slate-50 border ${errors.bloodGroup ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-slate-100`}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
                {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>}
              </div>

              {(isEditing || !user) && (
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 transition-all duration-200"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                  {user && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          userName: user.userName || '',
                          age: user.age || '',
                          weight: user.weight || '',
                          height: user.height || '',
                          bloodGroup: user.bloodGroup || '',
                          country: user.country || '',
                        });
                        setErrors({});
                      }}
                      className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Age</p>
                  <p className="text-lg font-semibold text-slate-900">{user.age} years</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Blood Group</p>
                  <p className="text-lg font-semibold text-slate-900">{user.bloodGroup}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Weight</p>
                  <p className="text-lg font-semibold text-slate-900">{user.weight} kg</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Height</p>
                  <p className="text-lg font-semibold text-slate-900">{user.height} cm</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">Country</p>
                <p className="text-lg font-semibold text-slate-900">{user.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session Info */}
      {user && (
        <div className="bg-slate-100 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-500">
            Session ID: <code className="bg-slate-200 px-2 py-1 rounded text-xs">{sessionId}</code>
          </p>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center justify-center gap-2 mx-auto text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Clear Profile & Logout
          </button>
        </div>
      )}

      {/* Info Box */}
      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Why create a profile?</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Get personalized health recommendations</li>
                <li>• Track your health journey over time</li>
                <li>• Save your chat history</li>
                <li>• Receive tailored wellness tips</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Info icon component
const Info = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Profile;
