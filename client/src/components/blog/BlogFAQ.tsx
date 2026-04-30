'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const blogFaqs = [
  { 
    q: "What exactly is ISPM-15 certification?", 
    a: "ISPM-15 (International Standards for Phytosanitary Measures No. 15) is a global regulation requiring all solid wood packaging to be heat-treated to 56°C for 30 minutes to eliminate pests. Non-compliant shipments can be rejected, destroyed, or heavily fined at international ports." 
  },
  { 
    q: "How long does VCI protection last?", 
    a: "Volatile Corrosion Inhibitors typically protect metals for 12-24 months if the packaging remains hermetically sealed. Our multi-layer VCI systems are engineered for the longest transit routes, including trans-oceanic shipping during monsoon seasons." 
  },
  { 
    q: "Why is vacuum packing necessary for electronics?", 
    a: "Electronics are highly sensitive to microscopic moisture ingress which causes short circuits. Vacuum sealing with aluminum barrier foil and desiccants reduces humidity to near 0%, ensuring zero static or moisture damage." 
  },
  { 
    q: "Can you pack heavy machinery at our factory?", 
    a: "Yes. Europack specializes in on-site mobile deployment. Our teams arrive at your factory with all materials and CNC-cut components to crate your heavy machinery right before it leaves the plant, reducing handling risks." 
  }
];

export default function BlogFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
           <div className="w-16 h-16 rounded-2xl bg-slate-50 text-[#ff6a00] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <HelpCircle size={32} />
           </div>
           <h2 className="text-4xl font-black text-[#1A1F2C] tracking-tighter uppercase">Knowledge <span className="text-[#ff6a00]">Quick-Check.</span></h2>
           <p className="text-slate-500 font-medium tracking-tight">Rapid answers to the most common technical packaging inquiries.</p>
        </div>

        <div className="space-y-4">
           {blogFaqs.map((faq, i) => (
             <div 
               key={i} 
               className={`rounded-[32px] border transition-all duration-500 ${
                 openIndex === i ? 'bg-slate-50 border-[#ff6a00]/20 shadow-lg' : 'bg-white border-slate-100 hover:border-slate-200'
               }`}
             >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                   <span className="text-lg font-black text-[#1A1F2C] tracking-tight">{faq.q}</span>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                     openIndex === i ? 'bg-[#ff6a00] text-white rotate-180' : 'bg-slate-50 text-[#1A1F2C]'
                   }`}>
                      {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                   </div>
                </button>
                <AnimatePresence>
                   {openIndex === i && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                     >
                        <div className="px-8 pb-8 pt-2">
                           <p className="text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                        </div>
                     </motion.div>
                   )}
                </AnimatePresence>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
