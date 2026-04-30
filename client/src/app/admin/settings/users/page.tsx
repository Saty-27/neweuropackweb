'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, User, Shield, Mail, 
  Trash2, Edit3, Eye, EyeOff, 
  ChevronRight, ArrowUpRight, 
  Settings, Key, History, Activity,
  Clock, ShieldCheck, ShieldAlert,
  UserPlus
} from 'lucide-react';
import { fetchAPI } from '../../../../lib/api';
import { toast } from 'react-hot-toast';
import UserForm from '../../../../components/admin/UserForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAPI('/users');
      if (res.success) setUsers(res.data);
    } catch (error) {
      toast.error('Failed to load team artifacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetchAPI(`/users/${id}/toggle-status`, { method: 'PATCH' });
      if (res.success) {
        toast.success('Identity status toggled');
        loadUsers();
      }
    } catch (error) {
      toast.error('Status synchronization failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to decommission user identity: ${name}?`)) return;
    try {
      const res = await fetchAPI(`/users/${id}/remove`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Identity removed from ecosystem');
        loadUsers();
      }
    } catch (error) {
      toast.error('Decommissioning failed');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      {/* Dynamic Header Deck */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 Team Manager
                 <div className="w-10 h-10 rounded-2xl bg-[#FF6600]/10 text-[#FF6600] flex items-center justify-center shadow-lg shadow-orange-100">
                    <Shield size={20} />
                 </div>
              </h1>
              <span className="text-[10px] bg-emerald-500 text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-emerald-100 animate-pulse">
                Live Ecosystem
              </span>
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Key size={14} className="text-[#FF6600]" /> Role-Based Access Control Architecture — {users.length} Active Identities
           </p>
        </div>

        <button 
          onClick={() => { setSelectedUser(null); setIsFormOpen(true); }}
          className="admin-btn-primary flex items-center gap-3 py-4 px-8 shadow-2xl shadow-orange-100 group"
        >
          <UserPlus size={18}/> Architect New Identity
        </button>
      </div>

      {/* Global Search Interface */}
      <div className="relative group max-w-2xl">
         <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" size={20} />
         <input 
            type="text" 
            placeholder="Search team by identity, email, or clearance tier..." 
            className="w-full bg-white border border-slate-100 p-6 pl-16 rounded-[32px] text-sm font-bold text-slate-900 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#FF6600] outline-none transition-all placeholder:text-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>

      {/* Team Identity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <AnimatePresence>
            {filteredUsers.map((user, idx) => (
               <motion.div 
                 key={user._id}
                 layout
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ delay: idx * 0.05 }}
                 className={`group p-8 rounded-[48px] border border-white bg-white shadow-xl hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 relative overflow-hidden ${user.status === 'inactive' ? 'opacity-60 grayscale' : ''}`}
               >
                  <div className="absolute top-0 right-0 p-8">
                     <div className={`w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-slate-300'}`} />
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-[28px] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-700 shadow-inner group-hover:rotate-12">
                           <User size={32} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1">{user.name}</h3>
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <ShieldCheck size={12} className={user.role === 'Super Admin' ? 'text-blue-500' : 'text-[#FF6600]'} />
                             {user.role}
                           </div>
                        </div>
                     </div>

                     <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center gap-4 group-hover:bg-white transition-all">
                        <Mail className="text-[#FF6600]" size={16} />
                        <span className="text-[11px] font-bold text-slate-600 truncate">{user.email}</span>
                     </div>

                     <div className="flex justify-between items-center bg-slate-950/5 p-4 rounded-[24px]">
                        <div className="flex items-center gap-2 ml-2">
                           <Clock className="text-slate-300" size={14} />
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none pt-0.5">
                              {user.lastLogin ? `Last Login: ${new Date(user.lastLogin).toLocaleDateString()}` : 'Never Authenticated'}
                           </span>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             onClick={() => { setSelectedUser(user); setIsFormOpen(true); }}
                             className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-[#FF6600] hover:border-[#FF6600] flex items-center justify-center transition-all shadow-sm active:scale-90"
                           >
                              <Edit3 size={16} />
                           </button>
                           <button 
                             onClick={() => handleToggleStatus(user._id)}
                             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90 ${user.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400 hover:bg-emerald-500 hover:text-white'}`}
                           >
                              {user.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                           </button>
                           <button 
                             onClick={() => handleDelete(user._id, user.name)}
                             className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-500 flex items-center justify-center transition-all shadow-sm active:scale-90"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>

         {filteredUsers.length === 0 && !isLoading && (
            <div className="col-span-full py-32 text-center bg-slate-50 rounded-[64px] border-4 border-dashed border-slate-200">
               <ShieldAlert className="mx-auto text-slate-200 mb-6" size={80} />
               <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">No Identities Found</h3>
               <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mt-2">Adjust search terms or architect new personnel Clearance</p>
            </div>
         )}
      </div>

      {/* Identity Architect Modal */}
      {isFormOpen && (
        <UserForm 
          user={selectedUser} 
          onClose={() => setIsFormOpen(false)} 
          onSave={loadUsers} 
        />
      )}
    </div>
  );
}
