'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Plus, 
  Settings, 
  Layout, 
  Eye, 
  Type,
  Palette,
  Search,
  CheckCircle2,
  Globe,
  ImageIcon,
  Hash,
  Link as LinkIcon,
  MousePointer2
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface GalleryFormProps {
  item?: any;
  settings?: any;
  onClose: () => void;
  onSave: () => void;
  mode: 'item' | 'settings';
}

export default function GalleryForm({ item, settings, onClose, onSave, mode }: GalleryFormProps) {
  const [formData, setFormData] = useState<any>(mode === 'item' ? {
    title: item?.title || '',
    description: item?.description || '',
    image: item?.image || { url: '', alt: '' },
    category: item?.category || 'General',
    tags: item?.tags || [],
    link: item?.link || '',
    visible: item?.visible !== false,
    order: item?.order || 0,
    seo: item?.seo || { title: '', description: '' }
  } : { ...settings });

  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const generateAutoAlt = (title: string, category: string) => {
    if (!title) return '';
    return `${title} ${category} Industrial Packaging Europack India`.trim();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetchAPI('/upload?folder=gallery', {
        method: 'POST',
        body: fd
      });
      if (res.success) {
        const autoAlt = generateAutoAlt(formData.title, formData.category);
        setFormData({ 
          ...formData, 
          image: { url: res.url, alt: autoAlt } 
        });
        toast.success('Visual artifact uploaded');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const addTag = () => {
    if (!tagInput || formData.tags.includes(tagInput)) return;
    setFormData({ ...formData, tags: [...formData.tags, tagInput] });
    setTagInput('');
  };

  const removeTag = (t: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag: string) => tag !== t) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'item') {
        const endpoint = item ? `/gallery/items/${item._id}` : '/gallery/items';
        const method = item ? 'PATCH' : 'POST';
        const res = await fetchAPI(endpoint, { method, body: JSON.stringify(formData) });
        if (res.success) {
          toast.success(item ? 'Portfolio Item Refined' : 'Portfolio Item Architected');
          onSave();
        }
      } else {
        const res = await fetchAPI('/gallery/settings', {
          method: 'PATCH',
          body: JSON.stringify(formData)
        });
        if (res.success) {
          toast.success('Gallery Architecture Scaled');
          onSave();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const GOOGLE_FONTS = ['Inter', 'Outfit', 'Poppins', 'Montserrat', 'Roboto', 'Playfair Display'];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1450px] h-full bg-white shadow-2xl flex rounded-[48px] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Architect Exit */}
        <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md text-slate-400 hover:bg-[#FF6600] hover:text-white rounded-2xl flex items-center justify-center transition-all z-[1100] border border-slate-100 shadow-xl">
           <X size={20} />
        </button>

        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-slate-50/30">
           <div className="p-8 border-b border-slate-100 bg-white">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 {mode === 'item' ? 'Gallery Item Architect' : 'Gallery Master Settings'}
                 <span className="text-[10px] bg-[#FF6600] text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-100">
                    {mode === 'item' ? 'Block Agent' : 'Architecture Master'}
                 </span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                 {mode === 'item' ? 'Deploying Individual Portfolio Blocks' : 'Global Scaling & Design Protocols'}
              </p>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              {mode === 'item' ? (
                <>
                  {/* Item Identity */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Type size={14} /> Item Identity</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <input className="admin-input text-sm font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Project Title" />
                       <select className="admin-input text-xs font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option value="General">General Portfolio</option>
                          <option value="Pallets">Wooden Pallets</option>
                          <option value="Crates">Wooden Crates</option>
                          <option value="Packaging">Export Packaging</option>
                          <option value="Vacuum">Vacuum Packing</option>
                       </select>
                    </div>
                    <textarea className="admin-input min-h-[100px] text-sm leading-relaxed" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe this mission-critical work block..." />
                  </div>

                  {/* Asset Hub */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><ImageIcon size={14} /> Asset Hub</h3>
                    <div className="aspect-[16/9] bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden group shadow-sm" onClick={() => document.getElementById('gallery-upload')?.click()}>
                       {formData.image.url ? (
                          <img src={getImageUrl(formData.image.url)} className="w-full h-full object-cover" />
                       ) : (
                          <>
                             <Upload size={32} className="text-slate-300 mb-2 group-hover:scale-110 transition-all duration-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Project Visual</span>
                          </>
                       )}
                       <input id="gallery-upload" type="file" className="hidden" onChange={handleImageUpload} />
                    </div>
                    <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                       <Globe size={16} className="text-emerald-500" />
                       <div className="flex-1">
                          <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Auto-SEO Alt Protocol</p>
                          <p className="text-[10px] text-emerald-800 font-medium truncate">{formData.image.alt || 'Pending generation...'}</p>
                       </div>
                    </div>
                  </div>

                  {/* Metadata & Discovery */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Hash size={14} /> Metadata & Discovery</h3>
                    <div className="flex gap-2">
                       <input className="admin-input text-xs" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && addTag()} placeholder="Add SEO Tag (e.g. #MumbaiExport)" />
                       <button onClick={addTag} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-[#FF6600] transition-all"><Plus size={16} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {formData.tags.map((t: string) => (
                          <span key={t} className="px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 flex items-center gap-2">
                             #{t} <button onClick={() => removeTag(t)} className="hover:text-red-500"><X size={12} /></button>
                          </span>
                       ))}
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-1 p-4 bg-white rounded-2xl border border-slate-100">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1"><LinkIcon size={10} /> Link Protocol</p>
                          <input className="w-full bg-transparent border-none p-0 text-[11px] font-bold outline-none" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="/services/wooden-pallets" />
                       </div>
                       <div className="flex-1 p-4 bg-white rounded-2xl border border-slate-100">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1"><Settings size={10} /> Priority Order</p>
                          <input type="number" className="w-full bg-transparent border-none p-0 text-[11px] font-bold outline-none" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                       </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Master Typography */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Palette size={14} /> Global Design Tokens</h3>
                    
                    <div className="p-6 bg-white rounded-[32px] border border-slate-100 space-y-4">
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Master Title Dual-Color Control</p>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 px-2">Primary Color</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg pointer cursor-pointer" value={formData.style.title.colorPrimary} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorPrimary: e.target.value}}})} />
                                <span className="text-[10px] font-bold font-mono">{formData.style.title.colorPrimary}</span>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 px-2">Highlight Color</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg pointer cursor-pointer" value={formData.style.title.colorHighlight} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorHighlight: e.target.value}}})} />
                                <span className="text-[10px] font-bold font-mono text-[#FF6600]">{formData.style.title.colorHighlight}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Typography Library</h4>
                          <select className="admin-input text-xs font-bold" value={formData.style.title.fontFamily} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, fontFamily: e.target.value}}})}>
                             {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master Heading Scale</h4>
                          <input className="admin-input text-xs" value={formData.style.title.fontSize} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, fontSize: e.target.value}}})} />
                       </div>
                    </div>
                  </div>

                  {/* Architecture Branding */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Layout size={14} /> Architecture Narrative</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <input className="admin-input text-sm font-bold" value={formData.title.text} onChange={e => setFormData({...formData, title: {...formData.title, text: e.target.value}})} placeholder="Primary Title Text" />
                       <input className="admin-input text-sm font-bold text-[#FF6600]" value={formData.title.highlightText} onChange={e => setFormData({...formData, title: {...formData.title, highlightText: e.target.value}})} placeholder="Highlight Text" />
                    </div>
                    <textarea className="admin-input min-h-[80px] text-xs font-medium" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Gallery Subheadline" />
                  </div>
                </>
              )}
           </div>

           <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
              <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Discard Evolution</button>
              <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">
                 Commit Architecture
              </button>
           </div>
        </div>

        {/* Live Rendering Environment */}
        <div className="flex-1 bg-slate-950 overflow-hidden flex flex-col p-12">
            <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[18px] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20 shadow-2xl shadow-emerald-500/20 animate-pulse">
                     <Eye size={24} />
                  </div>
                  <div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] block">Architecture Link Active</span>
                     <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">Real-Time Industrial Review</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
               <div className="bg-slate-50 rounded-[64px] min-h-full p-16 text-slate-900 shadow-inner">
                  {/* Global Title Render */}
                  <div className="text-center mb-16 space-y-4">
                     <h2 
                       style={{ 
                          fontSize: mode === 'settings' ? formData.style.title.fontSize : settings?.style?.title?.fontSize || '36px',
                          fontWeight: mode === 'settings' ? formData.style.title.fontWeight : settings?.style?.title?.fontWeight || '700',
                          fontFamily: mode === 'settings' ? formData.style.title.fontFamily : settings?.style?.title?.fontFamily || 'Inter',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                          color: mode === 'settings' ? formData.style.title.colorPrimary : settings?.style?.title?.colorPrimary || '#000'
                       }}
                      >
                        {mode === 'settings' ? formData.title.text : settings?.title?.text || 'Our Work'} {' '}
                        <span style={{ color: mode === 'settings' ? formData.style.title.colorHighlight : settings?.style?.title?.colorHighlight || '#FF6600' }}>
                           {mode === 'settings' ? formData.title.highlightText : settings?.title?.highlightText || 'Gallery'}
                        </span>
                     </h2>
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        {mode === 'settings' ? formData.subtitle : settings?.subtitle || 'Explore high-fidelity industrial artifacts'}
                     </p>
                  </div>

                  {/* Card Architect Render */}
                  <div className="max-w-md mx-auto">
                     <div className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 transition-all duration-700 hover:-translate-y-4">
                        <div className="aspect-square bg-slate-100 relative overflow-hidden">
                           {formData.image?.url || item?.image?.url ? (
                              <img src={getImageUrl(mode === 'item' ? formData.image.url : item?.image?.url)} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms] opacity-90 group-hover:opacity-100" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-200/50 italic text-[10px] font-black uppercase tracking-widest">Visual Component Blank</div>
                           )}
                           
                           {/* Hover Overlay Mock */}
                           <div className="absolute inset-0 bg-[#FF6600]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center">
                              <h4 className="text-white font-black text-base mb-2 uppercase tracking-tighter">{mode === 'item' ? formData.title || 'Portfolio Block' : item?.title || 'Component'}</h4>
                              <p className="text-white/80 text-[10px] font-bold line-clamp-2 mb-6 tracking-wide">{mode === 'item' ? formData.description || 'Industrial narrative' : item?.description || 'Structural narrative'}</p>
                              <div className="w-12 h-12 rounded-2xl bg-white text-[#FF6600] flex items-center justify-center shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-all duration-500">
                                 <MousePointer2 size={24} />
                              </div>
                           </div>
                        </div>
                        <div className="p-8 flex justify-between items-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                           <div>
                              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6600]">{mode === 'item' ? formData.category : item?.category || 'Industrial'}</span>
                              <h4 className="text-sm font-black tracking-tight">{mode === 'item' ? formData.title || 'Work Block Title' : item?.title || 'Project Reference'}</h4>
                           </div>
                           <CheckCircle2 size={20} className="text-[#FF6600]" />
                        </div>
                     </div>
                  </div>

                  <div className="mt-20 flex justify-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-slate-300" />
                     <div className="w-8 h-2 rounded-full bg-[#FF6600]" />
                     <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
