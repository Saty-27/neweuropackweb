'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FileText, GraduationCap, Briefcase, Award } from 'lucide-react';

const stats = [
  { label: 'Technical Articles', val: 120, icon: <FileText size={20}/>, color: 'from-[#ff6a00] to-[#ee5a00]' },
  { label: 'Compliance Guides', val: 30, icon: <GraduationCap size={20}/>, color: 'from-blue-600 to-blue-400' },
  { label: 'Expert Case Studies', val: 50, icon: <Briefcase size={20}/>, color: 'from-emerald-600 to-emerald-400' },
  { label: 'Certified Experts', val: 15, icon: <Award size={20}/>, color: 'from-purple-600 to-purple-400' }
];

export default function BlogStats() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section ref={ref} className="py-24 container max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-1 rounded-[32px] bg-gradient-to-br from-slate-100 to-transparent border border-slate-100 hover:shadow-xl transition-all group"
          >
            <div className="bg-white p-8 rounded-[30px] flex flex-col items-center text-center">
               <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center mb-6 shadow-xl`}>
                  {stat.icon}
               </div>
               <div className="text-4xl font-black text-[#1A1F2C] tracking-tighter mb-2">
                 {inView ? <CountUp end={stat.val} duration={2.5} suffix="+" /> : '0+'}
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
