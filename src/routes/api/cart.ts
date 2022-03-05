import { Router } from 'express';
import CartController from '../../controllers/Cart';
import auth from '../../middleware/auth';
//import ProductValidation from '../../validations/Product';

const router: Router = Router();

router.route('/')
.get(CartController.get)
.delete(CartController.emptyCart);

router.post('/:id', CartController.create);

export default router;