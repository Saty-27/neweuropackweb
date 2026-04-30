'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Plus, 
  Settings, 
  Type, 
  Layout, 
  Eye, 
  Smartphone, 
  Monitor,
  Target,
  Zap,
  Globe,
  Palette,
  MousePointer2,
  FileText
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface ServiceFormProps {
  service?: any;
  onClose: () => void;
  onSave: () => void;
}

export default function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    slug: service?.slug || '',
    hero: service?.hero || { 
      title: 'Our Industrial Services', 
      subtitle: 'Premium Safe & Secure Solutions', 
      image: { url: '', alt: '' },
      buttons: [{ text: 'Get Quote', action: 'openModal' }]
    },
    description: service?.description || { heading: '', paragraph: '' },
    highlights: service?.highlights || [],
    cta: service?.cta || { heading: 'Need Expert Packaging?', buttons: [{ text: 'Get Quote', action: 'openModal' }] },
    styles: service?.styles || {
      title: { fontSize: '36px', fontWeight: '700' },
      subtitle: { fontSize: '18px', fontWeight: '500' },
      paragraph: { fontSize: '16px', lineHeight: '1.6' },
      button: { fontSize: '16px', fontWeight: '600' }
    },
    seo: service?.seo || { metaTitle: '', metaDescription: '', keywords: [], schema: {} },
    status: service?.status || 'draft',
    visible: service?.visible !== false
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetchAPI('/upload?folder=services', {
        method: 'POST',
        body: fd
      });
      if (res.success) {
        setFormData({ ...formData, hero: { ...formData.hero, image: { ...formData.hero.image, url: res.url } } });
        toast.success('Hero image updated');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const removeHighlight = (index: number) => {
    setFormData({ ...formData, highlights: formData.highlights.filter((_: string, i: number) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = service ? `/services/${service._id}` : '/services';
      const method = service ? 'PATCH' : 'POST';
      const res = await fetchAPI(endpoint, {
        method,
        body: JSON.stringify(formData)
      });
      if (res.success) {
        toast.success(service ? 'Service updated' : 'Service created');
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
        
        {/* Close Icon Trigger */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md text-white hover:bg-[#FF6600] hover:text-white rounded-2xl flex items-center justify-center transition-all z-[1100] shadow-2xl border border-white/20"
        >
           <X size={24} />
        </button>

        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-slate-50/30">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    Service Architect <span className="text-[10px] bg-[#FF6600] text-white px-2 py-0.5 rounded-full uppercase">Pro Builder</span>
                 </h2>
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {service ? `Editing: ${service.title}` : 'Creating New Service Landing'}
                 </p>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => setPreviewMode('desktop')} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${previewMode === 'desktop' ? 'bg-orange-100 text-[#FF6600] shadow-sm shadow-orange-100' : 'bg-white border border-slate-200 text-slate-400'}`}>
                    <Monitor size={18} />
                 </button>
                 <button onClick={() => setPreviewMode('mobile')} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${previewMode === 'mobile' ? 'bg-orange-100 text-[#FF6600] shadow-sm shadow-orange-100' : 'bg-white border border-slate-200 text-slate-400'}`}>
                    <Smartphone size={18} />
                 </button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
              {/* Section 1: Hero Impact */}
              <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                    <Zap size={14} /> Hero Impact
                 </h3>
                 <div className="space-y-4">
                    <input className="admin-input text-xl font-bold" value={formData.hero.title} onChange={e => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} placeholder="Hero Title" />
                    <input className="admin-input" value={formData.hero.subtitle} onChange={e => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} placeholder="Subheading" />
                    <div 
                      className="aspect-video bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden"
                      onClick={() => document.getElementById('service-image')?.click()}
                    >
                       {formData.hero.image.url ? (
                          <img src={getImageUrl(formData.hero.image.url)} className="w-full h-full object-cover" alt="Hero" />
                       ) : (
                          <>
                             <Upload size={32} className="text-slate-300 mb-2" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Hero Visual</span>
                          </>
                       )}
                       {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#FF6600] border-t-transparent rounded-full animate-spin" /></div>}
                       <input id="service-image" type="file" className="hidden" onChange={handleImageUpload} />
                    </div>
                 </div>
              </div>

              {/* Section 2: Narrative */}
              <div className="space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                    <FileText size={14} /> Technical Narrative
                 </h3>
                 <div className="space-y-4">
                    <input className="admin-input font-bold" value={formData.description.heading} onChange={e => setFormData({...formData, description: {...formData.description, heading: e.target.value}})} placeholder="Narrative Heading" />
                    <textarea className="admin-input min-h-[150px]" value={formData.description.paragraph} onChange={e => setFormData({...formData, description: {...formData.description, paragraph: e.target.value}})} placeholder="Explain your expert packaging expertise..." />
                 </div>
              </div>

              {/* Section 3: High-Velocity Highlights */}
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                       <Target size={14} /> High-Velocity Highlights
                    </h3>
                    <button onClick={addHighlight} className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF6600] flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-all">
                       <Plus size={16} />
                    </button>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    {formData.highlights.map((h: string, i: number) => (
                       <div key={i} className="flex gap-2">
                          <input className="admin-input text-xs" value={h} onChange={e => updateHighlight(i, e.target.value)} placeholder="Highlight Text" />
                          <button onClick={() => removeHighlight(i)} className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                             <Trash2 size={16} />
                          </button>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Section 4: Typography Tokens */}
              <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm space-y-8">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Settings size={14} /> Typography Tokens
                 </h3>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[9px] font-black text-slate-400 uppercase block">Hero Title Size</label>
                       <input className="admin-input" value={formData.styles.title.fontSize} onChange={e => setFormData({...formData, styles: {...formData.styles, title: {...formData.styles.title, fontSize: e.target.value}}})} />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[9px] font-black text-slate-400 uppercase block">Subheading Weight</label>
                       <input className="admin-input" value={formData.styles.subtitle.fontWeight} onChange={e => setFormData({...formData, styles: {...formData.styles, subtitle: {...formData.styles.subtitle, fontWeight: e.target.value}}})} />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[9px] font-black text-slate-400 uppercase block">Narrative Line Height</label>
                       <input className="admin-input" value={formData.styles.paragraph.lineHeight} onChange={e => setFormData({...formData, styles: {...formData.styles, paragraph: {...formData.styles.paragraph, lineHeight: e.target.value}}})} />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[9px] font-black text-slate-400 uppercase block">Button Font Size</label>
                       <input className="admin-input" value={formData.styles.button.fontSize} onChange={e => setFormData({...formData, styles: {...formData.styles, button: {...formData.styles.button, fontSize: e.target.value}}})} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
              <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Discard Changes</button>
              <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">Commit Architect Deploment</button>
           </div>
        </div>

        {/* Live Preview Monitor */}
        <div className="flex-1 bg-slate-900 overflow-hidden flex flex-col p-12">
           <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/20">
                    <Eye size={20} />
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Architectural Monitor</span>
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">Real-time sync active</p>
                 </div>
              </div>
              <div className="px-4 py-1.5 bg-slate-800 rounded-full text-[10px] font-black text-slate-300 uppercase tracking-widest border border-slate-700">
                 {previewMode.toUpperCase()} VIEW
              </div>
           </div>

           <div className="flex-1 flex justify-center scrollbar-hide overflow-y-auto">
              <div 
                className={`bg-white rounded-[48px] overflow-hidden transition-all duration-700 h-fit ${previewMode === 'desktop' ? 'w-full' : 'w-[375px]'}`}
                style={{ minHeight: '1000px' }}
              >
                 {/* Live Render Partial START */}
                 <div className="relative">
                    {/* Hero Mock */}
                    <div className="h-[500px] relative overflow-hidden bg-slate-900 group">
                       {formData.hero.image.url ? (
                          <img src={getImageUrl(formData.hero.image.url)} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Preview"/>
                       ) : (
                          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                             <Layout className="text-slate-700" size={48} />
                          </div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
                       <div className="absolute inset-0 flex flex-col justify-center px-12">
                          <h1 style={formData.styles.title as any} className="text-white mb-4 line-clamp-3 leading-tight">{formData.hero.title || 'Service Title'}</h1>
                          <p style={formData.styles.subtitle as any} className="text-orange-400 uppercase tracking-widest mb-8">{formData.hero.subtitle || 'Subheading'}</p>
                          <div className="flex gap-4">
                             <button style={formData.styles.button as any} className="bg-[#FF6600] text-white px-8 py-4 rounded-2xl shadow-xl shadow-orange-900/20">Get Quote</button>
                             <button style={formData.styles.button as any} className="border-2 border-white text-white px-8 py-4 rounded-2xl">Contact Us</button>
                          </div>
                       </div>
                    </div>

                    {/* Content Mock */}
                    <div className="p-16 space-y-12">
                       <div className="max-w-3xl">
                          <h2 className="text-3xl font-black text-slate-900 mb-6">{formData.description.heading || 'Narrative Heading'}</h2>
                          <p style={formData.styles.paragraph as any} className="text-slate-600 italic leading-relaxed">{formData.description.paragraph || 'Service details...'}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          {formData.highlights.map((h: string, i: number) => (
                             <div key={i} className="flex gap-4 items-center bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="w-2 h-2 bg-[#FF6600] rounded-full" />
                                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">{h || 'Service Highlight'}</span>
                             </div>
                          ))}
                       </div>

                       {/* CTA Mock */}
                       <div className="bg-slate-900 rounded-[48px] p-12 text-center space-y-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6600]/10 blur-[80px] rounded-full -mr-32 -mt-32" />
                          <h2 className="text-3xl font-black text-white relative z-10">{formData.cta.heading}</h2>
                          <div className="flex justify-center gap-6 relative z-10">
                             <button className="bg-[#FF6600] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest">Get Quote</button>
                             <button className="bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/20">Call Now</button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
