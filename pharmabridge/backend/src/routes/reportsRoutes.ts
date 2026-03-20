import { Router } from 'express';
import { 
  getOrderStats, 
  getRevenueReport, 
  getTopMedicines 
} from '../controllers/reportsController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.use(authorize('PHARMACY_ADMIN'));

router.get('/order-stats', getOrderStats);
router.get('/revenue-report', getRevenueReport);
router.get('/top-medicines', getTopMedicines);

export default router;
