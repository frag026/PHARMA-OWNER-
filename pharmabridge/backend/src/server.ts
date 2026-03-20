import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import logger from './utils/logger';
import prisma from './prisma/client';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket connection
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join_order_room', (orderId: string) => {
    socket.join(`order_${orderId}`);
    logger.debug(`User joined order room: ${orderId}`);
  });

  socket.on('join_user_room', (userId: string) => {
    socket.join(`user_${userId}`);
    logger.debug(`User joined user room: ${userId}`);
  });

  socket.on('join_pharmacy_room', (pharmacyId: string) => {
    socket.join(`pharmacy_${pharmacyId}`);
    logger.debug(`Pharmacy joined room: ${pharmacyId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Export io for controllers
export { io };

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL database');

    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
