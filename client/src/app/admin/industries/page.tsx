'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Zap, 
  Target, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Globe,
  Settings,
  Layout,
  ExternalLink,
  Table,
  List
} from 'lucide-react';
import { fetchAPI } from '../../../lib/api';
import { toast } from 'react-hot-toast';
import IndustryForm from '../../../components/admin/IndustryForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function IndustryManager() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAPI('/industries?admin=true');
      if (res.success) setIndustries(res.data);
    } catch (error) {
      toast.error('Failed to load sector profiles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this sector profile?')) return;
    try {
      const res = await fetchAPI(`/industries/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Sector profile deleted');
        loadIndustries();
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const toggleVisibility = async (industry: any) => {
    try {
      const res = await fetchAPI(`/industries/${industry._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ visible: !industry.visible })
      });
      if (res.success) loadIndustries();
    } catch (error) {
      toast.error('Visibility update failed');
    }
  };

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const filteredIndustries = industries.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             Industry Architect <Globe className="text-[#FF6600]" size={36} />
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
             Sector-Specific Solution Matrix <span className="w-8 h-[2px] bg-slate-200" /> {industries.length} Profiles Deployed
          </p>
        </div>
        
        <button 
          onClick={() => { setSelectedIndustry(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 px-8 py-4 bg-[#FF6600] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all"
        >
           <Plus size={16} /> Architect New Sector
        </button>
      </div>

      {/* Controller Strip */}
      <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
           <input 
             className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6600]/20 transition-all"
             placeholder="Search by industry title or technical slug..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      {/* Industry Deck */}
      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-[400px] bg-slate-100 rounded-[48px] animate-pulse" />)}
          </div>
        ) : industries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[64px] border-4 border-dashed border-slate-100">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                <Globe size={48} />
             </div>
             <h3 className="text-xl font-black text-slate-900">No Industrial Profiles Architected</h3>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Deploy your first sector-specific value proposition</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
               {filteredIndustries.map((ind, index) => (
                 <motion.div 
                   key={ind._id} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ delay: index * 0.1 }}
                   className="group relative bg-white rounded-[48px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full"
                 >
                    {/* Visual Thumbnail */}
                    <div className="aspect-video relative overflow-hidden m-4 rounded-[36px] bg-slate-100 flex items-center justify-center">
                       {ind.image?.url ? (
                          <img 
                             src={getImageUrl(ind.image.url)} 
                             className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${!ind.visible ? 'grayscale opacity-40' : ''}`} 
                             alt={ind.title} 
                          />
                       ) : (
                          <Layout size={32} className="text-slate-200" />
                       )}
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 opacity-60" />
                       
                       <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                          <h3 className="text-white font-black text-xl truncate pr-4 leading-none">{ind.title}</h3>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => { setSelectedIndustry(ind); setIsFormOpen(true); }}
                               className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-[#FF6600] hover:text-white transition-all transform hover:rotate-6"
                             >
                                <Edit3 size={16} />
                             </button>
                             <button 
                               onClick={() => toggleVisibility(ind)}
                               className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-900 hover:text-white transition-all transform hover:-rotate-6"
                             >
                                {ind.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                             </button>
                          </div>
                       </div>
                    </div>

                    {/* Meta Section */}
                    <div className="px-8 pb-8 flex-1 flex flex-col">
                       <div className="flex-1 space-y-4 mb-6">
                           <div className="flex gap-4 items-start bg-slate-50 p-5 rounded-3xl border border-slate-100">
                              <Layout size={18} className="text-[#FF6600] shrink-0 mt-1" />
                              <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                                 {ind.description || 'Provide industry-specific qualitative expertise.'}
                              </p>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-3 pb-2">
                              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                 <List size={16} className="text-slate-300 mb-1" />
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{ind.points?.length || 0} Points</span>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
                                 <Table size={16} className="text-slate-300 mb-1" />
                                 <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{ind.specs?.length || 0} Specs</span>
                              </div>
                           </div>
                       </div>

                       <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Slug: /{ind.slug}</span>
                          <button onClick={() => handleDelete(ind._id)} className="w-8 h-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all">
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

      {/* Architect Modal */}
      {isFormOpen && (
        <IndustryForm 
           industry={selectedIndustry} 
           onClose={() => { setIsFormOpen(false); setSelectedIndustry(null); }} 
           onSave={() => { setIsFormOpen(false); loadIndustries(); }} 
        />
      )}
    </div>
  );
}
