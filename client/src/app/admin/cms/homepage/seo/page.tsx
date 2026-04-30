'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../../../lib/api';

// Reusable Input Field Component matching the exact UI requirement
const FormInput = ({ label, placeholder, value, onChange }: any) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>
      {label}
    </label>
    <input 
      type="text" 
      placeholder={placeholder}
      value={value} 
      onChange={onChange} 
      style={{ 
        width: '100%', 
        padding: '0.8rem', 
        border: '1px solid #CBD5E0', 
        borderRadius: '6px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
      }} 
      onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
      onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
    />
  </div>
);

export default function SEOManager() {
  const [seo, setSeo] = useState<any>({
    title: '',
    description: '',
    keywords: [],
    slug: 'home'
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success) {
        setSeo(res.data.seo || { title: '', description: '', keywords: [], slug: 'home' });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setSeo({ ...seo, [field]: value });
  };

  const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      if (!seo.keywords?.includes(keywordInput.trim())) {
        handleUpdate('keywords', [...(seo.keywords || []), keywordInput.trim()]);
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (kw: string) => {
    handleUpdate('keywords', seo.keywords.filter((k: string) => k !== kw));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchAPI('/homepage', {
        method: 'PUT',
        body: JSON.stringify({ seo })
      });
      if (res.success) alert('Global SEO Settings saved successfully');
    } catch (err) {
      alert('Failed to save SEO config');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading SEO settings...</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Global SEO Configuration</h2>
          <p style={{ color: 'var(--admin-text-muted)', margin: '0.5rem 0 0 0' }}>Manage the meta tags, titles, and SEO settings for the Europack Homepage.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
          {saving ? 'Saving...' : '💾 Save SEO Values'}
        </button>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--admin-primary)', borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem' }}>
          Search Engine Metadata
        </h3>

        <FormInput 
          label="Global Meta Title (Browser Tab & Google Header)" 
          placeholder="e.g. Europack - Premium Wooden Pallets & Packaging" 
          value={seo.title || ''} 
          onChange={(e: any) => handleUpdate('title', e.target.value)} 
        />

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>
            Meta Description (Google Snippet)
          </label>
          <textarea 
            placeholder="Write a compelling description that appears in search results..." 
            rows={4} 
            value={seo.description || ''} 
            onChange={(e) => handleUpdate('description', e.target.value)} 
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
            onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
          />
          <span style={{ fontSize: '0.8rem', color: '#718096', marginTop: '0.3rem', display: 'block' }}>
            Recommended length: 150-160 characters. Current: {seo.description?.length || 0}
          </span>
        </div>

        <div style={{ marginBottom: '1.5rem', background: '#F7FAFC', border: '1px dashed #CBD5E0', padding: '1.5rem', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>
            Target Keywords (Press Enter to add)
          </label>
          
          <input 
            type="text" 
            placeholder="e.g. wooden pallets"
            value={keywordInput} 
            onChange={(e) => setKeywordInput(e.target.value)} 
            onKeyDown={addKeyword}
            style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', outline: 'none', marginBottom: '1rem' }}
          />

          {seo.keywords && seo.keywords.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {seo.keywords.map((kw: string, i: number) => (
                <span key={i} style={{ background: 'var(--admin-primary)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {kw}
                  <button onClick={() => removeKeyword(kw)} style={{ background: 'transparent', border: 'none', color: '#FEB2B2', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}>✕</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <FormInput 
          label="URL Slug override (Advanced)" 
          placeholder="e.g. home" 
          value={seo.slug || 'home'} 
          onChange={(e: any) => handleUpdate('slug', e.target.value)} 
        />
        <p style={{ fontSize: '0.8rem', color: '#A0AEC0', marginTop: '-0.8rem' }}>Default is always '/' or 'home' for the main index page.</p>
        
      </div>
    </div>
  );
}
