'use client';

import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  { num: '01', title: 'Enquiry', desc: 'Submit dimensions & weight' },
  { num: '02', title: 'Consultation', desc: 'Technical spec discussion' },
  { num: '03', title: 'Design', desc: '3D load blueprinting' },
  { num: '04', title: 'Packing', desc: 'On-site export securing' },
  { num: '05', title: 'Delivery', desc: 'Global port dispatch' }
];

export default function ContactProcess() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
           <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-[#1A1F2C] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-200">Execution Framework</div>
           <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter">
             From Blueprint to <span className="text-[#ff6a00]">Vessel.</span>
           </h2>
        </div>

        <div className="relative">
          {/* Animated Connecting Timeline */}
          <div className="hidden lg:block absolute top-[45px] left-0 w-full h-[3px] bg-slate-100">
             <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-gradient-to-r from-[#ff6a00] to-yellow-400 origin-left"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.2, duration: 0.5 }}
                 className="relative z-10 text-center flex flex-col items-center group"
              >
                 <div className="w-[90px] h-[90px] rounded-full bg-white border-[4px] border-slate-100 shadow-[0_0_30px_rgba(0,0,0,0.05)] flex items-center justify-center mb-6 group-hover:border-[#ff6a00] group-hover:scale-110 transition-all duration-500">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#ff6a00] transition-colors">{step.num}</span>
                 </div>
                 <h4 className="text-lg font-black text-[#1A1F2C] uppercase tracking-wide mb-2">{step.title}</h4>
                 <p className="text-sm font-bold text-slate-500 px-4">{step.desc}</p>
                 
                 {/* Mobile Arrow down */}
                 {idx < processSteps.length - 1 && (
                   <div className="lg:hidden mt-8 w-[2px] h-10 bg-[#ff6a00]/30" />
                 )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
