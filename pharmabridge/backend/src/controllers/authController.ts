import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client';
import { sendSuccess, sendError } from '../utils/response';
import { generateTokenPair, generateOTP, verifyRefreshToken, TokenPayload } from '../utils/jwt';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const registerPharmacy = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { pharmacyName, ownerName, phone, email, password, address, licenseNumber } = req.body;

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      sendError(res, 'User with this email already exists', 409);
      return;
    }

    const existingPharmacy = await prisma.pharmacy.findFirst({
      where: { OR: [{ email }, { licenseNumber }] },
    });
    if (existingPharmacy) {
      sendError(res, 'Pharmacy with this email or license already exists', 409);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name: ownerName, phone, email, passwordHash, address, role: 'PHARMACY_ADMIN', isVerified: true },
    });

    const pharmacy = await prisma.pharmacy.create({
      data: { name: pharmacyName, ownerName, phone, email, address, licenseNumber, isActive: false },
    });

    await prisma.pharmacyUser.create({
      data: { userId: user.id, pharmacyId: pharmacy.id },
    });

    sendSuccess(res, { userId: user.id, pharmacyId: pharmacy.id }, 'Pharmacy registration submitted. Pending approval.', 201);
  } catch (error) {
    logger.error('Register pharmacy error:', error);
    sendError(res, 'Registration failed');
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: phone ? { phone } : { email },
      include: { pharmacyUsers: { include: { pharmacy: true } } },
    });

    if (!user) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      sendError(res, 'Invalid credentials', 401);
      return;
    }

    if (user.role === 'PHARMACY_ADMIN') {
      const pharmacyUser = user.pharmacyUsers[0];
      if (pharmacyUser && !pharmacyUser.pharmacy.isActive) {
        sendError(res, 'Your pharmacy account is pending approval', 403);
        return;
      }
    }

    const pharmacyId = user.pharmacyUsers[0]?.pharmacyId;
    const payload: TokenPayload = { userId: user.id, role: user.role, pharmacyId };
    const tokens = generateTokenPair(payload);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        address: user.address,
        profileImage: user.profileImage,
        linkedPharmacy: user.linkedPharmacy,
        pharmacyId,
      },
    }, 'Login successful');
  } catch (error) {
    logger.error('Login error:', error);
    sendError(res, 'Login failed');
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    }
    res.clearCookie('refreshToken');
    sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    logger.error('Logout error:', error);
    sendError(res, 'Logout failed');
  }
};

export const verifyOtp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, otp } = req.body;

    const otpRecord = await prisma.otpCode.findFirst({
      where: { phone, code: otp, expiresAt: { gte: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      sendError(res, 'Invalid or expired OTP', 400);
      return;
    }

    if (otpRecord.attempts >= 3) {
      sendError(res, 'Maximum OTP attempts exceeded', 429);
      return;
    }

    await prisma.user.updateMany({ where: { phone }, data: { isVerified: true } });
    await prisma.otpCode.delete({ where: { id: otpRecord.id } });

    const user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    const payload: TokenPayload = { userId: user.id, role: user.role };
    const tokens = generateTokenPair(payload);

    await prisma.refreshToken.create({
      data: { userId: user.id, token: tokens.refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      accessToken: tokens.accessToken,
      user: { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role, address: user.address },
    }, 'OTP verified successfully');
  } catch (error) {
    logger.error('Verify OTP error:', error);
    sendError(res, 'OTP verification failed');
  }
};

export const resendOtp = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const otp = generateOTP();

    await prisma.otpCode.deleteMany({ where: { phone } });
    await prisma.otpCode.create({
      data: { phone, code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });

    logger.info(`Resent OTP for ${phone}: ${otp}`);
    sendSuccess(res, { phone }, 'OTP sent successfully');
  } catch (error) {
    logger.error('Resend OTP error:', error);
    sendError(res, 'Failed to resend OTP');
  }
};

export const forgotPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;
    const user = await prisma.user.findFirst({ where: { phone } });

    if (!user) {
      sendSuccess(res, null, 'If the number is registered, an OTP will be sent');
      return;
    }

    const otp = generateOTP();
    await prisma.otpCode.create({
      data: { phone, code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });

    logger.info(`Password reset OTP for ${phone}: ${otp}`);
    sendSuccess(res, { phone }, 'OTP sent for password reset');
  } catch (error) {
    logger.error('Forgot password error:', error);
    sendError(res, 'Failed to process request');
  }
};

export const resetPassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { phone, otp, newPassword } = req.body;

    const otpRecord = await prisma.otpCode.findFirst({
      where: { phone, code: otp, expiresAt: { gte: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      sendError(res, 'Invalid or expired OTP', 400);
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.updateMany({ where: { phone }, data: { passwordHash } });
    await prisma.otpCode.delete({ where: { id: otpRecord.id } });
    await prisma.refreshToken.deleteMany({ where: { userId: (await prisma.user.findFirst({ where: { phone } }))?.id } });

    sendSuccess(res, null, 'Password reset successful');
  } catch (error) {
    logger.error('Reset password error:', error);
    sendError(res, 'Password reset failed');
  }
};

export const refreshAccessToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      sendError(res, 'Refresh token not found', 401);
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);
    const storedToken = await prisma.refreshToken.findFirst({ where: { token: refreshToken } });

    if (!storedToken) {
      sendError(res, 'Invalid refresh token', 401);
      return;
    }

    // Refresh token rotation
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { pharmacyUsers: true },
    });

    if (!user) {
      sendError(res, 'User not found', 404);
      return;
    }

    const pharmacyId = user.pharmacyUsers[0]?.pharmacyId;
    const payload: TokenPayload = { userId: user.id, role: user.role, pharmacyId };
    const tokens = generateTokenPair(payload);

    await prisma.refreshToken.create({
      data: { userId: user.id, token: tokens.refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, { accessToken: tokens.accessToken }, 'Token refreshed');
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.clearCookie('refreshToken');
    sendError(res, 'Invalid refresh token', 401);
  }
};
