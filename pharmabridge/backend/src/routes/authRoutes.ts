import { Router } from 'express';
import { 
  registerPharmacy, 
  login, 
  logout, 
  verifyOtp, 
  resendOtp, 
  forgotPassword, 
  resetPassword, 
  refreshAccessToken 
} from '../controllers/authController';
import { validate } from '../middleware/validation';
import { 
  pharmacyRegisterSchema, 
  loginSchema, 
  otpVerifySchema, 
  resetPasswordSchema 
} from '../utils/validators';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register/pharmacy', authLimiter, validate(pharmacyRegisterSchema), registerPharmacy);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.post('/verify-otp', otpLimiter, validate(otpVerifySchema), verifyOtp);
router.post('/resend-otp', otpLimiter, resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/refresh-token', refreshAccessToken);

export default router;
