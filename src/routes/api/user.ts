import { Router } from 'express';

import UserController from '../../controllers/User';
import UserValidation from '../../validations/User';
import auth from '../../middleware/auth';

const router: Router = Router();

router.get('/', auth, UserController.getAll);
router.post('/', [UserValidation.create()], UserController.create);

export default router;