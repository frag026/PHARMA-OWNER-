import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import logger from '../utils/logger';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error('Unhandled error:', err);
  sendError(res, process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message, 500);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  sendError(res, 'Route not found', 404);
};
