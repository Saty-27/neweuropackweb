'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { partnersList as logos } from '@/data/partners';

export default function BlogTrust() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Our Intelligence Informs Leaders at:</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           {logos.map((l, i) => (
             <img 
              key={i} 
              src={l.src} 
              alt={l.name} 
              title={l.name}
              className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-110" 
            />
           ))}
        </div>
      </div>
    </section>
  );
}
