import db from '../app/db.js';

export async function getRanking(req, res) {
    try {
        const { rows } = await db.query(`
        SELECT users.id, users.name, COUNT(url) as "linksCount", SUM(views) as "visitCount" 
        FROM links
        JOIN users ON links."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)
        
        res.send(rows)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}