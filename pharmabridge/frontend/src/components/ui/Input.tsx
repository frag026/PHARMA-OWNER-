import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm 
              ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 
              focus-visible:ring-primary/50 focus-visible:ring-offset-0 disabled:cursor-not-allowed 
              disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-destructive focus-visible:ring-destructive/50' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
