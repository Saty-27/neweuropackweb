'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import { useRouter } from 'next/navigation';

const PAGES = [
  'home', 'about', 'services', 'contact', 'blog', 'products',
  'case-study', 'videos', 'gallery', 'careers', 'clients', 'testimonials', 'team'
];

interface FAQFormProps {
  initialData?: any;
  faqId?: string;
}

export default function FAQForm({ initialData, faqId }: FAQFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    pages: [] as string[],
    isActive: true,
    order: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        question: initialData.question || '',
        answer: initialData.answer || '',
        pages: initialData.pages || [],
        isActive: initialData.isActive ?? true,
        order: initialData.order || 0
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pages.length === 0) return alert('Please assign at least one page.');
    
    setLoading(true);
    try {
      const url = faqId ? `/faqs/${faqId}` : '/faqs';
      const method = faqId ? 'PUT' : 'POST';
      const res = await fetchAPI(url, {
        method,
        body: JSON.stringify(formData)
      });
      
      if (res.success) {
        alert('FAQ saved successfully');
        router.push('/admin/faqs');
      } else {
        alert(res.error || 'Failed to save FAQ');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const togglePage = (page: string) => {
    const pages = [...formData.pages];
    const index = pages.indexOf(page);
    if (index > -1) pages.splice(index, 1);
    else pages.push(page);
    setFormData({ ...formData, pages });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Question</label>
        <input 
          type="text" 
          required 
          value={formData.question} 
          onChange={e => setFormData({ ...formData, question: e.target.value })} 
          style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Answer (Rich Text / Markdown)</label>
        <textarea 
          required 
          rows={6}
          value={formData.answer} 
          onChange={e => setFormData({ ...formData, answer: e.target.value })} 
          style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Assign to Pages</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', border: '1px solid #CBD5E0', padding: '1rem', borderRadius: '6px' }}>
          {PAGES.map(page => (
            <button
              key={page}
              type="button"
              onClick={() => togglePage(page)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                border: '1px solid',
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: formData.pages.includes(page) ? 'var(--admin-primary)' : 'white',
                color: formData.pages.includes(page) ? 'white' : '#4A5568',
                borderColor: formData.pages.includes(page) ? 'var(--admin-primary)' : '#CBD5E0',
                textTransform: 'capitalize'
              }}
            >
              {page.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
         <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Display Order</label>
            <input 
              type="number" 
              value={formData.order} 
              onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} 
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px' }}
            />
         </div>
         <div style={{ alignSelf: 'center', marginTop: '1.2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600 }}>
              <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({ ...formData, isActive: e.target.checked })} style={{ width: '18px', height: '18px' }} />
              Active (Visible on Frontend)
            </label>
         </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.8rem 2.5rem', borderRadius: '6px' }}>
          {loading ? 'Saving...' : '💾 Save FAQ'}
        </button>
        <button type="button" onClick={() => router.push('/admin/faqs')} style={{ padding: '0.8rem 2.5rem', borderRadius: '6px', background: '#EDF2F7', border: 'none', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
