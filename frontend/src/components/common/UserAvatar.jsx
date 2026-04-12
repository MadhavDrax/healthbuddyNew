import React from 'react';

const colors = [
  'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-500', 
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
  'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
  'bg-pink-500', 'bg-rose-500'
];

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColorClass = (name) => {
  if (!name) return 'bg-slate-400';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

/**
 * UserAvatar
 * @param {string} name - Full name of the user
 * @param {string} className - Optional tailwind classes for sizing (e.g. w-10 h-10 text-sm)
 */
const UserAvatar = ({ name, avatar, className = "w-10 h-10 text-sm", showStatus, status }) => {
  const initials = getInitials(name);
  const colorClass = getColorClass(name);

  return (
    <div className={`relative shrink-0 rounded-full flex items-center justify-center text-white font-bold tracking-wider shadow-sm border border-white/20 ${!avatar ? colorClass : 'bg-slate-100'} ${className} overflow-hidden`}>
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
      {showStatus && status && (
        <div className={`absolute bottom-0 right-0 w-[25%] h-[25%] min-w-2.5 min-h-2.5 rounded-full border-2 border-white ${status === 'Active' ? 'bg-[#00a676]' : status === 'Suspended' ? 'bg-red-500' : 'bg-slate-400'}`}></div>
      )}
    </div>
  );
};

export default UserAvatar;
