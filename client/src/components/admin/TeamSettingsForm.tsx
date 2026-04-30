'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Type, 
  Layout, 
  Search, 
  Eye, 
  Save,
  Palette,
  Globe
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface TeamSettingsFormProps {
  settings: any;
  onClose: () => void;
  onSave: () => void;
}

const GOOGLE_FONTS = ["Poppins", "Inter", "Roboto", "Montserrat", "Outfit", "Plus Jakarta Sans"].sort();

export default function TeamSettingsForm({ settings, onClose, onSave }: TeamSettingsFormProps) {
  const [formData, setFormData] = useState(settings || {
    title: 'Our Team',
    subtitle: 'Meet the Experts Behind Europack',
    layout: 'grid',
    globalTypography: {
      title: { fontSize: '32px', fontWeight: '700', color: '#1e293b' },
      subtitle: { fontSize: '18px', fontWeight: '500', color: '#64748b' },
      memberName: { fontSize: '18px', fontWeight: '600', color: '#0f172a' },
      designation: { fontSize: '14px', fontWeight: '500', color: '#FF6600' },
      description: { fontSize: '14px', lineHeight: '1.6', color: '#475569' }
    },
    seo: {
      title: 'Europack Team - Experts in Packaging Solutions',
      description: 'Meet our experienced team with 30+ years in industrial packaging.',
      keywords: ['europack team', 'packaging experts', 'industrial engineering'],
      schema: {}
    },
    visible: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchAPI('/team/settings', {
        method: 'PATCH',
        body: JSON.stringify(formData)
      });
      if (res.success) {
        toast.success('Global settings updated');
        onSave();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateTypography = (field: string, prop: string, value: string) => {
    setFormData({
      ...formData,
      globalTypography: {
        ...formData.globalTypography,
        [field]: { ...formData.globalTypography[field], [prop]: value }
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-end">
      <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
               Architectural Tokens <Settings size={20} className="text-[#FF6600]" />
            </h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
               Global Team Styles & Performance
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
           {/* Section 1: Core Layout */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <Layout size={14} /> Structural DNA
              </h3>
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={() => setFormData({...formData, layout: 'grid'})}
                   className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-2 ${formData.layout === 'grid' ? 'bg-orange-50 border-[#FF6600] text-[#FF6600]' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                 >
                    <div className="grid grid-cols-2 gap-1 mb-1">
                       {[1,2,3,4].map(i => <div key={i} className={`w-2 h-2 rounded-sm ${formData.layout === 'grid' ? 'bg-[#FF6600]' : 'bg-slate-200'}`} />)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Technical Grid</span>
                 </button>
                 <button 
                    onClick={() => setFormData({...formData, layout: 'carousel'})}
                    className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-2 ${formData.layout === 'carousel' ? 'bg-orange-50 border-[#FF6600] text-[#FF6600]' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                 >
                    <div className="flex gap-1 items-center mb-1">
                       <div className={`w-1.5 h-1.5 rounded-full ${formData.layout === 'carousel' ? 'bg-[#FF6600]' : 'bg-slate-200'}`} />
                       <div className="w-8 h-3 rounded-full bg-slate-200 border border-slate-300" />
                       <div className={`w-1.5 h-1.5 rounded-full ${formData.layout === 'carousel' ? 'bg-[#FF6600]' : 'bg-slate-200'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Dynamic Slider</span>
                 </button>
              </div>
           </div>

           {/* Section 2: Global Typography */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <Type size={14} /> Typography Tokens
              </h3>
              
              {/* Member Name Style */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Card: Member Name</span>
                    <Type size={12} className="text-slate-300" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input className="admin-input !py-2 text-xs" placeholder="Font Size (e.g. 18px)" value={formData.globalTypography.memberName.fontSize} onChange={e => updateTypography('memberName', 'fontSize', e.target.value)} />
                    <input className="admin-input !py-2 text-xs" placeholder="Weight (e.g. 600)" value={formData.globalTypography.memberName.fontWeight} onChange={e => updateTypography('memberName', 'fontWeight', e.target.value)} />
                 </div>
              </div>

              {/* Designation Style */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Card: Designation</span>
                    <Palette size={12} className="text-slate-300" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input className="admin-input !py-2 text-xs" placeholder="Color (e.g. #FF6600)" value={formData.globalTypography.designation.color} onChange={e => updateTypography('designation', 'color', e.target.value)} />
                    <input className="admin-input !py-2 text-xs" placeholder="Font Size" value={formData.globalTypography.designation.fontSize} onChange={e => updateTypography('designation', 'fontSize', e.target.value)} />
                 </div>
              </div>
           </div>

           {/* Section 3: Technical SEO */}
           <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                 <Globe size={14} /> Technical SEO Architect
              </h3>
              <div className="space-y-4">
                 <div>
                    <label className="admin-label">Section Title (Meta)</label>
                    <input className="admin-input" value={formData.seo.title} onChange={e => setFormData({...formData, seo: {...formData.seo, title: e.target.value}})} />
                 </div>
                 <div>
                    <label className="admin-label">Meta Description</label>
                    <textarea className="admin-input" rows={3} value={formData.seo.description} onChange={e => setFormData({...formData, seo: {...formData.seo, description: e.target.value}})} />
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
           <button onClick={onClose} className="admin-btn-outline flex-1 py-4 text-xs font-black uppercase tracking-widest">Cancel</button>
           <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100 flex items-center justify-center gap-2">
              Commit Tokens <Save size={16} />
           </button>
        </div>
      </div>
    </div>
  );
}
