import jwt from 'jsonwebtoken';
import db from '../app/db.js';

export async function validateUserId(req, res, next) {
    const { id } = req.params;
    const { token } = res.locals;
    const jwtKey = process.env.SECRET_KEY;
    const { userId } = jwt.verify(token, jwtKey);

    if (parseInt(id) !== parseInt(userId)) {
        return res.sendStatus(401);
    }

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        
        if (!rows[0]) {
            return res.status(404).send('Usuário não encontrado!');
        }

        res.locals.user = rows[0];
      
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}