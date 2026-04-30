'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Calendar, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BlogFeatured({ post }: any) {
  if (!post) return null;

  return (
    <section className="py-20 container max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Featured Intelligence</h2>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ff6a00] text-[10px] font-black uppercase tracking-widest animate-pulse">
          <TrendingUp size={12}/> Trending Now
        </div>
      </div>

      <Link href={`/blog/${post.slug}`} className="group relative block aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl bg-slate-900">
        {/* Background Image with Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={post.img} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70"
          />
          {/* Advanced Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/80 via-transparent to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-10 lg:p-20 flex flex-col justify-end">
          <div className="max-w-4xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-1.5 bg-[#ff6a00] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg self-start"
            >
              {post.category}
            </motion.div>

            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] group-hover:text-orange-400 transition-colors duration-500">
              {post.title}
            </h3>

            <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                   <User size={14}/>
                </span>
                {post.author}
              </div>
              <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest opacity-60">
                <Calendar size={14}/> {post.date}
              </div>
              <div className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-widest opacity-60">
                <Clock size={14}/> {post.readTime}
              </div>
            </div>

            {/* Read Progress Simulation */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '45%' }}
                 className="h-full bg-[#ff6a00]"
               />
            </div>
          </div>
        </div>

        {/* Float Action Button */}
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-white/1 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 group-hover:bg-[#ff6a00] group-hover:border-[#ff6a00] transition-all duration-700 scale-0 group-hover:scale-100">
           <ArrowRight size={32} />
        </div>
      </Link>
    </section>
  );
}
