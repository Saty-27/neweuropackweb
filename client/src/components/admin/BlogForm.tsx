'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Layout, 
  Globe, 
  Link as LinkIcon, 
  Type, 
  Upload as UploadIcon,
  X,
  ChevronUp,
  ChevronDown,
  Heading,
  Image as ImageIcon,
  List as ListIcon,
  MousePointer2,
  ExternalLink,
  Code,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  loading: boolean;
}

const GOOGLE_FONTS = [
  "Poppins", "Inter", "Roboto", "Open Sans", "Montserrat", "Lato", "Oswald", "Raleway", "Ubuntu", "Nunito", 
  "Playfair Display", "Lora", "Merriweather", "PT Serif", "Noto Sans", "Rubik", "Work Sans", "Fira Sans", "Quicksand", "Josefin Sans",
  "Space Grotesk", "Outfit", "Plus Jakarta Sans", "Syne", "Clash Display"
].sort();

export default function BlogForm({ initialData, onSave, loading }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    tags: initialData?.tags || [],
    heroImage: initialData?.heroImage || '',
    altText: initialData?.altText || '',
    status: initialData?.status || 'draft',
    author: initialData?.author || 'Europack',
    typography: initialData?.typography || {
      title: { fontSize: '36px', fontWeight: '700', fontFamily: 'Poppins', color: '#1e293b' },
      subtitle: { fontSize: '18px', fontWeight: '500', fontFamily: 'Poppins', color: '#64748b' },
      paragraph: { fontSize: '16px', lineHeight: '1.6', fontFamily: 'Inter', color: '#334155' }
    },
    contentBlocks: initialData?.contentBlocks || [],
    seo: initialData?.seo || {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      aiSummary: '',
      faqs: [],
      schema: {}
    },
    relations: initialData?.relations || {
      relatedProducts: [],
      relatedBlogs: []
    }
  });

  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'seo' | 'relations'>('content');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Dynamic Font Loading for Preview
  useEffect(() => {
    const fonts = [
      formData.typography.title.fontFamily,
      formData.typography.subtitle.fontFamily,
      formData.typography.paragraph.fontFamily,
      ...formData.contentBlocks.map((b: any) => b.style?.fontFamily).filter(Boolean)
    ];
    const uniqueFonts = Array.from(new Set(fonts));
    const linkId = 'blog-preview-fonts';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const fontStr = uniqueFonts.map(f => `family=${f.replace(/ /g, '+')}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontStr}&display=swap`;
  }, [formData.typography, formData.contentBlocks]);

  const addBlock = (type: string) => {
    const newBlock = {
      id: `block_${Date.now()}`,
      type,
      content: type === 'list' ? { items: [''] } : type === 'graph' ? { data: [{ label: 'Point A', value: 50 }], chartType: 'bar' } : { text: '' },
      style: {
        fontSize: type === 'heading' ? '24px' : '16px',
        fontWeight: type === 'heading' ? '700' : '400',
        fontFamily: formData.typography.paragraph.fontFamily,
        color: formData.typography.paragraph.color,
        textAlign: 'left',
        showContainer: false
      }
    };
    setFormData({ ...formData, contentBlocks: [...formData.contentBlocks, newBlock] });
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...formData.contentBlocks];
    newBlocks.splice(index, 1);
    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...formData.contentBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const updateBlock = (index: number, updates: any) => {
    const newBlocks = [...formData.contentBlocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const handleUpload = async (e: any, target: 'hero' | number) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetchAPI('/upload?folder=blogs', { method: 'POST', body: fd });
      if (res.success) {
        if (target === 'hero') {
          setFormData({ ...formData, heroImage: res.url });
        } else {
          updateBlock(target, { content: { ...formData.contentBlocks[target].content, url: res.url } });
        }
      }
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      {/* Top Controller Bar */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-slate-100 z-[100] shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Blog Architect <span className="text-[10px] bg-[#FF6600] text-white px-2 py-0.5 rounded-full">v1.0</span>
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Designing: {formData.title || 'Untitled Story'}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowPreview(!showPreview)} className="admin-btn-outline flex items-center gap-2 h-11 px-6">
            <Eye size={18} /> {showPreview ? 'Exit Preview' : 'Live Monitor'}
          </button>
          <button onClick={() => onSave(formData)} disabled={loading} className="admin-btn-primary flex items-center gap-2 h-11 px-8">
            <Save size={18} /> {loading ? 'Architecting...' : 'Publish Architecture'}
          </button>
        </div>
      </div>

      <div className={`grid ${showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-8 transition-all duration-500`}>
        {/* Editor Side */}
        <div className="space-y-8">
          {/* Main Navigation Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
            {[
              { id: 'content', label: 'CONTENT', icon: Layout },
              { id: 'design', label: 'TYPOGRAPHY', icon: Type },
              { id: 'seo', label: 'SEO & SCHEMA', icon: Globe },
              { id: 'relations', label: 'ECOSYSTEM', icon: LinkIcon }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {/* Core Header Section */}
                <div className="admin-card">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] mb-6 flex items-center gap-2">
                    <Layout size={14}/> Core Architecture
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="col-span-2">
                        <label className="admin-label">Story Title</label>
                        <input 
                          className="admin-input text-lg font-bold" 
                          value={formData.title} 
                          onChange={e => setFormData({ ...formData, title: e.target.value })} 
                          placeholder="The Ultimate Guide to..."
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="admin-label">Tagline / Subtitle</label>
                        <input 
                          className="admin-input" 
                          value={formData.subtitle} 
                          onChange={e => setFormData({ ...formData, subtitle: e.target.value })} 
                          placeholder="Briefly describe the story impact..."
                        />
                     </div>
                     <div>
                        <label className="admin-label">Category</label>
                        <input className="admin-input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                     </div>
                     <div>
                        <label className="admin-label">Slug</label>
                        <input className="admin-input" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                     </div>
                  </div>
                </div>

                {/* Hero Image Section */}
                <div className="admin-card">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                      <ImageIcon size={14}/> Visual Identity (Hero)
                   </h3>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-1">
                         <div 
                           className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer group hover:border-[#FF6600] transition-all"
                           onClick={() => {
                             const input = document.getElementById('hero-upload');
                             input?.click();
                           }}
                         >
                            {formData.heroImage ? (
                              <img src={getImageUrl(formData.heroImage)} className="w-full h-full object-cover" alt="Hero" />
                            ) : (
                              <div className="text-center">
                                 <UploadIcon size={24} className="text-slate-300 mx-auto mb-2" />
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Hero</span>
                              </div>
                            )}
                            <input id="hero-upload" type="file" className="hidden" onChange={e => handleUpload(e, 'hero')} />
                         </div>
                      </div>
                      <div className="col-span-2 space-y-4">
                         <div>
                            <label className="admin-label">Image Alt Text (SEO)</label>
                            <input className="admin-input" value={formData.altText} onChange={e => setFormData({ ...formData, altText: e.target.value })} placeholder="Describe image for search engines..." />
                         </div>
                         <div className="flex gap-4">
                            <div className="flex-1">
                               <label className="admin-label">Status</label>
                               <select className="admin-input" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                                  <option value="draft">STAGING / DRAFT</option>
                                  <option value="published">LIVE / PUBLISHED</option>
                               </select>
                            </div>
                            <div className="flex-1">
                               <label className="admin-label">Author Name</label>
                               <input className="admin-input" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Content Block Builder */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content Blocks Architect</h3>
                    <div className="flex gap-2">
                       {[
                         { type: 'heading', icon: Heading },
                         { type: 'paragraph', icon: Type },
                         { type: 'image', icon: ImageIcon },
                         { type: 'list', icon: ListIcon },
                         { type: 'cta', icon: MousePointer2 },
                         { type: 'link', icon: LinkIcon },
                         { type: 'graph', icon: BarChart3 },
                         { type: 'narrative', icon: BookOpen },
                         { type: 'embed', icon: Code }
                       ].map(btn => (
                         <button 
                           key={btn.type}
                           onClick={() => addBlock(btn.type)}
                           className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#FF6600] hover:border-[#FF6600] transition-all shadow-sm"
                           title={`Add ${btn.type}`}
                         >
                           <btn.icon size={16} />
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {formData.contentBlocks.map((block: any, idx: number) => (
                      <div key={block.id} className="admin-card group relative">
                         <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
                            <button onClick={() => moveBlock(idx, 'up')} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#FF6600] shadow-md"><ChevronUp size={14}/></button>
                            <button onClick={() => moveBlock(idx, 'down')} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#FF6600] shadow-md"><ChevronDown size={14}/></button>
                         </div>
                         <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                  {block.type === 'heading' && <Heading size={16}/>}
                                  {block.type === 'paragraph' && <Type size={16}/>}
                                  {block.type === 'image' && <ImageIcon size={16}/>}
                                  {block.type === 'list' && <ListIcon size={16}/>}
                                  {block.type === 'cta' && <MousePointer2 size={16}/>}
                                  {block.type === 'link' && <LinkIcon size={16}/>}
                                  {block.type === 'graph' && <BarChart3 size={16}/>}
                                  {block.type === 'narrative' && <BookOpen size={16}/>}
                                  {block.type === 'embed' && <Code size={16}/>}
                               </div>
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{block.type} Block</span>
                            </div>
                            <button onClick={() => removeBlock(idx)} className="text-slate-300 hover:text-red-500 transition-all"><Trash2 size={16}/></button>
                         </div>

                         {/* Dynamic Block Editor Content */}
                         <div className="space-y-4">
                            {block.type === 'heading' && (
                               <div className="flex gap-4">
                                  <select 
                                    className="admin-input w-24" 
                                    value={block.content.level || 'h2'} 
                                    onChange={e => updateBlock(idx, { content: { ...block.content, level: e.target.value } })}
                                  >
                                     <option value="h1">H1</option>
                                     <option value="h2">H2</option>
                                     <option value="h3">H3</option>
                                  </select>
                                  <input 
                                    className="admin-input font-bold" 
                                    value={block.content.text} 
                                    onChange={e => updateBlock(idx, { content: { ...block.content, text: e.target.value } })} 
                                    placeholder="Enter heading..."
                                  />
                               </div>
                            )}

                            {block.type === 'paragraph' && (
                               <textarea 
                                 className="admin-input" 
                                 rows={4} 
                                 value={block.content.text} 
                                 onChange={e => updateBlock(idx, { content: { ...block.content, text: e.target.value } })} 
                                 placeholder="Tell your story..."
                               />
                            )}

                            {block.type === 'image' && (
                               <div className="grid grid-cols-3 gap-6">
                                  <div 
                                    className="aspect-video bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer"
                                    onClick={() => document.getElementById(`upload-${idx}`)?.click()}
                                  >
                                     {block.content.url ? (
                                       <img src={getImageUrl(block.content.url)} className="w-full h-full object-cover" />
                                     ) : (
                                       <UploadIcon size={20} className="text-slate-300" />
                                     )}
                                     <input id={`upload-${idx}`} type="file" className="hidden" onChange={e => handleUpload(e, idx)} />
                                  </div>
                                  <div className="col-span-2 space-y-4">
                                     <input className="admin-input" placeholder="Image Alt Text" value={block.content.alt} onChange={e => updateBlock(idx, { content: { ...block.content, alt: e.target.value } })} />
                                     <input className="admin-input" placeholder="Image Caption (Optional)" value={block.content.caption} onChange={e => updateBlock(idx, { content: { ...block.content, caption: e.target.value } })} />
                                  </div>
                               </div>
                            )}

                            {block.type === 'list' && (
                               <div className="space-y-2">
                                  {block.content.items.map((item: string, i: number) => (
                                     <div key={i} className="flex gap-2">
                                        <div className="w-6 h-10 flex items-center justify-center text-slate-300 font-bold">•</div>
                                        <input 
                                          className="admin-input" 
                                          value={item} 
                                          onChange={e => {
                                            const newItems = [...block.content.items];
                                            newItems[i] = e.target.value;
                                            updateBlock(idx, { content: { ...block.content, items: newItems } });
                                          }} 
                                        />
                                        <button onClick={() => {
                                          const newItems = block.content.items.filter((_: any, id: number) => id !== i);
                                          updateBlock(idx, { content: { ...block.content, items: newItems } });
                                        }} className="text-slate-300 hover:text-red-500"><X size={14}/></button>
                                     </div>
                                  ))}
                                  <button 
                                    className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mt-2"
                                    onClick={() => updateBlock(idx, { content: { ...block.content, items: [...block.content.items, ''] } })}
                                  >+ Add Item</button>
                                </div>
                            )}

                            {block.type === 'cta' && (
                               <div className="grid grid-cols-2 gap-4">
                                  <input className="admin-input" placeholder="Button Text" value={block.content.text} onChange={e => updateBlock(idx, { content: { ...block.content, text: e.target.value } })} />
                                  <input className="admin-input" placeholder="Target Link (/products/...)" value={block.content.link} onChange={e => updateBlock(idx, { content: { ...block.content, link: e.target.value } })} />
                               </div>
                            )}

                            {block.type === 'link' && (
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="col-span-2">
                                     <input className="admin-input" placeholder="Link Text" value={block.content.text} onChange={e => updateBlock(idx, { content: { ...block.content, text: e.target.value } })} />
                                  </div>
                                  <input className="admin-input" placeholder="URL" value={block.content.url} onChange={e => updateBlock(idx, { content: { ...block.content, url: e.target.value } })} />
                                  <div className="flex items-center gap-3">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open in new tab?</span>
                                     <button 
                                       onClick={() => updateBlock(idx, { content: { ...block.content, newTab: !block.content.newTab } })}
                                       className={`w-10 h-6 rounded-full transition-all relative ${block.content.newTab ? 'bg-[#FF6600]' : 'bg-slate-200'}`}
                                     >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${block.content.newTab ? 'right-1' : 'left-1'}`} />
                                     </button>
                                  </div>
                               </div>
                            )}

                            {block.type === 'embed' && (
                               <textarea 
                                 className="admin-input font-mono text-xs" 
                                 rows={4} 
                                 value={block.content.html} 
                                 onChange={e => updateBlock(idx, { content: { ...block.content, html: e.target.value } })} 
                                 placeholder="Paste YouTube iframe or HTML embed code..."
                               />
                            )}

                            {block.type === 'narrative' && (
                               <div className="space-y-4">
                                  <div className="flex justify-between items-center bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                                     <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Pro Narrative Mode (2000+ Words Supported)</span>
                                     <span className="text-[10px] font-bold text-orange-400">Zen Editor ∞</span>
                                  </div>
                                  <textarea 
                                    className="admin-input min-h-[500px] text-lg leading-relaxed font-serif" 
                                    rows={25} 
                                    value={block.content.text} 
                                    onChange={e => updateBlock(idx, { content: { ...block.content, text: e.target.value } })} 
                                    placeholder="Write your expansive technical guide here..."
                                  />
                               </div>
                            )}

                            {block.type === 'graph' && (
                               <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                     <select className="admin-input" value={block.content.chartType || 'bar'} onChange={e => updateBlock(idx, { content: { ...block.content, chartType: e.target.value } })}>
                                        <option value="bar">Vertical Bar Chart</option>
                                        <option value="line">Trend Line Chart</option>
                                        <option value="stats">Technical Stats Grid</option>
                                     </select>
                                     <input className="admin-input" placeholder="Value Label (e.g. Load Capacity)" value={block.content.label} onChange={e => updateBlock(idx, { content: { ...block.content, label: e.target.value } })} />
                                  </div>
                                  <div className="space-y-2">
                                     {(block.content.data || [{ label: 'Point A', value: 50 }]).map((d: any, i: number) => (
                                       <div key={i} className="flex gap-2">
                                          <input className="admin-input flex-[2]" placeholder="Label" value={d.label} onChange={e => {
                                             const newData = [...(block.content.data || [])];
                                             newData[i].label = e.target.value;
                                             updateBlock(idx, { content: { ...block.content, data: newData } });
                                          }} />
                                          <input className="admin-input flex-1" type="number" placeholder="Value" value={d.value} onChange={e => {
                                             const newData = [...(block.content.data || [])];
                                             newData[i].value = e.target.value;
                                             updateBlock(idx, { content: { ...block.content, data: newData } });
                                          }} />
                                          <button onClick={() => {
                                             const newData = block.content.data.filter((_: any, id: number) => id !== i);
                                             updateBlock(idx, { content: { ...block.content, data: newData } });
                                          }} className="text-slate-300 hover:text-red-500"><X size={14}/></button>
                                       </div>
                                     ))}
                                     <button className="text-[10px] font-black text-orange-600 uppercase mt-2" onClick={() => updateBlock(idx, { content: { ...block.content, data: [...(block.content.data || []), { label: 'New Point', value: 0 }] } })}>+ Add Data Point</button>
                                  </div>
                               </div>
                            )}
                         </div>

                         {/* Style Controls Expanded for Block */}
                         <div className="mt-6 pt-4 border-t border-slate-50 grid grid-cols-4 gap-4">
                            <div>
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Font size</label>
                               <input className="admin-input !py-1 text-xs" value={block.style?.fontSize} onChange={e => updateBlock(idx, { style: { ...block.style, fontSize: e.target.value } })} />
                            </div>
                            <div>
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Weight</label>
                               <select className="admin-input !py-1 text-xs" value={block.style?.fontWeight} onChange={e => updateBlock(idx, { style: { ...block.style, fontWeight: e.target.value } })}>
                                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => <option key={w} value={w}>{w}</option>)}
                               </select>
                            </div>
                            <div>
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Text Align</label>
                               <select className="admin-input !py-1 text-xs" value={block.style?.textAlign} onChange={e => updateBlock(idx, { style: { ...block.style, textAlign: e.target.value } })}>
                                  <option value="left">Left</option>
                                  <option value="center">Center</option>
                                  <option value="right">Right</option>
                               </select>
                            </div>
                            <div>
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Text Color</label>
                               <div className="flex gap-2 items-center">
                                  <input type="color" className="w-8 h-8 rounded-lg cursor-pointer" value={block.style?.color} onChange={e => updateBlock(idx, { style: { ...block.style, color: e.target.value } })} />
                                  <span className="text-[10px] font-mono text-slate-400">{block.style?.color}</span>
                               </div>
                            </div>
                            <div>
                               <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1.5 block">Container</label>
                               <button 
                                 onClick={() => updateBlock(idx, { style: { ...block.style, showContainer: !block.style?.showContainer } })}
                                 className={`w-10 h-6 rounded-full transition-all relative ${block.style?.showContainer ? 'bg-[#FF6600]' : 'bg-slate-200'}`}
                               >
                                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${block.style?.showContainer ? 'right-1' : 'left-1'}`} />
                               </button>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="admin-card">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] mb-8 flex items-center gap-2">
                       <Type size={14}/> Typographic Constants
                    </h3>
                    
                    <div className="space-y-12">
                       {/* Global Title Style */}
                       <div className="space-y-4">
                          <div className="flex justify-between items-center">
                             <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Global Main Title</label>
                             <input type="color" value={formData.typography.title.color} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, title: { ...formData.typography.title, color: e.target.value } } })}/>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                             <select className="admin-input col-span-2" value={formData.typography.title.fontFamily} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, title: { ...formData.typography.title, fontFamily: e.target.value } } })}>
                                {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                             </select>
                             <input className="admin-input" placeholder="Size" value={formData.typography.title.fontSize} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, title: { ...formData.typography.title, fontSize: e.target.value } } })} />
                          </div>
                       </div>

                       {/* Global Paragraph Style */}
                       <div className="space-y-4">
                          <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Body Text Standard</label>
                          <div className="grid grid-cols-4 gap-4">
                             <select className="admin-input col-span-2" value={formData.typography.paragraph.fontFamily} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, paragraph: { ...formData.typography.paragraph, fontFamily: e.target.value } } })}>
                                {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                             </select>
                             <input className="admin-input" placeholder="Size" value={formData.typography.paragraph.fontSize} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, paragraph: { ...formData.typography.paragraph, fontSize: e.target.value } } })} />
                             <input className="admin-input" placeholder="Height" value={formData.typography.paragraph.lineHeight} onChange={e => setFormData({ ...formData, typography: { ...formData.typography, paragraph: { ...formData.typography.paragraph, lineHeight: e.target.value } } })} />
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'seo' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                 <div className="admin-card">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] mb-6 flex items-center gap-2">
                       <Globe size={14}/> SEO & Search Power
                    </h3>
                    <div className="space-y-6">
                       <div>
                          <label className="admin-label">Meta Title (Google Browser Tab)</label>
                          <input className="admin-input" value={formData.seo.metaTitle} onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })} />
                       </div>
                       <div>
                          <label className="admin-label">Meta Description</label>
                          <textarea className="admin-input" rows={3} value={formData.seo.metaDescription} onChange={e => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })} />
                       </div>
                       <div>
                          <label className="admin-label">AI Summary (For Chatbots & Discover)</label>
                          <textarea className="admin-input" rows={4} value={formData.seo.aiSummary} onChange={e => setFormData({ ...formData, seo: { ...formData.seo, aiSummary: e.target.value } })} placeholder="Write a summary optimized for AI reading..." />
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'relations' && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="admin-card">
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] mb-6 flex items-center gap-2">
                        <LinkIcon size={14}/> Content Ecosystem
                     </h3>
                     <p className="text-xs text-slate-400 font-medium mb-8">Link this blog to relevant products to increase conversion velocity.</p>
                     
                     <div className="space-y-4">
                        <label className="admin-label">Tagged Products</label>
                        <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Product Selection Coming Soon</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live monitor Sidebar */}
        {showPreview && (
          <div className="sticky top-28 h-[calc(100vh-140px)] flex flex-col bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
             <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl">
                   {[
                     { id: 'desktop', icon: Monitor },
                     { id: 'tablet', icon: Tablet },
                     { id: 'mobile', icon: Smartphone }
                   ].map(mode => (
                     <button 
                       key={mode.id}
                       onClick={() => setPreviewMode(mode.id as any)}
                       className={`p-2 rounded-lg transition-all ${previewMode === mode.id ? 'bg-white text-[#FF6600] shadow-sm' : 'text-slate-400'}`}
                     >
                       <mode.icon size={16} />
                     </button>
                   ))}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Monitor</span>
             </div>

             <div className="flex-1 bg-slate-100 overflow-y-auto p-12 flex justify-center scrollbar-hide">
                <div 
                   className={`bg-white shadow-2xl rounded-[48px] overflow-hidden transition-all duration-700 h-fit ${
                     previewMode === 'desktop' ? 'max-w-5xl w-full' : previewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                   }`}
                   style={{ minHeight: '1200px' }}
                >
                   {/* Preview Mock Start */}
                   <div className="p-16 md:p-24">
                      <div className="flex items-center gap-2 mb-6">
                         <span className="px-2 py-1 bg-[#FF6600]/10 text-[#FF6600] text-[9px] font-black uppercase tracking-widest rounded">{formData.category || 'CATEGORY'}</span>
                         <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">5 MIN READ</span>
                      </div>

                      <h1 style={{ 
                        fontSize: formData.typography.title.fontSize, 
                        fontWeight: formData.typography.title.fontWeight, 
                        fontFamily: formData.typography.title.fontFamily,
                        color: formData.typography.title.color,
                        lineHeight: 1.1,
                        marginBottom: '1rem'
                      }}>
                        {formData.title || 'Your Architectural Masterpiece Title Goes Here'}
                      </h1>

                      <p style={{
                        fontSize: formData.typography.subtitle.fontSize,
                        fontWeight: formData.typography.subtitle.fontWeight,
                        fontFamily: formData.typography.subtitle.fontFamily,
                        color: formData.typography.subtitle.color,
                        marginBottom: '3rem'
                      }}>
                        {formData.subtitle || 'Every great story starts with a compelling subtitle that hooks the reader instantly.'}
                      </p>

                      <div className="aspect-video rounded-3xl bg-slate-100 overflow-hidden mb-12 border border-slate-50">
                        {formData.heroImage && <img src={getImageUrl(formData.heroImage)} className="w-full h-full object-cover" />}
                      </div>

                      {/* Content Block Preview Loop */}
                      <div className="space-y-8">
                         {formData.contentBlocks.map((block: any) => (
                            <div key={block.id} style={{
                               textAlign: block.style?.textAlign as any,
                               color: block.style?.color,
                               fontFamily: block.style?.fontFamily || formData.typography.paragraph.fontFamily,
                               padding: block.style?.showContainer ? '2.5rem' : '0',
                               backgroundColor: block.style?.showContainer ? '#f8fafc' : 'transparent',
                               borderRadius: block.style?.showContainer ? '2.5rem' : '0',
                               border: block.style?.showContainer ? '1px solid #f1f5f9' : 'none',
                               marginBottom: block.style?.showContainer ? '2rem' : '0'
                            }}>
                               {block.type === 'heading' && (
                                  <div style={{
                                     fontSize: block.style?.fontSize,
                                     fontWeight: block.style?.fontWeight,
                                     lineHeight: 1.2
                                  }}>
                                     {block.content.text || 'Heading Element'}
                                  </div>
                               )}
                               {block.type === 'paragraph' && (
                                  <div style={{
                                     fontSize: block.style?.fontSize || formData.typography.paragraph.fontSize,
                                     lineHeight: formData.typography.paragraph.lineHeight,
                                     whiteSpace: 'pre-wrap'
                                  }}>
                                     {block.content.text || 'Paragraph text element...'}
                                  </div>
                               )}
                               {block.type === 'narrative' && (
                                  <div style={{
                                     fontSize: block.style?.fontSize || '1.125rem',
                                     lineHeight: 1.9,
                                     whiteSpace: 'pre-wrap',
                                     color: block.style?.color || '#334155'
                                  }}>
                                     {block.content.text || 'Narrative text element...'}
                                  </div>
                               )}
                               {block.type === 'image' && block.content.url && (
                                  <div className="space-y-3">
                                     <img src={getImageUrl(block.content.url)} className="w-full rounded-2xl shadow-lg" alt={block.content.alt} />
                                     {block.content.caption && <p className="text-center text-xs text-slate-400 font-medium italic">{block.content.caption}</p>}
                                  </div>
                               )}
                               {block.type === 'cta' && (
                                  <div className="py-4">
                                     <button className="bg-[#FF6600] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-100 hover:scale-105 transition-all">
                                        {block.content.text || 'Click To Convert'}
                                     </button>
                                  </div>
                                )}
                                {block.type === 'list' && (
                                   <ul className="space-y-4">
                                      {block.content.items.map((item: string, i: number) => (
                                         <li key={i} className="flex gap-4 items-start">
                                            <span className="w-1.5 h-1.5 bg-[#FF6600] rounded-full mt-2 shrink-0" />
                                            <span style={{ fontSize: block.style?.fontSize }}>{item || 'List item content...'}</span>
                                         </li>
                                      ))}
                                   </ul>
                                )}
                                {block.type === 'link' && (
                                   <a className="inline-flex items-center gap-2 text-[#FF6600] font-black border-b-2 border-[#FF6600]/20 pb-1 hover:border-[#FF6600] transition-all no-underline cursor-pointer">
                                      {block.content.text || 'Hyperlink Text'} <ExternalLink size={14} />
                                   </a>
                                )}
                                {block.type === 'graph' && (
                                   <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                                      <div className="flex justify-between items-end mb-4">
                                         <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">{block.content.label || 'DATA'}</span>
                                         <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{block.content.chartType}</span>
                                      </div>
                                      <div className="space-y-2">
                                         {block.content.data?.map((d: any, i: number) => (
                                            <div key={i} className="space-y-1">
                                               <div className="flex justify-between text-[10px] font-bold">
                                                  <span>{d.label}</span>
                                                  <span>{d.value}</span>
                                               </div>
                                               <div className="h-1.5 bg-white rounded-full overflow-hidden border border-slate-100">
                                                  <div className="h-full bg-orange-500" style={{ width: `${(d.value / 100) * 100}%` }} />
                                               </div>
                                            </div>
                                         ))}
                                      </div>
                                   </div>
                                )}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
