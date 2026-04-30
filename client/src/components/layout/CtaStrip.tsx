'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CtaStripProps {
  onOpenModal?: () => void;
}

export default function CtaStrip({ onOpenModal }: CtaStripProps) {
  return (
    <section className="bg-[#0B0F19] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] bg-gradient-to-r from-[#1A1F2C] via-[#2A3441] to-[#1A1F2C] p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF6600]/10 rounded-full blur-[80px] -ml-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF6600]/5 rounded-full blur-[80px] -mr-32 -mb-32" />
          
          <div className="relative z-10 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={10} /> Instant Response Assured
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Ready to discuss your <span className="text-[#FF6600]">packaging needs?</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium">
              Get a customized export packaging blueprint and commercial quote within <span className="text-white font-bold">24 hours</span>.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
            <button 
              onClick={onOpenModal}
              className="w-full sm:w-auto bg-[#FF6600] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#e65c00] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/20 active:scale-95 group"
            >
              Get Your Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
