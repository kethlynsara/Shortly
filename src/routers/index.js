import { Router } from 'express';
import authRouter from './authRouter.js';
import linksRouter from './linksRouter.js';
import rankingRouter from './rankingRouter.js';
import usersRouter from './usersRouter.js';

const router = Router();

router.post('/signup', authRouter);
router.post('/signin', authRouter);
router.use('/urls', linksRouter);
router.use('/users', usersRouter);
router.use('/ranking', rankingRouter);

export default router;
