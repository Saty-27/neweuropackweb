'use client';

import React from 'react';
import { Target, Users, Zap, Calendar, ArrowUpRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container-industrial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative group animate-slide-up">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
                alt="Industrial Warehouse" 
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-industrial rounded-[32px] shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6600] mb-2">Our Engineering Core</p>
                <p className="text-sm font-bold text-[#1A1F2C]">Architecting structural resilience for high-value industrial assets since 1991.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="section-tag">About Europack</span>
            <h2 className="section-head">
              The Gold Standard in <br />
              <span className="text-[#FF6600]">Industrial Safety.</span>
            </h2>
            <p className="section-desc">
              Europack is not just a packaging company; we are an industrial architecture firm for logistics. We specialize in the high-stakes world of heavy equipment lashing, precision crating, and mission-critical vacuum packaging.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-3 p-6 bg-slate-50 rounded-[32px] hover:bg-[#FF6600]/5 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Target size={20} />
                  </div>
                  <p className="font-black text-sm text-[#1A1F2C]">Strategic Precision</p>
                  <p className="text-[11px] text-slate-500 font-medium">Custom blueprints for every asset.</p>
               </div>
               <div className="space-y-3 p-6 bg-slate-50 rounded-[32px] hover:bg-[#FF6600]/5 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF6600] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
                    <Zap size={20} />
                  </div>
                  <p className="font-black text-sm text-[#1A1F2C]">Agile Response</p>
                  <p className="text-[11px] text-slate-500 font-medium">24/7 industrial support matrix.</p>
               </div>
            </div>

            <button className="flex items-center gap-2 group pt-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#1A1F2C]">Architecting the future</span>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#FF6600] group-hover:border-[#FF6600] group-hover:text-white transition-all">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsCards() {
  const stats = [
    { label: 'High-Impact Projects', value: '1,000+', icon: <Target />, color: 'bg-blue-500' },
    { label: 'Elite B2B Customers', value: '100+', icon: <Users />, color: 'bg-orange-500' },
    { label: 'Success Efficiency', value: '98%', icon: <Zap />, color: 'bg-emerald-500' },
    { label: 'Years of Experience', value: '33', icon: <Calendar />, color: 'bg-purple-500' }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container-industrial">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {stats.map((stat, idx) => (
             <div key={idx} className="bg-white p-8 rounded-[48px] shadow-industrial hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden border border-white">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${stat.color} rounded-bl-full`} />
                
                <div className={`w-14 h-14 rounded-2xl ${stat.color}/10 flex items-center justify-center text-${stat.color.split('-')[0]}-600 mb-6 group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(stat.icon as React.ReactElement<{ size: number; className?: string }>, { size: 24, className: 'text-[#FF6600]' })}
                </div>

                <div className="space-y-1">
                  <h4 className="text-4xl font-black text-[#1A1F2C] tracking-tighter">{stat.value}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
