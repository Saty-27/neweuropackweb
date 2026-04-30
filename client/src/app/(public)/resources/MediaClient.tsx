'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Download, 
  FileText, 
  Video as VideoIcon, 
  X, 
  Search, 
  Video, 
  ChevronRight,
  ArrowRight,
  SearchIcon,
  Maximize2,
  FileBox,
  FileArchive,
  Globe,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MediaClientProps {
  items: any[];
  settings: any;
}

export default function MediaClient({ items, settings }: MediaClientProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const categories = useMemo(() => {
    return ['All', 'Videos', 'Documents', 'Case Studies'];
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesFilter = activeFilter === 'All' || 
                            (activeFilter === 'Videos' && item.type === 'video') ||
                            (activeFilter === 'Documents' && item.type === 'file') ||
                            (item.category === activeFilter);
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, searchQuery]);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const FileIcon = ({ format }: { format: string }) => {
    switch(format?.toLowerCase()) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'ppt':
      case 'pptx': return <FileBox className="text-orange-500" size={24} />;
      case 'doc':
      case 'docx': return <FileArchive className="text-blue-500" size={24} />;
      default: return <Download className="text-slate-400" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Hub Header */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900 text-white">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#FF6600_0%,transparent_50%)]" />
         </div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
               <h1 
                 style={{ 
                    fontSize: settings?.style?.title?.fontSize || '3.5rem',
                    fontWeight: settings?.style?.title?.fontWeight || '800',
                    fontFamily: settings?.style?.title?.fontFamily || 'Poppins',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.1,
                    color: settings?.style?.title?.colorPrimary || '#FFFFFF'
                 }}
                 className="mb-6 tracking-tighter"
               >
                  {settings?.title?.text || 'Our Media &'}{' '}
                  <span style={{ color: settings?.style?.title?.colorHighlight || '#FF6600' }}>
                     {settings?.title?.highlightText || 'Resources'}
                  </span>
               </h1>
               <p className="max-w-2xl mx-auto text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] leading-relaxed">
                  {settings?.subtitle || 'Strategic Industrial Intelligence, Case Studies & Operational Video Artifacts.'}
               </p>
            </motion.div>

            {/* Hub Search Matrix */}
            <div className="mt-12 max-w-xl mx-auto relative group">
               <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-[#FF6600] transition-colors" size={20} />
               <input 
                 className="w-full bg-white/5 border border-white/10 rounded-[24px] pl-16 pr-8 py-5 text-sm font-bold text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#FF6600]/40 focus:bg-white/10 outline-none transition-all"
                 placeholder="Search resource library by keyword or asset type..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
               />
            </div>
         </div>
      </section>

      {/* Controller Strip */}
      <section className="py-6 bg-slate-50 border-b border-slate-100 sticky top-0 z-[100] backdrop-blur-md bg-white/80">
         <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
               {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 ${activeFilter === cat ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/30' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100'}`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>
      </section>

      {/* Resource Matrix Grid */}
      <section className="py-24">
         <div className="container mx-auto px-6">
            <motion.div 
               layout
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
               <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                     <motion.div
                       layout
                       key={item._id}
                       initial={{ opacity: 0, scale: 0.9, y: 30 }}
                       animate={{ opacity: 1, scale: 1, y: 0 }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       transition={{ duration: 0.5, delay: index * 0.05 }}
                       className="group relative flex flex-col bg-white rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50 transition-all duration-700 hover:shadow-[0_80px_150px_-30px_rgba(255,102,0,0.15)] hover:-translate-y-4"
                     >
                        {/* Visual Asset Layer */}
                        <div className="aspect-video relative overflow-hidden bg-slate-100 shrink-0">
                           <img 
                              src={getImageUrl(item.thumbnail.url)} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[3000ms]" 
                              alt={item.thumbnail.alt || item.title}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 transition-opacity duration-700" />
                           
                           {/* Media Indicator Overlay */}
                           <div className="absolute inset-0 flex items-center justify-center">
                              {item.type === 'video' ? (
                                 <button 
                                   onClick={() => setSelectedVideo(item)}
                                   className="w-16 h-16 rounded-[24px] bg-[#FF6600] flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500 ring-8 ring-white/10"
                                 >
                                    <Play size={28} fill="currentColor" strokeWidth={2.5} />
                                 </button>
                              ) : (
                                 <a 
                                   href={getImageUrl(item.file.url)} 
                                   download={item.file.name}
                                   className="w-16 h-16 rounded-[24px] bg-slate-900 border border-white/20 flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500 group/btn"
                                 >
                                    <Download size={28} strokeWidth={2.5} className="group-hover/btn:translate-y-1 transition-all" />
                                 </a>
                              )}
                           </div>

                           <div className="absolute top-8 left-8">
                              <div className="px-4 py-1.5 bg-slate-950/40 backdrop-blur-md rounded-full border border-white/20 text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                 {item.type === 'video' ? <VideoIcon size={12} /> : <FileText size={12} />}
                                 {item.type}
                              </div>
                           </div>
                        </div>

                        {/* Narrative Content Strip */}
                        <div className="p-10 flex-1 flex flex-col justify-center">
                           <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-[0.4em] block mb-2">{item.category} Module</span>
                           <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tighter uppercase mb-2 group-hover:text-[#FF6600] transition-colors">{item.title}</h3>
                           <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest line-clamp-2">{item.subtitle}</p>
                           
                           {item.type === 'file' && (
                              <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-50">
                                 <div className="flex items-center gap-4">
                                    <FileIcon format={item.file.format} />
                                    <div className="flex flex-col">
                                       <span className="text-[10px] font-black text-slate-900 uppercase">{item.file.format} Asset</span>
                                       <span className="text-[9px] font-bold text-slate-400">{item.file.size}</span>
                                    </div>
                                 </div>
                                 <a href={getImageUrl(item.file.url)} download className="p-3 bg-slate-900 text-white rounded-xl hover:bg-[#FF6600] transition-all">
                                    <Download size={16} />
                                 </a>
                              </div>
                           )}
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>
         </div>
      </section>

      {/* YouTube Cinema Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-5xl aspect-video bg-black rounded-[48px] overflow-hidden shadow-2xl relative border border-white/10"
               onClick={e => e.stopPropagation()}
             >
                <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 text-white hover:bg-[#FF6600] transition-all z-10 flex items-center justify-center backdrop-blur-md">
                   <X size={24} />
                </button>
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedVideo.video.embedId}?autoplay=1`} 
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent pointer-events-none">
                   <h3 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">{selectedVideo.title}</h3>
                   <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{selectedVideo.subtitle}</p>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Transition CTA */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
            <div className="flex items-center justify-center gap-6 mb-4">
               <div className="w-16 h-[1px] bg-white/20" />
               <Zap className="text-[#FF6600]" />
               <div className="w-16 h-[1px] bg-white/20" />
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
               Scale Your Operational <br /> Industrial Knowledge.
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs max-w-xl mx-auto">
               Strategic industrial assets engineered for precision, protection, and performance.
            </p>
            <div className="pt-6">
               <Link href="/quote" className="inline-flex items-center gap-6 px-12 py-6 bg-[#FF6600] text-white rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all group">
                  Initiate Strategic Quote <ArrowRight className="group-hover:translate-x-2 transition-all" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
