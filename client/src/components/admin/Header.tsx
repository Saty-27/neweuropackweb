'use client';

import React, { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {}
    }
  }, []);

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AD';
  };

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        Dashboard Overview (Real-Time) <span className="animate-pulse inline-flex items-center" style={{ color: '#FF6600', fontSize: '10px' }}>
          <span className="w-1.5 h-1.5 bg-[#FF6600] rounded-full mr-1.5"></span>
          LIVE TRANSITION
        </span>
      </div>
      
      <div className="admin-user-profile">
        <div style={{ textAlign: 'right' }}>
          <div className="text-xs font-black text-slate-900 leading-none mb-1">
            {user?.name || 'Administrative Identity'}
          </div>
          <div className="text-[10px] font-bold text-[#FF6600] uppercase tracking-widest">
            {user?.role || 'Guest'}
          </div>
        </div>
        
        <div className="relative group">
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '14px', 
            backgroundColor: '#1A1F2C',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '14px',
            border: '2px solid #fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {getInitials(user?.name)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
