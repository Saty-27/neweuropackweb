'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Mail, 
  Link2 as Linkedin, 
  Target, 
  Briefcase, 
  User, 
  Type, 
  Settings,
  Eye,
  Type as FontIcon
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface TeamMemberFormProps {
  member?: any;
  onClose: () => void;
  onSave: () => void;
}

const GOOGLE_FONTS = ["Poppins", "Inter", "Roboto", "Montserrat", "Outfit", "Plus Jakarta Sans"].sort();

export default function TeamMemberForm({ member, onClose, onSave }: TeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    designation: member?.designation || '',
    shortTag: member?.shortTag || '',
    description: member?.description || '',
    image: member?.image || { url: '', alt: '' },
    contact: member?.contact || { email: '', linkedin: '' },
    department: member?.department || '',
    featured: member?.featured || false,
    visible: member?.visible !== false,
    style: member?.style || {
       name: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
       designation: { fontSize: '14px', fontWeight: '500', color: '#FF6600' },
       description: { fontSize: '14px', lineHeight: '1.6', color: '#475569' }
    }
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetchAPI('/upload?folder=team', {
        method: 'POST',
        body: fd
      });
      if (res.success) {
        setFormData({ ...formData, image: { ...formData.image, url: res.url } });
        toast.success('Member image updated');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = member ? `/team/${member._id}` : '/team';
      const method = member ? 'PATCH' : 'POST';
      const res = await fetchAPI(endpoint, {
        method,
        body: JSON.stringify(formData)
      });
      if (res.success) {
        toast.success(member ? 'Member updated' : 'Member added');
        onSave();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-end">
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
               Member Architect <span className="text-[10px] bg-[#FF6600] text-white px-2 py-0.5 rounded-full uppercase">v1.1</span>
            </h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               {member ? `Editing: ${member.name}` : 'Creating New Member Profile'}
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
           {/* Section 1: Identity */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <User size={14} /> Core Identity
              </h3>
              <div className="grid grid-cols-2 gap-8">
                 <div className="col-span-1 space-y-6">
                    <div 
                      className="aspect-square bg-slate-100 rounded-[32px] border-2 border-dashed border-slate-200 overflow-hidden relative cursor-pointer group hover:border-[#FF6600] transition-all"
                      onClick={() => document.getElementById('member-image')?.click()}
                    >
                       {formData.image.url ? (
                          <img src={getImageUrl(formData.image.url)} className="w-full h-full object-cover" alt="Member" />
                       ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                             <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Card: Member Name</span>
                    <Type size={12} className="text-slate-300" />
                 </div>
                          </div>
                       )}
                       {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#FF6600] border-t-transparent rounded-full animate-spin" /></div>}
                       <input id="member-image" type="file" className="hidden" onChange={handleImageUpload} />
                    </div>
                    <input 
                      className="admin-input text-xs italic" 
                      placeholder="Image Alt Text (SEO)" 
                      value={formData.image.alt} 
                      onChange={e => setFormData({...formData, image: {...formData.image, alt: e.target.value}})}
                    />
                 </div>

                 <div className="space-y-4">
                    <div>
                       <label className="admin-label">Full Name</label>
                       <input className="admin-input font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Rahul Sharma" />
                    </div>
                    <div>
                       <label className="admin-label">Designation</label>
                       <input className="admin-input" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="Packaging Engineer" />
                    </div>
                    <div>
                       <label className="admin-label">Short Tag (15+ Years...)</label>
                       <input className="admin-input" value={formData.shortTag} onChange={e => setFormData({...formData, shortTag: e.target.value})} placeholder="15+ Years Experience" />
                    </div>
                    <div>
                       <label className="admin-label">Department</label>
                       <input className="admin-input" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} placeholder="Operations" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Narrative */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <Briefcase size={14} /> Professional Narrative
              </h3>
              <textarea 
                className="admin-input min-h-[120px]" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                placeholder="Briefly describe their expert contribution to Europack..."
              />
           </div>

           {/* Section 3: Connectivity */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <Target size={14} /> Social Connectivity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input className="admin-input pl-12" value={formData.contact.email} onChange={e => setFormData({...formData, contact: {...formData.contact, email: e.target.value}})} placeholder="Email Address" />
                 </div>
                 <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input className="admin-input pl-12" value={formData.contact.linkedin} onChange={e => setFormData({...formData, contact: {...formData.contact, linkedin: e.target.value}})} placeholder="LinkedIn URL" />
                 </div>
              </div>
           </div>

           {/* Section 4: Typography overrides */}
           <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                 <FontIcon size={14} /> Per-Card Style Overrides
              </h3>
              <div className="grid grid-cols-3 gap-6">
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Name Size</label>
                    <input className="admin-input !py-1 text-xs" value={formData.style.name.fontSize} onChange={e => setFormData({...formData, style: {...formData.style, name: {...formData.style.name, fontSize: e.target.value}}})} />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Name Color</label>
                    <input type="color" className="w-full h-8 cursor-pointer rounded-lg border-none" value={formData.style.name.color} onChange={e => setFormData({...formData, style: {...formData.style, name: {...formData.style.name, color: e.target.value}}})} />
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Featured Profile?</label>
                    <button 
                      onClick={() => setFormData({...formData, featured: !formData.featured})}
                      className={`w-full h-10 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${formData.featured ? 'bg-orange-100 text-[#FF6600] border-2 border-[#FF6600]' : 'bg-white border-2 border-slate-200 text-slate-400'}`}
                    >
                       {formData.featured ? 'Featured CEO' : 'Standard'}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
           <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Discard Changes</button>
           <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">Publish Member Card</button>
        </div>
      </div>
    </div>
  );
}
