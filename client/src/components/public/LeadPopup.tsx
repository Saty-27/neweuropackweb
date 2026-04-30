'use client';

import React, { useState } from 'react';
import { X, Phone, User, Mail, MessageSquare, Building2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  config?: {
    enablePopup: boolean;
    trigger: string;
    fields: string[];
  };
}

export default function LeadPopup({ isOpen, onClose, productName, config }: LeadPopupProps) {
  const activeFields = config?.fields || ['name', 'email', 'phone', 'message'];
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: `Inquiry for ${productName}`,
    message: `I am interested in ${productName}. Please provide more details and a quote.`
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // WhatsApp Redirection
      let waMessage = `Hello Europack! I am interested in *${productName}*.\n\n`;
      if (activeFields.includes('name')) waMessage += `*Name:* ${formData.name}\n`;
      if (activeFields.includes('company')) waMessage += `*Company:* ${formData.company}\n`;
      if (activeFields.includes('phone')) waMessage += `*Phone:* ${formData.phone}\n`;
      if (activeFields.includes('email')) waMessage += `*Email:* ${formData.email}\n`;
      if (activeFields.includes('message')) waMessage += `\n*Message:* ${formData.message}`;
      
      const waUrl = `https://wa.me/919819030303?text=${encodeURIComponent(waMessage)}`;
      
      window.open(waUrl, '_blank');
      onClose();
    } catch (error) {
       alert('Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: string) => {
    switch(field) {
      case 'name':
        return (
          <div className="relative" key="name">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Full Name *</label>
             <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#FF6600] transition-all outline-none font-semibold text-slate-800"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
             </div>
          </div>
        );
      case 'phone':
        return (
          <div className="relative" key="phone">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Phone Number *</label>
             <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#FF6600] transition-all outline-none font-semibold text-slate-800"
                  placeholder="+91 98XXX XXXXX"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
             </div>
          </div>
        );
      case 'email':
        return (
          <div className="relative" key="email">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email Address *</label>
             <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  required 
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#FF6600] transition-all outline-none font-semibold text-slate-800"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
             </div>
          </div>
        );
      case 'company':
        return (
          <div className="relative" key="company">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Company Name</label>
             <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#FF6600] transition-all outline-none font-semibold text-slate-800"
                  placeholder="Your Company Pvt Ltd"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
             </div>
          </div>
        );
      case 'message':
        return (
          <div className="md:col-span-2 relative" key="message">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Your Message</label>
             <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-slate-300" size={18} />
                <textarea 
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:border-[#FF6600] transition-all outline-none font-semibold text-slate-800"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             className="bg-white rounded-3xl overflow-hidden shadow-2xl relative"
             style={{ width: '100%', maxWidth: '900px', display: 'flex' }}
           >
              {/* Left Side: Branding/Image */}
              <div className="hidden lg:flex w-1/3 bg-[#FF6600] p-10 flex-col justify-between text-white">
                 <div>
                    <h2 className="text-3xl font-black mb-4 leading-tight uppercase tracking-tighter">Instant <br/>Expert <br/>Consult</h2>
                    <p className="text-orange-100 font-bold text-sm">Industrial packaging solutions engineered for your specific supply chain needs.</p>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black tracking-widest">01</div>
                       <p className="border-b border-white/20 pb-1 text-xs font-black tracking-widest uppercase">Custom Pricing</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black tracking-widest">02</div>
                       <p className="border-b border-white/20 pb-1 text-xs font-black tracking-widest uppercase">Technical Audit</p>
                    </div>
                 </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 lg:p-12">
                 <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full">
                    <X size={20} />
                 </button>

                 <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">Enquire <span className="text-[#FF6600]">{productName}</span></h3>
                    <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Technical consultation request</p>
                 </div>

                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {activeFields.map(renderField)}

                    <div className="md:col-span-2 mt-4">
                       <button 
                         disabled={loading}
                         className="w-full bg-[#FF6600] hover:bg-[#e65c00] text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-orange-200 transition-all flex items-center justify-center gap-4 disabled:bg-slate-300 disabled:shadow-none translate-y-0 active:translate-y-1"
                       >
                          {loading ? 'Processing Architecture...' : (
                            <><Send size={20} /> Deploy Inquiry (WhatsApp)</>
                          )}
                       </button>
                    </div>
                 </form>
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
