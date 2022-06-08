import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { validateSignInData, validateSignInUser, validateSignUpData, validateSignUpUser } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', validateSignUpData, validateSignUpUser, signUp);
authRouter.post('/signin', validateSignInData, validateSignInUser,  signIn);

export default authRouter;