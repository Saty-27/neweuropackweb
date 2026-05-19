'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, PlayCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const videos = [
  { 
    title: 'Europack Plywood Boxes', 
    duration: '4:32', 
    thumbnail: 'https://img.youtube.com/vi/BDI5S6lmr-Y/maxresdefault.jpg', 
    id: 'BDI5S6lmr-Y', 
  },
  { 
    title: 'Europack Wooden Pallets', 
    duration: '3:45', 
    thumbnail: 'https://img.youtube.com/vi/QtF8aynp2PM/maxresdefault.jpg', 
    id: 'QtF8aynp2PM', 
  },
  { 
    title: 'Pallets Buying Guide', 
    duration: '5:10', 
    thumbnail: 'https://img.youtube.com/vi/1xEEsgImnvA/maxresdefault.jpg', 
    id: '1xEEsgImnvA', 
  }
];

export default function BlogVideos() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
           <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-[#ff6a00]/10 text-[#ff6a00] text-[10px] font-black uppercase tracking-widest rounded-full">Visual Intelligence</div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Process <span className="text-[#ff6a00]">Insights.</span></h2>
           </div>
           <Link href="/videos" className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Explore Video Vault <PlayCircle size={16}/>
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {videos.map((vid, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="relative aspect-video rounded-[32px] overflow-hidden group cursor-pointer bg-black/50"
               onClick={() => setPlaying(vid.id)}
             >
                {playing === vid.id ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0&modestbranding=1`} 
                    className="w-full h-full" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                    
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
                    <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 rounded-[24px] transition-all duration-500 pointer-events-none" />
                  </>
                )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
