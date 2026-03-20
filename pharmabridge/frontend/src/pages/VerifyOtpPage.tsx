import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';

const otpSchema = z.object({
  otp: z.string().length(6, '6-digit OTP is required'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const VerifyOtpPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const phone = searchParams.get('phone');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const resp = await api.post('/auth/verify-otp', { phone, otp: data.otp });
      const { user, accessToken } = resp.data.data;
      setAuth(user, accessToken);
      toast.success('Phone verified successfully!');
      if (user.role === 'ADMIN' || user.role === 'PHARMACY') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    try {
      await api.post('/auth/resend-otp', { phone });
      toast.success('OTP resent to your mobile.');
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Resend failed');
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
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-8">
          <div className="flex flex-col gap-2 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#0da2e7]/10 text-[#0da2e7] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-3xl font-bold">shield_check</span>
            </div>
            <h1 className="text-2xl font-black">Verify Phone</h1>
            <p className="text-slate-500 text-sm">We've sent a 6-digit code to <span className="font-bold text-slate-900 dark:text-slate-100">+91 {phone || 'XXXXX'}</span></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input 
                  className={`w-full text-center py-4 bg-slate-50 dark:bg-slate-800 border ${errors.otp ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-lg focus:ring-2 focus:ring-[#0da2e7] focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-3xl font-black tracking-[0.4em]`}
                  placeholder="000000" 
                  maxLength={6}
                  {...register('otp')}
                />
              </div>
              {errors.otp && <p className="text-xs text-center text-red-500 font-medium mt-1">{errors.otp.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || !phone}
              className="w-full bg-[#0da2e7] hover:bg-[#0da2e7]/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md shadow-[#0da2e7]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>

          <div className="text-center space-y-4">
             <p className="text-sm text-slate-500">
               Didn't receive code? <button onClick={handleResend} className="text-[#0da2e7] font-bold hover:underline">Resend OTP</button>
             </p>
             <Link to="/register" className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Register
             </Link>
          </div>
        </div>
      </main>
      
      <footer className="p-8 text-center text-slate-400 dark:text-slate-600 text-sm">
        <p>© 2026 PharmaBridge Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VerifyOtpPage;
