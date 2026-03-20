import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Phone or Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = React.useState(false);
  const [useEmail, setUseEmail] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload: any = { password: data.password };
      if (useEmail || data.identifier.includes('@')) {
        payload.email = data.identifier;
      } else {
        payload.phone = data.identifier;
      }

      const response = await api.post('/auth/login', payload);
      const { user, accessToken } = response.data.data;
      
      setAuth(user, accessToken);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to manage your pharmacy operations.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-2">
           <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
             {useEmail ? 'Email Address' : 'Phone Number'}
           </label>
           <button 
             type="button" 
             onClick={() => setUseEmail(!useEmail)}
             className="text-xs font-bold text-primary hover:underline"
           >
             Use {useEmail ? 'Phone' : 'Email'} instead
           </button>
        </div>
        
        <Input
          placeholder={useEmail ? 'you@example.com' : '9876543210'}
          icon={useEmail ? <Mail size={18} /> : <Phone size={18} />}
          error={errors.identifier?.message}
          {...register('identifier')}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={<Lock size={18} />}
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm font-bold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12 text-lg font-bold" isLoading={isSubmitting}>
          Sign In
        </Button>

        <div className="text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link to="/register" className="font-bold text-primary hover:underline">
            Register for free
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
