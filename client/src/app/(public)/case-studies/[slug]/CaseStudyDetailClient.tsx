'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  
  Search, Type, Palette, CheckCircle2, Download, AlertCircle, 
  Play, Video as VideoIcon, Layers, Table as TableIcon, Code, 
  CheckSquare, ArrowRight, MoveUp, MoveDown, Package, Upload, Zap, BookOpen,
  Calendar, User, X, ChevronRight, Target, Plus, Trash2, Settings, Layout, Eye, Video, FileText, Globe
} from 'lucide-react';
import Link from 'next/link';

interface CaseStudyDetailClientProps {
  item: any;
}

export default function CaseStudyDetailClient({ item }: CaseStudyDetailClientProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-16"
          >
             <div 
                className="prose prose-slate lg:prose-xl max-w-none text-slate-600 font-medium leading-relaxed indent-12"
                dangerouslySetInnerHTML={{ __html: section.content }}
             />
          </motion.div>
        );

      case 'heading':
        const HeadingTag = section.level || 'h2';
        const classes = {
          h1: "text-5xl font-black mb-12",
          h2: "text-4xl font-black mb-10",
          h3: "text-2xl font-black mb-8"
        };
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
             <HeadingTag className={`${classes[section.level as keyof typeof classes]} text-slate-900 tracking-tighter uppercase border-l-8 border-[#FF6600] pl-8`}>
                {section.content}
             </HeadingTag>
          </motion.div>
        );

      case 'image':
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-6 mb-16"
          >
             <div className="rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-slate-50 group">
                <img src={getImageUrl(section.url)} className="w-full h-auto group-hover:scale-105 transition-all duration-[3000ms]" alt={section.alt} />
             </div>
             {section.alt && <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">— {section.alt}</p>}
          </motion.div>
        );

      case 'process_flow':
        return (
          <div key={index} className="container mx-auto px-6 mb-24 py-16 bg-slate-950 rounded-[48px] overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6600]/10 blur-[100px] rounded-full" />
             <div className="text-center mb-16">
                <h3 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.4em] mb-2 px-6">Operational Continuity Matrix</h3>
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Integrated Process Flow</h2>
             </div>
             <div className="flex flex-wrap justify-center gap-10">
                {section.steps.map((step: string, sidx: number) => (
                  <motion.div 
                    key={sidx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sidx * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                     <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl font-black group-hover:bg-[#FF6600] group-hover:border-[#FF6600] transition-all duration-500 shadow-2xl shadow-orange-500/0 group-hover:shadow-orange-500/20">
                           {sidx + 1}
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest text-center max-w-[120px] leading-relaxed group-hover:text-[#FF6600] transition-colors">{step}</span>
                     </div>
                     {sidx < section.steps.length - 1 && (
                       <ArrowRight size={24} className="text-white/10 group-hover:text-[#FF6600] transition-all hidden lg:block" />
                     )}
                  </motion.div>
                ))}
             </div>
          </div>
        );

      case 'table':
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20 p-12 bg-white rounded-[64px] border border-slate-100 shadow-2xl space-y-8"
          >
             <div className="flex items-center gap-6 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#FF6600] flex items-center justify-center shadow-xl">
                   <TableIcon size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Technical Specifications</h3>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Measured Industrial Artifacts</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.data.map((row: any, ridx: number) => (
                  <div key={ridx} className="flex justify-between p-6 bg-slate-50 rounded-[24px] border border-white group hover:border-[#FF6600]/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-orange-100/50">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.key}</span>
                     <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{row.value}</span>
                  </div>
                ))}
             </div>
          </motion.div>
        );

      case 'results':
        return (
          <div key={index} className="container mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-1 py-10">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Zap size={20} />
                   </div>
                   <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em]">Operational Impact</h3>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Measured Successful Landmarks.</h2>
             </div>
             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.points.map((pt: string, pidx: number) => (
                  <motion.div 
                    key={pidx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: pidx * 0.1 }}
                    className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 flex gap-6 group hover:translate-x-2 transition-all duration-500"
                  >
                     <div className="w-12 h-12 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                        <CheckSquare size={24} />
                     </div>
                     <p className="text-[11px] font-black text-emerald-900 uppercase tracking-widest leading-relaxed pt-1">
                        {pt}
                     </p>
                  </motion.div>
                ))}
             </div>
          </div>
        );

      case 'cta':
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="container mx-auto px-6 mb-24"
          >
             <div className="bg-[#FF6600] rounded-[64px] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_20%_20%,#FFFFFF_0%,transparent_50%)]" />
                <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 relative z-10">{section.cta.heading || 'Need Similar Solutions?'}</h2>
                <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-10 opacity-70 relative z-10">Strategic Engineering Consultation</p>
                <Link href={section.cta.link || '/quote'} className="inline-flex items-center gap-6 px-12 py-6 bg-white text-[#FF6600] rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-110 active:scale-95 group relative z-10">
                   {section.cta.buttonText || 'Initiate Strategic Quote'} <ArrowRight className="group-hover:translate-x-2 transition-all" />
                </Link>
             </div>
          </motion.div>
        );

      case 'html':
        return <div key={index} className="container mx-auto px-6 mb-24" dangerouslySetInnerHTML={{ __html: section.content }} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Cinematic Hero Deck */}
      <section className="relative h-[90vh] overflow-hidden bg-slate-950 flex flex-col items-center justify-center pt-20">
         <div className="absolute inset-0 z-0">
            {item.heroVideo?.embedId ? (
              <iframe 
                 src={`https://www.youtube.com/embed/${item.heroVideo.embedId}?autoplay=1&mute=1&loop=1&playlist=${item.heroVideo.embedId}&controls=0&showinfo=0&modestbranding=1`}
                 className="w-full h-full object-cover opacity-30 scale-125 blur-sm"
              />
            ) : item.heroVideo?.thumbnail && (
              <img src={getImageUrl(item.heroVideo.thumbnail)} className="w-full h-full object-cover opacity-30" alt={item.title} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-slate-950/20" />
         </div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
            >
               <span className="inline-block px-6 py-2 bg-[#FF6600] text-white rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl animate-pulse">Case Study Identity</span>
               <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">{item.title}</h1>
               <p className="max-w-2xl mx-auto text-slate-500 font-bold uppercase tracking-[0.4em] text-[11px] leading-relaxed">
                  {item.subtitle}
               </p>
               
               <div className="pt-10 flex flex-wrap justify-center gap-6">
                  {item.heroVideo?.embedId && (
                    <button 
                      onClick={() => setIsVideoModalOpen(true)}
                      className="flex items-center gap-6 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all group"
                    >
                       <div className="w-10 h-10 rounded-xl bg-[#FF6600] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
                          <Play size={20} fill="currentColor" />
                       </div>
                       View Cinematic Narrative
                    </button>
                  )}
                  <div className="flex gap-4">
                     <div className="px-6 py-5 bg-white rounded-[24px] border border-slate-100 flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-widest shadow-sm">
                        <Calendar className="text-[#FF6600]" size={16} />
                        {new Date(item.createdAt).getFullYear()} Landmark
                     </div>
                     <div className="px-6 py-5 bg-white rounded-[24px] border border-slate-100 flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-widest shadow-sm">
                        <User className="text-[#FF6600]" size={16} />
                        Strategic Europack Project
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Main Narrative Architecture Render */}
      {item.mainContent && (
        <section className="py-24 bg-white relative">
           <div className="container mx-auto px-6">
              <div 
                 className="prose prose-slate lg:prose-xl max-w-4xl mx-auto text-slate-600 font-medium leading-relaxed quill-content border-b border-slate-100 pb-24"
                 dangerouslySetInnerHTML={{ __html: item.mainContent }}
              />
           </div>
        </section>
      )}

      {/* Narrative Flow Matrix */}
      <section className="py-24 space-y-16">
         {item.sections?.map(renderSection)}
      </section>

      {/* Asset Synergy Hub (Products Used) */}
      {item.productsUsed?.length > 0 && (
        <section className="py-32 bg-slate-50 rounded-[100px] mx-6">
           <div className="container mx-auto px-6 text-center space-y-16">
              <div>
                 <h3 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.5em] mb-4">Operational Heritage</h3>
                 <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight">Project Artifact Synergy.</h2>
                 <p className="max-w-2xl mx-auto text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-4">These industrial assets were engineered and deployed specifically to ensure the success of this project narrative.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                 {item.productsUsed.map((prod: any, idx: number) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="group bg-white p-8 rounded-[48px] border border-white shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(255,102,0,0.1)] hover:-translate-y-4 transition-all duration-700 text-left"
                   >
                      <Link href={`/products/${prod.core?.slug}`} className="absolute inset-0 z-10" />
                      <div className="aspect-square rounded-[32px] overflow-hidden mb-8 bg-slate-50">
                         <img src={getImageUrl(prod.core?.mainImage)} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2000ms]" />
                      </div>
                      <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-widest block mb-1">Industrial Asset</span>
                      <h4 className="text-xl font-black text-slate-900 tracking-tighter uppercase mb-6 group-hover:text-[#FF6600] transition-colors">{prod.core?.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                         Launch Discovery <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Cinematic Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-500">
           <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-10 right-10 w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#FF6600] transition-all z-20">
              <X size={32} />
           </button>
           <div className="w-full max-w-6xl aspect-video relative rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(255,102,0,0.3)] animate-in zoom-in-95 duration-700">
              <iframe 
                 src={`https://www.youtube.com/embed/${item.heroVideo.embedId}?autoplay=1`}
                 className="w-full h-full"
                 allow="autoplay"
              />
           </div>
        </div>
      )}
    </div>
  );
}
