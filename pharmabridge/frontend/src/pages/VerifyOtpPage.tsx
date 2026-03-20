import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

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
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    try {
      await api.post('/auth/resend-otp', { phone });
      toast.success('OTP resent to your mobile.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Resend failed');
    }
  };

  if (!phone) {
    return (
      <AuthLayout title="Invalid Request" subtitle="Please go back and start registration again.">
        <Link to="/register">
          <Button variant="outline" className="w-full">Back to Register</Button>
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Verify Phone" subtitle={`OTP sent to +91 ${phone}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Verification Code"
          placeholder="000000"
          maxLength={6}
          icon={<ShieldCheck size={18} />}
          error={errors.otp?.message}
          {...register('otp')}
          className="text-center text-2xl tracking-[0.5em] font-bold h-14"
        />

        <Button type="submit" className="w-full h-12 text-lg font-bold" isLoading={isSubmitting}>
          Verify & Continue
        </Button>

        <div className="text-center">
          <p className="text-sm text-slate-500 mb-2">Didn't receive code?</p>
          <button
            type="button"
            onClick={handleResend}
            className="text-sm font-bold text-primary hover:underline"
          >
            Resend Code
          </button>
        </div>

        <Link to="/register" className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800">
           <ArrowLeft size={14} /> Back to Register
        </Link>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
