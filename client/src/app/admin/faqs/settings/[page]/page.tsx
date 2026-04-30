'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../../../../lib/api';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PAGES = [
  'home', 'about', 'services', 'contact', 'blog', 'products',
  'case-study', 'videos', 'gallery', 'careers', 'clients', 'testimonials', 'team'
];

export default function FAQSettingsPage() {
  const { page } = useParams() as { page: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    layoutType: 'accordion',
    designMode: 'minimal',
    title: 'Frequently Asked Questions',
    subtitle: '',
    backgroundImage: '',
    overlayColor: '#000000',
    overlayOpacity: 50,
    backgroundColor: '#ffffff',
    cardColor: '#f7f6f5',
    textColor: '#000000',
    titleColor: '#000000',
    titleFontSize: '2rem',
    questionFontSize: '1.2rem',
    answerFontSize: '1rem'
  });

  useEffect(() => {
    loadSettings();
  }, [page]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await fetchAPI(`/faqs/settings/${page}`);
      if (res.success) setSettings(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetchAPI(`/faqs/settings/${page}`, {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      if (res.success) alert('Settings saved for ' + page);
    } catch (e) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) handleUpdate('backgroundImage', data.url);
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>FAQ Section Settings</h1>
          <p style={{ color: '#718096', marginTop: '0.4rem' }}>Configure the FAQ UI and Design for specific pages.</p>
        </div>
        <Link href="/admin/faqs" style={{ color: 'var(--admin-primary)', textDecoration: 'none', fontWeight: 600 }}>← Back to FAQ Manager</Link>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {PAGES.map(p => (
          <button 
            key={p} 
            onClick={() => router.push(`/admin/faqs/settings/${p}`)}
            style={{ 
              padding: '0.6rem 1.2rem', 
              borderRadius: '8px', 
              border: 'none',
              background: page === p ? 'var(--admin-primary)' : '#EDF2F7',
              color: page === p ? 'white' : '#4A5568',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: 600
            }}
          >
            {p.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Form */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #EDF2F7', paddingBottom: '0.5rem' }}>1. UI Layout Strategy</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
               {['accordion', 'card', 'simple'].map(type => (
                 <button 
                   key={type}
                   onClick={() => handleUpdate('layoutType', type)}
                   style={{ 
                     padding: '1rem', 
                     borderRadius: '8px', 
                     border: settings.layoutType === type ? '2px solid var(--admin-primary)' : '1px solid #E2E8F0',
                     background: settings.layoutType === type ? '#EBF8FF' : 'white',
                     textAlign: 'center',
                     cursor: 'pointer'
                   }}
                 >
                   <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{type === 'accordion' ? '📑' : type === 'card' ? '🃏' : '📄'}</div>
                   <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{type}</div>
                 </button>
               ))}
            </div>

            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #EDF2F7', paddingBottom: '0.5rem' }}>2. Visual Design Mode</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
               {['minimal', 'graphic'].map(mode => (
                 <button 
                   key={mode}
                   onClick={() => handleUpdate('designMode', mode)}
                   style={{ 
                     flex: 1,
                     padding: '1rem', 
                     borderRadius: '8px', 
                     border: settings.designMode === mode ? '2px solid var(--admin-primary)' : '1px solid #E2E8F0',
                     background: settings.designMode === mode ? '#EBF8FF' : 'white',
                     textAlign: 'center',
                     cursor: 'pointer'
                   }}
                 >
                   <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{mode} Mode</div>
                   <div style={{ fontSize: '0.8rem', color: '#718096' }}>{mode === 'minimal' ? 'Clean colors & cards' : 'Images & overlays'}</div>
                 </button>
               ))}
            </div>

            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #EDF2F7', paddingBottom: '0.5rem' }}>3. Content Details</h3>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Section Title</label>
              <input type="text" value={settings.title} onChange={e => handleUpdate('title', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px' }} />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Subtitle (Optional)</label>
              <input type="text" value={settings.subtitle} onChange={e => handleUpdate('subtitle', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #CBD5E0', borderRadius: '6px' }} />
            </div>


        </div>

        {/* Right Settings Grid */}
        <div style={{ background: '#F7FAFC', padding: '2rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Styling & Backgrounds</h3>
            
            {settings.designMode === 'graphic' ? (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Background Image</label>
                  <input type="file" onChange={e => e.target.files && uploadFile(e.target.files[0])} style={{ width: '100%', padding: '1rem', border: '2px dashed #CBD5E0', borderRadius: '8px' }} />
                  {settings.backgroundImage && <img src={'/' + settings.backgroundImage} style={{ height: '80px', marginTop: '1rem', borderRadius: '4px' }} />}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Overlay Color</label>
                    <input type="color" value={settings.overlayColor} onChange={e => handleUpdate('overlayColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Overlay Opacity ({settings.overlayOpacity}%)</label>
                    <input type="range" min="0" max="100" value={settings.overlayOpacity} onChange={e => handleUpdate('overlayOpacity', parseInt(e.target.value))} style={{ width: '100%' }} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Section Background Color</label>
                    <input type="color" value={settings.backgroundColor} onChange={e => handleUpdate('backgroundColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Card / Item Color</label>
                    <input type="color" value={settings.cardColor} onChange={e => handleUpdate('cardColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
                </div>
              </>
            )}

            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                   <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Title Color</label>
                   <input type="color" value={settings.titleColor} onChange={e => handleUpdate('titleColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Default Text Color</label>
                  <input type="color" value={settings.textColor} onChange={e => handleUpdate('textColor', e.target.value)} style={{ width: '100%', height: '40px' }} />
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                   <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Title Size</label>
                   <input type="text" value={settings.titleFontSize} onChange={e => handleUpdate('titleFontSize', e.target.value)} placeholder="2rem" style={{ width: '100%', padding: '0.5rem', border: '1px solid #CBD5E0', borderRadius: '4px' }} />
                </div>
                <div>
                   <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Quest. Size</label>
                   <input type="text" value={settings.questionFontSize} onChange={e => handleUpdate('questionFontSize', e.target.value)} placeholder="1.2rem" style={{ width: '100%', padding: '0.5rem', border: '1px solid #CBD5E0', borderRadius: '4px' }} />
                </div>
                <div>
                   <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Ans. Size</label>
                   <input type="text" value={settings.answerFontSize} onChange={e => handleUpdate('answerFontSize', e.target.value)} placeholder="1rem" style={{ width: '100%', padding: '0.5rem', border: '1px solid #CBD5E0', borderRadius: '4px' }} />
                </div>
            </div>
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#EDF2F7', borderRadius: '12px', borderLeft: '4px solid var(--admin-primary)' }}>
                <h4 style={{ margin: 0 }}>Live Switcher Note 💡</h4>
                <p style={{ fontSize: '0.85rem', color: '#4A5568', margin: '0.5rem 0' }}>Changing the "Layout Strategy" will immediately switch the UI on the frontend for the <strong>{page}</strong> page.</p>
            </div>
        </div>
      </div>

      {/* --- GLOBAL SAVE BUTTON --- */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="btn-primary" 
          style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
        >
          {saving ? 'Saving...' : '🚀 Save All FAQ Settings for ' + page}
        </button>
      </div>

      {/* --- LIVE PREVIEW SECTION --- */}
      <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
             <h2 style={{ margin: 0 }}>✨ Live Preview</h2>
             <span style={{ background: '#EBF8FF', color: '#2B6CB0', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>REAL-TIME</span>
          </div>
          
          <div style={{ 
            border: '2px dashed #CBD5E0', 
            borderRadius: '16px', 
            overflow: 'hidden',
            background: '#F7FAFC',
            position: 'relative',
            minHeight: '400px'
          }}>
             <LivePreview settings={settings} />
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#718096', fontSize: '0.9rem' }}>
            This preview uses sample data to show how your configuration will appear on the <strong>{page}</strong> page.
          </p>
      </div>
    </div>
  );
}

// --- PREVIEW COMPONENT ---
function LivePreview({ settings }: { settings: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const dummyFaqs = [
    { _id: '1', question: 'How does the dynamic system work?', answer: 'This is a real-time preview of your designs! Any change you make above will reflect here instantly.' },
    { _id: '2', question: 'Can I change layouts instantly?', answer: 'Yes! Simply click the layout buttons on the left. You can switch between Accordion, Card, and Simple styles.' },
    { _id: '3', question: 'What is Graphic Mode?', answer: 'Graphic mode allows you to use background images and overlays for a premium look, while Minimal mode is cleaner.' }
  ];

  const toggleAccordion = (index: number) => setActiveIndex(activeIndex === index ? null : index);
  const toggleCard = (index: number) => {
    if (openItems.includes(index)) setOpenItems(openItems.filter(i => i !== index));
    else setOpenItems([...openItems, index]);
  };

  const getImageUrl = (path: string) => {
    if (!path) return 'none';
    if (path.startsWith('http')) return `url(${path})`;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `url(http://localhost:5002${cleanPath})`;
  };

  const sectionStyle: React.CSSProperties = settings.designMode === 'graphic' ? {
    position: 'relative',
    backgroundImage: getImageUrl(settings.backgroundImage),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '60px 20px',
    color: settings.textColor || '#fff',
    transition: 'all 0.3s ease'
  } : {
    padding: '60px 20px',
    backgroundColor: settings.backgroundColor || '#fff',
    color: settings.textColor || '#000',
    transition: 'all 0.3s ease'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: settings.overlayColor || '#000',
    opacity: (settings.overlayOpacity || 50) / 100,
    zIndex: 1,
    transition: 'all 0.3s ease'
  };

  return (
    <div style={sectionStyle}>
      {settings.designMode === 'graphic' && <div style={overlayStyle}></div>}
      
      {settings.designMode === 'minimal' && settings.backgroundImage && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FFF5F5', color: '#C53030', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, border: '1px solid #FEB2B2', zIndex: 10 }}>
          💡 Switch to Graphic Mode to see background image
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: settings.titleFontSize || '2rem', marginBottom: '0.5rem', color: settings.titleColor }}>{settings.title}</h2>
          {settings.subtitle && <p style={{ fontSize: '1rem', opacity: 0.8 }}>{settings.subtitle}</p>}
        </div>

        {/* Accordion */}
        {settings.layoutType === 'accordion' && (
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {dummyFaqs.map((faq, idx) => (
              <div key={faq._id} style={{ marginBottom: '0.8rem' }}>
                <button 
                  onClick={() => toggleAccordion(idx)}
                  style={{ 
                    width: '100%', display: 'flex', alignItems: 'center', background: 'white', 
                    padding: '1rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left' 
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: settings.questionFontSize || '1.1rem', marginRight: '0.8rem', color: '#000' }}>{idx + 1}.</span>
                  <span style={{ fontWeight: 700, fontSize: settings.questionFontSize || '1rem', color: '#000', flex: 1 }}>{faq.question}</span>
                </button>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '1rem 2rem', color: settings.designMode === 'graphic' ? '#CBD5E0' : '#4A5568', fontSize: settings.answerFontSize || '1rem', lineHeight: 1.5 }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        {settings.layoutType === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {dummyFaqs.map((faq, idx) => (
              <div key={faq._id} style={{ 
                background: settings.designMode === 'minimal' ? (settings.cardColor || '#f7f6f5') : 'rgba(255,255,255,0.05)', 
                backdropFilter: settings.designMode === 'graphic' ? 'blur(10px)' : 'none',
                borderRadius: '12px', overflow: 'hidden', border: settings.designMode === 'graphic' ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}>
                <div onClick={() => toggleCard(idx)} style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                   <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <span style={{ color: '#ff6b00', fontWeight: 800 }}>Q</span>
                      <h4 style={{ margin: 0, fontSize: settings.questionFontSize || '1rem' }}>{faq.question}</h4>
                   </div>
                   <div style={{ color: '#ff6b00' }}>{openItems.includes(idx) ? '−' : '+'}</div>
                </div>
                <AnimatePresence>
                  {openItems.includes(idx) && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0 1.2rem 1.2rem 2.8rem', opacity: 0.8, fontSize: settings.answerFontSize || '0.9rem', lineHeight: 1.5 }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Simple */}
        {settings.layoutType === 'simple' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
             {dummyFaqs.map((faq, idx) => (
               <div key={faq._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '0.8rem 0' }}>
                  <div onClick={() => toggleAccordion(idx)} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600 }}>
                    <span style={{ fontSize: settings.questionFontSize || '0.95rem' }}>{faq.question}</span>
                    <span>{activeIndex === idx ? '▲' : '▼'}</span>
                  </div>
                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <p style={{ marginTop: '0.8rem', opacity: 0.7, fontSize: settings.answerFontSize || '0.9rem' }}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
