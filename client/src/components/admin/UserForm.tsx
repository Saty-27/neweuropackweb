'use client';

import React, { useState } from 'react';
import { 
  X, Check, Shield, User, Mail, Lock, 
  Settings, Save, AlertCircle, Eye, 
  Plus, Edit, Trash2, Globe, Layout, 
  Video, FileText, Package, Briefcase, 
  Layers, MessageSquare, Tag, Zap,
  CheckSquare, History as HistoryIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface UserFormProps {
  user?: any;
  onClose: () => void;
  onSave: () => void;
}

const Target = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const SECTIONS = [
  { id: 'products', label: 'Industrial Products', icon: <Package size={16}/> },
  { id: 'blogs', label: 'Technical Blogs', icon: <FileText size={16}/> },
  { id: 'gallery', label: 'Visual Gallery', icon: <Layout size={16}/> },
  { id: 'media', label: 'Media Hub', icon: <Video size={16}/> },
  { id: 'caseStudies', label: 'Case Studies', icon: <Briefcase size={16}/> },
  { id: 'industries', label: 'Industry Sectors', icon: <Globe size={16}/> },
  { id: 'services', label: 'Industrial Services', icon: <Zap size={16}/> },
  { id: 'team', label: 'Team Experts', icon: <User size={16}/> },
  { id: 'faqs', label: 'FAQ Manager', icon: <MessageSquare size={16}/> },
  { id: 'enquiries', label: 'B2B Enquiries', icon: <Mail size={16}/> },
  { id: 'quotes', label: 'Quote Matrix', icon: <Tag size={16}/> },
  { id: 'leads', label: 'Lead CRM', icon: <Target size={16} className="text-emerald-500" /> },
  { id: 'settings', label: 'System Settings', icon: <Settings size={16}/> }
];

export default function UserForm({ user, onClose, onSave }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'Viewer',
    permissions: user?.permissions || SECTIONS.reduce((acc: any, sec) => {
      acc[sec.id] = { view: true, create: false, edit: false, delete: false };
      return acc;
    }, {}),
    status: user?.status || 'active'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role: string) => {
    // Preset permissions based on role for faster provisioning
    let newPermissions = { ...formData.permissions };
    
    if (role === 'Viewer') {
      Object.keys(newPermissions).forEach(key => {
        newPermissions[key] = { view: true, create: false, edit: false, delete: false };
      });
    } else if (role === 'Editor') {
      Object.keys(newPermissions).forEach(key => {
        const isSettings = key === 'settings';
        newPermissions[key] = { view: true, create: !isSettings, edit: !isSettings, delete: false };
      });
    } else if (role === 'Admin') {
      Object.keys(newPermissions).forEach(key => {
        newPermissions[key] = { view: true, create: true, edit: true, delete: key !== 'settings' };
      });
    } else if (role === 'Super Admin') {
      Object.keys(newPermissions).forEach(key => {
        newPermissions[key] = { view: true, create: true, edit: true, delete: true };
      });
    }

    setFormData({ ...formData, role, permissions: newPermissions });
  };

  const togglePermission = (section: string, action: string) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [section]: {
          ...formData.permissions[section],
          [action]: !formData.permissions[section][action]
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { fetchAPI } = await import('../../lib/api');
      const endpoint = user ? `/users/${user._id}/update` : '/users/create';
      const method = user ? 'PATCH' : 'POST';

      const res = await fetchAPI(endpoint, {
        method,
        body: JSON.stringify(formData)
      });

      if (res.success) {
        toast.success(user ? 'Identity Refined' : 'Identity Architected');
        onSave();
        onClose();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-[48px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Identity Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-2xl">
              <HistoryIcon size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {user ? 'Refine Identity' : 'Architect Identity'}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Team Clearance Management</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center shadow-sm active:scale-95">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
          {/* Core Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                <User size={14}/> Primary Artifacts
              </h3>
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-colors" size={18}/>
                    <input 
                      className="admin-input font-bold text-sm transition-all" 
                      style={{ paddingLeft: '3.75rem' }}
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      placeholder="Dhanik Chheda"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Industrial Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-colors" size={18}/>
                    <input 
                      className="admin-input font-bold text-sm transition-all" 
                      style={{ paddingLeft: '3.75rem' }}
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      placeholder="dhanik@europack.in"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">{user ? 'Reset Password (Optional)' : 'Security Credential'}</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-colors" size={18}/>
                    <input 
                      type="password"
                      className="admin-input font-bold text-sm transition-all" 
                      style={{ paddingLeft: '3.75rem' }}
                      value={formData.password} 
                      onChange={e => setFormData({...formData, password: e.target.value})} 
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                <Shield size={14}/> Clearance Tier
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {['Viewer', 'Editor', 'Admin', 'Super Admin'].map(role => (
                   <button 
                     key={role}
                     onClick={() => handleRoleChange(role)}
                     className={`p-6 rounded-[32px] border-2 text-left transition-all ${formData.role === role ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-200' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                   >
                     <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Tier {role === 'Super Admin' ? 1 : 2}</p>
                     <p className="font-black text-sm tracking-tight">{role}</p>
                   </button>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                 <AlertCircle className="text-blue-500 shrink-0" size={20}/>
                 <p className="text-[10px] font-bold text-blue-900 leading-relaxed uppercase tracking-widest">
                    Clearance tiers provide automated permission bootstrapping. You can manually refine the matrix below.
                 </p>
              </div>
            </div>
          </div>

          {/* Permission Matrix Area */}
          <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6600] flex items-center gap-2">
                <Layout size={14}/> Permission Matrix Orchestration
              </h3>
              <div className="flex items-center gap-6">
                {['view', 'create', 'edit', 'delete'].map(action => (
                   <div key={action} className="flex items-center gap-2 opacity-50">
                      <div className="w-3 h-3 rounded bg-slate-200 border border-slate-300"/>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{action}</span>
                   </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-[48px] p-10 border border-slate-100 shadow-inner">
               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                 {SECTIONS.map(section => (
                   <div key={section.id} className="bg-white p-6 rounded-[32px] border border-white shadow-sm flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#FF6600] group-hover:text-white transition-all flex items-center justify-center">
                          {section.icon}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-tighter text-slate-900">{section.label}</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2">
                        {['view', 'create', 'edit', 'delete'].map(action => (
                          <button 
                            key={action}
                            title={action.toUpperCase()}
                            onClick={() => togglePermission(section.id, action)}
                            className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                              formData.permissions[section.id]?.[action] 
                                ? 'bg-[#FF6600] text-white shadow-lg shadow-orange-100' 
                                : 'bg-slate-50 text-slate-200 border border-slate-100 hover:border-slate-300'
                            }`}
                          >
                             {action === 'view' && <Eye size={14}/>}
                             {action === 'create' && <Plus size={14}/>}
                             {action === 'edit' && <Edit size={14}/>}
                             {action === 'delete' && <Trash2 size={14}/>}
                          </button>
                        ))}
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Footer Orchestration */}
        <div className="p-8 border-t border-slate-100 bg-white flex gap-4">
           <button onClick={onClose} className="admin-btn-outline flex-1 py-5">Discard Identity</button>
           <button 
             onClick={handleSubmit} 
             disabled={isLoading}
             className="admin-btn-primary flex-[2] py-5 shadow-xl shadow-orange-100 disabled:opacity-50"
           >
              {isLoading ? 'Synchronizing ecosystem...' : 'Commit Identity to Architecture'}
           </button>
        </div>
      </div>
    </div>
  );
}
