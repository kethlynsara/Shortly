import bcrypt from 'bcrypt';
import db from '../app/db.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const SALT = 10;
    const hash = bcrypt.hashSync(password, SALT);
    
    try {
        await db.query(`INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)`, [name, email, hash]);
        
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { user } = res.locals;

    try {
        await db.query(`INSERT INTO sessions (token, "userId")
        VALUES ($1, $2)`, [user.password, user.id]);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

    res.send({token: user.password});
}