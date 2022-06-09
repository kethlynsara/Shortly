import { Router } from 'express';
import { shortLink } from '../controllers/linksController.js';
import { validateToken, validateUrl } from '../middlewares/linksMiddleware.js';

const linksRouter = Router();

linksRouter.post('/:shorten', validateToken, validateUrl, shortLink);

export default linksRouter;