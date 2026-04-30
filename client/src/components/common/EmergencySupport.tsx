'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function EmergencySupport() {
  const whatsappNumber = "+919820090775";
  const message = encodeURIComponent("Emergency Support Request: I need immediate industrial packaging assistance.");
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] flex flex-col items-end gap-2"
    >
      {/* Pulse Effect for Attention */}
      <div className="absolute -inset-2 bg-orange-500/20 rounded-full animate-ping pointer-events-none" />
      
      {/* Label */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/10 whitespace-nowrap"
      >
        Emergency Support 24/7
      </motion.div>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] text-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-green-500/20 border-2 md:border-4 border-white flex items-center gap-2 md:gap-3 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <MessageCircle size={22} className="md:w-7 md:h-7 fill-current" />
        <div className="flex flex-col pr-1 md:pr-2">
           <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-80 leading-none mb-0.5 md:mb-1">Direct Help</span>
           <span className="text-xs md:text-sm font-black tracking-tight">+91 98200 90775</span>
        </div>
      </motion.a>
    </motion.div>
  );
}
