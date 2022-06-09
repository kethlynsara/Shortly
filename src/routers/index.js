import { Router } from 'express';
import authRouter from './authRouter.js';
import linksRouter from './linksRouter.js';
import usersRouter from './usersRouter.js';

const router = Router();

router.post('/signup', authRouter);
router.post('/signin', authRouter);
router.use('/urls', linksRouter);
router.use('/users', usersRouter);

export default router;
