'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Plus, Search, User, Shield, Mail, 
  Trash2, Edit3, Eye, EyeOff, 
  ChevronRight, ArrowUpRight, 
  Settings, Key, History, Activity,
  Clock, ShieldCheck, ShieldAlert,
  UserPlus, Layout, Video, FileText,
  Package, Globe, Target, Briefcase,
  Layers, MessageSquare, Tag, Zap,
  LogOut, BarChart3, Home, FileCode,
  Users
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  permission?: string;
}

const navItems: NavItem[] = [
  { name: 'DashBoard', href: '/admin', icon: <BarChart3 size={18} /> },
  { name: 'Youtube DashBoard', href: '/admin/youtube-intelligence', icon: <Video size={18} /> },
  { name: 'Basic CMS Pages', href: '/admin/cms', icon: <FileText size={18} />, permission: 'settings' },
  { name: 'Adv. Homepage CMS', href: '/admin/cms/homepage/welcome', icon: <Home size={18} />, permission: 'settings' },
  { name: 'Products', href: '/admin/products', icon: <Package size={18} />, permission: 'products' },
  { name: 'Adv. FAQ Manager', href: '/admin/faqs', icon: <MessageSquare size={18} />, permission: 'faqs' },
  { name: 'Leads & CRM', href: '/admin/submissions', icon: <Mail size={18} />, permission: 'enquiries' },
  { name: 'Blog Architect', href: '/admin/blogs', icon: <Edit3 size={18} />, permission: 'blogs' },
  { name: 'Team Architect', href: '/admin/team', icon: <Users size={18} />, permission: 'team' },
  { name: 'Job Architect', href: '/admin/jobs', icon: <Briefcase size={18} />, permission: 'settings' },
  { name: 'Service Architect', href: '/admin/services', icon: <Zap size={18} />, permission: 'services' },
  { name: 'Industry Architect', href: '/admin/industries', icon: <Globe size={18} />, permission: 'industries' },
  { name: 'Gallery Architect', href: '/admin/gallery', icon: <Layout size={18} />, permission: 'gallery' },
  { name: 'Media Architect', href: '/admin/media', icon: <Video size={18} />, permission: 'media' },
  { name: 'Case Study Architect', href: '/admin/case-studies', icon: <Briefcase size={18} />, permission: 'caseStudies' },
  { name: 'User Feedback', href: '/admin/feedback', icon: <FileText size={18} />, permission: 'settings' },
  { name: 'Quotes & CRM', href: '/admin/quotes', icon: <Tag size={18} />, permission: 'quotes' },
  { name: 'Industrial Leads', href: '/admin/leads', icon: <Target size={18} />, permission: 'leads' },
  { name: 'Tasks (EMS)', href: '/admin/tasks', icon: <Layers size={18} />, permission: 'settings' },
  { name: 'Footer Settings', href: '/admin/footer', icon: <Settings size={18} />, permission: 'settings' },
  { name: 'Custom Pages', href: '/admin/pages', icon: <FileCode size={18} />, permission: 'settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const hasPermission = (item: NavItem) => {
    // If identity is still hydrating, we temporarily hide to prevent flash
    if (!user) return false;
    
    // Super Admin has full 'Black Box' clearance override
    if (user.role === 'Super Admin' || user.role === 'SuperAdmin') return true;
    
    // Items without specific permission requirements (e.g., Dashboard)
    if (!item.permission) return true; 

    const permissions = user.permissions as any;
    return permissions?.[item.permission]?.view === true;
  };

  // Dedicated Administrative Sections for High Clearance
  const adminLinks = [
    { name: 'Team Manager', href: '/admin/settings/users', icon: <Shield size={18} />, role: ['Super Admin'] },
    { name: 'Activity Monitor', href: '/admin/monitoring', icon: <History size={18} />, role: ['Super Admin', 'Admin'] }
  ];

  return (
    <aside className="w-72 bg-[#1A1F2C] h-screen fixed left-0 top-0 overflow-y-auto scrollbar-hide flex flex-col border-r border-slate-800 z-50">
      <div className="p-8 pb-10">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6600] flex items-center justify-center shadow-lg shadow-orange-900/20">
               <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
               <h1 className="text-lg font-black text-white tracking-tight leading-none mb-1">Europack Admin</h1>
               <p className="text-[9px] font-black uppercase tracking-widest text-[#FF6600]">Professional Ecosystem</p>
            </div>
         </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-6">
           <p className="px-4 mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Core Architecture</p>
           {navItems.filter(hasPermission).map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const actuallyActive = item.href === '/admin' ? pathname === '/admin' : isActive;

              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${actuallyActive ? 'bg-[#FF6600] text-white shadow-lg shadow-orange-950/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  <span className={`${actuallyActive ? 'text-white' : 'text-slate-500 group-hover:text-[#FF6600]'} transition-colors`}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-black tracking-tight">{item.name}</span>
                  {actuallyActive && <ArrowUpRight className="ml-auto opacity-40" size={14} />}
                </Link>
              );
           })}
        </div>

        {/* Administrative Clearance Sections */}
        {(user?.role === 'Super Admin' || user?.role === 'Admin') && (
           <div className="pt-6 border-t border-slate-800/50 mt-6">
              <p className="px-4 mb-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#FF6600]">Administration Clearance</p>
              {adminLinks.map((item) => {
                 if (!item.role.includes(user.role)) return null;
                 const isActive = pathname === item.href;
                 
                 return (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-[#FF6600] hover:bg-slate-800/50'}`}
                    >
                      <span className={`${isActive ? 'text-[#FF6600]' : 'text-slate-500 group-hover:text-[#FF6600]'} transition-colors`}>
                        {item.icon}
                      </span>
                      <span className="text-xs font-black tracking-tight">{item.name}</span>
                    </Link>
                 );
              })}
           </div>
        )}
      </nav>

      {/* Identity Footer */}
      <div className="p-6 mt-auto">
         {user && (
            <div className="bg-slate-900/50 rounded-3xl p-4 border border-slate-800 mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                     <User size={20} />
                  </div>
                  <div className="overflow-hidden">
                     <p className="text-[11px] font-black text-white truncate">{user.name}</p>
                     <p className="text-[9px] font-bold text-[#FF6600] uppercase tracking-widest">{user.role}</p>
                  </div>
               </div>
            </div>
         )}
         <button 
           onClick={handleLogout}
           className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500 font-black text-[10px] uppercase tracking-widest group shadow-sm active:scale-95 border border-red-500/20"
         >
           Logout Identity
           <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </aside>
  );
}
