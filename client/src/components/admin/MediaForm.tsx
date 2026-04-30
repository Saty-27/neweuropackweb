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
  Video, 
  FileText, 
  Globe, 
  Search,
  Type,
  Palette,
  CheckCircle2,
  Download,
  AlertCircle,
  Play,
  Video as VideoIcon
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface MediaFormProps {
  item?: any;
  settings?: any;
  onClose: () => void;
  onSave: () => void;
  mode: 'item' | 'settings';
}

export default function MediaForm({ item, settings, onClose, onSave, mode }: MediaFormProps) {
  const [formData, setFormData] = useState<any>(mode === 'item' ? {
    type: item?.type || 'video',
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    description: item?.description || '',
    thumbnail: item?.thumbnail || { url: '', alt: '' },
    video: item?.video || { youtubeUrl: '', embedId: '' },
    file: item?.file || { url: '', name: '', size: '', format: '' },
    category: item?.category || 'Videos',
    tags: item?.tags || [],
    visible: item?.visible !== false,
    order: item?.order || 0,
    aiData: item?.aiData || { summary: '', topics: [], useCases: [] }
  } : { ...settings });

  const [isUploading, setIsUploading] = useState(false);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleYouTubeChange = (url: string) => {
    const id = getYouTubeId(url);
    setFormData({
      ...formData,
      video: { youtubeUrl: url, embedId: id }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'thumbnail' | 'file') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetchAPI(`/upload?folder=media/${field}`, {
         method: 'POST',
         body: fd
      });
      if (res.success) {
        if (field === 'thumbnail') {
          setFormData({ ...formData, thumbnail: { ...formData.thumbnail, url: res.url } });
        } else {
          setFormData({ 
            ...formData, 
            file: { 
              url: res.url, 
              name: file.name, 
              size: (file.size / (1024 * 1024)).toFixed(2) + 'MB',
              format: file.name.split('.').pop() || ''
            } 
          });
        }
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} linked`);
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
      if (mode === 'item') {
        const endpoint = item ? `/media/items/${item._id}` : '/media/items';
        const method = item ? 'PATCH' : 'POST';
        const res = await fetchAPI(endpoint, { method, body: JSON.stringify(formData) });
        if (res.success) {
          toast.success(item ? 'Resource Artifact Refined' : 'Resource Artifact Architected');
          onSave();
        }
      } else {
        const res = await fetchAPI('/media/settings', {
          method: 'PATCH',
          body: JSON.stringify(formData)
        });
        if (res.success) {
          toast.success('Resource Architecture Scaled');
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
                 {mode === 'item' ? 'Media Architect' : 'Media Master Settings'}
                 <span className="text-[10px] bg-[#FF6600] text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-100">
                    {mode === 'item' ? 'Resource Block' : 'Design Master'}
                 </span>
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                 {mode === 'item' ? 'Deploying Individual Industrial Assets' : 'Global Styling & Resource Protocols'}
              </p>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              {mode === 'item' ? (
                <>
                  {/* Asset Configuration */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Settings size={14} /> Asset Protocol</h3>
                    <div className="flex gap-4">
                       {['video', 'file', 'image'].map(t => (
                          <button 
                            key={t}
                            onClick={() => setFormData({...formData, type: t as any, category: t === 'video' ? 'Videos' : 'Documents'})}
                            className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-black text-[10px] uppercase tracking-widest ${formData.type === t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                          >
                             {t === 'video' ? <Video size={20} /> : t === 'file' ? <FileText size={20} /> : <Layout size={20} />}
                             {t}
                          </button>
                       ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <input className="admin-input text-sm font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Asset Title" />
                       <input className="admin-input text-xs font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Category (Videos/Documents)" />
                    </div>
                    <input className="admin-input text-xs" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Subtitle / Short Hook" />
                  </div>

                  {/* Dynamic Asset Input */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2">
                       {formData.type === 'video' ? <VideoIcon size={14} /> : <Download size={14} />} Asset Connectivity
                    </h3>
                    
                    {formData.type === 'video' ? (
                       <div className="p-6 bg-white rounded-[32px] border border-slate-100 space-y-4 shadow-sm">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">YouTube Connectivity</p>
                          <input className="admin-input text-xs" value={formData.video.youtubeUrl} onChange={e => handleYouTubeChange(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                          {formData.video.embedId && (
                             <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                <CheckCircle2 size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Linked Embed ID: {formData.video.embedId}</span>
                             </div>
                          )}
                       </div>
                    ) : (
                       <div className="p-6 bg-white rounded-[32px] border border-slate-100 space-y-4 shadow-sm">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Industrial File Uplink</p>
                          <div className="flex gap-4">
                             <div className="flex-1 aspect-[16/6] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden group" onClick={() => document.getElementById('media-file-upload')?.click()}>
                                <FileText size={24} className="text-slate-300 mb-1 group-hover:scale-110 transition-all" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Link PDF/PPT/DOC</span>
                                <input id="media-file-upload" type="file" className="hidden" onChange={e => handleFileUpload(e, 'file')} />
                             </div>
                             {formData.file.url && (
                                <div className="flex-1 flex flex-col justify-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                   <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 truncate">{formData.file.name}</p>
                                   <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-emerald-800">{formData.file.size}</span>
                                      <span className="text-[10px] font-bold uppercase text-emerald-800">{formData.file.format}</span>
                                   </div>
                                </div>
                             )}
                          </div>
                       </div>
                    )}
                  </div>

                  {/* Visual Infrastructure */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Layout size={14} /> Visual Infrastructure</h3>
                    <div className="aspect-video bg-white rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden group shadow-sm" onClick={() => document.getElementById('media-img-upload')?.click()}>
                       {formData.thumbnail.url ? (
                          <img src={getImageUrl(formData.thumbnail.url)} className="w-full h-full object-cover" />
                       ) : (
                          <>
                             <Upload size={32} className="text-slate-300 mb-2 group-hover:scale-110 transition-all" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Project Thumbnail</span>
                          </>
                       )}
                       <input id="media-img-upload" type="file" className="hidden" onChange={e => handleFileUpload(e, 'thumbnail')} />
                    </div>
                  </div>

                  {/* AI Metadata (Discovery) */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><AlertCircle size={14} /> AI Discovery Matrix</h3>
                    <div className="p-6 bg-slate-900 rounded-[32px] space-y-4">
                       <div>
                          <label className="text-[9px] font-black text-white/40 uppercase tracking-widest block mb-2 px-2">LLM Artifact Summary</label>
                          <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white/80 outline-none focus:ring-1 focus:ring-[#FF6600]/40 min-h-[80px]" value={formData.aiData.summary} onChange={e => setFormData({...formData, aiData: {...formData.aiData, summary: e.target.value}})} placeholder="Describe for AI crawlers..." />
                       </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Master Branding */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Palette size={14} /> Branding Master Architecture</h3>
                    
                    <div className="p-6 bg-white rounded-[32px] border border-slate-100 space-y-4 shadow-sm">
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Resource Dual-Color Logic</p>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 px-2">Primary Palette</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg pointer cursor-pointer" value={formData.style.title.colorPrimary} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorPrimary: e.target.value}}})} />
                                <span className="text-[10px] font-bold font-mono uppercase">{formData.style.title.colorPrimary}</span>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 px-2">Highlight Accent</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg pointer cursor-pointer" value={formData.style.title.colorHighlight} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorHighlight: e.target.value}}})} />
                                <span className="text-[10px] font-bold font-mono text-[#FF6600] uppercase">{formData.style.title.colorHighlight}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Typography Font-Set</h4>
                          <select className="admin-input text-xs font-bold" value={formData.style.title.fontFamily} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, fontFamily: e.target.value}}})}>
                             {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Heading Impact Scale</h4>
                          <input className="admin-input text-xs" value={formData.style.title.fontSize} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, fontSize: e.target.value}}})} />
                       </div>
                    </div>
                  </div>

                  {/* Resource Narrative */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Type size={14} /> Hub Narrative</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <input className="admin-input text-sm font-bold" value={formData.title.text} onChange={e => setFormData({...formData, title: {...formData.title, text: e.target.value}})} placeholder="Primary Hub Title" />
                       <input className="admin-input text-sm font-bold text-[#FF6600]" value={formData.title.highlightText} onChange={e => setFormData({...formData, title: {...formData.title, highlightText: e.target.value}})} placeholder="Highlight Word" />
                    </div>
                    <textarea className="admin-input min-h-[80px] text-xs font-medium leading-relaxed" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Scaling Hub Narrative Description..." />
                  </div>
                </>
              )}
           </div>

           <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
              <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Decommission Draft</button>
              <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">
                 Commit Architecture
              </button>
           </div>
        </div>

        {/* Live Rendering Deck */}
        <div className="flex-1 bg-slate-900 overflow-hidden flex flex-col p-12">
            <div className="flex justify-between items-center mb-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[20px] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20 animate-pulse shadow-2xl shadow-emerald-500/20">
                     <Eye size={24} />
                  </div>
                  <div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] block">Architecture Linked</span>
                     <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">Real-Time Industrial Hub Preview</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
               <div className="bg-white rounded-[64px] min-h-full p-20 text-slate-900 shadow-inner">
                  {/* Hub Title Render */}
                  <div className="text-center mb-20 space-y-4">
                     <h2 
                       style={{ 
                          fontSize: mode === 'settings' ? formData.style.title.fontSize : settings?.style?.title?.fontSize || '36px',
                          fontWeight: mode === 'settings' ? formData.style.title.fontWeight : settings?.style?.title?.fontWeight || '700',
                          fontFamily: mode === 'settings' ? formData.style.title.fontFamily : settings?.style?.title?.fontFamily || 'Inter',
                          lineHeight: 1.1,
                          letterSpacing: '-0.03em',
                          color: mode === 'settings' ? formData.style.title.colorPrimary : settings?.style?.title?.colorPrimary || '#000'
                       }}
                      >
                        {mode === 'settings' ? formData.title.text : settings?.title?.text || 'Our Media &'} {' '}
                        <span style={{ color: mode === 'settings' ? formData.style.title.colorHighlight : settings?.style?.title?.colorHighlight || '#FF6600' }}>
                           {mode === 'settings' ? formData.title.highlightText : settings?.title?.highlightText || 'Resources'}
                        </span>
                     </h2>
                     <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                        {mode === 'settings' ? formData.subtitle : settings?.subtitle || 'Industrial Intelligence Deployments'}
                     </p>
                  </div>

                  {/* Resource Card Render */}
                  <div className="max-w-md mx-auto relative group">
                     <div className="bg-slate-50 rounded-[48px] overflow-hidden border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-4 ring-1 ring-slate-100">
                        {/* Type Indicator */}
                        <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-slate-900/40 backdrop-blur-md rounded-full border border-white/20">
                           <span className="text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                              {formData.type === 'video' ? <Video size={12} /> : <FileText size={12} />}
                              {formData.type || 'Block'}
                           </span>
                        </div>

                        {/* Visual Render */}
                        <div className="aspect-video relative overflow-hidden bg-slate-200">
                           {(mode === 'item' ? formData.thumbnail.url : item?.thumbnail?.url) ? (
                              <img src={getImageUrl(mode === 'item' ? formData.thumbnail.url : item?.thumbnail?.url)} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-[9px] uppercase tracking-widest">Asset Thumbnail Blank</div>
                           )}
                           
                           {/* Action Overlay */}
                           <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex items-center justify-center">
                              {formData.type === 'video' ? (
                                 <div className="w-16 h-16 rounded-[24px] bg-[#FF6600] flex items-center justify-center text-white shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500 ring-4 ring-white/20">
                                    <Play size={32} fill="currentColor" />
                                 </div>
                              ) : (
                                 <div className="w-16 h-16 rounded-[24px] bg-slate-900 flex items-center justify-center text-white shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500 ring-4 ring-white/20">
                                    <Download size={32} />
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Content Strip */}
                        <div className="p-10 space-y-3">
                           <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-[0.4em] block">
                              {formData.category || 'Portfolio'} matrix
                           </span>
                           <h4 className="text-xl font-black tracking-tighter leading-none group-hover:text-[#FF6600] transition-colors">
                              {typeof formData.title === 'string' ? formData.title : (item?.title || 'Artifact Identity')}
                           </h4>
                           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed line-clamp-2">
                              {formData.subtitle || 'Structural resource narrative description...'}
                           </p>
                           
                           {formData.type === 'file' && formData.file.size && (
                              <div className="pt-4 flex items-center gap-3">
                                 <div className="px-3 py-1 bg-slate-100 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                    {formData.file.format}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-300">{formData.file.size} Artifact</span>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="mt-20 flex flex-col items-center gap-6">
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em] text-center">Industrial Discovery Environment</p>
                     <div className="flex gap-4">
                        {[1,2,3].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-[#FF6600] w-8' : 'bg-slate-200'}`} />)}
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
