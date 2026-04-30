'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface SubPageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  bgImage: string;
}

const SubPageHero: React.FC<SubPageHeroProps> = ({ title, subtitle, badge, bgImage }) => {
  return (
    <section className="relative min-h-[500px] flex items-center pt-[140px] overflow-hidden bg-[#1A1F2C]">
      {/* Background Image with Global Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage} 
          alt={title} 
          fill 
          className="object-cover opacity-60"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/60 to-transparent" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {badge && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
            >
              {badge}
            </motion.div>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6"
          >
            {title.split(' ').map((word, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? "text-[#FF6600]" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SubPageHero;
