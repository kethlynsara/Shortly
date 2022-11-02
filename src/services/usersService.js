import usersRepository from '../repositories/usersRepository.js';

async function getUserUrls(id, name) {
    try {
        const { rows } = await usersRepository.getTotalViews(id)
        const visitCount = rows[0].visitCount;

        const userLinks = await usersRepository.getUserShortLinks(id);
        const shortenedUrls = userLinks.rows;
        
        const body = {
            id,
            name,
            visitCount,
            shortenedUrls
        }

        return body;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const usersService = {
    getUserUrls
}