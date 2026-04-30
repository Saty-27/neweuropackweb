'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ArrowRight, BookOpen, Mail, Phone, MessageSquare } from 'lucide-react';

interface BlogComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogComingSoonModal({ isOpen, onClose }: BlogComingSoonModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', requirement: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', phone: '', requirement: '' });
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
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
            className="fixed inset-0 bg-[#1A1F2C]/80 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
          >
            {success ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-8 text-[#FF6600]">
                  <CheckCircle2 size={40} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-[#1A1F2C] mb-4">You're on the list!</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Thank you for your interest in our Technical Insights. We will notify you as soon as our premium packaging guides go live.
                </p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row min-h-full">
                {/* Lateral Branding Area */}
                <div className="w-full md:w-2/5 bg-[#1A1F2C] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-6">Coming Soon</div>
                    <h3 className="text-3xl font-black leading-tight mb-4">Technical <br /><span className="text-[#FF6600]">Insights.</span></h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">Get exclusive access to our upcoming engineering blueprints and export compliance guides.</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                        <BookOpen size={14} className="text-[#FF6600]" /> Expert Knowledge
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                         <MessageSquare size={14} className="text-[#FF6600]" /> Direct Inquiries
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6600]">Knowledge is Protection</div>
                </div>

                {/* Form Area */}
                <div className="w-full md:w-3/5 p-10">
                  <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-[#1A1F2C] transition-colors"><X size={24}/></button>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="Your Name" />
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Personal Email</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="email@company.com" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="+91 ..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Requirement / Topic of Interest</label>
                      <textarea required rows={3} value={formData.requirement} onChange={e => setFormData({ ...formData, requirement: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold resize-none" placeholder="What would you like to learn about?" />
                    </div>
                    <button disabled={loading} type="submit" className="w-full py-5 rounded-2xl bg-[#FF6600] text-white font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-100 active:scale-[0.98]">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Get Early Access <ArrowRight size={16}/></>}
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
