import db from '../app/db.js';

export async function getUserUrls(req, res) {
    const { id, name } = res.locals.user;

    try {
        const { rows } = await db.query('SELECT SUM(views) as "visitCount" FROM links WHERE "userId" = $1', [id]);
        const visitCount = rows[0].visitCount;

        const userLinks = await db.query('SELECT id, "shortUrl", url, views as "visitCount" FROM links WHERE "userId" = $1', [id]);
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