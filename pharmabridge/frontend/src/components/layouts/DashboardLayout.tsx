import React from 'react';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar'; // Needs to be created
import { useAuthStore } from '../../store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Sidebar based on role */}
        <Sidebar role={(user?.role as 'ADMIN' | 'PHARMACY' | 'CUSTOMER' | 'DRIVER' | 'PHARMACY_ADMIN') || 'CUSTOMER'} />
        
        <main className="flex-1 overflow-y-auto bg-[#f5f7f8] dark:bg-[#101c22]">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
