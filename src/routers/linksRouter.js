import { Router } from 'express';
import { deleteUrl, getLink, getShortUrl, shortLink } from '../controllers/linksController.js';
import { validateShortUrl, validateToken, validateUrl, validateUrlId, validateUserUrl } from '../middlewares/linksMiddleware.js';

const linksRouter = Router();

linksRouter.get('/:id', validateUrlId, getLink);
linksRouter.get('/open/:shortUrl', validateShortUrl, getShortUrl);
linksRouter.post('/shorten', validateToken, validateUrl, shortLink);
linksRouter.delete('/:id', validateToken, validateUrlId, validateUserUrl, deleteUrl);

export default linksRouter;