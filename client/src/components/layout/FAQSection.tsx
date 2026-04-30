'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQSectionProps {
  page: string;
}

export default function FAQSection({ page }: FAQSectionProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const res = await fetchAPI(`/faqs/public/${page}`);
        if (res.success) setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFAQs();
  }, [page]);

  if (loading || !data || data.faqs.length === 0) return null;

  const { settings, faqs } = data;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleCard = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(i => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  // Styles based on Graphic vs Minimal mode
  const sectionStyle: React.CSSProperties = settings.designMode === 'graphic' ? {
    position: 'relative',
    backgroundImage: settings.backgroundImage ? `url(/${settings.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '100px 0',
    color: settings.textColor || '#fff'
  } : {
    padding: '100px 0',
    backgroundColor: settings.backgroundColor || '#fff',
    color: settings.textColor || '#000'
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: settings.overlayColor || '#000',
    opacity: (settings.overlayOpacity || 50) / 100,
    zIndex: 1
  };

  return (
    <section style={sectionStyle}>
      {settings.designMode === 'graphic' && <div style={overlayStyle}></div>}
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: settings.titleFontSize || 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', color: settings.titleColor || 'inherit' }}>{settings.title}</h2>
          {settings.subtitle && <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{settings.subtitle}</p>}
        </div>

        {/* --- LAYOUT A: ACCORDION (DARK UI ENHANCED) --- */}
        {settings.layoutType === 'accordion' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {faqs.map((faq: any, idx: number) => (
              <div key={faq._id} style={{ marginBottom: '1rem' }}>
                <button 
                  onClick={() => toggleAccordion(idx)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: 'white', 
                    padding: '1.2rem 2rem', 
                    borderRadius: '8px', 
                    border: 'none', 
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: settings.questionFontSize || '1.1rem', marginRight: '1rem', color: '#000' }}>{idx + 1}.</span>
                  <span style={{ fontWeight: 700, fontSize: settings.questionFontSize || '1rem', color: '#000', flex: 1 }}>{faq.question}</span>
                </button>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ 
                        padding: '1.5rem 2.5rem', 
                        color: settings.designMode === 'graphic' ? '#CBD5E0' : '#4A5568', 
                        fontSize: settings.answerFontSize || '1.1rem', 
                        lineHeight: 1.6 
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* --- LAYOUT B: CARD TOGGLE (GRID UI ENHANCED) --- */}
        {settings.layoutType === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {faqs.map((faq: any, idx: number) => (
              <div key={faq._id} style={{ 
                background: settings.designMode === 'minimal' ? (settings.cardColor || '#f7f6f5') : 'rgba(255,255,255,0.05)', 
                backdropFilter: settings.designMode === 'graphic' ? 'blur(10px)' : 'none',
                borderRadius: '12px', 
                overflow: 'hidden',
                border: settings.designMode === 'graphic' ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}>
                <div 
                  onClick={() => toggleCard(idx)}
                  style={{ 
                    padding: '1.5rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer' 
                  }}
                >
                   <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.1rem' }}>Q</span>
                      <h4 style={{ margin: 0, fontSize: settings.questionFontSize || '1.1rem' }}>{faq.question}</h4>
                   </div>
                   <div style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>{openItems.includes(idx) ? '−' : '+'}</div>
                </div>
                <AnimatePresence>
                  {openItems.includes(idx) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 1.5rem 1.5rem 3.5rem', opacity: 0.8, lineHeight: 1.6, fontSize: settings.answerFontSize || '1rem' }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* --- LAYOUT C: SIMPLE TOGGLE (MINIMALIST) --- */}
        {settings.layoutType === 'simple' && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
             {faqs.map((faq: any, idx: number) => (
               <div key={faq._id} style={{ borderBottom: '1px solid #E2E8F0', padding: '1rem 0' }}>
                  <div 
                    onClick={() => toggleAccordion(idx)}
                    style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 600, fontSize: settings.questionFontSize || '1rem' }}
                  >
                    <span>{faq.question}</span>
                    <span>{activeIndex === idx ? '▲' : '▼'}</span>
                  </div>
                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ marginTop: '1rem', opacity: 0.7, fontSize: settings.answerFontSize || '1rem' }}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             ))}
          </div>
        )}
      </div>
    </section>
  );
}
