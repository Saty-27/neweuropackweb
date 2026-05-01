'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, Check, Shield, Award, Target, Users, 
  Settings, Zap, Globe, Ship, HardHat, Factory,
  Box, Maximize, Anchor, Wrench, FileCheck, Info,
  Search, ShieldCheck, CheckCircle2, Star, Clock, HelpCircle, Quote,
  TrendingUp, Scaling, Briefcase, Cpu, MapPin, Building2, Map, FileText
} from 'lucide-react';
import InquiryModal from '../../../components/layout/InquiryModal';
import TechFAQ from '../../../components/shared/TechFAQ';

export default function AboutClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const openModal = () => setIsModalOpen(true);

  return (
    <main className="bg-white overflow-hidden font-sans selection:bg-[#FF6600] selection:text-white">
      
      {/* SECTION 1: CLEAN CINEMATIC HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B0F19]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about/hero.png"
            alt="Europack Industrial Operations"
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-transparent to-[#0B0F19]" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center text-center space-y-10"
          >
            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-[72px] lg:text-[100px] font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl"
              >
                33 Years of <br />
                <span className="text-[#FF6600] drop-shadow-[0_0_30px_rgba(255,102,0,0.5)] uppercase">Industrial Protection.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/90 text-lg md:text-[24px] max-w-3xl font-medium leading-relaxed text-center mx-auto"
              >
                Transforming logistics through precision-engineered packaging. From heavy machinery to sensitive aerospace cargo, we ensure zero-shift structural integrity for every global export.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link 
                href="/gallery" 
                className="group w-full sm:w-auto px-12 py-6 bg-white text-[#1A1F2C] rounded-[20px] font-black uppercase tracking-widest text-sm hover:bg-[#FF6600] hover:text-white transition-all shadow-2xl hover:-translate-y-2 active:scale-95 flex items-center gap-3"
              >
                View Our Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={openModal}
                className="w-full sm:w-auto px-10 py-5 bg-[#FF6600] text-white rounded-[20px] font-black uppercase tracking-widest text-[13px] hover:bg-[#E65C00] transition-all shadow-xl shadow-orange-500/30 hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4 whitespace-nowrap"
              >
                Get Free Quote <TrendingUp size={18} />
              </button>
              <a 
                href="/Europack-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-[13px] hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-4 whitespace-nowrap"
              >
                Brochure <FileText size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-1 h-12 bg-gradient-to-b from-[#FF6600] to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* SECTION 2: GLOBAL SCALE & MISSION (RE-ALIGNED) */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <Image src="/images/about/blueprint.png" alt="Blueprint" fill className="object-cover" />
        </div>

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Column 1: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest">Global Scale</div>
                <h2 className="text-5xl md:text-7xl font-black text-[#1A1F2C] leading-[0.95] tracking-tighter">
                  About <br />
                  <span className="text-[#FF6600]">Europack.</span>
                </h2>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                  We are a manufacturing-driven packaging solutions company with over <span className="text-[#1A1F2C] font-black">2500 employees</span> spanning across <span className="text-[#FF6600] font-black">multiple locations within India</span> covering over <span className="text-[#1A1F2C] font-black">2.3 lakh sq. mt.</span> of work space. We also have a global presence with manufacturing units and warehouses in <span className="text-[#FF6600] font-black">Germany 🇩🇪</span>, <span className="text-[#FF6600] font-black">Ireland 🇮🇪</span> and <span className="text-[#FF6600] font-black">UAE 🇦🇪</span>.
                </p>

              </div>

              <div className="space-y-8 border-t border-slate-100 pt-10">
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  We support organizations across multiple industries that cannot afford damage, delays or inefficiencies in packaging. In today’s environment, packaging is no longer a cost centre — it is a critical operational lever that impacts product safety, logistics efficiency, compliance and overall supply-chain cost.
                </p>
                
                <div className="p-8 bg-[#1A1F2C] text-white rounded-[40px] relative overflow-hidden group shadow-2xl shadow-slate-900/30">
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center mb-6">
                        <Zap size={24} className="text-white" />
                      </div>
                      <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-slate-100">
                        "Europack works with customers to engineer packaging solutions that reduce damage & overall packaging costs and optimize space & improve storage efficiency."
                      </p>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest pt-4 border-t border-white/10">
                        Our Core Philosophy
                      </p>
                    </div>

                    <div className="space-y-6 pt-2">
                      <p className="text-white font-black uppercase tracking-widest text-[10px] tracking-[0.2em] mb-4">What sets Europack apart:</p>
                      <ul className="grid grid-cols-1 gap-4">
                        {[
                          'Largest in-house manufacturing of industrial pallets & boxes (wooden, paper, plastic, metal), corrugated boxes, skids, crates, straps & tapes etc.',
                          'Custom-engineered packaging aligned to product weight, handling conditions and transit risk',
                          'Capability to support large volumes, tight timelines and sudden surge in requirements',
                          'Proven execution for high-value, fragile, complex and mission-critical consignments',
                          'A strong focus on cost optimization through design, material selection and load efficiency',
                          'We are ISO 9001:2015 certified',
                          'Our export packing boxes and wooden pallets are ISPM-15 compliant'
                        ].map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                            <Check size={16} className="text-[#FF6600] mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF6600]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                </div>
              </div>
            </motion.div>

            {/* Column 2: RE-ALIGNED Visual Content (Filling White Space) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
            >
              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="aspect-[4/5] bg-slate-100 rounded-[48px] overflow-hidden shadow-2xl relative group flex-grow">
                  <Image src="/images/about/overview.png" alt="Manufacturing Hub" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-white font-black uppercase tracking-widest text-[10px] mb-1">Scale</p>
                    <p className="text-white text-2xl font-black uppercase">Industrial Force</p>
                  </div>
                </div>
                <div className="p-10 bg-orange-50 rounded-[48px] border border-orange-100 flex flex-col items-center text-center justify-center space-y-3 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF6600] text-white flex items-center justify-center">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <p className="text-5xl font-black text-[#FF6600]">2.3L</p>
                    <p className="text-[12px] font-black text-[#1A1F2C] uppercase tracking-widest">Sq. Mt. Workspace</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-between h-full">
                <div className="p-10 bg-[#1A1F2C] rounded-[48px] flex flex-col items-center text-center justify-center space-y-3 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 text-[#FF6600] flex items-center justify-center relative z-10">
                    <Users size={32} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-5xl font-black text-[#FF6600]">2500+</p>
                    <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Workforce Pan-India</p>
                  </div>
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF6600]/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                </div>
                <div className="aspect-[4/5] bg-slate-100 rounded-[48px] overflow-hidden shadow-2xl relative group flex-grow">
                  <img src="/images/products/user_heavy_engineering_crane.jpg" alt="Global Logistics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="text-white font-black uppercase tracking-widest text-[10px] mb-1">Global</p>
                    <p className="text-white text-2xl font-black uppercase">Supply Chain</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: UNIQUE VALUE PROPOSITION GRID */}
      <section className="py-32 bg-slate-50 relative border-y border-slate-100">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-block px-4 py-1.5 rounded-full bg-[#1A1F2C] text-white text-[10px] font-black uppercase tracking-widest">Competitive Edge</div>
             <h2 className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter">Unique Value <span className="text-[#FF6600]">Proposition.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                icon: <Factory size={40}/>, 
                title: 'Manufacturing Power', 
                desc: 'Largest in-house manufacturing of industrial pallets & boxes (wooden, paper, plastic, metal), corrugated boxes, skids, crates, straps & tapes etc.'
              },
              { 
                icon: <Cpu size={40}/>, 
                title: 'Custom Engineering', 
                desc: 'Custom-engineered packaging aligned to product weight, handling conditions and transit risk through load-specific logic.'
              },
              { 
                icon: <Scaling size={40}/>, 
                title: 'Scale & Speed', 
                desc: 'Capability to support large volumes, tight timelines and sudden surge in requirements with zero downtime.'
              },
              { 
                icon: <Briefcase size={40}/>, 
                title: 'Execution Excellence', 
                desc: 'Proven execution for high-value, fragile, complex and mission-critical consignments across global routes.'
              },
              { 
                icon: <TrendingUp size={40}/>, 
                title: 'Cost Optimization', 
                desc: 'A strong focus on cost optimization through design, material selection and load efficiency to maximize ROI.'
              },
              { 
                icon: <ShieldCheck size={40}/>, 
                title: 'Compliance & Quality', 
                desc: 'ISO 9001:2015 certified and ISPM-15 compliant wooden pallets and export boxes for guaranteed global acceptance.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-12 bg-white rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-slate-100"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-50 text-[#FF6600] flex items-center justify-center mb-10 group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                
                <h3 className="text-2xl font-black text-[#1A1F2C] mb-4 group-hover:text-[#FF6600] transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {item.desc}
                </p>
                <div className="absolute -right-10 -bottom-10 opacity-0 group-hover:opacity-5 transition-opacity">
                  <Star size={160} className="text-[#FF6600]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPANY OVERVIEW */}
      <section className="py-24 md:py-32">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 max-w-[580px]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[#FF6600]" />
                <span className="text-[#FF6600] text-[12px] font-black uppercase tracking-widest">Our Core Mission</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] leading-[1.05] tracking-tighter">
                We Engineer Safety <br />
                <span className="text-[#FF6600]">Into Every Shipment.</span>
              </h2>
              <div className="space-y-6">
                <p className="text-slate-600 text-lg md:text-xl leading-[1.7] font-medium">
                  At Europack, packaging is not just protection — it’s engineered performance. From multi-ton industrial machinery to precision-sensitive equipment, we design packaging systems that ensure structural integrity, environmental resistance, and global compliance.
                </p>
                <p className="text-slate-500 text-base md:text-lg leading-[1.7]">
                   Our engineering team analyzes every load parameter—mass, center of gravity, transit route, and storage duration—to build a customized blueprint. We don't just crate cargo; we secure your brand's reputation at every destination port worldwide.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 pt-4">
                {['ISPM-15 Certified Wood', 'Mobile On-Site Teams', 'VCI Rust Prevention', 'Automated Crate Production'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-black text-[#1A1F2C] uppercase tracking-widest">
                    <CheckCircle2 size={18} className="text-[#FF6600]" /> {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image 
                src="/images/about/safety_mission.png"
                alt="Engineering Safety"
                width={700}
                height={800}
                className="rounded-[48px] shadow-2xl object-cover aspect-[4/5] hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[32px] shadow-2xl hidden md:block border border-slate-100">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#1A1F2C]">33+</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Years of Trust</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ENGINEERING-FIRST PRINCIPLES */}
      <section className="py-32 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/images/about/blueprint.png" alt="Blueprint" fill className="object-cover" />
        </div>
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest">The Europack DNA</div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Principles of <span className="text-[#FF6600]">Engineering First.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { icon: <ShieldCheck size={40}/>, title: 'Quality Discipline', desc: 'No under-speccing. Every crate is built to exceed load requirements.' },
              { icon: <Target size={40}/>, title: 'Precision Obsession', desc: 'Detailed 3D load simulation ensuring zero cargo shift during sea transit.' },
              { icon: <Settings size={40}/>, title: 'Innovation Driven', desc: 'Custom CNC automation for rapid, uniform crate production lines.' },
              { icon: <Award size={40}/>, title: 'Absolute Compliance', desc: '100% ISPM-15, ISO 9001:2015, and global phytosanitary standards.' },
              { icon: <Zap size={40}/>, title: 'Operational Speed', desc: 'Mobilizing on-site teams to any Indian port within 24-48 hours.' },
              { icon: <Users size={40}/>, title: 'Partnership Integrity', desc: 'Extreme transparency in material grades and transparent pricing models.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.02 }}
                className="p-10 md:p-12 bg-white/5 border border-white/10 rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 group min-h-[350px] flex flex-col justify-between"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/5 text-[#FF6600] flex items-center justify-center group-hover:bg-[#FF6600] group-hover:text-white transition-all duration-500 shadow-inner">
                  {v.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white">{v.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: STATS */}
      <section ref={statsRef} className="py-24 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 lg:gap-32">
            {[
              { label: 'Export Destinations', value: 80, suffix: '+' },
              { label: 'Happy Customers', value: 1000, suffix: '+' },
              { label: 'Strategic Locations', custom: 'PAN INDIA' },
              { label: 'Employees', value: 2500, suffix: '+' },
            ].map((stat: any, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`${stat.custom ? 'text-[32px] md:text-[42px]' : 'text-[52px] md:text-[64px]'} font-black text-[#FF6600] leading-none mb-3`}>
                  {stat.custom ? stat.custom : (statsInView ? <CountUp end={stat.value} duration={2.5} /> : 0)}
                  {!stat.custom && stat.suffix}
                </div>
                <div className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: ENGINEERED WORKFLOW */}
      <section className="py-32 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter">Our Engineered <span className="text-[#FF6600]">Workflow.</span></h2>
          </div>

          <div className="relative">
            {/* Animated Progress Line */}
            <div className="hidden lg:block absolute top-[48px] left-0 w-full h-[2px] bg-slate-100">
              <motion.div 
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-[#FF6600]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-16">
              {[
                { step: '01', title: 'Technical Audit', desc: 'Analyzing load mass, dimensions, and center of gravity.' },
                { step: '02', title: 'Custom Design', desc: 'Blueprinting support pillars and structural load frames.' },
                { step: '03', title: 'Grade Match', desc: 'Selecting ISPM-15 wood and moisture barrier materials.' },
                { step: '04', title: 'Precision Packing', desc: 'Export packing by mobile professional on-site teams.' },
                { step: '05', title: 'Final Dispatch', desc: 'Technical documentation and phytosanitary clearance.' },
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center group">
                  <div className="w-24 h-24 rounded-[40px] bg-white border-2 border-slate-100 text-[#1A1F2C] text-3xl font-black flex items-center justify-center mb-8 mx-auto group-hover:bg-[#FF6600] group-hover:text-white group-hover:border-[#FF6600] transition-all duration-500 shadow-xl group-hover:scale-110">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-black text-[#1A1F2C] mb-4 group-hover:text-[#FF6600] transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: GLOBAL COMPLIANCE */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="container max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 max-w-[550px]">
                 <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest">Global Trust</div>
                 <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter leading-tight">Global Clearance. <br/> <span className="text-[#FF6600]">Zero Port Rejection.</span></h2>
                 <p className="text-slate-500 text-lg leading-relaxed font-medium">
                   Shipping high-value cargo shouldn't be a gamble. We ensure 100% compliance with ISPM-15 and global phytosanitary standards. Our packaging is designed to clear customs at any major port—from Rotterdam to Singapore—without a single delay.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-2">
                      <ShieldCheck size={40} className="text-[#FF6600]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">ISPM-15</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Certified</span>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 flex flex-col items-center text-center space-y-2">
                      <Award size={40} className="text-[#FF6600]" />
                      <span className="text-[10px] font-black uppercase tracking-widest">ISO 9001:2015</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Certified</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    {['Fumigated & Heat Treated Wood', 'Phytosanitary Certificates Provided', 'International Logistics Ready', 'Zero Mold/Moisture Guarantee'].map(c => (
                      <div key={c} className="flex items-center gap-3 text-xs font-black text-[#1A1F2C] uppercase tracking-widest">
                         <CheckCircle2 size={16} className="text-[#FF6600]" /> {c}
                      </div>
                    ))}
                 </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Image 
                  src="/images/about/shipment.png" 
                  alt="Port Loading" 
                  width={700}
                  height={500}
                  className="rounded-[48px] shadow-2xl object-cover aspect-[4/3]"
                />
                <div className="absolute top-10 -right-10 bg-[#FF6600] text-white p-6 rounded-3xl shadow-2xl hidden md:block">
                   <p className="text-3xl font-black tracking-tighter">100%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest">Compliance Rate</p>
                </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONIALS */}
      <section className="py-32 bg-white">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-6">Social Proof</div>
             <h2 className="text-4xl md:text-[56px] font-black text-[#1A1F2C] tracking-tighter">Verified <span className="text-[#FF6600]">Industrial Trust.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              { customer: "Siemens India", role: "Logistics Head", text: "Zero-damage record across 500+ international projects. Europack is our most reliable partner." },
              { customer: "TATA Motors", role: "SCM Director", text: "Their technical documentation and compliance handling saves us tremendous time and port-fees." }
            ].map((t, i) => (
              <div key={i} className="p-12 bg-slate-50 border border-slate-100 rounded-[48px] relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
                 <div className="text-[#FF6600] mb-8"><Quote size={40}/></div>
                 <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed italic mb-10">"{t.text}"</p>
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-slate-200" />
                    <div>
                       <p className="font-black text-[#1A1F2C] uppercase tracking-widest text-[12px]">{t.customer}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="py-40 bg-[#0B0F19] relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6600]/10 rounded-full blur-[120px] -mr-96 -mt-96" />
         
         <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-[84px] font-black text-white leading-[0.9] tracking-tighter">
                Ready to work with <br/> <span className="text-[#FF6600] drop-shadow-[0_0_20px_rgba(255,102,0,0.3)]">PACKAGING EXPERTS?</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Join 1000+ satisfied industrial partners. Get a customized technical blueprint and quote within 24 hours.</p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-6">
              <button 
                onClick={openModal}
                className="w-full md:w-auto px-16 py-7 bg-[#FF6600] text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-[#E65C00] transition-all shadow-2xl shadow-orange-500/30 hover:-translate-y-2 active:scale-95"
              >
                Inquire Now
              </button>
              <Link 
                href="/products" 
                className="w-full md:w-auto px-16 py-7 bg-white/5 border border-white/10 text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all hover:-translate-y-2 active:scale-95 text-center"
              >
                View Products
              </Link>
            </div>
         </div>
      </section>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
