import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../app/db.js';
import dotenv from 'dotenv';
dotenv.config();

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
        const { rows } = await db.query(`SELECT * FROM sessions WHERE "userId" = $1`, [user.id]);
        if (rows[0]) {
            res.send({token: rows[0].token});
        } else {
            const data = { userId: user.id };
            const jwtKey = process.env.SECRET_KEY;
            const token = jwt.sign(data, jwtKey);
            
            await db.query(`INSERT INTO sessions (token, "userId")
            VALUES ($1, $2)`, [token, user.id]);
            
            res.send({token});
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}