import express from 'express';
import PaymentController from '../../controllers/Payment';
import auth from '../../middleware/auth';

const Router = express.Router;
const router = Router();

router.post('/', auth, PaymentController.sendSessionId);
router.post('/webhook', express.raw({type: 'application/json'}), PaymentController.webhook);

export default router;