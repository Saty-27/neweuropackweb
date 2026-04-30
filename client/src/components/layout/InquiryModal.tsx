'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Check, ArrowRight } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', requirement: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        subject: 'Modal Inquiry',
        message: formData.requirement
      };

      const res = await fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => { 
          onClose(); 
          setSuccess(false); 
          setFormData({ name: '', company: '', email: '', phone: '', requirement: '' }); 
        }, 3000);
      } else {
        throw new Error(res.error || 'Form submission failed');
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1F2C]/80 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden my-auto"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-slate-400 hover:text-[#1A1F2C] transition-colors z-[100] md:text-slate-400 text-white md:bg-transparent bg-[#1A1F2C]/50 p-2 rounded-full md:p-0"
            >
              <X size={24}/>
            </button>
            {success ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8 text-green-600">
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-[#1A1F2C] mb-4">Request Received!</h2>
                <p className="text-slate-500 font-medium">Our engineering team will review your requirements and get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 bg-[#1A1F2C] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-6">Expert Analysis</div>
                    <h3 className="text-3xl font-black leading-tight mb-4">Discuss Your <span className="text-[#FF6600]">Project.</span></h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">Get a customized export packaging blueprint for your high-value cargo.</p>
                    <ul className="space-y-4">
                      {['ISPM-15 Certified', 'Port-to-Port Protection', 'Technical Documentation'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                          <Check size={14} className="text-[#FF6600]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6600]">Trusted by 1000+ Leaders</div>
                </div>
                <div className="w-full md:w-3/5 p-10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input name="name" required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                      <input name="company" type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="Your Company" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Company Email</label>
                        <input name="email" required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="email@company.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input name="phone" required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="+91 ..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Project Requirements</label>
                      <textarea name="message" required rows={4} value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold resize-none" placeholder="Dimensions, destination, and cargo type..." />
                    </div>
                    <button disabled={loading} type="submit" className="w-full py-5 rounded-2xl bg-[#FF6600] text-white font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-100 active:scale-[0.98]">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Inquiry <ArrowRight size={16}/></>}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
