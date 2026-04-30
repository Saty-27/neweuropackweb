'use client';

import React from 'react';
import { Quote, MessageSquare, Plus, Minus, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

// Social icon SVGs (inline since lucide v1 renamed these)
const LinkedinIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const FacebookIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TwitterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;


export function TeamSection() {
  const team = [
    { name: 'Dhanik Chheda', role: 'Managing Architect', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Snehal Chheda', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop' },
    { name: 'Jayant Ghadge', role: 'Logistics Strategist', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }
  ];

  return (
    <section id="team" className="py-24 bg-white">
      <div className="container-industrial">
        <div className="text-center mb-20 space-y-4">
           <span className="section-tag center">The Architecture Team</span>
           <h2 className="section-head text-center">Our In-House Experts.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
           {team.map((member, idx) => (
             <div key={idx} className="group text-center space-y-6">
                <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
                   <div className="absolute inset-0 bg-orange-100 rounded-full scale-0 group-hover:scale-110 transition-transform duration-700" />
                   <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-industrial">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                   </div>
                   <a 
                     href="#" 
                     className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                   >
                      <LinkedinIcon />
                   </a>
                </div>
                <div className="space-y-1">
                   <h4 className="text-2xl font-black text-[#1A1F2C] tracking-tight">{member.name}</h4>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6600]">{member.role}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const reviews = [
    { name: 'Robert Wilson', role: 'Global Logistics Manager', company: 'Maersk India', text: 'Europack is our go-to for heavy machinery crating. Their structural resilience is unmatched in the Indian market.', stars: 5 },
    { name: 'Anita Desai', role: 'Industrial Operations Head', company: 'JSW Steel', text: 'Professional, ISPM-15 compliant, and extremely fast. They handle our export lashing with total precision.', stars: 5 }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
       {/* Industrial Quote Decor */}
       <div className="absolute top-20 left-20 opacity-[0.03] text-[#1A1F2C]">
          <Quote size={200} />
       </div>
       
       <div className="container-industrial relative z-10">
         <div className="text-center mb-16 space-y-4">
            <span className="section-tag center">Industrial Benchmarks</span>
            <h2 className="section-head text-center">Verified Customer Feedback.</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[48px] border border-white shadow-industrial relative group">
                 <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-[#FF6600] text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <Quote size={20} fill="currentColor" />
                 </div>
                 <div className="space-y-6">
                    <div className="flex gap-1">
                       {[...Array(rev.stars)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />)}
                    </div>
                    <p className="text-lg font-black text-[#1A1F2C] leading-relaxed italic">"{rev.text}"</p>
                    <div>
                       <p className="font-black text-sm text-[#1A1F2C] uppercase">{rev.company}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{rev.role}</p>
                    </div>
                 </div>
              </div>
            ))}
         </div>
       </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    { q: 'Is Europack ISPM-15 Certified?', a: 'Yes, all our wooden cases and crating solutions are 100% ISPM-15 heat-treated and certified for global export logistics.' },
    { q: 'Do you provide on-site lashing services?', a: 'Absolutely. We provide on-site technical lashing and securing teams at ports, warehouses, and manufacturing hubs across India.' },
    { q: 'What is the maximum weight capacity for your crates?', a: 'Our heavy-duty crating is engineered to support assets exceeding 100+ Tons using high-fidelity structural reinforcement.' }
  ];

  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
       <div className="container-industrial">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8 animate-slide-up">
               <span className="section-tag">Internal Clarity</span>
               <h2 className="section-head">Technical FAQ <br />Matrix.</h2>
               <p className="section-desc">Immediate answers for industrial logistics professionals. For complex project blueprints, contact our experts.</p>
               
               <button className="btn-industrial btn-industrial-outline flex items-center gap-3">
                 Download Compliance Guide <ArrowRight size={16} />
               </button>
            </div>

            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`border border-slate-100 rounded-[32px] overflow-hidden transition-all ${openIdx === idx ? 'bg-slate-50' : 'bg-white'}`}>
                     <button 
                       onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                       className="w-full p-8 flex items-center justify-between text-left group"
                     >
                        <span className={`text-sm font-black tracking-tight ${openIdx === idx ? 'text-[#FF6600]' : 'text-[#1A1F2C]'} transition-colors`}>{faq.q}</span>
                        <div className={`w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center transition-all ${openIdx === idx ? 'bg-[#FF6600] border-[#FF6600] text-white rotate-180' : 'bg-white group-hover:border-slate-300'}`}>
                           {openIdx === idx ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                     </button>
                     {openIdx === idx && (
                       <div className="px-8 pb-8 animate-slide-up">
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{faq.a}</p>
                       </div>
                     )}
                  </div>
                ))}
            </div>
         </div>
       </div>
    </section>
  );
}

