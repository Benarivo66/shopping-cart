import { Router } from 'express';

import UserController from '../../controllers/User';
import UserValidation from '../../validations/User';

const router: Router = Router();

router.get('/', UserController.getAll);
router.post('/', [UserValidation.create()], UserController.create);

export default router;