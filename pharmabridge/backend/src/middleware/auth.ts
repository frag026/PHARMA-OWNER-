import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.accessToken;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : cookieToken;

    if (!token) {
      sendError(res, 'Authentication required', 401);
      return;
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    sendError(res, 'Invalid or expired token', 401);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required', 401);
      return;
    }

    if (!roles.includes(req.user.role)) {
      sendError(res, 'Insufficient permissions', 403);
      return;
    }

    next();
  };
};
