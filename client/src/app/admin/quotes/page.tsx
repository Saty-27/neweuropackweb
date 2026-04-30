'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';

interface QuoteStats {
  total: number;
  converted: number;
  conversionRate: number;
}

interface Quote {
  _id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  productType?: string;
  message: string;
  status: string;
  createdAt: string;
  fileUrl?: string;
}

export default function QuotesCRMPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stats, setStats] = useState<QuoteStats>({ total: 0, converted: 0, conversionRate: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const res = await fetchAPI('/quotes');
      if (res.success) {
        setQuotes(res.data);
        if (res.stats) setStats(res.stats);
      }
    } catch (error) {
      console.error('Failed to load quotes', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetchAPI(`/quotes/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      loadQuotes(); // Refresh list to update stats and UI
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Quotes & CRM (Conversion Tracker)</h1>

      {/* Analytics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>Total Quotes</h3>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stats.total}</div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>Converted</h3>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38A169' }}>{stats.converted}</div>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>Conversion Rate</h3>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--admin-primary)' }}>{stats.conversionRate}%</div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-text-muted)' }}>Loading CRM data...</div>
      ) : quotes.length === 0 ? (
        <div style={{ background: 'white', padding: '3rem', textAlign: 'center', borderRadius: '8px' }}>
           No quotes found.
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--admin-bg)', borderBottom: '1px solid var(--admin-border)' }}>
              <tr>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Customer Contact</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Interest</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote._id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <td style={{ padding: '1rem' }}>{new Date(quote.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{quote.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{quote.company || 'N/A'}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{quote.email} | {quote.phone}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--admin-primary)' }}>{quote.productType || 'General'}</span>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: 'var(--admin-text-muted)', maxWidth: '300px' }}>
                      {quote.message}
                    </p>
                    {quote.fileUrl && (
                      <a href={`http://localhost:5002/${quote.fileUrl}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#3182CE' }}>📎 View Attached File</a>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <select 
                      value={quote.status}
                      onChange={(e) => updateStatus(quote._id, e.target.value)}
                      style={{ 
                        padding: '0.5rem', 
                        borderRadius: '4px', 
                        border: '1px solid var(--admin-border)',
                        background: quote.status === 'New' ? '#EBF8FF' 
                          : quote.status === 'In Progress' ? '#FEFCBF' 
                          : quote.status === 'Converted' ? '#C6F6D5' : '#E2E8F0',
                        color: quote.status === 'New' ? '#2B6CB0' 
                          : quote.status === 'In Progress' ? '#B7791F' 
                          : quote.status === 'Converted' ? '#2F855A' : '#4A5568',
                        fontWeight: 'bold',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
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
