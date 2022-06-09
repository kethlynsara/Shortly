import { Router } from 'express';
import authRouter from './authRouter.js';

const router = Router();

router.post('/signup', authRouter);
router.post('/signin', authRouter);

export default router;
