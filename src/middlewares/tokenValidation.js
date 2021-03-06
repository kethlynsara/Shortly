import { selectSessionRepository } from '../repositories/authRepository.js';

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    
    try {
        const { rows } = await selectSessionRepository.getSession('token', token);

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