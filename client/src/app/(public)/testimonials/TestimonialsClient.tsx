'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Quote, Play } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import SubPageHero from '@/components/shared/SubPageHero';

export default function TestimonialsClient() {
  const { openEnquiryModal } = useModal();
  return (
    <main>
      <SubPageHero 
        badge="Customer Success"
        title="Partner Testimonials"
        subtitle="Don't just take our word for it. Hear directly from supply chain directors and procurement heads at India's largest heavy infrastructure and manufacturing companies."
        bgImage="/images/banners/3.png"
      />

      {/* 2. Heavy Engineering Sector */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center text-white"><Quote size={20}/></div>
            <h2 className="text-3xl font-black text-[#1A1F2C]">Heavy Engineering & EPC</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'R. K. Vishwanathan', role: 'Global Logistics Head', co: 'Siemens Energy', quote: 'We used to struggle with centre-of-gravity shifts on our generator exports. The Europack team mapped out the pressure points and created a bespoke saddle that permanently eliminated the issue. Incredible engineering.' },
              { name: 'Amit Desai', role: 'Procurement Director', co: 'L&T Infrastructure', quote: 'Their ISPM-15 clearance rate is 100%. We have shipped over 800 crates to the Middle East, and not a single one was held up at customs for phytosanitary non-compliance.' },
              { name: 'Sanjiv Rao', role: 'Head of Operations', co: 'Thermax', quote: 'Europack\'s on-site packing team arrived at our Pune plant at 2 AM to secure a boiler unit for an emergency air freight. Their dedication to our operational uptime is unmatched in the industry.' },
            ].map((t, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FF6600" className="text-[#FF6600]"/>)}</div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div>
                     <p className="font-black text-[#1A1F2C] uppercase">{t.co}</p>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Automotive Sector */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-[#1A1F2C] rounded-xl flex items-center justify-center text-white"><Quote size={20}/></div>
            <h2 className="text-3xl font-black text-[#1A1F2C]">Automotive & Parts Manufacturing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', role: 'Supply Chain VP', co: 'TATA Motors', quote: 'By switching our transmission packaging to Europack\'s VCI-infused returnable plastic crates, our packaging spend dropped by 24% and corrosion incidents vanished completely.' },
              { name: 'Nikhil Verma', role: 'Vendor Management', co: 'Bharat Forge', quote: 'Their corrugated boxes are the only ones that actually pass our 6-foot drop test with full metal castings inside. The ply adhesion strength is superb.' },
              { name: 'Sunil Menon', role: 'Logistics Manager', co: 'Mahindra & Mahindra', quote: 'Europack manages our entire sequencing and kitting packaging. They act less like a vendor and more like an extension of our own warehouse team.' },
            ].map((t, i) => (
               <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FF6600" className="text-[#FF6600]"/>)}</div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div>
                     <p className="font-black text-[#1A1F2C] uppercase">{t.co}</p>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pharmaceutical Sector */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white"><Quote size={20}/></div>
            <h2 className="text-3xl font-black text-[#1A1F2C]">Pharmaceuticals & Medical Devices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Dr. T. Reddy', role: 'QA Director', co: 'Sun Pharma', quote: 'Their cleanroom packaging protocols are airtight. The vacuum aluminium foil packaging combined with precise desiccant loading kept our diagnostic machines at perfect humidity through a 40-day sea transit.' },
              { name: 'Ayesha Khan', role: 'Export Manager', co: 'Piramal', quote: 'We strictly require non-splintering, HT-certified pine for our API drums. Europack delivers perfect, machine-cut pallets every single time without fail.' },
              { name: 'Vikram Singh', role: 'Operations Head', co: 'Cipla Equipment', quote: 'When shipping multi-million dollar lab infrastructure, we don\'t look at costs first, we look at risk. We chose Europack because they eliminate risk entirely.' },
            ].map((t, i) => (
               <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 hover:shadow-xl transition-all">
                  <div className="flex gap-1 mb-6">{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#FF6600" className="text-[#FF6600]"/>)}</div>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">"{t.quote}"</p>
                  <div>
                     <p className="font-black text-[#1A1F2C] uppercase">{t.co}</p>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video Testimonial Grid */}
      <section className="py-24 bg-[#1A1F2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Hear It From Them</h2>
            <p className="text-slate-400 text-lg">Watch extended interviews with supply chain leaders discussing their Europack experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[
               { co: 'TATA Motors - Saving Millions via VCI Packaging', img: 'https://images.unsplash.com/photo-1590496793910-3837a7f4749f?q=80&w=2072&auto=format&fit=crop' },
               { co: 'L&T - How We Pack A 50-Tonne Press', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2073&auto=format&fit=crop' }
             ].map((vid, i) => (
                <div key={i} className="group relative aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer shadow-2xl">
                   <img src={vid.img} alt={vid.co} className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700"/>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#FF6600] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-orange-500/50">
                        <Play size={32} fill="white" className="text-white ml-2"/>
                      </div>
                   </div>
                   <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xl font-black drop-shadow-md">{vid.co}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 6. The 100% Guarantee Matrix */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
           <h2 className="text-4xl lg:text-5xl font-black text-[#1A1F2C] mb-8">Why The World's Biggest Manufacturing Brands Trust Us</h2>
           <p className="text-slate-500 text-lg leading-relaxed mb-12">
             Our enterprise customers don't just buy wooden boxes; they buy insurance against supply chain failure. Across our top 50 corporate accounts, Europack maintains a verifiable 100% zero-claim delivery rate on international ocean freights. 
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-8 rounded-3xl">
                 <h3 className="text-3xl font-black text-[#FF6600] mb-2">0%</h3>
                 <p className="font-bold text-[#1A1F2C] mb-2 uppercase tracking-widest text-xs">Customs Hold Rate</p>
                 <p className="text-slate-500 text-sm">Flawless ISPM-15 IPPC stamping and pre-cleared phytosanitary documentation.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl">
                 <h3 className="text-3xl font-black text-[#FF6600] mb-2">100%</h3>
                 <p className="font-bold text-[#1A1F2C] mb-2 uppercase tracking-widest text-xs">In-House QA</p>
                 <p className="text-slate-500 text-sm">Everything from wood moisture testing to structural lashing is tested in our own labs.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl">
                 <h3 className="text-3xl font-black text-[#FF6600] mb-2">24 Hrs</h3>
                 <p className="font-bold text-[#1A1F2C] mb-2 uppercase tracking-widest text-xs">Emergency Depolyment</p>
                 <p className="text-slate-500 text-sm">Mobile packing teams ready to dispatch across India within a single day.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 7. Comprehensive Onboarding Process */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[#1A1F2C]">The Corporate Onboarding Process</h2>
              <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">How we integrate Europack packaging science into your existing logistics framework.</p>
           </div>
           <div className="flex flex-col md:flex-row gap-8 justify-center">
              {[
                { step: '1', title: 'Facility Audit', desc: 'Our engineers visit your manufacturing plant to analyze your products, handling equipment, and storage limits.' },
                { step: '2', title: 'CAD Protoyping', desc: 'We design digital packaging blueprints factoring in cargo weight, CG, and maritime shear forces.' },
                { step: '3', title: 'Sample Load Test', desc: 'We build a physical prototype and undergo drop, vibration, and moisture testing before mass production.' },
                { step: '4', title: 'Workflow Integration', desc: 'We sync our delivery schedules via ERP directly with your assembly line dispatch to ensure JIT delivery.' }
              ].map(phase => (
                 <div key={phase.step} className="flex-1 bg-white p-8 rounded-3xl shadow-sm relative pt-12">
                    <div className="absolute -top-6 left-8 w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/30">
                       {phase.step}
                    </div>
                    <h3 className="text-lg font-black text-[#1A1F2C] mb-3">{phase.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{phase.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>



      {/* 9. Testimonial FAQs */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1F2C]">Partner QA</h2>
          </div>
          <div className="space-y-6">
             {[
               { q: 'Can I speak directly to one of your existing customers for a reference?', a: 'Yes. For enterprise contracts exceeding 500 cubic meters monthly, we gladly connect prospective customers with existing partners in non-competing sectors.' },
               { q: 'Do you offer SLA agreements for JIT corrugated box supply?', a: 'Yes, we operate on severe JIT (Just In Time) SLA contracts with several FMCG and automotive brands, managing buffer stocks in our own facilities.' },
               { q: 'What happens if a crate fails during transit?', a: 'Due to our CAD engineering phase, structural failure has not occurred in our 33-year history. However, all our export packages are fully insured and documented with photographic load surveys prior to dispatch.' },
             ].map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                   <h4 className="text-xl font-black text-[#1A1F2C] mb-4 flex items-start gap-4">
                     <span className="text-[#FF6600] shrink-0">Q.</span> {faq.q}
                   </h4>
                   <p className="text-slate-500 leading-relaxed pl-8">{faq.a}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <section className="py-24 bg-[#FF6600]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">Become Our Next Success Story</h2>
          <p className="text-orange-100 mb-10 max-w-2xl mx-auto text-xl">Stop bleeding margin on damaged cargo and customs fines. Upgrade to Europack.</p>
          <div className="flex justify-center gap-6">
            <button 
              onClick={openEnquiryModal}
              className="inline-flex items-center gap-3 bg-[#1A1F2C] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-2xl"
            >
               Start Corporate Onboarding <ArrowRight size={18}/>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
