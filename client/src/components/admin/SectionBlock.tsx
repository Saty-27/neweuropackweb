'use client';

import React from 'react';
import { 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Settings, 
  Eye, 
  EyeOff, 
  Layout, 
  Type, 
  Palette, 
  Plus, 
  Image as ImageIcon 
} from 'lucide-react';

interface SectionBlockProps {
  section: any;
  index: number;
  onUpdate: (field: string, value: any) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function SectionBlock({ 
  section, 
  index, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown 
}: SectionBlockProps) {
  const [showStyles, setShowStyles] = React.useState(false);

  const updateStyle = (field: string, value: any) => {
    onUpdate('style', { ...section.style, [field]: value });
  };

  const updateTypography = (target: 'heading' | 'text', field: string, value: any) => {
    const newTypography = { ...section.style?.typography };
    newTypography[target] = { ...newTypography[target], [field]: value };
    updateStyle('typography', newTypography);
  };

  const renderContentEditor = () => {
    switch (section.type) {
      case 'features_icons':
        return (
          <div className="space-y-4">
            <label className="admin-label">Features with Icons</label>
            {(section.content || []).map((feat: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <input 
                  className="admin-input" 
                  placeholder="Icon Name (e.g. Shield)" 
                  value={feat.icon || ''} 
                  onChange={e => {
                    const newContent = [...section.content];
                    newContent[i] = { ...newContent[i], icon: e.target.value };
                    onUpdate('content', newContent);
                  }}
                  style={{ width: '200px' }}
                />
                <input 
                  className="admin-input" 
                  placeholder="Feature Title" 
                  value={feat.title || ''} 
                  onChange={e => {
                    const newContent = [...section.content];
                    newContent[i] = { ...newContent[i], title: e.target.value };
                    onUpdate('content', newContent);
                  }}
                />
                <button onClick={() => {
                  const newContent = [...section.content];
                  newContent.splice(i, 1);
                  onUpdate('content', newContent);
                }} className="text-red-500 p-2"><Trash2 size={16}/></button>
              </div>
            ))}
            <button 
              onClick={() => onUpdate('content', [...(section.content || []), { icon: '', title: '' }])}
              className="admin-btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '11px' }}
            >
              + Add Feature
            </button>
          </div>
        );

      case 'text_block':
        return (
          <div className="space-y-4">
            <div>
              <label className="admin-label">Heading</label>
              <input 
                className="admin-input" 
                value={section.content?.heading || ''} 
                onChange={e => onUpdate('content', { ...section.content, heading: e.target.value })} 
              />
            </div>
            <div>
              <label className="admin-label">Text Content (HTML Support)</label>
              <textarea 
                className="admin-input" 
                rows={5}
                value={section.content?.text || ''} 
                onChange={e => onUpdate('content', { ...section.content, text: e.target.value })} 
              />
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Button Text</label>
              <input 
                className="admin-input" 
                value={section.content?.text || ''} 
                onChange={e => onUpdate('content', { ...section.content, text: e.target.value })} 
              />
            </div>
            <div>
              <label className="admin-label">Button Link</label>
              <input 
                className="admin-input" 
                value={section.content?.link || ''} 
                onChange={e => onUpdate('content', { ...section.content, link: e.target.value })} 
              />
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="admin-label">Quote</label>
              <textarea 
                className="admin-input" 
                rows={3}
                value={section.content?.quote || ''} 
                onChange={e => onUpdate('content', { ...section.content, quote: e.target.value })} 
              />
            </div>
            <div>
              <label className="admin-label">Author Name & Role</label>
              <input 
                className="admin-input" 
                value={section.content?.author || ''} 
                onChange={e => onUpdate('content', { ...section.content, author: e.target.value })} 
              />
            </div>
          </div>
        );

      default:
        return <div className="text-slate-400 italic">Editor for {section.type} coming soon...</div>;
    }
  };

  return (
    <div className="admin-card" style={{ borderLeft: section.visible ? '4px solid #FF6600' : '4px solid #cbd5e1', marginBottom: '2rem' }}>
      {/* Block Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ background: '#fef3c7', color: '#92400e', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontSize: '13px', fontWeight: 900 }}>
            {index + 1}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {section.type.toUpperCase().replace('_', ' ')} 
              {!section.visible && <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b' }}>HIDDEN</span>}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: {section.id || 'new_section'}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onUpdate('visible', !section.visible)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          <button onClick={() => setShowStyles(!showStyles)} className={`p-2 rounded-lg ${showStyles ? 'bg-orange-50 text-[#FF6600]' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Palette size={18} />
          </button>
          <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
          <button onClick={onMoveUp} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronUp size={18} /></button>
          <button onClick={onMoveDown} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronDown size={18} /></button>
          <button onClick={onRemove} className="p-2 hover:bg-red-50 rounded-lg text-red-400"><Trash2 size={18} /></button>
        </div>
      </div>

      {showStyles ? (
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#64748b' }}>Block Styling</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div>
                <label className="admin-label">Padding</label>
                <input className="admin-input" value={section.style?.padding || ''} onChange={e => updateStyle('padding', e.target.value)} placeholder="80px 0" />
             </div>
             <div>
                <label className="admin-label">Background</label>
                <input className="admin-input" type="color" value={section.style?.backgroundColor || '#ffffff'} onChange={e => updateStyle('backgroundColor', e.target.value)} />
             </div>
             <div>
                <label className="admin-label">Text Color</label>
                <input className="admin-input" type="color" value={section.style?.textColor || '#1e293b'} onChange={e => updateStyle('textColor', e.target.value)} />
             </div>
             <div>
                <label className="admin-label">Layout</label>
                <select className="admin-input" value={section.layout || 'standard'} onChange={e => onUpdate('layout', e.target.value)}>
                   <option value="standard">Standard</option>
                   <option value="contained">Contained</option>
                   <option value="full-width">Full Width</option>
                   <option value="split">Split Layout</option>
                </select>
             </div>
          </div>
          
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed #cbd5e1' }}>
             <label className="admin-label">Heading Typography</label>
             <div className="grid grid-cols-3 gap-4">
                <input className="admin-input" placeholder="Size (px)" value={section.style?.typography?.heading?.fontSize || ''} onChange={e => updateTypography('heading', 'fontSize', e.target.value)} />
                <input className="admin-input" placeholder="Weight" value={section.style?.typography?.heading?.fontWeight || ''} onChange={e => updateTypography('heading', 'fontWeight', e.target.value)} />
                <input className="admin-input" placeholder="Font" value={section.style?.typography?.heading?.fontFamily || ''} onChange={e => updateTypography('heading', 'fontFamily', e.target.value)} />
             </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {renderContentEditor()}
          
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div>
                   <label className="admin-label">SEO Heading</label>
                   <select 
                     style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                     value={section.seo?.headingLevel || 'h2'}
                     onChange={e => onUpdate('seo', { ...section.seo, headingLevel: e.target.value })}
                   >
                     <option value="h1">H1</option>
                     <option value="h2">H2</option>
                     <option value="h3">H3</option>
                     <option value="h4">H4</option>
                   </select>
                </div>
                <div>
                   <label className="admin-label">Visibility Control</label>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => onUpdate('visibleOn', { ...section.visibleOn, user: !section.visibleOn?.user })}
                        style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', background: section.visibleOn?.user !== false ? '#ecfdf5' : 'white', color: section.visibleOn?.user !== false ? '#059669' : '#64748b' }}
                      >
                         User
                      </button>
                      <button 
                        onClick={() => onUpdate('visibleOn', { ...section.visibleOn, searchEngine: !section.visibleOn?.searchEngine })}
                        style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0', background: section.visibleOn?.searchEngine !== false ? '#f0f9ff' : 'white', color: section.visibleOn?.searchEngine !== false ? '#0284c7' : '#64748b' }}
                      >
                         Search Engine
                      </button>
                   </div>
                </div>
             </div>
             
             {section.type.includes('image') || section.content?.image ? (
                <div>
                   <label className="admin-label">Alt Text</label>
                   <input 
                     className="admin-input" 
                     style={{ padding: '4px 8px', fontSize: '11px' }}
                     value={section.seo?.altText || ''} 
                     onChange={e => onUpdate('seo', { ...section.seo, altText: e.target.value })} 
                     placeholder="Meaningful description"
                   />
                </div>
             ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
