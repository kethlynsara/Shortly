import { rankingRepository } from '../repositories/rankingRepository.js';

async function getRanking() {
    try {
        const { rows } = await rankingRepository.getRanking();
        
        return rows;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const rankingService = {
    getRanking
}