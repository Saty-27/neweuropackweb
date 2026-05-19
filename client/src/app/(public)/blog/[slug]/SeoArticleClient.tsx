'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Box, Anchor, Truck, CheckCircle2, ChevronRight, MapPin, Building2, PackageCheck } from 'lucide-react';
import Link from 'next/link';
import { SeoBlogContent } from '../../../../lib/seoBlogGenerator';

interface SeoArticleClientProps {
  content: SeoBlogContent;
  slug: string;
}

export default function SeoArticleClient({ content, slug }: SeoArticleClientProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.schema) }} />

      {/* 1. Premium Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#0B0F19] text-white">
        <div className="absolute inset-0">
           {/* Fixed: Using dynamic hero image from generated content */}
           <img src={content.hero.image || "/images/banners/services-banner.png"} alt={content.hero.title} className="w-full h-full object-cover opacity-60" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/70 to-[#0B0F19]/30" />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6600]/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] mb-8">
              {content.hero.title.split(' ').map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 || i === arr.length - 2 ? "text-[#FF6600]" : "text-white"}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-12">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-[#FF6600] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#FF6600] transition-colors shadow-2xl shadow-orange-500/20">
                Get Instant Quote
              </Link>
              <Link href="/services" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-colors">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Breadcrumbs */}
      <div className="border-b border-slate-200 bg-white sticky top-24 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-[#FF6600] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#FF6600] transition-colors">Industrial Insights</Link>
          <ChevronRight size={14} />
          <span className="text-[#FF6600] truncate max-w-[200px] md:max-w-none">{content.hero.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 space-y-24">
            
            {/* 3. Introduction block */}
            <section className="max-w-none">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-8">
                Why Specialized Packaging is Critical
              </h2>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-2 h-full bg-[#FF6600]" />
                <p className="text-slate-700 leading-loose font-medium text-lg whitespace-pre-line relative z-10">
                  {content.introduction}
                </p>
              </div>
            </section>

            {/* 4. Specifications Table */}
            <section>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-8 flex items-center gap-4">
                <Box className="text-[#FF6600]" size={28} /> Technical Specifications
              </h3>
              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl no-scrollbar">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <tbody>
                    {content.tables.specs.map((spec, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="py-6 px-8 text-sm font-black text-slate-500 uppercase tracking-widest w-1/3 bg-slate-50/50">
                          {spec.label}
                        </td>
                        <td className="py-6 px-8 text-base font-bold text-slate-900">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 5. Benefits Grid */}
            <section>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-8 flex items-center gap-4">
                <Shield className="text-[#FF6600]" size={28} /> Core Advantages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.benefits.map((benefit, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all group">
                    <CheckCircle2 className="text-[#FF6600] mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="text-lg font-black text-slate-900 mb-3">{benefit.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. Use Cases Table */}
            <section>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-8 flex items-center gap-4">
                <Building2 className="text-[#FF6600]" size={28} /> Industry Applications
              </h3>
              <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl no-scrollbar">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest">Industry Sector</th>
                      <th className="py-5 px-8 text-[11px] font-black uppercase tracking-widest">Primary Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.tables.useCases.map((uc, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="py-5 px-8 text-sm font-black text-[#FF6600]">{uc.industry}</td>
                        <td className="py-5 px-8 text-sm font-medium text-slate-700">{uc.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. FAQs */}
            <section>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-10 text-center">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {content.faq.map((item, i) => (
                  <details key={i} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-6 font-black text-slate-900 hover:text-[#FF6600] transition-colors">
                      {item.q}
                      <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed bg-slate-50/50">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            {/* CTA Box */}
            <div className="bg-[#0B0F19] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6600] blur-[80px] rounded-full opacity-30 pointer-events-none" />
              <PackageCheck size={48} className="text-[#FF6600] mb-8" />
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">Need Urgent Packaging?</h3>
              <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                Our emergency dispatch team is available 24/7. Get industrial packaging delivered anywhere in Mumbai and surrounding areas.
              </p>
              <Link href="/contact" className="flex items-center justify-center w-full py-4 bg-[#FF6600] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#FF6600] transition-colors">
                Contact Operations
              </Link>
            </div>

            {/* Service Coverage Box */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <Truck size={24} className="text-[#FF6600]" />
                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Service Coverage</h3>
              </div>
              <ul className="space-y-4">
                {content.tables.coverage.map((loc, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                    {loc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                 <h4 className="text-3xl font-black text-slate-900 mb-1">33+</h4>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Years Exp</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
                 <h4 className="text-3xl font-black text-slate-900 mb-1">ISO</h4>
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">9001:2015</p>
               </div>
            </div>

            {/* Related Products Cross-Links */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <Box size={24} className="text-[#FF6600]" />
                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">Explore Products</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { name: 'Wooden Pallets', href: '/products/pallet-systems/wooden-pallets' },
                  { name: 'Corrugated Boxes', href: '/products/corrugated-cargo-securing/corrugated-boxes' },
                  { name: 'Vacuum Packaging', href: '/products/vacuum-wrapping/vacuum-packaging' },
                  { name: 'Dunnage Bags', href: '/products/dunnage-bag/air-dunnage-bags' }
                ].map((prod, i) => (
                  <li key={i}>
                    <Link href={prod.href} className="flex items-center justify-between text-slate-600 font-medium hover:text-[#FF6600] transition-colors group">
                      <span>{prod.name}</span>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-[#FF6600] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* 8. Bottom CTA Banner */}
      <section className="py-24 bg-[#FF6600] text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-8">
            Ready to secure your shipments?
          </h2>
          <p className="text-xl text-white/90 font-medium mb-12 max-w-2xl mx-auto">
            Join 3000+ industrial companies that trust Europack for their domestic and export packaging requirements.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors shadow-2xl">
            Request Bulk Quote <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
