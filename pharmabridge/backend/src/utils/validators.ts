import { z } from 'zod';

const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const pharmacyRegisterSchema = z.object({
  body: z.object({
    pharmacyName: z.string().trim().min(2),
    ownerName: z.string().trim().min(2),
    phone: z.string().regex(phoneRegex),
    email: z.string().email(),
    password: z.string().regex(passwordRegex),
    address: z.string().trim().min(5),
    licenseNumber: z.string().trim().min(5),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex).optional(),
    email: z.string().email().optional(),
    password: z.string().min(1, 'Password required'),
  }).refine((data) => data.phone || data.email, {
    message: 'Either phone or email must be provided',
  }),
});

export const otpVerifySchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex),
    otp: z.string().length(6, 'OTP must be 6 digits'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex),
    otp: z.string().length(6),
    newPassword: z.string().regex(passwordRegex),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).optional(),
    email: z.string().email().optional(),
    address: z.string().trim().min(5).optional(),
    profileImage: z.string().url().optional().nullable(),
  }),
});

export const medicineSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1),
    genericName: z.string().trim().optional(),
    brand: z.string().trim().optional(),
    category: z.enum(['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Device', 'Other']).default('Other'),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    requiresPrescription: z.boolean().default(false),
    imageUrl: z.string().url().optional().nullable(),
  }),
});

export const orderSchema = z.object({
  body: z.object({
    pharmacyId: z.string().uuid(),
    deliveryType: z.enum(['PICKUP', 'HOME_DELIVERY']),
    notes: z.string().trim().optional(),
    address: z.string().trim().optional(),
    items: z.array(z.object({
      medicineId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })).min(1, 'Order must contain at least one item'),
  }),
});

export const orderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'DELIVERED', 'CANCELLED']),
    note: z.string().trim().optional(),
  }),
});

export const favouriteSchema = z.object({
  body: z.object({
    medicineName: z.string().trim().min(1),
    genericName: z.string().trim().optional(),
    notes: z.string().trim().optional(),
  }),
});

export const verifyPrescriptionSchema = z.object({
  body: z.object({
    verified: z.boolean(),
    rejectionReason: z.string().trim().optional(),
  }),
});
