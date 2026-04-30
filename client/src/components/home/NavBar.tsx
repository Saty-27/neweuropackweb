'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X, ArrowRight } from 'lucide-react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Industries', href: '/#industries' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Team', href: '/#team' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-industrial py-4' : 'bg-transparent py-6'}`}>
      <div className="container-industrial">
        <div className="flex items-center justify-between">
          
          {/* Industrial Brand Identity */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#FF6600] rounded-xl flex items-center justify-center shadow-lg shadow-orange-100 group-hover:rotate-6 transition-transform duration-500">
              <span className="text-white font-black text-xl italic">E</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tight-industrial leading-none ${isScrolled ? 'text-[#1A1F2C]' : 'text-[#1A1F2C]'}`}>EUROPACK</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#FF6600]">Technical Packing</span>
            </div>
          </Link>

          {/* Desktop Nav Matrix */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[11px] font-black uppercase tracking-widest text-[#1A1F2C] hover:text-[#FF6600] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Hub */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <a href="tel:+919820090775" className="flex items-center gap-2 text-[11px] font-black text-[#1A1F2C]">
                <Phone size={12} className="text-[#FF6600]" /> +91 98200 90775
              </a>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Support 24/7</span>
            </div>
            <Link href="/#contact" className="btn-industrial btn-industrial-primary flex items-center gap-2 px-6 py-3">
              Get Quote <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Orchestration */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#1A1F2C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[90] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF6600] rounded-lg flex items-center justify-center">
                <span className="text-white font-black italic">E</span>
              </div>
              <span className="text-lg font-black tracking-tighter">EUROPACK</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 mb-auto">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-black text-[#1A1F2C] flex justify-between items-center group"
              >
                {link.name}
                <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="p-6 bg-slate-50 rounded-[32px] space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Phone size={16} className="text-[#FF6600]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Us</p>
                <p className="font-bold">+91 98200 90775</p>
              </div>
            </div>
            <Link href="/#contact" className="btn-industrial btn-industrial-primary w-full text-center py-4 flex items-center justify-center gap-2">
              Get Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
