'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, BookOpen } from 'lucide-react';

export default function BlogHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center pt-[140px] overflow-hidden bg-[#0a0d14]">
      {/* Moving Particles / Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:40px_40px] animate-[pulse_8s_infinite_alternate]" />
        
        {/* Floating Particles Simulation */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100 + 'px'],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-[#ff6a00] rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff6600] text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6a00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff6a00]"></span>
            </span>
            FAQ
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8"
          >
            Technical <br />
            <span className="relative inline-block text-[#ff6a00]">
              Insights
              <motion.span 
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  textShadow: [
                    "0 0 20px rgba(255,106,0,0.3)",
                    "0 0 50px rgba(255,106,0,0.6)",
                    "0 0 20px rgba(255,106,0,0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 blur-xl opacity-50"
              >
                Insights
              </motion.span>
            </span>
            <span className="text-white">.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium mb-12"
          >
            The global authority on industrial packaging compliance, structural lashing engineering, and export safety protocols. Empowering logistics leaders since 1993.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="px-10 py-5 bg-[#ff6a00] text-white rounded-[20px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-[#e65c00] transition-all shadow-2xl shadow-orange-500/20 hover:-translate-y-1 active:scale-95 group">
              <BookOpen size={18} /> Explore Guides <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[20px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-white/10 transition-all backdrop-blur-md">
              <Search size={18} /> Knowledge Base
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
