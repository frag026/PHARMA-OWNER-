import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, '10-digit phone number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['CUSTOMER', 'PHARMACY', 'DRIVER']),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'PHARMACY',
    }
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const endpoint = data.role === 'PHARMACY' ? '/auth/register/pharmacy' : '/auth/register/customer';
      // Adjusting data for the specific backend if needed
      const payload = {
        ...data,
        name: data.fullName, // Adjust as per backend expectations
        pharmacyName: data.role === 'PHARMACY' ? `${data.fullName}'s Pharmacy` : undefined // Simple default for now
      };
      
      await api.post(endpoint, payload);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Registration failed');
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
      
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[540px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6">
            <Link to="/login" className="flex-1 border-b-2 border-transparent text-slate-500 dark:text-slate-400 py-4 text-sm font-bold hover:text-slate-700 dark:hover:text-slate-200 text-center">
              Login
            </Link>
            <button className="flex-1 border-b-2 border-[#0da2e7] text-[#0da2e7] py-4 text-sm font-bold">
              Register
            </button>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-black">Register your pharmacy</h1>
              <p className="text-slate-500 text-sm">Join our network and start receiving orders today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                  <input 
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.fullName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                    placeholder="Enter your full name" 
                    {...register('fullName')}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                    <input 
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                      placeholder="9876543210" 
                      type="tel"
                      {...register('phone')}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                    <input 
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                      placeholder="name@example.com" 
                      type="email"
                      {...register('email')}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <input 
                    className={`w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border ${errors.password ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400`}
                    placeholder="Min. 8 characters" 
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
                {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
              </div>

              <p className="text-xs text-slate-400 py-2">
                By clicking register, you agree to our <a href="#" className="text-[#0da2e7] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0da2e7] hover:underline">Privacy Policy</a>.
              </p>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#0da2e7] hover:bg-[#0da2e7]/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md shadow-[#0da2e7]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Register Now'}
              </button>
            </form>

            <div className="text-center pt-2">
               <p className="text-sm text-slate-500">
                 Already have an account? <Link to="/login" className="text-[#0da2e7] font-bold hover:underline">Sign In</Link>
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

export default RegisterPage;
