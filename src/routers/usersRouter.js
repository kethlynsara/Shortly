import { Router } from 'express';
import { getUserUrls } from '../controllers/usersController.js';
import { validateToken } from '../middlewares/tokenValidation.js';
import { validateUserId } from '../middlewares/usersMiddleware.js';

const usersRouter = Router();

usersRouter.get('/:id', validateToken, validateUserId, getUserUrls);

export default usersRouter;