'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Users, ShieldCheck } from 'lucide-react';

export default function BlogNewsletter() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="relative bg-[#1A1F2C] rounded-[64px] p-12 lg:p-24 overflow-hidden">
           {/* Background Decorations */}
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff6a00]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px] -ml-40 -mb-40" />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20">
                       <Users size={14} /> Join 5,000+ Industry Professionals
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                       Industrial Intelligence <br/> <span className="text-[#ff6a00]">In Your Inbox.</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                       Get monthly engineering blueprints, international compliance alerts, and export safety insights. No fluff, just logistics.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                       <input 
                         type="email" 
                         placeholder="business-email@company.in"
                         className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-all font-medium"
                       />
                    </div>
                    <button className="w-full sm:w-auto px-10 py-6 bg-[#ff6a00] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#e65c00] transition-all shadow-2xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-3">
                       Subscribe <Send size={16} />
                    </button>
                 </div>

                 <div className="flex items-center gap-6 pt-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><ShieldCheck size={14}/> GDPR Compliant</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"/> Zero Spam Policy</span>
                 </div>
              </div>

              <div className="hidden lg:block relative">
                 <div className="relative z-10 p-1 rounded-[48px] bg-gradient-to-br from-white/20 to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img src="/images/service_crate_packing.png" alt="Intelligence" className="rounded-[44px] opacity-80" />
                    <div className="absolute inset-x-10 -bottom-10 p-8 bg-white rounded-[32px] shadow-2xl">
                       <div className="flex gap-1 mb-4">
                          {[1,2,3,4,5].map(j => <div key={j} className="w-4 h-1 rounded-full bg-[#ff6a00]"/>)}
                       </div>
                       <p className="text-[#1A1F2C] font-black text-sm mb-1 leading-tight">Must-Read: ISPM-15 Survival Guide</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sent to 4,800 manufacturing heads last week.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
