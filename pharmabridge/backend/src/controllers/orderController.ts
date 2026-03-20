import { Response } from 'express';
import prisma from '../prisma/client';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { AuthRequest } from '../types/express';
import logger from '../utils/logger';
import { Decimal } from '@prisma/client/runtime/library';
import { io } from '../server';
import { Prisma } from '@prisma/client';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { pharmacyId, items, deliveryType, notes, address } = req.body;
    const customerId = req.user!.userId;

    const pharmacy = await prisma.pharmacy.findUnique({ where: { id: pharmacyId } });
    if (!pharmacy || !pharmacy.isActive) {
      sendError(res, 'Pharmacy not found or inactive', 404);
      return;
    }

    let totalAmount = new Decimal(0);
    const orderItems: { medicineId: string; medicineName: string; quantity: number; unitPrice: Decimal }[] = [];

    for (const item of items) {
      const medicine = await prisma.medicine.findUnique({ where: { id: item.medicineId } });
      if (!medicine || !medicine.isActive) {
        sendError(res, `Medicine ${item.medicineId} not found`, 404);
        return;
      }
      if (medicine.stock < item.quantity) {
        sendError(res, `Insufficient stock for ${medicine.name}`, 400);
        return;
      }

      const itemTotal = medicine.price.mul(item.quantity);
      totalAmount = totalAmount.add(itemTotal);
      orderItems.push({
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: item.quantity,
        unitPrice: medicine.price,
      });
    }

    const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newOrder = await tx.order.create({
        data: {
          customerId,
          pharmacyId,
          deliveryType,
          totalAmount,
          notes,
          address,
          items: { create: orderItems },
        },
        include: { items: true },
      });

      // Decrement stock
      for (const item of items) {
        await tx.medicine.update({
          where: { id: item.medicineId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Create status history
      await tx.orderStatusHistory.create({
        data: { orderId: newOrder.id, status: 'PENDING', note: 'Order placed' },
      });

      // Create notification for pharmacy admin
      const pharmacyUsers = await tx.pharmacyUser.findMany({ where: { pharmacyId } });
      for (const pu of pharmacyUsers) {
        await tx.notification.create({
          data: {
            userId: pu.userId,
            title: 'New Order',
            message: `New order #${newOrder.id.substring(0, 8)} received`,
            type: 'order',
            refId: newOrder.id,
          },
        });
        
        // Real-time: Notify pharmacy admin
        io.to(`pharmacy_${pharmacyId}`).emit('order:new', {
          orderId: newOrder.id,
          message: `New order received`,
          order: newOrder,
        });
      }

      return newOrder;
    });

    sendSuccess(res, order, 'Order placed successfully', 201);
  } catch (error) {
    logger.error('Create order error:', error);
    sendError(res, 'Failed to create order');
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};

    if (req.user!.role === 'CUSTOMER') {
      where.customerId = req.user!.userId;
    } else if (req.user!.role === 'PHARMACY_ADMIN' && req.user!.pharmacyId) {
      where.pharmacyId = req.user!.pharmacyId;
    }

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: true,
          customer: { select: { id: true, name: true, phone: true, email: true, address: true } },
          pharmacy: { select: { id: true, name: true, address: true, phone: true } },
          prescriptions: true,
          statusHistory: { orderBy: { createdAt: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.order.count({ where }),
    ]);

    sendPaginated(res, orders, total, pageNum, limitNum, 'Orders fetched');
  } catch (error) {
    logger.error('Get orders error:', error);
    sendError(res, 'Failed to fetch orders');
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { medicine: true } },
        customer: { select: { id: true, name: true, phone: true, email: true, address: true } },
        pharmacy: { select: { id: true, name: true, address: true, phone: true } },
        prescriptions: true,
        statusHistory: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    // Verify access
    if (req.user!.role === 'CUSTOMER' && order.customerId !== req.user!.userId) {
      sendError(res, 'Access denied', 403);
      return;
    }

    sendSuccess(res, order, 'Order fetched');
  } catch (error) {
    logger.error('Get order error:', error);
    sendError(res, 'Failed to fetch order');
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    await prisma.orderStatusHistory.create({
      data: { orderId: id, status, note },
    });

    // Notify customer via DB
    await prisma.notification.create({
      data: {
        userId: order.customerId,
        title: 'Order Update',
        message: `Your order #${id.substring(0, 8)} is now ${status}`,
        type: 'order',
        refId: id,
      },
    });

    const orderIdStr = id as string;

    // Real-time: Notify customer and order room
    io.to(`order_${orderIdStr}`).emit('order:statusUpdated', { 
      orderId: orderIdStr, 
      status, 
      note,
      updatedAt: order.updatedAt 
    });
    io.to(`user_${order.customerId}`).emit('notification:new', {
      title: 'Order Update',
      message: `Your order #${orderIdStr.substring(0, 8)} is now ${status}`,
    });

    sendSuccess(res, order, 'Order status updated');
  } catch (error) {
    logger.error('Update order status error:', error);
    sendError(res, 'Failed to update order status');
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    if (order.customerId !== req.user!.userId) {
      sendError(res, 'Access denied', 403);
      return;
    }

    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      sendError(res, 'Order cannot be cancelled at this stage', 400);
      return;
    }

    // Restore stock
    for (const item of order.items) {
      if (item.medicineId) {
        await prisma.medicine.update({
          where: { id: item.medicineId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });

    await prisma.orderStatusHistory.create({
      data: { orderId: id, status: 'CANCELLED', note: 'Cancelled by customer' },
    });

    sendSuccess(res, updated, 'Order cancelled');
  } catch (error) {
    logger.error('Cancel order error:', error);
    sendError(res, 'Failed to cancel order');
  }
};
