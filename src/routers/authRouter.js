import { Router } from 'express';
import { getUsers, signUp } from '../controllers/authController.js';
import { validateSignUpData, validateSignUpUser } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', validateSignUpData, validateSignUpUser, signUp);
authRouter.post('/:id', getUsers);

export default authRouter;