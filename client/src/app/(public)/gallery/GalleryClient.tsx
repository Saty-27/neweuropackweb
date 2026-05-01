'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  ArrowRight, 
  Filter, 
  X, 
  Zap, 
  ArrowUpRight,
  Maximize2,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  ChevronLeft,
  ChevronRight,
  Info,
  ExternalLink,
  Target,
  Clock
} from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryClientProps {
  items: any[];
  settings: any;
}

export default function GalleryClient({ items, settings }: GalleryClientProps) {
  const { openEnquiryModal } = useModal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(items.map(i => i.category))];
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return items;
    return items.filter(i => i.category === activeFilter);
  }, [items, activeFilter]);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Handle local frontend public assets
    let fullPath = '';
    if (path.startsWith('/images') || path.startsWith('images')) {
      fullPath = path.startsWith('/') ? path : `/${path}`;
    } else {
      // Handle backend uploads
      fullPath = `https://europackindia.com/${path}`;
    }
    return encodeURI(fullPath);
  };

  const openLightbox = (item: any, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
    document.body.style.overflow = 'auto';
  };

  const nextItem = () => {
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
    setSelectedIndex(nextIdx);
  };

  const prevItem = () => {
    const prevIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
    setSelectedIndex(prevIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, selectedIndex, filteredItems]);

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#0B0F19] text-white">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6600]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
         
         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-4xl mx-auto"
            >
               <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.3em] mb-10 backdrop-blur-md">
                  <Target size={16} /> Engineering Excellence
               </div>
               
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[1.1] mb-10">
                  <span className="text-white opacity-95">
                    Industrial
                  </span>
                  <br />
                  <span className="text-[#FF6600]">
                    Portfolio
                  </span>
               </h1>
               
               <p className="max-w-2xl mx-auto text-slate-400 font-bold uppercase tracking-[0.25em] text-[10px] md:text-xs leading-relaxed opacity-70">
                  {settings?.subtitle || 'Strategic industrial packaging assets engineered for precision, protection, and performance.'}
               </p>
            </motion.div>
         </div>

         {/* Decorative Background Element */}
         <div className="absolute inset-0 bg-[url('/images/banners/welcome-bg.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </section>

      {/* Filter Matrix */}
      <section className="py-12 bg-white border-b border-slate-100 sticky top-24 z-[100] backdrop-blur-md bg-white/95">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF6600]">
                    <Filter size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6600] mb-0.5">Filter</p>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-800">Capability Matrix</span>
                  </div>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-3">
                  {categories.map((cat) => (
                     <button
                       key={cat}
                       onClick={() => setActiveFilter(cat)}
                       className={`px-8 py-4 rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all duration-500 hover:shadow-xl active:scale-95 border ${activeFilter === cat ? 'bg-[#FF6600] text-white border-[#FF6600] shadow-2xl shadow-orange-500/30 scale-105' : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900 hover:bg-slate-100'}`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Portfolio Grid Matrix */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
               <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                     <motion.div
                       layout
                       key={item._id}
                       initial={{ opacity: 0, scale: 0.95, y: 30 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.9, y: 20 }}
                       transition={{ duration: 0.5 }}
                       className="group cursor-pointer relative"
                       onClick={() => openLightbox(item, index)}
                     >
                        <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden bg-slate-100 shadow-xl border border-slate-50 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-orange-500/10 group-hover:-translate-y-4">
                           {/* Media Layer */}
                           <div className="absolute inset-0">
                              <img 
                                src={getImageUrl(item.image?.url)} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[3000ms]" 
                                alt={item.image?.alt || item.title}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-100" />
                           </div>

                           {/* Icon Indicator */}
                           <div className="absolute top-8 right-8 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
                              {item.type === 'video' ? <Play size={24} fill="white" /> : <Maximize2 size={24} />}
                           </div>

                           {/* Narrative Overlay (Shown on Hover) */}
                           <div className="absolute inset-0 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6600] rounded-full text-[9px] font-black text-white uppercase tracking-widest mb-4 w-fit">
                                 {item.type === 'video' ? <VideoIcon size={10} /> : <ImageIcon size={10} />}
                                 {item.category}
                              </div>
                              <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-3 uppercase">{item.title}</h3>
                              <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                                 View Strategy Details <ArrowRight size={14} className="text-[#FF6600]" />
                              </div>
                           </div>
                        </div>

                        {/* Tag Strip */}
                        <div className="mt-6 flex flex-wrap gap-3 px-8">
                           {item.tags?.slice(0, 3).map((t: string) => (
                              <span key={t} className="text-[10px] font-black uppercase text-slate-300 tracking-widest">#{t}</span>
                           ))}
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
               <div className="text-center py-40 bg-slate-50 rounded-[64px] border border-dashed border-slate-200">
                  <Plus size={64} className="mx-auto text-slate-300 mb-6 rotate-45"/>
                  <h3 className="text-3xl font-black text-slate-400 uppercase tracking-tighter">No strategic assets found</h3>
                  <button onClick={() => setActiveFilter('All')} className="mt-8 text-[#FF6600] font-black uppercase tracking-[0.3em] text-[10px] hover:underline underline-offset-8">Reveal All Portfolio</button>
               </div>
            )}
         </div>
      </section>

      {/* Detail Showcase Modal (Lightbox) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-[#0B0F19]/98 backdrop-blur-2xl"
          >
             {/* Controls Overlay */}
             <div className="absolute inset-0 z-10 pointer-events-none">
                <button 
                  onClick={closeLightbox}
                  className="absolute top-12 right-12 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-all pointer-events-auto shadow-2xl"
                >
                  <X size={32} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevItem(); }}
                  className="absolute left-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6600] transition-all pointer-events-auto hidden md:flex shadow-2xl"
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextItem(); }}
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6600] transition-all pointer-events-auto hidden md:flex shadow-2xl"
                >
                  <ChevronRight size={32} />
                </button>
             </div>

             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 items-center"
               onClick={e => e.stopPropagation()}
             >
                {/* Media Container */}
                <div className="flex-1 w-full aspect-video lg:h-[75vh] lg:aspect-auto rounded-[64px] overflow-hidden bg-black shadow-2xl border border-white/10 relative group">
                   {selectedItem.type === 'video' ? (
                     selectedItem.videoUrl ? (
                       <video 
                         src={getImageUrl(selectedItem.videoUrl)} 
                         controls 
                         autoPlay 
                         className="w-full h-full object-contain"
                       />
                     ) : (
                       <iframe 
                         src={`https://www.youtube.com/embed/${selectedItem.videoId}?autoplay=1&rel=0&modestbranding=1`} 
                         className="w-full h-full" 
                         allow="autoplay; encrypted-media" 
                         allowFullScreen
                       />
                     )
                   ) : (
                     <img src={getImageUrl(selectedItem.image?.url)} className="w-full h-full object-contain" alt={selectedItem.title} />
                   )}
                </div>

                {/* Narrative Sidebar */}
                <div className="w-full lg:w-[450px] text-left space-y-12">
                   <div className="space-y-8">
                      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.2em]">
                         {selectedItem.type === 'video' ? <VideoIcon size={18} /> : <ImageIcon size={18} />}
                         {selectedItem.category} Excellence
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">{selectedItem.title}</h2>
                      <p className="text-slate-400 text-lg font-medium leading-relaxed opacity-80 italic">
                         "{selectedItem.description}"
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                         <Clock size={24} className="text-[#FF6600] mb-4" />
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                         <p className="text-white font-bold text-sm">Active Project</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                         <Target size={24} className="text-[#FF6600] mb-4" />
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Capability</p>
                         <p className="text-white font-bold text-sm">{selectedItem.category}</p>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2 pb-8 border-b border-white/10">
                      {selectedItem.tags?.map((t: string) => (
                         <span key={t} className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">#{t}</span>
                      ))}
                   </div>

                   <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => { closeLightbox(); openEnquiryModal(); }}
                        className="w-full py-6 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 hover:bg-[#e65c00] transition-all shadow-2xl shadow-orange-500/20"
                      >
                         Enquire Strategy <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={closeLightbox}
                        className="w-full py-6 bg-white/5 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] border border-white/10 hover:bg-white/10 transition-all"
                      >
                         Return to Portfolio
                      </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Transition CTA */}
      <section className="py-40 bg-slate-50 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
         <div className="container mx-auto px-6 relative z-10 text-center space-y-14">
            <div className="flex items-center justify-center gap-8 mb-4">
               <div className="w-20 h-[2px] bg-slate-900/10" />
               <Zap className="text-[#FF6600]" size={40} />
               <div className="w-20 h-[2px] bg-slate-900/10" />
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">
               Scale Your Operational <br /> <span className="text-[#FF6600]">Intensity.</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.35em] text-[11px] max-w-xl mx-auto leading-relaxed">
               Strategic industrial assets engineered for precision, protection, and performance. Delivering world-class transit security across global hubs.
            </p>
            <div className="pt-10">
               <button onClick={openEnquiryModal} className="inline-flex items-center gap-10 px-20 py-8 bg-slate-950 text-white rounded-[40px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-[#FF6600] transition-all group">
                  Initiate Strategic Quote <ArrowRight size={20} className="group-hover:translate-x-4 transition-all" />
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
