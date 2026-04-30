'use client';

import React from 'react';
import { Play, FileText, ArrowRight, Layout, Video, Camera } from 'lucide-react';

export function WorkGallery() {
  const gallery = [
    { title: 'Project 011: Heavy Machinery', label: 'Crating', img: 'https://images.unsplash.com/photo-1590496793910-3837a7f4749f?q=80&w=2072&auto=format&fit=crop' },
    { title: 'Project 012: Sea Lashing', label: 'Lashing', img: 'https://images.unsplash.com/photo-1494412574021-746bbdb73214?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Project 013: Turbine Packing', label: 'Vacuum', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Project 014: Aircraft Parts', label: 'Precision', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Project 015: Transformer Base', label: 'Heavy Duty', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Project 016: Global Export', label: 'Logistics', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=2070&auto=format&fit=crop' }
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container-industrial">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-4">
              <span className="section-tag">Visual Artifacts</span>
              <h2 className="section-head">Our Work <span className="text-[#FF6600]">Gallery.</span></h2>
              <p className="text-slate-500 max-w-xl text-lg">A photographic record of industrial structural resilience across various project archetypes.</p>
           </div>
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-all transition-colors"><Camera size={18} /></button>
              <button className="w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center hover:bg-[#FF6600] hover:text-white transition-all transition-colors"><Video size={18} /></button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {gallery.map((item, idx) => (
             <div key={idx} className="group relative rounded-[32px] overflow-hidden aspect-square shadow-industrial">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6600]">{item.label}</span>
                      <h4 className="text-xl font-black text-white">{item.title}</h4>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

export function BlogFeed() {
  const blogs = [
    { title: 'The Physics of Industrial Lashing: Ensuring Zero-Shift Portals', cat: 'Technical Research', date: 'Oct 24, 2026' },
    { title: 'ISPM-15 Standards: Why Heat-Treatment Matters for B2B Export', cat: 'Regulation Guide', date: 'Oct 12, 2026' },
    { title: 'Vacuum Packaging Trends for Sensitive Aerospace Electronics', cat: 'Innovation Tech', date: 'Sep 30, 2026' }
  ];

  return (
    <section id="blog" className="py-24 bg-slate-50">
       <div className="container-industrial">
         <div className="text-center mb-20 space-y-4">
            <span className="section-tag center">Industrial Knowledge</span>
            <h2 className="section-head text-center">Technical Blog Posts.</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[48px] border border-white shadow-industrial hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
                 <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6600] flex items-center justify-center mb-8 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <FileText size={20} />
                 </div>
                 
                 <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6600]">{blog.cat}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-200" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{blog.date}</span>
                    </div>
                    <h4 className="text-2xl font-black text-[#1A1F2C] leading-tight group-hover:text-[#FF6600] transition-colors">{blog.title}</h4>
                 </div>

                 <div className="pt-10 flex border-t border-slate-50 mt-8">
                    <button className="flex items-center gap-2 group/btn">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1F2C]">Analyze Report</span>
                       <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover/btn:bg-[#FF6600] group-hover/btn:text-white transition-all">
                         <ArrowRight size={14} />
                       </div>
                    </button>
                 </div>
              </div>
            ))}
         </div>
       </div>
    </section>
  );
}
