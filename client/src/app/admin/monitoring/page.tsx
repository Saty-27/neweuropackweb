'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, Search, Filter, Calendar, 
  ArrowRight, User, Shield, Zap, 
  Plus, Edit, Trash2, LogIn, LogOut, 
  Upload, Clock, Globe, Laptop, 
  ChevronLeft, ChevronRight, AlertCircle,
  Database, History as HistoryIcon
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivityMonitor() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    action: '',
    section: '',
    search: '',
    page: 1
  });
  const [totalLogs, setTotalLogs] = useState(0);
  const [limit] = useState(20);

  const [stats, setStats] = useState({
    activeUsers: 0,
    recentActions: 0
  });

  useEffect(() => {
    loadLogs();
    loadStats();
  }, [filter.action, filter.section, filter.page]);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const skip = (filter.page - 1) * limit;
      let url = `/monitoring?limit=${limit}&skip=${skip}`;
      if (filter.action) url += `&action=${filter.action}`;
      if (filter.section) url += `&section=${filter.section}`;
      
      const res = await fetchAPI(url);
      if (res.success) {
        setLogs(res.data);
        setTotalLogs(res.total);
      }
    } catch (error) {
      toast.error('Audit trail synchronization failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await fetchAPI('/monitoring/stats');
      if (res.success) setStats({
        activeUsers: res.activeUsers,
        recentActions: res.recentActions
      });
    } catch (error) {}
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return <Plus size={14} className="text-emerald-500" />;
      case 'update': return <Edit size={14} className="text-blue-500" />;
      case 'delete': return <Trash2 size={14} className="text-red-500" />;
      case 'login': return <LogIn size={14} className="text-[#FF6600]" />;
      case 'logout': return <LogOut size={14} className="text-slate-400" />;
      case 'upload': return <Upload size={14} className="text-purple-500" />;
      default: return <Activity size={14} className="text-slate-400" />;
    }
  };

  const getActionBadge = (action: string) => {
    const base = "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ";
    switch (action) {
      case 'create': return <span className={`${base} bg-emerald-50 text-emerald-600 border-emerald-100`}>Created</span>;
      case 'update': return <span className={`${base} bg-blue-50 text-blue-600 border-blue-100`}>Updated</span>;
      case 'delete': return <span className={`${base} bg-red-50 text-red-600 border-red-100`}>Deleted</span>;
      case 'login': return <span className={`${base} bg-orange-50 text-[#FF6600] border-orange-100`}>Login</span>;
      case 'upload': return <span className={`${base} bg-purple-50 text-purple-600 border-purple-100`}>Upload</span>;
      default: return <span className={`${base} bg-slate-50 text-slate-500 border-slate-100`}>{action}</span>;
    }
  };

  const totalPages = Math.ceil(totalLogs / limit);

  return (
    <div className="p-10 space-y-10 animate-in fade-in duration-700">
      {/* Monitoring Header Dash */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 Security Audit Trail
                 <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-2xl">
                    <HistoryIcon size={20} />
                 </div>
              </h1>
           </div>
           <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center gap-2">
              <Database size={14} className="text-[#FF6600]" /> Ecosystem 'Black Box' — Real-Time Transaction Auditing
           </p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white p-4 px-6 rounded-[32px] border border-slate-100 shadow-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Active Sec.</p>
                 <p className="text-lg font-black text-slate-900 leading-none">{stats.activeUsers}</p>
              </div>
           </div>
           <div className="bg-white p-4 px-6 rounded-[32px] border border-slate-100 shadow-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95">
              <Activity className="text-[#FF6600]" size={16} />
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">24h Flux</p>
                 <p className="text-lg font-black text-slate-900 leading-none">+{stats.recentActions}</p>
              </div>
           </div>
        </div>
      </div>

      {/* Filter Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
         <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" size={18} />
            <input 
               type="text" 
               placeholder="Search logs..." 
               className="admin-input pl-14 text-xs font-bold"
               value={filter.search}
               onChange={e => setFilter({...filter, search: e.target.value})}
            />
         </div>
         <select 
            className="admin-input text-xs font-bold" 
            value={filter.action}
            onChange={e => setFilter({...filter, action: e.target.value, page: 1})}
         >
            <option value="">All Actions</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="login">Login</option>
            <option value="upload">Upload</option>
         </select>
         <select 
            className="admin-input text-xs font-bold" 
            value={filter.section}
            onChange={e => setFilter({...filter, section: e.target.value, page: 1})}
         >
            <option value="">All Sections</option>
            <option value="products">Products</option>
            <option value="blogs">Blogs</option>
            <option value="caseStudies">Case Studies</option>
            <option value="users">Users</option>
            <option value="media">Media Hub</option>
         </select>
         <div className="flex gap-2">
            <button 
              onClick={() => { setFilter({ action: '', section: '', search: '', page: 1 }); }}
              className="admin-btn-outline w-full py-4 text-[10px] font-black uppercase tracking-widest"
            >
               Reset Audit
            </button>
         </div>
      </div>

      {/* Audit List Interface */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
         {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
               <Activity className="text-[#FF6600] animate-spin" size={48} />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Synchronizing Audit Records...</p>
            </div>
         ) : logs.length > 0 ? (
            <>
               <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Clearance</th>
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Action Matrix</th>
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Artifact Description</th>
                           <th className="p-8 pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Session Meta</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {logs.map((log, idx) => (
                           <tr key={log._id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="p-8">
                                 <div className="flex items-center gap-3">
                                    <Clock className="text-slate-300" size={14} />
                                    <span className="text-[11px] font-bold text-slate-500">
                                       {new Date(log.createdAt).toLocaleString()}
                                    </span>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
                                       <User size={18} />
                                    </div>
                                    <div>
                                       <p className="text-sm font-black text-slate-900 leading-none mb-1">{log.user?.name || 'Decommissioned User'}</p>
                                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.user?.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-2">
                                    <Shield size={12} className={log.user?.role === 'Super Admin' ? 'text-blue-500' : 'text-[#FF6600]'} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{log.user?.role || 'Guest'}</span>
                                 </div>
                              </td>
                              <td className="p-8">
                                 <div className="flex items-center gap-3">
                                    {getActionIcon(log.action)}
                                    {getActionBadge(log.action)}
                                 </div>
                              </td>
                              <td className="p-8 max-w-xs">
                                 <p className="text-[11px] font-bold text-slate-600 leading-relaxed uppercase tracking-widest">{log.description}</p>
                                 <span className="text-[9px] font-black text-slate-300 uppercase mt-1 block">Ref: {log.section} {log.itemId ? `| ID: ${log.itemId.slice(-6)}` : ''}</span>
                              </td>
                              <td className="p-8">
                                 <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 opacity-40">
                                       <Globe size={12} />
                                       <span className="text-[9px] font-black uppercase tracking-widest">{log.ipAddress || 'Internal'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-40">
                                       <Laptop size={12} />
                                       <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[100px]">{log.userAgent || 'API'}</span>
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Pagination Orchestration */}
               <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Displaying <span className="text-slate-900">{logs.length}</span> of <span className="text-slate-900">{totalLogs}</span> Transactions
                  </p>
                  <div className="flex gap-2">
                     <button 
                        disabled={filter.page === 1}
                        onClick={() => setFilter({...filter, page: filter.page - 1})}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-[#FF6600] disabled:opacity-30 disabled:hover:text-slate-400 flex items-center justify-center transition-all shadow-sm active:scale-95"
                     >
                        <ChevronLeft size={20} />
                     </button>
                     <div className="px-6 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-sm font-black text-slate-900 shadow-sm">
                        {filter.page} <span className="mx-2 text-slate-200">/</span> {totalPages || 1}
                     </div>
                     <button 
                        disabled={filter.page >= totalPages}
                        onClick={() => setFilter({...filter, page: filter.page + 1})}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-[#FF6600] disabled:opacity-30 disabled:hover:text-slate-400 flex items-center justify-center transition-all shadow-sm active:scale-95"
                     >
                        <ChevronRight size={20} />
                     </button>
                  </div>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-6">
               <AlertCircle className="text-slate-200" size={80} />
               <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">No Audit Anomalies Detected</h3>
                  <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mt-2">The 'Black Box' monitoring system is ready for transaction capture</p>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
