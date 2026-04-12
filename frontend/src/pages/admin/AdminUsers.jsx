import React, { useState, useEffect } from 'react';
import { getAdminUsers, updateUserStatus, deleteUser } from '../../services/api';
import UserAvatar from '../../components/common/UserAvatar';
import UpdateUserStatusModal from '../../components/admin/modals/UpdateUserStatusModal';
import ConfirmUserDeletionModal from '../../components/admin/modals/ConfirmUserDeletionModal';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Stats derived from dynamic data
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAdminUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load admin users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setIsStatusModalOpen(true);
  };

  const confirmToggleStatus = async (user, newStatus) => {
    try {
      await updateUserStatus(user._id, newStatus);
      setUsers(users.map(u => u._id === user._id ? { ...u, status: newStatus } : u));
      setIsStatusModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update user status');
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
      setIsDeleteModalOpen(false);
    } catch (error) {
       alert(error.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-500 pb-12">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1a2e25] tracking-tight">User Management</h1>
          <p className="text-sm text-[#446d5c] mt-2 font-medium">Oversee clinical staff, patients, and administrative access levels.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#edf6f0] hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all shadow-sm shadow-[#00a676]/5 text-sm">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#00a676] text-white font-bold rounded-xl shadow-lg shadow-[#00a676]/20 hover:scale-[1.02] active:scale-95 transition-all text-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Refresh List
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#edf6f0]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">TOTAL USERS</p>
          <h3 className="text-4xl font-extrabold text-[#1a2e25]">{totalUsers}</h3>
          <div className="flex items-center gap-1 mt-3 text-[#00a676] font-bold text-xs">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            Real-time feed
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#edf6f0]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ACTIVE NOW</p>
          <h3 className="text-4xl font-extrabold text-[#1a2e25]">{activeUsers}</h3>
          <div className="w-full h-1.5 bg-[#edf6f0] mt-4 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-[#00a676]"></div>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#00a676] p-6 rounded-2xl shadow-lg shadow-[#00a676]/20 flex justify-between items-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold">System Health Check</h4>
            <p className="text-white/90 text-sm mt-1 max-w-[280px]">All clinical nodes are operating within optimal latency parameters.</p>
            <button onClick={fetchUsers} className="mt-5 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white/30 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">sync</span>
              RUN DIAGNOSTICS & SYNC
            </button>
          </div>
          <span className="material-symbols-outlined text-[140px] absolute -right-6 -bottom-8 text-white/10 select-none">security</span>
        </div>
      </div>

      {/* User Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#edf6f0] overflow-hidden mb-8">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#edf6f0]">
                <th className="px-8 py-5 text-sm font-bold text-[#446d5c]">Name</th>
                <th className="px-6 py-5 text-sm font-bold text-[#446d5c]">Email</th>
                <th className="px-6 py-5 text-sm font-bold text-[#446d5c]">Status</th>
                <th className="px-6 py-5 text-sm font-bold text-[#446d5c]">Registered</th>
                <th className="px-8 py-5 text-right text-sm font-bold text-[#446d5c]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf6f0]/50">
              {isLoading ? (
                 <tr>
                    <td colSpan="5" className="text-center py-12">
                       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00a676] mx-auto mb-4"></div>
                       <p className="text-slate-500 font-medium">Fetching clinical nodes...</p>
                    </td>
                 </tr>
              ) : users.length === 0 ? (
                 <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-500 font-medium tracking-wide">
                       No users found in standard directory.
                    </td>
                 </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-[#f8fbfa] transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <UserAvatar name={user.userName || user.email} className="w-10 h-10 text-sm" />
                        <div>
                          <p className="font-bold text-[#1a2e25] text-sm">{user.userName || 'Unnamed User'}</p>
                          <p className="text-xs text-slate-500 font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Node</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#446d5c] font-medium">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.status === 'Active' ? (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#edf6f0] text-[#00a676] border border-[#00a676]/10 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00a676] mr-2"></span>
                            Active
                         </span>
                      ) : (
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2"></span>
                            Suspended
                         </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#446d5c]">
                       {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex flex-col md:flex-row items-center justify-end md:opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        <button 
                           onClick={() => handleToggleStatus(user)}
                           className={`p-2 rounded-xl transition-all font-bold text-xs flex gap-1 items-center shadow-sm w-full md:w-auto ${user.status === 'Active' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-[#edf6f0] text-[#00a676] hover:bg-[#c9ebd8]'}`} 
                           title={user.status === 'Active' ? 'Suspend Node' : 'Activate Node'}
                        >
                          <span className="material-symbols-outlined text-[16px]">{user.status === 'Active' ? 'block' : 'check_circle'}</span>
                        </button>
                        <button 
                           onClick={() => handleDeleteUser(user)}
                           className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm bg-red-50 w-full md:w-auto flex items-center justify-center gap-1"
                           title="Delete User"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Details */}
        {!isLoading && users.length > 0 && (
           <div className="px-8 py-5 border-t border-[#edf6f0] flex items-center justify-between bg-white">
             <p className="text-sm font-semibold text-slate-500">Showing {users.length} clinical nodes.</p>
           </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-[#f0f6ff] border border-[#dbeafe] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <span className="material-symbols-outlined">info</span>
           </div>
           <div>
             <h5 className="font-bold text-[#1e3a8a] text-sm">Data Retention Policy</h5>
             <p className="text-[#3b82f6] text-sm mt-1">Inactive accounts are automatically archived after 365 days of inactivity. You can change this setting in the System Preferences tab.</p>
           </div>
        </div>
        <button className="px-5 py-2.5 bg-white text-blue-600 font-bold text-sm rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm shadow-blue-500/5">
          Review Policy
        </button>
      </div>


      <UpdateUserStatusModal 
        isOpen={isStatusModalOpen} 
        onClose={() => setIsStatusModalOpen(false)} 
        user={selectedUser} 
        onConfirm={confirmToggleStatus} 
      />

      <ConfirmUserDeletionModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        user={selectedUser} 
        onConfirm={confirmDeleteUser} 
      />

    </div>
  );
};

export default AdminUsers;
