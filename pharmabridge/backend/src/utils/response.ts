import { Response } from 'express';

interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  errors?: unknown[];
}

export const sendSuccess = <T>(res: Response, data: T, message = 'Success', statusCode = 200): void => {
  const response: ApiResponse<T> = { success: true, data, message };
  res.status(statusCode).json(response);
};

export const sendError = (res: Response, message = 'Error', statusCode = 500, errors?: unknown[]): void => {
  const response: ApiResponse<null> = { success: false, data: null, message, errors };
  res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message = 'Success'
): void => {
  res.status(200).json({
    success: true,
    data,
    message,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
};
