'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Construction } from 'lucide-react';
import SubPageHero from '@/components/shared/SubPageHero';

export default function CaseStudiesClient() {
  return (
    <main>
      <SubPageHero 
        badge="Engineering Excellence"
        title="Engineering Archive"
        subtitle="Our technical project documentation and engineering proofs are currently being updated to reflect our latest 2026 industrial protocols."
        bgImage="/images/banners/4.png"
      />

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6600] mx-auto mb-10">
            <Construction size={40} />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#1A1F2C] mb-8 tracking-tighter">Documentation Under <span className="text-[#FF6600]">Refinement.</span></h2>
          <p className="text-slate-500 text-xl leading-loose max-w-3xl mx-auto mb-12 font-medium">
            We are migrating our engineering database to a new high-fidelity format. Documentation for our automotive, pharmaceutical, and energy sector projects will be live shortly.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="px-12 py-5 bg-[#1A1F2C] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#FF6600] transition-all shadow-xl">
              Back to Home
            </Link>
            <Link href="/products" className="px-12 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-[#FF6600] transition-all">
              Explore Products <ArrowRight size={16} className="inline ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
