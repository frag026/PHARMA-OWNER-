import { Router } from 'express';
import { 
  getPharmacies, 
  getPharmacyById, 
  updatePharmacy, 
  getPharmacyCustomers 
} from '../controllers/pharmacyController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getPharmacies); // Public
router.get('/:id', getPharmacyById); // Public

router.use(authenticate);
router.use(authorize('PHARMACY_ADMIN'));

router.put('/:id', updatePharmacy);
router.get('/:id/customers', getPharmacyCustomers);

export default router;
