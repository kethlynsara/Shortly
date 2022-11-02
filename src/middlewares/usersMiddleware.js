import dotenv from 'dotenv';
import { authRepository } from '../repositories/authRepository.js';
dotenv.config();

export async function validateUserId(req, res, next) {
    const { id } = req.params;
    const { userId } = res.locals;

    if (parseInt(id) !== parseInt(userId)) {
        return res.sendStatus(401);
    }

    try {
        const { rows } = await authRepository.getUser('id', userId);
        
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