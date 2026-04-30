'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, Shield, Award, Target, Users, 
  Settings, Zap, Globe, Ship, HardHat, Factory,
  Box, Maximize, Anchor, Wrench, FileCheck, Info,
  Search, ShieldCheck, CheckCircle2, Star, Clock, HelpCircle, Quote,
  ChevronRight, Cog, Truck, Layout, Activity, Database,
  FlaskConical, ShoppingBag, Mountain, Plane, X, ChevronDown, FileText, Cpu, Monitor, ExternalLink
} from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import TechFAQ from '../../../components/shared/TechFAQ';
import { servicesData, ServiceData } from '../../../data/servicesData';

export default function ServicesClient() {
  const { openEnquiryModal } = useModal();
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const openModal = openEnquiryModal;

  const coreServices = servicesData;

  const industries = [
    { name: 'Engineering', icon: <Cog size={40} />, desc: 'Heavy machinery & tools' },
    { name: 'Pharmaceuticals', icon: <Activity size={40} />, desc: 'Sterile & sensitive equipment' },
    { name: 'Automotive', icon: <Truck size={40} />, desc: 'Parts & unit logistics' },
    { name: 'Logistics', icon: <Globe size={40} />, desc: 'Global freight & distribution' },
    { name: 'Energy & Power', icon: <Zap size={40} />, desc: 'Transformers & turbines' },
    { name: 'Chemical', icon: <FlaskConical size={40} />, desc: 'Hazmat & UN certified packing' },
    { name: 'Food & FMCG', icon: <ShoppingBag size={40} />, desc: 'Bulk & retail packaging' },
    { name: 'Mining & Minerals', icon: <Mountain size={40} />, desc: 'Heavy industrial ore handling' },
    { name: 'Defence & Aerospace', icon: <Plane size={40} />, desc: 'MIL-SPEC precision packaging' },
    { name: 'Heavy Machinery', icon: <Database size={40} />, desc: 'Complex industrial assemblies' },
  ];

  return (
    <main className="bg-white overflow-hidden font-sans">
      
      {/* SECTION 1: HERO (Services Banner) */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/services/hero_banner.png" 
            alt="Industrial Services" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/70 to-[#0B0F19]/90" />
        </div>
        
        <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >

            <h1 className="text-6xl md:text-[84px] font-black text-white leading-[0.9] tracking-tighter">
              Services That Power <br/> <span className="text-[#FF6600]">Global Exports.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              End-to-end industrial packaging solutions engineered for zero-risk transit. From multi-ton machinery to precision electronics.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button onClick={openModal} className="w-full md:w-auto px-12 py-5 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#E65C00] transition-all shadow-2xl shadow-orange-500/20">Explore Services</button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CORE SERVICES GRID (PICTURE CARDS) */}
      <section className="py-32 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-block px-3 py-1 bg-slate-100 text-[#1A1F2C] text-[10px] font-black uppercase tracking-widest rounded-full">Core Competencies</div>
             <h2 className="text-5xl font-black text-[#1A1F2C] tracking-tighter leading-none">Engineered <br/><span className="text-[#FF6600]">Protection.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {coreServices.map((svc, i) => (
               <motion.div 
                 key={svc.name}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1, duration: 0.7 }}
                 className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col h-full"
               >
                 {/* Top: Image */}
                 <div className="relative h-64 overflow-hidden m-4 rounded-[32px]">
                   <Image 
                     src={svc.img} 
                     alt={svc.name} 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>

                 {/* Bottom: Content */}
                 <div className="p-8 pt-2 space-y-4 flex-grow flex flex-col">
                   <h3 className="text-2xl font-black text-[#1A1F2C] tracking-tight">{svc.name}</h3>
                   <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-2">{svc.shortDesc}</p>
                   
                   <div className="pt-4 mt-auto space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF6600]">
                           Technical Specs <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                       <button 
                         onClick={() => setSelectedService(svc)}
                         className="w-full py-4 bg-[#1A1F2C] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FF6600] transition-all transform group-hover:-translate-y-1 text-center block"
                       >
                         View Details
                       </button>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED SERVICE (CRATE PACKING PREMIUM) */}
      <section className="py-32 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest rounded-full">
                       <Shield size={12}/> Export Grade Protection
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter leading-tight">Heavy Duty <br/> <span className="text-[#FF6600]">Crate Packing.</span></h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                      Our structural crating systems are custom-engineered for multi-ton heavy machinery. Using CNC precision and ISPM-15 certified wood, we ensure your cargo survives the most rigorous global logistics routes.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <p className="text-3xl font-black text-[#1A1F2C]">500T</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Load Capacity</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-3xl font-black text-[#1A1F2C]">100%</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ISPM-15 Compliant</p>
                    </div>
                 </div>

                 <button onClick={openModal} className="inline-flex items-center gap-4 bg-[#1A1F2C] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#FF6600] transition-all shadow-xl">Get Technical Quote <ArrowRight size={16}/></button>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                 <Image src="/images/services/crate_premium.png" alt="Heavy Duty Crating" width={700} height={800} className="rounded-[48px] shadow-2xl object-cover" />
                 <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-2xl space-y-4 max-w-[280px] hidden md:block">
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FF6600" className="text-[#FF6600]" />)}
                    </div>
                    <p className="text-sm font-bold text-[#1A1F2C] leading-tight">"The most structurally sound crating we've seen in 20 years of export."</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">— Siemens India</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>



      {/* SECTION 5: PROCESS SECTION */}
      <section className="py-32 bg-[#0B0F19] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <Image src="/images/services/process_tech.png" alt="BG" fill className="object-cover" />
        </div>
        
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Methodology</div>
             <h2 className="text-5xl font-black text-white tracking-tighter">The Technical <span className="text-[#FF6600]">Blueprint.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
             {/* Connector Line */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block" />
             
             {[
               { n: '01', title: 'Requirement Analysis', desc: 'Dimensions, weight, and transit parameters assessment.' },
               { n: '02', title: 'Design Engineering', desc: 'CAD-based structural blueprinting and load planning.' },
               { n: '03', title: 'Material Selection', desc: 'Sourcing ISPM-15 wood and military barrier foils.' },
               { n: '04', title: 'Execution', desc: 'Precise fabrication and assembly by specialized teams.' },
               { n: '05', title: 'Quality & Dispatch', desc: 'Final compliance audit and documented handover.' },
             ].map((step, i) => (
               <div key={step.n} className="bg-white/5 backdrop-blur-3xl p-8 rounded-[40px] border border-white/10 relative z-10 hover:bg-[#FF6600] transition-colors group">
                  <p className="text-4xl font-black text-[#FF6600] group-hover:text-white mb-6">{step.n}</p>
                  <h4 className="text-white font-black uppercase tracking-wide text-sm mb-4 leading-tight">{step.title}</h4>
                  <p className="text-slate-400 group-hover:text-white/80 text-xs font-medium leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRIES WE SERVE */}
      <section className="py-32 bg-white">
        <div className="container max-w-7xl mx-auto px-6 text-center">
           <div className="mb-20 space-y-4">
              <div className="inline-block px-3 py-1 bg-slate-100 text-[#1A1F2C] text-[10px] font-black uppercase tracking-widest rounded-full">Market Verticals</div>
              <h2 className="text-5xl font-black text-[#1A1F2C] tracking-tighter">Vertical <span className="text-[#FF6600]">Expertise.</span></h2>
           </div>
           
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {industries.map((ind, i) => (
               <div key={ind.name} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:shadow-2xl transition-all group">
                  <div className="text-[#1A1F2C] group-hover:text-[#FF6600] mb-8 flex justify-center transition-colors">
                    {ind.icon}
                  </div>
                  <h4 className="text-xs font-black text-[#1A1F2C] uppercase tracking-widest mb-2">{ind.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{ind.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US (Trust factor) */}
      <section className="py-32 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Pan India Presence', icon: <Globe className="text-[#FF6600]"/>, desc: 'Presence across multiple locations in India.' },
                { title: 'Industry Leadership', icon: <Award className="text-[#FF6600]"/>, desc: 'Trusted by major manufacturing giants.' },
                { title: 'Global Standards', icon: <ShieldCheck className="text-[#FF6600]"/>, desc: 'Fully compliant with international mandates.' },
                { title: 'Strategic Presence', icon: <Users className="text-[#FF6600]"/>, desc: 'Pan India presence across multiple locations.' },
              ].map(card => (
                 <div key={card.title} className="p-10 bg-white rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                       {card.icon}
                    </div>
                    <h4 className="text-xl font-black text-[#1A1F2C] mb-3">{card.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* SECTION 9: INFRASTRUCTURE SUPPORT */}
      <section className="py-32 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                 <div className="space-y-4">
                   <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Physical Capacity</div>
                   <h2 className="text-5xl font-black text-[#1A1F2C] tracking-tighter">Advanced <br/> <span className="text-[#FF6600]">Infrastructure.</span></h2>
                   <p className="text-slate-500 text-lg font-medium leading-relaxed">
                     Operated by a workforce of 2500+ specialists with dedicated automated packing lines to handle complex ODC shipments.
                   </p>
                 </div>
                 <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-3xl text-center shadow-sm">
                       <p className="text-2xl font-black text-[#FF6600]">PAN INDIA</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight mt-2">Presence</p>
                    </div>
                    <div className="p-6 bg-white rounded-3xl text-center shadow-sm">
                       <p className="text-3xl font-black text-[#FF6600]">12+</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight mt-2">CNC <br/> Machines</p>
                    </div>
                    <div className="p-6 bg-white rounded-3xl text-center shadow-sm">
                       <p className="text-3xl font-black text-[#FF6600]">24h</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight mt-2">Mobile <br/> Teams</p>
                    </div>
                 </div>
              </div>
              <Image src="/images/services/infrastructure.png" alt="Factory Floor" width={650} height={500} className="rounded-[40px] shadow-2xl object-cover" />
           </div>
        </div>
      </section>



      {/* SECTION 11: TESTIMONIALS */}
      <section className="py-10 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 space-y-4">
              <div className="inline-block px-3 py-1 bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest rounded-full">Customer Feedback</div>
              <h2 className="text-5xl font-black text-[#1A1F2C] tracking-tighter leading-none mb-4">Trusted by <br/> <span className="text-[#FF6600]">Industry Leaders.</span></h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
             {[
               { name: "S. K. Mehta", role: "SCM Head, Siemens India", text: "Europack's engineering approach to packaging is unparalleled. They don't just crate; they secure and protect." },
               { name: "Anil Kulkarni", role: "Logistics Manager, ABB", text: "Zero rejections at port for over 3 years. Their ISPM-15 documentation handling is world-class." }
             ].map((t, i) => (
                <div key={i} className="p-12 bg-white rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
                   <Quote className="absolute -top-4 -right-4 w-32 h-32 opacity-5 text-[#FF6600]" />
                   <p className="text-[#1A1F2C] text-lg font-bold leading-relaxed italic mb-10 relative z-10">"{t.text}"</p>
                   <div className="flex items-center gap-5 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-slate-100" />
                      <div>
                         <p className="font-black text-[#1A1F2C] text-sm uppercase">{t.role.includes(',') ? t.role.split(',')[1].trim() : t.role}</p>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role.includes(',') ? t.role.split(',')[0].trim() : ''}</p>
                      </div>
                   </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* SECTION 12: FAQ SECTION */}
      <TechFAQ onOpenModal={openModal} />

      {/* SECTION 13: FINAL CTA */}
      <section className="py-40 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="bg-[#1A1F2C] rounded-[64px] p-20 relative overflow-hidden text-center space-y-12">
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6600]/10 rounded-full blur-[120px] -mr-96 -mt-96" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FF6600]/5 rounded-full blur-[100px] -ml-40 -mb-40" />
              
              <div className="relative z-10 space-y-6">
                 <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                   Ready to secure your <br/> <span className="text-[#FF6600] drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]">GLOBAL SHIPMENTS?</span>
                 </h2>
                 <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Join 1000+ satisfied industrial partners. Get a customized technical blueprint and quote within 24 hours.</p>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
                 <button onClick={openModal} className="w-full md:w-auto px-16 py-7 bg-[#FF6600] text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-[#E65C00] transition-all shadow-2xl shadow-orange-500/30 hover:-translate-y-2">Get Free Quote</button>
                 <button onClick={openModal} className="w-full md:w-auto px-16 py-7 bg-white/5 border border-white/10 text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all hover:-translate-y-2 text-center">Contact Us</button>
              </div>
           </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-[#0B0F19]/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[85vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white md:text-[#1A1F2C] md:bg-slate-100 md:hover:bg-slate-200 rounded-full flex items-center justify-center transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Left: Image (40%) */}
              <div className="relative w-full md:w-[40%] h-[250px] md:h-auto overflow-hidden">
                <Image 
                  src={selectedService.img} 
                  alt={selectedService.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 md:hidden">
                   <h2 className="text-3xl font-black text-white tracking-tighter">{selectedService.name}</h2>
                </div>
              </div>

              {/* Right: Content (60%) */}
              <div className="w-full md:w-[60%] overflow-y-auto p-8 md:p-12 lg:p-16 pb-20 md:pb-20 space-y-10 custom-scrollbar">
                <div className="hidden md:block space-y-2">
                  <div className="inline-block px-3 py-1 bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest rounded-full">Technical Detail</div>
                  <h2 className="text-5xl font-black text-[#1A1F2C] tracking-tighter">{selectedService.name}</h2>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Overview</h4>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                    "{selectedService.longDesc}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Core Benefits</h4>
                    <ul className="space-y-4">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="mt-1 bg-orange-100 p-1 rounded-full text-[#FF6600]">
                            <Check size={10} strokeWidth={4} />
                          </div>
                          <span className="text-xs font-bold text-slate-600 leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Technical Features</h4>
                    <ul className="space-y-4">
                      {selectedService.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <div className="mt-1 bg-slate-100 p-1 rounded-full text-[#1A1F2C]">
                            <Settings size={10} strokeWidth={4} />
                          </div>
                          <span className="text-xs font-bold text-slate-600 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      openModal();
                    }}
                    className="flex-1 bg-[#FF6600] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#E65C00] transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                  >
                    Get Technical Quote
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-slate-100 text-[#1A1F2C] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
