import { Router } from 'express';
import { 
  getMedicines, 
  createMedicine, 
  updateMedicine, 
  deleteMedicine 
} from '../controllers/medicineController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { medicineSchema } from '../utils/validators';

const router = Router();

router.get('/', getMedicines); // Public search

router.use(authenticate);
router.use(authorize('PHARMACY_ADMIN'));

router.post('/', validate(medicineSchema), createMedicine);
router.put('/:id', validate(medicineSchema), updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;
