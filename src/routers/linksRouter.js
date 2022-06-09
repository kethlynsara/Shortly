import { Router } from 'express';
import { getLink, shortLink } from '../controllers/linksController.js';
import { validateToken, validateUrl, validateUrlId } from '../middlewares/linksMiddleware.js';

const linksRouter = Router();

linksRouter.get('/:id', validateUrlId, getLink)
linksRouter.post('/:shorten', validateToken, validateUrl, shortLink);


export default linksRouter;