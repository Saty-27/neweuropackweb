'use client';

import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

import { partnersList } from '@/data/partners';

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Global Logistics Head', company: 'TATA Motors', text: 'Europack has been our packaging partner for 7 years. Zero-damage record across 500+ international shipments.', stars: 5 },
  { name: 'Priya Kulkarni', role: 'Supply Chain Director', company: 'Siemens India', text: 'They engineered a custom lashing solution for a 12-tonne transformer that our in-house team couldn\'t design. Outstanding.', stars: 5 },
  { name: 'Michael D\'Souza', role: 'Procurement Manager', company: 'Larsen & Toubro', text: 'Their documentation support and phytosanitary compliance handling saves us tremendous time.', stars: 5 },
  { name: 'Ananya Verma', role: 'Operations Head', company: 'Bharat Forge', text: 'Europack delivered a turnkey packing solution for our Germany export within 48 hours of the order — truly impressive.', stars: 5 },
  { name: 'Robert Chen', role: 'Import-Export Manager', company: 'Mahindra Logistics', text: 'Their VCI treatment has eliminated corrosion claims completely across our 14-country export network.', stars: 5 },
  { name: 'Nandini Rao', role: 'Director — QA', company: 'Piramal Healthcare', text: 'Europack\'s cleanroom packaging solutions meet our strict GMP requirements. We have never looked elsewhere.', stars: 5 },
];

export default function ClientsClient() {
  const { openEnquiryModal } = useModal();

  return (
    <main>
      <section className="bg-[#1A1F2C] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px]"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Industrial Trust</div>
          <h1 className="text-5xl md:text-[80px] font-black text-white tracking-tighter leading-[0.9] mb-4">
            Customers & <br/> <span className="text-[#FF6600]">Testimonials</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Trusted by 1000+ of India's leading manufacturers, exporters, and multinationals to protect their global reputation.</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-3">The Portfolio</div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter">Industry <span className="text-[#FF6600]">Leaders.</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnersList.map(c => (
              <div key={c.name} className="group p-8 rounded-[32px] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center justify-center">
                <div className="w-full h-24 mb-5 flex items-center justify-center transition-all group-hover:scale-110">
                  <img src={c.src} alt={c.name} className="max-w-[80%] max-h-full object-contain mix-blend-multiply" />
                </div>
                <p className="font-black text-[#1A1F2C] text-sm uppercase tracking-tight mb-1">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-3">Real Stories</div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter">What Our Customers <span className="text-[#FF6600]">Say.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[48px] shadow-xl border border-slate-50 relative group hover:shadow-2xl transition-all duration-500">
                <div className="flex gap-1 mb-6">
                  {Array(t.stars).fill(0).map((_,j) => <Star key={j} size={16} fill="#FF6600" className="text-[#FF6600]"/>)}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed italic mb-10 font-medium">"{t.text}"</p>
                <div className="border-t border-slate-100 pt-8 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-[#1A1F2C] flex items-center justify-center text-[#FF6600] font-black text-xl">{t.company[0]}</div>
                  <div>
                    <p className="font-black text-[#1A1F2C] text-[12px] uppercase tracking-widest mb-1">{t.company}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FF6600] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Join 1000+ satisfied <br/> industrial partners.</h2>
          <p className="text-orange-100 text-xl font-medium">Get your customised packaging quote and technical blueprint today.</p>
          <button 
            onClick={openEnquiryModal}
            className="inline-flex items-center gap-4 bg-white text-[#FF6600] px-16 py-7 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-[#1A1F2C] hover:text-white transition-all shadow-2xl active:scale-95"
          >
            Get a Free Quote <ArrowRight size={20}/>
          </button>
        </div>
      </section>
    </main>
  );
}
