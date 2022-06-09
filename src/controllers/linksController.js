import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../app/db.js';
dotenv.config();

export async function shortLink(req, res) {
    const { token } = res.locals;
    const { url } = req.body;
    const shortUrl = nanoid();
    const jwtKey = process.env.SECRET_KEY;

    try {
        const { userId } = jwt.verify(token, jwtKey);

        await db.query(`INSERT INTO links (url, "shortUrl", views, "userId")
                        VALUES ($1, $2, $3, $4)`, [url, shortUrl, 0, userId]);

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}