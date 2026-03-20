import { Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';

export const uploadPrescription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId, imageUrl, notes } = req.body;

    const prescription = await prisma.prescription.create({
      data: { orderId, customerId: req.user!.userId, imageUrl, notes },
    });

    sendSuccess(res, prescription, 'Prescription uploaded', 201);
  } catch (error) {
    logger.error('Upload prescription error:', error);
    sendError(res, 'Failed to upload prescription');
  }
};

export const getPrescriptionsByOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const prescriptions = await prisma.prescription.findMany({
      where: { orderId },
      orderBy: { uploadedAt: 'desc' },
    });
    sendSuccess(res, prescriptions, 'Prescriptions fetched');
  } catch (error) {
    logger.error('Get prescriptions error:', error);
    sendError(res, 'Failed to fetch prescriptions');
  }
};

export const verifyPrescription = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { verified, rejectionReason } = req.body;

    const prescription = await prisma.prescription.update({
      where: { id },
      data: {
        verifiedByPharmacy: verified,
        rejectionReason: verified ? null : rejectionReason,
      },
    });

    // Notify customer
    if (!verified && prescription.customerId) {
      await prisma.notification.create({
        data: {
          userId: prescription.customerId,
          title: 'Prescription Rejected',
          message: `Your prescription was rejected: ${rejectionReason || 'No reason provided'}`,
          type: 'prescription',
          refId: prescription.id,
        },
      });
    }

    sendSuccess(res, prescription, verified ? 'Prescription verified' : 'Prescription rejected');
  } catch (error) {
    logger.error('Verify prescription error:', error);
    sendError(res, 'Failed to verify prescription');
  }
};

export const getPendingPrescriptions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const pharmacyId = req.user!.pharmacyId;
    if (!pharmacyId) {
      sendError(res, 'Pharmacy not found', 404);
      return;
    }

    const prescriptions = await prisma.prescription.findMany({
      where: {
        verifiedByPharmacy: false,
        rejectionReason: null,
        order: { pharmacyId },
      },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        order: { select: { id: true, createdAt: true } },
      },
      orderBy: { uploadedAt: 'desc' },
    });

    sendSuccess(res, prescriptions, 'Pending prescriptions fetched');
  } catch (error) {
    logger.error('Get pending prescriptions error:', error);
    sendError(res, 'Failed to fetch prescriptions');
  }
};
