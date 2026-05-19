'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import SubPageHero from '@/components/shared/SubPageHero';
import ClientLogoSection from '@/components/shared/ClientLogoSection';

const industries = [
  { name: 'Heavy Engineering', img: '/images/industries/heavy-engineering.png', desc: 'Custom export crates for turbines, compressors, presses, and capital equipment weighing up to 50+ tonnes.', solutions: ['ODC cargo lashing','Custom export crates','On-site packing teams','Load engineering'] },
  { name: 'Pharmaceuticals', img: '/images/industries/pharmaceuticals.png', desc: 'Cleanroom-compliant packaging for pharma equipment, API drums, and medical devices meeting WHO GMP standards.', solutions: ['Cleanroom-grade materials','VCI barrier packs','Temperature indicators','Tamper-evident sealing'] },
  { name: 'Automotive', img: '/images/industries/automotive.png', desc: 'Auto part packaging preventing surface scratches, corrosion, and vibration damage for Tier 1 suppliers and OEMs.', solutions: ['Anti-static foam inserts','VCI wrapping for metal parts','Returnable plastic crates','Kitting & sequencing'] },
  { name: 'FMCG & Retail', img: '/images/industries/fmcg-retail.png', desc: 'High-volume corrugated packaging, stretch-wrapped pallets, and branded cartons for FMCG manufacturers.', solutions: ['Custom corrugated cartons','Pallet stretch wrapping','Barcode & RFID compatible','Retail-ready packaging'] },
  { name: 'Defence & Aerospace', img: '/images/industries/defence-aerospace.png', desc: 'MIL-SPEC compliant packaging for defence equipment, aircraft components, and precision instruments.', solutions: ['MIL-SPEC wooden cases','Foam-in-place cushioning','Humidity indicator cards','Shock & vibration isolators'] },
  { name: 'Energy & Power', img: '/images/industries/energy-power.png', desc: 'Critical packaging for transformers, switchgear, solar panels, and power generation equipment.', solutions: ['Transformer crating','VCI oil treatment','Weatherproof barriers','Silica gel & desiccants'] },
  { name: 'IT & Electronics', img: '/images/industries/it-electronics.png', desc: 'Anti-static and ESD-safe packaging for servers, semiconductors, and sensitive electronic equipment.', solutions: ['ESD-safe bags and trays','Vacuum barrier packs','Precision foam profiling','Sealed moisture-proof crates'] },
  { name: 'Chemical & Hazmat', img: '/images/industries/chemical-hazmat.png', desc: 'UN-certified and hazmat-compliant packaging for drums, IBC containers, and chemical goods.', solutions: ['UN certified containers','Hazmat labelling','Secondary containment','IATA/IMDG compliant packs'] },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {industries.map((ind) => (
              <div key={ind.name} className="group rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] transition-all duration-700 bg-white flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80"/>
                  <div className="absolute bottom-8 left-10">
                    <h2 className="text-4xl font-black text-white tracking-tighter mb-2">{ind.name}</h2>
                    <div className="w-12 h-1.5 bg-[#FF6600] rounded-full" />
                  </div>
                </div>
                <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-500 text-base leading-relaxed font-medium mb-8">{ind.desc}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {ind.solutions.map(s => (
                        <span key={s} className="px-4 py-2 bg-slate-50 text-slate-600 border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-wider group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-[#FF6600] transition-colors">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={openEnquiryModal}
                    className="inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] text-[#FF6600] hover:gap-5 transition-all group/btn w-fit"
                  >
                    Request Industry Audit <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClientLogoSection />

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
