import { Router } from 'express';
import authRouter from './authRouter.js';
import linksRouter from './linksRouter.js';

const router = Router();

router.post('/signup', authRouter);
router.post('/signin', authRouter);
router.use('/urls', linksRouter);

export default router;
