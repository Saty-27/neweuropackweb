'use client';

import React from 'react';

import { partnersList as partners } from '@/data/partners';

export default function PartnerBar() {

  return (
    <section className="bg-white py-12 border-b border-slate-100 overflow-hidden">
      <div className="container-industrial">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Collaborating with Industrial Giants</p>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <div className="flex animate-infinite-scroll items-center gap-32">
              {/* Double mapping for seamless infinite loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                  <img 
                    src={partner.src} 
                    alt={partner.name} 
                    className="h-14 md:h-20 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient Masks for Industrial Smoothness */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
