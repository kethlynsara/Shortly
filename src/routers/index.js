import { Router } from 'express';
import authRouter from './authRouter.js';

const router = Router();

router.post('/signup', authRouter);
router.use('/signup', authRouter)

export default router;
