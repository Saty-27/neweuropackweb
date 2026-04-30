'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus, MessagesSquare } from 'lucide-react';

interface TechFAQProps {
  onOpenModal: () => void;
}

export default function TechFAQ({ onOpenModal }: TechFAQProps) {
  const [open, setOpen] = useState<number | null>(0);
  
  const faqs = [
    {
      q: 'Is Europack ISPM-15 Certified?',
      a: 'Yes, all our wooden crates and wooden packaging are 100% ISPM-15 heat-treated and certified for international export. We handle full phytosanitary documentation.'
    },
    {
      q: 'Do you offer on-site packing services across India?',
      a: 'Absolutely. Our mobile packing teams operate across Mumbai, Pune, Chennai, Ahmedabad, Delhi, and all major industrial hubs to pack machinery at your facility.'
    },
    {
      q: 'What is the maximum weight your crates can support?',
      a: 'Our heavy-duty structural crates are engineered for loads up to 50+ tonnes with full load plan verification and structural reinforcement.'
    },
    {
      q: 'How fast can you turn around a packing order?',
      a: 'Standard orders are fulfilled in 3–5 business days. We offer 24–48 hour emergency packaging for time-critical export shipments.'
    },
    {
      q: 'Do you handle export documentation?',
      a: 'Yes, we handle phytosanitary certificates, packing lists, material declarations, and all compliance documentation required for international export.'
    },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1F2C_1.5px,transparent_1.5px)] [background-size:60px_60px] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#FF6600] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Expert Resolution</div>
            <h2 className="text-5xl md:text-7xl font-black text-[#1A1F2C] tracking-tighter leading-tight mb-8">
               Packaging <br/>
               <span className="text-[#FF6600]">FAQ.</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
              Find technical answers to your industrial export parameters. For mission-critical inquiries, connect with our engineering team directly.
            </p>
            <button 
              onClick={onOpenModal}
              className="group relative inline-flex items-center gap-3 bg-[#1A1F2C] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-[#FF6600] shadow-xl hover:shadow-orange-200"
            >
              Connect with Engineers
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            {/* Added Technical Consultation Block */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-16 p-10 rounded-[40px] bg-slate-50 border border-slate-100 relative overflow-hidden group shadow-sm"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/50 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700 blur-2xl" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6600] flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-200">
                  <MessagesSquare size={28} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-black text-[#1A1F2C] mb-3">Live Consultation</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">
                  Available Mon–Sat (09:00 – 19:00) for on-site assessment through our mobile engineering units.
                </p>
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                   <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1F2C]">Technical Support Online</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-[32px] overflow-hidden border-2 transition-all duration-500 ${open === i ? 'border-[#FF6600] bg-white shadow-2xl shadow-orange-500/5' : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'}`}
              >
                <button 
                  onClick={() => setOpen(open === i ? null : i)} 
                  className="w-full p-8 flex items-center justify-between text-left gap-6 group"
                >
                  <span className={`text-base font-black transition-colors ${open === i ? 'text-[#FF6600]' : 'text-[#1A1F2C] group-hover:text-[#FF6600]'}`}>
                    {f.q}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${open === i ? 'bg-[#FF6600] border-[#FF6600] text-white rotate-180' : 'border-slate-200 text-slate-300'}`}>
                    {open === i ? <Minus size={18} strokeWidth={3}/> : <Plus size={18} strokeWidth={3}/>}
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <div className="pt-4 border-t border-slate-50">
                        <p className="text-slate-500 leading-relaxed font-medium">
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
