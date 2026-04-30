'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, User, MessageSquare, Quote } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', rating: 5, message: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadApprovedFeedback();
  }, []);

  const loadApprovedFeedback = async () => {
    try {
      const res = await fetch('http://localhost:5002/api/feedback/approved');
      const data = await res.json();
      if (data.success) setFeedbacks(data.data);
    } catch (error) {
      console.error('Failed to load feedback');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5002/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success('Thank you! Your feedback is under review.');
        setFormData({ name: '', rating: 5, message: '' });
        setShowForm(false);
      } else {
        toast.error('Failed to submit feedback.');
      }
    } catch (error) {
      toast.error('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 uppercase">
              Customer <span className="text-orange-600">Feedback</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2">What our customers say about Europack experience.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
          >
            {showForm ? 'Close Form' : 'Share Your Experience'}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-orange-100 max-w-2xl mx-auto">
                <h3 className="text-xl font-black mb-8 flex items-center gap-2">
                   <MessageSquare className="text-orange-600" /> Write a Review
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium text-sm"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase block mb-2">Rating</label>
                    <div className="flex gap-2">
                       {[1,2,3,4,5].map(star => (
                         <button 
                          key={star}
                          type="button"
                          onClick={() => setFormData({...formData, rating: star})}
                          className={`p-2 rounded-lg transition-all ${formData.rating >= star ? 'text-orange-600 scale-110' : 'text-gray-300'}`}
                         >
                           <Star size={24} fill={formData.rating >= star ? 'currentColor' : 'none'} />
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase">Your Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium text-sm resize-none"
                      placeholder="How was your experience with Europack?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-600/30 hover:bg-orange-700 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? 'Submitting...' : <><Send size={18} /> Submit Review</>}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {feedbacks.map((f, i) => (
             <motion.div 
               key={f._id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 relative group"
             >
               <Quote className="absolute top-6 right-6 text-orange-600/10 group-hover:text-orange-600/20 transition-all" size={60} />
               <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} className={idx < f.rating ? 'text-orange-600' : 'text-gray-200'} fill={idx < f.rating ? 'currentColor' : 'none'} />
                  ))}
               </div>
               <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium italic relative z-10">
                 "{f.message}"
               </p>
               <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                  <div className="w-10 h-10 bg-orange-600/10 rounded-full flex items-center justify-center text-orange-600">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{f.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Customer</p>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

        {feedbacks.length === 0 && !showForm && (
           <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
             <Star size={48} className="mx-auto text-gray-200 mb-4" />
             <p className="text-gray-400 font-bold">No feedback to display yet. Be the first to share!</p>
           </div>
        )}
      </div>
    </section>
  );
}
