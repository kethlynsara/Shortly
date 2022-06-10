import { totalViewsRepository, userShortLinksRepository } from '../repositories/usersRepository.js';

export async function getUserUrls(req, res) {
    const { id, name } = res.locals.user;

    try {
        const { rows } = await totalViewsRepository.getTotalViews(id)
        const visitCount = rows[0].visitCount;

        const userLinks = await userShortLinksRepository.getUserShortLinks(id);
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