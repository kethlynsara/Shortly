import { rankingService } from '../services/rankingService.js';

export async function getRanking(req, res) {
    const ranking = await rankingService.getRanking();

    if (ranking) {
        return res.send(ranking);
    } else {
        return res.sendStatus(500);
    }
}