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

const FormInput = ({ label, placeholder, value, onChange, type = "text" }: any) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>
      {label}
    </label>
    <input 
      type={type} 
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

export default function GlobalSectionManager() {
  const [globalData, setGlobalData] = useState<any>({
    titlePart1: '',
    titlePart2: '',
    titleColor1: '#ffffff',
    titleColor2: '#ff6b00',
    titleFontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    titleFontWeight: '800',
    titleFontStyle: 'normal',
    titleFontFamily: 'inherit',
    description: '',
    buttonText: '',
    buttonLink: '',
    backgroundImage: '',
    videoUrl: '',
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success && res.data?.globalSection) {
        setGlobalData(res.data.globalSection);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setGlobalData({ ...globalData, [field]: value });
  };

  const handleFileUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadFile(e.target.files[0]);
        handleUpdate(field, url);
      } catch (err: any) {
        alert(err.message || 'File upload failed');
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchAPI('/homepage/global-section', {
        method: 'PUT',
        body: JSON.stringify(globalData)
      });
      if (res.success) alert('Global Section saved successfully');
      else alert(res.error || 'Failed to save');
    } catch (err: any) {
      alert(err.message || 'Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Global Section config...</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Global Section (Hero) Manager</h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Manage the high-impact Hero area of the homepage.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem', height: 'fit-content' }}>
          {saving ? 'Saving...' : '💾 Save Hero Data'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* LEFT PANEL: Text Content & Colors */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem', margin: '0 0 1.5rem 0', color: 'var(--admin-primary)' }}>Text & Style Settings</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Title Part 1 (White text)" placeholder="Europack Your Global" value={globalData.titlePart1} onChange={(e: any) => handleUpdate('titlePart1', e.target.value)} />
            <FormInput label="Title Part 2 (Orange text)" placeholder="Packaging Partner" value={globalData.titlePart2} onChange={(e: any) => handleUpdate('titlePart2', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Color Part 1</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input type="color" value={globalData.titleColor1} onChange={(e) => handleUpdate('titleColor1', e.target.value)} style={{ width: '50px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                  <code style={{ background: '#F7FAFC', padding: '0.4rem', borderRadius: '4px' }}>{globalData.titleColor1}</code>
                </div>
             </div>
             <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Color Part 2</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input type="color" value={globalData.titleColor2} onChange={(e) => handleUpdate('titleColor2', e.target.value)} style={{ width: '50px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
                  <code style={{ background: '#F7FAFC', padding: '0.4rem', borderRadius: '4px' }}>{globalData.titleColor2}</code>
                </div>
             </div>
          </div>

          <h4 style={{ margin: '2rem 0 1rem 0', color: '#4A5568', borderTop: '1px solid #EDF2F7', paddingTop: '1.5rem' }}>Font Settings</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Font Size (e.g. 4rem)" placeholder="clamp(2.5rem, 5vw, 4.5rem)" value={globalData.titleFontSize} onChange={(e: any) => handleUpdate('titleFontSize', e.target.value)} />
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Font Weight</label>
              <select 
                value={globalData.titleFontWeight} 
                onChange={e => handleUpdate('titleFontWeight', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem' }}
              >
                <option value="normal">Normal (400)</option>
                <option value="600">Semi-Bold (600)</option>
                <option value="700">Bold (700)</option>
                <option value="800">Extra Bold (800)</option>
                <option value="900">Black (900)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Font Style</label>
              <select 
                value={globalData.titleFontStyle} 
                onChange={e => handleUpdate('titleFontStyle', e.target.value)}
                style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem' }}
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
              </select>
            </div>
            <FormInput label="Font Family (CSS Value)" placeholder="inherit" value={globalData.titleFontFamily} onChange={(e: any) => handleUpdate('titleFontFamily', e.target.value)} />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Description Paragraph</label>
            <textarea 
              rows={4} 
              value={globalData.description} 
              onChange={e => handleUpdate('description', e.target.value)} 
              placeholder="Enter hero description..."
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
              onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormInput label="Button Text" placeholder="Explore Our Global Projects" value={globalData.buttonText} onChange={(e: any) => handleUpdate('buttonText', e.target.value)} />
            <FormInput label="Button Link" placeholder="/products" value={globalData.buttonLink} onChange={(e: any) => handleUpdate('buttonLink', e.target.value)} />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600 }}>
              <input type="checkbox" checked={globalData.isActive} onChange={e => handleUpdate('isActive', e.target.checked)} style={{ width: '18px', height: '18px' }} />
              Active Section
            </label>
          </div>
        </div>

        {/* RIGHT PANEL: Media Uploads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Background Image */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem', margin: '0 0 1.5rem 0', color: '#4A5568' }}>Background Image</h3>
            <div style={{ border: '2px dashed #cbd5e0', padding: '2rem', textAlign: 'center', background: '#F7FAFC', borderRadius: '8px' }}>
              {globalData.backgroundImage ? (
                <div style={{ position: 'relative' }}>
                  <img src={`http://localhost:5002/${globalData.backgroundImage}`} alt="Hero BG" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                  <button onClick={() => handleUpdate('backgroundImage', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
                </div>
              ) : (
                <div>
                  <input type="file" id="hero-bg" style={{ display: 'none' }} onChange={(e) => handleFileUpload('backgroundImage', e)} />
                  <label htmlFor="hero-bg" className="btn-primary" style={{ cursor: 'pointer', padding: '0.8rem 1.5rem' }}>📁 Upload Background</label>
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#718096' }}>Dimensions: ~1920x1080px (optimized)</p>
                </div>
              )}
            </div>
          </div>

          {/* Video / Right Image */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem', margin: '0 0 1.5rem 0', color: '#4A5568' }}>Right Side Media (Video/Globe)</h3>
            <div style={{ border: '2px dashed #cbd5e0', padding: '2rem', textAlign: 'center', background: '#F7FAFC', borderRadius: '8px' }}>
              {globalData.videoUrl ? (
                <div style={{ position: 'relative' }}>
                  {globalData.videoUrl.match(/\.(mp4|webm|ogg)$/) ? (
                    <video src={`http://localhost:5002/${globalData.videoUrl}`} controls style={{ width: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                  ) : (
                    <img src={`http://localhost:5002/${globalData.videoUrl}`} alt="Hero Media" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }} />
                  )}
                  <button onClick={() => handleUpdate('videoUrl', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
                </div>
              ) : (
                <div>
                  <input type="file" id="hero-video" style={{ display: 'none' }} onChange={(e) => handleFileUpload('videoUrl', e)} />
                  <label htmlFor="hero-video" className="btn-primary" style={{ cursor: 'pointer', padding: '0.8rem 1.5rem' }}>📁 Upload Video/Image</label>
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#718096' }}>OR Enter External Video URL</p>
                    <input 
                      type="text" 
                      placeholder="https://..." 
                      value={globalData.videoUrl} 
                      onChange={(e) => handleUpdate('videoUrl', e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* LIVE PREVIEW (Mini) */}
      <div style={{ marginTop: '3rem', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
         <div style={{ background: '#EDF2F7', padding: '0.8rem 1.5rem', fontWeight: 700, fontSize: '0.9rem', color: '#4A5568' }}>Live Configuration Preview</div>
         <div style={{ background: '#000', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
            {globalData.backgroundImage && (
              <img src={`http://localhost:5002/${globalData.backgroundImage}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="Preview" />
            )}
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
               <div>
                  <h1 style={{ 
                    fontSize: globalData.titleFontSize || '2.5rem', 
                    fontWeight: globalData.titleFontWeight || '800',
                    fontStyle: globalData.titleFontStyle || 'normal',
                    fontFamily: globalData.titleFontFamily || 'inherit',
                    lineHeight: 1.1, 
                    margin: '0 0 1.5rem 0' 
                  }}>
                    <span style={{ color: globalData.titleColor1 }}>{globalData.titlePart1 || 'Title Part 1'} </span>
                    <span style={{ color: globalData.titleColor2 }}>{globalData.titlePart2 || 'Title Part 2'}</span>
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', margin: '0 0 2rem 0' }}>{globalData.description || 'Short description will appear here...'}</p>
                  <button style={{ backgroundColor: globalData.titleColor2, color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: '30px', fontWeight: 'bold' }}>
                    {globalData.buttonText || 'Button Text'}
                  </button>
               </div>
               <div style={{ textAlign: 'center' }}>
                  {globalData.videoUrl ? (
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px', color: 'white' }}>[ Media Loaded ]</div>
                  ) : (
                    <div style={{ border: '2px dashed rgba(255,255,255,0.3)', padding: '4rem', borderRadius: '12px', color: 'rgba(255,255,255,0.3)' }}>No Media Uploaded</div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
