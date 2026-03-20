import { Router } from 'express';
import { 
  getNotifications, 
  markAllRead, 
  markAsRead 
} from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/', getNotifications);
router.put('/read-all', markAllRead);
router.put('/:id/read', markAsRead);

export default router;
