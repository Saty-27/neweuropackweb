'use client';

import { useState } from 'react';
import { fetchAPI } from '../../../lib/api';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Stub: in reality, we'd use FormData for the file upload, but we will send JSON for now
      const res = await fetchAPI('/quotes', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (res.success) {
        setSuccess(true);
        setFormData({ name: '', company: '', email: '', phone: '', productType: '', message: '' });
      } else {
        setError(res.error || 'Failed to submit quote');
      }
    } catch (err) {
      setError((err as Error).message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Quote Request Received</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Thank you for reaching out to Europack. Our sales team has received your inquiry and will get back to you within 24 hours.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-outline">Submit Another Request</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 2rem', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title">Request a <span>Quote</span></h1>
        <p style={{ color: 'var(--text-muted)' }}>Fill out the form below and our sales team will get back to you within 24 hours.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
        {error && (
          <div style={{ padding: '1rem', background: '#FED7D7', color: '#9B2C2C', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Company Name</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Acme Corp" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98200 90775" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }} required />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Product of Interest</label>
          <select name="productType" value={formData.productType} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none', background: 'white' }}>
            <option value="">Select a product type...</option>
            <option value="Wooden Pallets">Wooden Pallets</option>
            <option value="Corrugated Boxes">Corrugated Boxes</option>
            <option value="Custom Packaging Service">Custom Packaging Service</option>
            <option value="Other">Other / Not sure</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Requirements / Dimensions *</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Please detail your quantity, dimensions, or specific requirements..." style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none', resize: 'vertical' }} required></textarea>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--secondary)' }}>Attach File (Optional)</label>
          <div style={{ border: '2px dashed var(--border)', padding: '2rem', textAlign: 'center', borderRadius: '4px', color: 'var(--text-muted)' }}>
             Drag & drop drawings/specs here or <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>browse</span> (PDF, JPG)
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Submitting...' : 'Submit Quote Request'}
        </button>
      </form>
    </div>
  );
}
