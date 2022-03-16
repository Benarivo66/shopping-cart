import { Router } from 'express';
import CartController from '../../controllers/Cart';
import auth from '../../middleware/auth';
import CartValidation from '../../validations/Cart';

const router: Router = Router();

router.route('/')
.get(auth, CartController.get)
.delete(auth, CartController.emptyCart);

router.post('/:id', [CartValidation.create(), auth], CartController.create);

export default router;