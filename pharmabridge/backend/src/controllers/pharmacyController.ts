import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const getPharmacies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    const where: Record<string, unknown> = { isActive: true };
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { address: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    const pharmacies = await prisma.pharmacy.findMany({ where, orderBy: { name: 'asc' } });
    sendSuccess(res, pharmacies, 'Pharmacies fetched');
  } catch (error) {
    logger.error('Get pharmacies error:', error);
    sendError(res, 'Failed to fetch pharmacies');
  }
};

export const getPharmacyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pharmacy = await prisma.pharmacy.findUnique({ where: { id } });
    if (!pharmacy) {
      sendError(res, 'Pharmacy not found', 404);
      return;
    }
    sendSuccess(res, pharmacy, 'Pharmacy fetched');
  } catch (error) {
    logger.error('Get pharmacy error:', error);
    sendError(res, 'Failed to fetch pharmacy');
  }
};

export const updatePharmacy = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, address, phone, email, operatingHours, logoUrl } = req.body;

    const pharmacy = await prisma.pharmacy.update({
      where: { id },
      data: { name, address, phone, email, operatingHours, logoUrl },
    });

    sendSuccess(res, pharmacy, 'Pharmacy updated');
  } catch (error) {
    logger.error('Update pharmacy error:', error);
    sendError(res, 'Failed to update pharmacy');
  }
};

export const getPharmacyCustomers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    if (!pharmacyId) {
      sendError(res, 'Pharmacy not found', 404);
      return;
    }

    const customers = await prisma.user.findMany({
      where: { linkedPharmacy: pharmacyId, role: 'CUSTOMER' },
      select: {
        id: true, name: true, phone: true, email: true, address: true, createdAt: true,
        orders: {
          where: { pharmacyId },
          select: { id: true, createdAt: true, totalAmount: true, status: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const enriched = customers.map((c) => ({
      ...c,
      totalOrders: c.orders.length,
      lastOrderDate: c.orders[0]?.createdAt || null,
    }));

    sendSuccess(res, enriched, 'Customers fetched');
  } catch (error) {
    logger.error('Get pharmacy customers error:', error);
    sendError(res, 'Failed to fetch customers');
  }
};
