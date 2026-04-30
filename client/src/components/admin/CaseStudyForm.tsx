'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Settings, Layout, Eye, Video, FileText, Globe, 
  Search, Type, Palette, CheckCircle2, Download, AlertCircle, 
  Play, Video as VideoIcon, Layers, Table as TableIcon, Code, 
  CheckSquare, ArrowRight, MoveUp, MoveDown, Package, Upload, Zap, BookOpen
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean']
  ],
};

interface CaseStudyFormProps {
  item?: any;
  settings?: any;
  onClose: () => void;
  onSave: () => void;
  mode: 'item' | 'settings';
}

export default function CaseStudyForm({ item, settings, onClose, onSave, mode }: CaseStudyFormProps) {
  const [formData, setFormData] = useState<any>(mode === 'item' ? {
    title: item?.title || '',
    subtitle: item?.subtitle || '',
    slug: item?.slug || '',
    heroVideo: item?.heroVideo || { youtubeUrl: '', embedId: '', thumbnail: '', title: '' },
    mainContent: item?.mainContent || '',
    sections: item?.sections || [],
    productsUsed: item?.productsUsed?.map((p: any) => p._id || p) || [],
    style: item?.style || {
      title: { fontSize: '48px', fontWeight: '900', color: '#0f172a' },
      subtitle: { fontSize: '18px', color: '#64748b' },
      paragraph: { fontSize: '16px', color: '#334155' }
    },
    seo: item?.seo || { metaTitle: '', metaDescription: '', keywords: [], schema: {} },
    aiData: item?.aiData || { summary: '', problem: '', solution: '', outcome: '' },
    visible: item?.visible !== false,
    order: item?.order || 0
  } : { ...settings });

  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (mode === 'item') {
      loadProducts();
    }
  }, [mode]);

  const loadProducts = async () => {
    try {
      const res = await fetchAPI('/case-studies/products/available');
      if (res.success) setAvailableProducts(res.data);
    } catch (error) {
      console.error('Failed to load products for linking');
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  const handleYouTubeChange = (url: string) => {
    const id = getYouTubeId(url);
    setFormData({
      ...formData,
      heroVideo: { ...formData.heroVideo, youtubeUrl: url, embedId: id }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, sectionIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const folder = sectionIndex !== undefined ? `case-studies/sections` : `case-studies/hero`;
      const res = await fetchAPI(`/upload?folder=${folder}`, {
         method: 'POST',
         body: fd
      });
      if (res.success) {
        if (sectionIndex !== undefined) {
          const newSections = [...formData.sections];
          newSections[sectionIndex].url = res.url;
          setFormData({ ...formData, sections: newSections });
        } else {
          setFormData({ ...formData, heroVideo: { ...formData.heroVideo, thumbnail: res.url } });
        }
        toast.success('Visual artifact linked');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const addSection = (type: string) => {
    const newSection: any = { type };
    if (type === 'paragraph' || type === 'html' || type === 'heading') newSection.content = '';
    if (type === 'image') { newSection.url = ''; newSection.alt = ''; }
    if (type === 'process_flow') newSection.steps = [''];
    if (type === 'results') newSection.points = [''];
    if (type === 'table') newSection.data = [{ key: '', value: '' }];
    if (type === 'cta') newSection.cta = { heading: '', buttonText: 'Get Quote', link: '/quote' };
    
    setFormData({ ...formData, sections: [...formData.sections, newSection] });
  };

  const removeSection = (index: number) => {
    const newSections = formData.sections.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...formData.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setFormData({ ...formData, sections: newSections });
  };

  const updateSection = (index: number, updates: any) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], ...updates };
    setFormData({ ...formData, sections: newSections });
  };

  const toggleProduct = (productId: string) => {
    const current = [...formData.productsUsed];
    const index = current.indexOf(productId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(productId);
    }
    setFormData({ ...formData, productsUsed: current });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'item') {
        const endpoint = item ? `/case-studies/${item._id}` : '/case-studies';
        const method = item ? 'PATCH' : 'POST';
        const res = await fetchAPI(endpoint, { method, body: JSON.stringify(formData) });
        if (res.success) {
          toast.success(item ? 'Case Study Refined' : 'Case Study Architected');
          onSave();
        }
      } else {
        const res = await fetchAPI('/case-studies/settings/update', {
          method: 'PATCH',
          body: JSON.stringify(formData)
        });
        if (res.success) {
          toast.success('Hub Architecture Scaled');
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

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1550px] h-full bg-white shadow-2xl flex rounded-[48px] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Architect Exit */}
        <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md text-slate-400 hover:bg-[#FF6600] hover:text-white rounded-2xl flex items-center justify-center transition-all z-[1100] border border-slate-100 shadow-xl">
           <X size={20} />
        </button>

        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col border-r border-slate-100 bg-slate-50/30">
           <div className="p-8 border-b border-slate-100 bg-white">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 {mode === 'item' ? 'Case Study Architect' : 'Hub Branding Master'}
                 <span className="text-[10px] bg-[#FF6600] text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-orange-100">
                    {mode === 'item' ? 'Project Narrative' : 'Design Protocol'}
                 </span>
              </h2>
           </div>

           <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              {mode === 'item' ? (
                <>
                  {/* Hero Infrastructure */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Video size={14} /> Hero Infrastructure</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <input className="admin-input text-sm font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Case Study Title" />
                       <input className="admin-input text-xs" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Hero Subtitle" />
                    </div>
                    
                    <div className="p-6 bg-white rounded-[32px] border border-slate-100 space-y-4">
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Cinematic YouTube Source</p>
                       <input className="admin-input text-xs" value={formData.heroVideo.youtubeUrl} onChange={e => handleYouTubeChange(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                       <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden group" onClick={() => document.getElementById('hero-img-upload')?.click()}>
                          {formData.heroVideo.thumbnail ? <img src={getImageUrl(formData.heroVideo.thumbnail)} className="w-full h-full object-cover" /> : <><Upload size={24} className="text-slate-300"/><span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">Fallback Hero Image</span></>}
                          <input id="hero-img-upload" type="file" className="hidden" onChange={e => handleFileUpload(e)} />
                       </div>
                    </div>
                  </div>

                  {/* Main Narrative Architect */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><BookOpen size={14} /> Main Narrative Architecture</h3>
                    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden min-h-[400px] shadow-sm">
                       <ReactQuill 
                          theme="snow"
                          value={formData.mainContent} 
                          onChange={(val) => setFormData({...formData, mainContent: val})}
                          modules={QUILL_MODULES}
                          className="h-full border-none outline-none text-xs"
                          placeholder="Architect your primary industrial storytelling narrative here..."
                       />
                    </div>
                  </div>

                  {/* Narrative Block Archiecture */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Layers size={14} /> Narrative Blocks</h3>
                       <div className="flex gap-2">
                          {[
                            { type: 'paragraph', icon: <Type size={12}/> },
                            { type: 'heading', icon: <Type size={12} className="stroke-[3]"/> },
                            { type: 'image', icon: <Layout size={12}/> },
                            { type: 'process_flow', icon: <ArrowRight size={12}/> },
                            { type: 'table', icon: <TableIcon size={12}/> },
                            { type: 'results', icon: <CheckSquare size={12}/> },
                            { type: 'html', icon: <Code size={12}/> },
                            { type: 'cta', icon: <Zap size={12}/> }
                          ].map(btn => (
                            <button key={btn.type} onClick={() => addSection(btn.type)} className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#FF6600] hover:border-[#FF6600] transition-all shadow-sm">
                               {btn.icon}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       {formData.sections.map((section: any, idx: number) => (
                         <div key={idx} className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm relative group">
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                               <button onClick={() => moveSection(idx, 'up')} className="w-6 h-6 bg-slate-900 text-white rounded-md flex items-center justify-center"><MoveUp size={10}/></button>
                               <button onClick={() => moveSection(idx, 'down')} className="w-6 h-6 bg-slate-900 text-white rounded-md flex items-center justify-center"><MoveDown size={10}/></button>
                            </div>
                            
                            <div className="flex items-center justify-between mb-4">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                  <div className="w-6 h-6 bg-slate-50 rounded flex items-center justify-center text-slate-900 font-black">{idx + 1}</div>
                                  {section.type} block
                               </span>
                               <button onClick={() => removeSection(idx)} className="text-red-300 hover:text-red-500 transition-all"><Trash2 size={14}/></button>
                            </div>

                            {/* Dynamic Section Inputs */}
                            {section.type === 'paragraph' && (
                              <div className="bg-white rounded-xl overflow-hidden min-h-[200px]">
                                <ReactQuill 
                                  theme="snow"
                                  value={section.content} 
                                  onChange={(val) => updateSection(idx, {content: val})}
                                  modules={QUILL_MODULES}
                                  className="h-full border-none outline-none text-xs"
                                  placeholder="Architect your industrial narrative segment..."
                                />
                              </div>
                            )}
                            
                            {section.type === 'heading' && (
                              <div className="flex gap-2">
                                <select className="w-20 admin-input text-xs" value={section.level} onChange={e => updateSection(idx, {level: e.target.value})}>
                                   <option value="h1">H1</option>
                                   <option value="h2">H2</option>
                                   <option value="h3">H3</option>
                                </select>
                                <input className="flex-1 admin-input text-xs font-bold" value={section.content} onChange={e => updateSection(idx, {content: e.target.value})} placeholder="Section Heading" />
                              </div>
                            )}

                            {section.type === 'image' && (
                              <div className="space-y-2">
                                <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#FF6600] transition-all relative overflow-hidden h-24" onClick={() => document.getElementById(`section-img-${idx}`)?.click()}>
                                   {section.url ? <img src={getImageUrl(section.url)} className="w-full h-full object-cover" /> : <><Upload size={16} className="text-slate-300"/><span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Reference Image</span></>}
                                   <input id={`section-img-${idx}`} type="file" className="hidden" onChange={e => handleFileUpload(e, idx)} />
                                </div>
                                <input className="admin-input text-[10px]" value={section.alt} onChange={e => updateSection(idx, {alt: e.target.value})} placeholder="Alt description (SEO)" />
                              </div>
                            )}

                            {section.type === 'process_flow' && (
                              <div className="space-y-2">
                                 {section.steps.map((step: string, sidx: number) => (
                                   <div key={sidx} className="flex gap-2">
                                      <input className="flex-1 admin-input text-[10px]" value={step} onChange={e => {
                                        const steps = [...section.steps];
                                        steps[sidx] = e.target.value;
                                        updateSection(idx, {steps});
                                      }} placeholder={`Step ${sidx + 1}`} />
                                      <button onClick={() => {
                                        const steps = section.steps.filter((_:any, i:number) => i !== sidx);
                                        updateSection(idx, {steps});
                                      }} className="text-slate-200 hover:text-red-500"><X size={12}/></button>
                                   </div>
                                 ))}
                                 <button onClick={() => updateSection(idx, {steps: [...section.steps, '']})} className="text-[9px] font-black uppercase text-[#FF6600]">+ Add Stage</button>
                              </div>
                            )}

                            {section.type === 'table' && (
                              <div className="space-y-2">
                                 {section.data.map((row: any, ridx: number) => (
                                   <div key={ridx} className="grid grid-cols-2 gap-2">
                                      <input className="admin-input text-[10px] font-bold" value={row.key} onChange={e => {
                                        const data = [...section.data];
                                        data[ridx].key = e.target.value;
                                        updateSection(idx, {data});
                                      }} placeholder="Spec Key" />
                                      <div className="flex gap-2">
                                         <input className="flex-1 admin-input text-[10px]" value={row.value} onChange={e => {
                                           const data = [...section.data];
                                           data[ridx].value = e.target.value;
                                           updateSection(idx, {data});
                                         }} placeholder="Value" />
                                         <button onClick={() => {
                                           const data = section.data.filter((_:any, i:number) => i !== ridx);
                                           updateSection(idx, {data});
                                         }} className="text-slate-200 hover:text-red-500"><X size={12}/></button>
                                      </div>
                                   </div>
                                 ))}
                                 <button onClick={() => updateSection(idx, {data: [...section.data, {key: '', value: ''}]})} className="text-[9px] font-black uppercase text-[#FF6600]">+ Add Specification</button>
                              </div>
                            )}

                            {section.type === 'results' && (
                              <div className="space-y-2">
                                 {section.points.map((pt: string, pidx: number) => (
                                   <div key={pidx} className="flex gap-2">
                                      <input className="flex-1 admin-input text-[10px] text-emerald-600" value={pt} onChange={e => {
                                        const points = [...section.points];
                                        points[pidx] = e.target.value;
                                        updateSection(idx, {points});
                                      }} placeholder="Successful Outcome Point" />
                                      <button onClick={() => {
                                        const points = section.points.filter((_:any, i:number) => i !== pidx);
                                        updateSection(idx, {points});
                                      }} className="text-slate-200 hover:text-red-500"><X size={12}/></button>
                                   </div>
                                 ))}
                                 <button onClick={() => updateSection(idx, {points: [...section.points, '']})} className="text-[9px] font-black uppercase text-emerald-500">+ Add Result</button>
                              </div>
                            )}

                            {section.type === 'html' && <textarea className="admin-input text-xs font-mono min-h-[100px] bg-slate-900 text-emerald-400" value={section.content} onChange={e => updateSection(idx, {content: e.target.value})} placeholder="<div>Custom HTML Artifact</div>" />}
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Product Attribution Hub */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Package size={14} /> Product Attribution Hub</h3>
                    <div className="p-6 bg-white rounded-[40px] border border-slate-100 grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                       {availableProducts.map(prod => (
                         <button 
                           key={prod._id}
                           onClick={() => toggleProduct(prod._id)}
                           className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${formData.productsUsed.includes(prod._id) ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                         >
                            <img src={getImageUrl(prod.core.mainImage)} className="w-8 h-8 rounded-lg object-cover" />
                            <span className="text-[10px] font-black uppercase tracking-tighter truncate">{prod.core.title}</span>
                         </button>
                       ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Master Branding Protocol (Settings Mode) */}
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Palette size={14} /> Branding Master Protocol</h3>
                    <div className="p-8 bg-white rounded-[40px] border border-slate-100 space-y-6">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase">Hub Primary</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg cursor-pointer" value={formData.style.title.colorPrimary} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorPrimary: e.target.value}}})} />
                                <span className="text-[10px] font-black font-mono">{formData.style.title.colorPrimary}</span>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase">Accent Highlight</label>
                             <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <input type="color" className="w-6 h-6 rounded-lg cursor-pointer" value={formData.style.title.colorHighlight} onChange={e => setFormData({...formData, style: {...formData.style, title: {...formData.style.title, colorHighlight: e.target.value}}})} />
                                <span className="text-[10px] font-black font-mono text-[#FF6600]">{formData.style.title.colorHighlight}</span>
                             </div>
                          </div>
                       </div>
                       <input className="admin-input text-sm font-black" value={formData.title.text} onChange={e => setFormData({...formData, title: {...formData.title, text: e.target.value}})} placeholder="Primary Hub Title" />
                       <input className="admin-input text-sm font-black text-[#FF6600]" value={formData.title.highlightText} onChange={e => setFormData({...formData, title: {...formData.title, highlightText: e.target.value}})} placeholder="Highlight Segment" />
                       <textarea className="admin-input text-xs min-h-[80px]" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Global Hub Narrative Subtitle..." />
                    </div>
                  </div>
                </>
              )}
           </div>

           <div className="p-8 border-t border-slate-100 flex gap-4 bg-white">
              <button onClick={onClose} className="admin-btn-outline flex-1 py-4">Discard Artifact</button>
              <button onClick={handleSubmit} className="admin-btn-primary flex-[2] py-4 shadow-xl shadow-orange-100">
                 Commit to Architecture
              </button>
           </div>
        </div>

        {/* Live Rendering Deck */}
        <div className="flex-1 bg-slate-900 overflow-hidden flex flex-col p-12 relative">
            <div className="flex justify-between items-center mb-10 z-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[20px] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-400/20 animate-pulse">
                     <Eye size={24} />
                  </div>
                  <div>
                     <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] block">Artifact Sync Established</span>
                     <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">High-Fidelity Industrial Preview</p>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide px-4 z-10">
               <div className="bg-white rounded-[64px] min-h-full shadow-2xl p-0 overflow-hidden flex flex-col">
                  {/* Hero Block Preview */}
                  <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
                     {formData.heroVideo?.embedId ? (
                       <iframe 
                         src={`https://www.youtube.com/embed/${formData.heroVideo.embedId}?controls=0&mute=1&autoplay=1&loop=1&playlist=${formData.heroVideo.embedId}`}
                         className="absolute inset-0 w-full h-full opacity-40 scale-110 blur-[2px]"
                       />
                     ) : formData.heroVideo?.thumbnail && (
                        <img src={getImageUrl(formData.heroVideo.thumbnail)} className="absolute inset-0 w-full h-full object-cover opacity-40"/>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                     
                     <div className="relative z-10 text-center px-12 space-y-4">
                        <span className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.4em] animate-pulse">Project Narrative Discovery</span>
                        <h1 className="text-4xl font-black text-white tracking-tighter leading-none">
                           {typeof formData.title === 'string' ? formData.title : (formData.title?.text || 'Case Study Identity')}
                        </h1>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{formData.subtitle || 'Industrial Success Architecture'}</p>
                        {formData.heroVideo?.embedId && (
                           <div className="w-16 h-16 rounded-full bg-[#FF6600] flex items-center justify-center text-white mx-auto shadow-2xl shadow-orange-500/40">
                              <Play size={24} fill="currentColor" />
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Main Narrative Preview */}
                  {formData.mainContent && (
                    <div className="p-16 pb-0">
                       <div 
                         className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed quill-content border-b border-slate-50 pb-16"
                         dangerouslySetInnerHTML={{ __html: formData.mainContent }}
                       />
                    </div>
                  )}

                  {/* Narrative Flow Preview */}
                  <div className="p-16 space-y-12">
                     {formData.sections?.map((sec: any, idx: number) => (
                       <div key={idx} className="animate-in slide-in-from-bottom-5 duration-500">
                          {sec.type === 'paragraph' && (
                            <div 
                              className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto text-center quill-content"
                              dangerouslySetInnerHTML={{ __html: sec.content }}
                            />
                          )}
                          
                          {sec.type === 'heading' && (
                            React.createElement(sec.level || 'h2', {
                              className: `font-black text-slate-900 tracking-tighter uppercase text-center ${sec.level === 'h1' ? 'text-4xl' : sec.level === 'h2' ? 'text-2xl' : 'text-lg'}`
                            }, sec.content || 'Section Heading Artifact')
                          )}

                          {sec.type === 'image' && sec.url && (
                            <div className="rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-xl max-w-xl mx-auto">
                               <img src={getImageUrl(sec.url)} className="w-full h-auto" />
                            </div>
                          )}

                          {sec.type === 'process_flow' && (
                            <div className="flex flex-wrap justify-center gap-4">
                               {sec.steps.map((step: string, sidx: number) => (
                                 <div key={sidx} className="flex items-center gap-3">
                                    <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                                       <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">{sidx + 1}</span>
                                       <span className="text-[10px] font-black uppercase text-slate-600 truncate max-w-[120px]">{step || 'Awaiting Stage'}</span>
                                    </div>
                                    {sidx < sec.steps.length - 1 && <ArrowRight size={14} className="text-[#FF6600]"/>}
                                 </div>
                               ))}
                            </div>
                          )}

                          {sec.type === 'table' && (
                            <div className="max-w-xl mx-auto bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100">
                               {sec.data.map((row: any, ridx: number) => (
                                 <div key={ridx} className="flex justify-between p-5 border-b border-white last:border-0">
                                    <span className="text-[10px] font-black uppercase text-slate-400">{row.key || 'Specification'}</span>
                                    <span className="text-[10px] font-black text-slate-900">{row.value || 'Measured Value'}</span>
                                 </div>
                               ))}
                            </div>
                          )}

                          {sec.type === 'results' && (
                            <div className="max-w-xl mx-auto grid grid-cols-1 gap-4">
                               {sec.points.map((pt: string, pidx: number) => (
                                 <div key={pidx} className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                    <CheckSquare size={18} className="text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase text-emerald-900">{pt || 'Positive industrial outcome achieved'}</span>
                                 </div>
                               ))}
                            </div>
                          )}
                       </div>
                     ))}
                  </div>

                  {/* Linked Products Preview */}
                  {formData.productsUsed?.length > 0 && (
                    <div className="p-16 pt-0 space-y-8">
                       <div className="text-center">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6600] mb-2">Operational Asset Synergy</h3>
                          <p className="text-lg font-black text-slate-900">Products Utilized in this Project</p>
                       </div>
                       <div className="flex flex-wrap justify-center gap-6">
                          {formData.productsUsed?.map((pid: string) => {
                             const prod = availableProducts.find(p => p._id === pid);
                            if (!prod) return null;
                            return (
                              <div key={pid} className="w-40 p-4 bg-slate-50 border border-slate-100 rounded-[32px] flex flex-col items-center gap-3 shadow-sm hover:scale-105 transition-all">
                                 <img src={getImageUrl(prod.core.mainImage)} className="w-16 h-16 rounded-2xl object-cover" />
                                 <p className="text-[9px] font-black uppercase text-center leading-tight">{prod.core.title}</p>
                              </div>
                            );
                          })}
                       </div>
                    </div>
                  )}

                  <div className="p-16 pt-0 pb-20 text-center">
                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">Europack Industrial Narrative Architecture</p>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
