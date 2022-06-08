import bcrypt from 'bcrypt';
import db from '../app/db.js';

export async function signUp(req, res) {
    const { name, email, password } = req;
    const SALT = 10;
    const safePassword = bcrypt.hashSync(password, SALT)

    try {
        await db.query(`INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)`, [name, email, safePassword]);
        
        res.sendStatus(201);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}