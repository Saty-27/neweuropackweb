'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function EnquiryModal({ isOpen, onClose, serviceName = 'General Inquiry' }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetchAPI('/enquiry', {
        method: 'POST',
        body: JSON.stringify({ ...formData, service: serviceName })
      });
      if (res.success) {
        setIsSuccess(true);
        toast.success('Enquiry submitted successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[600px] bg-white rounded-[40px] shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col md:flex-row"
          >
             {/* Industrial Branding Strip */}
             <div className="w-full md:w-[200px] bg-slate-900 p-8 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/20 blur-[60px] rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                   <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/40 rotate-12">
                      <Zap size={24} className="text-white" />
                   </div>
                   <h3 className="text-2xl font-black leading-tight tracking-tighter">EUROPACK LEAD HUB</h3>
                   <div className="w-8 h-1 bg-[#FF6600] mt-4" />
                </div>
                
                <div className="relative z-10 mt-12 md:mt-0">
                   <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck size={16} className="text-[#FF6600]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data Secured</span>
                   </div>
                   <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                      Export Ready Packaging Intelligence 
                   </p>
                </div>
             </div>

             {/* Form UI */}
             <div className="flex-1 p-8 md:p-12 bg-white">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl flex items-center justify-center transition-all z-20"
                >
                   <X size={20} />
                </button>

                <AnimatePresence mode="wait">
                   {!isSuccess ? (
                      <motion.div 
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                         <div className="mb-8">
                            <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter">Get a Quick Quote</h2>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Requesting for: <span className="text-[#FF6600]">{serviceName}</span></p>
                         </div>

                         <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative group">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-all" size={18} />
                               <input 
                                 required
                                 className="w-full bg-slate-50 border-2 border-slate-50 focus:border-[#FF6600]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
                                 placeholder="Your Full Name"
                                 value={formData.name}
                                 onChange={e => setFormData({...formData, name: e.target.value})}
                               />
                            </div>
                            <div className="relative group">
                               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-all" size={18} />
                               <input 
                                 required
                                 type="email"
                                 className="w-full bg-slate-50 border-2 border-slate-50 focus:border-[#FF6600]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
                                 placeholder="Professional Email"
                                 value={formData.email}
                                 onChange={e => setFormData({...formData, email: e.target.value})}
                               />
                            </div>
                            <div className="relative group">
                               <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-all" size={18} />
                               <input 
                                 required
                                 className="w-full bg-slate-50 border-2 border-slate-50 focus:border-[#FF6600]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
                                 placeholder="Company Name"
                                 value={formData.company}
                                 onChange={e => setFormData({...formData, company: e.target.value})}
                               />
                            </div>
                            <div className="relative group">
                               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-all" size={18} />
                               <input 
                                 required
                                 className="w-full bg-slate-50 border-2 border-slate-50 focus:border-[#FF6600]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
                                 placeholder="Phone Number (+91...)"
                                 value={formData.phone}
                                 onChange={e => setFormData({...formData, phone: e.target.value})}
                               />
                            </div>
                            <div className="relative group">
                               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF6600] transition-all" size={18} />
                               <input 
                                 required
                                 className="w-full bg-slate-50 border-2 border-slate-50 focus:border-[#FF6600]/20 focus:bg-white rounded-2xl pl-12 pr-4 py-4 text-sm font-bold placeholder:text-slate-300 transition-all outline-none"
                                 placeholder="Project Location / City"
                                 value={formData.location}
                                 onChange={e => setFormData({...formData, location: e.target.value})}
                               />
                            </div>

                            <button 
                              disabled={isSubmitting}
                              className="w-full bg-[#FF6600] text-white rounded-2xl py-5 font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-100 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                               {isSubmitting ? 'Syncing Lead...' : 'Submit Enquiry'} <ArrowRight size={16} />
                            </button>
                         </form>
                      </motion.div>
                   ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center py-10"
                      >
                         <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8 animate-bounce transition-all">
                            <CheckCircle2 size={48} />
                         </div>
                         <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter">Strategic Lead Logged!</h2>
                         <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">Our Packaging Engineers will contact you shortly</p>
                         
                         <button 
                           onClick={onClose}
                           className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-100 transition-all"
                         >
                            Return to Portal
                         </button>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