export function ContactHub() {
  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
       <div className="container-industrial relative z-10">
          <div className="bg-white rounded-[48px] shadow-industrial border border-white overflow-hidden lg:flex">
             
             {/* Industrial Info Blade */}
             <div className="lg:w-2/5 p-12 lg:p-16 bg-[#1A1F2C] text-white flex flex-col gap-12">
                <div className="space-y-4">
                   <h3 className="text-4xl font-black tracking-tighter">Initialize B2B <br /><span className="text-[#FF6600]">Architecture.</span></h3>
                   <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">Submit your project blueprints for a high-fidelity industrial quote within 24 hours.</p>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Global Headquarters</p>
                        <p className="text-sm font-bold">123 Industrial Hub, Navi Mumbai, Maharashtra 400701</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">24/7 Logistics Hot-Line</p>
                        <p className="text-sm font-bold">+91 98200 90775</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Procurement Enquiries</p>
                        <p className="text-sm font-bold">architect@europack.in</p>
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex gap-4 mt-auto">
                   {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map((Icon, idx) => (
                     <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF6600] transition-all flex items-center justify-center">
                        <Icon />
                     </a>
                   ))}
                </div>
             </div>

             {/* Dynamic Form Blade */}
             <div className="flex-1 p-12 lg:p-16">
                <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Identity Profile</label>
                        <input className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none font-bold text-sm" placeholder="Full Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Ecosystem Email</label>
                        <input className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none font-bold text-sm" placeholder="Project Entity Email" />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Industrial Sector</label>
                      <select className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none font-bold text-sm">
                        <option>Heavy Manufacturing</option>
                        <option>Precision Aerospace</option>
                        <option>Global Logistics Hub</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">Project Brief</label>
                      <textarea className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none font-bold text-sm h-32" placeholder="Detail your packaging blueprints..."></textarea>
                   </div>

                   <button type="submit" className="btn-industrial btn-industrial-primary w-full py-5 rounded-2xl text-sm flex items-center justify-center gap-3">
                      Commit Quote Matrix <ArrowRight size={18} />
                   </button>
                </form>
             </div>
          </div>
       </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1A1F2C] pt-24 pb-12 overflow-hidden relative">
       <div className="container-industrial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
             
             {/* Brand Signature */}
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                      <span className="text-white font-black italic text-xl">E</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-2xl font-black text-white tracking-tighter">EUROPACK</span>
                      <span className="text-[9px] font-black text-[#FF6600] uppercase tracking-[0.4em]">Technical Hub</span>
                   </div>
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-relaxed">India's leading authority in structural industrial packaging, export crating, and heavy machinery lashing.</p>
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 w-fit">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Ecosystem Operational</span>
                </div>
             </div>

             {/* Industrial Nodes */}
             <div className="space-y-8">
                <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em]">Core Architecture</h4>
                <div className="flex flex-col gap-4">
                   {['Project Crating', 'Export Lashing', 'Vacuum Hub', 'ODC Services', 'Wood Preservation'].map(item => (
                     <a key={item} href="#" className="text-sm font-bold text-slate-300 hover:text-[#FF6600] transition-colors flex items-center justify-between group">
                        {item} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                     </a>
                   ))}
                </div>
             </div>

             {/* Enterprise Grid */}
             <div className="space-y-8">
                <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em]">Enterprise Matrix</h4>
                <div className="flex flex-col gap-4">
                   {['B2B Case Studies', 'Technical Experts', 'Industrial Research', 'Compliance Guide', 'Ecosystem Support'].map(item => (
                     <a key={item} href="#" className="text-sm font-bold text-slate-300 hover:text-[#FF6600] transition-colors flex items-center justify-between group">
                        {item} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                     </a>
                   ))}
                </div>
             </div>

             {/* Industrial Signature */}
             <div className="space-y-8">
                <h4 className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em]">Lead Matrix</h4>
                <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architect Hot-Line</p>
                   <p className="text-xl font-bold text-white">+91 98200 90775</p>
                   <button className="w-full py-4 rounded-xl bg-[#FF6600] text-white font-black uppercase text-[10px] tracking-widest shadow-lg shadow-orange-500/20">Initialize Support</button>
                </div>
             </div>
          </div>

          {/* Legal Bar */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">© 2026 Europack Enterprise. Architecture by Industrial Ecosystem.</p>
             <div className="flex gap-8">
                {['Privacy Architecture', 'Security Matrix', 'Compliance Hub'].map(item => (
                  <a key={item} href="#" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">{item}</a>
                ))}
             </div>
          </div>
       </div>

       {/* Decorative Silhouette */}
       <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-[0.02] pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full text-white fill-current">
             <path d="M0,500 L200,300 L400,450 L600,200 L800,400 L1000,150 L1000,500 Z" />
          </svg>
       </div>
    </footer>
  );
}
