import db from '../app/db.js';

async function getUser(columnName, info) {
    return db.query(`SELECT * FROM users WHERE "${columnName}" = $1`, [info]);
}

export const selectUserRepository = {
    getUser
}

async function postUser(name, email, hash) {
    return db.query(`INSERT INTO users (name, email, password)
                     VALUES ($1, $2, $3)`, [name, email, hash]);
}

export const insertUserRepository = {
    postUser
}

async function getSession(columnName, info) {
    return await db.query(`SELECT * FROM sessions WHERE "${columnName}" = $1`, [info]);
}

export const selectSessionRepository = {
    getSession
}

async function postSession(token, userId) {
    return db.query(`INSERT INTO sessions (token, "userId")
                     VALUES ($1, $2)`, [token, userId]);
}

export const insertSessionRepository = {
    postSession
}