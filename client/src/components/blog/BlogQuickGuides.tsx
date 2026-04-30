'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ShieldCheck, Zap, Info, ArrowUpRight } from 'lucide-react';

const quickGuides = [
  { title: "ISPM-15 in 5 Mins", icon: <ShieldCheck className="text-orange-500"/>, desc: "A crash course on heat treatment compliance." },
  { title: "Rust Prevention hacks", icon: <Zap className="text-blue-500"/>, desc: "3 engineering tricks to eliminate corrosion." },
  { title: "Export Checklist", icon: <Lightbulb className="text-emerald-500"/>, desc: "10 essential items before container sealing." },
  { title: "Wood vs Plastic", icon: <Info className="text-purple-500"/>, desc: "Choosing the right pallet for air vs sea freight." }
];

export default function BlogQuickGuides() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
           <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">Rapid Learning</div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter">Fast-Track <br/> <span className="text-[#ff6a00]">Knowledge.</span></h2>
           </div>
           <p className="text-slate-500 font-medium max-w-sm">Essential industrial packaging knowledge distilled into 5-minute actionable guides.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {quickGuides.map((guide, i) => (
             <motion.div
               key={i}
               whileHover={{ scale: 1.05, rotate: 1 }}
               className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
             >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-[#1A1F2C] group-hover:text-white transition-all">
                   {guide.icon}
                </div>
                <h3 className="text-xl font-black text-[#1A1F2C] mb-4">{guide.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{guide.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">
                   Read Fast <ArrowUpRight size={14}/>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
