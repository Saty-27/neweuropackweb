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
  Search, 
  Globe, 
  Link as LinkIcon, 
  Settings, 
  Image as ImageIcon, 
  Zap, 
  Type, 
  Upload as UploadIcon,
  X,
  ChevronUp,
  ChevronDown,
  MousePointer2,
  Bell
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import GalleryManager from './GalleryManager';
import SectionBlock from './SectionBlock';

interface ProductFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  loading: boolean;
}

export default function ProductForm({ initialData, onSave, loading }: ProductFormProps) {
  const GOOGLE_FONTS = [
    "Poppins", "Inter", "Roboto", "Open Sans", "Montserrat", "Lato", "Oswald", "Raleway", "Ubuntu", "Nunito", 
    "Playfair Display", "Lora", "Merriweather", "PT Serif", "Noto Sans", "Rubik", "Work Sans", "Fira Sans", "Quicksand", "Josefin Sans",
    "Arvo", "Libre Baskerville", "Muli", "Oxygen", "Titillium Web", "Varela Round", "Bebas Neue", "Dancing Script", "Pacifico", "Caveat",
    "Indie Flower", "Shadows Into Light", "Satisfy", "Courgette", "Great Vibes", "Amatic SC", "Righteous", "Abril Fatface", "Cinzel", "Exo 2",
    "Archivo", "Kanit", "Heebo", "Mukta", "Asap", "Public Sans", "IBM Plex Sans", "Source Sans Pro", "DM Sans", "Manrope",
    "Space Grotesk", "Outfit", "Plus Jakarta Sans", "Syne", "Clash Display", "Satoshi", "Cabinet Grotesk", "General Sans", "Melodrama",
    "Zilla Slab", "Crimson Text", "EB Garamond", "Cormorant Garamond", "Libre Caslon Text", "Domine", "Cardo", "Old Standard TT", "Spectral", "Alice",
    "Bree Serif", "Alfa Slab One", "Patua One", "Sanchez", "Crete Round", "Rokkitt", "Staatliches", "Passion One", "Fredoka One", "Luckiest Guy",
    "Bungee", "Monoton", "Press Start 2P", "VT323", "Silkscreen", "Michroma", "Orbitron", "Audiowide", "Syncopate", "Faster One",
    "Inconsolata", "Source Code Pro", "Roboto Mono", "Space Mono", "Fira Code", "Anonymous Pro", "JetBrains Mono", "Courier Prime", "Share Tech Mono", "Spline Sans Mono"
  ].sort();

  // Normalize initial data for the new schema
  const normalizedData = {
    core: {
      title: initialData?.name || initialData?.core?.title || '',
      subtitle: initialData?.core?.subtitle || '',
      slug: initialData?.slug || initialData?.core?.slug || '',
      category: initialData?.category || initialData?.core?.category || '',
      price: initialData?.price || initialData?.core?.price || '',
      shortDescription: initialData?.shortDescription || initialData?.core?.shortDescription || '',
      badges: initialData?.core?.badges || [],
      altText: initialData?.core?.altText || '',
      mainImage: initialData?.mainImage || initialData?.core?.mainImage || '',
      images: initialData?.images || initialData?.core?.images || [],
      specifications: initialData?.specifications || initialData?.core?.specifications || [],
      typography: {
        title: {
           fontSize: initialData?.core?.typography?.title?.fontSize || '48px',
           fontWeight: initialData?.core?.typography?.title?.fontWeight || '900',
           fontFamily: initialData?.core?.typography?.title?.fontFamily || 'Poppins',
           fontStyle: initialData?.core?.typography?.title?.fontStyle || 'normal',
           color: initialData?.core?.typography?.title?.color || '#1e293b'
        },
        subtitle: {
           fontSize: initialData?.core?.typography?.subtitle?.fontSize || '20px',
           fontWeight: initialData?.core?.typography?.subtitle?.fontWeight || '500',
           fontFamily: initialData?.core?.typography?.subtitle?.fontFamily || 'Poppins',
           fontStyle: initialData?.core?.typography?.subtitle?.fontStyle || 'normal',
           color: initialData?.core?.typography?.subtitle?.color || '#64748b'
        }
      }
    },
    seo: {
      metaTitle: initialData?.seo?.metaTitle || '',
      metaDescription: initialData?.seo?.metaDescription || '',
      keywords: initialData?.seo?.keywords || [],
      aiContext: initialData?.seo?.aiContext || {
        productSummary: '',
        useCases: [],
        advantages: [],
        faqs: []
      },
      schema: initialData?.seo?.schema || {},
      ...initialData?.seo
    },
    sections: initialData?.sections || [],
    relationships: {
      relatedProducts: initialData?.relationships?.relatedProducts || initialData?.relatedProducts || [],
      subProducts: initialData?.relationships?.subProducts || initialData?.subProducts || [],
      crossSell: initialData?.relationships?.crossSell || []
    },
    leadCapture: initialData?.leadCapture || {
      enablePopup: false,
      trigger: 'scroll_50%',
      fields: ['name', 'email', 'phone']
    }
  };

  const [formData, setFormData] = useState(normalizedData);
  const [activeTab, setActiveTab] = useState<'core' | 'sections' | 'seo' | 'relationships' | 'advanced'>('core');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  // Force Google Fonts loading in Admin Preview
  useEffect(() => {
    const families = [formData.core.typography.title.fontFamily, formData.core.typography.subtitle.fontFamily];
    const uniqueFamilies = Array.from(new Set(families));
    const linkId = 'google-fonts-admin';
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    const fontStr = uniqueFamilies.map(f => `family=${f.replace(/ /g, '+')}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontStr}&display=swap`;
  }, [formData.core.typography]);

  const loadAllProducts = async () => {
    try {
      const res = await fetchAPI('/products');
      if (res.success) setAllProducts(res.data);
    } catch (error) {
       console.error('Failed to load products for selection', error);
    }
  };

  const updateCore = (field: string, value: any) => {
    setFormData({ ...formData, core: { ...formData.core, [field]: value } });
  };

  const updateTypography = (type: 'title' | 'subtitle', field: string, value: any) => {
    setFormData({ 
      ...formData, 
      core: { 
        ...formData.core, 
        typography: { 
          ...formData.core.typography, 
          [type]: { ...formData.core.typography[type], [field]: value } 
        } 
      } 
    });
  };

  const updateSeo = (field: string, value: any) => {
    setFormData({ ...formData, seo: { ...formData.seo, [field]: value } });
  };

  const updateSection = (idx: number, field: string, value: any) => {
    const newSections = [...formData.sections];
    newSections[idx] = { ...newSections[idx], [field]: value };
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = (type: string) => {
    const newSection = {
      id: `section_${Date.now()}`,
      type,
      layout: 'standard',
      visible: true,
      visibleOn: { user: true, searchEngine: true },
      content: getInitialContent(type),
      style: {
        padding: '80px 0',
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        typography: {
          heading: { fontSize: '32px', fontWeight: '800', fontFamily: 'Poppins' },
          text: { fontSize: '16px', lineHeight: '1.6' }
        }
      },
      seo: { headingLevel: 'h2', altText: '' }
    };
    setFormData({ ...formData, sections: [...formData.sections, newSection] });
  };

  const getInitialContent = (type: string) => {
    switch(type) {
      case 'features_icons': return [{ icon: 'Zap', title: 'High Performance' }];
      case 'text_block': return { heading: '', text: '' };
      case 'cta': return { text: 'Get Quote', link: '/contact' };
      case 'testimonial': return { quote: '', author: '' };
      default: return {};
    }
  };

  const removeSection = (index: number) => {
    const newSections = [...formData.sections];
    newSections.splice(index, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...formData.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    setFormData({ ...formData, sections: newSections });
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem' }}>
      {/* Dynamic Top Navigation Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem', 
        position: 'sticky', 
        top: 0, 
        background: 'rgba(248, 250, 252, 0.9)', 
        backdropFilter: 'blur(10px)',
        padding: '1rem 0', 
        zIndex: 100 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Product Architect <span style={{ color: '#FF6600' }}>v2.0</span></h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>BUILDING: {formData.core.title || 'Untitled Product'}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setShowPreview(!showPreview)} className="admin-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.25rem' }}>
            <Eye size={18} /> {showPreview ? 'Editor' : 'Preview'}
          </button>
          <button onClick={() => onSave(formData)} disabled={loading} className="admin-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}>
            <Save size={18} /> {loading ? 'Saving...' : 'Save Architecture'}
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', background: '#e2e8f0', padding: '4px', borderRadius: '16px', marginBottom: '2.5rem', width: 'fit-content' }}>
        {[
          { id: 'core', label: 'CORE INFO', icon: ImageIcon },
          { id: 'sections', label: 'CONTENT BLOCKS', icon: Layout },
          { id: 'seo', label: 'SEO & AI', icon: Globe },
          { id: 'relationships', label: 'ECOSYSTEM', icon: LinkIcon },
          { id: 'advanced', label: 'ADVANCED', icon: Settings }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ 
              padding: '0.75rem 1.5rem', 
              borderRadius: '12px', 
              border: 'none', 
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#1e293b' : '#64748b',
              fontWeight: 800,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeTab === tab.id ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        {/* Core Tab */}
        <div style={{ display: activeTab === 'core' ? 'block' : 'none' }}>
           <div className="admin-card" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                       <div>
                          <label className="admin-label">Main Product Title</label>
                          <input className="admin-input" style={{ fontSize: '1.25rem', padding: '1.25rem' }} value={formData.core.title} onChange={e => updateCore('title', e.target.value)} placeholder="e.g. Industrial Wooden Pallets" />
                       </div>
                       <div>
                          <label className="admin-label">Subtitle / UX Tagline</label>
                          <input className="admin-input" value={formData.core.subtitle} onChange={e => updateCore('subtitle', e.target.value)} placeholder="e.g. Heavy Duty Export Quality Solutions" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="admin-label">Category</label>
                          <input className="admin-input" value={formData.core.category} onChange={e => updateCore('category', e.target.value)} />
                       </div>
                       <div>
                          <label className="admin-label">Slug (Auto-generated)</label>
                          <input className="admin-input" value={formData.core.slug} onChange={e => updateCore('slug', e.target.value)} />
                       </div>
                    </div>

                    {/* Typography Designer */}
                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                       <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                          <Type size={14}/> Typography Designer
                       </h3>
                       
                       <div className="space-y-8">
                          {/* Title Typography */}
                          <div>
                             <div className="flex justify-between items-center mb-3">
                                <label className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Main Title Style</label>
                                <div className="flex gap-2">
                                   <button 
                                     type="button"
                                     onClick={() => updateTypography('title', 'fontStyle', formData.core.typography.title.fontStyle === 'italic' ? 'normal' : 'italic')}
                                     className={`p-2 rounded-lg border transition-all ${formData.core.typography.title.fontStyle === 'italic' ? 'bg-orange-50 border-orange-200 text-[#FF6600]' : 'bg-white border-slate-200 text-slate-400'}`}
                                   >
                                      <span className="italic font-serif font-bold text-xs px-1">I</span>
                                   </button>
                                   <input 
                                     type="color" 
                                     value={formData.core.typography.title.color} 
                                     onChange={e => updateTypography('title', 'color', e.target.value)}
                                     style={{ width: '32px', height: '32px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                                   />
                                </div>
                             </div>
                             <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                   <select 
                                     className="admin-input" 
                                     value={formData.core.typography.title.fontFamily} 
                                     onChange={e => updateTypography('title', 'fontFamily', e.target.value)}
                                   >
                                      {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                                   </select>
                                </div>
                                <input 
                                  className="admin-input" 
                                  placeholder="Size (e.g. 48px)" 
                                  value={formData.core.typography.title.fontSize} 
                                  onChange={e => updateTypography('title', 'fontSize', e.target.value)} 
                                />
                             </div>
                             <div className="mt-3">
                                <select 
                                  className="admin-input text-[11px] font-bold" 
                                  value={formData.core.typography.title.fontWeight} 
                                  onChange={e => updateTypography('title', 'fontWeight', e.target.value)}
                                >
                                   {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>Weight: {w}</option>)}
                                </select>
                             </div>
                          </div>

                          {/* Subtitle Typography */}
                          <div>
                             <div className="flex justify-between items-center mb-3">
                                <label className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Subtitle Style</label>
                                <div className="flex gap-2">
                                   <button 
                                     type="button"
                                     onClick={() => updateTypography('subtitle', 'fontStyle', formData.core.typography.subtitle.fontStyle === 'italic' ? 'normal' : 'italic')}
                                     className={`p-2 rounded-lg border transition-all ${formData.core.typography.subtitle.fontStyle === 'italic' ? 'bg-orange-50 border-orange-200 text-[#FF6600]' : 'bg-white border-slate-200 text-slate-400'}`}
                                   >
                                      <span className="italic font-serif font-bold text-xs px-1">I</span>
                                   </button>
                                   <input 
                                     type="color" 
                                     value={formData.core.typography.subtitle.color} 
                                     onChange={e => updateTypography('subtitle', 'color', e.target.value)}
                                     style={{ width: '32px', height: '32px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                                   />
                                </div>
                             </div>
                             <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                   <select 
                                     className="admin-input" 
                                     value={formData.core.typography.subtitle.fontFamily} 
                                     onChange={e => updateTypography('subtitle', 'fontFamily', e.target.value)}
                                   >
                                      {GOOGLE_FONTS.map(font => <option key={font} value={font}>{font}</option>)}
                                   </select>
                                </div>
                                <input 
                                  className="admin-input" 
                                  placeholder="Size (e.g. 20px)" 
                                  value={formData.core.typography.subtitle.fontSize} 
                                  onChange={e => updateTypography('subtitle', 'fontSize', e.target.value)} 
                                />
                             </div>
                             <div className="mt-3">
                                <select 
                                  className="admin-input text-[11px] font-bold" 
                                  value={formData.core.typography.subtitle.fontWeight} 
                                  onChange={e => updateTypography('subtitle', 'fontWeight', e.target.value)}
                                >
                                   {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map(w => <option key={w} value={w}>Weight: {w}</option>)}
                                </select>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div>
                       <label className="admin-label">Image Alt Text (SEO)</label>
                       <input 
                         className="admin-input" 
                         value={formData.core.altText} 
                         onChange={e => updateCore('altText', e.target.value)} 
                         placeholder="e.g. Heavy Duty Wooden Pallet for export packaging" 
                       />
                    </div>

                    {/* Conversion Badges */}
                    <div>
                       <label className="admin-label">Conversion Badges</label>
                       <div className="flex flex-wrap gap-2 mt-2">
                          {formData.core.badges.map((badge: string, i: number) => (
                             <span key={i} className="px-3 py-1 bg-orange-50 text-[#FF6600] rounded-lg text-[10px] font-black tracking-widest uppercase border border-orange-100 flex items-center gap-2">
                                {badge}
                                <button type="button" onClick={() => updateCore('badges', formData.core.badges.filter((_: string, idx: number) => idx !== i))} className="hover:text-red-500">
                                   <X size={12} />
                                </button>
                             </span>
                          ))}
                          <button 
                            type="button"
                            onClick={() => {
                               const b = prompt('New Badge Name:');
                               if (b) updateCore('badges', [...formData.core.badges, b]);
                            }}
                            className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] font-black border border-dashed border-slate-300"
                          >+ ADD</button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="admin-label">Hero Product Image</label>
                    <div style={{ 
                      aspectRatio: '1', 
                      background: '#f1f5f9', 
                      borderRadius: '24px', 
                      border: '2px dashed #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer'
                    }} onClick={() => {
                       const input = document.createElement('input');
                       input.type = 'file';
                       input.onchange = async (e: any) => {
                          const file = e.target.files[0];
                          if (file) {
                             const fd = new FormData();
                             fd.append('file', file);
                             const res = await fetchAPI('/upload?folder=products', { method: 'POST', body: fd });
                             if (res.success) updateCore('mainImage', res.url);
                          }
                       };
                       input.click();
                    }}>
                       {formData.core.mainImage ? (
                          <img src={getImageUrl(formData.core.mainImage)} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} alt="Hero" />
                       ) : (
                          <div className="text-center">
                             <UploadIcon size={32} color="#94a3b8" />
                             <p style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginTop: '10px' }}>UPLOAD HERO IMAGE</p>
                          </div>
                       )}
                    </div>
                 </div>
              </div>

              {/* Structured Specifications Architect */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b] flex items-center gap-2">
                       <Layout size={16} color="#FF6600"/> Structured Specifications
                    </h3>
                    <button 
                      type="button" 
                      onClick={() => updateCore('specifications', [...formData.core.specifications, { key: '', value: '', seoKey: '', searchable: true, filterable: true }])}
                      className="admin-btn-outline" style={{ fontSize: '10px', padding: '6px 12px' }}
                    >
                       + ADD PROPERTY
                    </button>
                 </div>
                 
                 <div className="space-y-3">
                    {formData.core.specifications.map((spec: any, i: number) => (
                       <div key={i} className="grid grid-cols-12 gap-3 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="col-span-3">
                             <input 
                               className="admin-input" 
                               placeholder="Property Name" 
                               value={spec.key} 
                               onChange={e => {
                                  const newSpecs = [...formData.core.specifications];
                                  const key = e.target.value;
                                  const seoKey = key.toLowerCase().trim().replace(/[\s_-]+/g, '_').replace(/[^\w]/g, '');
                                  newSpecs[i] = { ...spec, key, seoKey };
                                  updateCore('specifications', newSpecs);
                               }}
                             />
                          </div>
                          <div className="col-span-3">
                             <input 
                               className="admin-input" 
                               placeholder="Value" 
                               value={spec.value} 
                               onChange={e => {
                                  const newSpecs = [...formData.core.specifications];
                                  newSpecs[i] = { ...spec, value: e.target.value };
                                  updateCore('specifications', newSpecs);
                               }}
                             />
                          </div>
                          <div className="col-span-2">
                             <input 
                               className="admin-input" 
                               placeholder="seo_key" 
                               value={spec.seoKey} 
                               onChange={e => {
                                  const newSpecs = [...formData.core.specifications];
                                  newSpecs[i] = { ...spec, seoKey: e.target.value };
                                  updateCore('specifications', newSpecs);
                               }}
                             />
                          </div>
                          <div className="col-span-3 flex gap-2">
                             <button 
                               type="button"
                               onClick={() => {
                                  const newSpecs = [...formData.core.specifications];
                                  newSpecs[i] = { ...spec, searchable: !spec.searchable };
                                  updateCore('specifications', newSpecs);
                               }}
                               className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase flex-1 border ${spec.searchable ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                             >
                                Search
                             </button>
                             <button 
                               type="button"
                               onClick={() => {
                                  const newSpecs = [...formData.core.specifications];
                                  newSpecs[i] = { ...spec, filterable: !spec.filterable };
                                  updateCore('specifications', newSpecs);
                               }}
                               className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase flex-1 border ${spec.filterable ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                             >
                                Filter
                             </button>
                          </div>
                          <div className="col-span-1 text-right">
                             <button 
                               type="button" 
                               onClick={() => updateCore('specifications', formData.core.specifications.filter((_: any, idx: number) => idx !== i))}
                               className="text-red-400 hover:text-red-600 p-2"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              
              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                 <GalleryManager 
                   images={formData.core.images} 
                   onChange={(imgs) => updateCore('images', imgs)} 
                 />
              </div>
           </div>
        </div>

        {/* Sections Tab */}
        <div style={{ display: activeTab === 'sections' ? 'block' : 'none' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>Layout Architect</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                 {['features_icons', 'text_block', 'cta', 'testimonial'].map(type => (
                    <button key={type} onClick={() => addSection(type)} className="admin-btn-outline" style={{ padding: '0.5rem 0.75rem', fontSize: '10px' }}>
                       + {type.replace('_', ' ').toUpperCase()}
                    </button>
                 ))}
              </div>
           </div>
           
           <div className="space-y-6">
               {formData.sections.map((section: any, idx: number) => (
                  <SectionBlock 
                    key={section.id || idx}
                    section={section}
                    index={idx}
                    onUpdate={(field: string, value: any) => updateSection(idx, field, value)}
                    onRemove={() => removeSection(idx)}
                    onMoveUp={() => moveSection(idx, 'up')}
                    onMoveDown={() => moveSection(idx, 'down')}
                  />
               ))}
           </div>
           
           {formData.sections.length === 0 && (
              <div className="admin-card" style={{ textAlign: 'center', padding: '5rem 2rem', background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
                 <Layout size={48} color="#cbd5e1" style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ margin: 0, color: '#64748b' }}>No blocks in this architecture</h3>
                 <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>Start by adding a section using the buttons above.</p>
              </div>
           )}
        </div>

        {/* SEO Tab */}
        <div style={{ display: activeTab === 'seo' ? 'block' : 'none' }}>
           <div className="admin-card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ margin: '0 0 1.5rem 0' }}>Search Engine Presentation</h3>
              <div className="space-y-4">
                 <div>
                    <label className="admin-label">Meta Title (Google View)</label>
                    <input className="admin-input" value={formData.seo.metaTitle} onChange={e => updateSeo('metaTitle', e.target.value)} />
                 </div>
                 <div>
                    <label className="admin-label">Meta Description</label>
                    <textarea className="admin-input" rows={3} value={formData.seo.metaDescription} onChange={e => updateSeo('metaDescription', e.target.value)} />
                 </div>
              </div>
           </div>
           
           <div className="admin-card">
              <h3 style={{ margin: '0 0 1.5rem 0' }}>AI & Semantic Context</h3>
              <div className="space-y-4">
                 <div>
                    <label className="admin-label">Product Summary for LLMs (AI Chatbots)</label>
                    <textarea className="admin-input" rows={4} value={formData.seo.aiContext?.productSummary || ''} onChange={e => updateSeo('aiContext', { ...formData.seo.aiContext, productSummary: e.target.value })} placeholder="Detailed summary for ChatGPT/Gemini to understand the product better..." />
                 </div>
              </div>
           </div>
        </div>

        {/* Relationships Tab */}
        <div style={{ display: activeTab === 'relationships' ? 'block' : 'none' }}>
           <div className="admin-card">
              <h3 className="flex items-center gap-3 mb-6"><LinkIcon size={18} color="#FF6600"/> Ecosystem & Relationships</h3>
              
              <div className="space-y-8">
                 <div>
                    <label className="admin-label">Related Products (Bundles / Alternatives)</label>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                       {formData.relationships.relatedProducts.map((p: any) => {
                          const prod = typeof p === 'string' ? allProducts.find(x => x._id === p) : p;
                          return (
                             <div key={prod?._id || Math.random()} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                <span className="font-bold text-slate-700 text-sm truncate">{prod?.core?.title || prod?.name || 'Loading...'}</span>
                                <button type="button" onClick={() => setFormData({...formData, relationships: { ...formData.relationships, relatedProducts: formData.relationships.relatedProducts.filter((x: any) => (typeof x === 'string' ? x : x._id) !== prod?._id) } })} className="text-red-400 p-1"><X size={16}/></button>
                             </div>
                          );
                       })}
                    </div>
                    <select 
                      className="admin-input" 
                      onChange={(e) => {
                         if (e.target.value && !formData.relationships.relatedProducts.includes(e.target.value)) {
                            setFormData({...formData, relationships: { ...formData.relationships, relatedProducts: [...formData.relationships.relatedProducts, e.target.value] }});
                         }
                      }}
                      value=""
                    >
                       <option value="">+ Add Related Product</option>
                       {allProducts.map(p => (
                          <option key={p._id} value={p._id}>{p.core?.title || p.name}</option>
                       ))}
                    </select>
                 </div>
              </div>
           </div>
        </div>

        {/* Advanced Tab */}
        <div style={{ display: activeTab === 'advanced' ? 'block' : 'none' }}>
           <div className="admin-card">
              <h3 className="flex items-center gap-3 mb-6"><MousePointer2 size={18} color="#FF6600"/> Conversion & Capture</h3>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl">
                    <div>
                       <h4 className="font-black text-slate-900 mb-1 uppercase tracking-tight">Enable Lead Popup</h4>
                       <p className="text-xs font-bold text-slate-400">Automated engagement for high-intent visitors</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, leadCapture: { ...formData.leadCapture, enablePopup: !formData.leadCapture.enablePopup } })}
                      className={`w-14 h-8 rounded-full transition-all relative ${formData.leadCapture.enablePopup ? 'bg-[#FF6600]' : 'bg-slate-200'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm ${formData.leadCapture.enablePopup ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>

                 {formData.leadCapture.enablePopup && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 pt-4">
                       <div>
                          <label className="admin-label">Smart Trigger Condition</label>
                          <select 
                            className="admin-input" 
                            value={formData.leadCapture.trigger} 
                            onChange={e => setFormData({...formData, leadCapture: { ...formData.leadCapture, trigger: e.target.value }})}
                          >
                             <option value="scroll_50%">On 50% Scroll</option>
                             <option value="timer_30s">After 30 Seconds</option>
                             <option value="exit_intent">On Exit Intent</option>
                             <option value="manual">Manual Only</option>
                          </select>
                       </div>

                       <div>
                          <label className="admin-label">Required Data Fields</label>
                          <div className="flex flex-wrap gap-3 mb-4">
                             {formData.leadCapture.fields.map((f: string, i: number) => (
                                <span key={i} className="px-4 py-2 bg-[#FF6600]/10 text-[#FF6600] rounded-xl text-[10px] font-black tracking-widest uppercase border border-[#FF6600]/20 flex items-center gap-3">
                                   {f}
                                   <button type="button" onClick={() => setFormData({...formData, leadCapture: { ...formData.leadCapture, fields: formData.leadCapture.fields.filter((_: string, idx: number) => idx !== i) } })} className="hover:text-red-500">
                                      <X size={14} />
                                   </button>
                                </span>
                             ))}
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                             {['name', 'email', 'phone', 'company', 'message'].map((s: string) => (
                                <button 
                                  key={s} 
                                  onClick={() => {
                                     if (!formData.leadCapture.fields.includes(s)) {
                                        setFormData({...formData, leadCapture: { ...formData.leadCapture, fields: [...formData.leadCapture.fields, s] }});
                                     }
                                  }}
                                  className={`py-3 rounded-xl text-[10px] font-black tracking-widest uppercase border-2 transition-all ${formData.leadCapture.fields.includes(s) ? 'border-[#FF6600] bg-orange-50 text-[#FF6600]' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                                >
                                   {s}
                                </button>
                             ))}
                          </div>
                       </div>
                    </motion.div>
                 )}
              </div>
           </div>
        </div>

        {/* Live Preview Area (Dynamic Sidebar) */}
        {showPreview && (
          <div style={{ 
            background: 'white', 
            borderRadius: '32px', 
            border: '1px solid #e2e8f0', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            position: 'sticky',
            top: '80px'
          }}>
            <div style={{ padding: '1.25rem 2rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '12px' }}>
                  {[
                    { id: 'desktop', icon: Monitor },
                    { id: 'tablet', icon: Tablet },
                    { id: 'mobile', icon: Smartphone }
                  ].map(mode => (
                    <button 
                      key={mode.id}
                      onClick={() => setPreviewMode(mode.id as any)}
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        border: 'none', 
                        background: previewMode === mode.id ? 'white' : 'transparent',
                        color: previewMode === mode.id ? '#FF6600' : '#64748b',
                        boxShadow: previewMode === mode.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <mode.icon size={16} />
                    </button>
                  ))}
               </div>
               <span style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', letterSpacing: '0.1em' }}>LIVE MONITORING</span>
            </div>
            
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              background: '#cbd5e1', 
              padding: '2rem 1rem', 
              maxHeight: '800px',
              display: 'flex',
              justifyContent: 'center'
            }}>
               <div style={{ 
                 width: previewMode === 'desktop' ? '100% ' : previewMode === 'tablet' ? '768px' : '375px',
                 background: 'white',
                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                 borderRadius: '8px',
                 minHeight: '1000px',
                 transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                 overflow: 'hidden',
                 transform: previewMode !== 'desktop' ? 'scale(0.85)' : 'none',
                 transformOrigin: 'top center'
               }}>
                  {/* Mock Product Render */}
                  <div style={{ padding: '40px' }}>
                     <h1 style={{ 
                        fontSize: formData.core.typography?.title?.fontSize || '48px', 
                        fontWeight: formData.core.typography?.title?.fontWeight || '900',
                        fontFamily: formData.core.typography?.title?.fontFamily || 'Poppins',
                        fontStyle: formData.core.typography?.title?.fontStyle || 'normal',
                        color: formData.core.typography?.title?.color || '#1e293b',
                        margin: '0 0 10px 0'
                     }}>{formData.core.title || 'Product Title'}</h1>
                     <p style={{ 
                        fontSize: formData.core.typography?.subtitle?.fontSize || '20px', 
                        fontWeight: formData.core.typography?.subtitle?.fontWeight || '500',
                        fontFamily: formData.core.typography?.subtitle?.fontFamily || 'Poppins',
                        fontStyle: formData.core.typography?.subtitle?.fontStyle || 'normal',
                        color: formData.core.typography?.subtitle?.color || '#64748b'
                     }}>{formData.core.subtitle || 'Product Subtitle'}</p>
                     
                     <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
                        {formData.core.badges.map((b: string, i: number) => (
                           <span key={i} style={{ background: '#FF6600', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>{b}</span>
                        ))}
                     </div>
                     
                     <div style={{ width: '100%', height: '250px', background: '#f8fafc', borderRadius: '20px', margin: '40px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.core.mainImage ? <img src={getImageUrl(formData.core.mainImage)} style={{ maxHeight: '100%', padding: '20px' }} alt="Hero" /> : <ImageIcon size={48} color="#e2e8f0" />}
                     </div>

                     {/* Content Blocks Simulation */}
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {formData.sections.filter((s: any) => s.visible).map((s: any, i: number) => (
                           <div key={i} style={{ padding: '20px', background: s.style?.backgroundColor || '#f1f5f9', borderRadius: '12px', borderLeft: '4px solid #FF6600' }}>
                              <h3 style={{ fontSize: '14px', margin: '0 0 10px 0' }}>{s.type.toUpperCase()}</h3>
                              <div style={{ height: '10px', background: '#cbd5e1', width: '60%', borderRadius: '5px' }} />
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
