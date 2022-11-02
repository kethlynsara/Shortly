import { usersRepository } from '../repositories/usersRepository.js';

export async function getUserUrls(req, res) {
    const { id, name } = res.locals.user;

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

        res.send(body);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}