'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    title: "12-Ton Transformer Export",
    client: "Siemens India",
    challenge: "Extreme G-force risks and sea-spray corrosion for a 45-day ocean transit.",
    solution: "Custom-engineered reinforced crate with 12te lashing system and VCI vacuum sealing.",
    img: "/images/service_crate_packing.png"
  },
  {
    title: "Precision Lab Equipment",
    client: "Piramal Healthcare",
    challenge: "GMP-compliant sterile packaging for US FDA inspection requirements.",
    solution: "Class 10,000 cleanroom barrier packing with specialized aluminum foil.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogCaseStudies() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter">Technical <span className="text-[#ff6a00]">Insights.</span></h2>
           </div>
           <Link href="/case-studies" className="px-10 py-5 bg-[#1A1F2C] text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-[#ff6a00] transition-all">
              All Case Studies <ArrowRight size={18}/>
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           {cases.map((c, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group flex flex-col bg-slate-50 rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
             >
                <div className="aspect-[16/9] relative overflow-hidden">
                   <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
                   <div className="absolute top-8 left-8 px-5 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1F2C]">
                      Client: {c.client}
                   </div>
                </div>

                <div className="p-12 space-y-10">
                   <h3 className="text-3xl font-black text-[#1A1F2C] tracking-tight">{c.title}</h3>
                   
                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <AlertTriangle size={16} />
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">The Challenge</p>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">{c.challenge}</p>
                         </div>
                      </div>

                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                            <CheckCircle2 size={16} />
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">The Solution</p>
                            <p className="text-sm font-black text-[#1A1F2C] leading-relaxed">{c.solution}</p>
                         </div>
                      </div>
                   </div>

                   <button className="text-xs font-black uppercase tracking-widest text-[#1A1F2C] underline decoration-[#ff6a00] decoration-2 underline-offset-8 mt-4 block hover:text-[#ff6a00] transition-colors">
                      Read Technical Analysis
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
