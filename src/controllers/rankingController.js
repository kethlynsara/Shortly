import { rankingRepository } from '../repositories/rankingRepository.js';

export async function getRanking(req, res) {
    try {
        const { rows } = await rankingRepository.getRanking();
        
        res.send(rows)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}