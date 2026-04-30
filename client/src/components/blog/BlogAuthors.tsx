'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';

const authors = [
  { 
    name: "Jayant Ghadge", 
    role: "Chief Logistics Engineer", 
    bio: "20+ years expertise in ODC machinery lashing and structural crating blueprints.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  { 
    name: "Dhanik Chheda", 
    role: "Compliance & Standards Lead", 
    bio: "Expert in ISPM-15 certification and global phytosanitary regulatory frameworks.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    name: "Snehal Chheda", 
    role: "Industrial Innovation Manager", 
    bio: "Pioneering VCI solutions and automated packaging line integration for auto hubs.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
  }
];

export default function BlogAuthors() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
           <div className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-[#ff6a00]">The Minds Behind The Platform</div>
           <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter">Engineered By <br/> <span className="text-[#ff6a00]">Real Experts.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {authors.map((author, i) => (
             <motion.div
               key={i}
               whileHover={{ y: -12 }}
               className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group text-center"
             >
                <div className="relative w-24 h-24 mx-auto mb-8">
                   <div className="absolute inset-0 bg-[#ff6a00] rounded-[32px] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                   <img src={author.img} alt={author.name} className="relative z-10 w-full h-full object-cover rounded-[32px] group-hover:-translate-y-2 transition-transform duration-500" />
                </div>

                <h3 className="text-2xl font-black text-[#1A1F2C] mb-2">{author.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00] mb-6">{author.role}</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">{author.bio}</p>

                <div className="flex justify-center gap-4 pt-4 border-t border-slate-50">
                   <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center">
                      <Linkedin size={16}/>
                   </button>
                   <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-[#1A1F2C] transition-colors flex items-center justify-center">
                      <ExternalLink size={16}/>
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
