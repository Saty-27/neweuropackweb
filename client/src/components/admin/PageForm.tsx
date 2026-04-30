'use client';
// Fixed react-quill to react-quill-new for React 19 compatibility

import React, { useState, useEffect, use } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function PageForm({ params }: { params?: any }) {
  const router = useRouter();
  const pageId = params ? (use(params) as any).id : null;
  const isEdit = !!pageId;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    isPublished: true
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadPage();
    }
  }, [pageId]);

  const loadPage = async () => {
    try {
      const res = await fetchAPI(`/pages/${pageId}`);
      if (res.success) setFormData(res.data);
    } catch (error) {
      toast.error('Failed to load page');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isEdit ? `/pages/${pageId}` : '/pages';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetchAPI(url, {
        method,
        body: JSON.stringify(formData)
      });
      if (res.success) {
        toast.success(isEdit ? 'Page updated!' : 'Page created!');
        router.push('/admin/pages');
      }
    } catch (error: any) {
      toast.error(error.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading form...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? '✏️ Edit Custom Page' : '✨ Create New Page'}</h1>
        <p className="text-gray-500 mt-1">Design your custom page content and SEO settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Page Title</label>
              <input 
                type="text" 
                required
                value={formData.title} 
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-4 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                placeholder="e.g. Privacy Policy"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
              <div className="flex items-center">
                <span className="bg-gray-100 border border-r-0 rounded-l-xl px-4 py-4 text-gray-500 text-sm">/p/</span>
                <input 
                  type="text" 
                  required
                  value={formData.slug} 
                  onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full p-4 border rounded-r-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="privacy-policy"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Page Content</label>
            <div className="min-h-[400px]">
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={(content) => setFormData({ ...formData, content })}
                style={{ height: '350px' }}
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">🔍 SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
              <input 
                type="text" 
                value={formData.seoTitle} 
                onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
              <textarea 
                value={formData.seoDescription} 
                onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                rows={3}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border">
              <input 
                type="checkbox" 
                checked={formData.isPublished}
                onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-5 h-5 accent-orange-600"
                id="isPublished"
              />
              <label htmlFor="isPublished" className="font-bold cursor-pointer">Publish this page (Make live immediately)</label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center pt-8">
          <button 
            type="submit" 
            disabled={saving}
            className="flex-1 bg-orange-600 text-white p-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : (isEdit ? '💾 Update Page' : '🚀 Create Page')}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/admin/pages')}
            className="px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
