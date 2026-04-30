'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Activity,
  Box,
  ChevronRight
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { useModal } from '../../context/ModalContext';

export default function IndustriesSection() {
  const { openEnquiryModal } = useModal();
  const [industries, setIndustries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAPI('/industries');
        if (res.success) {
          setIndustries(res.data);
          if (res.data.length > 0) setActiveTab(0);
        }
      } catch (error) {
        console.error('Failed to load industries', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  if (isLoading || industries.length === 0) return null;

  const current = industries[activeTab];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Industrial Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FF6600]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-slate-100 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
           <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-1 bg-[#FF6600]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF6600]">Sector Intelligence</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                 Precision Packaging for <br /> Global Industries
              </h2>
           </div>
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-loose max-w-sm text-right lg:pb-2">
              Bespoke industrial solutions engineered for specific operational demands.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           {/* Tab Navigation */}
           <div className="lg:col-span-3 space-y-3">
              {industries.map((ind, i) => (
                 <button 
                   key={ind._id}
                   onClick={() => setActiveTab(i)}
                   className={`w-full text-left p-6 rounded-[32px] transition-all duration-500 flex items-center justify-between group ${activeTab === i ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 translate-x-4' : 'bg-slate-50 text-slate-400 hover:bg-white hover:shadow-lg'}`}
                 >
                    <span className={`text-xs font-black uppercase tracking-widest ${activeTab === i ? 'text-white' : 'group-hover:text-slate-900'}`}>{ind.title}</span>
                    <ChevronRight size={16} className={`${activeTab === i ? 'text-[#FF6600]' : 'text-slate-200'}`} />
                 </button>
              ))}
           </div>

           {/* Content Display */}
           <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={current._id}
                   initial={{ opacity: 0, x: 30 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -30 }}
                   transition={{ duration: 0.6 }}
                   className="bg-white rounded-[64px] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
                 >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                       {/* Visual Side */}
                       <div className="relative h-[400px] md:h-auto overflow-hidden bg-slate-900">
                          <img src={getImageUrl(current.image?.url)} className="absolute inset-0 w-full h-full object-cover opacity-70 hover:scale-110 transition-all duration-[3000ms]" alt={current.image?.alt || current.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                          <div className="absolute bottom-10 left-10 right-10">
                             <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-orange-900/40">
                                <Globe size={24} />
                             </div>
                             <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{current.title} Excellence</h3>
                          </div>
                       </div>

                       {/* Information Side */}
                       <div className="p-10 md:p-16 space-y-12 bg-white">
                          <div>
                             <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.4em] mb-4">Industrial Narrative</h4>
                             <p className="text-lg font-bold text-slate-500 leading-relaxed pr-6 italic">
                                {current.description}
                             </p>
                          </div>

                          {current.points?.length > 0 && (
                             <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">Sector Capabilities</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {current.points.map((p: string, i: number) => (
                                      <div key={i} className="flex items-center gap-3 group">
                                         <div className="w-2 h-2 rounded-full bg-[#FF6600] group-hover:scale-150 transition-all" />
                                         <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{p}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          )}

                          {current.specs?.length > 0 && (
                             <div className="pt-8 border-t border-slate-50">
                                <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 px-2">Technical Matrix</h4>
                                <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                                   {current.specs.map((s: any, i: number) => (
                                      <div key={i} className="bg-white p-6 flex flex-col gap-1 hover:bg-slate-50 transition-all">
                                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.key}</span>
                                         <span className="text-xs font-black text-slate-900 uppercase">{s.value}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          )}

                          <div className="pt-6">
                             <button 
                               onClick={openEnquiryModal} 
                               className="inline-flex items-center gap-4 text-[10px] font-black text-[#FF6600] uppercase tracking-widest group"
                             >
                                Request Sector Consultation <ArrowRight size={16} className="group-hover:translate-x-2 transition-all" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
