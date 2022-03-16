import { Router } from 'express';
import ProductController from '../../controllers/Product';
import { upload } from '../../../config/multer';
import ProductValidation from '../../validations/Product';
import auth from '../../middleware/auth';

const router: Router = Router();

router.route('/')
.post([ProductValidation.create(), auth], upload.single('files'), ProductController.create)
.get(auth, ProductController.getAll)
.delete(auth, ProductController.deleteMany);

router.route('/:id')
.get(auth, ProductController.getById)
.put(auth, ProductController.update)
.delete(auth, ProductController.deleteOne);

export default router;
