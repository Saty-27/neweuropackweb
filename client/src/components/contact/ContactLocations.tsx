'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Copy, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

const factories = [
  {
    name: 'Mega Crate Unit & HQ',
    location: 'Bhiwandi, Mumbai',
    address: 'Shakti Industrial Complex, Vasai Road, Mumbai 400057',
    gst: '27AAAFE1305L1ZR',
    bg: '/images/about/factory.png' // Using an existing strong image
  },
  {
    name: 'Auto & Heavy Machinery',
    location: 'Chakan MIDC, Pune',
    address: 'Plot 42, Heavy Engineering Zone, Pune 411050',
    gst: '20AAAFE1305L1Z5',
    bg: '/images/products/pallet_wrap.png'
  },
  {
    name: 'Industrial Node',
    location: 'Vadodara, Gujarat',
    address: 'G.J. Patel Estate, Vadodara, Gujarat 390010',
    gst: '24AAAFE1305L2ZW',
    bg: '/images/about/shipment.png'
  }
];

export default function ContactLocations() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', {
      icon: <CheckCircle2 className="text-green-500" />,
      style: { background: '#1A1F2C', color: '#fff' }
    });
  };

  return (
    <section id="headquarters" className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.02))] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 3: Head Office Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0B0F19] rounded-[48px] overflow-hidden shadow-2xl relative mb-32"
        >
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ff6a00]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
           
           <div className="grid grid-cols-1 lg:grid-cols-2">
             <div className="p-12 md:p-20 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-10">
                  <motion.span animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-flex">
                    <MapPin size={12} className="text-[#ff6a00]" />
                  </motion.span> Global Headquarters
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-12">
                  Europack <span className="text-[#ff6a00]">Mumbai</span>
                </h2>

                <div className="space-y-10">
                  <div className="flex gap-6 group">
                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#ff6a00] group-hover:bg-[#ff6a00] group-hover:text-white transition-all shadow-inner">
                       <MapPin size={24} />
                     </div>
                     <div>
                       <p className="text-[12px] font-black uppercase tracking-widest text-[#ff6a00] mb-2">Primary Address</p>
                       <p className="text-slate-300 text-lg leading-relaxed font-medium">101, ML SPACES, Railway Station Rd, near Vile Parle,<br />above Bharat Bank, Navpada, Kamala Nagar,<br />Vile Parle West, Mumbai, Maharashtra 400056</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                       <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#ff6a00]">
                           <Phone size={18} />
                         </div>
                         <p className="text-[12px] font-black uppercase tracking-widest text-slate-400">Key Contacts</p>
                       </div>
                       <div className="space-y-3">
                         <div className="group/item flex items-center gap-4 cursor-pointer" onClick={() => handleCopy('+91 9819030303')}>
                           <div>
                             <p className="text-white font-bold group-hover/item:text-[#ff6a00] transition-colors">+91 98190 30303</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Divyesh</p>
                           </div>
                           <button className="opacity-0 group-hover/item:opacity-100 text-slate-400 hover:text-white transition-opacity"><Copy size={14}/></button>
                         </div>
                         <div className="group/item flex items-center gap-4 cursor-pointer" onClick={() => handleCopy('+91 9820090775')}>
                           <div>
                             <p className="text-white font-bold group-hover/item:text-[#ff6a00] transition-colors">+91 98200 90775</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Dhanik</p>
                           </div>
                           <button className="opacity-0 group-hover/item:opacity-100 text-slate-400 hover:text-white transition-opacity"><Copy size={14}/></button>
                         </div>
                       </div>
                    </div>
                    
                    <div>
                       <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#ff6a00]">
                           <Clock size={18} />
                         </div>
                         <p className="text-[12px] font-black uppercase tracking-widest text-slate-400">Hours</p>
                       </div>
                       <div className="space-y-1">
                         <p className="text-white font-bold">Mon - Sat</p>
                         <p className="text-slate-400 text-sm">09:00 AM - 07:00 PM</p>
                         <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6a00] mt-2">24/7 Field Support Available</p>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Map Integration Overlay */}
             <div className="relative h-[400px] lg:h-auto min-h-full w-full">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.6562!2d72.8353!3d19.1075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9e5ca6a0001%3A0x1!2sVile+Parle+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{border:0, filter:'contrast(1.2) brightness(0.8)'}} allowFullScreen loading="lazy"
                  className="absolute inset-0"
               />
               <div className="absolute inset-0 bg-[#0B0F19]/20 mix-blend-multiply pointer-events-none" />
             </div>
           </div>
        </motion.div>

        {/* Section 4: Factories Network */}
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter">Production <span className="text-[#ff6a00]">Network.</span></h2>
           <p className="text-slate-500 font-medium text-lg mt-4 max-w-2xl mx-auto">Strategically located heavy engineering hubs to minimize logistics downtime across India.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {factories.map((fac, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 hover:border-[#ff6a00]/50"
            >
              {/* Background Image */}
              <Image src={fac.bg} alt={fac.name} fill className="object-cover transition-transform duration-[10s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0F19]/60 to-[#0B0F19] transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-[#ff6a00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                 <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-md tracking-widest text-[#ff6a00] text-[10px] uppercase font-black mb-4">
                   {fac.location}
                 </div>
                 <h3 className="text-2xl font-black text-white mb-2 leading-tight">{fac.name}</h3>
                 <p className="text-slate-300 text-sm font-medium mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   {fac.address}
                 </p>
                 <div className="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                   <p className="text-xs font-bold text-slate-400">GST: <span className="text-white">{fac.gst}</span></p>
                   <MapPin size={18} className="text-[#ff6a00]" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
