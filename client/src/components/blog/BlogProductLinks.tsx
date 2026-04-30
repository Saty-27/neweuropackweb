'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const productCTA = [
  { title: "Wooden Pallets", desc: "Heavy-duty custom 4-way entry pallets.", icon: <Package/>, link: "/products/wooden-pallets" },
  { title: "Industrial Crating", desc: "ISPM-15 certified export crates.", icon: <ShieldCheck/>, link: "/products/heavy-crating" },
  { title: "Vacuum Packing", desc: "Military-grade barrier foil sealing.", icon: <Truck/>, link: "/products/vacuum-packing" }
];

export default function BlogProductLinks() {
  return (
    <section className="py-24 bg-[#1A1F2C] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:60px_60px] opacity-5" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Tools For <span className="text-[#ff6a00]">Execution.</span></h2>
           <p className="text-slate-400 font-medium max-w-xl mx-auto">Ready to apply these insights to your project? Explore our range of industrial solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {productCTA.map((p, i) => (
             <motion.div
               key={i}
               whileHover={{ y: -10 }}
               className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group"
             >
                <div className="w-14 h-14 rounded-2xl bg-[#ff6a00]/10 text-[#ff6a00] flex items-center justify-center mb-8 shadow-inner">
                   {p.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{p.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{p.desc}</p>
                <Link href={p.link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ff6a00] hover:gap-4 transition-all">
                   View Specifications <ArrowRight size={14}/>
                </Link>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
