'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../lib/api';

export default function CMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Home Page Content State
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Premium Industrial\nPackaging Solutions',
    heroSubtitle: 'Global standards in wooden pallets, corrugated boxes, and custom industrial packaging. Trusted by 1000+ businesses worldwide for over 33 years.',
    statsClients: '1000+',
    statsExperience: '33',
    whatsappNumber: '1234567890'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await fetchAPI('/cms/home');
      if (res.success && res.data && res.data.content) {
        setHomeContent(res.data.content);
      }
    } catch (error) {
      console.log('No existing home content found, using defaults.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHomeContent({ ...homeContent, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetchAPI('/cms', {
        method: 'POST',
        body: JSON.stringify({
          slug: 'home',
          title: 'Home Page',
          type: 'page',
          content: homeContent
        })
      });
      alert('Landing Page updated successfully!');
    } catch (error) {
      alert('Failed to save content');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading CMS...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Content Management System</h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Dynamically control the public website content.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {/* Tabs mock */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--admin-border)', background: '#F7FAFC' }}>
          <div style={{ padding: '1rem 2rem', borderBottom: '2px solid var(--admin-primary)', fontWeight: 600, color: 'var(--admin-primary)', cursor: 'pointer' }}>Home Page</div>
          <div style={{ padding: '1rem 2rem', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>About Page</div>
        </div>

        <form onSubmit={handleSave} style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--admin-secondary)' }}>Hero Section Controls</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Hero Main Headline (Use \n for line break)</label>
              <textarea 
                name="heroTitle" 
                value={homeContent.heroTitle} 
                onChange={handleChange} 
                rows={2} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Hero Subtitle / Description</label>
              <textarea 
                name="heroSubtitle" 
                value={homeContent.heroSubtitle} 
                onChange={handleChange} 
                rows={3} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stat: Happy Clients</label>
                <input 
                  type="text" 
                  name="statsClients" 
                  value={homeContent.statsClients} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stat: Years Experience</label>
                <input 
                  type="text" 
                  name="statsExperience" 
                  value={homeContent.statsExperience} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Global WhatsApp Contact Number</label>
              <input 
                type="text" 
                name="whatsappNumber" 
                value={homeContent.whatsappNumber} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}
                placeholder="1234567890"
              />
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--admin-border)' }}>
              <button 
                type="submit" 
                disabled={saving}
                style={{ background: 'var(--admin-primary)', color: 'white', border: 'none', padding: '1rem 3rem', borderRadius: '4px', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '1.1rem' }}
              >
                {saving ? 'Publishing Context...' : 'Publish to Live Site'}
              </button>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Changes will instantly reflect on the public landing page via API.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
