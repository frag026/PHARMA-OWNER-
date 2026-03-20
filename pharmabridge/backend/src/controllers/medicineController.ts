import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const getMedicines = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pharmacyId, search, category, page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const where: Record<string, unknown> = { isActive: true };
    if (pharmacyId) where.pharmacyId = pharmacyId;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { genericName: { contains: search as string, mode: 'insensitive' } },
        { brand: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [medicines, total] = await Promise.all([
      prisma.medicine.findMany({
        where,
        orderBy: { name: 'asc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      prisma.medicine.count({ where }),
    ]);

    sendPaginated(res, medicines, total, pageNum, limitNum, 'Medicines fetched');
  } catch (error) {
    logger.error('Get medicines error:', error);
    sendError(res, 'Failed to fetch medicines');
  }
};

export const createMedicine = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    if (!pharmacyId) {
      sendError(res, 'Pharmacy not found', 404);
      return;
    }

    const { name, genericName, brand, category, price, stock, requiresPrescription, imageUrl } = req.body;

    const medicine = await prisma.medicine.create({
      data: { pharmacyId, name, genericName, brand, category, price, stock, requiresPrescription, imageUrl },
    });

    sendSuccess(res, medicine, 'Medicine added', 201);
  } catch (error) {
    logger.error('Create medicine error:', error);
    sendError(res, 'Failed to add medicine');
  }
};

export const updateMedicine = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, genericName, brand, category, price, stock, requiresPrescription, imageUrl } = req.body;

    const medicine = await prisma.medicine.update({
      where: { id },
      data: { name, genericName, brand, category, price, stock, requiresPrescription, imageUrl },
    });

    sendSuccess(res, medicine, 'Medicine updated');
  } catch (error) {
    logger.error('Update medicine error:', error);
    sendError(res, 'Failed to update medicine');
  }
};

export const deleteMedicine = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.medicine.update({ where: { id }, data: { isActive: false } });
    sendSuccess(res, null, 'Medicine removed');
  } catch (error) {
    logger.error('Delete medicine error:', error);
    sendError(res, 'Failed to delete medicine');
  }
};
