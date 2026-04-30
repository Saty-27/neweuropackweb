'use client';

import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  "All Blog",
  "Wooden Pallets",
  "Corrugated Boxes",
  "Seaworthy Packing",
  "Crates & Boxes",
  "Shrink & Lashing",
  "Local SEO"
];

export default function BlogFilters({ activeCategory, setActiveCategory }: any) {
  return (
    <div className="sticky top-[80px] lg:top-[90px] z-[100] bg-white border-b border-slate-100">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-6">
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter By:</span>
          </div>
          <div className="flex items-center gap-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-sm font-black uppercase tracking-widest transition-all relative py-2 ${
                  activeCategory === cat ? 'text-[#ff6a00]' : 'text-slate-500 hover:text-[#1A1F2C]'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff6a00] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
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
    </div>
  );
}
