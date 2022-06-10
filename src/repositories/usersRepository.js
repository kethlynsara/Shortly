import db from '../app/db.js';

async function getTotalViews(id) {
    return db.query('SELECT SUM(views) as "visitCount" FROM links WHERE "userId" = $1', [id]);
}

export const totalViewsRepository = {
    getTotalViews
}

async function getUserShortLinks(id) {
    return db.query('SELECT id, "shortUrl", url, views as "visitCount" FROM links WHERE "userId" = $1', [id]);
}

export const userShortLinksRepository = {
    getUserShortLinks
}