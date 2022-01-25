import {Router, Request, Response} from 'express';
import UserController from '../../controllers/User';
import UserValidation from '../../validations/User';

const router = Router();

router.post('/', UserValidation.login(), UserController.login);

export default router;