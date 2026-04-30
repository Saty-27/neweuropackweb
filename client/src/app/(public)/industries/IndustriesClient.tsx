'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import SubPageHero from '@/components/shared/SubPageHero';

const industries = [
  { name: 'Heavy Engineering', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', desc: 'Custom export crates for turbines, compressors, presses, and capital equipment weighing up to 50+ tonnes.', solutions: ['ODC cargo lashing','Custom export crates','On-site packing teams','Load engineering'] },
  { name: 'Pharmaceuticals', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2030&auto=format&fit=crop', desc: 'Cleanroom-compliant packaging for pharma equipment, API drums, and medical devices meeting WHO GMP standards.', solutions: ['Cleanroom-grade materials','VCI barrier packs','Temperature indicators','Tamper-evident sealing'] },
  { name: 'Automotive', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop', desc: 'Auto part packaging preventing surface scratches, corrosion, and vibration damage for Tier 1 suppliers and OEMs.', solutions: ['Anti-static foam inserts','VCI wrapping for metal parts','Returnable plastic crates','Kitting & sequencing'] },
  { name: 'FMCG & Retail', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop', desc: 'High-volume corrugated packaging, stretch-wrapped pallets, and branded cartons for FMCG manufacturers.', solutions: ['Custom corrugated cartons','Pallet stretch wrapping','Barcode & RFID compatible','Retail-ready packaging'] },
  { name: 'Defence & Aerospace', img: 'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop', desc: 'MIL-SPEC compliant packaging for defence equipment, aircraft components, and precision instruments.', solutions: ['MIL-SPEC wooden cases','Foam-in-place cushioning','Humidity indicator cards','Shock & vibration isolators'] },
  { name: 'Energy & Power', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2073&auto=format&fit=crop', desc: 'Critical packaging for transformers, switchgear, solar panels, and power generation equipment.', solutions: ['Transformer crating','VCI oil treatment','Weatherproof barriers','Silica gel & desiccants'] },
  { name: 'IT & Electronics', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', desc: 'Anti-static and ESD-safe packaging for servers, semiconductors, and sensitive electronic equipment.', solutions: ['ESD-safe bags and trays','Vacuum barrier packs','Precision foam profiling','Sealed moisture-proof crates'] },
  { name: 'Chemical & Hazmat', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop', desc: 'UN-certified and hazmat-compliant packaging for drums, IBC containers, and chemical goods.', solutions: ['UN certified containers','Hazmat labelling','Secondary containment','IATA/IMDG compliant packs'] },
];

export default function IndustriesClient() {
  const { openEnquiryModal } = useModal();
  
  return (
    <main>
      <SubPageHero 
        badge="Our Expertise"
        title="Industries We Serve"
        subtitle="Tailored industrial packaging for every sector — from Heavy Engineering to Defence."
        bgImage="/images/banners/1.png"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {industries.map((ind) => (
              <div key={ind.name} className="group rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="relative aspect-video overflow-hidden">
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C]/80 to-transparent"/>
                  <h2 className="absolute bottom-6 left-8 text-3xl font-black text-white tracking-tight">{ind.name}</h2>
                </div>
                <div className="p-8 space-y-5">
                  <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ind.solutions.map(s => <span key={s} className="px-3 py-1.5 bg-orange-50 text-[#FF6600] rounded-lg text-[10px] font-black uppercase tracking-wider">{s}</span>)}
                  </div>
                  <button 
                    onClick={openEnquiryModal}
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#FF6600] hover:gap-4 transition-all"
                  >
                    Get Industry Quote <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-[#1A1F2C] mb-4">Don't see your industry?</h2>
          <p className="text-slate-500 mb-8">We work with manufacturers across all sectors. Let us design a solution for you.</p>
          <button 
            onClick={openEnquiryModal}
            className="inline-flex items-center gap-2 bg-[#FF6600] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#e65c00] transition-colors"
          >
            Speak to an Expert <ArrowRight size={16}/>
          </button>
        </div>
      </section>
    </main>
  );
}
