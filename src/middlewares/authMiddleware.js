import db from '../app/db.js';
import { signUpSchema } from '../schemas/authSchema.js';

export async function validateSignUpUser(req, res, next) {
    const { email } = req.body;

    try {   
        const { rows } = await db.query('SELECT email FROM users WHERE email = $1', [email]);

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

    const { error } = schemaSignUp.validate(body, {abortEarly: false});
   
    if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
}