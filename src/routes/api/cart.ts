import { Router } from 'express';
import CartController from '../../controllers/Cart';
import auth from '../../middleware/auth';
//import ProductValidation from '../../validations/Product';

const router: Router = Router();

router.route('/')
.get(auth, CartController.get)
.delete(auth, CartController.emptyCart);

router.post('/:id', auth, CartController.create);

export default router;