'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';
import Link from 'next/link';

export default function FAQDashboard() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const res = await fetchAPI('/faqs');
      if (res.success) setFaqs(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetchAPI(`/faqs/${id}`, { method: 'DELETE' });
      if (res.success) loadFAQs();
    } catch (e) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading FAQs...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Advanced FAQ Manager</h1>
          <p style={{ color: 'var(--admin-text-muted)', marginTop: '0.5rem' }}>Full CRUD with per-page dynamic UI switching.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/faqs/settings/home" className="btn-outline" style={{ padding: '0.8rem 1.5rem', borderRadius: '6px' }}>
            ⚙️ Page Settings
          </Link>
          <Link href="/admin/faqs/create" className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '6px' }}>
            + Create New FAQ
          </Link>
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F7FAFC', borderBottom: '1px solid #EDF2F7', textAlign: 'left' }}>
              <th style={{ padding: '1rem', color: '#4A5568' }}>Question</th>
              <th style={{ padding: '1rem', color: '#4A5568' }}>Assigned Pages</th>
              <th style={{ padding: '1rem', color: '#4A5568' }}>Status</th>
              <th style={{ padding: '1rem', color: '#4A5568' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#718096' }}>No FAQs found. Create your first one above!</td></tr>
            ) : (
              faqs.map((faq) => (
                <tr key={faq._id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{faq.question}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {faq.pages.map((p: string) => (
                        <span key={p} style={{ background: '#EBF4FF', color: '#2B6CB0', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', textTransform: 'capitalize' }}>{p}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: faq.isActive ? '#38A169' : '#E53E3E', fontSize: '0.9rem', fontWeight: 700 }}>
                      {faq.isActive ? '● Active' : '○ Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link href={`/admin/faqs/edit/${faq._id}`} style={{ color: 'var(--admin-primary)', textDecoration: 'none' }}>Edit</Link>
                      <button onClick={() => handleDelete(faq._id)} style={{ color: '#E53E3E', background: 'transparent', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
