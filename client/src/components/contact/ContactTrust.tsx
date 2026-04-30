'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Truck, Activity, Building2, HardHat, FileCheck 
} from 'lucide-react';
import Image from 'next/image';
import { partnersList as logos } from '@/data/partners';

const industries = [
  { icon: <Settings size={28}/>, name: 'Heavy Engineering', desc: 'Turbines, Transformers & CNCs' },
  { icon: <Truck size={28}/>, name: 'Automotive', desc: 'CKD Kits & Precision Parts' },
  { icon: <Activity size={28}/>, name: 'Pharma & MedTech', desc: 'Vacuum Secured Electronics' },
  { icon: <Building2 size={28}/>, name: 'EPC Projects', desc: 'Massive Infrastructure Exports' },
  { icon: <HardHat size={28}/>, name: 'Solar & Energy', desc: 'Fragile Module Securing' },
  { icon: <FileCheck size={28}/>, name: 'Aerospace', desc: 'Strict Compliance Cases' }
];

export default function ContactTrust() {
  return (
    <section className="bg-white">
      {/* Trust Section */}
      <div className="py-24 border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#ff6a00]">Trusted by Global EPC Contractors</p>
          
          <div className="relative overflow-hidden w-full py-10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
            
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex items-center gap-20 whitespace-nowrap w-max"
            >
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex items-center gap-24 px-12">
                  {logos.map((logo, i) => (
                    <img 
                      key={i} 
                      src={logo.src} 
                      alt={logo.name} 
                      className="h-16 md:h-20 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto border-t border-slate-200">
             <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-2">1000+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Customers</p>
             </div>
             <div className="text-center border-x border-slate-200">
                <p className="text-4xl md:text-5xl font-black text-[#ff6a00] mb-2">33+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Years Experience</p>
             </div>
             <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#1A1F2C] mb-2">500+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Export Projects</p>
             </div>
          </div>
        </div>
      </div>

      {/* Industries We Serve */}
      <div className="py-32 bg-[#0B0F19] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6a00]/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/particles.svg')] opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Designed For <span className="text-[#ff6a00]">Compliance.</span></h2>
             <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">Providing certified packaging architectures tailored for high-stakes industries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-[#ff6a00] group transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg"
              >
                 <div className="w-16 h-16 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] group-hover:bg-white group-hover:text-[#ff6a00] flex items-center justify-center mb-8 transition-colors shadow-inner">
                   {ind.icon}
                 </div>
                 <h3 className="text-xl font-black text-white mb-3 tracking-wide">{ind.name}</h3>
                 <p className="text-slate-400 text-sm font-medium group-hover:text-white/90 transition-colors">{ind.desc}</p>
                 <div className="mt-6 w-12 h-1 bg-white/10 group-hover:bg-white/30 rounded-full transition-all group-hover:w-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
