'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function PageManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const res = await fetchAPI('/pages');
      if (res.success) setPages(res.data);
    } catch (error) {
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      const res = await fetchAPI(`/pages/${id}`, { method: 'DELETE' });
      if (res.success) {
        toast.success('Page deleted');
        setPages(pages.filter(p => p._id !== id));
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Page Manager...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Custom Pages</h1>
          <p className="text-gray-500 mt-1">Manage standalone content like Privacy Policy, Terms, etc.</p>
        </div>
        <Link 
          href="/admin/pages/create"
          className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-100"
        >
          <span className="text-xl">+</span> Add New Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map(page => (
          <div key={page._id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest ${page.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {page.isPublished ? 'Live' : 'Draft'}
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1 truncate">{page.title}</h3>
              <p className="text-xs font-mono text-gray-400">/p/{page.slug}</p>
            </div>

            <p className="text-gray-500 text-sm line-clamp-3 mb-6 min-h-[60px]">
              {page.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>

            <div className="flex gap-3 mt-4 border-t pt-4">
              <Link
                href={`/admin/pages/edit/${page._id}`}
                className="flex-1 bg-gray-50 text-gray-700 text-center py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-all border text-sm"
              >
                ✏️ Edit Content
              </Link>
              <button
                onClick={() => deletePage(page._id)}
                className="bg-red-50 text-red-500 p-2.5 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-100"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 text-center">
            <p className="text-gray-400 font-medium text-lg">No custom pages created yet.</p>
            <Link href="/admin/pages/create" className="text-orange-600 font-bold hover:underline mt-2 inline-block">Create your first page →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
