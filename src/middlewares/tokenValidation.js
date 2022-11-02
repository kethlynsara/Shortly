import jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/authRepository.js';

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    
    try {
        const { rows } = await authRepository.getSession('token', token);

        if (!token || rows.length === 0) {
            return res.status(401).send("Token inválido!");
        }

        const jwtKey = process.env.SECRET_KEY;
        const { userId } = jwt.verify(token, jwtKey);

        res.locals.userId = userId;
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    next();
}