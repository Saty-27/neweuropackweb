'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { clientsData } from '@/data/partners';

export default function ClientLogoSection() {
  return (
    <section className="h-[100px] flex items-center bg-white border-y border-slate-100 overflow-hidden shadow-sm relative z-30">

      {/* Marquee Container */}
      <div className="flex gap-16 md:gap-24 overflow-hidden items-center group/marquee w-full">
        <div className="flex gap-16 md:gap-24 animate-[marquee_50s_linear_infinite] items-center whitespace-nowrap group-hover/marquee:[animation-play-state:paused]">
          {[...clientsData, ...clientsData].map((client, idx) => (
            <div 
              key={`${client.name}-${idx}`} 
              className="relative h-[60px] w-24 md:w-36 shrink-0 flex items-center justify-center group"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                fill
                className="object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                sizes="(max-width: 768px) 33vw, 20vw"
                title={client.name}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
      `}</style>
    </section>
  );
}
