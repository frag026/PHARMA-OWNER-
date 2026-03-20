import { Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

interface OrderStat {
  status: string;
  totalAmount: number | string | any;
  createdAt: Date;
}

export const getOrderStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    if (!pharmacyId) {
      sendError(res, 'Pharmacy not found', 404);
      return;
    }

    const { from, to } = req.query;
    const startDate = from ? new Date(from as string) : startOfDay(subDays(new Date(), 30));
    const endDate = to ? new Date(to as string) : endOfDay(new Date());

    const orders = await prisma.order.findMany({
      where: {
        pharmacyId,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        status: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    const stats = {
      totalOrders: orders.length,
      revenue: orders
        .filter((o: any) => o.status !== 'CANCELLED')
        .reduce((sum: number, o: any) => sum + Number(o.totalAmount), 0),
      statusDistribution: orders.reduce((acc: Record<string, number>, o: any) => {
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      }, {}),
      dailyOrders: orders.reduce((acc: Record<string, number>, o: any) => {
        const date = format(o.createdAt, 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}),
    };

    sendSuccess(res, stats, 'Order stats fetched');
  } catch (error) {
    logger.error('Get order stats error:', error);
    sendError(res, 'Failed to fetch order statistics');
  }
};

export const getRevenueReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    const { from, to } = req.query;
    const startDate = from ? new Date(from as string) : startOfDay(subDays(new Date(), 7));
    const endDate = to ? new Date(to as string) : endOfDay(new Date());

    // Prisma groupBy doesn't directly support date formatting in the query, 
    // so we fetch and then format if needed, or use raw query for group by day.
    // Simplifying for this implementation.
    const orders = await prisma.order.findMany({
      where: {
        pharmacyId,
        status: { not: 'CANCELLED' },
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    const revenueMap: Record<string, number> = {};
    orders.forEach((o: any) => {
      const date = format(o.createdAt, 'yyyy-MM-dd');
      revenueMap[date] = (revenueMap[date] || 0) + Number(o.totalAmount);
    });

    const formatted = Object.entries(revenueMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    sendSuccess(res, formatted, 'Revenue report fetched');
  } catch (error) {
    logger.error('Get revenue report error:', error);
    sendError(res, 'Failed to fetch revenue report');
  }
};

export const getTopMedicines = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    
    const topMedicines = await prisma.orderItem.groupBy({
      by: ['medicineId', 'medicineName'],
      where: {
        order: {
          pharmacyId,
          status: 'DELIVERED',
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 10,
    });

    sendSuccess(res, topMedicines, 'Top medicines fetched');
  } catch (error) {
    logger.error('Get top medicines error:', error);
    sendError(res, 'Failed to fetch top medicines');
  }
};
