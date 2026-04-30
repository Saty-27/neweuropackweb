'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Settings, 
  Zap, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ExternalLink,
  Target,
  FileText
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import ServiceForm from '../../../components/admin/ServiceForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceManager() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAPI('/services?admin=true');
      if (res.success) setServices(res.data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetchAPI(`/services/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Service deleted');
        loadServices();
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const toggleVisibility = async (service: any) => {
    try {
      const res = await fetchAPI(`/services/${service._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ visible: !service.visible })
      });
      if (res.success) loadServices();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Service Architect <Zap className="text-[#FF6600]" size={36} />
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
             Industrial Value Proposition Builder <span className="w-8 h-[2px] bg-slate-200" /> {services.length} Active Services
          </p>
        </div>
        
        <button 
          onClick={() => { setSelectedService(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 px-8 py-4 bg-[#FF6600] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
           <Plus size={16} /> Deploy New Service
        </button>
      </div>

      {/* Control Strip */}
      <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input 
             className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6600]/20 transition-all"
             placeholder="Search by service title or technical slug..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* Service Deck */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-[500px] bg-slate-100 rounded-[48px] animate-pulse" />)}
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[64px] border-4 border-dashed border-slate-100">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                <Zap size={48} />
             </div>
             <h3 className="text-xl font-black text-slate-900">No Services Architected</h3>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Deploy your first industrial packaging service guide</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
               {filteredServices.map((service, index) => (
                 <motion.div 
                   key={service._id} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: index * 0.1 }}
                   className="group relative bg-white rounded-[48px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full"
                 >
                    {/* Hero Thumbnail */}
                    <div className="aspect-video relative overflow-hidden m-4 rounded-[36px] bg-slate-100 flex items-center justify-center">
                       {service.hero.image.url ? (
                          <img 
                             src={getImageUrl(service.hero.image.url)} 
                             className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${!service.visible ? 'grayscale opacity-40' : ''}`} 
                             alt={service.title} 
                          />
                       ) : (
                          <Zap size={32} className="text-slate-200" />
                       )}
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
                       
                       {/* Identity Overlay */}
                       <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                          <div className="space-y-1">
                             <span className="px-2 py-1 bg-[#FF6600] text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                                {service.status.toUpperCase()}
                             </span>
                             <h3 className="text-white font-black text-lg truncate pr-4">{service.title}</h3>
                          </div>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => { setSelectedService(service); setIsFormOpen(true); }}
                               className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-[#FF6600] hover:text-white transition-all transform hover:rotate-6"
                             >
                                <Edit3 size={16} />
                             </button>
                             <button 
                               onClick={() => toggleVisibility(service)}
                               className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-900 hover:text-white transition-all transform hover:-rotate-6"
                             >
                                {service.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="px-8 pb-8 flex-1 flex flex-col">
                       <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Slug:</span>
                          <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">/{service.slug}</span>
                       </div>
                       
                       <div className="flex-1 space-y-4 mb-6">
                          <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                             <FileText size={16} className="text-slate-300 shrink-0 mt-1" />
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Narrative Highlight</p>
                                <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">"{service.description.heading || 'No heading defined'}"</p>
                             </div>
                          </div>
                          <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                             <Target size={16} className="text-slate-300 shrink-0 mt-1" />
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">High-Velocity Points</p>
                                <p className="text-xs text-slate-600 font-black tracking-widest">{service.highlights.length} Technical Tags Deployed</p>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <div className="flex items-center gap-2">
                             <a 
                               href={`/service/${service.slug}`} 
                               target="_blank" 
                               className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                             >
                                Live Experience <ExternalLink size={12} />
                             </a>
                          </div>
                          <button onClick={() => handleDelete(service._id)} className="w-8 h-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all">
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <ServiceForm 
           service={selectedService} 
           onClose={() => { setIsFormOpen(false); setSelectedService(null); }} 
           onSave={() => { setIsFormOpen(false); loadServices(); }} 
        />
      )}
    </div>
  );
}
