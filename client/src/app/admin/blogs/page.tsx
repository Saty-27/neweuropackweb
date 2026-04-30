'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, TrendingUp, Calendar, User, Tag } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  author: string;
  analytics: {
    views: number;
  };
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await fetchAPI('/blogs?sort=-createdAt');
      if (res.success) setBlogs(res.blogs);
    } catch (error) {
      console.error('Error fetching blogs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;
    try {
      await fetchAPI(`/blogs/${id}`, { method: 'DELETE' });
      loadBlogs();
    } catch {
      alert('Failed to delete blog.');
    }
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Blog Architect</h1>
          <p className="text-slate-500 font-medium">Manage your high-performance content and SEO guides</p>
        </div>
        <Link href="/admin/blogs/create" className="admin-btn-primary flex items-center gap-2 no-underline">
          <Plus size={18} /> Compose New Story
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <div className="animate-pulse font-bold tracking-widest uppercase text-xs">Loading Architect...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="admin-card py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Plus size={32} />
          </div>
          <p className="text-slate-500 text-lg font-bold mb-6">Your blog is currently empty.</p>
          <Link href="/admin/blogs/create" className="admin-btn-outline no-underline">
            Write Your First Article
          </Link>
        </div>
      ) : (
        <div className="admin-card p-0 overflow-hidden border-slate-100 shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/50 border-bottom border-slate-100">
              <tr>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Story Details</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category & SEO</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {blogs.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                       <span className="font-bold text-slate-900 group-hover:text-[#FF6600] transition-colors">{b.title}</span>
                       <span className="text-[11px] text-slate-400 font-medium">/{b.slug}</span>
                       <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                             <Calendar size={12} /> {new Date(b.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                             <User size={12} /> {b.author}
                          </span>
                       </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit">
                         <Tag size={10} /> {b.category}
                       </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                       <div className="flex items-center gap-1.5 text-emerald-600 font-black text-sm">
                          <TrendingUp size={14} /> {b.analytics.views || 0}
                       </div>
                       <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Total Engagements</span>
                    </div>
                  </td>
                  <td className="p-5">
                     <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                       b.status === 'published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                     }`}>
                       {b.status}
                     </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link 
                        href={`/admin/blogs/edit/${b._id}`}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#FF6600] hover:border-[#FF6600] hover:shadow-lg hover:shadow-orange-100 transition-all no-underline"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(b._id)} 
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-300 hover:text-red-500 hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
