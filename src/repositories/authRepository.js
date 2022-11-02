import db from '../app/db.js';

async function getUser(columnName, info) {
    return db.query(`SELECT * FROM users WHERE "${columnName}" = $1`, [info]);
}

async function postUser(name, email, hash) {
    return db.query(`INSERT INTO users (name, email, password)
                     VALUES ($1, $2, $3)`, [name, email, hash]);
}

async function getSession(columnName, info) {
    return await db.query(`SELECT * FROM sessions WHERE "${columnName}" = $1`, [info]);
}

async function postSession(token, userId) {
    return db.query(`INSERT INTO sessions (token, "userId")
                     VALUES ($1, $2)`, [token, userId]);
}

export const authRepository = {
    getUser,
    postUser,
    getSession,
    postSession
}