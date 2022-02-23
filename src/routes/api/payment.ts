import { Router } from 'express';
import PaymentController from '../../controllers/Payment';
import auth from '../../middleware/auth';

const router: Router = Router();

router.post('/', auth, PaymentController.sendSessionId);

export default router;