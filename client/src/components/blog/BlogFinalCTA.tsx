'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessagesSquare, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogFinalCTA() {
  return (
    <section className="py-40 bg-[#ff6a00] relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[#1A1F2C] opacity-[0.03] mix-blend-multiply pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-black/20 pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             viewport={{ once: true }}
             className="space-y-6"
           >
              <h2 className="text-5xl md:text-8xl lg:text-[100px] font-black text-[#1A1F2C] leading-none tracking-tighter uppercase mb-6">
                Need Expert <br/> <span className="text-white drop-shadow-2xl">Packaging Advice?</span>
              </h2>
              <p className="text-[#1A1F2C] text-xl md:text-2xl font-black max-w-2xl mx-auto opacity-80 leading-relaxed">
                Connect with our engineering team for a technical consultation on your next export project.
              </p>
           </motion.div>

           <motion.div
             initial={{ y: 20, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col md:flex-row items-center justify-center gap-8"
           >
              <Link 
                href="/contact" 
                className="w-full md:w-auto px-16 py-8 bg-[#1A1F2C] text-white rounded-[32px] font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:text-[#ff6a00] transition-all shadow-2xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4 group"
              >
                Request Consultation <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <a 
                href="mailto:sales@europackindia.in" 
                className="w-full md:w-auto px-16 py-8 bg-white/20 backdrop-blur-md border px-12 border-white/30 text-white rounded-[32px] font-black uppercase text-sm tracking-[0.2em] hover:bg-white/30 transition-all flex items-center justify-center gap-4"
              >
                <MessagesSquare size={20} /> Talk To Sales
              </a>
           </motion.div>

           <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-12">
              {[
                { label: "Rapid Quote", icon: <Calendar size={14}/> },
                { label: "Technical Support", icon: <MessagesSquare size={14}/> },
                { label: "Global Presence", icon: <ArrowRight size={14}/> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60 text-[10px] font-black uppercase tracking-widest">
                   {item.icon} {item.label}
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
