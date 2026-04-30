'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const trendingPosts = [
  { title: "Export Rules for 2026: What's New?", views: "12.5k", category: "Compliance" },
  { title: "The Physics of Zero-Shift Crating", views: "8.2k", category: "Technical" },
  { title: "Preventing Rust in Tropical Transit", views: "15.1k", category: "Guides" },
  { title: "Vacuum Packing Electronics: A Pro Guide", views: "6.7k", category: "Technical" },
  { title: "ISPM-15 vs Heat Treatment: The Facts", views: "20.3k", category: "Compliance" }
];

export default function BlogTrending() {
  return (
    <section className="py-12 bg-[#0B0F19] overflow-hidden border-y border-white/5">
      <div className="container max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center animate-pulse">
              <Flame size={20} />
           </div>
           <h2 className="text-xl font-black text-white tracking-widest uppercase">Most Read This Week</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
           Swipe to explore <div className="w-8 h-[1px] bg-slate-800" />
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 px-[10%] no-scrollbar pb-8">
        {trendingPosts.map((post, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="shrink-0 w-[300px] p-8 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all cursor-pointer group"
          >
             <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">{post.category}</span>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                   <Eye size={12}/> {post.views}
                </div>
             </div>
             <h3 className="text-lg font-black text-white leading-tight mb-8 group-hover:text-orange-400 transition-colors">{post.title}</h3>
             <div className="flex items-center justify-between">
                <div className="flex gap-1">
                   {[1,2,3].map(j => <Flame key={j} size={14} className={j <= 2 ? "text-[#ff6a00]" : "text-slate-800"} />)}
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ff6a00] group-hover:border-[#ff6a00] transition-all">
                   <ArrowRight size={14} />
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
