'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Type, 
  Link as LinkIcon, 
  Share2, 
  Package, 
  Phone, 
  Eye, 
  Trash2, 
  Plus, 
  Upload, 
  X,
  Layers,
  Monitor,
  Layout
} from 'lucide-react';

export default function FooterManager() {
  const [activeTab, setActiveTab] = useState('logo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    loadFooter();
  }, []);

  useEffect(() => {
    if (footer?.typography?.fontFamily) {
      const font = footer.typography.fontFamily;
      const linkId = 'footer-preview-font';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (link) link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap`;
      else {
        link = document.createElement('link');
        link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }
  }, [footer?.typography?.fontFamily]);

  const loadFooter = async () => {
    try {
      const res = await fetchAPI('/footer');
      if (res.success) {
        // Ensure typography and visibility fields exist for legacy data
        const data = res.data;
        if (!data.typography) data.typography = { fontFamily: 'Poppins', fontSize: '14px', fontWeight: '400', color: '#ffffff', headingColor: '#FF6600' };
        if (data.showLogo === undefined) {
           data.showLogo = true;
           data.showQuickLinks = true;
           data.showSocials = true;
           data.showProducts = true;
           data.showContact = true;
           data.showBottom = true;
        }
        setFooter(data);
      }
    } catch (error) {
      toast.error('Failed to load footer settings');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (section: string, data: any) => {
    setFooter({ ...footer, [section]: data });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchAPI('/footer', {
        method: 'PUT',
        body: JSON.stringify(footer)
      });
      if (res.success) toast.success('Advanced Footer updated successfully!');
    } catch (error) {
      toast.error('Failed to update footer');
    } finally {
      setSaving(false);
    }
  };

  const uploadFile = async (file: File, field: string, subField?: string, index?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`http://localhost:5002/api/upload?folder=footer`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        if (index !== undefined && subField) {
          const newList = [...footer[field]];
          newList[index][subField] = data.url;
          handleUpdate(field, newList);
        } else {
          handleUpdate(field, data.url);
        }
        toast.success('Upload successful!');
      }
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  if (loading || !footer) return <div className="p-8 text-center text-gray-500 min-h-screen flex items-center justify-center font-bold tracking-widest uppercase text-xs animate-pulse underline-offset-8 decoration-orange-500/20">Initializing Advanced Footer Manager...</div>;

  const tabs = [
    { id: 'logo', label: 'Logo & Visibility', icon: <Layout size={18} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={18} /> },
    { id: 'background', label: 'Background & Style', icon: <Palette size={18} /> },
    { id: 'links', label: 'Quick Links', icon: <LinkIcon size={18} /> },
    { id: 'social', label: 'Social Icons', icon: <Share2 size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
  ];

  const googleFonts = ['Poppins', 'Inter', 'Montserrat', 'Roboto', 'Playfair Display', 'Open Sans', 'Lato'];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Advanced Footer CMS</h1>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <Monitor size={16} /> 100% Dynamic Final Version with Typography Control
          </p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? 'Processing...' : '💾 Save Changes'}
        </button>
      </div>

      <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white text-orange-600 shadow-md scale-105' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'logo' && (
                  <div className="space-y-10">
                    <SectionLabel title="Global Branding" subtitle="Logo and Visibility Settings" />
                    
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-gray-700">Footer Logo</label>
                      <div className="relative group w-full h-40 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center gap-3 overflow-hidden bg-gray-50 hover:bg-white transition-all">
                        {footer?.logo ? (
                          <img src={`http://localhost:5002/${footer.logo}`} className="h-full w-full object-contain p-8" />
                        ) : (
                          <Upload className="text-gray-300" size={40} />
                        )}
                        <input 
                          type="file" 
                          onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], 'logo')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <VisibilityToggle label="Show Logo" value={footer.showLogo} onChange={v => handleUpdate('showLogo', v)} />
                       <VisibilityToggle label="Show Links" value={footer.showQuickLinks} onChange={v => handleUpdate('showQuickLinks', v)} />
                       <VisibilityToggle label="Show Socials" value={footer.showSocials} onChange={v => handleUpdate('showSocials', v)} />
                       <VisibilityToggle label="Show Products" value={footer.showProducts} onChange={v => handleUpdate('showProducts', v)} />
                       <VisibilityToggle label="Show Contact" value={footer.showContact} onChange={v => handleUpdate('showContact', v)} />
                       <VisibilityToggle label="Show Bottom Bar" value={footer.showBottom} onChange={v => handleUpdate('showBottom', v)} />
                    </div>
                  </div>
                )}

                {activeTab === 'typography' && (
                  <div className="space-y-8">
                     <SectionLabel title="Global Typography" subtitle="Standardize fonts across all sections" />
                     
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Font Family</label>
                              <select 
                                value={footer.typography.fontFamily} 
                                onChange={e => handleUpdate('typography', { ...footer.typography, fontFamily: e.target.value })}
                                className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white outline-none font-bold"
                              >
                                {googleFonts.map(f => <option key={f} value={f}>{f}</option>)}
                              </select>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Global Font Color</label>
                              <div className="flex gap-4">
                                <input 
                                  type="color" 
                                  value={footer.typography.color} 
                                  onChange={e => handleUpdate('typography', { ...footer.typography, color: e.target.value })}
                                  className="w-14 h-14 rounded-xl cursor-pointer"
                                />
                                <input 
                                  type="text" 
                                  value={footer.typography.color} 
                                  disabled
                                  className="flex-1 p-4 border rounded-xl bg-gray-50 font-mono text-sm uppercase"
                                />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Heading Color (Accent)</label>
                              <div className="flex gap-4">
                                <input 
                                  type="color" 
                                  value={footer.typography.headingColor} 
                                  onChange={e => handleUpdate('typography', { ...footer.typography, headingColor: e.target.value })}
                                  className="w-14 h-14 rounded-xl cursor-pointer"
                                />
                                <input 
                                  type="text" 
                                  value={footer.typography.headingColor} 
                                  disabled
                                  className="flex-1 p-4 border rounded-xl bg-gray-50 font-mono text-sm uppercase"
                                />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Base Size</label>
                                <input 
                                  type="text" 
                                  value={footer.typography.fontSize} 
                                  onChange={e => handleUpdate('typography', { ...footer.typography, fontSize: e.target.value })}
                                  className="w-full p-4 border rounded-xl bg-gray-50 font-bold"
                                  placeholder="14px"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Weight</label>
                                <select 
                                  value={footer.typography.fontWeight} 
                                  onChange={e => handleUpdate('typography', { ...footer.typography, fontWeight: e.target.value })}
                                  className="w-full p-4 border rounded-xl bg-gray-50 font-bold"
                                >
                                  <option value="300">Light</option>
                                  <option value="400">Regular</option>
                                  <option value="500">Medium</option>
                                  <option value="600">Semi Bold</option>
                                  <option value="700">Bold</option>
                                  <option value="900">Black</option>
                                </select>
                              </div>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Letter Spacing</label>
                              <input 
                                type="text" 
                                value={footer.typography.letterSpacing} 
                                onChange={e => handleUpdate('typography', { ...footer.typography, letterSpacing: e.target.value })}
                                className="w-full p-4 border rounded-xl bg-gray-50 font-bold"
                                placeholder="0px"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'background' && (
                  <div className="space-y-10">
                    <SectionLabel title="Background Canvas" subtitle="Configure color, gradients, and images" />
                    
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Background Color</label>
                             <input 
                               type="color" 
                               value={footer.backgroundColor} 
                               onChange={e => handleUpdate('backgroundColor', e.target.value)}
                               className="w-full h-20 rounded-2xl cursor-pointer border-0 p-0"
                             />
                          </div>
                          <div>
                             <label className="block text-sm font-bold text-gray-700 mb-2">Linear Gradient CSS (Optional)</label>
                             <textarea 
                               value={footer.backgroundGradient || ''} 
                               onChange={e => handleUpdate('backgroundGradient', e.target.value)}
                               rows={3}
                               className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white outline-none font-mono text-xs"
                               placeholder="linear-gradient(135deg, #111 0%, #333 100%)"
                             />
                          </div>
                       </div>

                       <div className="space-y-6">
                          <label className="block text-sm font-bold text-gray-700">Canvas Image</label>
                          <div className="relative group w-full h-44 border-4 border-dashed rounded-3xl flex flex-col items-center justify-center bg-gray-50 hover:bg-white transition-all overflow-hidden text-center p-4">
                            {footer.backgroundImage ? (
                              <>
                                <img src={`http://localhost:5002/${footer.backgroundImage}`} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                                <div className="z-10 bg-white/80 p-3 rounded-xl shadow-lg flex flex-col items-center">
                                  <Upload size={20} className="text-orange-600 mb-1" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Change Pattern</span>
                                </div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); handleUpdate('backgroundImage', ''); }}
                                  className="absolute top-2 right-2 z-20 bg-red-500 text-white p-2 rounded-full hover:scale-110 active:scale-90 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <Upload size={30} className="text-gray-300" />
                                <span className="text-xs font-bold text-gray-400">Click to upload BG Image</span>
                              </div>
                            )}
                            <input 
                              type="file" 
                              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], 'backgroundImage')}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="space-y-8">
                     <SectionLabel title="Custom Social Icons" subtitle="Upload your own icons and define any destination" />
                     
                     <div className="space-y-4">
                        {footer.socialLinks.map((social: any, idx: number) => (
                          <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-orange-100 transition-all items-center group">
                             <div className="relative w-16 h-16 bg-white rounded-xl border flex items-center justify-center overflow-hidden shrink-0 group-hover:shadow-lg transition-all">
                                {social.icon ? (
                                   <img src={`http://localhost:5002/${social.icon}`} className="w-10 h-10 object-contain" />
                                ) : (
                                   <Share2 className="text-gray-300" size={24} />
                                )}
                                <input 
                                  type="file" 
                                  onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], 'socialLinks', 'icon', idx)}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                             </div>
                             
                             <div className="flex-1 grid grid-cols-2 gap-4">
                                <input 
                                  placeholder="Platform Name (e.g. WhatsApp)"
                                  value={social.name}
                                  onChange={e => {
                                    const newList = [...footer.socialLinks];
                                    newList[idx].name = e.target.value;
                                    handleUpdate('socialLinks', newList);
                                  }}
                                  className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-orange-500 outline-none text-sm font-bold"
                                />
                                <input 
                                  placeholder="Full URL (https://...)"
                                  value={social.link}
                                  onChange={e => {
                                    const newList = [...footer.socialLinks];
                                    newList[idx].link = e.target.value;
                                    handleUpdate('socialLinks', newList);
                                  }}
                                  className="p-3 border rounded-xl bg-white focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                                />
                             </div>
                             
                             <button 
                               onClick={() => handleUpdate('socialLinks', footer.socialLinks.filter((_: any, i: number) => i !== idx))}
                               className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                             >
                                <Trash2 size={20} />
                             </button>
                          </div>
                        ))}
                        
                        <button 
                          onClick={() => handleUpdate('socialLinks', [...footer.socialLinks, { name: '', icon: '', link: '' }])}
                          className="w-full py-4 border-2 border-dashed rounded-2xl text-orange-600 font-black flex items-center justify-center gap-2 hover:bg-orange-50 transition-all active:scale-95"
                        >
                           <Plus size={20} /> Add New Social Link
                        </button>
                     </div>
                  </div>
                )}

                {/* Other tabs use generic components */}
                {activeTab === 'links' && (
                  <ColumnManager 
                    items={footer.quickLinks} 
                    onUpdate={(v: any) => handleUpdate('quickLinks', v)} 
                    title="Quick Navigation"
                  />
                )}

                {activeTab === 'products' && (
                  <ProductMapManager 
                    items={footer.products} 
                    onUpdate={(v: any) => handleUpdate('products', v)} 
                  />
                )}

                {activeTab === 'contact' && (
                  <ContactManager 
                    data={footer.contact} 
                    onUpdate={(v: any) => handleUpdate('contact', v)} 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- LIVE PREVIEW COLUMN --- */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <div className="bg-gray-900 rounded-[40px] p-2 shadow-2xl overflow-hidden border-8 border-gray-800">
               <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
                  <span className="w-12 h-1.5 bg-gray-700 rounded-full"></span>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
               </div>
               
               <div 
                  className="min-h-[700px] p-8 relative overflow-y-auto no-scrollbar pt-20"
                  style={{ 
                    backgroundColor: footer.backgroundColor,
                    backgroundImage: footer.backgroundGradient || (footer.backgroundImage ? `url(http://localhost:5002/${footer.backgroundImage})` : 'none'),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    fontFamily: footer.typography.fontFamily,
                    fontSize: footer.typography.fontSize,
                    fontWeight: footer.typography.fontWeight,
                    color: footer.typography.color,
                    letterSpacing: footer.typography.letterSpacing
                  }}
               >
                  {/* Overlay */}
                  {footer.backgroundImage && !footer.backgroundGradient && <div className="absolute inset-0 bg-black/40"></div>}

                  <div className="relative z-10 space-y-12">
                     {footer?.showLogo && (
                        <div className="text-center">
                          <img 
                            src={footer?.logo ? `http://localhost:5002/${footer.logo}` : '/placeholder-logo.png'} 
                            className="h-10 mx-auto mb-4" 
                          />
                          <p className="text-[10px] opacity-60 px-4">Innovating Industrial Solutions since 1991</p>
                        </div>
                     )}

                     {footer.showQuickLinks && (
                        <div>
                           <PreviewHeading color={footer.typography.headingColor}>Quick Links</PreviewHeading>
                           <ul className="mt-4 space-y-2 text-[11px] opacity-70">
                              {footer.quickLinks.slice(0, 4).map((l: any, i: number) => <li key={i}>→ {l.name}</li>)}
                           </ul>
                        </div>
                     )}

                     {footer.showSocials && (
                        <div>
                           <PreviewHeading color={footer.typography.headingColor}>Follow Us</PreviewHeading>
                           <div className="mt-4 flex flex-wrap gap-2">
                              {footer.socialLinks.map((s: any, i: number) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                                   {s.icon ? (
                                      <img src={`http://localhost:5002/${s.icon}`} className="w-5 h-5 object-contain" />
                                   ) : <Share2 size={12} />}
                                </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {footer.showContact && (
                        <div>
                           <PreviewHeading color={footer.typography.headingColor}>Contact</PreviewHeading>
                           <div className="mt-4 space-y-2 text-[10px] opacity-70">
                             <p>{footer.contact.address.substring(0, 40)}...</p>
                             <p className="text-orange-400 font-bold">{footer.contact.phones[0]}</p>
                           </div>
                        </div>
                     )}
                     
                     {footer.showBottom && (
                        <div className="pt-8 border-t border-white/10 text-[8px] text-center opacity-40 uppercase tracking-widest">
                           {footer.bottom.copyright}
                        </div>
                     )}
                  </div>
               </div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-start gap-4">
               <Eye className="text-orange-600 shrink-0" size={24} />
               <div>
                  <h4 className="font-black text-orange-950 text-sm">Real-time Visualization</h4>
                  <p className="text-xs text-orange-800 leading-relaxed mt-1">This preview uses your selected <strong>{footer.typography.fontFamily}</strong> font and active background styles.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionLabel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-black text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
    </div>
  );
}

function VisibilityToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${value ? 'border-orange-200 bg-orange-50' : 'border-gray-100 opacity-60'}`}>
       <span className="text-xs font-black uppercase tracking-wider">{label}</span>
       <button 
         onClick={() => onChange(!value)}
         className={`w-12 h-6 rounded-full relative transition-all ${value ? 'bg-orange-600' : 'bg-gray-300'}`}
       >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'right-1' : 'left-1'}`}></div>
       </button>
    </div>
  );
}

function PreviewHeading({ children, color }: any) {
  return <h4 style={{ color }} className="text-[12px] font-black border-b border-white/20 pb-1 mb-2 uppercase tracking-widest">{children}</h4>;
}

function ColumnManager({ items, onUpdate, title }: any) {
  const addItem = () => onUpdate([...items, { name: 'New Link', link: '#' }]);
  return (
    <div className="space-y-6">
       <SectionLabel title={title} subtitle="Manage column navigation items" />
       {items.map((item: any, idx: number) => (
         <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border items-center group">
            <span className="text-xs font-black text-gray-300">0{idx + 1}</span>
            <input 
              value={item.name}
              onChange={e => {
                const n = [...items];
                n[idx].name = e.target.value;
                onUpdate(n);
              }}
              className="flex-1 bg-transparent font-bold outline-none"
              placeholder="Label"
            />
            <input 
              value={item.link}
              onChange={e => {
                const n = [...items];
                n[idx].link = e.target.value;
                onUpdate(n);
              }}
              className="flex-1 bg-transparent text-sm text-gray-400 outline-none"
              placeholder="/url"
            />
            <button onClick={() => onUpdate(items.filter((_: any, i: number) => i !== idx))} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
               <Trash2 size={18} />
            </button>
         </div>
       ))}
       <button onClick={addItem} className="text-orange-600 font-black">+ Create New Link</button>
    </div>
  );
}

function ContactManager({ data, onUpdate }: any) {
  return (
    <div className="space-y-8">
       <SectionLabel title="Contact Intelligence" subtitle="Dynamic address and communication channels" />
       <div className="grid grid-cols-2 gap-8">
          <div className="col-span-2">
             <label className="text-sm font-bold text-gray-700">Full Postal Address</label>
             <textarea 
               value={data.address}
               onChange={e => onUpdate({ ...data, address: e.target.value })}
               className="w-full p-4 border rounded-2xl mt-2 bg-gray-50 font-medium"
               rows={3}
             />
          </div>
          <div>
             <label className="text-sm font-bold text-gray-700 mb-2 block">Phone Numbers</label>
             {data.phones.map((p: string, i: number) => (
               <div key={i} className="flex gap-2 mb-2">
                 <input value={p} onChange={e => {
                   const n = [...data.phones];
                   n[i] = e.target.value;
                   onUpdate({ ...data, phones: n });
                 }} className="flex-1 p-3 border rounded-xl text-sm" />
                 <button onClick={() => onUpdate({ ...data, phones: data.phones.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">×</button>
               </div>
             ))}
             <button onClick={() => onUpdate({ ...data, phones: [...data.phones, ''] })} className="text-xs text-orange-600 font-bold">+ Add Phone</button>
          </div>
          <div>
             <label className="text-sm font-bold text-gray-700 mb-2 block">Email Channels</label>
             {data.emails.map((p: string, i: number) => (
               <div key={i} className="flex gap-2 mb-2">
                 <input value={p} onChange={e => {
                   const n = [...data.emails];
                   n[i] = e.target.value;
                   onUpdate({ ...data, emails: n });
                 }} className="flex-1 p-3 border rounded-xl text-sm" />
                 <button onClick={() => onUpdate({ ...data, emails: data.emails.filter((_: any, idx: number) => idx !== i) })} className="text-red-400">×</button>
               </div>
             ))}
             <button onClick={() => onUpdate({ ...data, emails: [...data.emails, ''] })} className="text-xs text-orange-600 font-bold">+ Add Email</button>
          </div>
       </div>
    </div>
  );
}

function ProductMapManager({ items, onUpdate }: any) {
  const [all, setAll] = useState<any[]>([]);
  useEffect(() => {
    fetchAPI('/products').then(res => res.success && setAll(res.data));
  }, []);

  const toggle = (p: any) => {
    const exists = items.find((i: any) => i.productId === p._id);
    if (exists) onUpdate(items.filter((i: any) => i.productId !== p._id));
    else onUpdate([...items, { productId: p._id, name: p.name, link: `/products/${p.slug}`, show: true }]);
  };

  return (
    <div className="space-y-8">
       <SectionLabel title="Products Synchronization" subtitle="Auto-fetch from inventory for footer mapping" />
       <div className="grid grid-cols-3 gap-3 h-64 overflow-y-auto p-4 border rounded-3xl bg-gray-50 no-scrollbar">
          {all.map(p => {
             const active = items.find((i: any) => i.productId === p._id);
             return (
               <button 
                 key={p._id} 
                 onClick={() => toggle(p)}
                 className={`p-3 text-left rounded-xl text-xs font-bold transition-all border ${active ? 'bg-orange-100 border-orange-400 text-orange-950' : 'bg-white opacity-60 hover:opacity-100'}`}
               >
                 {p.name}
               </button>
             );
          })}
       </div>
       <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 p-4 bg-white border rounded-2xl items-center shadow-sm">
               <Layers size={16} className="text-orange-300" />
               <input 
                 value={item.name}
                 onChange={e => {
                   const n = [...items];
                   n[i].name = e.target.value;
                   onUpdate(n);
                 }}
                 className="flex-1 font-black text-sm outline-none"
               />
               <span className="text-[10px] text-gray-400 font-mono italic">{item.link}</span>
               <button onClick={() => {
                 const n = [...items];
                 n[i].show = !n[i].show;
                 onUpdate(n);
               }} className={`text-xl ${item.show ? 'grayscale-0' : 'grayscale text-gray-200'}`}>{item.show ? '👁️' : '🕶️'}</button>
            </div>
          ))}
       </div>
    </div>
  );
}
