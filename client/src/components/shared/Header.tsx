'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
   Phone, Mail, Menu, X, ArrowRight, ChevronDown, Search, Globe, 
   Box, ShieldCheck, Activity, Users, Settings, Quote, Video, Layout, FileDown,
  ArrowUpRight
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { productsData } from '../../constants/productsData';

const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Company',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about', icon: <Globe size={18} /> },
      { name: 'Careers', href: '/careers', icon: <Users size={18} /> },
      { name: 'Our Clients', href: '/clients', icon: <Users size={18} /> },
    ]
  },
  {
    name: 'Solutions',
    href: '/products',
    children: [
      { name: 'Packaging Products', href: '/products', icon: <Box size={18} /> },
      { name: 'Engineering Services', href: '/services', icon: <Settings size={18} /> },
      { name: 'Industries We Serve', href: '/industries', icon: <Activity size={18} /> },
    ]
  },
  {
    name: 'Resources',
    href: '/blog',
    children: [
      { name: 'Testimonials', href: '/testimonials', icon: <Quote size={18} /> },
      { name: 'Knowledge Blog', href: '/blog', icon: <Mail size={18} /> },
      { name: 'Project Gallery', href: '/gallery', icon: <Search size={18} /> },
      { name: 'Video Tours', href: '/videos', icon: <Video size={18} /> },
    ]
  },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const { openEnquiryModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Flatten products for search
  const allProducts = productsData.flatMap(cat => 
    cat.subCategories.flatMap(sub => 
      sub.products.map(p => ({
        ...p,
        categoryTitle: cat.title,
        categoryId: cat.id
      }))
    )
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.categoryTitle.toLowerCase().includes(query.toLowerCase()) ||
        p.subTitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit results for clean UI
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // 300ms grace period
  };

  const openModal = () => {
    // This function will be called to open the inquiry modal
    // Implementation can be added here or passed from parent
  };

  return (
    <>
      {/* Top Banner */}
      <div className="hidden lg:flex bg-[#1A1F2C] text-white text-[12px] font-bold py-2.5 z-[190] relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <span className="text-slate-400 uppercase tracking-widest">India's #1 Trusted Industrial Packaging Solutions Provider</span>
          <div className="flex items-center gap-8">
            <a href="tel:+919820090775" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
              <Phone size={12} className="text-[#FF6600]" /> +91 98200 90775
            </a>
            <a href="mailto:sales@europackindia.in" className="flex items-center gap-2 hover:text-[#FF6600] transition-colors">
              <Mail size={12} className="text-[#FF6600]" /> sales@europackindia.in
            </a>
          </div>
        </div>
      </div>

      <nav className={`fixed w-full z-[210] bg-white border-b border-slate-100 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`} style={{ top: isScrolled ? 0 : 'auto' }}>
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[85px] lg:h-[100px]">

            <div className="flex-1 flex items-center justify-start">
              <Link href="/" className="inline-flex items-center shrink-0 group">
                <img 
                  src="/images/logo/EuropackLogo.png" 
                  alt="Europack Logo" 
                  className="h-[60px] lg:h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md" 
                />
              </Link>
            </div>

            {/* Center Section: Navigation Menu */}
            <div className="hidden xl:flex flex-none items-center justify-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group h-full flex items-center py-7"
                  onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.children && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpenDropdown(null)}
                    className={`flex items-center gap-1.5 py-2 text-[15px] font-black uppercase tracking-wider transition-colors relative ${openDropdown === item.name ? 'text-[#FF6600]' : 'text-slate-800 hover:text-[#FF6600]'}`}
                  >
                    {item.name}
                    {item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />}
                    <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#FF6600] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>

                  <AnimatePresence>
                    {item.children && openDropdown === item.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[320px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] pt-6 pb-6 rounded-[32px] z-50 overflow-hidden"
                      >
                        <div className="px-4 space-y-1">
                          {item.children.map((child: any) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[14px] font-bold text-slate-600 hover:text-[#FF6600] hover:bg-orange-50/50 transition-all group/item"
                            >
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-white group-hover/item:text-[#FF6600] group-hover/item:shadow-lg group-hover/item:shadow-orange-500/10 transition-all">
                                {child.icon}
                              </div>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover Bridge */}
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-[60px] left-0 w-full h-10 -z-10" />
                  )}
                </div>
              ))}

            </div>

            {/* Right Section: Search & CTA */}
            <div className="hidden xl:flex flex-1 items-center justify-end gap-3">
              <div className="flex items-center relative pr-4 border-r border-slate-200" ref={searchRef}>
                 {isSearchOpen ? (
                   <div className="relative">
                     <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 260, opacity: 1 }} className="flex items-center bg-[#f8f9fa] rounded-full border border-slate-200 overflow-hidden px-3 py-1.5 shadow-sm">
                        <Search size={16} strokeWidth={1.5} className="text-[#FF6600] shrink-0"/>
                        <input 
                          type="text" 
                          placeholder="Search industrial products..." 
                          className="w-full bg-transparent border-none outline-none px-2 text-[13px] font-bold text-slate-800 placeholder:text-slate-400" 
                          autoFocus 
                          value={searchQuery}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchQuery && (
                          <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="text-slate-400 hover:text-slate-600">
                            <X size={14} />
                          </button>
                        )}
                     </motion.div>

                     {/* Search Results Dropdown */}
                     <AnimatePresence>
                        {searchResults.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full mt-3 right-0 w-[350px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl overflow-hidden z-[300]"
                          >
                            <div className="p-3 bg-slate-50 border-b border-slate-100">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results</p>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                              {searchResults.map((result) => (
                                <Link 
                                  key={result.id} 
                                  href={`/products/${result.categoryId}/${result.id}`}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery('');
                                    setSearchResults([]);
                                  }}
                                  className="flex items-center gap-4 p-4 hover:bg-orange-50 transition-colors group border-b border-slate-50 last:border-0"
                                >
                                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                    <img src={result.img} alt={result.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[13px] font-black text-slate-800 group-hover:text-[#FF6600] transition-colors">{result.name}</p>
                                    <p className="text-[11px] font-bold text-slate-400">{result.categoryTitle}</p>
                                  </div>
                                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-[#FF6600] transition-all" />
                                </Link>
                              ))}
                            </div>
                            <Link 
                              href="/products" 
                              className="block p-3 text-center text-[11px] font-black uppercase tracking-widest text-[#FF6600] bg-orange-50/30 hover:bg-orange-50 transition-colors"
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                                setSearchResults([]);
                              }}
                            >
                              View All Products
                            </Link>
                          </motion.div>
                        )}
                     </AnimatePresence>
                   </div>
                 ) : (
                   <button onClick={() => setIsSearchOpen(true)} className="flex items-center justify-center hover:text-[#FF6600] transition-colors text-slate-600 p-2">
                      <Search size={18} strokeWidth={1.5} />
                   </button>
                 )}
              </div>

              <a 
                href="/Europack-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all duration-300 border border-slate-200 group whitespace-nowrap"
              >
                BROCHURE <FileDown size={14} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              </a>

              <button 
                onClick={openEnquiryModal}
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff6a00] to-[#e65c00] text-white px-5 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#ff6a00]/30 transition-all duration-300 shadow-sm group border border-[#e65c00]/50 whitespace-nowrap"
              >
                REQUEST QUOTE <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden w-12 h-12 flex items-center justify-center text-[#1A1F2C] hover:bg-slate-100 rounded-xl transition-colors"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-slate-100 bg-white shadow-2xl absolute w-full left-0 z-[140] overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
                <div className="relative mb-4">
                  <div className="flex items-center bg-slate-100 rounded-2xl px-4">
                     <Search size={20} className="text-[#FF6600] shrink-0"/>
                     <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="w-full bg-transparent border-none outline-none py-4 px-3 text-base font-bold text-slate-800" 
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white border border-slate-100 shadow-xl rounded-2xl mt-2 z-50 overflow-hidden">
                      {searchResults.map((result) => (
                        <Link 
                          key={result.id} 
                          href={`/products/${result.categoryId}/${result.id}`}
                          onClick={() => {
                            setMobileOpen(false);
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            <img src={result.img} alt={result.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{result.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{result.categoryTitle}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {navItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                     <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-4 py-3.5 text-lg font-black uppercase text-[#1A1F2C]"
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenDropdown(openDropdown === item.name ? null : item.name);
                            }}
                            className="p-4"
                          >
                            <ChevronDown size={20} className={`transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                     </div>
                     <AnimatePresence>
                       {item.children && openDropdown === item.name && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="flex flex-col pl-6 border-l-2 border-slate-100 ml-4 mb-4 mt-2 gap-2 overflow-hidden"
                         >
                            {item.children.map((child: any) => (
                               <Link
                                 key={child.name} href={child.href}
                                 onClick={() => setMobileOpen(false)}
                                 className="py-3 px-4 flex items-center gap-3 text-base font-bold text-slate-500 hover:text-[#FF6600]"
                               >
                                 <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                   {child.icon}
                                 </div>
                                 {child.name}
                               </Link>
                            ))}
                         </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
                ))}
                <a
                  href="/Europack-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200"
                >
                  Download Brochure <FileDown size={16} />
                </a>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openEnquiryModal();
                  }}
                  className="flex items-center justify-center gap-2 bg-[#FF6600] text-white px-6 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-orange-500/20"
                >
                  Request Quote <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
