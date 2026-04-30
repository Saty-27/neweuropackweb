'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowRight, CheckCircle, Package, Search, ChevronRight, 
  Settings, Activity, Globe, Shield, Box as BoxIcon
} from 'lucide-react';
import { productsData, Category } from '../../../constants/productsData';
import InquiryModal from '@/components/layout/InquiryModal';

const IconRenderer = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.Package;
  return <Icon size={size} className={className} />;
};

export default function ProductsClient() {
  const [activeCategory, setActiveCategory] = useState(productsData[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);

  // Intersection Observer to update active category on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0% -60% 0%' }
    );

    productsData.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Filter logic
  const filteredData = productsData.map(cat => ({
    ...cat,
    subCategories: cat.subCategories.map(sub => ({
      ...sub,
      products: sub.products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.subTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(sub => sub.products.length > 0)
  })).filter(cat => cat.subCategories.length > 0);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden bg-[#1A1F2C]">
        {/* Background Image with Parallax-ready styling */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/services/hero_banner.png" 
            alt="Industrial Ecosystem" 
            fill
            className="object-cover object-center opacity-60"
            priority
          />
          {/* Gradients for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent z-10" />
        </div>

        <div className="container max-w-[90rem] mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
             <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Master Logistics Catalog</div>
             <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                The Core of <br/> <span className="text-[#FF6600]">Global Trade.</span>
             </h1>
             <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-2xl">
                Exhaustive mapping of ISPM-15 certified industrial packaging. 23 specialized categories, 130+ technical products, one standard: 100% Security.
             </p>
          </motion.div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF6600]/30 to-transparent z-20" />
      </section>

      <div className="container max-w-[90rem] mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-12">
        
        {/* 2. SIDEBAR NAVIGATION (DESKTOP) / TOP BAR (MOBILE) */}
        <aside className="lg:w-80 shrink-0">
           <div className="lg:sticky lg:top-32 space-y-8">
              
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#FF6600] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search 130+ products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-bold text-[#1A1F2C] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#FF6600]/10 transition-all"
                />
              </div>

              {/* Sidebar List */}
              <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm hidden lg:block">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 px-2">Catalog Hub</h3>
                 <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                    {productsData.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                          activeCategory === cat.id 
                          ? 'bg-[#FF6600] text-white shadow-lg shadow-orange-500/20 translate-x-1' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-[#1A1F2C]'
                        }`}
                      >
                        <IconRenderer name={cat.iconName} size={14} />
                        <span className="truncate">{cat.title}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Mobile Quick Chips */}
              <div className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                {productsData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                      activeCategory === cat.id 
                      ? 'bg-[#FF6600] text-white border-transparent' 
                      : 'bg-white text-slate-500 border-slate-100'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
           </div>
        </aside>

        {/* 3. MAIN CONTENT AREA */}
        <div className="flex-grow space-y-32">
           {filteredData.map((category) => (
             <div key={category.id} id={category.id} className="scroll-mt-40 space-y-16">
                
                {/* Category Identity Card */}
                <div className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row items-stretch">
                   <div className="md:w-5/12 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-[#1A1F2C] rounded-2xl flex items-center justify-center text-[#FF6600] shadow-xl">
                         <IconRenderer name={category.iconName} size={32} />
                      </div>
                      <h2 className="text-4xl lg:text-5xl font-black text-[#1A1F2C] tracking-tighter leading-none">{category.title}</h2>
                      <p className="text-slate-500 font-medium leading-relaxed">{category.desc}</p>
                       <div className="flex flex-col space-y-4">
                          <button onClick={openModal} className="w-full sm:w-fit flex items-center justify-center gap-3 px-8 py-4 bg-[#FF6600] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all shadow-lg shadow-orange-500/20">
                             Get Wholesale Pricing <ArrowRight size={16}/>
                          </button>
                          <Link href={`/products#${category.id}`} className="w-full sm:w-fit flex items-center justify-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[#FF6600] hover:text-[#FF6600] transition-all no-underline">
                             View Products <ChevronRight size={16}/>
                          </Link>
                       </div>
                   </div>
                   <div className="md:w-7/12 relative min-h-[350px]">
                      <Image 
                        src={category.img} 
                        alt={category.title} 
                        fill 
                        className="object-cover"
                        onError={(e: any) => {
                          e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden md:block" />
                   </div>
                </div>

                {/* Sub-Category Grids */}
                {category.subCategories.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-10">
                    <div className="flex items-center gap-4">
                       <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#FF6600] whitespace-nowrap">{sub.title}</h3>
                       <div className="h-px bg-slate-200 w-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                       {sub.products.map((p) => (
                         <motion.div 
                           key={p.id}
                           initial={{ opacity: 0, scale: 0.95 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           className="group bg-white rounded-[40px] border border-slate-100 p-6 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col"
                         >
                            <div className="relative h-60 rounded-[30px] overflow-hidden mb-8 bg-slate-50 border border-slate-100 flex items-center justify-center">
                               <Image 
                                 src={p.img} 
                                 alt={p.name} 
                                 fill 
                                 className="object-contain p-10 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply opacity-80"
                                 onError={(e: any) => {
                                   e.target.src = '/images/product_icon_placeholder.png'; // Handled high-end placeholder
                                 }}
                               />
                               <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-slate-300">EU-SPEC-ID: {p.id.slice(0,5).toUpperCase()}</div>
                            </div>

                            <div className="flex-grow flex flex-col px-2">
                               <h4 className="text-xl font-black text-[#1A1F2C] tracking-tight mb-2 group-hover:text-[#FF6600] transition-colors">{p.name}</h4>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{p.subTitle}</p>
                               
                               <div className="space-y-4 mb-8">
                                  {p.specs.map((spec, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                                       <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                                       {spec}
                                    </div>
                                  ))}
                               </div>

                              <div className="mt-auto space-y-3">
                                <button 
                                  onClick={openModal}
                                  className="w-full py-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6600] hover:text-white hover:border-transparent transition-all duration-300"
                                >
                                  Request Engineering Specs
                                </button>
                                <Link 
                                  href={`/products/${category.id}/${p.id}`}
                                  className="w-full py-4 rounded-2xl bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#FF6600] hover:text-[#FF6600] transition-all duration-300 flex items-center justify-center gap-2 no-underline"
                                >
                                  View Detail <ChevronRight size={14} />
                                </Link>
                              </div>
                            </div>
                         </motion.div>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
           ))}
        </div>
      </div>

      {/* 4. MASTER SERVICE CTA */}
      <section className="py-24 bg-[#1A1F2C] mt-20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6600_1px,transparent_1px)] [background-size:40px_40px]"/>
         <div className="container max-w-7xl mx-auto px-6 text-center relative z-10 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
               Custom Industrial <br/> <span className="text-[#FF6600]">Architecture.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
               Don't see your specific requirement? Our engineering team designs custom structural components for aerospace, defense, and capital equipment daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button onClick={openModal} className="px-12 py-6 bg-[#FF6600] text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all shadow-xl shadow-orange-500/20">
                  Enquire for Custom Packaging
               </button>
               <button onClick={openModal} className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                   Download Master Catalog (PDF)
               </button>
            </div>
         </div>
      </section>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
