'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../../../../../lib/api';
import Link from 'next/link';
import { Save, ArrowLeft, Layers, Image as ImageIcon, Plus, Trash2, Info, Layout, List, Sparkles, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [parents, setParents] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadProduct();
    loadParents();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const res = await fetchAPI(`/products/slug/${slug}`);
      if (res.success && res.data) {
        const rawData = res.data;
        if (!rawData.specifications) rawData.specifications = [{ key: '', value: '' }];
        setData(rawData);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to load product');
    } finally {
      setInitialLoading(false);
    }
  };

  const loadParents = async () => {
    try {
      const res = await fetchAPI('/products');
      if (res.success) {
        setParents(res.data.filter((p: any) => !p.parentProduct && p.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to load potential parent products', err);
    }
  };

  const addSpec = () => setData({ ...data, specifications: [...data.specifications, { key: '', value: '' }] });
  const removeSpec = (idx: number) => setData({ ...data, specifications: data.specifications.filter((_: any, i: number) => i !== idx) });
  const updateSpec = (idx: number, field: string, val: string) => {
    const newSpecs = [...data.specifications];
    newSpecs[idx][field] = val;
    setData({ ...data, specifications: newSpecs });
  };

  const handleGenerateAIImage = async () => {
    setLoading(true);
    try {
      const res = await fetchAPI('/products/generate-ai-image', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `Industrial packaging ${data.title}. Professional photography.`,
          productName: data.title
        })
      });
      if (res.success && res.url) setData({ ...data, image: res.url });
    } catch (error) {
      alert('AI generation offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetchAPI(`/products/${data._id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      if (res.success) {
        router.push('/admin/products');
      } else {
        alert('Failed to update product matrix.');
      }
    } catch (error: any) {
      alert('Error updating product: Ensure backend is online.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="py-32 text-center text-slate-500 font-black uppercase tracking-widest animate-pulse">Accessing Product Core...</div>;
  if (!data) return <div className="py-32 text-center text-red-500 font-black uppercase tracking-widest">Product Data Corrupted or Missing</div>;

  return (
    <div className="pb-32 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Edit: {data.title}</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Modifying Configuration for /{data.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/products/${data.slug}`} target="_blank" className="p-5 bg-white/5 text-slate-400 rounded-2xl hover:text-white transition-all border border-white/10">
             <ExternalLink size={20} />
          </Link>
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className="flex items-center gap-3 px-10 py-5 bg-[#ff6a00] text-white rounded-[24px] text-sm font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl shadow-orange-950/40 active:scale-95 disabled:opacity-50"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3 text-[#ff6a00] mb-2">
               <Info size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Identification</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Product Name</label>
                <input 
                  type="text" 
                  value={data.title} 
                  onChange={(e) => setData({...data, title: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-lg font-bold focus:border-[#ff6a00] outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Short Meta Description</label>
                <textarea 
                  value={data.description} 
                  onChange={(e) => setData({...data, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-[#ff6a00] outline-none transition-all min-h-[100px] resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3 text-[#ff6a00]">
                  <Layout size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Extended Technical Content</span>
               </div>
            </div>
            
            <div className="prose-dark min-h-[400px]">
              <ReactQuill 
                theme="snow" 
                value={data.content || ''} 
                onChange={(val) => setData({...data, content: val})}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              />
            </div>
          </div>

          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-10 shadow-2xl">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3 text-[#ff6a00]">
                  <List size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Technical Specifications Table</span>
               </div>
               <button onClick={addSpec} className="p-2 bg-[#ff6a00]/10 text-[#ff6a00] rounded-xl hover:bg-[#ff6a00] hover:text-white transition-all">
                  <Plus size={16}/>
               </button>
            </div>

            <div className="space-y-4">
               {data.specifications?.map((spec: any, idx: number) => (
                 <div key={idx} className="flex gap-4 items-center">
                    <input 
                      placeholder="Parameter" 
                      value={spec.key} 
                      onChange={(e) => updateSpec(idx, 'key', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-[#ff6a00]"
                    />
                    <input 
                      placeholder="Value" 
                      value={spec.value} 
                      onChange={(e) => updateSpec(idx, 'value', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-[#ff6a00]"
                    />
                    <button onClick={() => removeSpec(idx)} className="p-3 text-slate-700 hover:text-red-500 transition-colors">
                       <Trash2 size={16}/>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-8 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3 text-[#ff6a00]">
               <Layers size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hierarchical Matrix</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Global Category</label>
                <select 
                  value={data.category} 
                  onChange={(e) => setData({...data, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:border-[#ff6a00] outline-none appearance-none cursor-pointer"
                >
                  <option value="Pallet Solutions">Pallet Solutions</option>
                  <option value="Packaging Solutions">Packaging Solutions</option>
                  <option value="Industrial Services">Industrial Services</option>
                  <option value="General">General Cargo</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Parent Solution</label>
                <select 
                  value={data.parentProduct || ''} 
                  onChange={(e) => setData({...data, parentProduct: e.target.value || null})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm font-bold focus:border-[#ff6a00] outline-none appearance-none cursor-pointer"
                >
                  <option value="">No Parent (Main Solution)</option>
                  {parents.map(p => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-8 space-y-8 shadow-2xl">
             <div className="flex items-center gap-3 text-[#ff6a00]">
               <ImageIcon size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Visual Assets</span>
            </div>

            <div className="space-y-6 text-center">
              <div className="aspect-video rounded-2xl bg-slate-900 border border-white/5 overflow-hidden mb-4">
                 <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              </div>
              <input 
                type="text" 
                value={data.image} 
                onChange={(e) => setData({...data, image: e.target.value})} 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-[10px] font-bold focus:border-[#ff6a00] outline-none transition-all mb-4" 
              />
              <button onClick={handleGenerateAIImage} className="w-full p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center gap-3 group hover:bg-orange-500/20 transition-all">
                <Sparkles size={16} className="text-[#ff6a00]" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Re-Generate AI View</span>
              </button>
            </div>
          </div>

          <div className="bg-[#11141d] border border-white/5 rounded-[40px] p-8 space-y-8 shadow-2xl">
             <div className="flex items-center gap-3 text-[#ff6a00]">
               <Layout size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Flags</span>
            </div>

            <div className="space-y-4">
               <div onClick={() => setData({...data, isFeatured: !data.isFeatured})} className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${data.isFeatured ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/10'}`}>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Featured Status</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-all ${data.isFeatured ? 'bg-[#ff6a00]' : 'bg-slate-800'}`}>
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${data.isFeatured ? 'left-5' : 'left-1'}`} />
                  </div>
               </div>

               <div onClick={() => setData({...data, active: !data.active})} className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${data.active ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10'}`}>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Production Visibility</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full relative transition-all ${data.active ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                     <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${data.active ? 'left-5' : 'left-1'}`} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
