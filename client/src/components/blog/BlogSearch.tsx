'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, TrendingUp, Cpu, ShieldCheck, Globe } from 'lucide-react';

const placeholders = [
  "Search ISPM-15 rules...",
  "Vacuum packing techniques...",
  "How to prevent rust...",
  "Export lashing standards...",
  "Wooden pallet vs Corrugated..."
];

const suggestions = [
  { text: "ISPM-15 Certification", icon: <ShieldCheck size={14}/> },
  { text: "Sea Freight Lashing", icon: <Globe size={14}/> },
  { text: "VCI Anti-Rust Tech", icon: <Cpu size={14}/> },
  { text: "Wooden Crating Designs", icon: <TrendingUp size={14}/> }
];

export default function BlogSearch() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-50 -mt-16 container max-w-7xl mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative p-2 rounded-[32px] transition-all duration-500 shadow-2xl ${
            isFocused 
            ? 'bg-white shadow-[#ff6a00]/20' 
            : 'bg-white/10 backdrop-blur-2xl border border-white/20'
          }`}
        >
          <div className="relative flex items-center px-6 gap-4">
            <SearchIcon 
              className={`transition-colors duration-300 ${isFocused ? 'text-[#ff6a00]' : 'text-slate-400'}`} 
              size={24} 
            />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className={`w-full py-6 text-xl font-bold bg-transparent outline-none transition-colors ${
                isFocused ? 'text-[#1A1F2C]' : 'text-white'
              }`}
              placeholder={query ? '' : placeholders[placeholderIndex]}
            />

            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery('')}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-4 bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-4">Popular Knowledge Searches</p>
                </div>
                <div className="p-2">
                  {(query ? suggestions.filter(s => s.text.toLowerCase().includes(query.toLowerCase())) : suggestions).map((s, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 rounded-2xl transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#ff6a00] flex items-center justify-center group-hover:bg-[#ff6a00] group-hover:text-white transition-all">
                        {s.icon}
                      </div>
                      <span className="font-bold text-[#1A1F2C] text-sm">{s.text}</span>
                    </button>
                  ))}
                  {query && (
                    <button className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-orange-50 text-[#ff6a00] font-black uppercase text-[10px] tracking-widest mt-2 border-t border-slate-50">
                      Search for "{query}" in knowledge base <SearchIcon size={12}/>
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
