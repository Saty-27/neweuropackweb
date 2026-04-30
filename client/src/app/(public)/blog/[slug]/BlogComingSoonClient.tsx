'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight, BookOpen } from 'lucide-react';
import BlogComingSoonModal from '@/components/layout/BlogComingSoonModal';

export default function BlogComingSoonClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 w-full">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-12 py-6 bg-[#FF6600] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#CC5200] transition-all shadow-2xl shadow-orange-500/20 flex items-center justify-center gap-3 active:scale-95"
        >
          <Bell size={18} /> Get Notified <ArrowRight size={18} />
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-12 py-6 bg-[#1A1F2C] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <BookOpen size={18} /> Submit Topic Request
        </button>
      </div>

      <BlogComingSoonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
