'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '../../../../lib/api';
import BlogForm from '../../../../components/admin/BlogForm';
import { toast } from 'react-hot-toast';

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetchAPI('/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (res.success) {
        toast.success('Architecture Published! Story is live/drafted.');
        router.push('/admin/blogs');
      } else {
        toast.error(res.error || 'Failed to publish architecture.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Architectural Failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogForm onSave={handleSave} loading={loading} />
  );
}
