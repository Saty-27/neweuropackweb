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

export default function BannersManager() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<{ [key: number]: string }>({});

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success && res.data?.banners) {
        setBanners(res.data.banners);
        const tabs: any = {};
        res.data.banners.forEach((_: any, i: number) => tabs[i] = 'desktop');
        setActiveTab(tabs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBanner = () => {
    const newIndex = banners.length;
    setBanners([
      ...banners,
      {
        desktopImage: '', tabletImage: '', mobileImage: '',
        imageAlt: '', imageTitle: '',
        heading: '', subheading: '', description: '',
        buttons: [{ text: 'Learn More', link: '/about' }],
        status: true, order: newIndex
      }
    ]);
    setActiveTab({ ...activeTab, [newIndex]: 'desktop' });
  };

  const handleRemoveBanner = (index: number) => {
    const newBanners = [...banners];
    newBanners.splice(index, 1);
    setBanners(newBanners);
  };

  const handleUpdate = (index: number, field: string, value: any) => {
    const newBanners = [...banners];
    newBanners[index][field] = value;
    setBanners(newBanners);
  };

  const handleImageUpload = async (index: number, device: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadFile(e.target.files[0]);
        handleUpdate(index, device, url);
      } catch (err: any) {
        alert(err.message || 'File upload failed');
      }
    }
  };

  const handleSave = async () => {
    // Validation
    const invalid = banners.find(b => !b.desktopImage);
    if (invalid) return alert('Error: All banners MUST have at least a Desktop Image.');

    // Auto-fill missing responsive images with desktop image
    const payload = banners.map(b => ({
      ...b,
      tabletImage: b.tabletImage || b.desktopImage,
      mobileImage: b.mobileImage || b.desktopImage
    }));

    setSaving(true);
    try {
      const res = await fetchAPI('/homepage/banners', { method: 'PUT', body: JSON.stringify({ banners: payload }) });
      if (res.success) {
        setBanners(payload);
        alert('Banners saved successfully');
      } else {
        alert(res.error || 'Failed to save banners');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save banners');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Banners...</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Responsive Banner System</h2>
          <p style={{ color: 'var(--admin-text-muted)', margin: '0.5rem 0 0 0' }}>Upload separate images for Desktop, Tablet, and Mobile to ensure perfect layout.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
          {saving ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>

      {banners.map((banner, index) => {
        const currentTab = activeTab[index] || 'desktop';
        
        return (
          <div key={index} style={{ background: 'white', padding: '2rem', marginBottom: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            
            {/* Header / Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #EDF2F7' }}>
              <h3 style={{ margin: 0, color: 'var(--admin-primary)', fontSize: '1.2rem' }}>Banner Slide #{index + 1}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { if(index > 0) { const nb = [...banners]; [nb[index-1], nb[index]] = [nb[index], nb[index-1]]; setBanners(nb); } }} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #CBD5E0', background: 'white' }}>↑ Reorder Up</button>
                <button onClick={() => { if(index < banners.length - 1) { const nb = [...banners]; [nb[index+1], nb[index]] = [nb[index], nb[index+1]]; setBanners(nb); } }} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #CBD5E0', background: 'white' }}>↓ Reorder Down</button>
                <button onClick={() => handleRemoveBanner(index)} style={{ padding: '0.4rem 0.8rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #FC8181', background: '#FFF5F5', color: '#C53030', marginLeft: '1rem' }}>🗑️ Delete Slide</button>
              </div>
            </div>

            {/* TAB SYSTEM (Desktop/Tablet/Mobile) */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {['desktop', 'tablet', 'mobile'].map((tabStr) => (
                <button 
                  key={tabStr}
                  onClick={() => setActiveTab({ ...activeTab, [index]: tabStr })}
                  style={{
                    padding: '0.8rem 1.5rem',
                    cursor: 'pointer',
                    fontWeight: 600,
                    borderRadius: '8px 8px 0 0',
                    border: 'none',
                    borderBottom: currentTab === tabStr ? '3px solid var(--admin-primary)' : '3px solid transparent',
                    background: currentTab === tabStr ? '#FEF4EB' : 'transparent',
                    color: currentTab === tabStr ? 'var(--admin-primary)' : '#718096',
                    textTransform: 'capitalize'
                  }}
                >
                  {tabStr === 'desktop' ? '🖥️' : tabStr === 'tablet' ? '📟' : '📱'} {tabStr} Background
                </button>
              ))}
            </div>

            {/* ACTIVE TAB CONTENT - IMAGE UPLOAD PREVIEW */}
            <div style={{ padding: '2rem', background: '#F7FAFC', border: '1px dashed #CBD5E0', borderRadius: '0 8px 8px 8px', marginBottom: '2rem', textAlign: 'center' }}>
              {currentTab === 'desktop' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: '#4A5568' }}>Upload Desktop Dimensions (e.g. 1920x1080)</p>
                  {banner.desktopImage ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={`http://localhost:5002/${banner.desktopImage}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                      <button onClick={() => handleUpdate(index, 'desktopImage', '')} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id={`upload-${index}-desktop`} style={{ display: 'none' }} onChange={e => handleImageUpload(index, 'desktopImage', e)} />
                      <label htmlFor={`upload-${index}-desktop`} className="btn-primary" style={{ cursor: 'pointer', padding: '0.6rem 1.5rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
              {currentTab === 'tablet' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: '#4A5568' }}>Upload Tablet Dimensions (e.g. 1024x768)</p>
                  {banner.tabletImage ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={`http://localhost:5002/${banner.tabletImage}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                      <button onClick={() => handleUpdate(index, 'tabletImage', '')} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id={`upload-${index}-tablet`} style={{ display: 'none' }} onChange={e => handleImageUpload(index, 'tabletImage', e)} />
                      <label htmlFor={`upload-${index}-tablet`} className="btn-primary" style={{ cursor: 'pointer', padding: '0.6rem 1.5rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
              {currentTab === 'mobile' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontWeight: 600, color: '#4A5568' }}>Upload Mobile Dimensions (e.g. 480x800)</p>
                  {banner.mobileImage ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={`http://localhost:5002/${banner.mobileImage}`} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                      <button onClick={() => handleUpdate(index, 'mobileImage', '')} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id={`upload-${index}-mobile`} style={{ display: 'none' }} onChange={e => handleImageUpload(index, 'mobileImage', e)} />
                      <label htmlFor={`upload-${index}-mobile`} className="btn-primary" style={{ cursor: 'pointer', padding: '0.6rem 1.5rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* TEXT & SEO INPUTS */}
            <h4 style={{ color: 'var(--admin-sidebar-text)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #EDF2F7' }}>Content & SEO Fields</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <FormInput label="Main Heading" placeholder="e.g. India's Trusted Packaging..." value={banner.heading} onChange={(e: any) => handleUpdate(index, 'heading', e.target.value)} />
                <FormInput label="Subheading" placeholder="e.g. 33+ Years of Experience..." value={banner.subheading} onChange={(e: any) => handleUpdate(index, 'subheading', e.target.value)} />
                
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Paragraph Description</label>
                  <textarea 
                    value={banner.description} 
                    onChange={e => handleUpdate(index, 'description', e.target.value)} 
                    placeholder="Provide additional details..."
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', minHeight: '100px', outline: 'none' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
                    onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
                  />
                </div>
              </div>
              
              <div style={{ background: '#F7FAFC', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <h5 style={{ margin: '0 0 1rem 0', color: '#4A5568' }}>🔍 Image SEO (Alt Text)</h5>
                <FormInput label="Alt Text (For Screen Readers & Google)" placeholder="e.g. Heavy Duty Wooden Pallet Box" value={banner.imageAlt || ''} onChange={(e: any) => handleUpdate(index, 'imageAlt', e.target.value)} />
                <FormInput label="Image Title (Hover text)" placeholder="e.g. Europack Core Solutions" value={banner.imageTitle || ''} onChange={(e: any) => handleUpdate(index, 'imageTitle', e.target.value)} />
                
                <div style={{ marginTop: '2rem' }}>
                  <h5 style={{ margin: '0 0 1rem 0', color: '#4A5568' }}>CTA Button Setup</h5>
                  {banner.buttons && banner.buttons.length > 0 ? (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        <FormInput label="Button Label" placeholder="Get Quote" value={banner.buttons[0].text} onChange={(e: any) => { const nb = [...banners]; nb[index].buttons[0].text = e.target.value; setBanners(nb); }} />
                      </div>
                      <div style={{ flex: 1 }}>
                         <FormInput label="Button URL Target" placeholder="/quote" value={banner.buttons[0].link} onChange={(e: any) => { const nb = [...banners]; nb[index].buttons[0].link = e.target.value; setBanners(nb); }} />
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => { const nb = [...banners]; nb[index].buttons = [{ text: 'Click Here', link: '/' }]; setBanners(nb); }}>+ Add Button</button>
                  )}
                </div>
              </div>
            </div>

          </div>
        )
      })}

      <button onClick={handleAddBanner} style={{ padding: '1.5rem', width: '100%', border: '2px dashed var(--admin-primary)', color: 'var(--admin-primary)', background: '#FEF4EB', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', borderRadius: '12px', transition: 'all 0.2s' }}>
        ➕ Add New Banner Slide
      </button>

    </div>
  );
}
