'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  MapPin, 
  Truck,
  Box,
  Settings
} from 'lucide-react';
import { useModal } from '../../../../context/ModalContext';

interface ServicePageClientProps {
  service: any;
}

export default function ServicePageClient({ service }: ServicePageClientProps) {
  const { openEnquiryModal } = useModal();

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
       "@type": "Organization",
       "name": "Europack",
       "logo": "http://localhost:5002/logo.png"
    },
    "description": service.seo?.metaDescription || service.description?.paragraph,
    "areaServed": "India",
    "hasOfferCatalog": {
       "@type": "OfferCatalog",
       "name": "Industrial Packaging",
       "itemListElement": service.highlights.map((h: string, i: number) => ({
          "@type": "Offer",
          "itemOffered": {
             "@type": "Service",
             "name": h
          }
       }))
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden bg-slate-900 group">
         <img 
           src={getImageUrl(service.hero.image.url)} 
           className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-all duration-[3000ms]" 
           alt={service.hero.image.alt || service.title}
         />
         <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
         
         <div className="container mx-auto px-6 relative z-10">
            <motion.div 
               initial={{ opacity: 0, x: -30 }} 
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="max-w-4xl"
            >
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-1 bg-[#FF6600]" />
                  <span style={{ fontSize: service.styles.subtitle.fontSize, fontWeight: service.styles.subtitle.fontWeight }} className="text-[#FF6600] uppercase tracking-[0.3em] font-black">
                     {service.hero.subtitle || 'Industrial Excellence'}
                  </span>
               </div>
               
               <h1 
                 style={{ fontSize: service.styles.title.fontSize, fontWeight: service.styles.title.fontWeight }} 
                 className="text-white leading-[1.1] tracking-tighter mb-10"
               >
                  {service.hero.title}
               </h1>
               
               <div className="flex flex-wrap gap-6 mt-12">
                  <button 
                    onClick={openEnquiryModal}
                    className="group bg-[#FF6600] text-white px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-orange-900/40 hover:translate-y-[-4px] transition-all flex items-center gap-3"
                  >
                     Get Dynamic Quote <ArrowRight size={18} className="group-hover:translate-x-2 transition-all" />
                  </button>
                  <button 
                    onClick={openEnquiryModal}
                    className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center"
                  >
                     Consult our Engineers
                  </button>
               </div>
            </motion.div>
         </div>

         {/* Hero Decorators */}
         <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-6">
            <div className="flex items-center gap-4 text-right">
               <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">33+ Years <br/> Experience</span>
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF6600]">
                  <ShieldCheck size={28} />
               </div>
            </div>
            <div className="flex items-center gap-4 text-right">
               <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">ISO Certified <br/> Standards</span>
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Settings size={28} />
               </div>
            </div>
         </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                  <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tighter mb-8">
                     {service.description.heading || 'Our Engineering Philosophy'}
                  </h2>
                  <p 
                    style={{ fontSize: service.styles.paragraph.fontSize, lineHeight: service.styles.paragraph.lineHeight }} 
                    className="text-slate-500 italic mb-10 max-w-xl"
                  >
                     {service.description.paragraph || 'Highly optimized packaging solutions for heavy machinery and exports.'}
                  </p>
                  
                  <div className="space-y-6 mt-12">
                     <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 items-center">
                        <Truck className="text-[#FF6600]" size={24} />
                        <div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Global Logistics Ready</span>
                           <p className="text-xs font-bold text-slate-800">Export Certified Packaging Solutions</p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 items-center">
                        <Box className="text-[#FF6600]" size={24} />
                        <div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Secure Load Distribution</span>
                           <p className="text-xs font-bold text-slate-800">Engineered for Maximum Load Capacity</p>
                        </div>
                     </div>
                  </div>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  {service.highlights.map((h: string, i: number) => (
                     <div key={i} className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 hover:-translate-y-2">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#FF6600] mb-6 group-hover:bg-[#FF6600] group-hover:text-white transition-all shadow-sm">
                           <Target size={20} />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                           {h}
                        </h4>
                     </div>
                  ))}
               </motion.div>
            </div>
         </div>
      </section>

      {/* CTA Conversion Hub */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         {/* Industrial Accents */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6600] to-transparent opacity-30" />
         <div className="absolute -left-20 top-20 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full" />
         
         <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
               <h2 className="text-5xl font-black text-white leading-tight tracking-tighter mb-4">
                  {service.cta.heading || 'Let\'s Secure Your Cargo'}
               </h2>
               <div className="w-24 h-1.5 bg-[#FF6600] mx-auto rounded-full mb-8 shadow-lg shadow-orange-900/40" />
               <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] max-w-2xl mx-auto">
                  Partner with Europack for industrial packaging solutions that guarantee peace of mind.
               </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
               <button 
                  onClick={openEnquiryModal}
                  className="group bg-[#FF6600] text-white px-12 py-7 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
               >
                  Get Quote Instantly <Zap size={20} className="group-hover:rotate-12 transition-all" />
               </button>
               <a 
                 href="tel:+919820090775"
                 className="bg-white/5 border-2 border-white/10 text-white px-12 py-7 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center gap-4"
               >
                  Call Now <Phone size={20} />
               </a>
            </div>

            <div className="pt-12 flex justify-center items-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#FF6600]" /> Export Ready
               </div>
               <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
               <div className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-[#FF6600]" /> Global Delivery
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
