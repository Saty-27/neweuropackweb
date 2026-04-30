'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, ArrowRight, Globe, Box, Shield, Users, Mail, Phone, ChevronRight } from 'lucide-react';

export default function SitemapPage() {
  const sections = [
    {
      title: "Core Infrastructure",
      icon: <Globe className="text-[#FF6600]" size={24}/>,
      links: [
        { name: "Home - Industrial Gateway", href: "/" },
        { name: "About Europack India", href: "/about" },
        { name: "Industrial Services", href: "/services" },
        { name: "Complete Product Catalog", href: "/products" },
      ]
    },
    {
      title: "Solutions Matrix",
      icon: <Box className="text-[#FF6600]" size={24}/>,
      links: [
        { name: "Wooden Pallets", href: "/products?cat=Pallet%20Solutions" },
        { name: "Corrugated Boxes", href: "/products?cat=Packaging%20Solutions" },
        { name: "Industrial Engineering", href: "/services" },
        { name: "ISPM-15 Compliance", href: "/about" },
      ]
    },
    {
      title: "Knowledge & Updates",
      icon: <Shield className="text-[#FF6600]" size={24}/>,
      links: [
        { name: "Technical Blog", href: "/blog" },
        { name: "Project Gallery", href: "/gallery" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Industry FAQ", href: "/faq" },
      ]
    },
    {
      title: "Corporate & Support",
      icon: <Users className="text-[#FF6600]" size={24}/>,
      links: [
        { name: "Careers at Europack", href: "/careers" },
        { name: "Contact Our Engineers", href: "/contact" },
        { name: "Privacy & Data Policy", href: "/privacy" },
        { name: "Terms of Engagement", href: "/terms" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-32 pb-20 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6600]/5 rounded-full blur-[150px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6600]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.3em] mb-6">
            <Map size={14} /> Site Architecture
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Visual <span className="text-[#FF6600]">Sitemap.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Navigate through our industrial ecosystem. From ISPM-15 certified packaging to global logistics solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[40px] p-8 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-8 border-b border-white/5 pb-4">{section.title}</h3>
              <ul className="space-y-6">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      className="text-slate-400 hover:text-[#FF6600] font-bold text-sm flex items-center gap-3 transition-all hover:translate-x-2"
                    >
                      <ChevronRight size={14} /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-10 rounded-[48px] bg-gradient-to-r from-[#FF6600]/20 to-transparent border border-[#FF6600]/20 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div>
            <h4 className="text-2xl font-black text-white mb-2">Technical XML Sitemap</h4>
            <p className="text-slate-400 font-medium">Looking for the machine-readable sitemap for search engines?</p>
          </div>
          <Link 
            href="/sitemap.xml" 
            target="_blank"
            className="px-10 py-5 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#e65c00] transition-all flex items-center gap-3 shadow-xl shadow-orange-500/20"
          >
            Access XML <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
