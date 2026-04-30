'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function FeedbackManager() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<any[]>([]);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const res = await fetchAPI('/feedback');
      if (res.success) setFeedback(res.data);
    } catch (error) {
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetchAPI(`/feedback/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.success) {
        setFeedback(feedback.map(f => f._id === id ? res.data : f));
        toast.success(`Feedback ${newStatus}`);
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const res = await fetchAPI(`/feedback/${id}`, { method: 'DELETE' });
      if (res.success) {
        setFeedback(feedback.filter(f => f._id !== id));
        toast.success('Feedback deleted');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div>Loading feedback...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Customer Feedback & Reviews</h1>
        <p style={{ color: '#666' }}>Approve or reject customer reviews before they show up on the homepage.</p>
      </div>

      <div className="admin-card" style={{ padding: '0' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', padding: '2rem' }}>
            {feedback.map(f => (
              <div 
                key={f._id} 
                style={{ 
                  background: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '1.5rem', 
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  opacity: f.status === 'rejected' ? 0.6 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                   <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{f.name}</span>
                   <div style={{ color: '#f6ad55' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < f.rating ? '★' : '☆'}</span>
                      ))}
                   </div>
                </div>
                <p style={{ color: '#4a5568', fontSize: '14px', fontStyle: 'italic', marginBottom: '1.5rem', minHeight: '60px' }}>
                  "{f.message}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7', paddingTop: '1rem' }}>
                   <div 
                    style={{ 
                      fontSize: '10px', 
                      fontWeight: 800, 
                      textTransform: 'uppercase', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      background: f.status === 'approved' ? '#C6F6D5' : f.status === 'rejected' ? '#FED7D7' : '#E2E8F0',
                      color: f.status === 'approved' ? '#22543D' : f.status === 'rejected' ? '#822727' : '#4A5568'
                    }}
                   >
                     {f.status}
                   </div>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      {f.status !== 'approved' && (
                        <button onClick={() => updateStatus(f._id, 'approved')} style={{ padding: '6px 12px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Approve</button>
                      )}
                      {f.status !== 'rejected' && (
                        <button onClick={() => updateStatus(f._id, 'rejected')} style={{ padding: '6px 12px', background: '#718096', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Reject</button>
                      )}
                      <button onClick={() => handleDelete(f._id)} style={{ padding: '6px 12px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
                   </div>
                </div>
              </div>
            ))}
            {feedback.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#666' }}>No feedback submitted yet.</div>
            )}
         </div>
      </div>
    </div>
  );
}
