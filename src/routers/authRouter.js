import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import { validateSignUpData, validateSignUpUser } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', validateSignUpData, validateSignUpUser, signUp);

export default authRouter;