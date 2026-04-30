'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAPI } from '../../../../../lib/api';
import BlogForm from '../../../../../components/admin/BlogForm';
import { toast } from 'react-hot-toast';

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const res = await fetchAPI(`/blogs/${id}`);
      if (res.success) {
        setInitialData(res.blog);
      } else {
        toast.error('Architectural blueprint not found.');
        router.push('/admin/blogs');
      }
    } catch (error) {
      toast.error('Failed to load blueprint.');
      router.push('/admin/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    setSaving(true);
    try {
      const res = await fetchAPI(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast.success('Architecture Updated! Live changes applied.');
        router.push('/admin/blogs');
      } else {
        toast.error(res.error || 'Failed to update architecture.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Architectural Failure.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-pulse text-slate-400 font-black tracking-widest uppercase text-xs">Loading Blueprint...</div>
     </div>
  );

  return (
    <BlogForm initialData={initialData} onSave={handleSave} loading={saving} />
  );
}
