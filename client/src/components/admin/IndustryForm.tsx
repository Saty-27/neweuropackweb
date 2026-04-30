'use client';

import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Plus, 
  Settings, 
  Layout, 
  Eye, 
  Target,
  Zap,
  FileText,
  MousePointer2,
  List
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface IndustryFormProps {
  industry?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function IndustryForm({ industry, onClose, onSave }: IndustryFormProps) {
  const [formData, setFormData] = useState({
    title: industry?.title || '',
    slug: industry?.slug || '',
    description: industry?.description || '',
    image: industry?.image || { url: '', alt: '' },
    points: industry?.points || [],
    specs: industry?.specs || [],
    visible: industry?.visible !== false,
    order: industry?.order || 0
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetchAPI('/upload?folder=industries', {
        method: 'POST',
        body: fd
      });
      if (res.success) {
        setFormData({ ...formData, image: { ...formData.image, url: res.url } });
        toast.success('Industry visual updated');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const addPoint = () => setFormData({ ...formData, points: [...formData.points, ''] });
  const updatePoint = (i: number, val: string) => {
    const newPoints = [...formData.points];
    newPoints[i] = val;
    setFormData({ ...formData, points: newPoints });
  };
  const removePoint = (i: number) => setFormData({ ...formData, points: formData.points.filter((_: string, idx: number) => idx !== i) });

  const addSpec = () => setFormData({ ...formData, specs: [...formData.specs, { key: '', value: '' }] });
  const updateSpec = (i: number, field: 'key' | 'value', val: string) => {
    const newSpecs = [...formData.specs];
    newSpecs[i][field] = val;
    setFormData({ ...formData, specs: newSpecs });
  };
  const removeSpec = (i: number) => setFormData({ ...formData, specs: formData.specs.filter((_: any, idx: number) => idx !== i) });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug) formData.slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    try {
      const endpoint = industry ? `/industries/${industry._id}` : '/industries';
      const method = industry ? 'PATCH' : 'POST';
      const res = await fetchAPI(endpoint, {
        method,
        body: JSON.stringify(formData)
      });
      if (res.success) {
        toast.success(industry ? 'Industry Profile Scaled' : 'Industry Architected');
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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1400px] h-full bg-white shadow-2xl flex rounded-[48px] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Interaction */}
        <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 bg-slate-900/10 backdrop-blur-md text-slate-400 hover:bg-[#FF6600] hover:text-white rounded-2xl flex items-center justify-center transition-all z-[1100]">
           <X size={20} />
        </button>

        {/* Architect Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-slate-50/30">
           <div className="p-8 border-b border-slate-100 bg-white">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                 Industry Architect <span className="text-[10px] bg-[#FF6600] text-white px-2 py-0.5 rounded-full uppercase">Sector Engine</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Deploying Sector-Specific Value Propositions</p>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              {/* Identity & Visual */}
              <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Zap size={14} /> Core Identity</h3>
                 <input className="admin-input text-xl font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Industry Title (e.g. Solar Energy)" />
                 <input className="admin-input text-xs" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="URL slug (auto-generated if empty)" />
                 
                 <div className="aspect-video bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden group" onClick={() => document.getElementById('ind-image-upload')?.click()}>
                    {formData.image.url ? (
                       <img src={getImageUrl(formData.image.url)} className="w-full h-full object-cover" />
                    ) : (
                       <>
                          <Upload size={32} className="text-slate-300 mb-2 group-hover:scale-110 transition-all" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Sector Visual</span>
                       </>
                    )}
                    <input id="ind-image-upload" type="file" className="hidden" onChange={handleImageUpload} />
                 </div>
              </div>

              {/* Narrative */}
              <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><FileText size={14} /> Industrial Narrative</h3>
                 <textarea className="admin-input min-h-[120px] text-sm leading-relaxed" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe your expertise in this sector..." />
              </div>

              {/* Feature Points */}
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><List size={14} /> Operational Points (Optional)</h3>
                    <button onClick={addPoint} className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-all"><Plus size={16} /></button>
                 </div>
                 <div className="space-y-3">
                    {formData.points.map((p: string, i: number) => (
                       <div key={i} className="flex gap-2">
                          <input className="admin-input text-xs" value={p} onChange={e => updatePoint(i, e.target.value)} placeholder="Operational Capability" />
                          <button onClick={() => removePoint(i)} className="p-3 text-red-400 hover:text-red-500 bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Target size={14} /> Technical Specifications (Optional)</h3>
                    <button onClick={addSpec} className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-all"><Plus size={16} /></button>
                 </div>
                 <div className="space-y-3">
                    {formData.specs.map((s: any, i: number) => (
                       <div key={i} className="flex gap-2">
                          <input className="admin-input text-xs flex-1" value={s.key} onChange={e => updateSpec(i, 'key', e.target.value)} placeholder="Spec Name (e.g. Load Capacity)" />
                          <input className="admin-input text-xs flex-[1.5]" value={s.value} onChange={e => updateSpec(i, 'value', e.target.value)} placeholder="Spec Value (e.g. 5000 kg)" />
                          <button onClick={() => removeSpec(i)} className="p-3 text-red-400 hover:text-red-500 bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
              <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Discard Draft</button>
              <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">Commit Sector Deployment</button>
           </div>
        </div>

        {/* Live Preview Monitor */}
        <div className="flex-1 bg-slate-900 overflow-hidden flex flex-col p-12">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20">
                     <Eye size={20} />
                  </div>
                  <div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Sector Rendering Active</span>
                     <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">Preview Environment</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
               <div className="bg-white rounded-[48px] overflow-hidden min-h-screen text-slate-900 pb-20">
                  {/* Hero Render */}
                  <div className="h-[400px] relative overflow-hidden bg-slate-800">
                     {formData.image.url ? (
                        <img src={getImageUrl(formData.image.url)} className="w-full h-full object-cover opacity-60" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                           <Layout size={64} />
                        </div>
                     )}
                     <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-slate-900 to-transparent">
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-2">{formData.title || 'Industry Profile'}</h2>
                        <div className="w-12 h-1 bg-[#FF6600]" />
                     </div>
                  </div>

                  {/* Narrative Render */}
                  <div className="p-12 space-y-10">
                     <div className="space-y-4">
                        <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em]">Value Proposition</span>
                        <p className="text-lg font-bold text-slate-600 leading-relaxed italic pr-12">
                           {formData.description || 'Provide a compelling industrial narrative for this sector.'}
                        </p>
                     </div>

                     {formData.points.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                           {formData.points.map((p: string, i: number) => (
                              <div key={i} className="flex gap-4 items-center bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                 <Zap size={16} className="text-[#FF6600]" />
                                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{p || 'Strategic Point'}</span>
                              </div>
                           ))}
                        </div>
                     )}

                     {formData.specs.length > 0 && (
                        <div className="pt-10">
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Technical Specifications Matrix</h4>
                           <div className="bg-white border rounded-[32px] overflow-hidden shadow-sm">
                              {formData.specs.map((s: any, i: number) => (
                                 <div key={i} className={`flex justify-between items-center p-6 text-sm border-b border-slate-50 last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{s.key || 'Specification'}</span>
                                    <span className="font-black text-slate-900 uppercase tracking-wider">{s.value || '--'}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
