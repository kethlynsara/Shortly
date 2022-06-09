import { Router } from 'express';
import { getLink, getShortUrl, shortLink } from '../controllers/linksController.js';
import { validateShortUrl, validateToken, validateUrl, validateUrlId } from '../middlewares/linksMiddleware.js';

const linksRouter = Router();

linksRouter.get('/:id', validateUrlId, getLink);
linksRouter.get('/open/:shortUrl', validateShortUrl, getShortUrl);
linksRouter.post('/:shorten', validateToken, validateUrl, shortLink);


export default linksRouter;