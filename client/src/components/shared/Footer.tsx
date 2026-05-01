'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Loader2,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Search,
  MessageCircle,
  Plus,
  Minus,
  ExternalLink,
  ShieldCheck,
  Award,
  CircleDot,
  Sparkles,
  Users,
  Globe,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../../context/ModalContext';
import { fetchAPI } from '@/lib/api';

export default function Footer() {
  const { openEnquiryModal } = useModal();
  const [data, setData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerRes, productsRes] = await Promise.all([
          fetchAPI('/footer'),
          fetchAPI('/products')
        ]);
        
        if (footerRes.success) setData(footerRes.data);
        if (productsRes.success) setProducts(productsRes.data);
      } catch (err) {
        console.error('Footer fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading || !data) return (
    <div className="py-20 bg-[#0B0F19] flex items-center justify-center">
       <Loader2 className="animate-spin text-[#FF6600]" size={40} />
    </div>
  );

  const groupedProducts = {
    'Pallet Solutions': products.filter(p => p.category === 'Pallet Solutions'),
    'Packaging Solutions': products.filter(p => p.category === 'Packaging Solutions'),
    'Industrial Services': products.filter(p => p.category === 'Industrial Services'),
    'Other Solutions': products.filter(p => !['Pallet Solutions', 'Packaging Solutions', 'Industrial Services'].includes(p.category))
  };

  const socialIcons: Record<string, any> = {
    Instagram: <Instagram size={18} />,
    LinkedIn: <Linkedin size={18} />,
    YouTube: <Youtube size={18} />,
    Facebook: <Facebook size={18} />,
    Google: <Search size={18} />,
    WhatsApp: <MessageCircle size={18} />
  };

  const ColumnHeader = ({ title, id }: { title: string, id: string }) => (
    <div 
      className="flex items-center justify-between mb-6 md:mb-8"
    >
      <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] border-l-4 border-[#FF6600] pl-4">
        {title}
      </h4>
    </div>
  );

  return (
    <footer className="bg-[#0B0F19] pt-32 pb-16 relative overflow-hidden">
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#FF6600]/5 rounded-full blur-[150px] -ml-96 -mt-96" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FF6600]/5 rounded-full blur-[120px] -mr-64 -mb-64" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ROW 1: PRIMARY Information (Heavy & Powerful) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 pb-20">
          
          {/* Col 1: Brand (Increase Impact) */}
          <div className="space-y-10">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-black text-white tracking-tighter block mb-2">
                EURO<span className="text-[#FF6600]">PACK</span>
              </span>
              <p className="text-[11px] font-black text-[#FF6600] tracking-[0.5em] uppercase group-hover:tracking-[0.6em] transition-all duration-500">
                INDIA'S #1 TRUSTED INDUSTRIAL PACKAGING SOLUTIONS PROVIDER
              </p>
            </Link>
            
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Industrial packaging experts specializing in export packing, vacuum sealing, and heavy engineering solutions. Delivering ISPM-15 certified packaging for global logistics.
            </p>

            <div className="space-y-4">
               {[
                 { label: 'Pan India Presence', icon: <Globe size={18}/> },
                 { label: 'Export Specialists', icon: <Box size={18}/> },
                 { label: 'Industrial Solutions', icon: <ShieldCheck size={18}/> }
               ].map((trust, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-white/90">
                   <div className="w-8 h-8 rounded-lg bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                     {trust.icon}
                   </div>
                   <p className="text-[13px] font-black uppercase tracking-widest">{trust.label}</p>
                 </div>
               ))}
            </div>

            <div className="flex gap-4 pt-4">
              {data.socialLinks?.map((social: any, idx: number) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600] hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-orange-500/30 group"
                >
                  <div className="group-hover:scale-125 transition-transform duration-500">
                    {socialIcons[social.name] || <ExternalLink size={20} />}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (Useful) */}
          <div>
            <ColumnHeader title="Quick Links" id="quick-links" />
            <ul className="space-y-5">
              {[
                { name: 'Home', link: '/' },
                { name: 'About Us', link: '/about' },
                { name: 'Services', link: '/services' },

                { name: 'Our Clients', link: '/clients' },
                { name: 'Testimonials', link: '/testimonials' },
                { name: 'Blog', link: '/blog' },
                { name: 'Careers', link: '/careers' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.link} 
                    className="group flex items-center gap-4 text-slate-400 hover:text-white text-[15px] font-semibold transition-all"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FF6600] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    <span className="relative py-1">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF6600] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button 
                  onClick={openEnquiryModal}
                  className="group flex items-center gap-4 text-slate-400 hover:text-white text-[15px] font-semibold transition-all w-full text-left"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FF6600] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="relative py-1">
                    Contact Us
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF6600] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Solutions (Expand) */}
          <div className="lg:col-span-1">
            <ColumnHeader title="Our Solutions" id="products" />
            <div className="space-y-10">
              <div className="space-y-5">
                <p className="text-[12px] font-black text-white px-3 py-1 bg-white/5 rounded-md inline-block uppercase tracking-widest">Packaging Solutions</p>
                <ul className="space-y-3 pl-2">
                   {['Wooden Pallets', 'Corrugated Boxes', 'Wooden Boxes', 'Plywood Boxes'].map((p) => (
                     <li key={p}>
                       <Link href="/products" className="text-slate-400 hover:text-[#FF6600] text-[15px] font-medium transition-all block flex items-center gap-2 group">
                         <CircleDot size={8} className="text-slate-700 group-hover:text-[#FF6600]" /> {p}
                       </Link>
                     </li>
                   ))}
                </ul>
              </div>
              <div className="space-y-5">
                <p className="text-[12px] font-black text-white px-3 py-1 bg-white/5 rounded-md inline-block uppercase tracking-widest">Advanced Services</p>
                <ul className="space-y-3 pl-2">
                   {['Export Packing', 'Vacuum Packing', 'Shrink Wrapping', 'Heavy Engineering'].map((p) => (
                     <li key={p}>
                       <Link href="/services" className="text-slate-400 hover:text-[#FF6600] text-[15px] font-medium transition-all block flex items-center gap-2 group">
                         <CircleDot size={8} className="text-slate-700 group-hover:text-[#FF6600]" /> {p}
                       </Link>
                     </li>
                   ))}
                </ul>
              </div>
              <Link href="/products" className="inline-flex items-center gap-3 text-[#FF6600] font-black uppercase text-[12px] tracking-widest hover:gap-5 transition-all pt-4 group">
                View All Solutions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Col 4: Capabilities (Strong) */}
          <div>
            <ColumnHeader title="Capabilities" id="capabilities" />
            <div className="space-y-12">
               <div className="space-y-6">
                 <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Core Services</p>
                 <div className="flex flex-wrap gap-3">
                   {['Export Packing', 'Vacuum Packing', 'Lashing & Securing', 'Container Stuffing'].map(s => (
                     <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-default">{s}</span>
                   ))}
                 </div>
               </div>
               <div className="space-y-6">
                 <p className="text-[12px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Industries We Serve</p>
                 <div className="flex flex-wrap gap-3">
                   {['Engineering', 'Automotive', 'Pharma', 'Logistics'].map(i => (
                     <span key={i} className="px-4 py-2 bg-[#FF6600]/10 border border-[#FF6600]/20 rounded-xl text-[11px] font-black text-[#FF6600] hover:bg-[#FF6600] hover:text-white transition-colors cursor-default">{i}</span>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* ROW DIVIDER */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* ROW 2: CONTACT & FACTORIES (Deep Information Density) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 lg:gap-12 pb-20">
          
          {/* Col 5: Head Office (Full Details) */}
          <div>
            <ColumnHeader title="Head Office" id="head-office" />
            <div className="space-y-8">
               <div className="flex gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600] shrink-0">
                    <MapPin size={22} strokeWidth={2.5} />
                 </div>
                 <div className="space-y-1">
                   <p className="text-white font-black text-sm uppercase tracking-widest">Europack Mumbai</p>
                   <p className="text-slate-400 text-sm leading-relaxed">
                     101, ML SPACES, Railway Station Rd, near Vile Parle,<br/>above Bharat Bank, Navpada, Kamala Nagar,<br/>Vile Parle West, Mumbai, Maharashtra 400056
                   </p>
                 </div>
               </div>
               <div className="space-y-5 pl-[68px]">
                 {[
                   { number: '+91 9833776290', label: 'Divyesh Chokshi' },
                   { number: '+91 98201 93702', label: 'Dhanik Chheda' }
                 ].map((p, i) => (
                   <a key={i} href={`tel:${p.number}`} className="block group">
                     <p className="text-white font-black text-base group-hover:text-[#FF6600] transition-colors">{p.number}</p>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.label}</p>
                   </a>
                 ))}
                 <div className="space-y-4 pt-2">
                    <a href="mailto:sales@europackindia.in" className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#FF6600] transition-colors group">
                       <Mail size={16} className="text-[#FF6600]" /> sales@europackindia.in
                    </a>
                 </div>
               </div>
            </div>
          </div>



          {/* Col 8: Get Started (Strong CTA) */}
          <div>
            <ColumnHeader title="Get Started" id="trust-cta" />
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-white/10 to-[#FF6600]/5 p-8 rounded-[40px] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000 blur-2xl" />
                  <div className="relative z-10 space-y-6">
                    <div>
                      <h5 className="text-white font-black text-base mb-2">Technical Analysis</h5>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">Expert roadmap for secure export packaging & transit safety.</p>
                    </div>
                    <button 
                      onClick={openEnquiryModal}
                      className="w-fit px-8 py-4 bg-[#FF6600] text-white text-[11px] font-black uppercase tracking-[0.25em] rounded-2xl flex items-center justify-center gap-3 hover:bg-[#e65c00] transition-all shadow-xl shadow-orange-500/20 active:scale-95 group mx-auto sm:mx-0"
                    >
                      Quick Quote <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CTA STRIP (Scale & Impact) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[48px] bg-gradient-to-r from-[#1A1F2C] via-[#2A3441] to-[#1A1F2C] p-12 md:p-16 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-12 group overflow-hidden"
        >
          {/* Pulsing Glow Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6600]/10 rounded-full blur-[100px] -ml-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6600]/5 rounded-full blur-[120px] -mr-64 -mb-64" />
          
          <div className="relative z-10 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.3em] mb-8">
              <Sparkles size={14} /> Instant Response Assured
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
              Ready to discuss your <br/> <span className="text-[#FF6600]">packaging needs?</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Get a customised export packaging blueprint and commercial quote within <span className="text-white font-bold">24 hours</span>.
            </p>
          </div>

          <button 
            onClick={openEnquiryModal}
            className="relative z-10 w-fit mx-auto lg:mx-0 bg-[#FF6600] text-white px-8 sm:px-12 py-5 sm:py-7 rounded-[20px] sm:rounded-[24px] font-black uppercase tracking-[0.25em] text-xs sm:text-sm hover:bg-[#e65c00] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,102,0,0.3)] hover:-translate-y-2 active:scale-95 group"
          >
            GET YOUR FREE QUOTE
            <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </motion.div>

        {/* SECTION 3: COPYRIGHT BAR */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10 text-center">
           <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed">
             © 2026 Europack . All rights reserved.
           </p>
           <div className="flex flex-wrap items-center justify-center gap-10">
              {[
                { name: 'Privacy Policy', link: '/privacy' },
                { name: 'Terms of Service', link: '/terms' },
                { name: 'Sitemap', link: '/site-navigation' }
              ].map((item) => (
                <Link key={item.name} href={item.link} className="text-slate-500 hover:text-[#FF6600] text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em]">
                  {item.name}
                </Link>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
}
