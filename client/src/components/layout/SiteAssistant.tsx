import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Package, Target, Phone, ExternalLink } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function SiteAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !data) {
      loadSummaryData();
    }
  }, [isOpen]);

  const loadSummaryData = async () => {
    setLoading(true);
    try {
      const [home, footer, products] = await Promise.all([
        fetch('http://localhost:5002/api/homepage').then(r => r.json()),
        fetch('http://localhost:5002/api/footer').then(r => r.json()),
        fetch('http://localhost:5002/api/products').then(r => r.json())
      ]);

      setData({
        welcome: home.data.welcomeSection,
        contact: footer.data.contact,
        products: products.data.slice(0, 5),
        stats: home.data.welcomeSection.counterCards
      });
    } catch (error) {
      console.error('Assistant data error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[9999] bg-orange-600 text-white p-3 md:p-4 rounded-full shadow-2xl shadow-orange-200 border-2 border-white flex items-center gap-2 group overflow-hidden"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap font-bold text-sm">
          Who is Europack?
        </span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
            />
            
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className="fixed bottom-24 left-8 z-[10001] w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 120px)' }}
            >
              {/* Header */}
              <div className="bg-orange-600 p-8 text-white relative">
                <Sparkles className="absolute top-4 right-4 opacity-20" size={80} />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-all"
                >
                  <X size={18} />
                </button>
                <h2 className="text-2xl font-black mb-1">Europack at a Glance</h2>
                <p className="text-orange-100 text-sm font-medium">Your Industrial Packaging Partner</p>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto no-scrollbar space-y-8">
                {loading ? (
                  <div className="py-20 text-center animate-pulse text-gray-400 font-bold">Consolidating website overview...</div>
                ) : data ? (
                  <>
                    {/* About Summary */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                        <Target size={14} /> Who We Are
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium italic">
                        "{data.welcome?.description?.substring(0, 180)}..."
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                       {data.stats?.map((stat: any, i: number) => (
                         <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                           <div className="text-xl font-black text-gray-900">{stat.number}</div>
                           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{stat.label}</div>
                         </div>
                       ))}
                    </div>

                    {/* Top Solutions */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                        <Package size={14} /> Core Solutions
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.products?.map((p: any, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-orange-50 text-orange-700 text-[11px] font-black rounded-lg border border-orange-100">
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Action */}
                    <div className="bg-gray-900 rounded-3xl p-6 text-white flex justify-between items-center group">
                       <div className="space-y-1">
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Immediate Inquiry</p>
                          <p className="font-bold">{data.contact?.phones[0]}</p>
                       </div>
                       <a 
                        href={`https://wa.me/${data.contact?.phones[0]?.replace(/\D/g,'')}`}
                        target="_blank"
                        className="bg-orange-600 p-3 rounded-2xl group-hover:scale-110 transition-all shadow-xl shadow-orange-900/40"
                       >
                         <Phone size={20} />
                       </a>
                    </div>
                  </>
                ) : null}
              </div>

              {/* Footer Note */}
              <div className="p-4 bg-gray-50 border-t text-center">
                 <p className="text-[10px] text-gray-400 font-medium">Click outside to close • Powered by Europack CMS</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
