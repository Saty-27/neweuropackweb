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

export default function WelcomeManager() {
  const [welcome, setWelcome] = useState<any>({
    tagline: '',
    backgroundDesktopImage: '',
    backgroundTabletImage: '',
    backgroundMobileImage: '',
    backgroundAlt: '',
    heading: '',
    description: '',
    featureCards: [],
    counterCards: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeBgTab, setActiveBgTab] = useState('desktop');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success && res.data?.welcomeSection) {
        setWelcome(res.data.welcomeSection);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setWelcome({ ...welcome, [field]: value });
  };

  const handleImageUpload = async (device: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadFile(e.target.files[0]);
        handleUpdate(device, url);
      } catch (err: any) {
        alert(err.message || 'File upload failed');
      }
    }
  };

  const handleCardUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await uploadFile(e.target.files[0]);
        const updatedCards = [...welcome.featureCards];
        updatedCards[index].icon = url;
        handleUpdate('featureCards', updatedCards);
      } catch (err: any) {
        alert(err.message || 'File upload failed');
      }
    }
  };

  const updateCard = (type: 'featureCards' | 'counterCards', index: number, field: string, value: string) => {
    const arr = [...welcome[type]];
    arr[index][field] = value;
    handleUpdate(type, arr);
  };

  const addCard = (type: 'featureCards' | 'counterCards') => {
    if (type === 'featureCards' && welcome.featureCards.length >= 3) {
      return alert('Maximum of 3 feature cards allowed by design structure.');
    }
    if (type === 'counterCards' && welcome.counterCards.length >= 4) {
      return alert('Maximum of 4 counter cards allowed by design structure.');
    }

    const newItem = type === 'featureCards' 
      ? { icon: '', iconAlt: '', title: '', description: '' } 
      : { number: '', label: '', icon: 'users' };

    handleUpdate(type, [...welcome[type], newItem]);
  };

  const removeCard = (type: 'featureCards' | 'counterCards', index: number) => {
    const arr = [...welcome[type]];
    arr.splice(index, 1);
    handleUpdate(type, arr);
  };

  const handleSave = async () => {
    const invalidFeature = welcome.featureCards.find((c: any) => !c.icon || !c.title || !c.description);
    if (invalidFeature) return alert('Error: All Feature Cards MUST have an Icon uploaded, a Title, and a Description.');

    const invalidCounter = welcome.counterCards.find((c: any) => !c.number || !c.label);
    if (invalidCounter) return alert('Error: All Counter Cards MUST have a Number and Label.');

    setSaving(true);
    try {
      const res = await fetchAPI('/homepage/welcome', {
        method: 'PUT',
        body: JSON.stringify(welcome)
      });
      if (res.success) alert('Welcome Section saved successfully');
      else alert(res.error || 'Failed to save');
    } catch (err: any) {
      alert(err.message || 'Failed to save welcome section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Welcome config...</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Welcome Section Manager</h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>Strict format component locking logic to exact sizing constraints.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem', height: 'fit-content' }}>
          {saving ? 'Saving...' : '💾 Save Block Data'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 2fr', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* LEFT PANEL: Global Theme & SEO */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', height: 'fit-content' }}>
           <h3 style={{ borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem', margin: '0 0 1.5rem 0', color: 'var(--admin-primary)' }}>Global Settings & Background</h3>
           
           {/* Background Tabs */}
           <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {['desktop', 'tablet', 'mobile'].map((tabStr) => (
                <button 
                  key={tabStr}
                  onClick={() => setActiveBgTab(tabStr)}
                  style={{
                    flex: 1, padding: '0.6rem', cursor: 'pointer', fontWeight: 600, borderRadius: '6px',
                    border: '1px solid', color: activeBgTab === tabStr ? 'var(--admin-primary)' : '#718096',
                    borderColor: activeBgTab === tabStr ? 'var(--admin-primary)' : '#CBD5E0',
                    background: activeBgTab === tabStr ? '#FEF4EB' : 'white', textTransform: 'capitalize', fontSize: '0.85rem'
                  }}
                >
                  {tabStr} BG
                </button>
              ))}
           </div>

           {/* Active BG Tab Content */}
           <div style={{ border: '1px dashed #cbd5e0', padding: '1.5rem', textAlign: 'center', background: '#F7FAFC', borderRadius: '8px', marginBottom: '1.5rem' }}>
              {activeBgTab === 'desktop' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#718096' }}>Dimensions: ~1443x735px</p>
                  {welcome.backgroundDesktopImage ? (
                    <div style={{ position: 'relative' }}>
                      <img src={`http://localhost:5002/${welcome.backgroundDesktopImage}`} alt="BG" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button onClick={() => handleUpdate('backgroundDesktopImage', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id="bg-desktop" style={{ display: 'none' }} onChange={(e) => handleImageUpload('backgroundDesktopImage', e)} />
                      <label htmlFor="bg-desktop" className="btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
              {activeBgTab === 'tablet' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#718096' }}>Dimensions: ~1024x735px</p>
                  {welcome.backgroundTabletImage ? (
                    <div style={{ position: 'relative' }}>
                      <img src={`http://localhost:5002/${welcome.backgroundTabletImage}`} alt="BG" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button onClick={() => handleUpdate('backgroundTabletImage', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id="bg-tablet" style={{ display: 'none' }} onChange={(e) => handleImageUpload('backgroundTabletImage', e)} />
                      <label htmlFor="bg-tablet" className="btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
              {activeBgTab === 'mobile' && (
                <>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#718096' }}>Dimensions: ~480x735px</p>
                  {welcome.backgroundMobileImage ? (
                    <div style={{ position: 'relative' }}>
                      <img src={`http://localhost:5002/${welcome.backgroundMobileImage}`} alt="BG" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} />
                      <button onClick={() => handleUpdate('backgroundMobileImage', '')} style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id="bg-mobile" style={{ display: 'none' }} onChange={(e) => handleImageUpload('backgroundMobileImage', e)} />
                      <label htmlFor="bg-mobile" className="btn-primary" style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>📁 Choose File</label>
                    </div>
                  )}
                </>
              )}
           </div>

           <FormInput label="Background Image Alt Text (SEO)" placeholder="e.g. Europack Factory Floor" value={welcome.backgroundAlt || ''} onChange={(e: any) => handleUpdate('backgroundAlt', e.target.value)} />

           <div style={{ background: '#F7FAFC', border: '1px solid #E2E8F0', padding: '1.2rem', borderRadius: '8px', marginTop: '2rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#4A5568' }}>Main Title / Description</h4>
              <FormInput label="Tagline (Small Uppercase Text)" placeholder="WELCOME TO EUROPACK" value={welcome.tagline || ''} onChange={(e: any) => handleUpdate('tagline', e.target.value)} />
              <FormInput label="Main Heading Content" placeholder="Welcome to Europack" value={welcome.heading} onChange={(e: any) => handleUpdate('heading', e.target.value)} />
              
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Sub-description text</label>
                <textarea 
                  rows={4} 
                  value={welcome.description} 
                  onChange={e => handleUpdate('description', e.target.value)} 
                  placeholder="Provide additional details about Europack..."
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', outline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--admin-primary)'}
                  onBlur={(e) => e.target.style.borderColor = '#CBD5E0'}
                />
              </div>
           </div>
        </div>

        {/* RIGHT PANEL: Cards Data */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           
           {/* Feature Cards Loop */}
           <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', background: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem' }}>
               <h3 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Left Column: Feature Highlights</h3>
               <span style={{ fontSize: '0.9rem', background: welcome.featureCards.length === 3 ? '#C6F6D5' : '#E2E8F0', color: welcome.featureCards.length === 3 ? '#22543D' : '#4A5568', padding: '0.3rem 0.8rem', borderRadius: '12px', fontWeight: 'bold' }}>
                 {welcome.featureCards.length} / 3 Max Active
               </span>
             </div>
             
             {welcome.featureCards.map((card: any, idx: number) => (
                <div key={idx} style={{ background: '#F7FAFC', padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', position: 'relative' }}>
                  <button onClick={() => removeCard('featureCards', idx)} style={{ position: 'absolute', right: '15px', top: '15px', color: '#E53E3E', background: '#FED7D7', border: 'none', padding: '0.4rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>✕ Remove</button>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'start', marginTop: '1rem' }}>
                    
                    {/* Icon Uploader */}
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4A5568' }}>Icon (44x44)</label>
                      {card.icon ? (
                        <div style={{ position: 'relative', background: '#FEF4EB', padding: '10px', borderRadius: '50%', display: 'inline-block', border: '1px solid var(--admin-primary)' }}>
                          <img src={`http://localhost:5002/${card.icon}`} style={{ width: '40px', height: '40px', objectFit: 'contain' }} alt="Card Icon" />
                          <button onClick={() => updateCard('featureCards', idx, 'icon', '')} style={{ position: 'absolute', top: -5, right: -5, background: 'black', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: '0.6rem' }}>✕</button>
                        </div>
                      ) : (
                        <div>
                           <input type="file" id={`fc-${idx}`} style={{ display: 'none' }} onChange={e => handleCardUpload(idx, e)} />
                           <label htmlFor={`fc-${idx}`} style={{ display: 'block', background: 'var(--admin-primary)', color: 'white', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Upload</label>
                        </div>
                      )}
                    </div>

                    {/* Content Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                       <div style={{ gridColumn: 'span 2' }}>
                         <FormInput label="Title (e.g. Innovation)" placeholder="Enter title" value={card.title} onChange={(e: any) => updateCard('featureCards', idx, 'title', e.target.value)} />
                       </div>
                       
                       <div style={{ gridColumn: 'span 2' }}>
                         <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Feature description...</label>
                         <textarea 
                           placeholder="Enter short description..." 
                           rows={2} 
                           value={card.description} 
                           onChange={e => updateCard('featureCards', idx, 'description', e.target.value)} 
                           style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem', outline: 'none' }} 
                         />
                       </div>

                       <div style={{ gridColumn: 'span 2' }}>
                         <FormInput label="Icon SEO Alt Text" placeholder="e.g. Innovation Lightbulb" value={card.iconAlt || ''} onChange={(e: any) => updateCard('featureCards', idx, 'iconAlt', e.target.value)} />
                       </div>
                    </div>
                  </div>
                </div>
             ))}

             {welcome.featureCards.length < 3 && (
               <button onClick={() => addCard('featureCards')} style={{ width: '100%', background: '#FEF4EB', border: '2px dashed var(--admin-primary)', color: 'var(--admin-primary)', padding: '1.2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                 + Add Feature Card ({3 - welcome.featureCards.length} remaining)
               </button>
             )}
           </div>

           {/* Counter Cards Loop */}
           <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', background: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #EDF2F7', paddingBottom: '1rem' }}>
               <h3 style={{ margin: 0, color: 'var(--admin-sidebar-text)' }}>Right Column: Statistics Grid</h3>
               <span style={{ fontSize: '0.9rem', background: welcome.counterCards.length === 4 ? '#C6F6D5' : '#E2E8F0', color: welcome.counterCards.length === 4 ? '#22543D' : '#4A5568', padding: '0.3rem 0.8rem', borderRadius: '12px', fontWeight: 'bold' }}>
                 {welcome.counterCards.length} / 4 Max Active
               </span>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
               {welcome.counterCards.map((card: any, idx: number) => (
                  <div key={idx} style={{ background: '#F7FAFC', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', position: 'relative' }}>
                    <button onClick={() => removeCard('counterCards', idx)} style={{ position: 'absolute', right: '10px', top: '10px', color: '#E53E3E', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>🗑️</button>
                    <div style={{ marginTop: '0.5rem' }}>
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--admin-sidebar-text)', fontSize: '0.9rem' }}>Icon</label>
                        <select 
                          value={card.icon || 'users'}
                          onChange={(e: any) => updateCard('counterCards', idx, 'icon', e.target.value)}
                          style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '1rem' }}
                        >
                          <option value="users">Users</option>
                          <option value="clock">Clock</option>
                          <option value="shield">Shield</option>
                          <option value="globe">Globe</option>
                          <option value="award">Award / Star</option>
                          <option value="box">Box / Package</option>
                        </select>
                      </div>
                      <FormInput label="Numeric Value (with symbol)" placeholder="e.g. 1000+" value={card.number} onChange={(e: any) => updateCard('counterCards', idx, 'number', e.target.value)} />
                      <FormInput label="Subtitle Label" placeholder="e.g. Happy Customers" value={card.label} onChange={(e: any) => updateCard('counterCards', idx, 'label', e.target.value)} />
                    </div>
                  </div>
               ))}
               
               {welcome.counterCards.length < 4 && (
                 <button onClick={() => addCard('counterCards')} style={{ background: 'transparent', border: '2px dashed #805AD5', color: '#805AD5', padding: '1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', height: '100%', minHeight: '150px' }}>
                   + Add Stat Counter
                 </button>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
