import db from '../app/db.js';

async function getRanking() {
    return db.query(`
    SELECT users.id, users.name, COUNT(url) as "linksCount", SUM(views) as "visitCount" 
    FROM links
    JOIN users ON links."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `);
}

export const rankingRepository = {
    getRanking
}