'use client';

import React, { useState, useRef } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Upload, X, GripVertical, Image as ImageIcon, Loader2 } from 'lucide-react';
import { fetchAPI } from '../../lib/api';
import { toast } from 'react-hot-toast';

interface GalleryManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

export default function GalleryManager({ images, onChange, folder = 'products' }: GalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('folder', folder);
    
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    try {
      const res = await fetchAPI(`/products/upload-multiple?folder=${folder}`, {
        method: 'POST',
        body: formData,
        headers: {} // Let browser set boundary for multipart
      });

      if (res.success && Array.isArray(res.data)) {
        onChange([...images, ...res.data]);
        toast.success(`Uploaded ${res.data.length} images`);
      } else {
        toast.error(res.error || 'Failed to process images');
      }
    } catch (error: any) {
      console.error('Upload failed', error);
      toast.error(error.message || 'Network error during upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const nextImages = [...images];
    nextImages.splice(index, 1);
    onChange(nextImages);
  };

  return (
    <div className="gallery-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <label className="admin-label" style={{ margin: 0 }}>Product Gallery</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="admin-btn-outline"
            style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Upload Images
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>
      </div>

      <Reorder.Group 
        axis="y" 
        values={images} 
        onReorder={onChange}
        style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {images.map((img, index) => (
          <Reorder.Item 
            key={img} 
            value={img}
            style={{ 
              background: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '12px', 
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              cursor: 'grab'
            }}
            whileDrag={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          >
            <div style={{ color: '#94a3b8' }}>
              <GripVertical size={18} />
            </div>
            
            <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#f8fafc', flexShrink: 0 }}>
              <img 
                 src={getImageUrl(img)} 
                 alt={`Gallery ${index}`} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {img.split('/').pop()}
              </p>
            </div>

            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeImage(index);
              }}
              style={{ 
                position: 'absolute', 
                top: '5px', 
                right: '5px', 
                color: '#ef4444', 
                background: 'rgba(255,255,255,0.8)', 
                border: '1px solid #e2e8f0', 
                borderRadius: '50%',
                cursor: 'pointer', 
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20
              }}
            >
              <X size={14} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {images.length === 0 && !uploading && (
        <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #e2e8f0', borderRadius: '16px', color: '#94a3b8' }}>
          <ImageIcon size={40} style={{ marginBottom: '10px', opacity: 0.5 }} />
          <p style={{ margin: 0, fontSize: '14px' }}>No images in gallery</p>
          <p style={{ margin: 0, fontSize: '12px' }}>Upload images to showcase this product</p>
        </div>
      )}
    </div>
  );
}
