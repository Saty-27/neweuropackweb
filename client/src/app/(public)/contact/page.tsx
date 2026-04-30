'use client';

import React from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactTrust from '@/components/contact/ContactTrust';
import ContactProcess from '@/components/contact/ContactProcess';
import ContactSupport from '@/components/contact/ContactSupport';
import TechFAQ from '@/components/shared/TechFAQ';
import { motion } from 'framer-motion';

const testimonials = [
  { text: "Zero-damage record across 500+ international projects. Europack is our most reliable partner.", client: "Siemens India", role: "Logistics Head" },
  { text: "Their technical documentation and compliance handling saves us tremendous time and port-fees.", client: "TATA Motors", role: "SCM Director" },
  { text: "The engineering detail they put into their vacuum packing ensures our CNC machines arrive in flawless condition.", client: "L&T Automation", role: "Procurement Lead" }
];

export default function ContactPage() {
  return (
    <main className="font-sans antialiased overflow-hidden bg-white">
      {/* 1. Hero Banner & 2. Quick Contact Strip */}
      <ContactHero />

      {/* 6. Request a Quote (Enhanced Form) & 7. Services Quick Select */}
      <ContactForm />

      {/* 9. Trust Section (Logos & Stats) & 10. Industries We Serve */}
      <ContactTrust />

      {/* 11. Process Flow */}
      <ContactProcess />

      {/* 12. Auto Sliding Testimonial Section */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-[#ff6a00] text-[10px] font-black uppercase tracking-widest mb-6">Verified Feedback</div>
           <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter mb-16">Trusted by the <span className="text-[#ff6a00]">Best.</span></h2>
           
           <div className="flex overflow-hidden relative group">
              <motion.div 
                animate={{ x: ["0%", "-100%"] }} 
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="flex gap-8 whitespace-nowrap"
              >
                 {[...testimonials, ...testimonials].map((t, idx) => (
                   <div key={idx} className="w-[400px] md:w-[500px] whitespace-normal bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 shrink-0 text-left">
                      <p className="text-[#ff6a00] text-6xl leading-[0.5] font-serif mb-4">"</p>
                      <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 h-24">{t.text}</p>
                      <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                         <div className="w-12 h-12 rounded-full bg-slate-200" />
                         <div>
                            <p className="font-black text-[#1A1F2C] uppercase tracking-wider text-sm">{t.client}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </motion.div>
           </div>
        </div>
      </section>

      {/* 13. FAQ Section */}
      <TechFAQ onOpenModal={() => {}} />

      {/* 8. Live Support / WhatsApp CTA, 14. Career & Partner CTA, 15. Final CTA */}
      <ContactSupport />
    </main>
  );
}
