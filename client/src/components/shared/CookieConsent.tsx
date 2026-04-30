'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check, Info } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[9999]"
        >
          <div className="bg-[#1A1F2C] border border-white/10 rounded-[32px] p-8 shadow-2xl shadow-black/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg tracking-tight">Cookie Security</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Privacy Compliance</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                We use cookies to optimize your industrial logistics experience. This helps us track which solutions are most relevant to your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-8 py-4 bg-[#FF6600] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#e65c00] transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Check size={14} /> Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <X size={14} /> Essential Only
                </button>
              </div>

              <div className="mt-6 text-center">
                <a href="/privacy" className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.2em] hover:underline">Read Privacy Matrix</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
