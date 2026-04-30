'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchAPI } from '@/lib/api';

const services = [
  "Export Crating", "Vacuum Packing", "Lashing & Securing", 
  "ISPM-15 Wooden Pallets", "Anti-Rust Packaging", "Container Stuffing",
  "Others"
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', requirement: 'Export Crating', otherService: '', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Map form fields to backend expectations
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.requirement === 'Others' ? formData.otherService : formData.requirement,
        message: formData.message
      };

      const res = await fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      if (res.success) {
        toast.success('Technical Requirement Sent!', {
          style: { background: '#1A1F2C', color: '#fff' }
        });
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', requirement: 'Export Crating', otherService: '', message: '' });
      } else {
        toast.error(res.error || 'Failed to submit requirement');
      }
    } catch (err) {
      toast.error('Network error. Please ensure backend is online.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, requirement: service }));
  };

  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Text & Services */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#ff6a00] text-[10px] font-black uppercase tracking-widest mb-6">
                Technical Specifications
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1F2C] tracking-tighter mb-6">
                Request a <span className="text-[#ff6a00]">Quote.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Tell us your specific packaging requirements, load dimensions, and transit route. Our engineers will construct a blueprint within 24 hours.
              </p>
            </div>

            <div className="space-y-6 flex-1">
              <p className="text-sm font-black uppercase tracking-widest text-[#1A1F2C]">Quick Service Select</p>
              <div className="flex flex-wrap gap-3">
                {services.map(service => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                      formData.requirement === service 
                      ? 'bg-[#ff6a00] border-[#ff6a00] text-white shadow-lg shadow-[#ff6a00]/20 scale-105'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-[#ff6a00] hover:text-[#ff6a00]'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
               {/* Decorative border gradient */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff6a00] to-yellow-500" />
               
               <AnimatePresence mode="wait">
                 {success ? (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="flex flex-col items-center justify-center text-center py-20"
                   >
                     <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 relative">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }} 
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle2 size={48} className="text-green-500" />
                        </motion.div>
                        <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-ping opacity-20" />
                     </div>
                     <h3 className="text-3xl font-black text-[#1A1F2C] tracking-tighter mb-4">Blueprint Requested.</h3>
                     <p className="text-slate-500 text-lg mb-10 max-w-sm">Our technical team has received the specifications and will coordinate shortly.</p>
                     <button onClick={() => setSuccess(false)} className="px-8 py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#ff6a00] transition-colors shadow-2xl">
                       Start New Enquiry
                     </button>
                   </motion.div>
                 ) : (
                   <motion.form 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onSubmit={handleSubmit} 
                     className="space-y-12 mt-4"
                   >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                       <InputField 
                          label="Full Name" 
                          name="name" 
                          required 
                          value={formData.name}
                          isFocused={focused === 'name' || formData.name !== ''}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          onChange={(val: string) => setFormData({ ...formData, name: val })}
                       />
                       <InputField 
                          label="Company Name" 
                          name="company" 
                          value={formData.company}
                          isFocused={focused === 'company' || formData.company !== ''}
                          onFocus={() => setFocused('company')}
                          onBlur={() => setFocused(null)}
                          onChange={(val: string) => setFormData({ ...formData, company: val })}
                       />
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                       <InputField 
                          label="Email Address" 
                          name="email" 
                          type="email" 
                          required 
                          value={formData.email}
                          isFocused={focused === 'email' || formData.email !== ''}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          onChange={(val: string) => setFormData({ ...formData, email: val })}
                       />
                       <InputField 
                          label="Phone Number" 
                          name="phone" 
                          type="tel" 
                          required 
                          value={formData.phone}
                          isFocused={focused === 'phone' || formData.phone !== ''}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                          onChange={(val: string) => setFormData({ ...formData, phone: val })}
                       />
                     </div>
                     
                     <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] uppercase font-bold tracking-widest text-[#ff6a00]">Primary Service Type</label>
                        <select 
                          name="requirement"
                          value={formData.requirement}
                          onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                          className="w-full bg-transparent border-b-2 border-slate-200 py-4 outline-none text-[#1A1F2C] font-semibold text-lg cursor-pointer appearance-none hover:border-[#ff6a00] transition-colors"
                        >
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                          <option value="General Enquiry">General Information</option>
                        </select>
                        <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                     </div>

                     <AnimatePresence>
                        {formData.requirement === 'Others' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <InputField 
                              label="Specify Custom Service" 
                              name="otherService" 
                              required 
                              value={formData.otherService}
                              isFocused={focused === 'otherService' || formData.otherService !== ''}
                              onFocus={() => setFocused('otherService')}
                              onBlur={() => setFocused(null)}
                              onChange={(val: string) => setFormData({ ...formData, otherService: val })}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                     <InputField 
                        label="Cargo Specs / Export Destination" 
                        name="message" 
                        required 
                        isTextArea 
                        value={formData.message}
                        isFocused={focused === 'message' || formData.message !== ''}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        onChange={(val: string) => setFormData({ ...formData, message: val })}
                     />

                     <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#1A1F2C] text-white h-16 rounded-2xl flex items-center justify-center gap-4 text-sm font-black uppercase tracking-widest hover:bg-[#ff6a00] transition-all shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 group"
                     >
                        {loading ? (
                          <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Transmitting Details...
                          </>
                        ) : (
                          <>Secure Quote <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                     </button>
                   </motion.form>
                 )}
               </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  required = false, 
  isTextArea = false,
  value,
  isFocused,
  onFocus,
  onBlur,
  onChange
}: any) => {
  return (
    <div className="relative group">
      <label 
        className={`absolute left-0 transition-all duration-300 font-bold uppercase tracking-widest pointer-events-none ${
          isFocused ? '-top-6 text-[10px] text-[#ff6a00]' : 'top-4 text-xs text-slate-400'
        }`}
      >
        {label} {required && '*'}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-full bg-transparent border-b-2 border-slate-200 py-4 outline-none text-[#1A1F2C] font-semibold text-lg hover:border-[#ff6a00]/50 focus:border-[#ff6a00] transition-colors resize-none mb-2"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-full bg-transparent border-b-2 border-slate-200 py-4 outline-none text-[#1A1F2C] font-semibold text-lg hover:border-[#ff6a00]/50 focus:border-[#ff6a00] transition-colors"
        />
      )}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-[#ff6a00] transition-all duration-500 ease-out origin-left ${
          isFocused ? 'scale-x-100' : 'scale-x-0'
      }`} />
    </div>
  );
};
