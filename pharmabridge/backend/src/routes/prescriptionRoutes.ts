import { Router } from 'express';
import { 
  uploadPrescription, 
  getPrescriptionsByOrder, 
  verifyPrescription, 
  getPendingPrescriptions 
} from '../controllers/prescriptionController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { verifyPrescriptionSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/upload', authorize('CUSTOMER'), uploadPrescription);
router.get('/:orderId', getPrescriptionsByOrder);
router.put('/:id/verify', authorize('PHARMACY_ADMIN'), validate(verifyPrescriptionSchema), verifyPrescription);
router.get('/pharmacy/pending', authorize('PHARMACY_ADMIN'), getPendingPrescriptions);

export default router;
