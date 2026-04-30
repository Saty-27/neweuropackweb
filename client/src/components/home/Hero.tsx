'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Shield, Globe, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#1A1F2C]">

      {/* Cinematic Industrial Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banners/banner_main.png"
          alt="Industrial Packaging Scale"
          fill
          className="object-cover opacity-60 mix-blend-normal scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/80 to-transparent z-10" />
      </div>

      <div className="container-industrial relative z-20">
        <div className="max-w-4xl space-y-8 animate-slide-up">

          {/* Clearance Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6600] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6600] ">India's Largest Packaging Authority</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight-industrial">
            PRECISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">INDUSTRIAL</span> <br />
            <span className="text-[#FF6600]">PACKAGING</span>
          </h1>

          {/* Subtext Orchestration */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed font-medium">
            Engineering heavy-duty structural protection for global logistics. We architect high-fidelity crating, lashing, and vacuum solutions for mission-critical B2B assets.
          </p>

          {/* CTA Matrix */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <button className="btn-industrial btn-industrial-primary w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-10 rounded-2xl text-sm group">
              Initialize Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FF6600] transition-all duration-500">
                <Play size={20} fill="currentColor" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Watch Demo</span>
                <span className="block font-bold text-white text-sm">Industrial Process</span>
              </div>
            </button>
          </div>

          {/* Capability Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF6600]">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">100% Protection</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Asset Safety Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF6600]">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Global Network</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Export Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF6600]">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Pan India Presence</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Across Multiple Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />
    </section>
  );
}
