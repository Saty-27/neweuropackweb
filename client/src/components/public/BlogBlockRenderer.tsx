'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Share2 } from 'lucide-react';

interface BlockRendererProps {
  blocks: any[];
  defaultTypography?: any;
}

const BlockWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const BlogBlockRenderer: React.FC<BlockRendererProps> = ({ blocks, defaultTypography }) => {
  if (!blocks || blocks.length === 0) return null;

  const getImageUrl = (path: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5002/${path}`;
  };

  return (
    <div className="blog-content-area space-y-12">
      {blocks.map((block: any, index: number) => {
        const key = block.id ?? `block-${index}`;
        const style = {
          textAlign: block.style?.textAlign as any,
          color: block.style?.color,
          fontSize: block.style?.fontSize,
          fontWeight: block.style?.fontWeight,
          fontFamily: block.style?.fontFamily || defaultTypography?.paragraph?.fontFamily
        };


        switch (block.type) {
          case 'heading':
            const HeadingTag = (block.content.level || 'h2') as 'h1' | 'h2' | 'h3';
            return (
              <BlockWrapper key={key} className="mt-20 mb-8 first:mt-0">
                <HeadingTag 
                  className="blog-heading tracking-tight"
                  style={{ ...style, lineHeight: 1.15 } as React.CSSProperties}
                >
                  {block.content.text}
                </HeadingTag>
              </BlockWrapper>
            );

          case 'paragraph':
            return (
              <BlockWrapper key={key}>
                <p 
                  className="blog-paragraph text-slate-600 selection:bg-[#FF6600]/10"
                  style={{ 
                    ...style, 
                    lineHeight: defaultTypography?.paragraph?.lineHeight || 1.8,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {block.content.text}
                </p>
              </BlockWrapper>
            );

          case 'image':
            return (
              <BlockWrapper key={key} className="blog-image-block my-16">
                <figure className="rounded-[32px] overflow-hidden border border-slate-100 shadow-lg">
                  <img 
                    src={block.content.url?.startsWith('/') ? block.content.url : getImageUrl(block.content.url)} 
                    alt={block.content.alt || block.content.caption || 'Europack Industrial Packaging'} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {block.content.caption && (
                    <figcaption className="px-8 py-4 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                      {block.content.caption}
                    </figcaption>
                  )}
                </figure>
              </BlockWrapper>
            );

          case 'list':
            return (
              <BlockWrapper key={key} className="blog-list space-y-6 my-12 pl-4">
                {block.content.items.map((item: string, i: number) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start list-none"
                  >
                    <span 
                      className="w-2.5 h-2.5 bg-[#FF6600] rounded-full mt-2.5 shrink-0 shadow-lg shadow-orange-300" 
                    />
                    <span 
                      className="text-slate-600 font-medium"
                      style={{ 
                        fontSize: style.fontSize || defaultTypography?.paragraph?.fontSize,
                        lineHeight: 1.6,
                        fontFamily: style.fontFamily
                      }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </BlockWrapper>
            );

          case 'cta':
            return (
              <BlockWrapper key={key} className="blog-cta-block py-16 flex justify-center">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href={block.content.link}
                  className="bg-[#FF6600] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_20px_50px_-10px_rgba(255,102,0,0.4)] hover:shadow-orange-500/60 transition-all no-underline inline-block"
                >
                  {block.content.text || 'Take Action Now'}
                </motion.a>
              </BlockWrapper>
            );

          case 'link':
            return (
              <BlockWrapper key={key} className="blog-link-block text-center py-10">
                <a 
                  href={block.content.url}
                  target={block.content.newTab ? '_blank' : '_self'}
                  rel={block.content.newTab ? 'noopener noreferrer' : ''}
                  className="inline-flex items-center gap-3 text-[#FF6600] font-black border-b-4 border-[#FF6600]/10 pb-2 hover:border-[#FF6600] transition-all no-underline text-xl uppercase tracking-tighter"
                >
                  {block.content.text} <ExternalLink size={20} />
                </a>
              </BlockWrapper>
            );

          case 'embed':
            return (
              <BlockWrapper 
                key={key}
                className="blog-embed-block my-20 rounded-[40px] overflow-hidden shadow-2xl border border-slate-100"
              >
                <div dangerouslySetInnerHTML={{ __html: block.content.html }} />
              </BlockWrapper>
            );

          case 'divider':
            return (
              <BlockWrapper key={key} className="my-24">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-[1px] bg-slate-100" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-12 h-[1px] bg-slate-100" />
                </div>
              </BlockWrapper>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogBlockRenderer;
