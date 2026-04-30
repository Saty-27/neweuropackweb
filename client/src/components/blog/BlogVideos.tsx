'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, PlayCircle, Clock } from 'lucide-react';

const videos = [
  { title: "Heavy Crating Process", duration: "1:45", img: "/images/service_crate_packing.png" },
  { title: "Vacuum Sealing Demo", duration: "2:20", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop" },
  { title: "Ocean Lashing Strength", duration: "3:15", img: "https://images.unsplash.com/photo-1590496793910-3837a7f4749f?q=80&w=800&auto=format&fit=crop" }
];

export default function BlogVideos() {
  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#ff6a00]/10 text-[#ff6a00] text-[10px] font-black uppercase tracking-widest rounded-full">Visual Intelligence</div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Process <span className="text-[#ff6a00]">Insights.</span></h2>
           </div>
           <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Explore Video Vault <PlayCircle size={16}/>
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {videos.map((vid, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="relative aspect-video rounded-[32px] overflow-hidden group cursor-pointer"
             >
                <img src={vid.img} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#ff6a00] group-hover:scale-110 transition-all duration-500">
                         <Play size={16} fill="white" />
                      </div>
                      <h3 className="text-xl font-black text-white">{vid.title}</h3>
                   </div>
                   <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1">
                      <Clock size={12}/> {vid.duration} Tutorial
                   </div>
                </div>

                {/* Animated Ring on Hover */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 rounded-[24px] transition-all duration-500" />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
