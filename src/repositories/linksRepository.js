import db from '../app/db.js';

async function getInfo(columnName, info) {
    return  db.query(`SELECT * FROM links WHERE "${columnName}" = $1`, [info]);
}

async function updateViews(addView, id) {
    return db.query(`UPDATE links SET views = $1 WHERE id = $2`, [addView, id]);
}

async function postShortLink(url, shortUrl, userId) {
    return db.query(`INSERT INTO links (url, "shortUrl", views, "userId")
                     VALUES ($1, $2, $3, $4)`, [url, shortUrl, 0, userId]);
}

async function deleteLink(id) {
    return db.query('DELETE FROM links WHERE id = $1', [id]);
}

export const linksRepository = {
    getInfo,
    updateViews,
    postShortLink,
    postShortLink,
    deleteLink
}