'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, MessageSquare } from 'lucide-react';

export default function ContactSupport() {
  return (
    <>
      {/* Career & Partnership Split CTA */}
      <section className="bg-[#1A1F2C]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative overflow-hidden p-16 md:p-24 border-b lg:border-b-0 lg:border-r border-white/5 group hover:bg-[#1f2636] transition-colors"
           >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff6a00]/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none group-hover:bg-[#ff6a00]/10 transition-colors" />
              <div className="relative z-10 max-w-sm">
                <p className="text-[#ff6a00] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Careers at Europack</p>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Build the Future of Logistics.</h2>
                <p className="text-slate-400 font-medium mb-10">We are looking for engineers, project managers, and technical packers to join our PAN India operations.</p>
                <Link href="/careers" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-[#ff6a00] transition-colors shadow-xl group border border-white/10">
                   Join Europack <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="relative overflow-hidden p-16 md:p-24 group hover:bg-[#1f2636] transition-colors"
           >
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
              <div className="relative z-10 max-w-sm">
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Strategic Partnerships</p>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Become a B2B Partner.</h2>
                <p className="text-slate-400 font-medium mb-10">Collaborate with India's most technically advanced packaging manufacturer for global EPC projects.</p>
                <a href="mailto:partners@europack.in" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-blue-500 transition-colors shadow-xl group border border-white/10">
                   Partner With Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Final Bold CTA */}
      <section className="py-40 bg-[#ff6a00] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/particles.svg')] opacity-20 mix-blend-multiply pointer-events-none" />
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-[100px] font-black text-[#1A1F2C] tracking-tighter leading-none mb-10 uppercase"
            >
              Let’s Secure <br/> <span className="text-white drop-shadow-2xl">Your Next Shipment.</span>
            </motion.h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-16 py-6 bg-[#1A1F2C] text-white rounded-[24px] font-black uppercase text-sm tracking-[0.2em] hover:bg-white hover:text-[#ff6a00] transition-all shadow-[0_20px_50px_rgba(26,31,44,0.5)] hover:-translate-y-2 active:scale-95"
              >
                Get a Quote Now
              </button>
            </motion.div>
         </div>
      </section>

    </>
  );
}
