'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, Play, Package, Globe, Users, Clock, Award,
  Star, ChevronRight, Plus, Minus, Phone, Shield,
  Check, Send, MapPin, Mail, Menu, X, ChevronDown, Quote, Search,
  AlertCircle, CheckCircle2, Target, Ship, MessagesSquare, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import InquiryModal from '../../components/layout/InquiryModal';
import TechFAQ from '../../components/shared/TechFAQ';
import { useModal } from '../../context/ModalContext';
import { partnersList } from '../../data/partners';

function Hero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-[#0B0F19] overflow-hidden group">
      {/* Background Layer: Final High-Fidelity Banner */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/hero_banner_final.png"
          alt="Industrial Export Packaging Scene"
          fill
          priority
          className="w-full h-full object-cover opacity-70 scale-105 group-hover:scale-110 transition-transform duration-[10s] ease-linear"
        />

        {/* Dynamic Dark Gradient Overlay - 70% Left focus for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 via-[#0B0F19]/40 to-transparent"></div>

        {/* Cinematic Particles/Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Decorative Antigravity Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute w-[800px] h-[800px] -right-[10%] -top-[10%] opacity-20 pointer-events-none">
          <div className="w-full h-full border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
        </div>
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 w-full pt-[120px]">
        <div className="max-w-4xl">


          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl"
          >
            India’s Largest <br />
            <span className="text-[#FF6600]">Industrial Packaging</span> <br />
            <span className="text-white">Experts.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-slate-300 text-lg md:text-xl max-w-3xl mb-14 leading-relaxed font-medium"
          >
            We are a manufacturing-driven packaging solutions company with over <span className="text-white font-black">2500 employees</span> spanning across <span className="text-[#FF6600] font-black">multiple locations within India</span> covering over <span className="text-white font-black">2.3 lakh sq. mt.</span> of work space. We also have a global presence with manufacturing units and warehouses in <span className="text-[#FF6600] font-black">Germany 🇩🇪</span>, <span className="text-[#FF6600] font-black">Ireland 🇮🇪</span> and <span className="text-[#FF6600] font-black">UAE 🇦🇪</span>.
          </motion.p>


          {/* Service Line - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-14 px-8 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl inline-block"
          >
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
              WOOD, PLASTIC, PAPER, METAL - PALLETS | BOXES | SKIDS | CASES | STRAPS | TAPES | BUCKLES | THERMAL COVERS | STRETCH FILM AND MORE
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-6"
          >
            <button
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-4 bg-[#FF6600] text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[13px] shadow-[0_20px_40px_rgba(255,102,0,0.3)] hover:bg-[#e65c00] transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
            >
              Get Quote <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-700 -translate-x-full skew-x-12" />
            </button>

            <a
              href="/Europack-Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[13px] hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
            >
              Brochure <FileText size={20} className="group-hover:scale-110 transition-transform" />
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-[14px] border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 active:scale-95 shadow-2xl"
            >
              View Products <Package size={20} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Extreme Bottom Accents */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
          <Shield size={14} className="text-[#FF6600]" />
          ISPM-15 Heat Treated
        </div>
      </div>
    </section>
  );
}



// ── PARTNER BAR ───────────────────────────────────────────────────────────────
function PartnerBar() {
  const logos = partnersList;
  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden shadow-sm z-30 relative">
      <div className="flex gap-24 overflow-hidden items-center">
        <div className="flex gap-32 animate-[marquee_40s_linear_infinite] items-center whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((l, i) => (
            <div key={i} className="relative h-14 md:h-20 w-32 md:w-48 shrink-0">
              <Image 
                src={l.src} 
                alt={l.name} 
                fill
                className="object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100" 
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes antigravity-float {
          0% { transform: translateY(0px) rotate(var(--r, 5deg)); }
          50% { transform: translateY(-15px) rotate(calc(var(--r, 5deg) + 3deg)); }
          100% { transform: translateY(0px) rotate(var(--r, 5deg)); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
      `}</style>
    </section>
  );
}

// ── INTRO / WELCOME SECTION ───────────────────────────────────────────────────
function Intro() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    import('../../lib/api').then(({ fetchAPI }) => {
      fetchAPI('/homepage').then((res) => {
        if (res.success && res.data?.welcomeSection) {
          setData(res.data.welcomeSection);
        }
      }).catch(err => console.error('Intro fetch error:', err));
    });
  }, []);

  if (!data) return null;

  const renderIcon = (iconName: string) => {
    const props = { size: 24, strokeWidth: 2.5, className: "w-6 h-6 sm:w-8 sm:h-8" };
    switch (iconName) {
      case 'users': return <Users {...props} />;
      case 'clock': return <Clock {...props} />;
      case 'shield': return <Shield {...props} />;
      case 'globe': return <Globe {...props} />;
      case 'award': return <Award {...props} />;
      case 'box': return <Package {...props} />;
      default: return <Users {...props} />;
    }
  };

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/images/banners/welcome-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Antigravity Floating Belts Simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 Mix-blend-multiply">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '120%',
              height: '2px',
              background: '#FF6600',
              top: `${30 + i * 40}%`,
              left: '-10%',
              transformOrigin: 'center',
              transform: `rotate(${5 + i * -10}deg)`,
              animation: `antigravity-float ${8 + i * 3}s infinite ease-in-out ${i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* TOP SECTION: Full Width Text */}
        <div className="max-w-4xl mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-4">
            ABOUT EUROPACK
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tight mb-8">
            About <span className="text-[#FF6600]">Europack</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
            Since 1993, Europack has protected the products of India's most demanding manufacturers. From heavy machinery export crating to precision pharmaceutical packaging — we engineer solutions that guarantee safe arrival, every time.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Europack is a prominent name in the manufacturing, exporting and supplying of Packaging Products. The company is known for its quality packaging products in the packing materials and moving business and is committed to ensure the safety and timely delivery of your goods.
          </p>
          <div className="mt-10">
            <Link href="/about" className="inline-flex items-center gap-3 bg-white border-2 border-[#1A1F2C] text-[#1A1F2C] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1A1F2C] hover:text-white transition-all shadow-lg active:scale-95">
              More About Our Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION: Split Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

          {/* LEFT SIDE: Feature Cards */}
          <div className="flex flex-col gap-5 justify-center">
            {data.featureCards?.length > 0 ? data.featureCards.map((feat: any, idx: number) => (
              <div key={idx} className="flex items-center gap-5 bg-white p-5 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-50 w-full hover:shadow-[0_15px_40px_rgba(255,102,0,0.1)] transition-all">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#FF6600] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(255,102,0,0.4)]">
                  {feat.icon ? (
                    <img src={feat.icon.startsWith('http') ? feat.icon : `http://localhost:5002/${feat.icon}`} alt={feat.iconAlt || feat.title} className="w-8 h-8 object-contain filter brightness-0 invert" />
                  ) : (
                    <Star size={24} strokeWidth={2.5} />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#1A1F2C] leading-snug">{feat.title}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-snug mt-1">{feat.description}</p>
                </div>
              </div>
            )) : (
              [
                { title: 'Innovation', desc: 'Cutting-edge packaging solutions with latest technology and materials', icon: renderIcon('award') },
                { title: 'Expertise', desc: 'Cutting-edge packaging solutions with latest technology and materials', icon: renderIcon('shield') },
                { title: 'Transparency', desc: 'Cutting-edge packaging solutions with latest technology and materials', icon: renderIcon('users') }
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-white p-5 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-slate-50 w-full hover:shadow-[0_15px_40px_rgba(255,102,0,0.1)] transition-all">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-[#FF6600] text-white flex items-center justify-center shadow-[0_4px_15px_rgba(255,102,0,0.4)]">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#1A1F2C] leading-snug">{feat.title}</h4>
                    <p className="text-xs font-medium text-slate-500 leading-snug mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT SIDE: Counter Cards (Without Icons, as requested) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {[
              { val: 1000, suffix: '+', label: 'Happy Customers', link: null },
              { val: 33, suffix: '', label: 'Years Experience', link: null },
              { val: 100, suffix: '%', label: 'Safe Delivery', link: null },
              { val: 100, suffix: '+', label: 'Quality Products', link: '/products' }
            ].map((card: any, idx: number) => (
              card.link ? (
                <a key={idx} href={card.link} className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center group border border-slate-50 hover:scale-[1.02] hover:border-[#FF6600]/20 transition-all duration-300 cursor-pointer">
                  <p className="text-5xl font-black text-[#FF6600] mb-2 tracking-tighter">
                    {inView ? <CountUp end={card.val} duration={2} suffix={card.suffix} /> : '0'}
                  </p>
                  <p className="text-[14px] font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-[#FF6600] transition-colors">
                    {card.label}
                  </p>
                </a>
              ) : (
                <div key={idx} className="bg-white p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center group border border-slate-50 hover:scale-[1.02] transition-transform duration-300">
                  <p className="text-5xl font-black text-[#FF6600] mb-2 tracking-tighter">
                    {inView ? <CountUp end={card.val} duration={2} suffix={card.suffix} /> : '0'}
                  </p>
                  <p className="text-[14px] font-black text-slate-500 uppercase tracking-widest mt-2">
                    {card.label}
                  </p>
                </div>
              )
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes antigravity-float {
          0% { transform: translateY(0px) rotate(var(--r, 5deg)); }
          50% { transform: translateY(-15px) rotate(calc(var(--r, 5deg) + 3deg)); }
          100% { transform: translateY(0px) rotate(var(--r, 5deg)); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}

// ── FEATURED PRODUCTS ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const { openEnquiryModal } = useModal();
  
  const featuredProducts = [
    {
      title: "Wooden Pallets",
      description: "ISPM-15 certified pallets built to handle heavy-duty export loads with reliability.",
      image: "/images/products/four-way-pallets.webp",
      features: ["Heat-treated pine wood", "Export compliant (ISPM-15)", "High load capacity", "Custom sizes available"],
      slug: "wooden-pallets/four-way-pallet"
    },
    {
      title: "Corrugated Boxes",
      description: "3-ply to 9-ply custom-printed corrugated boxes for any weight requirement.",
      image: "/images/products/corrugatedBoxes.png",
      features: ["7-ply extreme strength", "Moisture resistant coating", "Custom brand printing", "Stackable rigidity"],
      slug: "corrugated-cartons/9ply-heavy-duty"
    },
    {
      title: "Dunnage Bags",
      description: "AAR-certified inflatable void fill bags for zero cargo shift in transit.",
      image: "/images/products/user_dunnage_bag.webp",
      features: ["AAR certified materials", "Zero cargo shifting", "Reusable heavy-duty valve", "High burst pressure"],
      slug: "dunnage-bag/air-dunnage-bags"
    },
    {
      title: "Seaworthy Packing",
      description: "Multi-layered moisture barrier packing for long sea voyages.",
      image: "/images/products/user_seaworthy_laminates.jpg",
      features: ["VCI foil wrapping", "Desiccant insertion", "Rust & corrosion proof", "Vacuum internal seal"],
      slug: "special-services/seaworthy-packing"
    },
    {
      title: "Lashing Materials",
      description: "Industrial grade heavy lashing straps and securing mechanisms.",
      image: "/images/products/user_lashing_materials.jpg",
      features: ["5 Ton load capacity", "Weather resistant poly", "Heavy duty ratchets", "Container compliant"],
      slug: "lashing-materials/ratchet-belt"
    },
    {
      title: "Vacuum Packing",
      description: "Complete vacuum sealing for sensitive electronics and machinery.",
      image: "/images/products/user_vacuum_packing.png",
      features: ["100% moisture removal", "Dust and dirt proof", "Extends shelf life", "Anti-static options"],
      slug: "vacuum-packaging/multilayer-laminated-vci"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{
      background: `linear-gradient(rgba(241, 245, 249, 0.94), rgba(241, 245, 249, 0.94)), url('/images/warehouse-blur.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-4">Featured Solutions</div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tight">Our Packaging <span className="text-[#FF6600]">Products.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(p => (
            <Link href={`/products/${p.slug}`} key={p.title} className="bg-white rounded-[24px] overflow-hidden border border-slate-200/50 transition-all duration-500 hover:-translate-y-3 hover:cursor-pointer group block no-underline" style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.02)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.05)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.02)'}>
              <div className="h-[220px] w-full overflow-hidden relative bg-slate-50 p-4">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#1A1F2C] text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 mb-4 h-[40px] leading-relaxed">{p.description}</p>
                <div className="flex justify-between items-center mt-[15px] pt-4 border-t border-slate-50">
                  <div className="px-5 py-2.5 text-[13px] font-bold border border-[#ddd] text-slate-600 rounded-lg group-hover:bg-[#FF6600] group-hover:text-white group-hover:border-[#FF6600] transition-all uppercase tracking-wide">View Details</div>
                  <button 
                    onClick={openEnquiryModal}
                    className="px-5 py-2.5 text-[13px] font-bold bg-[#ff6a00] text-white rounded-lg hover:bg-[#e65c00] transition-colors shadow-md shadow-orange-200 uppercase tracking-wide"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/products" className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#FF6600] hover:text-white transition-all">
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function Services() {
  const items = [
    { name: 'Crate Packing', img: '/images/services/ai/crate_packing.png', href: '/services', desc: 'Custom ISPM-15 wooden crates for heavy machinery and export cargo.' },
    { name: 'Stretch Wrapping', img: '/images/services/ai/stretch_wrapping.png', href: '/services', desc: 'Automated pallet stretch wrapping for load stability and protection.' },
    { name: 'Anti-Rust Coating', img: '/images/services/ai/anti_rust.png', href: '/services', desc: 'VCI film treatment and anti-rust oil for long-term metal protection.' },
    { name: 'Export lashing', img: '/images/services/ai/export_lashing_clean.png', href: '/services', desc: 'High-tension lashing for ODC cargo, containers, and flatracks.' },
    { name: 'Vacuum Packing', img: '/images/services/ai/vacuum_packing.png', href: '/services', desc: 'Moisture-proof aluminum barrier foil packing for sensitive electronics.' },
    { name: 'Wooden Pallets', img: '/images/services/ai/wooden_pallets.png', href: '/products', desc: 'Custom 2-way and 4-way entry pallets for domestic and export use.' },
    { name: 'Corrugated Boxes', img: '/images/services/ai/corrugated_boxes.png', href: '/products', desc: 'Heavy-duty 9-ply boxes for automotive and retail logistics.' },
    { name: 'On-Site Packing', img: '/images/services/ai/onsite_packing.png', href: '/services', desc: 'Our mobile teams pack your machinery at your factory or warehouse.' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%]"
        >
          <Plus size={100} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[15%]"
        >
          <Award size={120} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.2em] mb-4">
              What We Do
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter leading-tight">
              Our Core <br />
              <span className="text-[#FF6600]">Services.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 group font-black text-[#FF6600] uppercase tracking-widest text-sm hover:gap-4 transition-all"
          >
            View All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-x-auto lg:overflow-hidden no-scrollbar touch-pan-y">
                <motion.div
          drag="x"
          dragConstraints={{ left: -3000, right: 0 }}
          dragElastic={0.1}
          className="flex gap-5 sm:gap-8 px-4 sm:px-[10%] cursor-grab active:cursor-grabbing pb-12 pt-10" 
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...items, ...items].map((s, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[300px] h-[350px] shrink-0 rounded-[32px] overflow-hidden relative group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,102,0,0.3)]"
            >
              <Image 
                src={s.img} 
                alt={s.name} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-[#1A1F2C]/40 to-transparent group-hover:via-[#1A1F2C]/60 transition-all opacity-90"></div>

              {/* Smooth Glow Border on Hover */}
              <div className="absolute inset-0 border-[3px] border-[#FF6600]/0 group-hover:border-[#FF6600]/50 rounded-[32px] transition-all duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(255,102,0,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,102,0,0.2)]"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-[#FF6600] text-[10px] font-black uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Service Excellence</p>
                <h3 className="text-white text-2xl font-black mb-3 leading-tight">{s.name}</h3>
                <p className="text-slate-300 text-[13px] font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{s.desc}</p>
              </div>

              {/* Live "Breathe" Effect */}
              <div className="absolute inset-0 animate-pulse pointer-events-none bg-[#FF6600]/5 rounded-[32px]"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── INDUSTRIES ────────────────────────────────────────────────────────────────
function Industries() {
  const industries = [
    {
      title: 'Heavy Engineering',
      subtitle: 'High-Load Protection',
      desc: 'Packaging for turbines, generators & heavy machinery.',
      img: '/images/industries/ai/heavy_engineering.png'
    },
    {
      title: 'Pharmaceuticals',
      subtitle: 'Clean & Compliant',
      desc: 'Hygienic, moisture-proof export packaging solutions.',
      img: '/images/industries/ai/pharmaceuticals.png'
    },
    {
      title: 'Automotive',
      subtitle: 'Precision & Safety',
      desc: 'Damage-proof transport for auto components & assemblies.',
      img: '/images/industries/ai/automotive.png'
    },
    {
      title: 'FMCG & Retail',
      subtitle: 'Fast & Scalable',
      desc: 'Bulk packaging for retail logistics and distribution.',
      img: '/images/industries/ai/fmcg_retail.png'
    },
    {
      title: 'Defence & Aerospace',
      subtitle: 'Critical Protection',
      desc: 'High-security packaging for sensitive equipment.',
      img: '/images/industries/ai/defence_aerospace.png'
    },
    {
      title: 'Energy & Power',
      subtitle: 'Heavy Duty',
      desc: 'Export packaging for transformers & power equipment.',
      img: '/images/industries/ai/energy_power.png'
    },
    {
      title: 'IT & Electronics',
      subtitle: 'Shock-Proof',
      desc: 'Anti-static and secure packaging for electronics.',
      img: '/images/industries/ai/it_electronics.png'
    },
    {
      title: 'Chemical & Hazmat',
      subtitle: 'Safe Handling',
      desc: 'Hazard-compliant packaging with leak protection.',
      img: '/images/industries/ai/chemical_hazmat.png'
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%]"
        >
          <Package size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[10%]"
        >
          <Globe size={150} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.2em] mb-4">
              Industry Sectors
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A1F2C] tracking-tighter leading-tight">
              Serving Critical <br />
              <span className="text-[#FF6600]">Industries Worldwide.</span>
            </h2>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 group font-black text-[#FF6600] uppercase tracking-widest text-sm hover:gap-4 transition-all"
          >
            View All Industries <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-x-auto lg:overflow-hidden no-scrollbar touch-pan-y">
                <motion.div
          drag="x"
          dragConstraints={{ left: -3000, right: 0 }}
          dragElastic={0.1}
          className="flex gap-5 sm:gap-8 px-4 sm:px-[10%] cursor-grab active:cursor-grabbing pb-12 pt-10" 
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...industries, ...industries].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[300px] h-[350px] shrink-0 rounded-[32px] overflow-hidden relative group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(255,102,0,0.3)]"
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-[#1A1F2C]/40 to-transparent group-hover:via-[#1A1F2C]/60 transition-all opacity-90"></div>

              {/* Smooth Glow Border on Hover */}
              <div className="absolute inset-0 border-[3px] border-[#FF6600]/0 group-hover:border-[#FF6600]/50 rounded-[32px] transition-all duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(255,102,0,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,102,0,0.2)]"></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-[#FF6600] text-[10px] font-black uppercase tracking-[0.2em] mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.subtitle}</p>
                <h3 className="text-white text-2xl font-black mb-3 leading-tight">{item.title}</h3>
                <p className="text-slate-300 text-[13px] font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">{item.desc}</p>
              </div>

              {/* Live "Breathe" Effect */}
              <div className="absolute inset-0 animate-pulse pointer-events-none bg-[#FF6600]/5 rounded-[32px]"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}


// ── GLOBAL PARTNER ────────────────────────────────────────────────────────────
function GlobalPartner() {
  const { openEnquiryModal } = useModal();
  return (
    <section className="bg-[#0B0F19] overflow-hidden relative min-h-[80vh] lg:h-[90vh] flex items-center border-b border-white/5">
      {/* 5% Opacity Subtle Dotted Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Left Column: Content Area (50%) */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 lg:py-0">


          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            Your Global <br />
            <span className="text-[#ff6a00]">Packaging Partner</span>
          </h2>

          <p className="text-slate-400 text-lg mb-12 leading-relaxed font-medium max-w-lg">
            Delivering export-ready packaging solutions with reliability, compliance, and 33+ years of experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-12">
            {[
              "ISPM-15 Certified",
              "ISPM-15 Compliant",
              "1000+ Customers Served",
              "33+ Years Experience"
            ].map((check) => (
              <div key={check} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]" />
                <span className="text-white/90 font-bold text-xs tracking-widest uppercase">{check}</span>
              </div>
            ))}
          </div>

          <button
            onClick={openEnquiryModal}
            className="group inline-flex items-center gap-3 bg-[#ff6a00] text-white px-12 py-5 rounded-lg font-black uppercase text-xs tracking-[0.2em] hover:bg-[#e65c00] transition-all self-start shadow-2xl active:scale-95 hover:-translate-y-1"
          >
            Discuss Export Packaging
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Column: Image Area (50%) - STARK SPLIT */}
        <div className="relative min-h-[400px] lg:min-h-full overflow-hidden border-l border-white/5">
          <Image
            src="/images/banners/industrial_packaging_global.png"
            alt="Europack Industrial Packaging"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}


// ── BLOG TEASERS ──────────────────────────────────────────────────────────────
function BlogTeasers() {
  const posts = [
    { 
      title: 'ISPM-15: The Complete Guide to Heat-Treated Packaging', 
      cat: 'Compliance', 
      img: '/images/service_crate_packing.png', 
      slug: 'ispm-15-guide-heat-treated-packaging' 
    },
    { 
      title: 'The Physics of Ocean Lashing: Achieving Zero Cargo Shift', 
      cat: 'Technical', 
      img: '/images/home/ocean_lashing.png', 
      slug: 'physics-of-ocean-lashing' 
    },
    { 
      title: 'VCI Packaging: How to Protect Metal from Corrosion', 
      cat: 'Innovation', 
      img: '/images/service_antirust.png', 
      slug: 'vci-packaging-corrosion-protection' 
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-4">Industrial Knowledge</div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tight">Latest <span className="text-[#FF6600]">Insights.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col bg-white border border-slate-100">
              <div className="aspect-video overflow-hidden relative">
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="inline-block px-3 py-1 rounded-lg bg-orange-100 text-[#FF6600] text-[9px] font-black uppercase tracking-widest mb-3 self-start">{p.cat}</span>
                <h3 className="font-black text-[#1A1F2C] text-lg leading-tight flex-1 mb-4">{p.title}</h3>
                <span className="flex items-center gap-1 text-[#FF6600] text-[11px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">Read Article <ArrowRight size={12} /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="inline-flex items-center gap-2 border-2 border-[#FF6600] text-[#FF6600] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#FF6600] hover:text-white transition-all">View All Articles <ArrowRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}

// ── GALLERY PREVIEW ───────────────────────────────────────────────────────────
function GalleryPreview() {
  const imgs = [
    '/images/gallery/ExportPacking.webp',
    '/images/gallery/heavymachinepacking.webp',
    '/images/gallery/woodenskids.webp',
    '/images/gallery/heavyengineeringpacking.webp',
    '/images/gallery/shrinkpacking.webp',
    '/images/gallery/naillessboxes.webp',
    '/images/gallery/plywoodBoxes.webp',
    '/images/gallery/hugemachinepacking.webp',
    '/images/gallery/Boxes.webp',
    '/images/gallery/Packing.webp'
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-3">Work Portfolio</div>
            <h2 className="text-4xl font-black text-[#1A1F2C] tracking-tight">Project <span className="text-[#FF6600]">Gallery.</span></h2>
          </div>
          <Link href="/gallery" className="hidden md:inline-flex items-center gap-2 bg-[#FF6600] text-white px-7 py-3.5 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-[#e65c00] transition-colors">View All <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((img, i) => (
            <div key={i} className="group relative rounded-[24px] overflow-hidden aspect-square shadow-lg">
              <Image 
                src={img} 
                alt={`Gallery ${i + 1}`} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-[#1A1F2C]/0 group-hover:bg-[#1A1F2C]/40 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── VIDEOS ────────────────────────────────────────────────────────────────────
function VideosSection() {
  const vids = [
    { id: 'BDI5S6lmr-Y', title: 'Europack Plywood Boxes', dur: '4:32', thumb: 'https://img.youtube.com/vi/BDI5S6lmr-Y/maxresdefault.jpg', category: 'Infrastructure' },
    { id: 'QtF8aynp2PM', title: 'Europack Wooden Pallets', dur: '6:18', thumb: 'https://img.youtube.com/vi/QtF8aynp2PM/maxresdefault.jpg', category: 'Production' },
    { id: '1xEEsgImnvA', title: 'Pallets Buying Guide', dur: '3:45', thumb: 'https://img.youtube.com/vi/1xEEsgImnvA/maxresdefault.jpg', category: 'Logistics' },
    { id: 'xGLzD-Rl-j4', title: 'Europack Introduction Video', dur: '5:20', thumb: 'https://img.youtube.com/vi/xGLzD-Rl-j4/maxresdefault.jpg', category: 'Specialty' },
    { id: 'ZVik4Qk0Y6Y', title: 'Europack Shuttering Plywood', dur: '4:55', thumb: 'https://img.youtube.com/vi/ZVik4Qk0Y6Y/maxresdefault.jpg', category: 'Engineering' },
    { id: '2Ah9304AH80', title: 'Europack Capsule Bunk Bed', dur: '5:45', thumb: 'https://img.youtube.com/vi/2Ah9304AH80/maxresdefault.jpg', category: 'Deployment' },
  ];

  const [playing, setPlaying] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  return (
    <section className="py-32 bg-[#1A1F2C] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF6600] text-xs font-black uppercase tracking-[0.3em] mb-6"
          >
            Visual Demos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Watch Us <span className="text-[#FF6600]">Work.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 mt-6 text-lg max-w-xl mx-auto font-medium"
          >
            Behind-the-scenes engineering footage of our core industrial processes.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vids.map((v, i) => (
            <motion.div key={i} variants={item} className="group">
              <div 
                className="w-full text-left block relative rounded-[32px] overflow-hidden aspect-video shadow-2xl bg-slate-900 group cursor-pointer"
                onClick={() => setPlaying(v.id + i)}
              >
                {playing === v.id + i ? (
                  <iframe src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen/>
                ) : (
                  <>
                    {/* Thumbnail */}
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000"
                    />

                    {/* HUD Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                      <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-white/50" />
                      <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-white/50" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20 rounded-full" />
                    </div>

                    {/* Glassmorphism Duration */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                      {v.dur} MIN
                    </div>

                    {/* Pulsing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#FF6600] flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,102,0,0.4)] group-hover:scale-125 transition-transform duration-500 relative">
                        <div className="absolute inset-0 rounded-full bg-[#FF6600] animate-ping opacity-30" />
                        <Play size={20} fill="white" className="relative z-10 ml-1" />
                      </div>
                    </div>

                    {/* Bottom Gradient & Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#1A1F2C] via-[#1A1F2C]/60 to-transparent">
                      <span className="inline-block px-3 py-1 rounded-lg bg-[#FF6600]/20 text-[#FF6600] text-[9px] font-black uppercase tracking-widest mb-3 border border-orange-500/20">
                        {v.category}
                      </span>
                      <h3 className="text-xl font-black text-white leading-tight group-hover:text-[#FF6600] transition-colors">{v.title}</h3>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/videos"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FF6600] hover:border-[#FF6600] transition-all group"
          >
            Access Full Video Archives
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function ProcessSection() {
  const steps = [
    { num: '01', title: 'Consultation', desc: 'Technical analysis of your load dimensions, weight, and transit route.', icon: <Search size={22} /> },
    { num: '02', title: 'Engineering', desc: 'Custom ISPM-15 blueprinting and material selection for maximum safety.', icon: <Award size={22} /> },
    { num: '03', title: 'Execution', desc: 'On-site or factory-based packing by our factory-trained mobile teams.', icon: <Package size={22} /> },
    { num: '04', title: 'Compliance', desc: 'Complete phytosanitary certification and export documentation prep.', icon: <Globe size={22} /> },
    { num: '05', title: 'Transit Success', desc: 'Real-time monitoring and port-to-port protection support.', icon: <ArrowRight size={22} /> },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1F2C 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-orange-100 text-[#FF6600] text-xs font-black uppercase tracking-[0.3em] mb-6"
          >
            How We Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter"
          >
            Engineering <span className="text-[#FF6600]">Workflow.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto font-medium"
          >
            Safety isn't an accident — it's the result of our rigorous 5-step industrial process.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
          {/* PARENT PATH (STATIC) - Centered at 50px top */}
          <div className="absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-slate-100 hidden md:block rounded-full" />

          {/* ACTIVE PATH (WALKING) - Grows left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-[#FF6600] hidden md:block rounded-full origin-left z-20 shadow-[0_0_10px_rgba(255,102,0,0.5)]"
          />

          {/* WALKING TRACER (THE PULSE DOT) */}
          <motion.div
            initial={{ left: '10%' }}
            whileInView={{ left: '90%' }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute top-[44px] w-3.5 h-3.5 rounded-full bg-[#1A1F2C] border-2 border-[#FF6600] shadow-[0_0_15px_rgba(255,102,0,1)] hidden md:block z-30 -translate-x-1/2"
          >
            <div className="absolute inset-0 rounded-full bg-[#FF6600] animate-ping opacity-40" />
          </motion.div>

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.6, duration: 0.6, type: "spring" }}
              className="relative px-6 group"
            >
              {/* Step Number Circle */}
              <div className="w-24 h-24 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center mx-auto mb-10 relative z-10 group-hover:border-[#FF6600] group-hover:shadow-[0_20px_40px_rgba(255,102,0,0.1)] transition-all duration-500">
                <span className="text-3xl font-black text-slate-200 group-hover:text-[#FF6600] transition-colors">{s.num}</span>
                {/* Micro Icon */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#1A1F2C] flex items-center justify-center text-[#FF6600] shadow-lg group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-black text-[#1A1F2C] mb-4 group-hover:text-[#FF6600] transition-colors">{s.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed px-2">{s.desc}</p>
              </div>

              {/* Sequential Background Accent */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.6 + 0.3 }}
                className="absolute inset-0 bg-[#FF6600]/10 rounded-[40px] -z-10 blur-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: 'Rajesh Sharma',
      role: 'Global Logistics Head',
      company: 'TATA Motors',
      logo: '/images/CompaniesLogo/Tata.jpg',
      text: "Zero-damage record across 500+ international shipments. Europack is our most reliable packaging partner.",
      stars: 5,
      avatar: 'R',
      gradient: 'from-[#FF6600] to-[#CC5200]'
    },
    {
      name: "Priya Kulkarni",
      role: 'Supply Chain Director',
      company: 'Siemens India',
      logo: '/images/CompaniesLogo/Piramal.png',
      text: "They engineered a custom lashing solution our in-house team couldn't design. Outstanding expertise.",
      stars: 5,
      avatar: 'P',
      gradient: 'from-[#005F9E] to-[#00395E]'
    },
    {
      name: "Michael D'Souza",
      role: 'Procurement Manager',
      company: 'L&T',
      logo: '/images/CompaniesLogo/LarsenandTurbo.avif',
      text: "Their documentation support and phytosanitary compliance handling saves us tremendous time and cost.",
      stars: 5,
      avatar: 'M',
      gradient: 'from-[#1A1F2C] to-[#2D3A4D]'
    },
  ];

  return (
    <section className="py-32 bg-[#1A1F2C] relative overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img src="/images/home/ocean_lashing.png" alt="Industrial Background" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C] via-transparent to-[#1A1F2C]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF6600] text-xs font-black uppercase tracking-[0.3em] mb-6"
          >
            Verified Trust
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6"
          >
            Customer <span className="text-[#FF6600]">Voices.</span>
          </motion.h2>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto uppercase tracking-widest text-[10px]">Trusted by 1000+ Industrial Leaders Worldwide</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card p-10 rounded-[48px] border border-white/10 relative overflow-hidden hover:-translate-y-3 hover:border-orange-500/30 transition-all duration-500 bg-white/5 backdrop-blur-xl"
            >
              {/* Subtle Quote Icon Background */}
              <Quote className="absolute -top-4 -right-4 w-32 h-32 opacity-[0.05] text-white group-hover:opacity-[0.1] transition-opacity" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex gap-1.5">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Star key={j} size={15} fill="#FF6600" className="text-[#FF6600] drop-shadow-[0_0_8px_rgba(255,102,0,0.6)]" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Case</span>
                </div>
              </div>

              <div className="relative z-10 min-h-[140px]">
                <p className="text-white text-lg font-bold leading-relaxed italic mb-8 opacity-90">
                  "{r.text}"
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-8 relative" />

              <div className="flex items-center gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-black text-xl shadow-lg relative group-hover:scale-110 transition-transform`}>
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-black text-white text-base leading-none mb-1.5">{r.company}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                      {r.role}
                    </p>
                    <div className="w-[1px] h-3 bg-white/10" />
                    <img src={r.logo} alt={r.company} className="h-3 object-contain brightness-0 invert opacity-60" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/clients"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FF6600] hover:border-[#FF6600] transition-all group"
          >
            View Our Full Case Library
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── TEAM ──────────────────────────────────────────────────────────────────────

// ── TRUSTED BY ────────────────────────────────────────────────────────────────
function TrustedBy() {
  const logos = [
    { name: 'TATA', src: '/images/CompaniesLogo/Tata.jpg' },
    { name: 'Bharat Forge', src: '/images/CompaniesLogo/Bharat-Forge-Logo-Vector.svg-.png' },
    { name: 'L&T', src: '/images/CompaniesLogo/LarsenandTurbo.avif' },
    { name: 'Godrej', src: '/images/CompaniesLogo/godrej-logo-design-in-red.webp' },
    { name: 'Mahindra', src: '/images/CompaniesLogo/Mahindra_Auto.png' },
    { name: 'Piramal', src: '/images/CompaniesLogo/Piramal.png' },
    { name: 'Bombardier', src: '/images/CompaniesLogo/Bombardier.png' },
    { name: 'Shell', src: '/images/CompaniesLogo/Shell.jpeg' },
    { name: 'Ford', src: '/images/CompaniesLogo/fORD.png' },
    { name: 'General Motors', src: '/images/CompaniesLogo/General_Motors_(logo_with_wordmark,_horizontal).svg.png' },
    { name: 'Indian Oil', src: '/images/CompaniesLogo/Indian-Oil.png' },
    { name: 'Alstom', src: '/images/CompaniesLogo/Alstom.png' },
    { name: 'ABB', src: '/images/CompaniesLogo/Abs.png' },
    { name: 'Emcure', src: '/images/CompaniesLogo/Emcure.png' },
    { name: 'Andritz', src: '/images/CompaniesLogo/Andritz_Hydro_Logo.svg' },
    { name: 'Volkswagen', src: '/images/CompaniesLogo/volkswagen-logo-brand-car-symbol-with-name-black-design-german-automobile-illustration-free-vector.jpg' },
    { name: 'TAFE', src: '/images/CompaniesLogo/Tractors_and_Farm_Equipment_Limited.svg' },
    { name: 'Bharat Petroleum', src: '/images/CompaniesLogo/BharatPetroleum.png' },
  ];
  return (
    <section className="py-20 bg-[#1A1F2C] overflow-hidden">
      <p className="text-center text-xs font-black text-[#FF6600] uppercase tracking-[0.3em] mb-12">Trusted By Global Manufacturing Leaders</p>
      <div className="flex gap-16 overflow-hidden items-center">
        <div className="flex gap-20 animate-[marquee_20s_linear_infinite] items-center whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((l, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-md shrink-0 flex items-center justify-center w-[200px] h-[120px] hover:bg-white/10 transition-all duration-500 hover:scale-105 group">
              <img
                src={l.src}
                alt={l.name}
                title={l.name}
                className="max-h-12 max-w-[140px] object-contain grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ── CONTACT SECTION ───────────────────────────────────────────────────────────
function ContactSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-4">Reach Us</div>
            <h2 className="text-4xl font-black text-[#1A1F2C] tracking-tight mb-4">Start Your <span className="text-[#FF6600]">Project.</span></h2>
            <p className="text-slate-500 text-lg mb-8">Fill in the form or call us directly. We respond to all enquiries within 24 hours.</p>
            {[
              { icon: <Phone size={20} strokeWidth={2.5} />, text: '+91 98337 76290', sub: 'Divyesh Chokshi' },
              { icon: <Phone size={20} strokeWidth={2.5} />, text: '+91 98201 93702', sub: 'Dhanik Chheda' },
              { icon: <Mail size={20} strokeWidth={2.5} />, text: 'sales@europackindia.in', sub: 'Procurement & Sales Enquiries' },
              { icon: <MapPin size={20} strokeWidth={2.5} />, text: '101, ML SPACES, Railway Station Rd, near Vile Parle, above Bharat Bank, Navpada, Kamala Nagar, Vile Parle West, Mumbai, Maharashtra 400056', sub: 'Head Office — Europack' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-3xl bg-slate-50 mb-3 border border-transparent hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF6600] group-hover:scale-110 transition-transform duration-500">
                  {c.icon}
                </div>
                <div>
                  <p className="font-black text-[#1A1F2C] text-sm group-hover:text-[#FF6600] transition-colors">{c.text}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{c.sub}</p>
                </div>
              </div>
            ))}
            <button
              onClick={onOpenModal}
              className="mt-6 inline-flex items-center gap-2 bg-[#FF6600] text-white px-8 py-4 rounded-xl font-black uppercase text-[11px] tracking-widest hover:bg-[#e65c00] transition-colors shadow-lg shadow-orange-100"
            >
              Raise Project Inquiry <ArrowRight size={14} />
            </button>
          </div>
          <div className="relative group rounded-[40px] overflow-hidden h-full min-h-[400px] shadow-xl">
            {/* Rating Badge Overlay */}
            <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-black text-[#1A1F2C]">4.3</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map(i => <Star key={i} size={12} fill="#FF6600" className="text-[#FF6600]" />)}
                  <Star size={12} fill="#CBD5E1" className="text-[#CBD5E1]" />
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">(27 Google Reviews)</p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.1!2d72.8353!3d19.1075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e5ca6a0001%3A0x1!2sML+SPACES%2C+Vile+Parle+West!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

// ── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
export default function NewHomepageClient() {
  const { openEnquiryModal } = useModal();

  return (
    <main>
      <Hero onOpenModal={openEnquiryModal} />
      <PartnerBar />
      <Intro />
      <FeaturedProducts />
      <Services />
      <GlobalPartner />
      <Industries />

      <BlogTeasers />
      <ProcessSection />
      <GalleryPreview />
      <VideosSection />
      <Testimonials />
      <TrustedBy />
      <ContactSection onOpenModal={openEnquiryModal} />
      <TechFAQ onOpenModal={openEnquiryModal} />
    </main>
  );
}
