import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Phone or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload = { 
        password: data.password,
        phone: data.identifier
      };

      const response = await api.post('/auth/login', payload);
      const { user, accessToken } = response.data.data;
      
      setAuth(user, accessToken);
      toast.success('Login successful!');
      if (user.role === 'ADMIN' || user.role === 'PHARMACY') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f5f7f8] dark:bg-[#101c22] font-display antialiased text-slate-900 dark:text-slate-100">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-40 py-4 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-4">
          <div className="text-[#0da2e7]">
            <svg className="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">PharmaBridge</h2>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link className="hover:text-[#0da2e7]" to="/">Home</Link>
          <a className="hover:text-[#0da2e7]" href="#">Pharmacies</a>
          <a className="hover:text-[#0da2e7]" href="#">About Us</a>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
            <button className="flex-1 border-b-2 border-[#0da2e7] text-[#0da2e7] py-4 text-sm font-bold">
              Login
            </button>
            <Link to="/register" className="flex-1 border-b-2 border-transparent text-slate-500 dark:text-slate-400 py-4 text-sm font-bold hover:text-slate-700 dark:hover:text-slate-200 text-center">
              Register
            </Link>
          </div>
          
          {/* Form Container */}
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                  <input 
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.identifier ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                    placeholder="e.g. 9876543210" 
                    type="tel"
                    {...register('identifier')}
                  />
                </div>
                {errors.identifier && <p className="text-xs text-red-500 font-medium mt-1">{errors.identifier.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <input 
                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 font-medium mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="rounded border-slate-300 dark:border-slate-700 text-[#0da2e7] focus:ring-[#0da2e7]" type="checkbox"/>
                  <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700">Remember me</span>
                </label>
                <a className="text-xs font-semibold text-[#0da2e7] hover:underline" href="#">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0da2e7] hover:bg-[#0da2e7]/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md shadow-[#0da2e7]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            </div>

            <div className="text-center">
               <p className="text-sm text-slate-500">
                 Don't have an account? <Link to="/register" className="text-[#0da2e7] font-bold hover:underline">Create for free</Link>
               </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="p-8 text-center text-slate-400 dark:text-slate-600 text-sm">
        <p>© 2026 PharmaBridge Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
