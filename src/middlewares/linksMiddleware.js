import db from '../app/db.js';
import { linkSchema } from '../schemas/linksSchema.js';

export async function validateUrlId(req, res, next) {
    const { id } = req.params;

    try{
        const { rows } = await db.query('SELECT * FROM links WHERE id = $1', [id]);

        if (!rows[0]) {
            return res.status(404).send('URL não encontrado!')
        }

        res.locals.url = rows[0];
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    
    try {
        const { rows } = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        if (!token || rows.length === 0) {
            return res.status(401).send("Token inválido!");
        }

        res.locals.token = token;

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}

export async function validateUrl(req, res, next) {
    const { body } = req;

    const { error } = linkSchema.validate(body, {abortEarly: false});
   
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }    

    next();
}