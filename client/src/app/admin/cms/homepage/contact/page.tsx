'use client';

import React, { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import ContactSection from '@/components/sections/ContactSection';

export default function ContactCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchAPI('/homepage');
      if (res.success) {
        if (!res.data.contactSection) {
          res.data.contactSection = {
            titlePart1: 'Contact',
            titlePart2: 'Us Today',
            titleColor1: '#000000',
            titleColor2: '#ff6600',
            fontSize: '3.5rem',
            fontFamily: 'Poppins',
            backgroundColor: '#ffffff',
            backgroundGradient: '',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8164326556553!2d72.8524497!3d19.0718501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e123f123f1%3A0x1234567890abcdef!2sEuropack!5e0!3m2!1sen!2sin!4v1711620000000!5m2!1sen!2sin',
            infoCards: [
              { header: 'Headquarters', details: 'Vile Parle, Mumbai', icon: 'MapPin' },
              { header: 'Direct Line', details: '+91 98190 30303', icon: 'Phone' }
            ],
            viewMoreLink: '/contact',
            showForm: true,
            isActive: true
          };
        } else {
           if (!res.data.contactSection.infoCards) res.data.contactSection.infoCards = [];
           if (!res.data.contactSection.viewMoreLink) res.data.contactSection.viewMoreLink = '/contact';
        }
        setData(res.data.contactSection);
      }
    } catch (error) {
      toast.error('Failed to load contact settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const currentRes = await fetchAPI('/homepage');
      const updatedHomepage = {
        ...currentRes.data,
        contactSection: data
      };

      const res = await fetchAPI('/homepage', {
        method: 'PUT',
        body: JSON.stringify(updatedHomepage)
      });
      if (res.success) toast.success('Contact Section updated!');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Contact CMS...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Settings Form (Top) */}
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0 }}>Contact Section Content & Style</h2>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="admin-btn-primary"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div className="admin-card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Title Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="admin-label">Heading Part 1</label>
              <input 
                type="text" 
                className="admin-input" 
                value={data.titlePart1}
                onChange={e => handleChange('titlePart1', e.target.value)}
              />
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="color" value={data.titleColor1} onChange={e => handleChange('titleColor1', e.target.value)} />
                <span className="text-xs text-gray-400">Color 1</span>
              </div>
            </div>
            <div>
              <label className="admin-label">Heading Part 2</label>
              <input 
                type="text" 
                className="admin-input" 
                value={data.titlePart2}
                onChange={e => handleChange('titlePart2', e.target.value)}
              />
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="color" value={data.titleColor2} onChange={e => handleChange('titleColor2', e.target.value)} />
                <span className="text-xs text-gray-400">Color 2</span>
              </div>
            </div>
          </div>

          {/* Typography & Aesthetic */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="admin-label">Font Size</label>
                <input 
                  type="text" 
                  className="admin-input" 
                  value={data.fontSize}
                  onChange={e => handleChange('fontSize', e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Font Family</label>
                <select 
                  className="admin-input" 
                  value={data.fontFamily}
                  onChange={e => handleChange('fontFamily', e.target.value)}
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Inter">Inter</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="inherit">Theme Default</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <div>
                  <label className="admin-label">BG Color</label>
                  <input type="color" value={data.backgroundColor} onChange={e => handleChange('backgroundColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
               </div>
               <div>
                  <label className="admin-label">Gradient</label>
                  <input className="admin-input" value={data.backgroundGradient} onChange={e => handleChange('backgroundGradient', e.target.value)} placeholder="linear-gradient(...)" />
               </div>
            </div>
          </div>

          {/* Map & Link */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="admin-label">Google Maps URL</label>
            <textarea 
              className="admin-input" 
              style={{ height: '70px' }}
              value={data.mapUrl}
              onChange={e => {
                let val = e.target.value;
                if (val.includes('<iframe')) {
                   const match = val.match(/src="([^"]+)"/);
                   if (match) val = match[1];
                }
                handleChange('mapUrl', val);
              }}
            />
            <div>
              <label className="admin-label">View More Link</label>
              <input 
                type="text" 
                className="admin-input" 
                value={data.viewMoreLink}
                onChange={e => handleChange('viewMoreLink', e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.showForm} onChange={e => handleChange('showForm', e.target.checked)} />
                <span className="admin-label" style={{ margin: 0 }}>Show Form</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.isActive} onChange={e => handleChange('isActive', e.target.checked)} />
                <span className="admin-label" style={{ margin: 0 }}>Section Visible</span>
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Info Cards */}
        <div className="admin-card" style={{ padding: '2rem', marginTop: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Contact Details (Multi-Location)</h3>
              <button 
                onClick={() => {
                  const newCards = [...(data.infoCards || []), { header: 'New Office', details: 'Address...', icon: 'MapPin' }];
                  handleChange('infoCards', newCards);
                }}
                className="admin-btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '12px' }}
              >
                + Add Detail
              </button>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {(data.infoCards || []).map((card: any, idx: number) => (
                <div key={idx} style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', position: 'relative' }}>
                   <button 
                    onClick={() => {
                      const newCards = data.infoCards.filter((_: any, i: number) => i !== idx);
                      handleChange('infoCards', newCards);
                    }}
                    style={{ position: 'absolute', top: '10px', right: '10px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                   >
                     ✕
                   </button>
                   <div style={{ marginBottom: '1rem' }}>
                      <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Label / Title</label>
                      <input 
                        className="admin-input" 
                        value={card.header} 
                        onChange={e => {
                          const newCards = [...data.infoCards];
                          newCards[idx].header = e.target.value;
                          handleChange('infoCards', newCards);
                        }}
                        placeholder="e.g. Headquarters"
                      />
                   </div>
                   <div>
                      <label style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Details / Value</label>
                      <textarea 
                        className="admin-input" 
                        style={{ height: '60px' }}
                        value={card.details} 
                        onChange={e => {
                          const newCards = [...data.infoCards];
                          newCards[idx].details = e.target.value;
                          handleChange('infoCards', newCards);
                        }}
                        placeholder="Address or Phone Number"
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Live Monitor (Bottom) */}
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <h2 style={{ margin: 0 }}>Live Monitor</h2>
           <span style={{ fontSize: '10px', background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Desktop Mockup</span>
        </div>
        <div style={{ 
          background: 'white', 
          borderRadius: '3rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', 
          overflow: 'hidden',
          border: '12px solid #F8FAFC',
          maxHeight: '800px',
          overflowY: 'auto'
        }}>
           <ContactSection data={{ ...data, isActive: true }} />
        </div>
        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '12px', marginTop: '1.5rem', fontWeight: 500 }}>
          Changes above are reflected here instantly. Remember to click "Save Settings" to publish.
        </p>
      </div>
    </div>
  );
}
