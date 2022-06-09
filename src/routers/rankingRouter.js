import { Router } from 'express';
import { getRanking } from '../controllers/rankingController.js';

const rankingRouter = Router();

rankingRouter.get('/', getRanking);

export default rankingRouter;