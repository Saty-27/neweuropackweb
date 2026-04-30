'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Upload, ArrowRight, FileText, AlertCircle } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export default function JobApplyModal({ isOpen, onClose, jobTitle }: JobApplyModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    resume: null as File | null 
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are accepted.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        return;
      }
      setError(null);
      setFileName(file.name);
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      setError('Please upload your resume.');
      return;
    }
    setLoading(true);
    try {
      // Step 1: Upload the Resume
      let resumeUrl = '';
      if (formData.resume) {
        const uploadData = new FormData();
        uploadData.append('file', formData.resume);
        const uploadRes = await fetchAPI('/upload?folder=resumes', {
          method: 'POST',
          body: uploadData
        });
        if (uploadRes.success) {
          resumeUrl = uploadRes.url;
        } else {
          throw new Error(uploadRes.error || 'Resume upload failed');
        }
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Job Application: ${jobTitle || 'General Application'}`,
        message: `Resume Uploaded (Candidate Applied via Careers Portal). File: ${fileName}`,
        company: 'Europack HR',
        attachment: resumeUrl
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
          setFormData({ name: '', email: '', phone: '', resume: null });
          setFileName(null);
        }, 3000);
      } else {
        setError(res.error || 'Failed to submit application');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
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
                <h2 className="text-3xl font-black text-[#1A1F2C] mb-4">Application Sent!</h2>
                <p className="text-slate-500 font-medium">Thank you for choosing Europack. Our HR team will review your profile and contact you if there is a match.</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="w-full md:w-2/5 bg-[#1A1F2C] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6600]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="relative z-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FF6600]/20 text-[#FF6600] text-[10px] font-black uppercase tracking-widest mb-6">Join the Team</div>
                    <h3 className="text-3xl font-black leading-tight mb-4">Initialize Your <span className="text-[#FF6600]">Career.</span></h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                      Applying for: <br />
                      <span className="text-white font-bold">{jobTitle || 'General Application'}</span>
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                        <FileText size={14} className="text-[#FF6600]" /> PDF Format Only
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
                         <AlertCircle size={14} className="text-[#FF6600]" /> Max Size: 5MB
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6600]">Build the Future of Logistics</div>
                </div>
                <div className="w-full md:w-3/5 p-10">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="Your Name" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Personal Email</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#FF6600] outline-none transition-all text-sm font-bold" placeholder="+91 ..." />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resume (PDF)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full px-5 py-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${error ? 'border-red-200 bg-red-50' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-[#FF6600]'}`}
                      >
                         <Upload size={24} className={error ? 'text-red-400' : 'text-slate-400'} />
                         <span className={`text-xs font-bold leading-tight ${error ? 'text-red-500' : 'text-slate-500'}`}>
                            {fileName || 'Click to upload PDF resume'}
                         </span>
                         <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
                      </div>
                      {error && <p className="mt-2 text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1">{error}</p>}
                    </div>

                    <button disabled={loading} type="submit" className="w-full py-5 rounded-2xl bg-[#FF6600] text-white font-black uppercase tracking-widest text-xs hover:bg-[#CC5200] transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-100 active:scale-[0.98]">
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Submit Application <ArrowRight size={16}/></>}
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
