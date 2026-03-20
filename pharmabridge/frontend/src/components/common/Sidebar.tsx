import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  role: 'ADMIN' | 'PHARMACY' | 'CUSTOMER' | 'DRIVER' | 'PHARMACY_ADMIN';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const customerLinks = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: 'dashboard' },
    { label: 'Pharmacy', path: '/search', icon: 'local_pharmacy' },
    { label: 'Lab Test', path: '/lab-tests', icon: 'biotech' },
    { label: 'Orders', path: '/customer/orders', icon: 'shopping_bag' },
    { label: 'Records', path: '/customer/records', icon: 'history' },
    { label: 'Support', path: '/support', icon: 'support_agent' },
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Orders', path: '/admin/orders', icon: 'shopping_cart' },
    { label: 'Inventory', path: '/admin/inventory', icon: 'inventory' },
    { label: 'Finance', path: '/admin/finance', icon: 'payments' },
    { label: 'Settings', path: '/admin/settings', icon: 'settings' },
  ];

  const links = (role === 'ADMIN' || role === 'PHARMACY') ? adminLinks : customerLinks;

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101c22] transition-colors">
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
        <nav className="flex flex-1 flex-col gap-1.5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-bold transition-all group
                ${isActive 
                  ? 'bg-[#0da2e7] text-white shadow-lg shadow-[#0da2e7]/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#0da2e7] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-[#0da2e7]'}
              `}
            >
              <span className="material-symbols-outlined text-[22px] font-bold">{link.icon}</span>
              <span className="tracking-wide">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
         <div className="rounded-2xl bg-[#0da2e7]/5 p-5 dark:bg-[#0da2e7]/10 border border-[#0da2e7]/10">
            <h4 className="text-xs font-black text-[#0da2e7] uppercase tracking-widest mb-2">Bridge Plus</h4>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-4 opacity-80 leading-relaxed">Upgrade and get 15% off on your first 3 orders.</p>
            <button className="w-full text-xs font-black bg-[#0da2e7] text-white py-2 rounded-lg hover:bg-[#0da2e7]/90 transition-colors shadow-sm">Upgrade</button>
         </div>
      </div>
    </aside>
  );
};
