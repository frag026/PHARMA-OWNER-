import { Router } from 'express';
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus, 
  cancelOrder 
} from '../controllers/orderController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { orderSchema, orderStatusSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', authorize('CUSTOMER'), validate(orderSchema), createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', authorize('PHARMACY_ADMIN'), validate(orderStatusSchema), updateOrderStatus);
router.put('/:id/cancel', authorize('CUSTOMER'), cancelOrder);

export default router;
