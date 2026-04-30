'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  Users, 
  Search, 
  GripVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  ChevronUp,
  ChevronDown,
  LayoutGrid,
  SquareArrowOutUpRight
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import TeamMemberForm from '../../../components/admin/TeamMemberForm';
import TeamSettingsForm from '../../../components/admin/TeamSettingsForm';
import { motion, Reorder, AnimatePresence } from 'framer-motion';

export default function TeamManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [isSettingsFormOpen, setIsSettingsFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [membersRes, settingsRes] = await Promise.all([
        fetchAPI('/team?admin=true'),
        fetchAPI('/team/settings')
      ]);
      if (membersRes.success) setMembers(membersRes.data);
      if (settingsRes.success) setSettings(settingsRes.data);
    } catch (error) {
      toast.error('Failed to load team architect data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorder = async (newOrder: any[]) => {
    setMembers(newOrder);
    try {
      await fetchAPI('/team/reorder', {
        method: 'PATCH',
        body: JSON.stringify({ memberIds: newOrder.map(m => m._id) })
      });
    } catch (error) {
      toast.error('Failed to save order');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      const res = await fetchAPI(`/team/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Member removed');
        loadData();
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const toggleVisibility = async (member: any) => {
    try {
      const res = await fetchAPI(`/team/${member._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ visible: !member.visible })
      });
      if (res.success) loadData();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Team Architect <Users className="text-[#FF6600]" size={36} />
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
             Industrial Brand Deck <span className="w-8 h-[2px] bg-slate-200" /> {members.length} Active Profiles
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSettingsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:border-[#FF6600] hover:text-[#FF6600] transition-all shadow-sm"
          >
             <Settings size={16} /> Global Tokens
          </button>
          <button 
            onClick={() => { setSelectedMember(null); setIsMemberFormOpen(true); }}
            className="flex items-center gap-2 px-8 py-4 bg-[#FF6600] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all"
          >
             <Plus size={16} /> New Member Card
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input 
             className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6600]/20 transition-all"
             placeholder="Search by name, role or department..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
        </div>
        <div className="flex items-center gap-2 px-4 border-l border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           Layout: <span className="text-[#FF6600] bg-orange-50 px-2 py-1 rounded ml-1">{settings?.layout || 'Grid'}</span>
        </div>
      </div>

      {/* Member Deck */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-[400px] bg-slate-100 rounded-[48px]" />)}
          </div>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[64px] border-4 border-dashed border-slate-100">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                <Users size={48} />
             </div>
             <h3 className="text-xl font-black text-slate-900">The Deck is Empty</h3>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Start by adding your first team expert</p>
          </div>
        ) : (
          <Reorder.Group 
            axis="y" 
            values={members} 
            onReorder={handleReorder}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
               {filteredMembers.map((member) => (
                 <Reorder.Item 
                   key={member._id} 
                   value={member}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   whileDrag={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", zIndex: 100 }}
                   className="group relative bg-white rounded-[48px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full cursor-grab active:cursor-grabbing"
                 >
                    {/* Visual Card Top */}
                    <div className="aspect-[4/5] relative overflow-hidden m-4 rounded-[36px]">
                       <img 
                          src={getImageUrl(member.image.url)} 
                          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${!member.visible ? 'grayscale opacity-40' : ''}`} 
                          alt={member.name} 
                       />
                       
                       {/* Visibility Overlay */}
                       {!member.visible && (
                          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
                             <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                                <EyeOff size={12} /> Hidden From Public
                             </div>
                          </div>
                       )}

                       {/* Controls Overlay (Hover Only) */}
                       <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            onClick={() => { setSelectedMember(member); setIsMemberFormOpen(true); }}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-[#FF6600] hover:text-white transition-all transform hover:rotate-6"
                          >
                             <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => toggleVisibility(member)}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-900 hover:text-white transition-all transform hover:-rotate-6"
                          >
                             {member.visible ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button 
                            onClick={() => handleDeleteMember(member._id)}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-xl hover:bg-red-500 hover:text-white transition-all"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>

                       {/* Featured Tag */}
                       {member.featured && (
                          <div className="absolute top-4 left-4">
                             <div className="w-10 h-10 bg-[#FF6600] rounded-2xl flex items-center justify-center text-white shadow-xl animate-bounce">
                                <Star fill="currentColor" size={18} />
                             </div>
                          </div>
                       )}
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pb-8 flex-1 flex flex-col">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">
                             {member.department || 'OFFICE'}
                          </span>
                          <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest truncate max-w-[100px]">
                             {member.shortTag || 'ESTABLISHED MEMBER'}
                          </span>
                       </div>
                       <h3 
                          className="font-black text-slate-900 mb-1" 
                          style={{ fontSize: member.style?.name?.fontSize || settings?.globalTypography?.memberName?.fontSize || '20px' }}
                       >
                          {member.name}
                       </h3>
                       <p 
                          className="font-bold mb-4" 
                          style={{ 
                             fontSize: member.style?.designation?.fontSize || settings?.globalTypography?.designation?.fontSize || '14px',
                             color: member.style?.designation?.color || settings?.globalTypography?.designation?.color || '#FF6600'
                          }}
                       >
                          {member.designation}
                       </p>
                       
                       <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3 mb-6 flex-1 italic">
                          "{member.description || 'Dedicated to delivering industrial excellence at Europack.'}"
                       </p>

                       <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex gap-2">
                             <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                                <SquareArrowOutUpRight size={14} />
                             </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1">
                                <GripVertical size={14} className="text-slate-200" /> Handle To Move
                             </div>
                          </div>
                       </div>
                    </div>
                 </Reorder.Item>
               ))}
            </AnimatePresence>
          </Reorder.Group>
        )}
      </div>

      {/* Modals */}
      {isMemberFormOpen && (
        <TeamMemberForm 
           member={selectedMember} 
           onClose={() => { setIsMemberFormOpen(false); setSelectedMember(null); }} 
           onSave={() => { setIsMemberFormOpen(false); loadData(); }} 
        />
      )}
      {isSettingsFormOpen && (
        <TeamSettingsForm 
           settings={settings} 
           onClose={() => setIsSettingsFormOpen(false)} 
           onSave={() => { setIsSettingsFormOpen(false); loadData(); }} 
        />
      )}
    </div>
  );
}
