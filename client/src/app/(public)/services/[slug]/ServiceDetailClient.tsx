'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Package, ShieldCheck, Wrench, ChevronRight, ArrowRight } from 'lucide-react';
import { useModal } from '../../../../context/ModalContext';
import { ServiceData } from '../../../../data/servicesData';

export default function ServiceDetailClient({ service }: { service: ServiceData }) {
  const { openEnquiryModal } = useModal();

  return (
    <main className="bg-white min-h-screen pt-32 pb-24 font-sans selection:bg-[#FF6600]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/services" className="hover:text-[#FF6600] transition-colors">Services</Link>
          <ChevronRight size={12} />
          <span className="text-[#FF6600]">{service.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter leading-[1.1]">
              {service.name.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-[#FF6600]">{word}</span> : word + ' '
              )}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              {service.shortDesc}
            </p>
            
            <button 
              onClick={openEnquiryModal}
              className="inline-flex items-center gap-4 bg-[#1A1F2C] text-white px-10 py-5 rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-[#FF6600] transition-all shadow-xl hover:-translate-y-1"
            >
              Get Technical Quote <ArrowRight size={16}/>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100"
          >
            <Image 
              src={service.img}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-16"
          >
            {/* Overview */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-[#1A1F2C] tracking-tight border-b-2 border-slate-100 pb-4 inline-block">Service Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {service.longDesc}
              </p>
            </div>

            {/* Benefits & Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6600]">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-xl font-black text-[#1A1F2C]">Key Benefits</h3>
                </div>
                <ul className="space-y-5">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <CheckCircle2 size={18} className="text-[#FF6600] shrink-0 mt-1" />
                      <span className="text-slate-600 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1A1F2C]">
                    <Wrench size={20} />
                  </div>
                  <h3 className="text-xl font-black text-[#1A1F2C]">Technical Features</h3>
                </div>
                <ul className="space-y-5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <Package size={18} className="text-[#1A1F2C] shrink-0 mt-1" />
                      <span className="text-slate-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 sticky top-32">
              <h3 className="text-lg font-black text-[#1A1F2C] uppercase tracking-widest mb-6">Need Immediate Assistance?</h3>
              <p className="text-slate-500 text-sm mb-8 font-medium">
                Our engineering team is ready to analyze your packaging requirements and provide a detailed structural blueprint.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={openEnquiryModal}
                  className="w-full py-4 bg-[#FF6600] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#E65C00] transition-all shadow-lg"
                >
                  Request Consultation
                </button>
                <Link 
                  href="/contact"
                  className="block w-full text-center py-4 bg-white border border-slate-200 text-[#1A1F2C] rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-[#FF6600] hover:text-[#FF6600] transition-all"
                >
                  Contact Sales Team
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
