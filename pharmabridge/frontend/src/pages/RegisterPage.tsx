import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../services/api';
import toast from 'react-hot-toast';
import { User, Phone, Mail, Lock, Store, FileText, MapPin } from 'lucide-react';

const pharmacySchema = z.object({
  pharmacyName: z.string().min(2, 'Pharmacy name is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  phone: z.string().regex(/^[0-9]{10}$/, '10-digit phone number is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ chars'),
  address: z.string().min(10, 'Full pharmacy address is required'),
  licenseNumber: z.string().min(5, 'Pharmacy license is required'),
});

type PharmacyFormValues = z.infer<typeof pharmacySchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register: regPharmacy,
    handleSubmit: handlePharmacy,
    formState: { errors: errorsPharma, isSubmitting: subPharma },
  } = useForm<PharmacyFormValues>({
    resolver: zodResolver(pharmacySchema),
  });

  const onPharmacySubmit = async (data: PharmacyFormValues) => {
    try {
      await api.post('/auth/register/pharmacy', data);
      toast.success('Pharmacy registered! Pending admin approval.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout title="Create Pharmacy Account" subtitle="Register your pharmacy to access the owner dashboard.">
      <form onSubmit={handlePharmacy(onPharmacySubmit)} className="space-y-4">
        <Input label="Pharmacy Name" placeholder="Apollo Pharmacy" icon={<Store size={18} />} error={errorsPharma.pharmacyName?.message} {...regPharmacy('pharmacyName')} />
        <Input label="Owner Full Name" placeholder="John Smith" icon={<User size={18} />} error={errorsPharma.ownerName?.message} {...regPharmacy('ownerName')} />
        <Input label="Pharmacy Phone" placeholder="9876543210" icon={<Phone size={18} />} error={errorsPharma.phone?.message} {...regPharmacy('phone')} />
        <Input label="Business Email" placeholder="store@example.com" icon={<Mail size={18} />} error={errorsPharma.email?.message} {...regPharmacy('email')} />
        <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={18} />} error={errorsPharma.password?.message} {...regPharmacy('password')} />
        <Input label="License Number" placeholder="DHS/2026/001" icon={<FileText size={18} />} error={errorsPharma.licenseNumber?.message} {...regPharmacy('licenseNumber')} />
        <Input label="Detailed Address" placeholder="Shop 12, Main Road, Block 4" icon={<MapPin size={18} />} error={errorsPharma.address?.message} {...regPharmacy('address')} />

        <Button type="submit" className="w-full h-12 text-lg font-bold" isLoading={subPharma}>Apply Partnership</Button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-slate-500">Already part of bridge? </span>
        <Link to="/login" className="font-bold text-primary hover:underline">Sign In Instead</Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
