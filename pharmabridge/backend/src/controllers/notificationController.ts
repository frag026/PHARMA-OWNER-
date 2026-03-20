import { Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    sendSuccess(res, notifications, 'Notifications fetched');
  } catch (error) {
    logger.error('Get notifications error:', error);
    sendError(res, 'Failed to fetch notifications');
  }
};

export const markAllRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.userId, isRead: false },
      data: { isRead: true },
    });
    sendSuccess(res, null, 'All notifications marked as read');
  } catch (error) {
    logger.error('Mark all read error:', error);
    sendError(res, 'Failed to mark notifications');
  }
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.notification.update({
      where: { id, userId: req.user!.userId },
      data: { isRead: true },
    });
    sendSuccess(res, null, 'Notification marked as read');
  } catch (error) {
    logger.error('Mark read error:', error);
    sendError(res, 'Failed to mark notification');
  }
};
