'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../../../lib/api';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const token = localStorage.getItem('adminToken');
  const res = await fetch('http://localhost:5002/api/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData
  });
  
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Upload failed');
  return data.url;
};

// Reusable Input Field Component matching the exact UI requirement
const FormInput = ({ label, placeholder, value, onChange }: any) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.85rem' }}>
      {label}
    </label>
    <input 
      type="text" 
      placeholder={placeholder}
      value={value} 
      onChange={onChange} 
      style={{ 
        width: '100%', 
        padding: '0.6rem 0.8rem', 
        border: '1px solid #CBD5E0', 
        borderRadius: '6px',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s'
      }} 
      onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
      onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
    />
  </div>
);

export default function CompaniesManager() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success && res.data?.companyLogos) {
        setCompanies(res.data.companyLogos);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = () => {
    setCompanies([
      ...companies,
      { name: '', logo: '', logoAlt: '', logoTitle: '', link: '', status: true, order: companies.length }
    ]);
  };

  const handleUpdate = (index: number, field: string, value: any) => {
    const newComps = [...companies];
    newComps[index][field] = value;
    setCompanies(newComps);
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadFile(e.target.files[0]);
        handleUpdate(index, 'logo', url);
      } catch (err: any) {
        alert(err.message || 'File upload failed');
      }
    }
  };

  const handleSave = async () => {
    const invalid = companies.find(c => !c.name || !c.logo);
    if (invalid) return alert('Error: All partners MUST have a Company Name and Logo uploaded.');

    setSaving(true);
    try {
      const res = await fetchAPI('/homepage/companies', {
        method: 'PUT',
        body: JSON.stringify({ companies })
      });
      if (res.success) alert('Company Logos saved successfully');
      else alert(res.error || 'Failed to save logos');
    } catch (err: any) {
      alert(err.message || 'Failed to save logos');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Companies...</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Company Logo Carousel</h2>
          <p style={{ color: 'var(--admin-text-muted)', margin: '0.5rem 0 0 0' }}>Manage the trusted partners scrolling banner.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
          {saving ? 'Saving...' : '💾 Save All Logos'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {companies.map((company, index) => (
          <div key={index} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative' }}>
            
            <button 
              onClick={() => {
                const newComps = [...companies];
                newComps.splice(index, 1);
                setCompanies(newComps);
              }}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#FED7D7', color: '#C53030', border: 'none', borderRadius: '4px', padding: '0.4rem 0.6rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕ Remove
            </button>

            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--admin-primary)', fontSize: '1.1rem' }}>Partner #{index + 1}</h3>

            {/* Logo Uploader / Preview */}
            <div style={{ height: '140px', background: '#F7FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '2px dashed #CBD5E0', borderRadius: '8px', position: 'relative' }}>
              {company.logo ? (
                 <>
                   <img src={`http://localhost:5002/${company.logo}`} alt={company.name} style={{ maxWidth: '90%', maxHeight: '110px', objectFit: 'contain' }} />
                   <button onClick={() => handleUpdate(index, 'logo', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'black', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
                 </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <input type="file" id={`logo-${index}`} style={{ display: 'none' }} onChange={(e) => handleImageUpload(index, e)} />
                  <label htmlFor={`logo-${index}`} className="btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>📁 Upload Logo</label>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#A0AEC0' }}>Transparent PNG recommended</p>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #EDF2F7', paddingTop: '1rem' }}>
              <FormInput label="Company Name" placeholder="e.g. Acme Corp" value={company.name} onChange={(e: any) => handleUpdate(index, 'name', e.target.value)} />
              <FormInput label="Website Link (Optional)" placeholder="https://..." value={company.link} onChange={(e: any) => handleUpdate(index, 'link', e.target.value)} />
              
              <div style={{ background: '#F7FAFC', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.8rem 0', color: '#4A5568', fontSize: '0.9rem' }}>🔍 Image SEO Details</h4>
                <FormInput label="Alt Text" placeholder="e.g. Acme Corp Logo" value={company.logoAlt || ''} onChange={(e: any) => handleUpdate(index, 'logoAlt', e.target.value)} />
                <FormInput label="Image Title (Hover text)" placeholder="e.g. Trusted Partner Acme" value={company.logoTitle || ''} onChange={(e: any) => handleUpdate(index, 'logoTitle', e.target.value)} />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, marginTop: '1rem', cursor: 'pointer', color: company.status ? '#22543D' : '#718096' }}>
                <input type="checkbox" checked={company.status} onChange={e => handleUpdate(index, 'status', e.target.checked)} style={{ width: '18px', height: '18px' }} /> 
                {company.status ? '✅ Active on Live Site' : '❌ Hidden on Live Site'}
              </label>
            </div>
          </div>
        ))}
        
        <div 
          onClick={handleAddCompany}
          style={{ border: '2px dashed var(--admin-primary)', borderRadius: '12px', background: '#FEF4EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px', cursor: 'pointer', color: 'var(--admin-primary)', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.2s' }}>
          <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>➕</span>
          Add New Partner Logo
        </div>
      </div>
    </div>
  );
}
