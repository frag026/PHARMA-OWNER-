import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import medicineRoutes from './routes/medicineRoutes';
import pharmacyRoutes from './routes/pharmacyRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';
import notificationRoutes from './routes/notificationRoutes';
import reportsRoutes from './routes/reportsRoutes';

const app = express();

// Global Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/medicines', medicineRoutes);
app.use('/api/v1/pharmacy', pharmacyRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/reports', reportsRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
