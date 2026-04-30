'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  FileText, 
  Video, 
  Download,
  Filter,
  Video as VideoIcon,
  Layout,
  Palette,
  Target,
  Globe,
  Grid,
  ChevronRight,
  ArrowUpRight,
  Play
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import MediaForm from '../../../components/admin/MediaForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaManager() {
  const [items, setItems] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'item' | 'settings'>('item');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [itemsRes, settingsRes] = await Promise.all([
        fetchAPI('/media/items?admin=true'),
        fetchAPI('/media/settings')
      ]);
      if (itemsRes.success) setItems(itemsRes.data);
      if (settingsRes.success) setSettings(settingsRes.data);
    } catch (error) {
      toast.error('Resource retrieval failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Decommission this industrial asset?')) return;
    try {
      const res = await fetchAPI(`/media/items/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Asset decommissioned');
        loadData();
      }
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const toggleVisibility = async (item: any) => {
    try {
      const res = await fetchAPI(`/media/items/${item._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ visible: !item.visible })
      });
      if (res.success) loadData();
    } catch (error) {
      toast.error('Visibility protocol failed');
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
             Media Architect <VideoIcon className="text-[#FF6600]" size={36} />
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
             Industrial Resource Scaling <span className="w-8 h-[2px] bg-slate-200" /> {items.length} Assets Mapped
          </p>
        </div>
        
        <div className="flex gap-4">
           <button 
             onClick={() => { setFormMode('settings'); setIsFormOpen(true); }}
             className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-100 shadow-xl hover:bg-slate-50 transition-all active:scale-95"
           >
              <Settings size={16} /> Hub Architecture
           </button>
           <button 
             onClick={() => { setSelectedItem(null); setFormMode('item'); setIsFormOpen(true); }}
             className="flex items-center gap-2 px-8 py-4 bg-[#FF6600] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all"
           >
              <Plus size={16} /> Deploy New Asset
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Hub Master Sidebar */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] flex items-center gap-2"><Palette size={14} /> Hub Identity</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between group cursor-help">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Resource Primary</span>
                    <div className="w-8 h-8 rounded-lg shadow-inner border border-slate-100" style={{ backgroundColor: settings?.style?.title?.colorPrimary }} />
                 </div>
                 <div className="flex items-center justify-between group cursor-help">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Highlight Accent</span>
                    <div className="w-8 h-8 rounded-lg shadow-inner border border-slate-100" style={{ backgroundColor: settings?.style?.title?.colorHighlight }} />
                 </div>
                 <div className="pt-4 border-t border-slate-50">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Master Typography</p>
                    <p className="text-sm font-black text-slate-900 tracking-tight">{settings?.style?.title?.fontFamily || 'Poppins'}</p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2"><Target size={14} /> Matrix Analytics</h3>
              <div className="space-y-4 text-white/60">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <Video size={14} className="text-emerald-400" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Videos</span>
                    </div>
                    <span className="text-lg font-black text-white">{items.filter(i => i.type === 'video').length}</span>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <FileText size={14} className="text-emerald-400" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Documents</span>
                    </div>
                    <span className="text-lg font-black text-white">{items.filter(i => i.type === 'file').length}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Asset Matrix */}
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                 <input 
                   className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6600]/20 transition-all"
                   placeholder="Search by resource title, type or industrial narrative..." 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                 />
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-[#FF6600] transition-all"><Filter size={20} /></button>
           </div>

           {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1,2,3,4].map(i => <div key={i} className="h-[280px] bg-slate-100 rounded-[48px] animate-pulse" />)}
              </div>
           ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[64px] border-4 border-dashed border-slate-50 text-center">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                    <Video size={48} />
                 </div>
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">No Resources Deployed</h3>
                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2 px-12">Start by architecting individual videos and documents to build your industrial knowledge hub.</p>
              </div>
           ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
                 <AnimatePresence>
                    {filteredItems.map((item, index) => (
                      <motion.div 
                        key={item._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative bg-white rounded-[48px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-700 flex flex-col h-[320px]"
                      >
                         <div className="absolute top-6 right-6 z-10 flex gap-2">
                             <button 
                               onClick={() => { setSelectedItem(item); setFormMode('item'); setIsFormOpen(true); }}
                               className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-900 shadow-xl border border-white hover:bg-[#FF6600] hover:text-white transition-all transform hover:rotate-6"
                             >
                                <Edit3 size={16} />
                             </button>
                             <button 
                               onClick={() => toggleVisibility(item)}
                               className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-slate-900 shadow-xl border border-white hover:bg-slate-900 hover:text-white transition-all transform hover:-rotate-6"
                             >
                                {item.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                             </button>
                         </div>

                         {/* Thumbnail Visual */}
                         <div className="flex-1 relative overflow-hidden bg-slate-100">
                             {item.thumbnail?.url ? (
                                <img src={getImageUrl(item.thumbnail.url)} className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms] ${!item.visible ? 'grayscale opacity-40' : ''}`} alt={item.title} />
                             ) : (
                                <Layout size={32} className="text-slate-200 m-auto mt-20" />
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                             
                             <div className="absolute bottom-6 left-8 flex items-center gap-3">
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-2xl flex items-center gap-2 ${item.type === 'video' ? 'bg-[#FF6600]/80 text-white' : 'bg-slate-900/80 text-white'}`}>
                                   {item.type === 'video' ? <VideoIcon size={12} strokeWidth={2.5} /> : <FileText size={12} strokeWidth={2.5} />}
                                   {item.type}
                                </div>
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{item.category} Matrix</span>
                             </div>
                         </div>

                         {/* Control Strip */}
                         <div className="p-8 flex items-center justify-between bg-white group-hover:bg-slate-50 transition-all duration-500">
                            <div className="flex-1 pr-6">
                               <h4 className="text-lg font-black text-slate-900 leading-tight mb-1 tracking-tighter group-hover:text-[#FF6600] transition-colors">{item.title}</h4>
                               <p className="text-[11px] font-bold text-slate-400 leading-relaxed truncate uppercase tracking-widest">{item.subtitle}</p>
                            </div>
                            <button onClick={() => handleDelete(item._id)} className="text-slate-200 hover:text-red-500 transition-all shrink-0"><Trash2 size={16} /></button>
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           )}
        </div>
      </div>

      {/* Architect Modal Hub */}
      {isFormOpen && (
        <MediaForm 
           item={selectedItem} 
           settings={settings}
           mode={formMode}
           onClose={() => { setIsFormOpen(false); setSelectedItem(null); }} 
           onSave={() => { setIsFormOpen(false); loadData(); }} 
        />
      )}
    </div>
  );
}
