'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function SubmissionsManager() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const res = await fetchAPI('/contact');
      if (res.success) setSubmissions(res.data);
    } catch (error) {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const res = await fetchAPI(`/contact/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.success) {
        setSubmissions(submissions.map(s => s._id === id ? res.data : s));
        toast.success('Status updated');
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetchAPI(`/contact/${id}`, { method: 'DELETE' });
      if (res.success) {
        setSubmissions(submissions.filter(s => s._id !== id));
        toast.success('Lead deleted');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div>Loading submissions...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Contact Form Submissions (Leads)</h1>
        <p style={{ color: '#666' }}>Manage and track all customer inquiries from your website.</p>
      </div>

      <div className="admin-card" style={{ overflowX: 'auto' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Email/Phone</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Company/Subject</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Message</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Attachment</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid #edf2f7' }}>
                <td style={{ padding: '1rem', fontSize: '13px' }}>{new Date(s.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '1rem', fontSize: '13px' }}>
                  <div>{s.email}</div>
                  <div style={{ color: '#666' }}>{s.phone}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '13px' }}>
                  <div style={{ fontWeight: 600 }}>{s.subject}</div>
                  <div style={{ color: '#718096' }}>{s.company || 'N/A'}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '12px', maxWidth: '300px' }}>
                   {s.message}
                </td>
                <td style={{ padding: '1rem' }}>
                  {s.attachment ? (
                    <a 
                      href={`http://localhost:5002/${s.attachment}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px', 
                        background: '#ff6600', 
                        color: 'white', 
                        borderRadius: '8px', 
                        fontSize: '10px',
                        fontWeight: 900,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        boxShadow: '0 4px 12px rgba(255,102,0,0.2)'
                      }}
                    >
                      View Resume
                    </a>
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#a0aec0', textTransform: 'uppercase' }}>No Attachment</span>
                  )}
                </td>
                <td style={{ padding: '1rem' }}>
                  <button 
                    onClick={() => toggleStatus(s._id, s.status)}
                    style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      border: 'none',
                      background: s.status === 'active' ? '#C6F6D5' : '#FED7D7',
                      color: s.status === 'active' ? '#22543D' : '#822727'
                    }}
                  >
                    {s.status}
                  </button>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => handleDelete(s._id)} style={{ padding: '4px 8px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>Delete</button>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>No submissions found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
