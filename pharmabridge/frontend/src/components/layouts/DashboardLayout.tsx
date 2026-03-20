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
        <Sidebar role={user?.role || 'PHARMACY_ADMIN'} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
