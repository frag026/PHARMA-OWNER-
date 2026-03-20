import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300';
  
  const variants = {
    default: 'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-200',
    secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50',
    destructive: 'border-transparent bg-red-100 text-red-700 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400',
    outline: 'text-slate-950 border border-slate-200 dark:text-slate-50 dark:border-slate-800',
    success: 'border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'border-transparent bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400',
    info: 'border-transparent bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
