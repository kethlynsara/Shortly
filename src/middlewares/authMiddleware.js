import bcrypt from 'bcrypt';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';
import { authRepository } from '../repositories/authRepository.js';

export async function validateSignUpUser(req, res, next) {
    const { email } = req.body;

    try {   
        const { rows } = await authRepository.getUser('email' , email);
        
        if (rows[0]) {
            return res.status(422).send('Usuário já cadastrado!');
        }
        
    }catch(e) {
        console.log(e)
        res.sendStatus(500);
    }

    next();
}

export function validateSignUpData(req, res, next) {
    const { body } = req;

    const { error } = signUpSchema.validate(body, {abortEarly: false});
   
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

export function validateSignInData(req, res, next) {
    const { body } = req;

    const { error } = signInSchema.validate(body, {abortEarly: false});
   
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}

export async function validateSignInUser(req, res, next) {
    const { email, password } = req.body;

    try {   
        const { rows } = await authRepository.getUser('email', email);

        if (!rows[0] || !bcrypt.compareSync(password, rows[0].password)) {
            return res.status(401).send('Usuário não encontrado!');
        }

        const user = rows[0];
        res.locals.user = user;
        
    }catch(e) {
        console.log(e)
        res.sendStatus(500);
    }

    next();
}