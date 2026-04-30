'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case 'compliance': return 'bg-orange-500 text-white';
    case 'technical': return 'bg-blue-600 text-white';
    case 'case study': return 'bg-purple-600 text-white';
    case 'innovation': return 'bg-emerald-600 text-white';
    default: return 'bg-[#1A1F2C] text-white';
  }
};

export default function BlogGrid({ posts }: { posts: any[] }) {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-black text-[#1A1F2C] mb-12 uppercase tracking-widest border-l-4 border-[#ff6a00] pl-6">Deep Knowledge Base</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
            >
              <div 
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="group flex flex-col h-full bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(26,31,44,0.1)] transition-all duration-500 hover:-translate-y-3 cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] relative overflow-hidden">
                   <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                   <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg ${getCategoryStyles(post.category)}`}>
                      {post.category}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col flex-grow">
                   <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                      <span className="flex items-center gap-2"><Calendar size={12}/> {post.date}</span>
                      <span className="flex items-center gap-2"><Clock size={12}/> {post.readTime}</span>
                   </div>

                   <h3 className="text-xl font-black text-[#1A1F2C] leading-tight mb-8 group-hover:text-[#ff6a00] transition-colors line-clamp-2">
                     {post.title}
                   </h3>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
