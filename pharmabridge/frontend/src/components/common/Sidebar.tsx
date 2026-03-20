import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Package, 
  Users, 
  BarChart3, 
  Settings,
  Bell
} from 'lucide-react';

interface SidebarProps {
  role: 'PHARMACY_ADMIN';
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const links = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Live Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory', path: '/admin/inventory', icon: Package },
    { label: 'Prescriptions', path: '/admin/prescriptions', icon: ClipboardList },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Pharmacy Profile', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-8">
        <nav className="flex flex-1 flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group
                ${isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}
              `}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
         <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Help Center</p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Need help with an order? Contact our 24/7 support.</p>
            <button className="text-xs font-bold text-primary hover:underline">Support Ticket</button>
         </div>
      </div>
    </aside>
  );
};
