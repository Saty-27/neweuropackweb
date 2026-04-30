'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, AlertCircle } from 'lucide-react';

const quickContacts = [
  { icon: <Mail size={24} />, title: "Email Us", value: "sales@europackindia.in", href: "mailto:sales@europackindia.in" },
  { icon: <MapPin size={24} />, title: "Visit Us", value: "HQ, Mumbai", href: "#headquarters" },
  { icon: <AlertCircle size={24} />, title: "Emergency Support", value: "24/7 Available", href: "tel:+919820090775", highlight: true }
];

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-[#0B0F19]">
      {/* Background Graphic & Dotted Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0B0F19]/80 z-10" />
        <div className="absolute inset-0 bg-[url('/images/banners/welcome-bg.png')] opacity-10 bg-repeat bg-[length:24px_24px] z-10" style={{ mixBlendMode: 'overlay' }} />
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff6a00]/20 rounded-full blur-[120px] pointer-events-none z-10"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-10"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ff6a00] text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ff6a00] animate-pulse" />
              Get In Touch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-[#ff8c33]">Europack.</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              End-to-end industrial packaging support across India. From design to delivery — we’re ready to assist your next project.
            </p>
          </motion.div>

          {/* Right Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Using a placeholder for now until we generate the specific image */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl shadow-[#ff6a00]/10 border border-white/10 group">
              <iframe 
                src="https://www.youtube.com/embed/xGLzD-Rl-j4?autoplay=1&mute=1&loop=1&playlist=xGLzD-Rl-j4&controls=0&showinfo=0&rel=0&modestbranding=1" 
                title="Industrial Operations"
                className="absolute inset-0 w-full h-full object-cover scale-125"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F19]/60 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 bg-black/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                 <div className="w-12 h-12 border-2 border-[#ff6a00] rounded-full border-t-transparent animate-spin flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#ff6a00] rounded-full" />
                 </div>
                 <div>
                    <p className="text-white font-black text-[10px] uppercase tracking-widest text-[#ff6a00]">Active Operations</p>
                    <p className="text-slate-300 font-bold text-sm">Global Port Transit</p>
                 </div>
              </div>
            </div>
            {/* Particle Overlay */}
            <div className="absolute inset-0 bg-[url('/images/particles.svg')] opacity-30 mix-blend-screen pointer-events-none z-30" />
          </motion.div>
          
        </div>
      </div>

      {/* Section 2: Quick Contact Strip */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickContacts.map((contact, idx) => (
            <motion.a 
              key={idx}
              href={contact.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
              className={`flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 overflow-hidden group relative bg-[#131A2A] hover:-translate-y-2
                ${contact.highlight ? 'border-[#ff6a00]/50 shadow-[0_0_30px_rgba(255,106,0,0.15)] hover:shadow-[#ff6a00]/30' : 'border-white/5 hover:border-white/20 shadow-xl'}
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                ${contact.highlight ? 'from-[#ff6a00]/20 to-transparent' : 'from-white/5 to-transparent'}`} 
              />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-transform duration-300 group-hover:scale-110 shadow-inner
                ${contact.highlight ? 'bg-[#ff6a00] text-white' : 'bg-white/5 text-[#ff6a00]'}`}
              >
                {contact.icon}
              </div>
              <div className="z-10">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{contact.title}</p>
                <p className={`font-black tracking-tight ${contact.highlight ? 'text-white text-lg' : 'text-slate-200 text-base'}`}>
                  {contact.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
