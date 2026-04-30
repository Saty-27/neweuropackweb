'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: scrolled ? 'var(--background)' : 'rgba(255, 255, 255, 0.95)',
      boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
      zIndex: 100,
      transition: 'all 0.3s ease',
      padding: scrolled ? '1rem 0' : '1.5rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--secondary)', textDecoration: 'none', letterSpacing: '-0.03em' }}>
          EURO<span style={{ color: 'var(--primary)' }}>PACK</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              style={{
                color: pathname === link.href ? 'var(--primary)' : 'var(--text-dark)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/quote" className="btn-primary" style={{ padding: '0.6rem 1.5rem', marginLeft: '1rem' }}>
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
