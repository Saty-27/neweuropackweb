'use client';

import React from 'react';
import { Shield, Zap, Box, Compass, Anchor, Package, Layers, Globe, ArrowRight } from 'lucide-react';

export function Specialities() {
  const specs = [
    { name: 'Export Crating', desc: 'Custom ISPM-15 heat-treated wooden cases for global machinery transport.', icon: <Package size={24}/> },
    { name: 'Industrial Lashing', desc: 'High-tension securing for ODC and heavy project cargo in containers or flat racks.', icon: <Anchor size={24}/> },
    { name: 'Vacuum Packing', desc: 'Moisture-proof, anti-corrosive protection for sensitive electronic components.', icon: <Layers size={24}/> },
    { name: 'ODC Handling', desc: 'Specialized logistics for Over Dimensional Cargo with precision balancing.', icon: <Compass size={24}/> }
  ];

  return (
    <section id="specialities" className="py-24 bg-white relative overflow-hidden">
      <div className="container-industrial">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-4">
              <span className="section-tag">Core Architecture</span>
              <h2 className="section-head">Our Packaging <span className="text-[#FF6600]">Specialities.</span></h2>
              <p className="text-slate-500 max-w-xl text-lg">Engineering bespoke structural protection for the world's most valuable industrial assets.</p>
           </div>
           <button className="btn-industrial btn-industrial-outline">View All Capabilities</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {specs.map((spec, idx) => (
             <div key={idx} className="group p-8 rounded-[48px] bg-slate-50 border border-slate-50 hover:bg-white hover:shadow-industrial hover:border-slate-100 transition-all duration-700 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF6600] mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {spec.icon}
                </div>
                <h4 className="text-xl font-black text-[#1A1F2C] mb-4 tracking-tight">{spec.name}</h4>
                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">{spec.desc}</p>
                
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <div className="flex items-center gap-2 text-[#FF6600] font-black text-[10px] uppercase tracking-widest">
                      Explore Technicals <ArrowRight size={14} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const services = [
    { title: 'Project Cargo Packing', label: 'B2B Logistics', img: 'https://images.unsplash.com/photo-1590496793910-3837a7f4749f?q=80&w=2072&auto=format&fit=crop' },
    { title: 'Machine Foundations', label: 'Heavy Equipment', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Lashing & Securing', label: 'Sea Freight', img: 'https://images.unsplash.com/photo-1494412574021-746bbdb73214?q=80&w=2070&auto=format&fit=crop' },
    { title: 'VCI Protection', label: 'Anti-Corrosion', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop' }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container-industrial">
        <div className="text-center space-y-4 mb-20">
           <span className="section-tag center">Industrial Ecosystem</span>
           <h2 className="section-head">Our Packaging Services.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           {services.map((service, idx) => (
             <div key={idx} className="group relative rounded-[48px] overflow-hidden aspect-[16/10] shadow-industrial hover:shadow-2xl transition-all duration-700">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                   <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6600]">{service.label}</span>
                      <h4 className="text-3xl font-black text-white tracking-tight">{service.title}</h4>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#FF6600] group-hover:border-[#FF6600] transition-all">
                      <ArrowRight size={20} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
