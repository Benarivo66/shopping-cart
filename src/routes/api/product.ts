import { Router } from 'express';
import ProductController from '../../controllers/Product';
import { upload } from '../../../config/multer';
import ProductValidation from '../../validations/Product';
import auth from '../../middleware/auth';

const router: Router = Router();

router.route('/')
.post([ProductValidation.create()], ProductController.create)
.get(ProductController.getAll)
.delete(ProductController.deleteMany);

router.route('/:id')
.get(ProductController.getById)
.put(ProductController.update)
.delete(ProductController.deleteOne);

export default router;
