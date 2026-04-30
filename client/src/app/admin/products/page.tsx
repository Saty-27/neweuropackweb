'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import Link from 'next/link';
import { Plus, Edit, Trash2, Layers, Filter, Eye, Search, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  _id: string;
  title: string;
  slug: string;
  image: string;
  active: boolean;
  order: number;
  category: string;
  parentProduct: string | null;
  isFeatured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetchAPI('/products');
      if (res.success) setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This will remove all its data.')) return;
    try {
      await fetchAPI(`/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch {
      alert('Failed to delete product.');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(c => c && c !== 'All')))];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Product Ecosystem</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage 23 Main Solutions & 123 Sub-Products</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
           >
             {viewMode === 'grid' ? <List size={20}/> : <LayoutGrid size={20}/>}
           </button>
           <Link href="/admin/products/create" className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#ff6a00] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-950/20">
             <Plus size={18} /> New Product
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search products, materials, or slugs..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-orange-500 outline-none transition-all"
              />
           </div>
           <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => setFilter(c)}
                  className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${filter === c ? 'bg-[#ff6a00] text-white shadow-lg' : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/10'}`}
                >
                  {c}
                </button>
              ))}
           </div>
        </div>

        <div className="md:col-span-12">
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center gap-4 text-slate-500">
               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Product Matrix...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white/5 border border-white/10 rounded-[32px]">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                  <Plus size={40} />
               </div>
               <h3 className="text-xl font-black text-white mb-2">No Matching Products</h3>
               <p className="text-slate-500 text-sm mb-8">Try adjusting your filters or search query.</p>
               <button onClick={() => {setFilter('All'); setSearch('');}} className="px-8 py-3 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-white/5">Clear All Filters</button>
            </div>
          ) : viewMode === 'table' ? (
            <div className="bg-[#11141d] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Identity & Hierarchy</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Status</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-12 rounded-xl bg-slate-900 border border-white/5 overflow-hidden flex-shrink-0 relative">
                             {p.image ? (
                               <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center text-slate-800"><Plus size={20}/></div>
                             )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-black text-sm tracking-tight">{p.title}</span>
                              {p.isFeatured && <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-[#ff6a00] text-[8px] font-black uppercase tracking-widest border border-orange-500/20">Featured</span>}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold text-slate-600">/{p.slug}</span>
                              {p.parentProduct && (
                                <div className="flex items-center gap-1 text-[10px] font-black text-[#ff6a00] uppercase tracking-widest">
                                  <Layers size={10} /> Sub-Product
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-widest">{p.category}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-center">
                          {p.active ? (
                            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Draft</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3">
                          <Link href={`/products/${p.slug}`} target="_blank" className="p-3 bg-white/5 text-slate-500 hover:text-white rounded-xl transition-all">
                             <Eye size={16} />
                          </Link>
                          <Link href={`/admin/products/edit/${p.slug}`} className="p-3 bg-white/5 text-slate-500 hover:text-[#ff6a00] rounded-xl transition-all">
                             <Edit size={16} />
                          </Link>
                          <button onClick={() => handleDelete(p._id)} className="p-3 bg-white/5 text-slate-500 hover:text-red-500 rounded-xl transition-all">
                             <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {filteredProducts.map((p) => (
                 <motion.div 
                  key={p._id}
                  layout
                  className="bg-[#11141d] border border-white/5 rounded-[32px] overflow-hidden group hover:border-orange-500/30 transition-all"
                 >
                   <div className="aspect-video relative overflow-hidden bg-slate-900">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] to-transparent opacity-60" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${p.active ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'}`}>
                          {p.active ? 'Live' : 'Draft'}
                        </span>
                      </div>
                   </div>
                   <div className="p-6">
                      <p className="text-[10px] font-black text-[#ff6a00] uppercase tracking-widest mb-2">{p.category}</p>
                      <h3 className="text-white font-black text-lg tracking-tight mb-4 group-hover:text-[#ff6a00] transition-colors">{p.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                         <div className="flex gap-2">
                            <Link href={`/admin/products/edit/${p.slug}`} className="p-2 text-slate-500 hover:text-white transition-colors"><Edit size={16}/></Link>
                            <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                         </div>
                         <Link href={`/products/${p.slug}`} target="_blank" className="p-2 text-slate-500 hover:text-orange-500 transition-colors"><Eye size={16}/></Link>
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
