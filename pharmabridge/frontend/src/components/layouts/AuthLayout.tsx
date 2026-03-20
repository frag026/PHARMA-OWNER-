import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
             <Link to="/" className="flex items-center gap-2 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-xl shadow-lg shadow-primary/20">PB</div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Pharma<span className="text-primary">Bridge</span></span>
             </Link>
             <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">{title}</h2>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">{subtitle}</p>
          </div>
          
          <div className="mt-2 bg-white px-8 py-10 shadow-2xl shadow-slate-200/50 rounded-2xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
            {children}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-slate-900/90 z-10" />
        <div className="absolute inset-0 z-0 flex items-center justify-center p-20 opacity-20">
           <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
           </svg>
        </div>
        <div className="absolute bottom-20 left-20 z-20 max-w-lg">
           <Badge variant="secondary" className="mb-4">Healthcare Digitization</Badge>
           <h3 className="text-4xl font-extrabold text-white mb-6 leading-tight">Empowering patients with seamless medicine access.</h3>
           <p className="text-lg text-slate-300 font-medium tracking-wide">Connecting 500+ clinics and pharmacies nationwide via the most secure and intuitive platform.</p>
           <div className="mt-8 flex gap-4">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <div className="h-1 w-4 bg-slate-500 rounded-full" />
              <div className="h-1 w-4 bg-slate-500 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
};
