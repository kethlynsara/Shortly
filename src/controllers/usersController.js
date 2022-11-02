import { usersService } from '../services/usersService.js';

export async function getUserUrls(req, res) {
    const { id, name } = res.locals.user;
    const links = await usersService.getUserUrls(id, name);

    if (links) {
        return res.send(links);
    } else {
        return res.sendStatus(500);
    }
}