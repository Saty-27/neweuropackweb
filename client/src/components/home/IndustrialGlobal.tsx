'use client';

import React from 'react';
import { Globe, Shield, Zap, Target, ArrowRight, Cog, Battery, Truck, Building2, Wind } from 'lucide-react';

export function GlobalPartner() {
  return (
    <section className="py-32 bg-[#1A1F2C] relative overflow-hidden">
      {/* Abstract Industrial Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="container-industrial relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="flex-1 space-y-8 animate-slide-up">
            <span className="section-tag text-orange-400">Global Logistics Architecture</span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
              Your Global <br />
              <span className="text-[#FF6600]">Packaging Partner.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              From Indian manufacturing hubs to global destination ports, we ensure your mission-critical machinery arrives in showroom condition. Our export-standard crating complies with all international ISPM-15 regulations.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6600]/20 flex items-center justify-center text-[#FF6600]">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-widest">ISPM-15 Certified</p>
                    <p className="text-[10px] text-slate-500 font-bold">Global Export Compliant</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6600]/20 flex items-center justify-center text-[#FF6600]">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-widest">Global Reach</p>
                    <p className="text-[10px] text-slate-500 font-bold">Port-to-Port Protection</p>
                  </div>
               </div>
            </div>

            <button className="btn-industrial btn-industrial-primary flex items-center gap-3">
              Explore Export Standards <ArrowRight size={16} />
            </button>
          </div>

          {/* Interactive Globe / Illustration Placeholder */}
          <div className="flex-1 relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-full aspect-square max-w-lg mx-auto bg-gradient-to-br from-[#FF6600]/20 to-transparent rounded-full flex items-center justify-center relative p-12 lg:scale-110">
               <div className="absolute inset-0 rounded-full border border-orange-500/10 animate-spin" style={{ animationDuration: '60s' }} />
               <div className="absolute inset-8 rounded-full border border-orange-500/20 animate-spin-reverse" style={{ animationDuration: '40s' }} />
               <div className="relative z-10 w-full h-full bg-[#1A1F2C] rounded-full border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                  <Globe size={120} className="text-[#FF6600]/40 animate-pulse-soft" />
                  <div className="absolute animate-bounce" style={{ top: '20%', left: '40%', animationDuration: '3s' }}>
                    <div className="w-2 h-2 rounded-full bg-[#FF6600] shadow-lg shadow-orange-500" />
                  </div>
                  <div className="absolute animate-bounce" style={{ bottom: '30%', right: '35%', animationDuration: '4s' }}>
                    <div className="w-2 h-2 rounded-full bg-[#FF6600] shadow-lg shadow-orange-500" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 0s linear infinite;
        }
      `}</style>
    </section>
  );
}

export function IndustryMatrix() {
  const industries = [
     { name: 'Machinery', icon: <Cog size={24}/>, label: 'Heavy Manufacturing' },
     { name: 'Energy', icon: <Wind size={24}/>, label: 'Renewables & Power' },
     { name: 'Logistics', icon: <Truck size={24}/>, label: 'Global Freight' },
     { name: 'Infrastructure', icon: <Building2 size={24}/>, label: 'Capital Projects' }
  ];

  return (
    <section id="industries" className="py-24 bg-white">
       <div className="container-industrial">
         <div className="text-center mb-16">
            <span className="section-tag center">Vertical Integration</span>
            <h2 className="section-head text-center">Industries We Serve.</h2>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((ind, idx) => (
              <div key={idx} className="group p-10 rounded-[48px] bg-slate-50 border border-slate-50 hover:bg-white hover:shadow-industrial hover:border-slate-100 transition-all duration-700 text-center flex flex-col items-center">
                 <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-500">
                   {ind.icon}
                 </div>
                 <h4 className="text-xl font-black text-[#1A1F2C] mb-2 tracking-tighter">{ind.name}</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{ind.label}</p>
              </div>
            ))}
         </div>
       </div>
    </section>
  );
}
