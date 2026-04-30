'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  const phoneNumber = '+919820090775';
  const whatsappNumber = '919820090775';

  return (
    <div className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} fill="currentColor" className="text-white" />
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${phoneNumber}`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-[#FF6600] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#e65c00] transition-colors"
        title="Call Us"
      >
        <Phone size={20} fill="currentColor" />
      </motion.a>
    </div>
  );
}
