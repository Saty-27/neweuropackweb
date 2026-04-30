'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  RefreshCcw,
  MessageSquare,
  Zap,
  MoreVertical,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadManager() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const endpoint = `/enquiry?${statusFilter ? `status=${statusFilter}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}`;
      const res = await fetchAPI(endpoint);
      if (res.success) setEnquiries(res.data);
    } catch (error) {
      toast.error('Failed to load enquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetchAPI(`/enquiry/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      if (res.success) {
        toast.success(`Leads status: ${status}`);
        loadEnquiries();
      }
    } catch (error) {
      toast.error('Status update failed');
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to remove this lead?')) return;
    try {
      const res = await fetchAPI(`/enquiry/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Lead removed');
        loadEnquiries();
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const statusColors: any = {
    'New': 'bg-blue-50 text-blue-600 border-blue-100',
    'Contacted': 'bg-amber-50 text-amber-600 border-amber-100',
    'Converted': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Lost': 'bg-red-50 text-red-600 border-red-100'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Lead Management <Users className="text-[#FF6600]" size={36} />
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
             Industrial CRM Lite <span className="w-8 h-[2px] bg-slate-200" /> {enquiries.length} Prospects Captured
          </p>
        </div>
      </div>

      {/* Control Hub */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input 
             className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6600]/20 transition-all"
             placeholder="Search by name, email, location or phone..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && loadEnquiries()}
           />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
           {['', 'New', 'Contacted', 'Converted', 'Lost'].map((s) => (
              <button 
                key={s} 
                onClick={() => setStatusFilter(s)}
                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${statusFilter === s ? 'bg-[#FF6600] text-white shadow-xl shadow-orange-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
              >
                 {s || 'All Leads'}
              </button>
           ))}
        </div>
      </div>

      {/* Leads Deck */}
      <div className="space-y-4">
        {isLoading ? (
          [1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-3xl animate-pulse" />)
        ) : enquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[48px] border-4 border-dashed border-slate-100">
             <MessageSquare size={48} className="text-slate-200 mb-4" />
             <h3 className="text-xl font-black text-slate-900 uppercase">No Prospects Found</h3>
          </div>
        ) : (
          <AnimatePresence>
             {enquiries.map((lead, index) => (
               <motion.div 
                 key={lead._id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: index * 0.05 }}
                 className="group bg-white rounded-3xl border border-slate-100 p-6 flex flex-col lg:flex-row items-center gap-8 hover:shadow-xl hover:shadow-orange-100/30 transition-all"
               >
                  {/* Avatar/ID Initial */}
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#FF6600] font-black text-xl border-2 border-slate-100 shrink-0 uppercase">
                     {lead.name.charAt(0)}
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                     <div className="flex flex-col mb-2">
                        <div className="flex items-center gap-3">
                           <h3 className="text-xl font-black text-slate-900 truncate">{lead.name}</h3>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[lead.status]}`}>
                              {lead.status}
                           </span>
                        </div>
                        {lead.company && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.company}</p>}
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           <Mail size={14} className="text-slate-300" /> {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           <Phone size={14} className="text-slate-300" /> {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           <MapPin size={14} className="text-slate-300" /> {lead.location}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-[#FF6600] uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-lg w-fit">
                           <Zap size={14} /> {lead.service}
                        </div>
                     </div>
                     {lead.message && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                              <MessageSquare size={12} /> Blueprint Requirements
                           </p>
                           <p className="text-sm font-medium text-slate-600 line-clamp-2 italic">"{lead.message}"</p>
                        </div>
                     )}
                  </div>

                  {/* Actions Hub */}
                  <div className="flex items-center gap-3 border-l border-slate-100 pl-8 shrink-0">
                     <a href={`tel:${lead.phone}`} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#FF6600] hover:text-white transition-all shadow-sm">
                        <Phone size={18} />
                     </a>
                     <a href={`mailto:${lead.email}`} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Mail size={18} />
                     </a>

                     {/* Status Control */}
                     <div className="relative group/status ml-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:border-[#FF6600] transition-all">
                           Update Status <RefreshCcw size={14} />
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-20 overflow-hidden">
                           {['New', 'Contacted', 'Converted', 'Lost'].map((s) => (
                              <button 
                                key={s} 
                                onClick={() => updateStatus(lead._id, s)}
                                className={`w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 flex items-center justify-between ${lead.status === s ? 'text-[#FF6600]' : 'text-slate-400'}`}
                              >
                                 {s}
                                 {lead.status === s && <CheckCircle2 size={14} />}
                              </button>
                           ))}
                        </div>
                     </div>

                     <button onClick={() => deleteLead(lead._id)} className="w-10 h-10 flex items-center justify-center text-slate-200 hover:text-red-500 transition-all ml-2">
                        <Trash2 size={18} />
                     </button>
                  </div>
               </motion.div>
             ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
